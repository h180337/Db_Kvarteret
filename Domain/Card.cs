using System;

namespace Domain
{
    public class Card
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public String KortNummer { get; set; }

        public DateTime Opprettet { get; set; }
    }
}