using MediatR;
using Microsoft.EntityFrameworkCore;
using VBace.Modules.Portfolio.Application.Common;
using VBace.Modules.Portfolio.Application.Projects.DTOs;

namespace VBace.Modules.Portfolio.Application.Projects.Queries.GetFeaturedProjects;

public class GetFeaturedProjectsQueryHandler : IRequestHandler<GetFeaturedProjectsQuery, List<ProjectDto>>
{
    private readonly IPortfolioDbContext _context;
    private readonly ICacheService _cacheService;
    private const string CacheKey = "portfolio:projects:featured";

    public GetFeaturedProjectsQueryHandler(IPortfolioDbContext context, ICacheService cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }

    public async Task<List<ProjectDto>> Handle(GetFeaturedProjectsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cacheService.GetAsync<List<ProjectDto>>(CacheKey, cancellationToken);
        if (cached != null)
        {
            return cached;
        }

        var projects = await _context.Projects
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.SortOrder)
            .Select(p => new ProjectDto(
                p.Id,
                p.Title,
                p.Slug,
                p.ShortDescription,
                p.ThumbnailUrl,
                p.ProjectUrl,
                p.Technologies
            ))
            .ToListAsync(cancellationToken);

        await _cacheService.SetAsync(CacheKey, projects, TimeSpan.FromMinutes(30), cancellationToken);

        return projects;
    }
}
