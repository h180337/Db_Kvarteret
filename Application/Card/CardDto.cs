using System;
using Domain;

namespace Application.Card
{
    public class CardDto
    {
        public Guid Id { get; set; }

        public String KortNummer { get; set; }

        public DateTime Opprettet { get; set; }

        public virtual UserCard UserCard {get; set;}

    }
}