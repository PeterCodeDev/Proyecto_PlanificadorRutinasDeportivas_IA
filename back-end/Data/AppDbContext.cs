using Microsoft.EntityFrameworkCore;
using SmartWorkoutApi.Models;

namespace SmartWorkoutApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Esto le dice a EF Core que cree una tabla llamada 'Usuarios'
        public DbSet<Usuario> Usuarios { get; set; }
    }
}

