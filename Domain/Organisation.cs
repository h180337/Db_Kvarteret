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
        
        [JsonIgnore]
        public virtual ICollection<Group> Groups { get; set; }
        
    }
}