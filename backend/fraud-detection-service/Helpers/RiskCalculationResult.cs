namespace FraudDetectionService.Helpers
{
    public class RiskCalculationResult
    {
        public int Score { get; set; }

        public List<string> Reasons { get; set; } = new();
    }
}
