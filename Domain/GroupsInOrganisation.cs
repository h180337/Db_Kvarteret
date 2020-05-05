using System;

namespace Domain
{
    public class GroupsInOrganisation
    {
        public Guid Id { get; set; }
        public virtual Organisation Organisation { get; set; }
        public Guid OrganisationId {get; set;}
        public virtual Group Group { get; set; }
        public Guid GroupId {get; set;}
        
    }
}