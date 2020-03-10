using System;

namespace Domain
{
    
    public class Personal
    {
        public Guid Id { get; set; }

        public string fornavn { get; set; }
        
        public string etternavn { get; set; }
        
        public string brukerkonto { get; set; }

        public string kjonn { get; set; }
        
        public string epost { get; set; }
        
        public string telefon { get; set; }
        
        public string arb_status { get; set; }
        
        public DateTime opprettet { get; set; }
        
        public DateTime fodselsdato { get; set; }

        public string gateadresse { get; set; }
        
        public string postnummerid { get; set; }
        
    }
}