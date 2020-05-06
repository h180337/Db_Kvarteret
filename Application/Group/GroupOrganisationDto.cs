using System;
using System.Text.Json.Serialization;

namespace Application.Group
{
    public class GroupOrganisationDto
    {
        public Guid Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }
        
    }
}