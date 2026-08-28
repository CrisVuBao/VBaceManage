namespace VBace.Modules.Identity.Domain.Users;

public class UserRole
{
    public Guid UserId { get; private set; }
    public Guid RoleId { get; private set; }
    public DateTimeOffset AssignedAt { get; private set; }
    public Guid? AssignedByUserId { get; private set; }

    private UserRole() { }

    public UserRole(Guid userId, Guid roleId, Guid? assignedByUserId)
    {
        UserId = userId;
        RoleId = roleId;
        AssignedByUserId = assignedByUserId;
        AssignedAt = DateTimeOffset.UtcNow;
    }
}
