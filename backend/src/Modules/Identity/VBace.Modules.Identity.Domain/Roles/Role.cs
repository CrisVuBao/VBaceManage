using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Identity.Domain.Roles;

public class Role : Entity, IAggregateRoot
{
    public string Name { get; private set; }
    public string DisplayName { get; private set; }
    public string? Description { get; private set; }
    public bool IsSystemRole { get; private set; }
    public int HierarchyLevel { get; private set; }

    private Role() { } // EF Core

    public Role(Guid id, string name, string displayName, bool isSystemRole, int hierarchyLevel)
    {
        Id = id;
        Name = name;
        DisplayName = displayName;
        IsSystemRole = isSystemRole;
        HierarchyLevel = hierarchyLevel;
    }
}
