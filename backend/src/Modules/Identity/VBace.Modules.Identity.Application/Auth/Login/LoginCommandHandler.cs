using MediatR;
using Microsoft.EntityFrameworkCore;
using VBace.Modules.Identity.Application.Common;

namespace VBace.Modules.Identity.Application.Auth.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponse>
{
    private readonly IIdentityDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(IIdentityDbContext dbContext, IPasswordHasher passwordHasher, IJwtProvider jwtProvider)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }

    public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user == null || !_passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        // Load permissions for user
        var permissions = await (from ur in _dbContext.UserRoles
                                 join rp in _dbContext.RolePermissions on ur.RoleId equals rp.RoleId
                                 join p in _dbContext.Permissions on rp.PermissionId equals p.Id
                                 where ur.UserId == user.Id
                                 select p.Code).ToListAsync(cancellationToken);

        var accessToken = _jwtProvider.GenerateToken(user, permissions);
        var refreshToken = _jwtProvider.GenerateRefreshToken();

        // In a real app, save refreshToken to DB

        return new LoginResponse(accessToken, refreshToken, user.FullName, user.Email);
    }
}
