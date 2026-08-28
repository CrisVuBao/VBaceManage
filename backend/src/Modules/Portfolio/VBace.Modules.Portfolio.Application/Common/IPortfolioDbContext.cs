using Microsoft.EntityFrameworkCore;
using VBace.Modules.Portfolio.Domain.Projects;
using VBace.Modules.Portfolio.Domain.Services;
using VBace.Modules.Portfolio.Domain.Skills;

namespace VBace.Modules.Portfolio.Application.Common;

public interface IPortfolioDbContext
{
    DbSet<Project> Projects { get; }
    DbSet<Service> Services { get; }
    DbSet<Skill> Skills { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
