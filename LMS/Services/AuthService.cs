using Microsoft.AspNetCore.Identity;
using LMS.Models;
using System.Threading.Tasks;

namespace LMS.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<SignInResult> LoginAsync(LoginModel model)
        {
            // Perform login using SignInManager
            return await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);
        }

        public async Task<IdentityResult> RegisterAsync(RegisterModel model)
        {
            // Create a new ApplicationUser instance
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNo = model.PhoneNo,
                Institution = model.Institution,
                State = model.State,
                City = model.City,
                Stream = model.Stream
            };

            // Register the user using UserManager
            return await _userManager.CreateAsync(user, model.Password);
        }

        public async Task LogoutAsync()
        {
            // Perform logout using SignInManager
            await _signInManager.SignOutAsync();
        }
    }
}
