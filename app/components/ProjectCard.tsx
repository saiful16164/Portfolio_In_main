"use client";

import { Project } from "@/app/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card glass-card">
      {/* Image area */}
      <div className="project-image-area">
        <span className="project-initial">{project.title.charAt(0)}</span>
        <div className="project-status-row">
          <span className={`status-badge ${project.status === "Ongoing" ? "status-ongoing" : "status-completed"}`}>
            {project.status}
          </span>
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>
      </div>

      {/* Content */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Tech badges */}
        <div className="project-techs">
          {project.technologies.map((tech) => (
            <span key={tech} className="badge">{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className="project-links">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
            Code
          </a>
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              Demo
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        .project-image-area {
          position: relative;
          padding: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(26, 46, 38, 0.5) 100%);
          border-bottom: 1px solid var(--border-color);
          min-height: 140px;
        }
        .project-initial {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--accent);
          opacity: 0.5;
        }
        .project-status-row {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: flex;
          gap: 0.4rem;
        }
        .status-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .status-ongoing {
          background: rgba(197, 160, 89, 0.12);
          color: var(--accent);
          border: 1px solid rgba(197, 160, 89, 0.25);
        }
        .status-completed {
          background: rgba(16, 185, 129, 0.15);
          color: var(--emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .featured-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(197, 160, 89, 0.15);
          color: var(--accent);
          border: 1px solid rgba(197, 160, 89, 0.3);
        }
        .project-content {
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }
        .project-title {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .project-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
        }
        .project-links {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-color);
          margin-top: 0.5rem;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .project-link:hover {
          color: var(--accent);
        }
        .project-link-demo:hover {
          color: var(--accent-secondary);
        }
      `}</style>
    </div>
  );
}
