using System.Collections;
using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AccessGroup : IdentityRole
    {
        public virtual ICollection<UserRoles> UserRoles {get; set;}
    }
}