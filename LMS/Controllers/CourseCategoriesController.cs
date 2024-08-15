using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LMS.Models;
using LMS.Services;

namespace LMS.Controllers
{
    [Route("api/category")]  // Updated route to "api/category"
    [ApiController]
    public class CourseCategoryController : ControllerBase
    {
        private readonly ICourseCategoryService _courseCategoryService;

        public CourseCategoryController(ICourseCategoryService courseCategoryService)
        {
            _courseCategoryService = courseCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseCategory>>> GetAllCategories()
        {
            var categories = await _courseCategoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }
        

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseCategory>> GetCategoryById(int id)
        {
            var category = await _courseCategoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<CourseCategory>> CreateCategory(CourseCategory category)
        {
            Console.WriteLine("Creatiniiiiiiing Categoryyyyyyyyy");
            var createdCategory = await _courseCategoryService.CreateCategoryAsync(category);
            Console.WriteLine($"Created Category: ID={createdCategory.Id}, Name={createdCategory.Name}, Description={createdCategory.Description}");

            return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CourseCategory category)
        {
            var updatedCategory = await _courseCategoryService.UpdateCategoryAsync(id, category);
            if (updatedCategory == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _courseCategoryService.DeleteCategoryAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
