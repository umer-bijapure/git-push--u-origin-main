using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace LMS.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [EmailAddress]
        public override string Email { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNo { get; set; } = string.Empty;
        public string Institution { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Stream { get; set; } = string.Empty;
        public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();    }
}
