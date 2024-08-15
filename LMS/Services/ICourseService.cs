using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Models;

namespace LMS.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<Course?> GetCourseByIdAsync(int id); // Nullable return type
        Task<Course> CreateCourseAsync(Course course);
        Task<Course?> UpdateCourseAsync(int id, Course course); // Nullable return type
        Task<bool> DeleteCourseAsync(int id); // Return type should be bool
    }
}
