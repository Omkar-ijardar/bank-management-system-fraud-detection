using System.Collections.Generic;

namespace FraudDetectionService.Helpers
{
    public static class RiskScoreCalculator
    {
        public static RiskCalculationResult CalculateRiskScore(
            decimal transactionAmount,
            string? previousIpAddress,
            string currentIpAddress,
            string? previousCity,
            string currentCity)
        {
            int riskScore = 0;
            List<string> reasons = new();

            // Threshold Rule: Amount >= 50,000 triggers Fraud Risk Threshold
            if (transactionAmount >= 50000)
            {
                riskScore += 50;
                reasons.Add("Exceeds Fraud Threshold (₹50,000+)");
            }

            if (transactionAmount > 100000)
            {
                riskScore += 30;
                reasons.Add("High Value Amount");
            }

            // Rule 2: IP changed
            if (!string.IsNullOrEmpty(previousIpAddress) && previousIpAddress != currentIpAddress)
            {
                riskScore += 25;
                reasons.Add("IP Address Changed");
            }

            // Rule 3: City changed
            if (!string.IsNullOrEmpty(previousCity) && previousCity != currentCity)
            {
                riskScore += 25;
                reasons.Add("Location Changed");
            }

            // If amount >= 50,000, ensure riskScore is at least 85 so transaction is FLAGGED for customer verification
            if (transactionAmount >= 50000)
            {
                riskScore = System.Math.Max(riskScore, 85);
            }

            return new RiskCalculationResult
            {
                Score = riskScore,
                Reasons = reasons
            };
        }
    }
}
