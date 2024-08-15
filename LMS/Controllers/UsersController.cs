using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json; // Add this at the top if not already present

namespace LMS.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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

    }
}
