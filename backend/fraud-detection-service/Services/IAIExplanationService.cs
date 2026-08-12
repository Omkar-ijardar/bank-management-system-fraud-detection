using FraudDetectionService.Entities;

namespace FraudDetectionService.Services
{
    public interface IAIExplanationService
    {
        Task<string> GenerateFraudExplanationAsync(
            FraudLog fraudLog);
    }
}
