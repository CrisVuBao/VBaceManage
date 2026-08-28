using System.Collections.Generic;
using MediatR;
using VBace.Modules.Portfolio.Application.Projects.DTOs;

namespace VBace.Modules.Portfolio.Application.Projects.Queries.GetFeaturedProjects;

public record GetFeaturedProjectsQuery : IRequest<List<ProjectDto>>;
