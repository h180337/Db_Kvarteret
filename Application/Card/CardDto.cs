using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;

namespace Application.Card
{
    public class CardDto
    {
        public Guid Id { get; set; }

        public String KortNummer { get; set; }

        public DateTime Opprettet { get; set; }

        [JsonPropertyName("members")]
        public virtual ICollection<CardMemberDto> UserCards { get; set; }
 

    }
}