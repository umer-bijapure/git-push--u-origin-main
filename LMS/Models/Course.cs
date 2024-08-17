using System.Collections.Generic;

namespace LMS.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }  // Optional
        public int? CourseCategoryId { get; set; }  // Optional Foreign key to CourseCategory
        public CourseCategory? CourseCategory { get; set; }  // Optional
        public List<Quiz>? Quizzes { get; set; }  // Optional
        public List<Module>? Modules { get; set; }  // Optional
        public List<Group>? Groups { get; set; }  // Optional
        public List<Attendance>? Attendances { get; set; }  // Optional
        
        // New fields
        public DateTime? StartDate { get; set; }  // Optional Start date
        public DateTime? EndDate { get; set; }  // Optional End date
        public string? ProfilePicture { get; set; }  // Optional URL or path to profile picture
    }
}
