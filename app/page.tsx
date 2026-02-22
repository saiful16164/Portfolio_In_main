"use client";

import Link from "next/link";
import { personalInfo, Project } from "@/app/data";
import ProjectCard from "@/app/components/ProjectCard";
import portfolioData from "@/app/data/portfolio-data.json";

interface Skill { id: string; name: string; proficiency: number; }

export default function HomePage() {
  const featuredProjects: Project[] = portfolioData.projects
    .filter(p => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(p => ({
      id: p.id, title: p.title, description: p.description,
      technologies: p.technologies, githubLink: p.githubLink,
      demoLink: p.demoLink || "", image: p.image || "💻",
      status: p.status as "Completed" | "Ongoing", featured: p.featured,
      tags: p.tags, features: p.features,
    }));

  const topSkills: Skill[] = portfolioData.skills
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 8)
    .map(s => ({ id: s.id, name: s.name, proficiency: s.proficiency }));

  const profileImage = portfolioData.siteSettings.profileImage || personalInfo.profileImage;

  const stats = [
    { label: "Projects", value: portfolioData.projects.length, icon: "💻" },
    { label: "Skills", value: portfolioData.skills.length, icon: "🧠" },
    { label: "Research", value: portfolioData.research.length, icon: "🔬" },
    { label: "Achievements", value: portfolioData.achievements.length, icon: "🏆" },
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="container hero-container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge badge">👋 Welcome to my portfolio</div>
            <h1 className="hero-name">Hi, I&apos;m{" "}<span className="gradient-text">{personalInfo.name}</span></h1>
            <p className="hero-title">{personalInfo.title}</p>
            <p className="hero-bio">{personalInfo.bio}</p>
            <div className="hero-actions">
              <Link href="/projects" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                View Projects
              </Link>
              <Link href="/contact" className="btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                Contact Me
              </Link>
            </div>
            <div className="hero-socials">
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
          <div className="hero-visual animate-fade-in delay-200">
            <div className="hero-img-wrapper">
              {profileImage ? (
                <img src={profileImage} alt={personalInfo.name} className="hero-profile-img" />
              ) : (
                <div className="hero-placeholder">👨‍💻</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP (only show if there's data) ===== */}
      {stats.some(s => s.value > 0) && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`stat-card glass-card animate-fade-in-up delay-${(i + 1) * 100}`}>
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-value">{stat.value}+</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SKILLS STRIP ===== */}
      {topSkills.length > 0 && (
        <section className="section skills-strip">
          <div className="container">
            <div className="skills-strip-header">
              <h2 className="gradient-text" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Core Technologies</h2>
              <Link href="/skills" className="btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>View All Skills →</Link>
            </div>
            <div className="skills-chip-row">
              {topSkills.map((skill: Skill) => (
                <div key={skill.id} className="skill-chip glass-card">
                  <span className="skill-chip-name">{skill.name}</span>
                  <span className="skill-chip-pct">{skill.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURED PROJECTS ===== */}
      {featuredProjects.length > 0 && (
        <section className="section featured-projects">
          <div className="section-glow section-glow-violet" style={{ top: "10%", right: "-200px" }} />
          <div className="container">
            <div className="section-header-row">
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800 }}><span className="gradient-text">Featured Projects</span></h2>
                <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1rem" }}>Handpicked work that showcases my skills</p>
              </div>
              <Link href="/projects" className="btn-outline">All Projects →</Link>
            </div>
            <div className="projects-grid">
              {featuredProjects.map((project: Project) => (<ProjectCard key={project.id} project={project} />))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="section cta-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}><span className="gradient-text">Let&apos;s Work Together</span></h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.05rem", lineHeight: 1.6 }}>Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
            <a href={personalInfo.resumeLink} download className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero { position: relative; padding: 5rem 0 3rem; overflow: hidden; min-height: calc(100vh - 70px); display: flex; align-items: center; }
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .hero-glow-1 { width: 500px; height: 500px; background: rgba(0, 212, 255, 0.08); top: -10%; left: -10%; }
        .hero-glow-2 { width: 400px; height: 400px; background: rgba(168, 85, 247, 0.08); bottom: -10%; right: -5%; }
        .hero-container { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center; }
        .hero-badge { margin-bottom: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); width: fit-content; }
        .hero-name { font-size: 3.5rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1.15; margin-bottom: 0.75rem; }
        .hero-title { font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1rem; font-weight: 500; }
        .hero-bio { font-size: 1rem; color: var(--text-muted); line-height: 1.7; max-width: 520px; margin-bottom: 1.75rem; }
        .hero-actions { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .hero-socials { display: flex; gap: 0.75rem; }
        .social-link { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--text-secondary); transition: all var(--transition-fast); }
        .social-link:hover { color: var(--cyan); border-color: var(--cyan); background: rgba(0, 212, 255, 0.05); transform: translateY(-2px); }
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; max-width: 400px; margin: 0 auto; }
        .hero-img-wrapper { width: 300px; height: 300px; border-radius: 50%; padding: 4px; background: var(--gradient-main); box-shadow: 0 0 60px rgba(0, 212, 255, 0.15), 0 0 120px rgba(168, 85, 247, 0.08); overflow: hidden; }
        .hero-profile-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
        .hero-placeholder { width: 100%; height: 100%; border-radius: 50%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; font-size: 5rem; }
        .stats-section { padding: 0 1.5rem 3rem; margin-top: -1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .stat-card { padding: 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .stat-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .stat-value { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); font-variant-numeric: tabular-nums; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        .skills-strip { padding-top: 2rem; padding-bottom: 2rem; }
        .skills-strip-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .skills-chip-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .skill-chip { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; }
        .skill-chip-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
        .skill-chip-pct { font-size: 0.8rem; font-weight: 500; color: var(--cyan); font-variant-numeric: tabular-nums; }
        .section-header-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
        .cta-section { padding-bottom: 5rem; }
        @media (max-width: 768px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; }
          .hero-name { font-size: 2.5rem; }
          .hero-bio { margin-left: auto; margin-right: auto; }
          .hero-actions { justify-content: center; }
          .hero-socials { justify-content: center; }
          .hero-visual { order: -1; max-width: 260px; }
          .hero-img-wrapper { width: 220px; height: 220px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .projects-grid { grid-template-columns: 1fr; }
          .section-header-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
