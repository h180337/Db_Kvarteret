using System;
using System.Collections.Generic;

namespace Domain
{
    public class Course
    {
        public Guid Id { get; set; }

        public string navn { get; set; }

        public string beskrivelse { get; set; }

        public DateTime opprettet { get; set; }

        public virtual ICollection<UserCourse> UserCourses { get; set; }

    }
}