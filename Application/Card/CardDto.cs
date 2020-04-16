using System;

namespace Application.Card
{
    public class CardDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public String KortNummer { get; set; }

        public DateTime Opprettet { get; set; }

    }
}