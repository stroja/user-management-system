using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementAPI
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(150)]
        public string LastName { get; set; }

        [StringLength(256)]
        public string EmailAddress { get; set; }
  
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Status { get; set; }

        public ICollection<UserPermission> UserPermissions { get; set; }
    }
}
