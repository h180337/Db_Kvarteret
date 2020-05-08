using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;

namespace Application.Card
{
    public class CardDto
    {
        public Guid Id { get; set; }
        public string CardNumber { get; set; }
        public DateTime Created { get; set; }

        [JsonPropertyName("members")]
        public virtual CardMemberDto AppUser { get; set; }
    }
}