using System;

namespace Domain
{
    public class UserOrganisationAdmin
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public bool orgAdmin { get; set; }
        public Guid OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
    }
}