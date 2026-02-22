"use client";

import Link from "next/link";
import { personalInfo } from "@/app/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Top Row */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span style={{ color: "var(--cyan)", fontFamily: "monospace" }}>&lt;</span>
              <span className="gradient-text">Saiful</span>
              <span style={{ color: "var(--cyan)", fontFamily: "monospace" }}>/&gt;</span>
            </Link>
            <p className="footer-tagline">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Navigation</h4>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/projects" className="footer-link">Projects</Link>
            <Link href="/skills" className="footer-link">Skills</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Connect</h4>
            <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className="footer-link">
              Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
            className="back-to-top"
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Top
          </button>
        </div>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          margin-top: auto;
        }
        .footer-inner {
          padding-top: 3rem;
          padding-bottom: 1.5rem;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .footer-logo {
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          gap: 2px;
        }
        .footer-tagline {
          margin-top: 0.75rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .footer-heading {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .footer-links-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .footer-link {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color var(--transition-fast);
          padding: 0.15rem 0;
        }
        .footer-link:hover {
          color: var(--cyan);
        }
        .footer-divider {
          height: 1px;
          background: var(--border-color);
          margin-bottom: 1.5rem;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-copyright {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .back-to-top:hover {
          color: var(--cyan);
          border-color: var(--cyan);
        }
        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
