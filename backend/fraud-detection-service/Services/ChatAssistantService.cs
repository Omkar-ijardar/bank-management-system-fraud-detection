using FraudDetectionService.AI.Interfaces;

namespace FraudDetectionService.Services
{
    public class ChatAssistantService : IChatAssistantService
    {
        private readonly IGeminiClient _geminiClient;

        public ChatAssistantService(IGeminiClient geminiClient)
        {
            _geminiClient = geminiClient;
        }

        public async Task<string> AskAsync(string message)
        {
            string prompt = $"""
            You are an AI Banking Assistant.

            Your responsibilities:
            - Explain fraud detection concepts.
            - Answer banking security questions.
            - Explain transaction risks.
            - Suggest fraud prevention measures.

            User Question:
            {message}

            Reply professionally and clearly.
            """;

            return await _geminiClient.GenerateContentAsync(prompt);
        }
        
    }
}
