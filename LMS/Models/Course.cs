using System.Collections.Generic;

namespace LMS.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CourseCategoryId { get; set; }
        public CourseCategory CourseCategory { get; set; }
        public List<Quiz> Quizzes { get; set; }
        public List<Module> Modules { get; set; }
        public List<Group> Groups { get; set; }
        public List<Attendance> Attendances { get; set; }
    }
}
