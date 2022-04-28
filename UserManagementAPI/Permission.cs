using Newtonsoft.Json;
using System.Collections.Generic;

namespace UserManagementAPI
{
    public class Permission
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        public ICollection<UserPermission> UserPermissions { get; set; }
    }
}
