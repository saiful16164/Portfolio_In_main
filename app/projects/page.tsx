"use client";

import { useState } from "react";
import SectionHeading from "@/app/components/SectionHeading";
import ProjectCard from "@/app/components/ProjectCard";
import { projectCategories, Project } from "@/app/data";
import portfolioData from "@/app/data/portfolio-data.json";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projects: Project[] = portfolioData.projects
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(p => ({
      id: p.id, title: p.title, description: p.description,
      technologies: p.technologies, githubLink: p.githubLink,
      demoLink: p.demoLink || "", image: p.image || "💻",
      status: p.status as "Completed" | "Ongoing", featured: p.featured,
      tags: p.tags, features: p.features,
    }));

  const filteredProjects = projects.filter((project: Project) => {
    const matchesCategory = activeCategory === "All" || project.tags.includes(activeCategory);
    const matchesSearch = searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="section">
      <div className="section-glow section-glow-cyan" style={{ top: "-5%", left: "-10%" }} />
      <div className="container">
        <SectionHeading title="Projects" subtitle="A collection of work I'm proud of — from mobile apps to AI models" />

        <div className="filter-bar">
          <div className="filter-categories">
            {projectCategories.map((cat: string) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-btn ${activeCategory === cat ? "filter-btn-active" : ""}`}>{cat}</button>
            ))}
          </div>
          <div className="search-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: "3rem" }}>{projects.length === 0 ? "📂" : "🔍"}</span>
            <p>{projects.length === 0 ? "No projects added yet. Add them in portfolio-data.json." : "No projects match your filter."}</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project: Project, i: number) => (
              <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .filter-bar { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
        .filter-categories { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .filter-btn { padding: 0.45rem 1rem; font-size: 0.85rem; font-weight: 500; border: 1px solid var(--border-color); border-radius: var(--radius-full); background: var(--bg-glass); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
        .filter-btn:hover { border-color: var(--border-hover); color: var(--text-primary); }
        .filter-btn-active { background: rgba(0, 212, 255, 0.1); border-color: var(--cyan); color: var(--cyan); }
        .search-wrapper { position: relative; }
        .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-input { padding: 0.55rem 1rem 0.55rem 2.25rem; font-size: 0.88rem; font-family: inherit; color: var(--text-primary); background: var(--bg-glass); border: 1px solid var(--border-color); border-radius: var(--radius-full); outline: none; min-width: 220px; transition: all var(--transition-fast); }
        .search-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1); }
        .search-input::placeholder { color: var(--text-muted); }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
        .empty-state { text-align: center; padding: 4rem 1rem; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        @media (max-width: 640px) { .filter-bar { flex-direction: column; align-items: stretch; } .search-input { width: 100%; min-width: unset; } .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
