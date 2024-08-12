using System.Collections.Generic;

namespace LMS.Models
{
    public class Institution
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Course> Courses { get; set; }
    }
}
