using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Organisation;

namespace Application.Group
{
    public class GroupDto
    {
        public Guid Id { get; set; }

        public string navn { get; set; }

        public string beskrivelse { get; set; }

        public string aktiv { get; set; }

        public string groupType { get; set; }

        public DateTime aktiv_til_og_med { get; set; }

        public DateTime opprettet { get; set; }

        [JsonPropertyName("members")]
        public ICollection<GroupMemberDto> UserGroups { get; set; }

        [JsonPropertyName("organisation")]
        public GroupOrganisationDto Organisation { get; set; }
    }
}