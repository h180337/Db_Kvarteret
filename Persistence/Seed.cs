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
                var role1 = new AccessGroup {Name = "Superuser"};
                var role2 = new AccessGroup {Name = "Bruker"};
                var role3 = new AccessGroup {Name = "Gruppeadministrator"};
                await roleManager.CreateAsync(role1);
                await roleManager.CreateAsync(role2);
                await roleManager.CreateAsync(role3);
                
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "c",
                        fornavn = "Ørjan",
                        etternavn = "Enes",
                        UserName = "OrjanE",
                        kjonn = "man",
                        Email = "epost@epost.test",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-24),
                        streetAddress = "Olav Kyrres gate 1",
                        areaCode = "5004",
                        PhoneNumber = "45838282",
                    },
                    new AppUser
                    {
                        Id = "b",
                        fornavn = "Kjetil",
                        etternavn = "Hunshammer",
                        UserName = "kjetilhunshammer",
                        kjonn = "man",
                        Email = "kjetil.hunshammer@gmail.com",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "Bøhmergaten 35",
                        areaCode = "5057",
                        PhoneNumber = "46843482",
                    },
                    new AppUser
                    {
                        Id = "a",
                        fornavn = "Tone",
                        etternavn = "Hansen",
                        UserName = "tonehans",
                        kjonn = "woman",
                        Email = "tonehansen@hotmail.com",
                        workstatus = "active",
                        created = DateTime.Now.AddMonths(-2),
                        dateOfBirth = DateTime.Now.AddMonths(-2),
                        streetAddress = "Olav Kyrres gate 10",
                        areaCode = "5004",
                        PhoneNumber = "45283852",
                    }
                };
                

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    if(user.Id == "a") {
                        await userManager.AddToRoleAsync(user, role1.ToString());
                    }
                    if(user.Id == "b") {
                        await userManager.AddToRoleAsync(user, role2.ToString());
                    }
                    if(user.Id == "c") {
                        await userManager.AddToRoleAsync(user, role3.ToString());
                    }
                    
                }
            }
            if (!context.AccessGroupLevels.Any())
            {
                var accessGroupLevels = new List<AccessGroupLevel>()
                {
                    new AccessGroupLevel
                    {
                        AccessName = "Group",
                        Level = 1,
                        AccessGroup = context.AccessGroups.FirstOrDefault()
                    },
                    new AccessGroupLevel
                    {
                        AccessName = "Course",
                        Level = 2,
                        AccessGroup = context.AccessGroups.FirstOrDefault()
                    }
                };

                context.AccessGroupLevels.AddRange(accessGroupLevels);
                context.SaveChanges();
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

            if (!context.Tags.Any())
            {
                var tags = new List<Tags>()
                {
                    new Tags
                    {
                        tagText = "It",
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
                        tagText = "DramaQueen",
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
                        tagText = "Model"
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
                        KortNummer = "3254543",
                        Opprettet = DateTime.Now.AddMonths(-2),
                        UserCards = new List<UserCards> {
                            new UserCards
                            {
                                AppUserId = "b",
                            }
                        }

                    },
                    new Card
                    {
                        KortNummer = "1023020",
                        Opprettet = DateTime.Now.AddMonths(-1),
                        UserCards = new List<UserCards> {
                            new UserCards
                            {
                                AppUserId = "b",
                            }
                        }
                    },
                    new Card
                    {
                        KortNummer = "432576",
                        Opprettet = DateTime.Now.AddMonths(-3),
                        UserCards = new List<UserCards> {
                            new UserCards
                            {
                                AppUserId = "b",
                            }
                        }
                    },
                    new Card
                    {
                        KortNummer = "123465",
                        Opprettet = DateTime.Now.AddMonths(-4),
                    },
                };

                context.Cards.AddRange(cards);
                context.SaveChanges();
            }

              if (!context.Historys.Any())
            {
                var historys = new List<History>()
                {
                    new History
                    {
                        GroupName = "Gamlegruppen",
                        Position = "Leder",
                        GroupType = "Group",
                        Year = 1994,
                        Semester = "H",
                        UserHistory = new List<UserHistory> {
                            new UserHistory
                            {
                                AppUserId = "c",
                            },
                            new UserHistory
                            {
                                AppUserId = "a"
                            },
                        }
                        
                    },
                    new History
                    {
                        GroupName = "Testgruppen",
                        Position = "Leder",
                        GroupType = "Group",
                        Year = 1994,
                        Semester = "H"
                        
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

            if (!context.Groups.Any())
            {
                var groups = new List<Group>
                {
                    new Group
                    {
                        navn = "TestGruppen",
                        beskrivelse = "Gruppen som tester nummer 1",
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
                        navn = "TestGruppen2",
                        beskrivelse = "Gruppen som tester nummer 2",
                        aktiv = "active",
                        aktiv_til_og_med = DateTime.Now.AddMonths(-2),
                        opprettet = DateTime.Now.AddMonths(-2),
                        groupType = "commity",
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
                        aktiv = "inactive",
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
                };
                context.Groups.AddRange(groups);
                context.SaveChanges();
            }
            if (!context.Courses.Any())
            {
                var courses = new List<Course>
                {
                    new Course
                    {
                        navn = "Test kurs",
                        beskrivelse = "Kurs i .net helvet",
                        opprettet = 1020303,
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
                        navn = "TestGruppen2",
                        beskrivelse = "Gruppen som tester nummer 2",
                        opprettet = 1020303,
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
                        navn = "TestGruppen3",
                        beskrivelse = "Gruppen som tester nummer 3",
                        opprettet = 1020303,
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