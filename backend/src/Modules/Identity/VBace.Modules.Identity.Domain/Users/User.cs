using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Identity.Domain.Users;

public class User : Entity, IAggregateRoot
{
    public string FullName { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public string? AvatarUrl { get; private set; }
    public string? Phone { get; private set; }
    public string? Bio { get; private set; }
    public string Status { get; private set; } = "active";
    public Guid? InvitedByUserId { get; private set; }
    public DateTimeOffset? LastLoginAt { get; private set; }

    private readonly List<UserRole> _userRoles = new();
    public IReadOnlyCollection<UserRole> UserRoles => _userRoles.AsReadOnly();

    private readonly List<RefreshToken> _refreshTokens = new();
    public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens.AsReadOnly();

    private User() { } // EF Core

    public User(Guid id, string fullName, string email, string passwordHash)
    {
        Id = id;
        FullName = fullName;
        Email = email;
        PasswordHash = passwordHash;
        CreatedAt = DateTimeOffset.UtcNow;
    }
}
