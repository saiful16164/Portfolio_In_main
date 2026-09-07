"use client";

import { useState, Suspense } from "react";
import { personalInfo, Project } from "@/app/data";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectModal from "@/app/components/ProjectModal";
import SectionHeading from "@/app/components/SectionHeading";
import SkillCard from "@/app/components/SkillCard";
import EventCard from "@/app/components/EventCard";
import ContactForm from "@/app/components/ContactForm";
import portfolioData from "@/app/data/portfolio-data.json";

interface Skill { id: string; name: string; category: "Programming Languages" | "Technologies" | "Tools"; proficiency?: number; }
interface EventItem {
  id: string;
  title: string;
  description: string;
  type: "Conference" | "Hackathon" | "Competition" | "Workshop" | "Meetup" | "Award" | "Certification";
  date: string;
  link: string;
  location?: string;
  images?: string[];
}
type Achievement = EventItem;
interface Research {
  id: string;
  title: string;
  abstract: string;
  publicationName: string;
  pdfLink: string;
  doiLink: string;
  status: "Published" | "Under Review" | "In Progress" | "Accepted";
  authors?: string[];
  date?: string;
  location?: string;
  tags?: string[];
}
interface BlogPost { id: string; title: string; excerpt: string; content: string; tags: string[]; status: "Published" | "Draft"; readTime: string; createdAt: string; }

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const profileImage = portfolioData.siteSettings.profileImage || personalInfo.profileImage;

  // ===== DATA =====
  const allProjects: Project[] = (portfolioData.projects as Array<Project & { sortOrder?: number }>)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      problemStatement: p.problemStatement,
      technologies: p.technologies,
      githubLink: p.githubLink,
      demoLink: p.demoLink || "",
      image: p.image || "",
      status: p.status as "Completed" | "Ongoing",
      featured: p.featured,
      tags: p.tags,
      features: p.features,
      screenshots: p.screenshots || [],
      architecture: p.architecture,
      highlights: p.highlights || [],
      role: p.role,
    }));


  const allSkills: Skill[] = portfolioData.skills
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(s => ({ id: s.id, name: s.name, category: s.category as Skill["category"] }));

  const categories = ["Programming Languages", "Technologies", "Tools"] as const;
  const categoryColors: Record<string, string> = { "Programming Languages": "var(--accent)", Technologies: "var(--accent-secondary)", Tools: "var(--rose)" };

  const rawEvents = (portfolioData.events || (portfolioData as Record<string, unknown>).achievements || []) as Array<Record<string, unknown>>;
  const events: EventItem[] = rawEvents.map((e, i) => ({
    id: (e.id as string) || `event-${i}`,
    title: (e.title as string) || "",
    description: (e.description as string) || "",
    type: (e.type as EventItem["type"]) || "Conference",
    date: (e.date as string) || "",
    link: (e.link as string) || "",
    location: (e.location as string) || "",
    images: (e.images as string[]) || [],
  }));

  const typeColors: Record<string, string> = {
    Conference: "badge badge-emerald",
    Hackathon: "badge badge-violet",
    Competition: "badge",
    Workshop: "badge badge-pink",
    Meetup: "badge",
    Award: "badge badge-emerald",
    Certification: "badge badge-emerald",
  };

  const research: Research[] = portfolioData.research.map((r, i) => {
    const item = r as Record<string, unknown>;
    return {
      id: (item.id as string) || `res-${i}`,
      title: (item.title as string) || "",
      abstract: (item.abstract as string) || "",
      publicationName: (item.publicationName as string) || "",
      pdfLink: (item.pdfLink as string) || "",
      doiLink: (item.doiLink as string) || "",
      status: (item.status as Research["status"]) || "Accepted",
      authors: (item.authors as string[]) || [],
      date: (item.date as string) || "",
      location: (item.location as string) || "",
      tags: (item.tags as string[]) || [],
    };
  });

  const publishedPosts: BlogPost[] = portfolioData.blogPosts
    .filter(p => p.status === "Published")
    .map((p, i) => ({
      id: p.id || `blog-${i}`, title: p.title, excerpt: p.excerpt || "",
      content: p.content || "", tags: p.tags || [],
      status: p.status as "Published" | "Draft", readTime: p.readTime || "5 min read",
      createdAt: p.createdAt,
    }));

  const resumeLink = portfolioData.siteSettings.resumeLink || "";

  const stats = [
    { label: "Projects", value: portfolioData.projects.length },
    { label: "Skills", value: portfolioData.skills.length },
    { label: "Research", value: portfolioData.research.length },
    { label: "Events", value: events.length },
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero">
        {/* Ambient background glow */}
        <div className="hero-ambient" />
        <div className="container hero-container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge badge">Welcome to my portfolio</div>
            <h1 className="hero-name">Hi, I&apos;m <span className="accent-text">{personalInfo.name}</span></h1>
            <p className="hero-title">{personalInfo.title}</p>
            <p className="hero-bio">{personalInfo.bio}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                View Projects
              </a>
              <a href="#contact" className="btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                Contact Me
              </a>
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
                <div className="hero-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      {stats.some(s => s.value > 0) && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`stat-card glass-card animate-fade-in-up delay-${(i + 1) * 100}`}>
                  <span className="stat-value">{stat.value}+</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="section">
        <div className="container about-container">
          <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

          <div className="about-intro glass-card animate-fade-in-up">
            <div className="about-intro-text">
              <h3 style={{ fontFamily: "var(--font-playfair, var(--font-heading))", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                <span className="accent-text">{personalInfo.name}</span>
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {personalInfo.personalStory}
              </p>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="about-section animate-fade-in-up delay-200">
            <h3 className="about-section-title">
              <span className="accent-text">Education</span>
            </h3>
            <div className="timeline">
              {personalInfo.education.map((edu, i) => (
                <div key={i} className="timeline-item glass-card">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h4 className="timeline-heading">{edu.degree}</h4>
                    <p className="timeline-sub">{edu.institution}</p>
                    <span className="badge" style={{ marginTop: "0.5rem" }}>{edu.year}</span>
                    {edu.details && (
                      <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "0.5rem", lineHeight: 1.7 }}>
                        {edu.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Goals */}
          <div className="about-section animate-fade-in-up delay-300">
            <h3 className="about-section-title">
              <span className="accent-text">Career Goals</span>
            </h3>
            <div className="glass-card" style={{ padding: "1.75rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {personalInfo.careerGoals}
              </p>
            </div>
          </div>

          {/* Technical Interests */}
          <div className="about-section animate-fade-in-up delay-400">
            <h3 className="about-section-title">
              <span className="accent-text">Technical Interests</span>
            </h3>
            <div className="interests-grid">
              {personalInfo.technicalInterests.map((interest, i) => (
                <div key={i} className="interest-card glass-card">
                  <span className="interest-bullet">&#9671;</span>
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH SECTION ===== */}
      <section id="research" className="section">
        <div className="container" style={{ maxWidth: "960px" }}>
          <SectionHeading title="Research" />
          {research.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
              <p>No research added yet.</p>
            </div>
          ) : (
            <div className="research-list">
              {research.map((paper: Research, i: number) => (
                <article key={paper.id} className="research-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="research-card-header">
                    <h3 className="research-title">{paper.title}</h3>
                    <span className="research-status-badge">
                      <span className="status-dot"></span>
                      {paper.status}
                    </span>
                  </div>

                  {paper.authors && paper.authors.length > 0 && (
                    <p className="research-authors">
                      {paper.authors.map((author, idx) => {
                        const isSaiful = author.toLowerCase().includes("saiful");
                        return (
                          <span key={idx}>
                            <span className={isSaiful ? "research-author-highlight" : ""}>{author}</span>
                            {idx < paper.authors!.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </p>
                  )}

                  <div className="research-meta-row">
                    {paper.date && (
                      <span className="research-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        {paper.date}
                      </span>
                    )}
                    {paper.date && paper.publicationName && <span className="meta-sep">•</span>}
                    <span className="research-venue-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                      {paper.publicationName}
                    </span>
                    {paper.location && (
                      <>
                        <span className="meta-sep">•</span>
                        <span className="research-meta-item">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {paper.location}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="research-abstract">{paper.abstract}</p>

                  <div className="research-footer">
                    <div className="research-tags">
                      {paper.tags?.map((tag) => (
                        <span key={tag} className="research-tag">#{tag}</span>
                      ))}
                    </div>
                    <div className="research-actions">
                      {paper.doiLink && (
                        <a href={paper.doiLink} target="_blank" rel="noopener noreferrer" className="research-doi-btn" aria-label={`View DOI for ${paper.title}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                          <span>IEEE Xplore / DOI</span>
                        </a>
                      )}
                      {paper.pdfLink && (
                        <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}>Download PDF</a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="section">
        <div className="container">
          <SectionHeading title="Projects" subtitle="A collection of work I'm proud of — from mobile apps to AI models" />

          {allProjects.length === 0 ? (
            <div className="empty-state">
              <p>No projects added yet.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {allProjects.map((project: Project, i: number) => (
                <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="section">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <SectionHeading title="Skills" subtitle="Technologies, frameworks, and developer tools I build with" />
          {allSkills.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
              <p>No skills added yet.</p>
            </div>
          ) : (
            <div className="skills-categories">
              {categories.map((category, catIdx) => {
                const categorySkills = allSkills.filter((s: Skill) => s.category === category);
                if (categorySkills.length === 0) return null;
                return (
                  <div key={category} className="skill-category-section animate-fade-in-up" style={{ animationDelay: `${catIdx * 0.15}s` }}>
                    <h3 className="category-title">
                      <span className="accent-text">{category}</span>
                      <span className="category-count">({categorySkills.length})</span>
                    </h3>
                    <div className="skills-logo-grid">
                      {categorySkills.map((skill: Skill) => (
                        <SkillCard key={skill.id} name={skill.name} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section id="events" className="section">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <SectionHeading title="Events" subtitle="Conferences, technical symposiums, and community presentations" />
          {events.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
              <p>No events added yet.</p>
            </div>
          ) : (
            <div className="events-stack-list">
              {events.map((event: EventItem) => (
                <EventCard
                  key={event.id}
                  event={event}
                  typeColors={typeColors}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section id="blog" className="section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <SectionHeading title="Blog" subtitle="Thoughts, tutorials, and stories from my coding journey" />
          {publishedPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
              <p>Blog posts coming soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {publishedPosts.map((post: BlogPost, i: number) => (
                <article key={post.id} className="blog-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="blog-meta">
                    <span className="blog-date">{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="blog-dot">&bull;</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">{post.tags.map((tag: string) => (<span key={tag} className="badge">{tag}</span>))}</div>
                  <div className="blog-read-more"><span className="read-more-link">Read More &rarr;</span></div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== RESUME SECTION ===== */}
      {resumeLink && <section id="resume" className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <SectionHeading title="Resume" subtitle="Download my resume or view it inline" />
          <div className="resume-card glass-card animate-fade-in-up">
            <div className="resume-preview">
              {resumeLink ? (
                <iframe src={resumeLink} className="resume-iframe" title="Resume Preview" />
              ) : (
                <div className="resume-placeholder">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                  <h3 style={{ fontFamily: "var(--font-playfair, var(--font-heading))", fontSize: "1.2rem", fontWeight: 700, marginTop: "1rem" }}>
                    <span className="accent-text">Resume Not Available</span>
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    A resume has not been uploaded yet.
                  </p>
                </div>
              )}
            </div>
            <div className="resume-actions">
              {resumeLink && (
                <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>
              )}
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </div>
        </div>
      </section>}

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <SectionHeading title="Get In Touch" subtitle="Have a question or want to work together? Drop me a message!" />
          <div className="contact-layout">
            <div className="contact-form-wrapper animate-fade-in-up">
              <Suspense fallback={<div className="glass-card" style={{ padding: "2rem" }}>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </div>
            <div className="contact-sidebar animate-fade-in-up delay-200">
              <div className="contact-info-card glass-card">
                <div className="contact-info-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <h4 className="contact-info-label">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="contact-info-value">{personalInfo.email}</a>
                </div>
              </div>
              <div className="contact-info-card glass-card">
                <div className="contact-info-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4 className="contact-info-label">Location</h4>
                  <p className="contact-info-value">{personalInfo.location}</p>
                </div>
              </div>
              <div className="contact-social-card glass-card">
                <h4 className="contact-info-label" style={{ marginBottom: "0.75rem" }}>Follow Me</h4>
                <div className="contact-social-links">
                  <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
                    GitHub
                  </a>
                  <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECT DETAILS MODAL ===== */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style jsx>{`
        /* ===== HERO ===== */
        .hero { position: relative; padding: 5rem 0 3rem; overflow: hidden; min-height: calc(100vh - 70px); display: flex; align-items: center; }
        .hero-ambient {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(197, 160, 89, 0.08) 35%, rgba(11, 29, 21, 0) 70%);
          pointer-events: none;
          z-index: 0;
          animation: subtleGlow 8s ease-in-out infinite;
        }
        .hero-container { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center; position: relative; z-index: 1; }
        .hero-badge { margin-bottom: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); width: fit-content; }
        .hero-name { font-family: var(--font-playfair, var(--font-heading)); font-size: 3.5rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 0.75rem; }
        .hero-title { font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1rem; font-weight: 500; }
        .hero-bio { font-size: 1rem; color: var(--text-muted); line-height: 1.8; max-width: 520px; margin-bottom: 1.75rem; }
        .hero-actions { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .hero-socials { display: flex; gap: 0.75rem; }
        .social-link { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--text-secondary); transition: all var(--transition-fast); }
        .social-link:hover { color: var(--accent); border-color: var(--accent); background: rgba(197, 160, 89, 0.1); transform: translateY(-2px); }
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; max-width: 400px; margin: 0 auto; }
        .hero-img-wrapper { width: 300px; height: 300px; border-radius: 50%; padding: 4px; border: 3px solid var(--accent); box-shadow: 0 0 50px rgba(16, 185, 129, 0.25); overflow: hidden; }
        .hero-profile-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
        .hero-placeholder { width: 100%; height: 100%; border-radius: 50%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; }

        /* ===== STATS ===== */
        .stats-section { padding: 0 1.5rem 3rem; margin-top: -1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .stat-card { padding: 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .stat-value { font-family: var(--font-playfair, var(--font-heading)); font-size: 1.85rem; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }

        /* ===== ABOUT ===== */
        .about-container { max-width: 800px; }
        .about-intro { display: flex; gap: 1.5rem; padding: 2rem; align-items: flex-start; margin-bottom: 2.5rem; }
        .about-section { margin-bottom: 2.5rem; }
        .about-section-title { font-family: var(--font-playfair, var(--font-heading)); font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
        .timeline { display: flex; flex-direction: column; gap: 1rem; position: relative; padding-left: 1.5rem; }
        .timeline::before { content: ""; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: var(--accent); border-radius: 2px; opacity: 0.4; }
        .timeline-item { position: relative; padding: 1.25rem 1.5rem; }
        .timeline-dot { position: absolute; left: -1.75rem; top: 1.5rem; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); border: 3px solid var(--bg-primary); }
        .timeline-heading { font-family: var(--font-playfair, var(--font-heading)); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
        .timeline-sub { font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.2rem; }
        .interests-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.75rem; }
        .interest-card { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; font-size: 0.93rem; font-weight: 500; color: var(--text-secondary); }
        .interest-bullet { color: var(--accent); font-size: 0.9rem; }

        /* ===== SKILLS ===== */
        .skills-categories { display: flex; flex-direction: column; gap: 2.25rem; }
        .category-title { font-family: var(--font-playfair, var(--font-heading)); display: flex; align-items: center; gap: 0.6rem; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
        .category-count { font-size: 0.82rem; color: var(--text-muted); font-weight: 500; }
        .skills-logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 0.85rem;
        }

        /* ===== PROJECTS ===== */
        .filter-bar { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
        .filter-categories { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .filter-btn { padding: 0.45rem 1rem; font-size: 0.85rem; font-weight: 500; border: 1px solid var(--border-color); border-radius: var(--radius-full); background: var(--bg-glass); color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
        .filter-btn:hover { border-color: var(--border-hover); color: var(--text-primary); }
        .filter-btn-active { background: rgba(197, 160, 89, 0.15); border-color: var(--accent); color: var(--accent); }
        .search-wrapper { position: relative; }
        .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-input { padding: 0.55rem 1rem 0.55rem 2.25rem; font-size: 0.88rem; font-family: inherit; color: var(--text-primary); background: var(--bg-glass); border: 1px solid var(--border-color); border-radius: var(--radius-full); outline: none; min-width: 220px; transition: all var(--transition-fast); }
        .search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); }
        .search-input::placeholder { color: var(--text-muted); }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
        .empty-state { text-align: center; padding: 4rem 1rem; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 1rem; }

        /* ===== RESEARCH ===== */
        .research-list { display: flex; flex-direction: column; gap: 1.75rem; }
        .research-card { 
          position: relative; 
          padding: 2.25rem 2rem; 
          border-radius: var(--radius-lg); 
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal); 
        }
        .research-card:hover { 
          transform: translateY(-3px); 
          border-color: rgba(16, 185, 129, 0.4); 
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3), 0 0 25px rgba(16, 185, 129, 0.08); 
        }
        .research-card-header { 
          display: flex; 
          align-items: flex-start; 
          justify-content: space-between; 
          gap: 1.25rem; 
          margin-bottom: 0.85rem; 
        }
        .research-title { 
          font-family: var(--font-playfair, Georgia, serif); 
          font-size: 1.35rem; 
          font-weight: 700; 
          color: var(--text-primary); 
          line-height: 1.4; 
          letter-spacing: -0.01em; 
          flex: 1; 
        }
        .research-status-badge { 
          display: inline-flex; 
          align-items: center; 
          gap: 0.45rem; 
          padding: 0.3rem 0.85rem; 
          font-size: 0.72rem; 
          font-weight: 700; 
          letter-spacing: 0.12em; 
          text-transform: uppercase; 
          border-radius: var(--radius-full); 
          border: 1px solid rgba(16, 185, 129, 0.4); 
          background: rgba(16, 185, 129, 0.12); 
          color: #34D399; 
          white-space: nowrap; 
          flex-shrink: 0; 
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #34D399; box-shadow: 0 0 8px #34D399; }
        .research-authors { 
          font-size: 0.95rem; 
          color: var(--text-secondary); 
          line-height: 1.6; 
          margin-bottom: 0.75rem; 
        }
        .research-author-highlight { 
          color: var(--accent); 
          font-weight: 700; 
          text-decoration: underline; 
          text-underline-offset: 3px; 
          text-decoration-color: rgba(16, 185, 129, 0.45); 
        }
        .research-meta-row { 
          display: flex; 
          align-items: center; 
          gap: 0.65rem; 
          flex-wrap: wrap; 
          font-size: 0.86rem; 
          color: var(--text-muted); 
          margin-bottom: 1.15rem; 
        }
        .research-meta-item { display: inline-flex; align-items: center; gap: 0.35rem; }
        .meta-sep { color: var(--border-color); font-size: 0.8rem; }
        .research-venue-pill { 
          display: inline-flex; 
          align-items: center; 
          gap: 0.4rem; 
          color: var(--accent); 
          font-weight: 600; 
        }
        .research-abstract { 
          font-size: 0.91rem; 
          color: var(--text-secondary); 
          line-height: 1.8; 
          margin-bottom: 1.35rem; 
        }
        .research-footer { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          flex-wrap: wrap; 
          gap: 1rem; 
          padding-top: 1.15rem; 
          border-top: 1px solid rgba(255, 255, 255, 0.07); 
        }
        .research-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .research-tag { 
          font-size: 0.75rem; 
          padding: 0.2rem 0.65rem; 
          border-radius: var(--radius-sm); 
          background: rgba(255, 255, 255, 0.04); 
          border: 1px solid var(--border-color); 
          color: var(--text-muted); 
        }
        .research-actions { display: flex; gap: 0.75rem; align-items: center; }
        .research-doi-btn { 
          display: inline-flex; 
          align-items: center; 
          gap: 0.45rem; 
          padding: 0.45rem 1.05rem; 
          font-size: 0.82rem; 
          font-weight: 600; 
          border-radius: var(--radius-md); 
          background: rgba(16, 185, 129, 0.12); 
          border: 1px solid rgba(16, 185, 129, 0.38); 
          color: #34D399; 
          text-decoration: none; 
          transition: all var(--transition-fast); 
        }
        .research-doi-btn:hover { 
          background: rgba(16, 185, 129, 0.22); 
          border-color: #10B981; 
          color: #ffffff; 
          transform: translateY(-1px); 
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2); 
        }

        /* ===== EVENTS ===== */
        .events-stack-list { display: flex; flex-direction: column; gap: 2.25rem; }
        .events-grid, .achievements-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .event-card, .achievement-card { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; border-radius: var(--radius-lg); transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal); }
        .event-card:hover, .achievement-card:hover { transform: translateY(-3px); border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3); }
        .event-header, .achievement-header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
        .event-location { font-size: 0.8rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.3rem; }
        .event-title, .achievement-title { font-family: var(--font-playfair, var(--font-heading)); font-size: 1.18rem; font-weight: 700; color: var(--text-primary); line-height: 1.35; }
        .event-desc, .achievement-desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7; }
        .event-footer, .achievement-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-color); }
        .event-date, .achievement-date { font-size: 0.82rem; color: var(--text-muted); }
        .event-link, .achievement-link { font-size: 0.82rem; font-weight: 600; color: var(--accent); text-decoration: none; transition: opacity var(--transition-fast); }
        .event-link:hover, .achievement-link:hover { opacity: 0.8; }

        /* ===== BLOG ===== */
        .blog-grid { display: flex; flex-direction: column; gap: 1.5rem; }
        .blog-card { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.6rem; cursor: pointer; }
        .blog-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-muted); }
        .blog-dot { font-size: 0.6rem; }
        .blog-title { font-family: var(--font-playfair, var(--font-heading)); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
        .blog-excerpt { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; }
        .blog-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.25rem; }
        .blog-read-more { margin-top: 0.5rem; }
        .read-more-link { font-size: 0.88rem; font-weight: 600; color: var(--accent); transition: opacity var(--transition-fast); }
        .blog-card:hover .read-more-link { opacity: 0.8; }

        /* ===== RESUME ===== */
        .resume-card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .resume-preview { border: 2px dashed var(--border-color); border-radius: var(--radius-md); min-height: 500px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: var(--bg-glass); }
        .resume-iframe { width: 100%; height: 100%; min-height: 500px; border: none; }
        .resume-placeholder { text-align: center; padding: 2rem; }
        .resume-actions { display: flex; gap: 1rem; justify-content: center; }

        /* ===== CONTACT ===== */
        .contact-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; align-items: start; }
        .contact-sidebar { display: flex; flex-direction: column; gap: 1rem; }
        .contact-info-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; }
        .contact-info-icon-wrap { min-width: 40px; text-align: center; }
        .contact-info-label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .contact-info-value { font-size: 0.95rem; color: var(--text-primary); text-decoration: none; transition: color var(--transition-fast); }
        a.contact-info-value:hover { color: var(--accent); }
        .contact-social-card { padding: 1.25rem; }
        .contact-social-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .contact-social-link { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; font-size: 0.9rem; font-weight: 500; color: var(--text-secondary); text-decoration: none; border-radius: var(--radius-sm); transition: all var(--transition-fast); }
        .contact-social-link:hover { color: var(--accent); background: var(--bg-glass-strong); }

        /* ===== RESPONSIVE ===== */
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
          .about-intro { flex-direction: column; align-items: center; text-align: center; }
          .interests-grid { grid-template-columns: 1fr; }
          .achievements-grid { grid-template-columns: 1fr; }
          .contact-layout { grid-template-columns: 1fr; }
          .filter-bar { flex-direction: column; align-items: stretch; }
          .search-input { width: 100%; min-width: unset; }
          .resume-actions { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
