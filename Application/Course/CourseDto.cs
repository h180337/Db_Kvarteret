using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Course
{
    public class CourseDto
    {
        public Guid Id { get; set; }

        public string navn { get; set; }

        public string beskrivelse { get; set; }

        public int opprettet { get; set; }

        [JsonPropertyName("members")]
        public ICollection<CourseMemberDto> UserCourses { get; set; }
    }
}