namespace LMS.Models
{
    public class UserModuleStatus
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int ModuleId { get; set; }
        public Module Module { get; set; }

        public int CompletionPercentage { get; set; } // 0 = Not started, 1-99 = In progress, 100 = Completed
        public DateTime LastUpdated { get; set; } // Timestamp of the last interaction
    }
}
