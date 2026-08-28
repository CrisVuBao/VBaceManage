using VBace.Modules.Identity.Domain.Users;

namespace VBace.Modules.Identity.Application.Auth;

public interface IJwtProvider
{
    string GenerateToken(User user, IEnumerable<string> permissions);
    string GenerateRefreshToken();
}
