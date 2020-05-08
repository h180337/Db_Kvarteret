using System;
using System.Collections.Generic;

namespace Domain
{
    public class Card
    {
        public Guid Id { get; set; }

        public string CardNumber { get; set; }

        public DateTime Created { get; set; }

        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}