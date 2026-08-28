using MediatR;

namespace VBace.BuildingBlocks.Domain.Events;

public interface IDomainEvent : INotification
{
    Guid EventId { get; }
    DateTimeOffset OccurredOn { get; }
}
