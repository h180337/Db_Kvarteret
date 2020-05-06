using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Group;
using Domain;

namespace Application.Organisation
{
    public class OrganisationDto
    {
        public Guid Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }
        
        [JsonPropertyName("admins")]
        public virtual ICollection<OrganisationAdminDto> UserOrganisationAdmins { get; set; }

        
        public virtual ICollection<OrganisationGroupDto> Groups { get; set; }
    }
}