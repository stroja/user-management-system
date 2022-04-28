using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace UserManagementAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase 
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpGet("single")]
        public async Task<IActionResult> GetSpecificUser(int id)
        {
            return Ok(_userService.GetSpecificUser(id));
        }

        [HttpPost("create")]
        public async Task<ActionResult<User>> CreateNewUser ([FromBody] User user)
        {
            return Ok(await _userService.CreateUser(user));
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser (int id)
        {
         return Ok(await _userService.DeleteUser(id)); 
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser ([FromBody] User user)
        {
            return Ok(await _userService.UpdateUser(user));
        }

    }
}