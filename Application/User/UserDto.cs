using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Course;
using Application.Group;

namespace Application.User
{
    public class UserDto
    {
        public string Id { get; set; }
        
        public string fornavn { get; set; }

        public string etternavn { get; set; }

        public string phoneNumber { get; set; }

        public string userName { get; set; }

        public string kjonn { get; set; }
        
        public string Email { get; set; }
        
        public string workstatus { get; set; }

        public DateTime created { get; set; }

        public DateTime dateOfBirth { get; set; }

        public string streetAddress { get; set; }

        public string areaCode { get; set; }

        public string Token { get; set; }

        [JsonPropertyName("groups")]
        public ICollection<GroupDto> UserGroups { get; set; }

        [JsonPropertyName("courses")]
        public ICollection<CourseDto> UserCourses { get; set; }
    }
}