namespace FraudDetectionService.Enums
{
    /// <summary>
    /// Lifecycle status of a fraud check.
    /// ALLOW, REVIEW, FLAGGED are set by the initial risk calculation.
    /// APPROVED, BLOCKED are set afterward, once the customer responds
    /// (only relevant when the initial status was REVIEW or FLAGGED).
    /// </summary>
    public enum FraudStatus
    {
        Allow,
        Review,
        Flagged,
        Approved,
        Blocked
    }
}
