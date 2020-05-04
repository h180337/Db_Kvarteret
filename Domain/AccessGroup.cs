using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AccessGroup : IdentityRole
    {
        public virtual ICollection<AppUserRoles> AppUserRoles { get; set; }
    }
}