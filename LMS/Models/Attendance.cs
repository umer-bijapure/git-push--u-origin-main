using System;

namespace LMS.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool Present { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int InstitutionId { get; set; }
        public Institution Institution { get; set; }
    }
}
