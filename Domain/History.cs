using System;
using System.Collections.Generic;

namespace Domain
{
    public class History
    {
        public Guid Id { get; set; }

        public string GroupName { get; set; }

        public string Position { get; set; }

        public string GroupType { get; set; }

        public int Year { get; set; }

        public string Semester { get; set; }

        public virtual ICollection<UserHistory> UserHistory { get; set; }
    }
}