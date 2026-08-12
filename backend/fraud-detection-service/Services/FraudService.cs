using FraudDetectionService.Data;
using FraudDetectionService.DTOs;
using FraudDetectionService.Entities;
using FraudDetectionService.Enums;
using FraudDetectionService.Services.Interfaces;
using FraudDetectionService.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FraudDetectionService.Services
{
    public class FraudService : IFraudService
    {
        private readonly FraudDbContext _context;
        private readonly IAIExplanationService _aiExplanationService;
        private readonly ILogger<FraudService> _logger;

        public FraudService(
            FraudDbContext context,
            IAIExplanationService aiExplanationService,
            ILogger<FraudService> logger)
        {
            _context = context;
            _aiExplanationService = aiExplanationService;
            _logger = logger;
        }

        public async Task<FraudCheckResponse> CheckFraudAsync(FraudCheckRequest request)
        {
            _logger.LogInformation(
                "Checking Fraud for Customer {CustomerId}, Amount {Amount}",
                request.CustomerId,
                request.TransactionAmount);

            var previousTransaction = await _context.FraudLogs
                .Where(x => x.CustomerId == request.CustomerId)
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefaultAsync();

            string? previousIpAddress = previousTransaction?.ClientIpAddress;
            string? previousCity = previousTransaction?.CurrentTransactionCity;

            var riskResult = RiskScoreCalculator.CalculateRiskScore(
                request.TransactionAmount,
                previousIpAddress,
                request.ClientIpAddress,
                previousCity,
                request.CurrentTransactionCity
            );

            int riskScore = riskResult.Score;
            bool isFraud = riskScore >= 80;
            string? aiExplanation = null;

            if (isFraud)
            {
                var tempLog = new FraudLog
                {
                    TransactionId = request.TransactionId > 0 ? request.TransactionId : (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds % 1000000000),
                    CustomerId = request.CustomerId,
                    AccountId = request.AccountId,
                    TransactionAmount = request.TransactionAmount,
                    TransactionType = string.IsNullOrEmpty(request.TransactionType) ? "TRANSFER" : request.TransactionType,
                    ClientIpAddress = string.IsNullOrEmpty(request.ClientIpAddress) ? "127.0.0.1" : request.ClientIpAddress,
                    CurrentTransactionCity = string.IsNullOrEmpty(request.CurrentTransactionCity) ? "Pune" : request.CurrentTransactionCity,
                    PreviousIpAddress = previousIpAddress,
                    PreviousTransactionCity = previousCity,
                    RiskScore = riskScore
                };

                try
                {
                    aiExplanation = await _aiExplanationService.GenerateFraudExplanationAsync(tempLog);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Gemini API failed for Fraud check");
                    aiExplanation = "AI explanation unavailable due to temporary service error.";
                }
            }

            return new FraudCheckResponse
            {
                IsFraud = isFraud,
                RiskScore = riskScore,
                Message = isFraud ? "Suspicious Transaction Detected" : "Transaction Safe",
                AIExplanation = aiExplanation
            };
        }

        public async Task RecordDecisionAsync(RecordDecisionRequest request)
        {
            _logger.LogInformation(
                "Recording Customer Fraud Decision: {Decision} for Customer {CustomerId}",
                request.Decision,
                request.CustomerId);

            try
            {
                var previousTransaction = await _context.FraudLogs
                    .Where(x => x.CustomerId == request.CustomerId)
                    .OrderByDescending(x => x.CreatedAt)
                    .FirstOrDefaultAsync();

                bool isAllowed = request.Decision.Equals("Allowed", StringComparison.OrdinalIgnoreCase);

                long genTxId = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds % 1000000000);

                var fraudLog = new FraudLog
                {
                    TransactionId = genTxId,
                    CustomerId = request.CustomerId,
                    AccountId = request.AccountId,
                    TransactionAmount = request.TransactionAmount,
                    TransactionType = string.IsNullOrEmpty(request.TransactionType) ? "TRANSFER" : request.TransactionType,
                    ClientIpAddress = string.IsNullOrEmpty(request.ClientIpAddress) ? "127.0.0.1" : request.ClientIpAddress,
                    CurrentTransactionCity = string.IsNullOrEmpty(request.CurrentTransactionCity) ? "Pune" : request.CurrentTransactionCity,
                    PreviousIpAddress = previousTransaction?.ClientIpAddress ?? "127.0.0.1",
                    PreviousTransactionCity = previousTransaction?.CurrentTransactionCity ?? "Pune",
                    RiskScore = request.RiskScore > 0 ? request.RiskScore : 85,
                    Status = FraudStatus.Flagged,
                    AlertMessage = "Suspicious Transaction Flagged",
                    CustomerDecision = isAllowed ? CustomerDecision.Allowed : CustomerDecision.Blocked,
                    ActionTaken = isAllowed ? ActionTaken.Allowed : ActionTaken.Blocked,
                    Reason = request.Reason ?? (isAllowed ? "Approved by customer security verification" : "Blocked by customer security verification"),
                    AIExplanation = !string.IsNullOrEmpty(request.AIExplanation) ? request.AIExplanation : "High value transfer security verification threshold exceeded.",
                    CreatedAt = DateTime.UtcNow,
                    AIProcessedAt = DateTime.UtcNow
                };

                _context.FraudLogs.Add(fraudLog);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Successfully recorded FraudLog ID {FraudId} with Decision {Decision}", fraudLog.FraudId, request.Decision);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to insert FraudLog record into MySQL database!");
                throw;
            }
        }
    }
}