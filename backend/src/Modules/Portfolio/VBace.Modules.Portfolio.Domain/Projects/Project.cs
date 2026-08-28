using System;
using System.Collections.Generic;
using VBace.BuildingBlocks.Domain.Models;

namespace VBace.Modules.Portfolio.Domain.Projects;

public class Project : Entity, IAggregateRoot
{
    public string Title { get; private set; }
    public string Slug { get; private set; }
    public string ShortDescription { get; private set; }
    public string Content { get; private set; }
    public string ThumbnailUrl { get; private set; }
    public string ProjectUrl { get; private set; }
    public List<string> Technologies { get; private set; }
    public bool IsFeatured { get; private set; }
    public int SortOrder { get; private set; }

    private Project() { } // EF Core

    public Project(Guid id, string title, string slug, string shortDescription, string content, string thumbnailUrl, string projectUrl, List<string> technologies, bool isFeatured, int sortOrder)
    {
        Id = id;
        Title = title;
        Slug = slug;
        ShortDescription = shortDescription;
        Content = content;
        ThumbnailUrl = thumbnailUrl;
        ProjectUrl = projectUrl;
        Technologies = technologies;
        IsFeatured = isFeatured;
        SortOrder = sortOrder;
        CreatedAt = DateTime.UtcNow;
    }
}
