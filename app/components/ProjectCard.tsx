"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/app/data";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasValidImage =
    project.image &&
    (project.image.startsWith("/") || project.image.startsWith("http")) &&
    !imageError;

  return (
    <div
      className="project-card glass-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Image / Header area */}
      <div className="project-image-area">
        {hasValidImage ? (
          <div className="project-image-wrapper">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={340}
              className="project-cover-image"
              onError={() => setImageError(true)}
            />
            <div className="project-image-overlay" />
          </div>
        ) : (
          <div className="project-fallback-area">
            {project.image && !project.image.startsWith("/") && !project.image.startsWith("http") ? (
              <span className="project-emoji">{project.image}</span>
            ) : (
              <span className="project-initial">{project.title.charAt(0)}</span>
            )}
          </div>
        )}

        <div className="project-status-row">
          <span
            className={`status-badge ${
              project.status === "Ongoing" ? "status-ongoing" : "status-completed"
            }`}
          >
            {project.status}
          </span>
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>

        <div className="project-quick-overlay">
          <span className="quick-view-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Click to View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {project.subtitle && <p className="project-subtitle-line">{project.subtitle}</p>}
        </div>

        <p className="project-desc">{project.description}</p>

        {/* Tech badges */}
        <div className="project-techs">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="badge badge-more">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Links & CTA */}
        <div className="project-links">
          <button
            type="button"
            className="project-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Details
          </button>

          <div className="project-ext-links">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={(e) => e.stopPropagation()}
              title="View Source Code"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              Code
            </a>
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-demo"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          cursor: pointer;
          transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
          border: 1px solid var(--border-color);
          position: relative;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: rgba(197, 160, 89, 0.45);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, 0.12);
        }

        .project-image-area {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #081610;
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
        }

        .project-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-cover-image {
          transform: scale(1.04);
        }

        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(11, 29, 21, 0.05) 0%, rgba(11, 29, 21, 0.35) 100%);
          pointer-events: none;
        }

        .project-fallback-area {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(22, 42, 34, 0.8), rgba(11, 29, 21, 0.95));
        }

        .project-initial {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--accent);
          opacity: 0.55;
        }

        .project-emoji {
          font-size: 3rem;
        }

        .project-status-row {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: flex;
          gap: 0.4rem;
          z-index: 2;
        }

        .status-badge {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .status-ongoing {
          background: rgba(197, 160, 89, 0.15);
          color: var(--accent);
          border: 1px solid rgba(197, 160, 89, 0.3);
          backdrop-filter: blur(4px);
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.2);
          color: var(--emerald);
          border: 1px solid rgba(16, 185, 129, 0.35);
          backdrop-filter: blur(4px);
        }

        .featured-badge {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          background: rgba(197, 160, 89, 0.2);
          color: var(--accent-light);
          border: 1px solid rgba(197, 160, 89, 0.35);
          backdrop-filter: blur(4px);
        }

        .project-quick-overlay {
          position: absolute;
          inset: 0;
          background: rgba(11, 29, 21, 0.65);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 1;
        }

        .project-card:hover .project-quick-overlay {
          opacity: 1;
        }

        .quick-view-text {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(197, 160, 89, 0.95);
          color: #0b1d15;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transform: translateY(6px);
          transition: transform var(--transition-fast);
        }

        .project-card:hover .quick-view-text {
          transform: translateY(0);
        }

        /* Content */
        .project-content {
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .project-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .project-title {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .project-card:hover .project-title {
          color: var(--accent-light);
        }

        .project-subtitle-line {
          font-size: 0.78rem;
          color: var(--accent);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.65;
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
          padding-top: 0.25rem;
        }

        .badge-more {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          font-size: 0.72rem;
        }

        .project-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color);
          margin-top: 0.5rem;
        }

        .project-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(197, 160, 89, 0.12);
          color: var(--accent-light);
          border: 1px solid rgba(197, 160, 89, 0.28);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .project-details-btn:hover {
          background: var(--accent);
          color: #0b1d15;
          border-color: var(--accent);
        }

        .project-ext-links {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
          padding: 0.25rem 0.4rem;
          border-radius: 4px;
        }

        .project-link:hover {
          color: var(--accent-light);
        }

        .project-link-demo:hover {
          color: var(--emerald-light);
        }
      `}</style>
    </div>
  );
}
