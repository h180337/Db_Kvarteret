using System;

namespace Domain
{
    public class UserGroup
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid GroupId { get; set; }

        public Group Group { get; set; }

        public DateTime DateJoined { get; set; }

        public bool GroupAdmin { get; set; }
    }
}