using System;

namespace Domain
{
    public class UserCard
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid CardId { get; set; }

        public virtual Card Card { get; set; }

        public DateTime DateAdded { get; set; }

    }
}