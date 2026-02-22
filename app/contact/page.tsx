"use client";

import { Suspense } from "react";
import SectionHeading from "@/app/components/SectionHeading";
import ContactForm from "@/app/components/ContactForm";
import { personalInfo } from "@/app/data";

export default function ContactPage() {
  return (
    <div className="section">
      <div className="section-glow section-glow-cyan" style={{ bottom: "0", left: "-10%" }} />
      <div className="section-glow section-glow-violet" style={{ top: "10%", right: "-10%" }} />
      <div className="container" style={{ maxWidth: "1000px" }}>
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Drop me a message!"
        />

        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-wrapper animate-fade-in-up">
            <Suspense fallback={<div className="glass-card" style={{ padding: "2rem" }}>Loading...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Info Sidebar */}
          <div className="contact-sidebar animate-fade-in-up delay-200">
            {/* Email */}
            <div className="contact-info-card glass-card">
              <div className="contact-info-icon">📧</div>
              <div>
                <h4 className="contact-info-label">Email</h4>
                <a href={`mailto:${personalInfo.email}`} className="contact-info-value">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-card glass-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <h4 className="contact-info-label">Location</h4>
                <p className="contact-info-value">{personalInfo.location}</p>
              </div>
            </div>

            {/* Social */}
            <div className="contact-social-card glass-card">
              <h4 className="contact-info-label" style={{ marginBottom: "0.75rem" }}>Follow Me</h4>
              <div className="contact-social-links">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
                  GitHub
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
          align-items: start;
        }
        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
        }
        .contact-info-icon {
          font-size: 1.5rem;
          min-width: 40px;
          text-align: center;
        }
        .contact-info-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .contact-info-value {
          font-size: 0.95rem;
          color: var(--text-primary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        a.contact-info-value:hover {
          color: var(--cyan);
        }
        .contact-social-card {
          padding: 1.25rem;
        }
        .contact-social-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .contact-social-link:hover {
          color: var(--cyan);
          background: var(--bg-glass-strong);
        }
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
