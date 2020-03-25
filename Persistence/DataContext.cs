using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //table name inside sqlite
        public DbSet<Organisation> Organisations { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<UserGroup> UserGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserGroup>(x => x.HasKey(ua =>
                new {ua.AppUserId, ua.GroupId}));

            builder.Entity<UserGroup>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserGroups)
                .HasForeignKey(u => u.AppUserId);
            
            builder.Entity<UserGroup>()
                .HasOne(a => a.Group)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(a => a.GroupId);
        }
    }
}