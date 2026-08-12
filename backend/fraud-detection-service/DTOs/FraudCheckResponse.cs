namespace FraudDetectionService.DTOs
{
    public class FraudCheckResponse
    {
        public bool IsFraud { get; set; }
        public int RiskScore { get; set; }
        public string Message { get; set; } = string.Empty;
    
        public string? AIExplanation { get; set; }
    }
}
