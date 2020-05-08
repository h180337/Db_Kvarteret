using System;
using System.Text.Json.Serialization;
using Domain;

namespace Application.Dependent
{
    public class DependentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Telephone { get; set; }
        public DateTime Created { get; set; }

        [JsonPropertyName("user")]
        public virtual DependentUserDto AppUser { get; set; }
    }
}