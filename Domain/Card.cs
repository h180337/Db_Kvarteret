using System;
using System.Collections.Generic;

namespace Domain
{
    public class Card
    {
        public Guid Id { get; set; }

        public string KortNummer { get; set; }

        public DateTime Opprettet { get; set; }

        public string AppUserId { get; set; }

        public virtual ICollection<UserCards> UserCards { get; set; }
    }
}