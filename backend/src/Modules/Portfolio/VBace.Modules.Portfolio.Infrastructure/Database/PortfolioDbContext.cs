using Microsoft.EntityFrameworkCore;
using VBace.Modules.Portfolio.Domain.Projects;
using VBace.Modules.Portfolio.Domain.Services;
using VBace.Modules.Portfolio.Domain.Skills;

using VBace.Modules.Portfolio.Application.Common;

namespace VBace.Modules.Portfolio.Infrastructure.Database;

public class PortfolioDbContext : DbContext, IPortfolioDbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Skill> Skills { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("portfolio");
        
        modelBuilder.Entity<Project>(builder =>
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Title).IsRequired().HasMaxLength(200);
            builder.Property(p => p.Slug).IsRequired().HasMaxLength(200);
            builder.HasIndex(p => p.Slug).IsUnique();
        });

        modelBuilder.Entity<Service>(builder =>
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Title).IsRequired().HasMaxLength(200);
        });

        modelBuilder.Entity<Skill>(builder =>
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Name).IsRequired().HasMaxLength(100);
        });

        base.OnModelCreating(modelBuilder);
    }
}
