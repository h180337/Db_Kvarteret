using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class UserRoles : IdentityUserRole<string>
    {
        public virtual AppUser User { get; set; }
        public virtual AccessGroup Role { get; set; }
    }
}