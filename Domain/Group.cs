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
        
        public int aktiv { get; set; }
        
        public int aktiv_til_og_med { get; set; }
        
        public int opprettet { get; set; }

        public ICollection<UserGroup> UserGroups { get; set; }
    }
}