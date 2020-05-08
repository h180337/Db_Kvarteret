using System;

namespace Application.User
{
    public class CardUserDto
    {
        public Guid Id { get; set; }
        public string CardNumber { get; set; }
        public DateTime Created { get; set; }
    }
}