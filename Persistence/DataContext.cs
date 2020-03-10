using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //table name inside sqlite
        public DbSet<Personal> Personal { get; set; }
        
    }
}