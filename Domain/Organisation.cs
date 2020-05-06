using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{

    public class Organisation
    {
        public Guid Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public virtual ICollection<UserOrganisationAdmin> UserOrganisationAdmins { get; set; }

        public virtual ICollection<Group> Groups { get; set; }

    }
}