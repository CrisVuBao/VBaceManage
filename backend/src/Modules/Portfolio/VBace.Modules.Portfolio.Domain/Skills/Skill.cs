using System;
using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Portfolio.Domain.Skills;

public class Skill : Entity, IAggregateRoot
{
    public string Name { get; private set; }
    public string Category { get; private set; }
    public string IconUrl { get; private set; }
    public int SortOrder { get; private set; }

    private Skill() { } // EF Core

    public Skill(Guid id, string name, string category, string iconUrl, int sortOrder)
    {
        Id = id;
        Name = name;
        Category = category;
        IconUrl = iconUrl;
        SortOrder = sortOrder;
        CreatedAt = DateTime.UtcNow;
    }
}
