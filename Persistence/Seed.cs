using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

// droping the date base cd into main folder and type "dotnet ef database drop -p Persistence/ -s API/" in the terminal

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        fornavn = "Ørjan",
                        etternavn = "jansen",
                        UserName = "orjanen",
                        kjonn = "man",
                        Email = "epost@epost.test",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "gateadresse",
                        areaCode = "12332",
                        PhoneNumber = "2312322",
                    },
                    new AppUser
                    {
                        fornavn = "Kjetil",
                        etternavn = "dumdum",
                        UserName = "dum",
                        kjonn = "man",
                        Email = "dum@epost.test",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "some",
                        areaCode = "1111",
                        PhoneNumber = "99999999",
                    },
                    new AppUser
                    {
                        fornavn = "Jane",
                        etternavn = "ta",
                        UserName = "ta",
                        kjonn = "woman",
                        Email = "ta@epost.test",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "notthinggata",
                        areaCode = "2222",
                        PhoneNumber = "22222222",
                    }
                };

                foreach (var user in users)
                {
                   await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if (!context.Personal.Any())
            {
                var personell = new List<Personal>()
                {
                    new Personal
                    {
                        fornavn = "Ørjan",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Man",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "12332",
                        telefon = "2312322",
                    },
                    new Personal
                    {
                        fornavn = "eli",
                        etternavn = "jansen",
                        brukerkonto = "elij",
                        kjonn = "Woman",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "1234",
                        telefon = "32134231",
                    },
                    new Personal
                    {
                        fornavn = "gree",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Woman",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "43234",
                        telefon = "43524433"
                    },
                    new Personal
                    {
                        fornavn = "per",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Man",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "45331",
                        telefon = "534213456"
                    },
                    new Personal
                    {
                        fornavn = "pål",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Man",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-23),
                        fodselsdato = DateTime.Now.AddMonths(-12),
                        gateadresse = "gateadresse",
                        postnummerid = "65565",
                        telefon = "91233202"
                    },
                    new Personal
                    {
                        fornavn = "ask",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Man",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "87654",
                        telefon = "91233202"
                    },
                    new Personal
                    {
                        fornavn = "samsk",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Woman",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "87654",
                        telefon = "91233202"
                    },
                    new Personal
                    {
                        fornavn = "dask",
                        etternavn = "jansen",
                        brukerkonto = "orjanen",
                        kjonn = "Man",
                        epost = "epost@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "566457",
                        telefon = "91233202"
                    },
                    new Personal
                    {
                        fornavn = "test",
                        etternavn = "jansen",
                        brukerkonto = "tesss",
                        kjonn = "Man",
                        epost = "eree@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "564567",
                        telefon = "91233202"
                    },
                    new Personal
                    {
                        fornavn = "task",
                        etternavn = "teast",
                        brukerkonto = "orjansadfen",
                        kjonn = "Woman",
                        epost = "rrrrr@epost.test",
                        arb_status = "active",
                        opprettet = DateTime.Now.AddMonths(-2),
                        fodselsdato = DateTime.Now.AddMonths(-2),
                        gateadresse = "gateadresse",
                        postnummerid = "657567",
                        telefon = "91233202"
                    }
                };

                context.Personal.AddRange(personell);
                context.SaveChanges();
            }
        }
    }
}