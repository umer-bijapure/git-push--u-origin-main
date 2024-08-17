using Microsoft.AspNetCore.Mvc;
using LMS.Services;
using LMS.Models;
using LMS.Dtos;

namespace LMS.Controllers
{
    [ApiController]
    [Route("api/module")]
    public class ModulesController : ControllerBase
    {
        private readonly IModuleService _moduleService;

        public ModulesController(IModuleService moduleService)
        {
            _moduleService = moduleService;
        }

        [HttpPost("create-module")]
        public async Task<IActionResult> CreateModule([FromBody] ModuleDto moduleDto)
        {
            var result = await _moduleService.CreateModuleAsync(moduleDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id, [FromBody] ModuleDto moduleDto)
        {
            var result = await _moduleService.UpdateModuleAsync(id, moduleDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            var result = await _moduleService.DeleteModuleAsync(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
    }
}
