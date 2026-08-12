using FraudDetectionService.Entities;

namespace FraudDetectionService.AI.Prompts
{
    public static class FraudExplanationPrompt
    {
        public static string Build(FraudLog fraudLog)
        {
            return $"""
You are a Senior Banking Fraud Analyst.

Analyze the following transaction.

Transaction ID : {fraudLog.TransactionId}
Customer ID : {fraudLog.CustomerId}
Account ID : {fraudLog.AccountId}

Amount : ₹{fraudLog.TransactionAmount}

Transaction Type : {fraudLog.TransactionType}

Current City : {fraudLog.CurrentTransactionCity}
Previous City : {fraudLog.PreviousTransactionCity}

Current IP : {fraudLog.ClientIpAddress}
Previous IP : {fraudLog.PreviousIpAddress}

Risk Score : {fraudLog.RiskScore}

Reason :
{fraudLog.Reason}

Provide the response in this format:

Risk Level:
Explanation:
Fraud Indicators:
Recommendation:

Keep the explanation concise and professional.
""";
        }
    }
}