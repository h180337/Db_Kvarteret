using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Dependent
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Telephone { get; set; }

        public DateTime Created { get; set; }

        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}