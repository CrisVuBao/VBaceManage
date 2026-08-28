using System;
using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Portfolio.Domain.Services;

public class Service : Entity, IAggregateRoot
{
    public string Title { get; private set; }
    public string Description { get; private set; }
    public string Icon { get; private set; }
    public decimal BasePrice { get; private set; }
    public bool IsActive { get; private set; }
    public int SortOrder { get; private set; }

    private Service() { } // EF Core

    public Service(Guid id, string title, string description, string icon, decimal basePrice, bool isActive, int sortOrder)
    {
        Id = id;
        Title = title;
        Description = description;
        Icon = icon;
        BasePrice = basePrice;
        IsActive = isActive;
        SortOrder = sortOrder;
        CreatedAt = DateTime.UtcNow;
    }
}
