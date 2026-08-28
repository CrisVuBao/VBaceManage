using System;
using System.Collections.Generic;

namespace VBace.Modules.Portfolio.Application.Projects.DTOs;

public record ProjectDto(
    Guid Id,
    string Title,
    string Slug,
    string ShortDescription,
    string ThumbnailUrl,
    string ProjectUrl,
    List<string> Technologies
);
