using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LMS.Models;
using LMS.Services;

namespace LMS.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await _authService.RegisterAsync(model);

            if (result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            Console.WriteLine("LLLLLLLLLLLLLLLLooooooooooooooooooogin");
            var result = await _authService.LoginAsync(model);

            if (result.Succeeded)
                return Ok(result);

            return Unauthorized(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.LogoutAsync();
            return Ok();
        }
    }
}
