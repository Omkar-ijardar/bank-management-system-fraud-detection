using Microsoft.EntityFrameworkCore;
using FraudDetectionService.Entities;

namespace FraudDetectionService.Data
{
    public class FraudDbContext : DbContext
    {
        public FraudDbContext(DbContextOptions<FraudDbContext> options) : base(options)
        {
        }

        public DbSet<FraudLog> FraudLogs => Set<FraudLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FraudLog>(entity =>
            {
                // Store enums as their string names (e.g. "Flagged") rather than
                // raw integers — keeps the database self-documenting and matches
                // the string-based enum convention used by the Java services.
                entity.Property(f => f.Status)
                      .HasConversion<string>()
                      .HasMaxLength(20);

                entity.Property(f => f.CustomerDecision)
                      .HasConversion<string>()
                      .HasMaxLength(10);

                entity.Property(f => f.ActionTaken)
                      .HasConversion<string>()
                      .HasMaxLength(20);

                // Non-unique index on TransactionId for fast lookups.
                // Multiple flagged/blocked events may share TransactionId = 0.
                entity.HasIndex(f => f.TransactionId);

                // Supports GET /api/fraud/customer/{customerId} without a full table scan.
                entity.HasIndex(f => f.CustomerId);
            });
        }
    }
}
