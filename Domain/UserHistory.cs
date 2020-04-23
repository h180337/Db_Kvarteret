using System;

namespace Domain
{
    public class UserHistory
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid HistoryId { get; set; }
        public virtual History History { get; set; }
    }
}