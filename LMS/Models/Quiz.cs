namespace LMS.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string Answer { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
