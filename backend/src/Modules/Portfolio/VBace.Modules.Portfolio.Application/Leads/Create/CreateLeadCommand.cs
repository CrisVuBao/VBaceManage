using MediatR;
using VBace.Modules.Portfolio.Application.Common;
using VBace.Modules.Portfolio.Domain.Leads;

namespace VBace.Modules.Portfolio.Application.Leads.Create;

public record CreateLeadCommand(
    string ClientName, 
    string Email, 
    string Industry, 
    string Services, 
    string Budget, 
    string Message) : IRequest<Guid>;

public class CreateLeadCommandHandler : IRequestHandler<CreateLeadCommand, Guid>
{
    private readonly IPortfolioDbContext _context;

    public CreateLeadCommandHandler(IPortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateLeadCommand request, CancellationToken cancellationToken)
    {
        var lead = Lead.Create(
            request.ClientName, 
            request.Email, 
            request.Industry, 
            request.Services, 
            request.Budget, 
            request.Message);
            
        _context.Leads.Add(lead);
        await _context.SaveChangesAsync(cancellationToken);
        
        return lead.Id;
    }
}
