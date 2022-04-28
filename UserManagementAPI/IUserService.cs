using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UserManagementAPI
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        User GetSpecificUser(int id);
        Task<ActionResult<User>> CreateUser(User user);
        Task<IActionResult> DeleteUser(int id); 
        Task<IActionResult> UpdateUser(User user);
    }
}
