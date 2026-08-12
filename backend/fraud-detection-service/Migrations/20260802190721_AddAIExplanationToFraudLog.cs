using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FraudDetectionService.Migrations
{
    /// <inheritdoc />
    public partial class AddAIExplanationToFraudLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AIExplanation",
                table: "FraudLog",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "AIProcessedAt",
                table: "FraudLog",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AIExplanation",
                table: "FraudLog");

            migrationBuilder.DropColumn(
                name: "AIProcessedAt",
                table: "FraudLog");
        }
    }
}
