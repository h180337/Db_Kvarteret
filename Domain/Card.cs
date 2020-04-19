using System;

namespace Domain
{
    public class Card
    {
        public Guid Id { get; set; }

        public string KortNummer { get; set; }

        public DateTime Opprettet { get; set; }

        public string AppUserId { get; set; }

        public virtual UserCard UserCard { get; set; }
    }
}