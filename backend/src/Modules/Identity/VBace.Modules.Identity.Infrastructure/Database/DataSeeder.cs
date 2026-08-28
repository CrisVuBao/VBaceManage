using Microsoft.EntityFrameworkCore;
using VBace.Modules.Identity.Application.Auth;
using VBace.Modules.Identity.Domain.Permissions;
using VBace.Modules.Identity.Domain.Roles;
using VBace.Modules.Identity.Domain.Users;
using VBace.Modules.Identity.Infrastructure.Database;

namespace VBace.Modules.Identity.Infrastructure.Database;

public static class DataSeeder
{
    public static async Task SeedAsync(IdentityDbContext context, IPasswordHasher passwordHasher)
    {
        await context.Database.MigrateAsync();

        // 1. Seed Permissions
        var permissions = new List<Permission>
        {
            // Identity
            new Permission(Guid.NewGuid(), "users", "read", "users", "users.read", "Read Users"),
            new Permission(Guid.NewGuid(), "users", "write", "users", "users.write", "Write Users"),
            new Permission(Guid.NewGuid(), "roles", "read", "roles", "roles.read", "Read Roles"),
            new Permission(Guid.NewGuid(), "roles", "write", "roles", "roles.write", "Write Roles"),
            
            // Blog & Content
            new Permission(Guid.NewGuid(), "blog", "read", "blog", "blog.read", "Read Blog Posts"),
            new Permission(Guid.NewGuid(), "blog", "write", "blog", "blog.write", "Write Blog Posts"),
            
            // Interactions (Comments, Reviews)
            new Permission(Guid.NewGuid(), "interactions", "read", "comments", "comments.read", "Read Comments"),
            new Permission(Guid.NewGuid(), "interactions", "write", "comments", "comments.write", "Write Comments"),
            new Permission(Guid.NewGuid(), "interactions", "read", "reviews", "reviews.read", "Read Reviews"),
            new Permission(Guid.NewGuid(), "interactions", "write", "reviews", "reviews.write", "Write Reviews"),
            
            // Customer Profile
            new Permission(Guid.NewGuid(), "profile", "read", "customer", "customer.profile.read", "Read Own Profile"),
            new Permission(Guid.NewGuid(), "profile", "write", "customer", "customer.profile.write", "Update Own Profile")
        };

        var existingPermissions = await context.Permissions.Select(p => p.Code).ToListAsync();
        var newPermissions = permissions.Where(p => !existingPermissions.Contains(p.Code)).ToList();
        if (newPermissions.Any())
        {
            context.Permissions.AddRange(newPermissions);
            await context.SaveChangesAsync();
        }

        // 2. Seed Owner Role
        var ownerRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "owner");
        if (ownerRole == null)
        {
            ownerRole = new Role(Guid.NewGuid(), "owner", "Owner", true, 0);
            context.Roles.Add(ownerRole);
            await context.SaveChangesAsync();

            // Assign all permissions to Owner
            var allPermissions = await context.Permissions.ToListAsync();
            foreach (var perm in allPermissions)
            {
                context.RolePermissions.Add(new RolePermission(ownerRole.Id, perm.Id));
            }
            await context.SaveChangesAsync();
        }

        // 3. Seed Owner User
        var ownerEmail = "admin@vbace.com";
        var ownerUser = await context.Users.FirstOrDefaultAsync(u => u.Email == ownerEmail);
        if (ownerUser == null)
        {
            ownerUser = new User(Guid.NewGuid(), "Vu The Bao", ownerEmail, passwordHasher.Hash("P@ssw0rd123!"));
            context.Users.Add(ownerUser);
            await context.SaveChangesAsync();

            context.UserRoles.Add(new UserRole(ownerUser.Id, ownerRole.Id, null));
            await context.SaveChangesAsync();
        }

        // 4. Seed Customer Role
        var customerRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "customer");
        if (customerRole == null)
        {
            customerRole = new Role(Guid.NewGuid(), "customer", "Customer", true, 100);
            context.Roles.Add(customerRole);
            await context.SaveChangesAsync();

            // Assign customer specific permissions
            var customerPermissionCodes = new[] 
            { 
                "blog.read", 
                "comments.read", "comments.write", 
                "reviews.read", "reviews.write",
                "customer.profile.read", "customer.profile.write" 
            };
            
            var allPermissions = await context.Permissions.ToListAsync();
            var customerPerms = allPermissions.Where(p => customerPermissionCodes.Contains(p.Code));
            
            foreach (var perm in customerPerms)
            {
                context.RolePermissions.Add(new RolePermission(customerRole.Id, perm.Id));
            }
            await context.SaveChangesAsync();
        }
    }
}
