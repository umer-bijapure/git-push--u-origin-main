using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICourseService _courseService;

        public UsersController(UserManager<ApplicationUser> userManager, ICourseService courseService)
        {
            _userManager = userManager;
            _courseService = courseService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { Message = "User API is working" });
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check for duplicate username or email
            var duplicateUsernames = await _userManager.FindByNameAsync(model.Email);
            var duplicateEmails = await _userManager.FindByEmailAsync(model.Email);

            if (duplicateUsernames != null || duplicateEmails != null)
            {
                var duplicates = new
                {
                    DuplicateUsernames = duplicateUsernames != null ? duplicateUsernames.UserName : null,
                    DuplicateEmails = duplicateEmails != null ? duplicateEmails.Email : null
                };

                return Conflict(new
                {
                    Message = "Duplicate username or email found.",
                    Duplicates = duplicates
                });
            }

            var user = new ApplicationUser
            {
                UserName = model.FirstName + model.LastName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNo = model.PhoneNo,
                Institution = model.Institution,
                State = model.State,
                City = model.City,
                Stream = model.Stream
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User created successfully." });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("{userId}/enroll/{courseId}")]
        public async Task<IActionResult> EnrollUserInCourse(string userId, int courseId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            var course = await _courseService.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound(new { Message = "Course not found." });
            }

            // Check if user is already enrolled in the course
            var userCourse = user.UserCourses.FirstOrDefault(uc => uc.CourseId == courseId);
            if (userCourse != null)
            {
                return Conflict(new { Message = "User is already enrolled in this course." });
            }

            // Enroll user in the course
            user.UserCourses.Add(new UserCourse
            {
                UserId = userId,
                CourseId = courseId
            });

            // Save changes
            await _userManager.UpdateAsync(user);

            return Ok(new { Message = "User enrolled in the course successfully." });
        }

        [HttpGet("allusers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.Select(user => new { user.Id, user.Email }).ToListAsync();
            return Ok(users);
        }


        // You can add other methods here if needed
    }
}
