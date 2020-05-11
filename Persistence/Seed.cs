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
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<AccessGroup> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var role1 = new AccessGroup { Name = "Superuser" };
                var role2 = new AccessGroup { Name = "Bruker" };
                var role3 = new AccessGroup { Name = "Gruppeadministrator" };
                await roleManager.CreateAsync(role1);
                await roleManager.CreateAsync(role2);
                await roleManager.CreateAsync(role3);

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "c",
                        fornavn = "Khim",
                        etternavn = "Bruker",
                        UserName = "khim",
                        kjonn = "man",
                        Email = "epost@epost.test",
                        workstatus = "active",
                        created = DateTime.Now,
                        dateOfBirth = DateTime.Now.AddMonths(-24),
                        streetAddress = "Olav Kyrres gate 1",
                        areaCode = "5004",
                        PhoneNumber = "90807060",
                    },
                    new AppUser
                    {
                        Id = "b",
                        fornavn = "Oda",
                        etternavn = "Superuser",
                        UserName = "oda",
                        kjonn = "man",
                        Email = "oda@testmail.com",
                        workstatus = "active",
                        created = DateTime.Now,
                        dateOfBirth = DateTime.Now.AddMonths(+2),
                        streetAddress = "Olav Kyrres Gate 1",
                        areaCode = "5057",
                        PhoneNumber = "90807060",
                    },
                    new AppUser
                    {
                        Id = "a",
                        fornavn = "Tone",
                        etternavn = "Superuser",
                        UserName = "tonehans",
                        kjonn = "woman",
                        Email = "tonehansen@hotmail.com",
                        workstatus = "active",
                        created = DateTime.Now,
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "Olav Kyrres gate 10",
                        areaCode = "5004",
                        PhoneNumber = "45283852",
                    }
                };


                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    if (user.Id == "a")
                    {
                        await userManager.AddToRoleAsync(user, role1.ToString());
                    }
                    if (user.Id == "b")
                    {
                        await userManager.AddToRoleAsync(user, role2.ToString());
                    }
                    if (user.Id == "c")
                    {
                        await userManager.AddToRoleAsync(user, role3.ToString());
                    }

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
                        Groups = new List<Group>
                            {
                                new Group
                                {
                                    navn = "Personalgruppen",
                                    beskrivelse = "Har ansvar for rekruttering, ivaretaking av kompetanse og opprettholdelse av et godt arbeids og internsosialt miljø. Etablert i mai 2007.",
                                    aktiv = "active",
                                    aktiv_til_og_med = DateTime.Now.AddMonths(-2),
                                    opprettet = DateTime.Now.AddMonths(-2),
                                    groupType = "group",
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
                                    navn = "Kvarterstyret",
                                    beskrivelse = "Kvarterstyret er det husets daglige styre og har overordnet ansvar for driften av Det Akademiske Kvarter.",
                                    aktiv = "active",
                                    aktiv_til_og_med = DateTime.Now.AddMonths(-2),
                                    opprettet = DateTime.Now.AddMonths(-2),
                                    groupType = "group",
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
                                    navn = "PR-etaten",
                                    beskrivelse = "Opprettet for å styrke satsningen på PR ved sammenslåing av informasjonsgruppen og eksponeringsetaten på 35. ordinære GF (Vår2012).",
                                    aktiv = "active",
                                    groupType = "project",
                                    aktiv_til_og_med = DateTime.Now.AddMonths(-2),
                                    opprettet = DateTime.Now.AddMonths(-2),
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
                            }
                    },
                    new Organisation
                    {
                        name = "Studentersamfunnet i Bergen",
                        description = "",
                    },
                    new Organisation
                    {
                        name = "Mannskoret Arme Riddere",
                        description = "Det offisielle mannskoret ved Universitetet i Bergen.",
                    },
                    new Organisation
                    {
                        name = "Bergen Realistforening",
                        description = "Bergen realistforening arrangerer konserter og andre arrangementer for i hovedsak studenter i Bergen. Vi driv på ideelt grunnlag.",
                    },
                };

                context.Organisations.AddRange(organisations);
                context.SaveChanges();
            }

            if (!context.Tags.Any())
            {
                var tags = new List<Tags>()
                {
                    new Tags
                    {
                        tagText = "IT-Personell",
                        UserTags = new List<UserTags>
                        {
                            new UserTags
                            {
                                AppUserId = "c",

                            }
                        }
                    },
                    new Tags
                    {
                        tagText = "Leder",
                        UserTags = new List<UserTags>
                        {
                            new UserTags
                            {
                                AppUserId = "c",

                            },
                            new UserTags
                            {
                                AppUserId = "a",

                            },
                            new UserTags
                            {
                                AppUserId = "b",

                            }
                        }

                    },
                    new Tags
                    {
                        tagText = "Utvikler"
                    },
                    new Tags
                    {
                        tagText = "Arbeidsledig"
                    },
                    new Tags
                    {
                        tagText = "Løsningsorientert"
                    }
                };
                context.Tags.AddRange(tags);
                context.SaveChanges();
            }


            if (!context.Cards.Any())
            {
                var cards = new List<Card>()
                {
                    new Card
                    {
                        CardNumber = "1198",
                        Created = DateTime.Now.AddMonths(-2),
                        AppUser = context.Users.FirstOrDefault()
                    },
                    new Card
                    {
                        CardNumber = "14",
                        Created = DateTime.Now.AddMonths(-1),
                        AppUser = context.Users.FirstOrDefault()
                        
                    },
                    new Card
                    {
                        CardNumber = "1047",
                        Created = DateTime.Now.AddMonths(-3),
                        AppUser = context.Users.FirstOrDefault()
                        
                    },
                    new Card
                    {
                        CardNumber = "1060",
                        Created = DateTime.Now.AddMonths(-4),
                        AppUser = context.Users.FirstOrDefault()
                    },
                };

                context.Cards.AddRange(cards);
                context.SaveChanges();
            }

            if (!context.Dependents.Any())
            {
                var dependents = new List<Dependent>()
                {
                    new Dependent
                    {
                        Name = "Stine Stinesen",
                        Telephone = "98564342",
                        AppUser = context.Users.Find("c"),
                        Created = DateTime.Now.AddMonths(-2),


                    },
                    new Dependent
                    {
                        Name = "John Johnsen",
                        Telephone = "95678665",
                        AppUser = context.Users.Find("c"),
                        Created = DateTime.Now.AddMonths(-1),

                    },
                    new Dependent
                    {
                        Name = "Per Persen",
                        Telephone = "92394939",
                        AppUser = context.Users.Find("b"),
                        Created = DateTime.Now.AddMonths(-3),

                    },
                    new Dependent
                    {
                        Name = "Kjell Kjellesen",
                        Telephone = "93566656",
                        AppUser = context.Users.Find("a"),
                        Created = DateTime.Now.AddMonths(-4),
                    },
                };

                context.Dependents.AddRange(dependents);
                context.SaveChanges();
            }

            if (!context.Historys.Any())
            {
                var historys = new List<History>()
                {
                    new History
                    {
                        GroupName = "Ledergruppen",
                        Position = "Leder",
                        GroupType = "Group",
                        Year = 1994,
                        Semester = "H",
                        UserHistory = new List<UserHistory> {
                            new UserHistory { AppUserId = "c" },
                            new UserHistory { AppUserId = "a" },
                        }

                    },
                    new History
                    {
                        GroupName = "Ledergruppen",
                        Position = "Leder",
                        GroupType = "Group",
                        Year = 1994,
                        Semester = "H"

                    },
                    new History
                    {
                        GroupName = "Arbeidsgruppen",
                        Position = "Leder",
                        GroupType = "Group",
                        Year = 1994,
                        Semester = "H"

                    },
                };

                context.Historys.AddRange(historys);
                context.SaveChanges();
            }


            if (!context.Courses.Any())
            {
                var courses = new List<Course>
                {
                    new Course
                    {
                        navn = "Ordensvaktkurs",
                        beskrivelse = "Ordensvaktkurset som vakt og kvartene får mot 3 semesters binding",
                        opprettet = DateTime.Now,
                        UserCourses = new List<UserCourse>
                        {
                            new UserCourse
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserCourse
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                        }
                    },
                    new Course
                    {
                        navn = "Ansvarlig Vertskap",
                        beskrivelse = "Dette kurset er beregnet å gis til medlemme av skjenkegruppen for å sørge for at dens medlemmer har en god forståelse for skjenkeregler. Kurset krever et semesters binding",
                        opprettet = DateTime.Now,
                        UserCourses = new List<UserCourse>
                        {
                            new UserCourse
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Course
                    {
                        navn = "Skjenkeopplæring",
                        beskrivelse = "Opplæring i Alkoholloven er gjennomført og har signert på dette.",
                        opprettet = DateTime.Now,
                        UserCourses = new List<UserCourse>
                        {
                            new UserCourse
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserCourse
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                            new UserCourse
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    }
                };
                context.Courses.AddRange(courses);
                context.SaveChanges();
            }
        }
    }
}