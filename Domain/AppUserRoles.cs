using System;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUserRoles : IdentityUserRole<string>
    {
        public AppUserRoles()
        {
        }

        public virtual AppUser User { get; set; }
        public virtual AccessGroup AccessGroup { get; set; }
        public override string UserId { get => base.UserId; set => base.UserId = value; }
        public override string RoleId { get => base.RoleId; set => base.RoleId = value; }

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}