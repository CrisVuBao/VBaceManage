using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MediatR;
using VBace.Modules.Portfolio.Application.Projects.Queries.GetFeaturedProjects;

namespace VBace.Modules.Portfolio.Presentation;

public static class PortfolioModuleEndpoints
{
    public static void MapPortfolioEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/portfolio").WithTags("Portfolio");

        // Public Endpoints
        group.MapGet("/projects/featured", async (IMediator mediator) => 
        {
            var result = await mediator.Send(new GetFeaturedProjectsQuery());
            return Results.Ok(result);
        });

        group.MapGet("/skills", async (IMediator mediator) => 
        {
            var result = await mediator.Send(new VBace.Modules.Portfolio.Application.Skills.Queries.GetAllSkills.GetAllSkillsQuery());
            return Results.Ok(result);
        });
    }
}
