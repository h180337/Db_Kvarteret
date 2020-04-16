using System;

namespace Domain
{
    public class UserCard
    {
        public Guid Id { get; set; }
        public virtual AppUser AppUser { get; set; }

        public virtual Card Card { get; set; }

        public DateTime DateAdded { get; set; }

    }
}