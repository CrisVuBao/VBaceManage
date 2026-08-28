import { Metadata } from "next";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Vu The Bao - VIP Portfolio",
  description: "Detailed professional portfolio and resume of Vu The Bao.",
};

type SkillDto = {
  id: string;
  name: string;
  category: string;
  iconUrl: string;
};

type ProjectDto = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string;
  projectUrl: string;
  technologies: string[];
};

export default async function VIPPortfolioPage() {
  // Fetch real data from the .NET Backend API (SSR)
  let skills: SkillDto[] = [];
  try {
    const skillsRes = await fetch("http://localhost:5023/api/portfolio/skills", { cache: "no-store" });
    if (skillsRes.ok) {
      skills = await skillsRes.json();
    }
  } catch (e) {
    console.error("Failed to fetch skills", e);
  }

  let projects: ProjectDto[] = [];
  try {
    const projectsRes = await fetch("http://localhost:5023/api/portfolio/projects/featured", { cache: "no-store" });
    if (projectsRes.ok) {
      projects = await projectsRes.json();
    }
  } catch (e) {
    console.error("Failed to fetch projects", e);
  }

  return <PortfolioClient skills={skills} projects={projects} />;
}
