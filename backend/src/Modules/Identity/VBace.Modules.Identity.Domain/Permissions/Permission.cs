using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Identity.Domain.Permissions;

public class Permission : Entity, IAggregateRoot
{
    public string Module { get; private set; }
    public string Action { get; private set; }
    public string Resource { get; private set; }
    public string Code { get; private set; }
    public string DisplayName { get; private set; }
    public string? Description { get; private set; }

    private Permission() { } // EF Core

    public Permission(Guid id, string module, string action, string resource, string code, string displayName)
    {
        Id = id;
        Module = module;
        Action = action;
        Resource = resource;
        Code = code;
        DisplayName = displayName;
    }
}
