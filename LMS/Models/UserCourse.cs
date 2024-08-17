using System.Collections.Generic;

namespace LMS.Models
{
    public class UserCourse
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        // Track progress for each module within the course
        public List<ModuleProgress> ModuleProgresses { get; set; } = new List<ModuleProgress>();
    }
}
