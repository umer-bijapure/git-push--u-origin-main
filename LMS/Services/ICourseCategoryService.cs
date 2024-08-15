using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Models;

namespace LMS.Services
{
    public interface ICourseCategoryService
    {
        Task<IEnumerable<CourseCategory>> GetAllCategoriesAsync();
        Task<CourseCategory> GetCategoryByIdAsync(int id);
        Task<CourseCategory> CreateCategoryAsync(CourseCategory category);
        Task<CourseCategory> UpdateCategoryAsync(int id, CourseCategory category);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
