namespace FraudDetectionService.AI.Models
{
    public class GeminiRequest
    {
        public List<Content> Contents { get; set; } = new();
    }

    public class Content
    {
        public List<Part> Parts { get; set; } = new();
    }

    public class Part
    {
        public string Text { get; set; } = string.Empty;
    }
}
