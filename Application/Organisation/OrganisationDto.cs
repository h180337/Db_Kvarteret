using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Organisation
{
    public class OrganisationDto
    {
        public Guid Id { get; set; }

        public string name { get; set; }
        
        public string description { get; set; }
        
        [JsonPropertyName("groups")]
        public virtual ICollection<GroupInOrganisationDto> GroupsInOrganisations { get; set; }
    }
}