using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Models;

namespace LMS.Services
{
    public interface IUserService
    {
        Task<ApplicationUser> GetUserByIdAsync(string userId);
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
    }
}
