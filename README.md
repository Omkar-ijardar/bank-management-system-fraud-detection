# 🏦 BANK MANAGEMENT SYSTEM WITH FRAUD DETECTION & IVR

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-blueviolet.svg)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479a1.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ed.svg)](https://www.docker.com/)
[![AWS EC2](https://img.shields.io/badge/AWS-EC2%20Deployed-ff9900.svg)](http://16.170.40.145:5173)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285f4.svg)](https://ai.google.dev/)

> 🚀 **LIVE DEMO : **
> - 🌐 **Customer Banking Portal**: [http://16.170.40.145:5173](http://16.170.40.145:5173)
> - 👑 **Executive Admin Control Center**: [http://16.170.40.145:5173/admin/login](http://16.170.40.145:5173/admin/login)


An enterprise-grade, distributed microservices banking application built with **Spring Boot 3**, **.NET 8**, **React + Vite (Glassmorphic UI)**, **MySQL 8**, and **Google Gemini AI**. The system features real-time transaction processing, high-value transfer verification, automated fraud detection, IVR call simulation, and an Executive Admin Control Center.

---

## 📌 Executive Architecture & Service Topology

The application is decomposed into 9 autonomous microservices communicating via HTTP/REST, Spring WebClient, OpenFeign, and containerized Docker networking:

```
                                  +------------------------------------+
                                  |         React Frontend UI          |
                                  |         (Vite Port 5173)           |
                                  +-----------------+------------------+
                                                    |
             +--------------------+-----------------+--------------------+--------------------+
             |                    |                 |                    |                    |
             v                    v                 v                    v                    v
  +------------------+  +-------------------+  +-----------------+  +------------------+  +------------------+
  | Bank Auth        |  | Bank Account      |  | Transaction     |  | TransferFlow     |  | Bank Admin       |
  | Service (9090)   |  | Service (8082)    |  | Service (8086)  |  | Service (8083)   |  | Service (9098)   |
  +--------+---------+  +---------+---------+  +--------+--------+  +--------+---------+  +--------+---------+
           |                      ^                   ^                  |                     |
           |                      |                   |                  v                     |
           |                      +-------------------+-------+ +--------------------+         |
           |                      |                           | | Fraud Detection    |         |
           |                      |                           | | Service (.NET 5000)|<--------+
           |                      |                           | +---------+----------+
           v                      v                           v           v
  +----------------------------------------------------------------------------------+
  |                           MySQL 8.0 Database (3306)                              |
  +----------------------------------------------------------------------------------+
```

---

## ✨ Key Features

### 👨‍💼 Customer Portal
- **Secure Authentication**: JWT-based stateless authentication with OTP validation, BCrypt password hashing, and role-based access control.
- **Account Operations**: Open Savings / Current accounts with instant Indian Account Number formatting (`ACC-XXXX-XXXX-XXXX`).
- **Deposit & Withdrawal**: Instant cash credit and debit with transactional consistency and instant local UI sync.
- **High-Value Fund Transfer**: Real-time transfers with an automated **₹50,000 Security Threshold Guard**. Transfers $\ge$ ₹50,000 trigger a real-time security verification modal popup allowing customers to **Allow** or **Block** the transfer.
- **AI Chatbot Assistant**: Embedded Gemini AI banking assistant for customer inquiry resolution.

### 🛡️ AI Fraud Detection Engine (.NET 8)
- **Heuristic Risk Scoring**: Evaluates transaction velocity, geographical location jumps (city jumps), and transfer amounts.
- **Google Gemini AI Explanations**: Generates natural language AI security inspection reasoning for flagged events.
- **Customer Decision Audit Logging**: Records customer responses (**Allowed** vs **Blocked**) directly in the `fraudlog` table.

### 👑 Executive Admin Command Center
- **Real-Time Executive Metrics**: Live counters for total customers, active accounts, transaction volumes, and total money transferred.
- **Master Transaction Registry**: Complete historical audit log of all deposits, withdrawals, and inter-bank transfers.
- **Fraud Security Command Center**: Live inspection view of flagged security events, risk scores, geographical velocity jumps, and customer decisions.

---

## 🛠️ Microservices Ecosystem & Tech Stack

| Microservice | Technology Stack | Port | Description |
| :--- | :--- | :--- | :--- |
| **`bank-auth-service`** | Java 21, Spring Boot 3, Spring Security, JWT | `9090` | User registration, login, JWT issuance, OTP generation & customer profiles. |
| **`bank-account-service`** | Java 21, Spring Boot 3, Spring Data JPA | `8082` | Account management, balance updates, and customer-account associations. |
| **`bank-transaction-service`** | Java 21, Spring Boot 3, Spring Data JPA | `8086` | Cash deposits, cash withdrawals, and historical ledger logging. |
| **`transfer-flow-service`** | Java 21, Spring Boot 3, Spring WebClient | `8083` | High-value transfer routing, ₹50k threshold checks, and customer decision recording. |
| **`fraud-detection-service`** | .NET 8 ASP.NET Core, EF Core, Gemini AI | `5000` | Real-time risk score calculation, AI explanations, and fraud event logging. |
| **`bank-admin-service`** | Java 21, Spring Boot 3, OpenFeign | `9098` | Aggregation microservice for admin metrics, analytics, and service controls. |
| **`bank-ivr-service`** | Java 21, Spring Boot 3 | `8084` | Simulated Interactive Voice Response (IVR) phone banking menu service. |
| **`mysql-db`** | MySQL 8.0 Community Server | `3306` | Central relational database storing customers, accounts, transactions, and fraud logs. |
| **`frontend`** | React 18, Vite, Lucide Icons, Vanilla CSS | `5173` | Responsive glassmorphic customer and admin web applications. |

---

## 🌐 Live Deployed Application Links

Recruiters and hiring managers can test the live production environment hosted on AWS EC2:

| Application / Service | Live URL | Credentials / Notes |
| :--- | :--- | :--- |
| 🌐 **Customer Banking Portal** | [http://16.170.40.145:5173](http://16.170.40.145:5173) | Register a new customer account or log in |
| 👑 **Executive Admin Portal** | [http://16.170.40.145:5173/admin/login](http://16.170.40.145:5173/admin/login) | Full live metrics & fraud command center |

---

## 🚀 Getting Started (Local Deployment)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with Docker Compose )
- [Git](https://git-scm.com/)

### One-Command Launch
Clone the repository and run Docker Compose:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/bank-management-system-fraud-detection.git
cd bank-management-system-fraud-detection

# 2. Build and launch all 9 microservices
docker compose up -d --build
```

Access the application locally:
- **Customer Portal**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5173/admin/login`

---

## ☁️ Production Deployment on AWS EC2

### 1. Provision EC2 Instance
- **OS**: Ubuntu 24.04 LTS / Ubuntu 22.04 LTS
- **Instance Type**:  `m7i-flex.large` (Min 2 vCPU, 8GB RAM)
- **Storage**: 20 GB GP3 SSD

### 2. Configure AWS Security Group Inbound Rules
Ensure the following ports are open in your EC2 Security Group:

| Port | Protocol | Purpose |
| :--- | :--- | :--- |
| `22` | TCP | SSH Access |
| `5173` | TCP | React Frontend Web App |
| `9090` | TCP | Auth Service API |
| `8082` | TCP | Account Service API |
| `8086` | TCP | Transaction Service API |
| `8083` | TCP | TransferFlow Service API |
| `5000` | TCP | Fraud Detection Service API |
| `9098` | TCP | Admin Service API |
| `8084` | TCP | IVR Service API |
| `3306` | TCP | MySQL Database |

### 3. Deploy via SSH
```bash
# Upload project code to EC2
scp -i "your-key.pem" project.tar.gz ubuntu@16.170.40.145:~

# SSH into EC2 instance
ssh -i "your-key.pem" ubuntu@16.170.40.145

# Extract and start containers
tar -xvf project.tar.gz
docker compose up -d --build
```

---

## 🔌 API Endpoints Summary

### Auth Service (`:9090`)
- `POST /api/auth/register` — Register a new customer account
- `POST /api/auth/login` — Customer/Admin login & JWT issuance
- `POST /api/auth/verify-otp` — Verify OTP for security authentication

### Account Service (`:8082`)
- `POST /api/accounts` — Open a new bank account
- `GET /api/accounts/customer/{customerId}` — Retrieve customer accounts
- `PUT /api/accounts/{id}/balance` — Update account balance

### Transaction & Transfer Services (`:8086` / `:8083`)
- `POST /api/transactions/deposit` — Deposit cash to account
- `POST /api/transactions/withdraw` — Withdraw cash from account
- `POST /api/transactions/transfer` — Initiate inter-account transfer
- `POST /api/transactions/transfer/confirm` — Confirm or block suspicious transfer

### Fraud Detection Service (`:5000`)
- `POST /api/Fraud/check` — Evaluate transaction risk score
- `POST /api/Fraud/record-decision` — Log customer decision (Allowed / Blocked)
- `GET /api/Fraud/logs` — Fetch all recorded fraud security events

---
