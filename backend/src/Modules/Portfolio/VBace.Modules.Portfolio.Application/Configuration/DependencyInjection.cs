using Microsoft.Extensions.DependencyInjection;

namespace VBace.Modules.Portfolio.Application.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddPortfolioApplication(this IServiceCollection services)
    {
        services.AddMediatR(config => 
        {
            config.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
        });

        return services;
    }
}
