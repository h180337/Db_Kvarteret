using System;
using Domain;

namespace Application.Dependent
{
    public class DependentDto
    {
        public string Name { get; set; }
        public string Telephone { get; set; }
        public DateTime Created { get; set; }
        public virtual DependentUserDto AppUser { get; set; }
    }
}