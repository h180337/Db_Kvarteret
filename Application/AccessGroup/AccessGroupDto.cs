using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.AccessGroup
{
    public class AccessGroupDto
    {
        public string Id { get; set; }
        public string Name { get; set; }

        [JsonPropertyName("members")]
        public ICollection<AccessGroupMemberDto> AppUserRoles { get; set; }

    }
}