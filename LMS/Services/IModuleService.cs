using System.Threading.Tasks;
using LMS.Models;
using LMS.Dtos;

namespace LMS.Services
{
    public interface IModuleService
    {
        Task<ServiceResponse<Module>> CreateModuleAsync(ModuleDto moduleDto);
        Task<ServiceResponse<Module>> UpdateModuleAsync(int id, ModuleDto moduleDto);
        Task<ServiceResponse<bool>> DeleteModuleAsync(int id);
    }
}
