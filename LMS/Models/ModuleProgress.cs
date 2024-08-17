namespace LMS.Models
{
    public class ModuleProgress
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public Module Module { get; set; }

        public ProgressStatus Status { get; set; } = ProgressStatus.NotStarted;
        public double CompletionPercentage { get; set; } = 0; // 0 to 100
    }

    public enum ProgressStatus
    {
        NotStarted,
        InProgress,
        Completed
    }
}
