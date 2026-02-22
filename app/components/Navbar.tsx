"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/data";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="gradient-text">Saiful</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Resume CTA */}
          <Link href="/resume" className="resume-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Resume
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileOpen ? "hamburger-open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-nav-link ${pathname === link.href ? "mobile-nav-link-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-nav-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
        <div className="mobile-menu-divider" />
        <Link
          href="/resume"
          className="mobile-resume-btn"
          onClick={() => setMobileOpen(false)}
        >
          📄 View Resume
        </Link>
      </div>

      <style jsx>{`
        /* ===== NAVBAR BASE ===== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }
        .navbar-scrolled {
          background: rgba(10, 10, 15, 0.85);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        /* Light theme overrides */
        :global([data-theme="light"]) .navbar {
          background: rgba(250, 250, 250, 0.6);
        }
        :global([data-theme="light"]) .navbar-scrolled {
          background: rgba(250, 250, 250, 0.88);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        /* ===== LOGO ===== */
        .navbar-logo {
          font-size: 1.35rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 2px;
          text-decoration: none;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .navbar-logo:hover {
          transform: scale(1.03);
        }
        .logo-bracket {
          color: var(--cyan);
          font-family: var(--font-mono, monospace);
          font-weight: 400;
        }

        /* ===== DESKTOP NAV LINKS ===== */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 0.35rem 0.5rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: var(--radius-full);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          white-space: nowrap;
          position: relative;
        }
        .nav-link-icon {
          font-size: 0.85rem;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-glass-strong);
        }
        .nav-link:hover .nav-link-icon {
          transform: scale(1.15);
        }

        /* Active link — gradient pill */
        .nav-link-active {
          color: #fff;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.2));
          border: 1px solid rgba(0, 212, 255, 0.3);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.12), inset 0 0 8px rgba(0, 212, 255, 0.06);
        }
        .nav-link-active:hover {
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(168, 85, 247, 0.25));
        }

        /* ===== ACTIONS ===== */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        /* Resume CTA Button */
        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1.1rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--cyan);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: var(--radius-full);
          background: rgba(0, 212, 255, 0.06);
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .resume-btn:hover {
          background: rgba(0, 212, 255, 0.12);
          border-color: rgba(0, 212, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
          transform: translateY(-1px);
        }

        /* Theme Toggle */
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-glass);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .theme-toggle:hover {
          border-color: var(--violet);
          color: var(--violet);
          background: rgba(168, 85, 247, 0.08);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.12);
          transform: rotate(20deg);
        }

        /* ===== MOBILE MENU BUTTON ===== */
        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-glass);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-menu-btn:hover {
          border-color: var(--border-hover);
          background: var(--bg-glass-strong);
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 18px;
        }
        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .hamburger-open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger-open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger-open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ===== MOBILE MENU ===== */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 0.75rem 1rem 1rem;
          gap: 0.2rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-open {
          display: flex;
          max-height: 600px;
          opacity: 1;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .mobile-nav-icon {
          font-size: 1.1rem;
          width: 28px;
          text-align: center;
        }
        .mobile-nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-glass-strong);
          padding-left: 1.25rem;
        }
        .mobile-nav-link-active {
          color: var(--cyan);
          background: rgba(0, 212, 255, 0.06);
          border-left: 3px solid var(--cyan);
        }
        .mobile-menu-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }
        .mobile-resume-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--cyan);
          background: rgba(0, 212, 255, 0.06);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mobile-resume-btn:hover {
          background: rgba(0, 212, 255, 0.12);
          border-color: rgba(0, 212, 255, 0.4);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1050px) {
          .nav-link-icon {
            display: none;
          }
          .nav-link {
            padding: 0.4rem 0.7rem;
            font-size: 0.8rem;
          }
        }
        @media (max-width: 900px) {
          .navbar-links {
            display: none;
          }
          .resume-btn {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
