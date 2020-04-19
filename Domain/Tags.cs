using System;
using System.Collections.Generic;

namespace Domain
{
    public class Tags
    {
        public Guid Id { get; set; }

        public string tagText { get; set; }

        public virtual ICollection<UserTags> UserTags { get; set; }
    }
}