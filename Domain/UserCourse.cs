using System;

namespace Domain
{
    public class UserCourse
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid CourseId { get; set; }

        public virtual Course Course { get; set; }

        public DateTime DateJoined { get; set; }

        public bool CourseAdmin { get; set; }
    }
}