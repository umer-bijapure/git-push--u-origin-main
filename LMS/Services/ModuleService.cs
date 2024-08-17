using System.Threading.Tasks;
using LMS.Models;
using LMS.Dtos;


namespace LMS.Services
{
    public class ModuleService : IModuleService
    {
        private readonly ApplicationDbContext _context;

        public ModuleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<Module>> CreateModuleAsync(ModuleDto moduleDto)
        {
            var module = new Module
            {
                Title = moduleDto.Title,
                PdfLink = moduleDto.PdfLink,
                CourseId = moduleDto.CourseId
            };

            _context.Modules.Add(module);
            await _context.SaveChangesAsync();

            return new ServiceResponse<Module> { Data = module };
        }

        public async Task<ServiceResponse<Module>> UpdateModuleAsync(int id, ModuleDto moduleDto)
        {
            var module = await _context.Modules.FindAsync(id);
            if (module == null)
            {
                return new ServiceResponse<Module> { Success = false, Message = "Module not found" };
            }

            module.Title = moduleDto.Title;
            module.PdfLink = moduleDto.PdfLink;

            _context.Modules.Update(module);
            await _context.SaveChangesAsync();

            return new ServiceResponse<Module> { Data = module };
        }

        public async Task<ServiceResponse<bool>> DeleteModuleAsync(int id)
        {
            var module = await _context.Modules.FindAsync(id);
            if (module == null)
            {
                return new ServiceResponse<bool> { Success = false, Message = "Module not found" };
            }

            _context.Modules.Remove(module);
            await _context.SaveChangesAsync();

            return new ServiceResponse<bool> { Data = true };
        }
    }
}
