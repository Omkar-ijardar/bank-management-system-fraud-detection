namespace FraudDetectionService.AI.Interfaces
{
    public interface IGeminiClient
    {
        Task<string> GenerateContentAsync(string prompt);
    }
}
