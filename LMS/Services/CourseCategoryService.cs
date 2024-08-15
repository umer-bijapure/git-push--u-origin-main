
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Models;

namespace LMS.Services
{
    public class CourseCategoryService : ICourseCategoryService
    {
        private readonly ApplicationDbContext _context;

        public CourseCategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseCategory>> GetAllCategoriesAsync()
        {
            return await _context.CourseCategories.ToListAsync();
        }

        public async Task<CourseCategory> GetCategoryByIdAsync(int id)
        {
            return await _context.CourseCategories.FindAsync(id);
        }

        public async Task<CourseCategory> CreateCategoryAsync(CourseCategory category)
        {
            _context.CourseCategories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<CourseCategory> UpdateCategoryAsync(int id, CourseCategory category)
        {
            var existingCategory = await _context.CourseCategories.FindAsync(id);
            if (existingCategory == null)
            {
                return null;
            }
            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;
            await _context.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.CourseCategories.FindAsync(id);
            if (category == null)
            {
                return false;
            }
            _context.CourseCategories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
