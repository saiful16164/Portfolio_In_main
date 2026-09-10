"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Project } from "@/app/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reset when project changes
  useEffect(() => {
    setActiveImgIndex(0);
    setLightboxOpen(false);
  }, [project]);

  // Handle ESC key press & body scroll locking
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (project?.screenshots && project.screenshots.length > 1) {
        if (e.key === "ArrowRight") {
          setActiveImgIndex((prev) => (prev + 1) % project.screenshots!.length);
        } else if (e.key === "ArrowLeft") {
          setActiveImgIndex(
            (prev) => (prev - 1 + project.screenshots!.length) % project.screenshots!.length
          );
        }
      }
    },
    [onClose, project, lightboxOpen]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const currentScreenshot = screenshots[activeImgIndex];

  // Helper to detect whether current screenshot is a portrait mobile screen
  const isPortraitPhone =
    currentScreenshot &&
    (currentScreenshot.url.includes("schedule_view") ||
      currentScreenshot.url.includes("edit_class") ||
      currentScreenshot.url.includes("auth_role") ||
      currentScreenshot.url.includes("profile_settings") ||
      currentScreenshot.url.includes("dashboard") ||
      currentScreenshot.url.includes("reports") ||
      currentScreenshot.url.includes("cashbook") ||
      currentScreenshot.url.includes("customer_ledger"));

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-badge-row">
              <span
                className={`status-badge ${
                  project.status === "Ongoing" ? "status-ongoing" : "status-completed"
                }`}
              >
                {project.status}
              </span>
              {project.featured && <span className="featured-badge">Featured</span>}
              {project.role && <span className="role-badge">{project.role}</span>}
              {project.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  #{tag}
                </span>
              ))}
            </div>
            <h2 id="modal-title" className="modal-title">
              {project.title}
            </h2>
            {project.subtitle && <p className="modal-subtitle">{project.subtitle}</p>}
          </div>

          <div className="modal-header-actions">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github"
                title="View Code on GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2-COLUMN SIDE-BY-SIDE BODY */}
        <div className="modal-body-grid custom-scrollbar">
          {/* LEFT COLUMN: Visual Showcase / Screenshots */}
          <div className="gallery-column">
            <div className="column-heading">
              <span className="col-icon">📸</span>
              <span>Visual Showcase</span>
              {screenshots.length > 0 && (
                <span className="count-pill">{activeImgIndex + 1} / {screenshots.length}</span>
              )}
            </div>

            {screenshots.length > 0 ? (
              <div className="gallery-card">
                {/* Main Visual Frame */}
                <div className="gallery-display-area">
                  {/* Ambient Glow */}
                  {currentScreenshot && (
                    <div
                      className="ambient-glow"
                      style={{ backgroundImage: `url(${currentScreenshot.url})` }}
                    />
                  )}

                  {/* Frame rendering */}
                  {isPortraitPhone ? (
                    <div className="phone-frame" onClick={() => setLightboxOpen(true)}>
                      <div className="phone-speaker" />
                      <div className="phone-screen">
                        <Image
                          src={currentScreenshot.url}
                          alt={currentScreenshot.caption || project.title}
                          width={350}
                          height={750}
                          priority
                          className="phone-img"
                        />
                      </div>
                      <div className="phone-bar" />
                      <div className="enlarge-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        Enlarge
                      </div>
                    </div>
                  ) : (
                    <div className="landscape-display" onClick={() => setLightboxOpen(true)}>
                      <Image
                        src={currentScreenshot.url}
                        alt={currentScreenshot.caption || project.title}
                        width={900}
                        height={506}
                        priority
                        className="landscape-preview-img"
                      />
                      <div className="enlarge-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        Enlarge
                      </div>
                    </div>
                  )}

                  {/* Nav Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImgIndex(
                            (prev) => (prev - 1 + screenshots.length) % screenshots.length
                          )
                        }
                        className="nav-arrow prev-arrow"
                        aria-label="Previous image"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setActiveImgIndex((prev) => (prev + 1) % screenshots.length)
                        }
                        className="nav-arrow next-arrow"
                        aria-label="Next image"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Caption Bar */}
                {currentScreenshot?.caption && (
                  <div className="caption-bar">
                    <span className="caption-star">✦</span>
                    <span className="caption-label">{currentScreenshot.caption}</span>
                  </div>
                )}

                {/* Thumbnail Strip */}
                {screenshots.length > 1 && (
                  <div className="thumbnails-wrapper">
                    {screenshots.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`thumb-btn ${activeImgIndex === idx ? "thumb-active" : ""}`}
                        aria-label={`Show image ${idx + 1}`}
                      >
                        <Image
                          src={s.url}
                          alt={`Thumb ${idx + 1}`}
                          width={110}
                          height={65}
                          className="thumb-img"
                        />
                        <span className="thumb-idx">{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-screenshots-box">
                <span className="fallback-symbol">{project.image || "📱"}</span>
                <p>No extra screenshots uploaded for this project.</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Project Details & Specs */}
          <div className="details-column">
            <div className="column-heading">
              <span className="col-icon">📋</span>
              <span>Project Details & Specs</span>
            </div>

            {/* Purpose & Problem Statement */}
            <div className="spec-card">
              <h4 className="spec-title">
                <span className="spec-dot" /> Purpose & Problem Solved
              </h4>
              <p className="spec-text">
                {project.problemStatement || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="spec-card">
                <h4 className="spec-title">
                  <span className="spec-dot" /> Key Capabilities
                </h4>
                <div className="features-list">
                  {project.features.map((feat, i) => (
                    <div key={i} className="feature-row">
                      <span className="feat-check">✓</span>
                      <span className="feat-text">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture & Highlights */}
            {(project.architecture || (project.highlights && project.highlights.length > 0)) && (
              <div className="spec-card">
                <h4 className="spec-title">
                  <span className="spec-dot" /> Architecture & Engineering
                </h4>
                {project.architecture && (
                  <p className="spec-text" style={{ marginBottom: project.highlights?.length ? "0.6rem" : "0" }}>
                    {project.architecture}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="highlights-wrap">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="highlight-pill">
                        <span className="hl-bullet">✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div className="spec-card">
              <h4 className="spec-title">
                <span className="spec-dot" /> Technologies & Tools
              </h4>
              <div className="tech-pills-row">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Quick CTA */}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="spec-cta-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
                <span>View Full Source Code on GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="footer-left-info">
            <span className="footer-info-text">Press <kbd>ESC</kbd> or click outside to dismiss</span>
          </div>
          <div className="footer-actions">
            <button onClick={onClose} className="btn-modal-secondary">
              Close
            </button>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
                <span>Open GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && currentScreenshot && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen"
            >
              ✕
            </button>
            <div className="lightbox-img-wrapper">
              <Image
                src={currentScreenshot.url}
                alt={currentScreenshot.caption || "Screenshot"}
                width={1600}
                height={1200}
                className="lightbox-img"
              />
            </div>
            {currentScreenshot.caption && (
              <div className="lightbox-caption">{currentScreenshot.caption}</div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(4, 14, 9, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-container {
          width: 100%;
          max-width: 1120px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(197, 160, 89, 0.35);
          background: rgba(12, 30, 23, 0.97);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(16, 185, 129, 0.15);
          overflow: hidden;
          animation: modalScaleUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-color);
          background: rgba(18, 44, 34, 0.65);
          flex-shrink: 0;
        }

        .modal-header-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .modal-badge-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.18rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.18);
          color: var(--emerald-light);
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .status-ongoing {
          background: rgba(197, 160, 89, 0.15);
          color: var(--accent);
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .featured-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.18rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(197, 160, 89, 0.2);
          color: var(--accent-light);
          border: 1px solid rgba(197, 160, 89, 0.35);
        }

        .role-badge {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 0.18rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .tag-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .modal-title {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .modal-subtitle {
          font-size: 0.88rem;
          color: var(--accent);
          font-weight: 500;
          line-height: 1.35;
        }

        .modal-header-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .btn-github {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-github:hover {
          background: rgba(197, 160, 89, 0.2);
          border-color: var(--accent);
          color: var(--accent-light);
        }

        .modal-close-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: rgba(196, 139, 122, 0.2);
          border-color: var(--rose);
          color: var(--text-primary);
          transform: rotate(90deg);
        }

        /* 2-COLUMN GRID BODY */
        .modal-body-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: 1.75rem;
          padding: 1.5rem 1.75rem;
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
        }

        .column-heading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid var(--border-color);
        }

        .col-icon {
          font-size: 1.1rem;
        }

        .count-pill {
          margin-left: auto;
          font-size: 0.72rem;
          font-weight: 600;
          background: rgba(197, 160, 89, 0.15);
          color: var(--accent-light);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(197, 160, 89, 0.25);
        }

        /* LEFT: GALLERY COLUMN */
        .gallery-column {
          display: flex;
          flex-direction: column;
        }

        .gallery-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid rgba(197, 160, 89, 0.25);
          background: #06110c;
        }

        .gallery-display-area {
          position: relative;
          width: 100%;
          min-height: 310px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #040d09;
        }

        .ambient-glow {
          position: absolute;
          inset: -20px;
          background-size: cover;
          background-position: center;
          filter: blur(40px) brightness(0.35);
          opacity: 0.35;
          pointer-events: none;
        }

        /* Phone mockup inside left column */
        .phone-frame {
          position: relative;
          width: 165px;
          height: 315px;
          border-radius: 30px;
          background: #000;
          border: 6px solid #1c2e25;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(16, 185, 129, 0.15);
          cursor: pointer;
          overflow: hidden;
          transition: transform var(--transition-fast);
          z-index: 2;
        }

        .phone-frame:hover {
          transform: scale(1.03);
        }

        .phone-speaker {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 10px;
          background: #000;
          border-radius: 8px;
          z-index: 3;
        }

        .phone-bar {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
          z-index: 3;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 24px;
          background: #000;
        }

        .phone-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        /* Landscape frame inside left column */
        .landscape-display {
          position: relative;
          width: 95%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid rgba(197, 160, 89, 0.3);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7);
          cursor: pointer;
          transition: transform var(--transition-fast);
          z-index: 2;
        }

        .landscape-display:hover {
          transform: scale(1.02);
        }

        .landscape-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .enlarge-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(11, 29, 21, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: var(--accent-light);
          padding: 0.22rem 0.55rem;
          border-radius: var(--radius-full);
          font-size: 0.68rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 4;
        }

        .phone-frame:hover .enlarge-badge,
        .landscape-display:hover .enlarge-badge {
          opacity: 1;
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(11, 29, 21, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 5;
        }

        .nav-arrow:hover {
          background: var(--accent);
          color: #0b1d15;
          transform: translateY(-50%) scale(1.1);
        }

        .prev-arrow { left: 0.6rem; }
        .next-arrow { right: 0.6rem; }

        .caption-bar {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 0.9rem;
          background: rgba(15, 38, 29, 0.95);
          border-top: 1px solid var(--border-color);
        }

        .caption-star {
          color: var(--accent);
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .caption-label {
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.35;
        }

        .thumbnails-wrapper {
          display: flex;
          gap: 0.45rem;
          padding: 0.6rem 0.75rem;
          background: rgba(11, 29, 21, 0.7);
          border-top: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .thumb-btn {
          position: relative;
          flex-shrink: 0;
          width: 68px;
          height: 44px;
          border-radius: 4px;
          overflow: hidden;
          border: 1.5px solid transparent;
          background: #000;
          cursor: pointer;
          opacity: 0.6;
          transition: all var(--transition-fast);
          padding: 0;
        }

        .thumb-btn:hover {
          opacity: 0.9;
        }

        .thumb-active {
          opacity: 1;
          border-color: var(--accent);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.45);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-idx {
          position: absolute;
          top: 2px;
          left: 2px;
          font-size: 0.58rem;
          font-weight: 700;
          background: rgba(4, 14, 9, 0.85);
          color: var(--text-primary);
          padding: 0.05rem 0.25rem;
          border-radius: 2px;
        }

        .no-screenshots-box {
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          gap: 0.5rem;
        }

        .fallback-symbol {
          font-size: 2.5rem;
        }

        /* RIGHT: DETAILS COLUMN */
        .details-column {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .spec-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.9rem 1.1rem;
          border-radius: var(--radius-sm);
          background: rgba(22, 42, 34, 0.45);
          border: 1px solid var(--border-color);
        }

        .spec-title {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--accent-light);
          display: flex;
          align-items: center;
          gap: 0.45rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .spec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        .spec-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.84rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .feat-check {
          color: var(--emerald);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .highlights-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .highlight-pill {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .hl-bullet {
          color: var(--accent);
          font-size: 0.75rem;
          margin-top: 2px;
        }

        .tech-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tech-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 500;
          background: rgba(197, 160, 89, 0.1);
          color: var(--accent-light);
          border: 1px solid rgba(197, 160, 89, 0.25);
        }

        .spec-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 600;
          background: var(--accent);
          color: #0b1d15;
          text-decoration: none;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 16px rgba(197, 160, 89, 0.25);
          margin-top: 0.25rem;
        }

        .spec-cta-btn:hover {
          background: var(--accent-light);
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(197, 160, 89, 0.4);
        }

        /* Footer */
        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
          border-top: 1px solid var(--border-color);
          background: rgba(18, 44, 34, 0.6);
          flex-shrink: 0;
        }

        .footer-left-info kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0.1rem 0.35rem;
          font-size: 0.7rem;
          color: var(--accent-light);
        }

        .footer-info-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .footer-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-modal-secondary {
          padding: 0.45rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-modal-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .btn-modal-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 1.15rem;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          font-weight: 600;
          background: rgba(197, 160, 89, 0.2);
          border: 1px solid var(--accent);
          color: var(--accent-light);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-modal-primary:hover {
          background: var(--accent);
          color: #0b1d15;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(2, 8, 5, 0.96);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.2s ease;
        }

        .lightbox-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .lightbox-close-btn {
          position: absolute;
          top: -45px;
          right: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          background: var(--accent);
          color: #0b1d15;
        }

        .lightbox-img-wrapper {
          max-width: 90vw;
          max-height: 82vh;
          overflow: hidden;
          border-radius: var(--radius-md);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
        }

        .lightbox-img {
          width: auto;
          height: auto;
          max-width: 90vw;
          max-height: 82vh;
          object-fit: contain;
        }

        .lightbox-caption {
          margin-top: 0.85rem;
          font-size: 0.92rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 860px) {
          .modal-body-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .gallery-display-area {
            height: 280px;
            min-height: 240px;
          }
          .phone-frame {
            height: 260px;
            width: 140px;
          }
        }

        @media (max-width: 640px) {
          .modal-overlay { padding: 0.35rem; }
          .modal-container {
            max-height: 95vh;
            border-radius: var(--radius-md);
          }
          .modal-header {
            flex-direction: column;
            gap: 0.85rem;
            padding: 1rem;
          }
          .modal-header-actions { width: 100%; justify-content: flex-end; }
          .modal-title { font-size: 1.25rem; }
          .modal-subtitle { font-size: 0.82rem; }
          .modal-badge-row { gap: 0.35rem; }
          .modal-body-grid { padding: 0.85rem; gap: 1.25rem; }
          .gallery-display-area {
            height: 220px;
            min-height: 200px;
          }
          .phone-frame {
            height: 210px;
            width: 115px;
            border-width: 4px;
            border-radius: 22px;
          }
          .phone-screen { border-radius: 18px; }
          .landscape-display { width: 98%; }
          .nav-arrow { width: 30px; height: 30px; }
          .prev-arrow { left: 0.35rem; }
          .next-arrow { right: 0.35rem; }
          .column-heading { font-size: 0.92rem; }
          .spec-card { padding: 0.75rem 0.9rem; }
          .spec-title { font-size: 0.85rem; }
          .spec-text { font-size: 0.82rem; }
          .feature-row { font-size: 0.8rem; }
          .tech-pill { font-size: 0.7rem; padding: 0.2rem 0.5rem; }
          .spec-cta-btn { padding: 0.65rem 1rem; font-size: 0.82rem; }
          .thumbnails-wrapper { gap: 0.3rem; padding: 0.5rem 0.6rem; }
          .thumb-btn { width: 54px; height: 36px; }
          .modal-footer {
            padding: 0.75rem 1rem;
            flex-direction: column;
            gap: 0.5rem;
            align-items: stretch;
          }
          .footer-actions { justify-content: flex-end; }
          .footer-info-text { font-size: 0.72rem; text-align: center; }
          .lightbox-overlay { padding: 0.5rem; }
          .lightbox-img-wrapper { max-width: 95vw; max-height: 85vh; }
          .lightbox-img { max-width: 95vw; max-height: 85vh; }
          .lightbox-close-btn { top: -38px; width: 32px; height: 32px; font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}
