using System.Collections.Generic;
using MediatR;
using VBace.Modules.Portfolio.Application.Skills.DTOs;

namespace VBace.Modules.Portfolio.Application.Skills.Queries.GetAllSkills;

public record GetAllSkillsQuery : IRequest<List<SkillDto>>;
