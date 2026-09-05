using System;

namespace VBace.Modules.Portfolio.Domain.Leads;

public class Lead
{
    public Guid Id { get; private set; }
    public string ClientName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Industry { get; private set; } = string.Empty;
    public string Services { get; private set; } = string.Empty; 
    public string Budget { get; private set; } = string.Empty;
    public string Message { get; private set; } = string.Empty;
    public string Status { get; private set; } = "New";
    public DateTime CreatedAt { get; private set; }

    private Lead() { } 

    public static Lead Create(string clientName, string email, string industry, string services, string budget, string message)
    {
        return new Lead
        {
            Id = Guid.NewGuid(),
            ClientName = clientName,
            Email = email,
            Industry = industry,
            Services = services,
            Budget = budget,
            Message = message,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };
    }
}
