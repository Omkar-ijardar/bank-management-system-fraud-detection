namespace FraudDetectionService.Services
{
    public interface IChatAssistantService
    {
        Task<string> AskAsync(string message);
    }
}
