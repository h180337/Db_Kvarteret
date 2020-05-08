using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
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

        public virtual ICollection<UserTags> UserTags { get; set; }

        public virtual ICollection<UserHistory> UserHistory { get; set; }

        public virtual ICollection<AppUserRoles> AppUserRoles { get; set; }

        public virtual ICollection<UserOrganisationAdmin> UserOrganisationAdmins { get; set; }

        public virtual ICollection<Card> Cards { get; set; }

        public virtual Dependent Dependent { get; set; }

        public virtual Photo ProfilePhoto { get; set; }

    }
}