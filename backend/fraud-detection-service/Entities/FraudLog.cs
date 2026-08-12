using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FraudDetectionService.Enums;

namespace FraudDetectionService.Entities
{
    [Table("fraudlog")]
    public class FraudLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FraudId { get; set; }

        [Required]
        public long TransactionId { get; set; }

        [Required]
        public long CustomerId { get; set; }

        [Required]
        public long AccountId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionAmount { get; set; }

        [Required]
        [MaxLength(30)]
        public string TransactionType { get; set; } = string.Empty;

        [Required]
        [MaxLength(45)]
        public string ClientIpAddress { get; set; } = string.Empty;

        [MaxLength(45)]
        public string? PreviousIpAddress { get; set; }

        [Required]
        [MaxLength(100)]
        public string CurrentTransactionCity { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? PreviousTransactionCity { get; set; }

        [Required]
        public int RiskScore { get; set; }

        [Required]
        public FraudStatus Status { get; set; }

        public string? AlertMessage { get; set; }

        [Required]
        public CustomerDecision CustomerDecision { get; set; } = Enums.CustomerDecision.Pending;

        [MaxLength(200)]
        public string? Reason { get; set; }

        [Required]
        public ActionTaken ActionTaken { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? AIExplanation { get; set; }

        public DateTime? AIProcessedAt { get; set; }
    }
}
