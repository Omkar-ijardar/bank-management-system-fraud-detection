namespace FraudDetectionService.DTOs
{
    public class FraudCheckRequest
    {
        public long TransactionId { get; set; }
        public long CustomerId { get; set; }
        public long AccountId { get; set; }
        public decimal TransactionAmount { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public string ClientIpAddress { get; set; } = string.Empty;
        public string CurrentTransactionCity { get; set; } = string.Empty;
    }
}
