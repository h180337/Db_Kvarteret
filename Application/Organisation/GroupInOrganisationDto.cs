using System;

namespace Application.Organisation
{
    public class GroupInOrganisationDto
    {
        
        public string Id { get; set; }
        
        public string navn { get; set; }
        
        public string beskrivelse { get; set; }
        
        public string aktiv { get; set; }
        
        public DateTime aktiv_til_og_med { get; set; }
        
        public DateTime opprettet { get; set; }
    }
        
}