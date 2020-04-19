using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;

namespace Application.Tags
{
    public class TagsDto
    {
        public Guid Id { get; set; }

        public string tagText { get; set; }

        [JsonPropertyName("members")]
        public virtual ICollection<TagMemberDto> UserTags { get; set; }
    }
}