namespace FraudDetectionService.DTOs
{
    public class RecordDecisionRequest
    {
        public long CustomerId { get; set; }
        public long AccountId { get; set; }
        public decimal TransactionAmount { get; set; }
        public string TransactionType { get; set; } = "TRANSFER";
        public string ClientIpAddress { get; set; } = string.Empty;
        public string CurrentTransactionCity { get; set; } = string.Empty;
        public int RiskScore { get; set; }
        public string? AIExplanation { get; set; }
        public string Decision { get; set; } = "Allowed"; // "Allowed" or "Blocked"
        public string? Reason { get; set; }
    }
}
