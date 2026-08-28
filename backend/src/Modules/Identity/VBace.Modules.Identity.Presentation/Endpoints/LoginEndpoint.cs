using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using VBace.Modules.Identity.Application.Auth.Login;

namespace VBace.Modules.Identity.Presentation.Endpoints;

public static class LoginEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/identity/login", async (LoginCommand command, IMediator mediator) =>
        {
            try
            {
                var response = await mediator.Send(command);
                return Results.Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Results.Unauthorized();
            }
        })
        .Produces<LoginResponse>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .WithName("Login")
        .WithTags("Identity");
    }
}
