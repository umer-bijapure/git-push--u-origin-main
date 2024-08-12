using Microsoft.AspNetCore.Identity;
using LMS.Models;
using System.Threading.Tasks;

namespace LMS.Services
{
    public interface IAuthService
    {
        Task<SignInResult> LoginAsync(LoginModel model);
        Task<IdentityResult> RegisterAsync(RegisterModel model);
        Task LogoutAsync(); // Add this method

    }
}
