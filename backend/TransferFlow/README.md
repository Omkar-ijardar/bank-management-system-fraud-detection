# transaction-service

Implements **only** the Transfer Flow (B2): `POST /api/transactions/transfer`.
Package: `com.bankmanagement.transaction`. Java 21, Spring Boot 3.3.4, Maven.

This service never touches the `Account` table. All account reads and the actual
balance movement happen through `bank-account-service`'s REST API via `AccountClient`
(Spring WebClient) — see Design Rules below.

## Package layout

```
com.bankmanagement.transaction
├── controller/       TransactionController        - POST /api/transactions/transfer
├── service/          TransactionService (interface), impl/TransactionServiceImpl
├── repository/       TransactionRepository          - Transaction entity only
├── model/            Transaction
├── dto/              TransferRequestDto, TransactionResponseDto, AccountDto, FraudResponseDto
├── client/           AccountClient                  - the ONLY way this service touches account data
├── fraud/            FraudCheckService (interface), StubFraudCheckService
├── config/           WebClientConfig
├── enums/            TransactionType, TransactionStatus
├── exception/        AccountNotFoundException, InsufficientBalanceException,
│                     FraudDetectionException, TransactionException
└── util/             ReferenceGenerator
```

## Request flow

```
POST /api/transactions/transfer  { fromAccountId, toAccountId, amount }
  → TransactionController.transfer()
    → TransactionService.transfer(TransferRequestDto)
      → validate fromAccountId != toAccountId
      → AccountClient.getAccountById(fromAccountId)   [WebClient -> bank-account-service]
      → AccountClient.getAccountById(toAccountId)     [WebClient -> bank-account-service]
      → validate both ACTIVE, sender has sufficient balance
      → FraudCheckService.checkTransaction(amount)    <-- the swap point (stub today)
      → if FLAGGED: return immediately — no balance change, nothing persisted
      → if ALLOW:
          → AccountClient.transfer(request)           [WebClient -> bank-account-service,
                                                          which debits/credits and saves]
          → on Account Service SUCCESS: save a Transaction row (with generated
            reference number) and return SUCCESS
  ← { transactionId, status, message, riskScore }
```

## Design rules followed

- **No direct Account access.** `TransactionServiceImpl` depends only on `AccountClient`
  and `FraudCheckService` — both interfaces/WebClient wrappers, never a repository over
  the Account table.
- **Constructor injection everywhere.** No `@Autowired` on fields anywhere in this project.
- **Fraud logic lives only in `FraudCheckService` implementations.** `TransactionServiceImpl`
  never contains a rule like `if (amount > 50000)` — it just calls
  `fraudCheckService.checkTransaction(amount)`.
- **The swap-in point:** `StubFraudCheckService` is the only implementation of
  `FraudCheckService` right now. When the real .NET Fraud Detection API is ready, add a new
  class implementing the same interface (e.g. `RealFraudCheckService`), mark it `@Primary`
  (or use Spring profiles), and remove/disable the stub bean. `TransactionServiceImpl` does
  not change.

## Before you run it

1. **bank-account-service must be running first**, on **http://localhost:8082** (see its
   own README) — `AccountClient` calls it directly. If it isn't running, every transfer
   request will fail with a `TransactionException` (connection refused).
2. **MySQL** — a `transaction_service_db` database will be auto-created
   (`createDatabaseIfNotExist=true`) and the `transaction` table auto-created
   (`ddl-auto=update`), so no manual schema step is needed here.
3. Update `src/main/resources/application.properties` with your MySQL credentials.

## Run

```bash
cd transaction-service
mvn spring-boot:run
```

Starts on **http://localhost:8083**.

## Test

With both services running (account-service on 8082 seeded with test accounts — see its
README — and transaction-service on 8083):

```bash
# Allowed transfer (under the 50,000 stub threshold)
curl -X POST http://localhost:8083/api/transactions/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromAccountId":1,"toAccountId":2,"amount":5000}'

# Flagged transfer (over the 50,000 stub threshold)
curl -X POST http://localhost:8083/api/transactions/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromAccountId":1,"toAccountId":2,"amount":75000}'
```

**Expected:**
- `amount: 5000` → HTTP 200, `"status":"SUCCESS"`, `"riskScore":10`, `transactionId` populated,
  and account 1's balance in bank-account-service drops by 5000 (verify with
  `GET http://localhost:8082/api/accounts/1`).
- `amount: 75000` → HTTP 202, `"status":"FLAGGED"`, `"riskScore":90`, `transactionId: null`,
  and **no balance change** on either account (verify the same way).

See `postman_collection.json` for a fuller set of scenarios (insufficient balance,
same-account transfer, non-existent account, inactive account).

## What's NOT included (by design)

Deposit, withdraw, and transaction-history endpoints were explicitly out of scope for this
build — only the Transfer Flow (B2) was implemented, per the project specification.
