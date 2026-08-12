using FraudDetectionService.Data;
using FraudDetectionService.DTOs;
using FraudDetectionService.Entities;
using FraudDetectionService.Enums;
using FraudDetectionService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FraudDetectionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FraudController : ControllerBase
    {
        private readonly IFraudService _fraudService;
        private readonly FraudDbContext _context;

        public FraudController(IFraudService fraudService, FraudDbContext context)
        {
            _fraudService = fraudService;
            _context = context;
        }

        [HttpPost("check")]
        public async Task<IActionResult> CheckFraud(FraudCheckRequest request)
        {
            var response = await _fraudService.CheckFraudAsync(request);
            return Ok(response);
        }

        [HttpPost("record-decision")]
        public async Task<IActionResult> RecordDecision([FromBody] RecordDecisionRequest request)
        {
            await _fraudService.RecordDecisionAsync(request);
            return Ok(new { success = true, message = $"Fraud event recorded as {request.Decision}" });
        }

        [HttpGet("internal/dashboard/total")]
        public async Task<ActionResult<long>> GetTotalFraudCases()
        {
            var count = await _context.FraudLogs.CountAsync();
            return Ok((long)count);
        }

        [HttpGet("internal/dashboard/pending")]
        public async Task<ActionResult<long>> GetPendingFraudCases()
        {
            var count = await _context.FraudLogs.CountAsync(f => f.Status == FraudStatus.Flagged || f.CustomerDecision == CustomerDecision.Pending);
            return Ok((long)count);
        }

        [HttpGet("logs")]
        public async Task<IActionResult> GetAllFraudLogs()
        {
            var logs = await _context.FraudLogs.OrderByDescending(f => f.CreatedAt).ToListAsync();
            return Ok(logs);
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetFraudLogsByCustomer(long customerId)
        {
            var logs = await _context.FraudLogs
                .Where(f => f.CustomerId == customerId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
            return Ok(logs);
        }
    }
}
