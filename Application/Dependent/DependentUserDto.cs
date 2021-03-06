using System;

namespace Application.Dependent
{
    public class DependentUserDto
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
    }
}