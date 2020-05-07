using System;

namespace Domain
{
    public class Dependent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Telephone { get; set; }
        public DateTime Created { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}