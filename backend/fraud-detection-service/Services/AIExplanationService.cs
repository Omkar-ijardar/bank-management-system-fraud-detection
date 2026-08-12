using FraudDetectionService.AI.Interfaces;
using FraudDetectionService.AI.Prompts;
using FraudDetectionService.Entities;

namespace FraudDetectionService.Services
{
    public class AIExplanationService : IAIExplanationService
    {
        private readonly IGeminiClient _geminiClient;

        public AIExplanationService(IGeminiClient geminiClient)
        {
            _geminiClient = geminiClient;
        }

        public async Task<string> GenerateFraudExplanationAsync(FraudLog fraudLog)
        {
            
            string prompt = FraudExplanationPrompt.Build(fraudLog);

            
            return await _geminiClient.GenerateContentAsync(prompt);
        }
    }
}