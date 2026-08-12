using FraudDetectionService.DTOs;

namespace FraudDetectionService.Services.Interfaces
{
    public interface IFraudService
    {
        Task<FraudCheckResponse> CheckFraudAsync(FraudCheckRequest request);
        Task RecordDecisionAsync(RecordDecisionRequest request);
    }
}
