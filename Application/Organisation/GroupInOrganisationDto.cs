using System;

namespace Application.Organisation
{
    public class GroupInOrganisationDto
    {
        
        public string Id { get; set; }
        
        public string navn { get; set; }
        
        public string beskrivelse { get; set; }
        
        public int aktiv { get; set; }
        
        public int aktiv_til_og_med { get; set; }
        
        public int opprettet { get; set; }
    }
        
}