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
                        Id = "c",
                        fornavn = "Ørjan",
                        etternavn = "jansen",
                        UserName = "orjanen",
                        kjonn = "man",
                        Email = "epost@epost.test",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-24),
                        streetAddress = "gateadresse",
                        areaCode = "12332",
                        PhoneNumber = "2312322",
                    },
                    new AppUser
                    {
                        Id = "b",
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
                        Id = "a",
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


            if (!context.Organisations.Any())
            {
                var organisations = new List<Organisation>()
                {
                    new Organisation
                    {
                        name = "Det Akademiske Kvarter",
                        description = "Knaksje den beste organisasjonen i landet",
                    },
                    new Organisation
                    {
                        name = "BSI",
                        description = "Say no more",
                    },
                    new Organisation
                    {
                        name = "AUFs studenter Bergen",
                        description = "Say even less",
                    },
                    new Organisation
                    {
                        name = "bstv",
                        description = "Tv i 2020?",
                    },
                };

                context.Organisations.AddRange(organisations);
                context.SaveChanges();
            }
            
             if (!context.Groups.Any()) 
            {
                var groups = new List<Group> 
                {
                    new Group 
                    {
                        navn = "TestGruppen",
                        beskrivelse = "Gruppen som tester nummer 1",
                        aktiv = 1,
                        aktiv_til_og_med = 10031994,
                        opprettet = 1020303,
                        UserGroups = new List<UserGroup>
                        {
                            new UserGroup
                            {
                                AppUserId = "c",
                                GroupAdmin = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserGroup
                            {
                                AppUserId = "a",
                                GroupAdmin = false,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                        }
                    },
                    new Group
                    {
                        navn = "TestGruppen2",
                        beskrivelse = "Gruppen som tester nummer 2",
                        aktiv = 1,
                        aktiv_til_og_med = 10031994,
                        opprettet = 1020303,
                        UserGroups = new List<UserGroup>
                        {
                            new UserGroup
                            {
                                AppUserId = "b",
                                GroupAdmin = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Group
                    {
                        navn = "TestGruppen3",
                        beskrivelse = "Gruppen som tester nummer 3",
                        aktiv = 0,
                        aktiv_til_og_med = 10031994,
                        opprettet = 1020303,
                        UserGroups = new List<UserGroup>
                        {
                            new UserGroup
                            {
                                AppUserId = "c",
                                GroupAdmin = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserGroup
                            {
                                AppUserId = "a",
                                GroupAdmin = false,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserGroup
                            {
                                AppUserId = "b",
                                GroupAdmin = false,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    }
                };
                context.Groups.AddRange(groups);
                context.SaveChanges();
            }
        }
    }
}