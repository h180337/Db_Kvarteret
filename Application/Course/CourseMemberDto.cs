using System;

namespace Application.Course
{
    public class CourseMemberDto
    {
        public string id { get; set; }

        public string Username { get; set; }

        public bool IsAdmin { get; set; }

        public string fornavn { get; set; }

        public string etternavn { get; set; }

        public string Email { get; set; }

        public string phoneNumber { get; set; }

        public string kjonn { get; set; }

        public string workstatus { get; set; }

        public DateTime created { get; set; }

        public DateTime dateOfBirth { get; set; }

        public string streetAddress { get; set; }

        public string areaCode { get; set; }
    }
}