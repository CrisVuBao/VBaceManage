using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using VBace.Modules.Portfolio.Application.Common;
using VBace.Modules.Portfolio.Infrastructure.Caching;
using VBace.Modules.Portfolio.Infrastructure.Database;

namespace VBace.Modules.Portfolio.Infrastructure.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddPortfolioInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<PortfolioDbContext>(options =>
            options.UseNpgsql(connectionString,
                npgsqlOptions => npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory", "portfolio")));

        services.AddScoped<IPortfolioDbContext>(provider => provider.GetRequiredService<PortfolioDbContext>());

        var redisConnectionString = configuration.GetConnectionString("Redis") ?? "localhost:6379";
        services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));
        services.AddSingleton<ICacheService, RedisCacheService>();

        return services;
    }
}
