using Microsoft.EntityFrameworkCore;
using VBace.Modules.Identity.Domain.Users;
using VBace.Modules.Identity.Domain.Roles;
using VBace.Modules.Identity.Domain.Permissions;

namespace VBace.Modules.Identity.Application.Common;

public interface IIdentityDbContext
{
    DbSet<User> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<Permission> Permissions { get; }
    DbSet<UserRole> UserRoles { get; }
    DbSet<RolePermission> RolePermissions { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
