using System;

namespace Domain
{
    public class UserTags
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid TagId { get; set; }
        public virtual Tags Tag { get; set; }
    }
}