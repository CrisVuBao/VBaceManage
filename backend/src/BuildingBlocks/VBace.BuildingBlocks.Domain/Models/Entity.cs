namespace VBace.BuildingBlocks.Domain.Models;

public abstract class Entity
{
    public Guid Id { get; protected set; }
    public DateTimeOffset CreatedAt { get; protected set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; protected set; }

    protected void UpdateTimestamp() => UpdatedAt = DateTimeOffset.UtcNow;
}
