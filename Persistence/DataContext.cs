using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser,
    AccessGroup,
    string,
    IdentityUserClaim<string>,
    AppUserRoles,
    IdentityUserLogin<string>,
    IdentityRoleClaim<string>,
    IdentityUserToken<string>
    >
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        //table name inside sqlite
        public DbSet<Organisation> Organisations { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<UserGroup> UserGroups { get; set; }

        public DbSet<UserCourse> UserCourses { get; set; }

        public DbSet<Card> Cards { get; set; }

        public DbSet<UserCards> UserCards { get; set; }

        public DbSet<Tags> Tags { get; set; }

        public DbSet<UserTags> UserTags { get; set; }

        public DbSet<History> Historys { get; set; }

        public DbSet<UserHistory> UserHistory { get; set; }

        public DbSet<AccessGroupLevel> AccessGroupLevels { get; set; }

        public DbSet<Photo> ProfilePhoto { get; set; }

        public DbSet<UserOrganisationAdmin> UserOrganisationAdmins { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserGroup>(x => x.HasKey(ua =>
                new { ua.AppUserId, ua.GroupId }));

            builder.Entity<UserGroup>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserGroups)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserGroup>()
                .HasOne(a => a.Group)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(a => a.GroupId);

            builder.Entity<UserCourse>(x => x.HasKey(ua =>
                new { ua.AppUserId, ua.CourseId }));

            builder.Entity<UserCourse>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserCourses)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserCourse>()
                .HasOne(a => a.Course)
                .WithMany(u => u.UserCourses)
                .HasForeignKey(a => a.CourseId);

            builder.Entity<UserTags>()
                .HasKey(bc => new { bc.TagId, bc.AppUserId });

            builder.Entity<UserTags>()
                .HasOne(bc => bc.Tag)
                .WithMany(b => b.UserTags)
                .HasForeignKey(bc => bc.TagId);

            builder.Entity<UserTags>()
                .HasOne(bc => bc.AppUser)
                .WithMany(b => b.UserTags)
                .HasForeignKey(bc => bc.AppUserId);

            builder.Entity<UserCards>()
                .HasKey(bc => new { bc.CardId, bc.AppUserId });

            builder.Entity<UserCards>()
                .HasOne(uc => uc.Card)
                .WithMany(c => c.UserCards)
                .HasForeignKey(uc => uc.CardId);

            builder.Entity<UserCards>()
                .HasOne(uc => uc.AppUser)
                .WithMany(b => b.UserCards)
                .HasForeignKey(uc => uc.AppUserId);

            builder.Entity<UserHistory>()
            .HasKey(bc => new { bc.HistoryId, bc.AppUserId });

            builder.Entity<UserHistory>()
                .HasOne(uc => uc.History)
                .WithMany(c => c.UserHistory)
                .HasForeignKey(uc => uc.HistoryId);

            builder.Entity<UserHistory>()
                .HasOne(uc => uc.AppUser)
                .WithMany(b => b.UserHistory)
                .HasForeignKey(uc => uc.AppUserId);

            builder.Entity<AppUserRoles>()
                .HasOne(e => e.User)
                .WithMany(e => e.AppUserRoles)
                .HasForeignKey(e => e.UserId);

            builder.Entity<AppUserRoles>()
                .HasOne(e => e.Role)
                .WithMany(e => e.AppUserRoles)
                .HasForeignKey(e => e.RoleId);

            builder.Entity<Group>()
                .HasOne<Organisation>(e => e.Organisation)
                .WithMany(e => e.Groups);

            builder.Entity<Organisation>()
                .HasMany<Group>(e => e.Groups)
                .WithOne(e => e.Organisation);

            builder.Entity<UserOrganisationAdmin>()
            .HasKey(bc => new { bc.OrganisationId, bc.AppUserId });

            builder.Entity<UserOrganisationAdmin>()
                .HasOne(uc => uc.Organisation)
                .WithMany(c => c.UserOrganisationAdmins)
                .HasForeignKey(uc => uc.OrganisationId);

            builder.Entity<UserOrganisationAdmin>()
                .HasOne(uc => uc.AppUser)
                .WithMany(b => b.UserOrganisationAdmins)
                .HasForeignKey(uc => uc.AppUserId);
        }
    }
}
