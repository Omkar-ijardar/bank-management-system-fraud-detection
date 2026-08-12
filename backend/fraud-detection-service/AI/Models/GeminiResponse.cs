namespace FraudDetectionService.AI.Models
{
    public class GeminiResponse
    {
        public List<Candidate> Candidates { get; set; } = new();
    }

    public class Candidate
    {
        public Content Content { get; set; } = new();
    }
}
