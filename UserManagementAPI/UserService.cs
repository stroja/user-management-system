using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagementAPI.DataContext;
using System;

namespace UserManagementAPI
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        //// GET: api/Users
        public List<User> GetAllUsers()
        {
            return _context.Users.Include(u => u.UserPermissions)
                                .ThenInclude(up => up.Permission).ToList();
        }

        public User GetSpecificUser(int id)
        {
            var user = new User();
            try
            {
                user = _context.Users.First(u => u.Id == id);
            }
            catch (Exception ex)
            {
                Debug.Write(ex.Message);
            }
            return user;
        }

        public async Task<ActionResult<User>> CreateUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Debug.Write(ex.Message);
            }
            return GetSpecificUser(user.Id);
        }

        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    throw new System.Exception();
                }
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.Write(ex.Message);
            }

            return new OkObjectResult(null);
        }

        public async Task<IActionResult> UpdateUser(User user)
        {
            try
            {
                var original = _context.Users.Include(u => u.UserPermissions).FirstOrDefault(u => u.Id == user.Id);

                if (original != null)
                {
                    original.FirstName = user.FirstName;
                    original.LastName = user.LastName;
                    original.UserName = user.UserName;
                    original.EmailAddress = user.EmailAddress;
                    original.Password = user.Password;
                    original.Status = user.Status;

                    var userPermissions = _context.UserPermissions.Where(p => p.UserId == user.Id).ToList();

                    _context.UserPermissions.RemoveRange(userPermissions);
                    _context.Entry(original).State = EntityState.Modified;
                    _context.Update(original);
                }

                if (user.UserPermissions != null)
                {
                    original.UserPermissions = user.UserPermissions;
                    _context.Update(original);
                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return new OkObjectResult(user);
        }
    }
}
