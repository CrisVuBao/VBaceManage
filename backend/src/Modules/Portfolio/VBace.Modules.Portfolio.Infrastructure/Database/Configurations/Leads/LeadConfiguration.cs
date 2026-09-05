using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VBace.Modules.Portfolio.Domain.Leads;

namespace VBace.Modules.Portfolio.Infrastructure.Database.Configurations.Leads;

public class LeadConfiguration : IEntityTypeConfiguration<Lead>
{
    public void Configure(EntityTypeBuilder<Lead> builder)
    {
        builder.HasKey(l => l.Id);
        builder.Property(l => l.ClientName).IsRequired().HasMaxLength(200);
        builder.Property(l => l.Email).IsRequired().HasMaxLength(200);
        builder.Property(l => l.Industry).HasMaxLength(100);
        builder.Property(l => l.Services).HasMaxLength(500);
        builder.Property(l => l.Budget).HasMaxLength(100);
        builder.Property(l => l.Message).HasMaxLength(2000);
        builder.Property(l => l.Status).HasMaxLength(50);
    }
}
