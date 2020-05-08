using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Domain
{
    public class Group
    {
        public Guid Id { get; set; }

        public string navn { get; set; }

        public string beskrivelse { get; set; }

        public string aktiv { get; set; }

        public string groupType { get; set; }

        public DateTime aktiv_til_og_med { get; set; }

        public DateTime opprettet { get; set; }
        
        public virtual Photo GroupPhoto { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; }
        public Guid OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
    }
}