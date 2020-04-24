using System;

namespace Domain
{
    public class AccessGroupLevel
    {
        public Guid Id { get; set; }
        public string AccessName { get; set; }
        public int Level { get; set; }
        public virtual AccessGroup AccessGroup { get; set; }
    }
}