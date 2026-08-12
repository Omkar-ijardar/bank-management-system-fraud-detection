using FraudDetectionService.DTOs;
using FraudDetectionService.Services;
using Microsoft.AspNetCore.Mvc;

namespace FraudDetectionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatAssistantService _chatService;

        public ChatController(IChatAssistantService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("chat")]
        public async Task<ActionResult<ChatResponse>> Chat([FromBody] ChatRequest request)
        {
            try
            {
                var response = await _chatService.AskAsync(request.Message);

                return Ok(new ChatResponse
                {
                    Response = response
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}