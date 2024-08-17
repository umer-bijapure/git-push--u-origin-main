namespace LMS.Models
{
    public class Module
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PdfLink { get; set; } // Path to the PDF file
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
