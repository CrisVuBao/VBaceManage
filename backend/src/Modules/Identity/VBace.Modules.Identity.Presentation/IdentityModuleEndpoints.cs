using Microsoft.AspNetCore.Routing;
using VBace.Modules.Identity.Presentation.Endpoints;

namespace VBace.Modules.Identity.Presentation;

public static class IdentityModuleEndpoints
{
    public static void MapIdentityEndpoints(this IEndpointRouteBuilder app)
    {
        LoginEndpoint.Map(app);
    }
}
