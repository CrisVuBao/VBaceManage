using MediatR;
using Microsoft.EntityFrameworkCore;
using VBace.Modules.Portfolio.Application.Common;
using VBace.Modules.Portfolio.Application.Skills.DTOs;

namespace VBace.Modules.Portfolio.Application.Skills.Queries.GetAllSkills;

public class GetAllSkillsQueryHandler : IRequestHandler<GetAllSkillsQuery, List<SkillDto>>
{
    private readonly IPortfolioDbContext _context;
    private readonly ICacheService _cacheService;
    private const string CacheKey = "portfolio:skills:all";

    public GetAllSkillsQueryHandler(IPortfolioDbContext context, ICacheService cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }

    public async Task<List<SkillDto>> Handle(GetAllSkillsQuery request, CancellationToken cancellationToken)
    {
        var cached = await _cacheService.GetAsync<List<SkillDto>>(CacheKey, cancellationToken);
        if (cached != null)
        {
            return cached;
        }

        var skills = await _context.Skills
            .OrderBy(s => s.SortOrder)
            .Select(s => new SkillDto(
                s.Id,
                s.Name,
                s.Category,
                s.IconUrl
            ))
            .ToListAsync(cancellationToken);

        await _cacheService.SetAsync(CacheKey, skills, TimeSpan.FromMinutes(60), cancellationToken);

        return skills;
    }
}
