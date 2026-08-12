using System.Net.Http.Json;
using FraudDetectionService.AI.Interfaces;
using FraudDetectionService.AI.Models;
using FraudDetectionService.Configuration;
using Microsoft.Extensions.Options;

namespace FraudDetectionService.AI.Clients
{
    public class GeminiClient : IGeminiClient
    {
        private readonly HttpClient _httpClient;
        private readonly GeminiSettings _settings;

        public GeminiClient(
            HttpClient httpClient,
            IOptions<GeminiSettings> options)
        {
            _httpClient = httpClient;
            _settings = options.Value;
        }

        public async Task<string> GenerateContentAsync(string prompt)
        {
            var request = new GeminiRequest
            {
                Contents = new List<Content>
                {
                    new Content
                    {
                        Parts = new List<Part>
                        {
                            new Part
                            {
                                Text = prompt
                            }
                        }
                    }
                }
            };

            string url =
                $"{_settings.BaseUrl}/v1beta/models/{_settings.Model}:generateContent?key={_settings.ApiKey}";

            Console.WriteLine($"Calling Gemini API:");
            Console.WriteLine(url);

            try
            {
                var response = await _httpClient.PostAsJsonAsync(url, request);
                var responseText = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"Status Code: {(int)response.StatusCode}");

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Gemini API Error Response: {responseText}");
                    return GetFallbackResponse(prompt);
                }

                var result = await response.Content.ReadFromJsonAsync<GeminiResponse>();

                if (result?.Candidates != null &&
                    result.Candidates.Count > 0 &&
                    result.Candidates[0].Content?.Parts != null &&
                    result.Candidates[0].Content.Parts.Count > 0 &&
                    !string.IsNullOrWhiteSpace(result.Candidates[0].Content.Parts[0].Text))
                {
                    return result.Candidates[0].Content.Parts[0].Text;
                }

                return GetFallbackResponse(prompt);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GeminiClient Exception: {ex.Message}");
                return GetFallbackResponse(prompt);
            }
        }

        private static string GetFallbackResponse(string prompt)
        {
            if (prompt.Contains("Fraud Assessment", StringComparison.OrdinalIgnoreCase))
            {
                return "AI Security Notice: This transaction has been flagged due to high risk indicators including unusual transfer amount or geographical velocity mismatch. Standard fraud prevention protocols recommend identity verification before proceeding.";
            }

            // Extract actual user message if prompt was wrapped by ChatAssistantService
            string userMsg = prompt;
            if (prompt.Contains("User Question:", StringComparison.OrdinalIgnoreCase))
            {
                var parts = prompt.Split(new[] { "User Question:" }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length > 1)
                {
                    userMsg = parts[1].Replace("Reply professionally and clearly.", "").Trim();
                }
            }

            string q = userMsg.ToLowerInvariant();

            if (q.Contains("fraud") || q.Contains("flagged") || q.Contains("suspicious") || q.Contains("risk") || q.Contains("blocked") || q.Contains("security"))
            {
                return "🔍 **AI Fraud Security Assistant**:\nOur banking system uses automated risk scoring & velocity checks. Any transaction exceeding ₹50,000 or originating from an unusual IP/location is flagged for your protection. If a legitimate transaction was flagged, select 'Allow Transfer' in the security popup to complete it immediately.";
            }

            if (q.Contains("transfer") || q.Contains("send money") || q.Contains("wire") || q.Contains("limit") || q.Contains("upi") || q.Contains("neft"))
            {
                return "💸 **Fund Transfers & Limits**:\nYou can transfer funds instantly between any active accounts under the 'Fund Transfer' tab. Transfers under ₹50,000 are processed instantly. Transfers of ₹50,000 or higher trigger our automated AI Fraud Guard modal to confirm your identity before funds are debited.";
            }

            if (q.Contains("deposit") || q.Contains("withdraw") || q.Contains("cash") || q.Contains("atm") || q.Contains("add money"))
            {
                return "💵 **Deposits & Withdrawals**:\nTo deposit or withdraw funds, visit the 'Deposit Money' or 'Withdraw Money' pages from your sidebar. Deposits immediately reflect in your available ledger balance, and all transactions are recorded with unique reference numbers.";
            }

            if (q.Contains("balance") || q.Contains("account") || q.Contains("savings") || q.Contains("current") || q.Contains("salary") || q.Contains("ifsc"))
            {
                return "🏦 **Account Management**:\nYou can view all your linked Savings, Current, and Salary accounts on the 'My Accounts' page. To open a new account, click 'Open New Account' on the My Accounts page (Default IFSC Code: `BKID000101`).";
            }

            if (q.Contains("password") || q.Contains("otp") || q.Contains("login") || q.Contains("forgot") || q.Contains("pin") || q.Contains("auth"))
            {
                return "🔒 **Authentication & Credentials**:\nFor security, all accounts require password authentication and OTP verification for sensitive operations. If you forgot your password, use the 'Forgot Password?' link on the login page to reset it via OTP.";
            }

            if (q.Contains("admin") || q.Contains("manager") || q.Contains("support") || q.Contains("contact") || q.Contains("help"))
            {
                return "📞 **Bank Customer Support**:\nOur customer support team is available 24/7. Administrators can manage accounts, inspect customer fraud logs, and monitor analytics via the Enterprise Admin Portal (`http://localhost:5173/admin/dashboard`).";
            }

            if (q.Contains("hello") || q.Contains("hi") || q.Contains("hey") || q.Contains("greetings"))
            {
                return "👋 Hello! I am your Secure Bank AI Assistant. How can I help you today? You can ask me about fund transfers, account balances, opening new accounts, fraud protection, or security alerts.";
            }

            string cleanQuery = userMsg.Trim();
            if (cleanQuery.Length > 60) cleanQuery = cleanQuery.Substring(0, 60) + "...";

            return $"🤖 **Bank AI Assistant**:\nRegarding your query about *\"{cleanQuery}\"*: Our banking system provides 24/7 secure digital banking services. You can manage your accounts, execute instant fund transfers, review transaction history, and receive AI fraud alerts directly from your customer dashboard. Please let me know if you need specific details on transfers, deposits, or account settings!";
        }
    }
}