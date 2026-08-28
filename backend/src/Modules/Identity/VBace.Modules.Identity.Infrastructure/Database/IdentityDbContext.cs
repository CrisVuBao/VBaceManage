using Microsoft.EntityFrameworkCore;
using VBace.Modules.Identity.Domain.Users;
using VBace.Modules.Identity.Domain.Roles;
using VBace.Modules.Identity.Domain.Permissions;
using VBace.Modules.Identity.Application.Common;

namespace VBace.Modules.Identity.Infrastructure.Database;

public class IdentityDbContext : DbContext, IIdentityDbContext
{
    public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasDefaultSchema("identity");

        builder.Entity<User>(b =>
        {
            b.HasKey(u => u.Id);
            b.HasIndex(u => u.Email).IsUnique();
        });

        builder.Entity<Role>(b =>
        {
            b.HasKey(r => r.Id);
            b.HasIndex(r => r.Name).IsUnique();
        });

        builder.Entity<Permission>(b =>
        {
            b.HasKey(p => p.Id);
            b.HasIndex(p => p.Code).IsUnique();
        });

        builder.Entity<UserRole>(b =>
        {
            b.HasKey(ur => new { ur.UserId, ur.RoleId });
        });

        builder.Entity<RolePermission>(b =>
        {
            b.HasKey(rp => new { rp.RoleId, rp.PermissionId });
        });

        builder.Entity<RefreshToken>(b =>
        {
            b.HasKey(rt => rt.Id);
            b.HasIndex(rt => rt.Token).IsUnique();
        });

        base.OnModelCreating(builder);
    }
}
