namespace FraudDetectionService.Enums
{
    /// <summary>
    /// The final action recorded against a fraud log entry once the flow settles.
    /// WaitingForCustomer is the transient state between an alert being raised
    /// and the customer actually responding.
    /// </summary>
    public enum ActionTaken
    {
        WaitingForCustomer,
        Approved,
        Blocked,
        Allowed
    }
}
