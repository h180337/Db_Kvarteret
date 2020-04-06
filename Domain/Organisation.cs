using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    
    public class Organisation
    {
        public Guid Id { get; set; }

        public string name { get; set; }
        
        public string description { get; set; }

        public virtual ICollection<GroupsInOrganisation> GroupsInOrganisations { get; set; }
        
    }
}