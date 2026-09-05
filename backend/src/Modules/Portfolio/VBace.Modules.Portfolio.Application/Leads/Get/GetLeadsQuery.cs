using MediatR;
using Microsoft.EntityFrameworkCore;
using VBace.Modules.Portfolio.Application.Common;

namespace VBace.Modules.Portfolio.Application.Leads.Get;

public record LeadDto(
    Guid Id,
    string ClientName,
    string Email,
    string Industry,
    string Services,
    string Budget,
    string Message,
    string Status,
    DateTime CreatedAt);

public record GetLeadsQuery() : IRequest<List<LeadDto>>;

public class GetLeadsQueryHandler : IRequestHandler<GetLeadsQuery, List<LeadDto>>
{
    private readonly IPortfolioDbContext _context;

    public GetLeadsQueryHandler(IPortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<LeadDto>> Handle(GetLeadsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Leads
            .OrderByDescending(l => l.CreatedAt)
            .Select(l => new LeadDto(
                l.Id,
                l.ClientName,
                l.Email,
                l.Industry,
                l.Services,
                l.Budget,
                l.Message,
                l.Status,
                l.CreatedAt))
            .ToListAsync(cancellationToken);
    }
}
