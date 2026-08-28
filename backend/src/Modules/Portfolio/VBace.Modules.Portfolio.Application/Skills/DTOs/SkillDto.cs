using System;

namespace VBace.Modules.Portfolio.Application.Skills.DTOs;

public record SkillDto(
    Guid Id,
    string Name,
    string Category,
    string IconUrl
);
