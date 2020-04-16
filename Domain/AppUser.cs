using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser: IdentityUser
    {
        public string fornavn { get; set; }
        
        public string etternavn { get; set; }
        
        public string kjonn { get; set; }
        
        public string workstatus { get; set; }
        
        public DateTime created { get; set; }
        
        public DateTime dateOfBirth { get; set; }

        public string streetAddress { get; set; }
        
        public string areaCode { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; }
        
        public virtual ICollection<UserCourse> UserCourses { get; set; }

        public virtual ICollection<UserCard> UserCards { get; set; }
    }
}