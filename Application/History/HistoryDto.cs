using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.History
{
    public class HistoryDto
    {
        public Guid Id { get; set; }

        public string GroupName { get; set; }

        public string Position { get; set; }

        public string GroupType { get; set; }

        public int Year { get; set; }

        public string Semester { get; set; }

        [JsonPropertyName("members")]
        public virtual ICollection<HistoryMemberDto> UserHistory { get; set; }
    }
}