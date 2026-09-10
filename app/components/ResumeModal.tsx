"use client";

import React, { useEffect, useCallback } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // ESC key listener & body scroll lock
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div
        className="resume-modal-card animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Resume Modal"
      >
        {/* Sticky Header with Controls & Prominent Close Button */}
        <div className="resume-modal-header">
          <div className="resume-modal-title-group">
            <h2 className="modal-title">Saiful Islam — Resume</h2>
            <span className="modal-subtitle">Full Document Preview</span>
          </div>

          <div className="resume-modal-actions">
            <button
              onClick={handlePrint}
              className="modal-action-btn"
              title="Print Resume"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print</span>
            </button>

            <a
              href="/resume.pdf"
              download="Saiful_Islam_Resume.pdf"
              className="modal-action-btn modal-download-btn"
              title="Download PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </a>

            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn"
              title="Open in new page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Prominent Close Button */}
            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close Resume"
              title="Close Resume (Esc)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="resume-modal-scroll">
          <div className="resume-paper">
            {/* Header */}
            <header className="paper-header">
              <h1 className="paper-name">SAIFUL ISLAM</h1>
              <p className="paper-tagline">Computer Science & Engineering Undergraduate • Mobile & Web Developer</p>
              <div className="paper-contact">
                <span>Sylhet, Bangladesh</span>
                <span className="dot">•</span>
                <a href="tel:+8801707224860">+880 1707-224860</a>
                <span className="dot">•</span>
                <a href="mailto:saiful1616.islam@gmail.com">saiful1616.islam@gmail.com</a>
                <span className="dot">•</span>
                <a href="https://github.com/saiful16164" target="_blank" rel="noreferrer">github.com/saiful16164</a>
                <span className="dot">•</span>
                <a href="https://www.linkedin.com/in/saiful1616/" target="_blank" rel="noreferrer">linkedin.com/in/saiful1616</a>
              </div>
            </header>

            {/* Education */}
            <section className="paper-section">
              <h2 className="paper-heading">Education</h2>
              <div className="paper-entry">
                <div className="entry-line1">
                  <span className="bold">Sylhet Engineering College</span>
                  <span className="date">2022 – Present</span>
                </div>
                <div className="entry-line2">
                  <span>Bachelor of Science in Computer Science & Engineering</span>
                  <span className="loc">Sylhet, Bangladesh</span>
                </div>
                <p className="coursework">
                  <strong>Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Engineering, Machine Learning, Operating Systems, Computer Networks.
                </p>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.35rem" }}>
                <div className="entry-line1">
                  <span className="bold">BAF Shaheen College Shamshernagar</span>
                  <span className="date">2020 – 2022</span>
                </div>
                <div className="entry-line2">
                  <span>Higher Secondary Certificate (HSC), Science</span>
                  <span className="loc">Moulvibazar, Bangladesh</span>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="paper-section">
              <h2 className="paper-heading">Technical Skills</h2>
              <div className="skills-table">
                <div className="skill-item">
                  <span className="skill-head">Programming Languages:</span>
                  <span>C, C++, Python, Dart, Kotlin, TypeScript, JavaScript, SQL</span>
                </div>
                <div className="skill-item">
                  <span className="skill-head">Frameworks & Libraries:</span>
                  <span>Flutter, Android SDK, React.js, Next.js, PyTorch, Node.js, Tailwind CSS</span>
                </div>
                <div className="skill-item">
                  <span className="skill-head">Databases & Cloud:</span>
                  <span>PostgreSQL, Supabase, Firebase (Firestore, Auth, Cloud Messaging), SQLite</span>
                </div>
                <div className="skill-item">
                  <span className="skill-head">Developer Tools:</span>
                  <span>Git, GitHub, VS Code, Android Studio, Linux, RESTful APIs, Postman</span>
                </div>
              </div>
            </section>

            {/* Research Publications */}
            <section className="paper-section">
              <h2 className="paper-heading">Research Publications</h2>
              <div className="paper-entry">
                <div className="entry-line1">
                  <span className="bold">Classification of Guava and Mango Leaf Diseases Using YOLOv11 and Stable Diffusion-Based Augmentation</span>
                  <span className="date">Dec 2025</span>
                </div>
                <div className="entry-line2">
                  <span>2025 28th International Conference on Computer and Information Technology (ICCIT)</span>
                  <a href="https://doi.org/10.1109/ICCIT68739.2025.11491324" target="_blank" rel="noreferrer" className="paper-link">DOI: 10.1109/ICCIT68739.2025.11491324</a>
                </div>
                <ul className="paper-bullets">
                  <li>Formulated a deep learning framework pairing YOLOv11 with generative Stable Diffusion data augmentation to overcome agricultural dataset scarcity.</li>
                  <li>Achieved superior precision and recall in plant pathogen diagnosis under variable outdoor illumination and field conditions.</li>
                </ul>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.45rem" }}>
                <div className="entry-line1">
                  <span className="bold">Bangla Optical Character Recognition using Vision Transformers and CNN Ensembles</span>
                  <span className="date">Dec 2025</span>
                </div>
                <div className="entry-line2">
                  <span>2025 IEEE WIECON-ECE Conference</span>
                  <a href="https://doi.org/10.1109/WIECON-ECE69386.2025.11526313" target="_blank" rel="noreferrer" className="paper-link">DOI: 10.1109/WIECON-ECE69386.2025.11526313</a>
                </div>
                <ul className="paper-bullets">
                  <li>Engineered a hybrid Vision Transformer (ViT) and Convolutional Neural Network architecture for cursive and printed Bangla script recognition.</li>
                  <li>Demonstrated marked reduction in Character Error Rate (CER) on noisy and distorted document scans against standard OCR benchmarks.</li>
                </ul>
              </div>
            </section>

            {/* Key Projects */}
            <section className="paper-section">
              <h2 className="paper-heading">Key Projects</h2>
              <div className="paper-entry">
                <div className="entry-line1">
                  <span className="bold">Smart Ledger — Personal Finance & Expense Tracker</span>
                  <span className="date">Flutter • Dart • Supabase • PostgreSQL</span>
                </div>
                <ul className="paper-bullets">
                  <li>Engineered a cross-platform expense tracker with real-time cloud data synchronization, category budgeting, and multi-currency support.</li>
                  <li>Architected offline-first local persistence with Supabase background syncing, maintaining sub-50ms UI response times during intermittent connectivity.</li>
                  <li>Designed interactive analytics visualizers displaying categorized spending trends, monthly burn rates, and financial reports.</li>
                </ul>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.45rem" }}>
                <div className="entry-line1">
                  <span className="bold">SEC Routine App — Automated College Schedule Manager</span>
                  <span className="date">Flutter • Firebase • Kotlin • Android</span>
                </div>
                <ul className="paper-bullets">
                  <li>Developed an academic scheduling application adopted by Sylhet Engineering College students to automate lecture tracking and timetable lookups.</li>
                  <li>Integrated Firebase Cloud Messaging (FCM) to trigger background push notifications prior to scheduled class and lab sessions.</li>
                  <li>Built personalized schedule filtering by batch, department, and semester with persistent offline timetable storage.</li>
                </ul>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.45rem" }}>
                <div className="entry-line1">
                  <span className="bold">Exam Rush Hour — Real-Time Academic Assessment Platform</span>
                  <span className="date">Next.js • TypeScript • React • PostgreSQL</span>
                </div>
                <ul className="paper-bullets">
                  <li>Architected an online competitive assessment platform featuring timed challenge sessions and live score leaderboards.</li>
                  <li>Implemented high-performance server-rendered UI components with Next.js App Router and secure user session management.</li>
                </ul>
              </div>
            </section>

            {/* Honors & Activities */}
            <section className="paper-section">
              <h2 className="paper-heading">Honors & Activities</h2>
              <div className="paper-entry">
                <div className="entry-line1">
                  <span className="bold">SUST Hackathon 2026</span>
                  <span className="date">2026</span>
                </div>
                <div className="entry-line2">
                  <span>Shahjalal University of Science and Technology (SUST EEE Carnival 2026)</span>
                </div>
                <ul className="paper-bullets">
                  <li>Collaborated in an intensive sprint environment to architect, build, and pitch technical solutions under competitive deadlines.</li>
                </ul>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.35rem" }}>
                <div className="entry-line1">
                  <span className="bold">Leading University Junior IUPC 2024</span>
                  <span className="date">2024</span>
                </div>
                <div className="entry-line2">
                  <span>Inter-University Programming Contest (LU IUPC)</span>
                </div>
                <ul className="paper-bullets">
                  <li>Represented Sylhet Engineering College solving complex algorithmic, dynamic programming, and data structure problem sets.</li>
                </ul>
              </div>
              <div className="paper-entry" style={{ marginTop: "0.35rem" }}>
                <div className="entry-line1">
                  <span className="bold">Paper Presenter</span>
                  <span className="date">Dec 2025</span>
                </div>
                <div className="entry-line2">
                  <span>IEEE ICCIT 2025 & IEEE WIECON-ECE 2025 (Cox&apos;s Bazar, Bangladesh)</span>
                </div>
                <ul className="paper-bullets">
                  <li>Delivered technical oral presentations defending research findings to academic and industry peers.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Modal Bottom Bar with Close Button */}
        <div className="resume-modal-footer">
          <span className="footer-hint">Press <kbd>Esc</kbd> or click Close to return</span>
          <button onClick={onClose} className="footer-close-btn">
            Close Resume
          </button>
        </div>
      </div>

      <style jsx>{`
        .resume-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
        }

        .resume-modal-card {
          width: 100%;
          max-width: 900px;
          height: 92vh;
          max-height: 92vh;
          background: #0d1511;
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.15);
          overflow: hidden;
          animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .resume-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.4rem;
          background: rgba(18, 30, 24, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1rem;
          flex-shrink: 0;
        }

        .modal-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.02em;
        }

        .modal-subtitle {
          font-size: 0.76rem;
          color: #10b981;
          font-weight: 600;
          display: block;
        }

        .resume-modal-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .modal-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.8rem;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-decoration: none;
        }

        .modal-action-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
        }

        .modal-download-btn {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
          color: #34d399;
        }

        .modal-download-btn:hover {
          background: #10b981;
          color: #061e14;
        }

        .modal-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.9rem;
          font-size: 0.84rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          background: #dc2626;
          color: #ffffff;
          border: 1px solid #ef4444;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
        }

        .modal-close-btn:hover {
          background: #b91c1c;
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.45);
        }

        .resume-modal-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 1rem 3rem 1rem;
          background: #09100d;
        }

        .resume-paper {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff !important;
          color: #0f172a !important;
          padding: 0.65in 0.75in;
          border-radius: 6px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.36;
          height: auto !important;
          min-height: min-content;
          display: block;
        }

        .paper-header {
          text-align: center;
          margin-bottom: 0.7rem;
        }

        .paper-name {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #0f172a;
          margin-bottom: 0.2rem;
        }

        .paper-tagline {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0f766e;
          margin-bottom: 0.35rem;
        }

        .paper-contact {
          font-size: 0.8rem;
          color: #334155;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.4rem;
        }

        .paper-contact a {
          color: #0f766e;
          text-decoration: none;
        }

        .paper-contact a:hover {
          text-decoration: underline;
        }

        .dot {
          color: #94a3b8;
          font-size: 0.7rem;
        }

        .paper-section {
          margin-top: 0.75rem;
        }

        .paper-heading {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0f172a;
          border-bottom: 1.5px solid #0f766e;
          padding-bottom: 0.2rem;
          margin-bottom: 0.45rem;
        }

        .paper-entry {
          margin-bottom: 0.4rem;
        }

        .entry-line1 {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.86rem;
        }

        .bold {
          font-weight: 700;
          color: #0f172a;
        }

        .date {
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
        }

        .entry-line2 {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.8rem;
          font-weight: 500;
          color: #334155;
          margin-top: 0.1rem;
        }

        .loc {
          font-style: italic;
          color: #64748b;
          font-size: 0.76rem;
        }

        .paper-link {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.76rem;
        }

        .paper-link:hover {
          text-decoration: underline;
        }

        .coursework {
          font-size: 0.78rem;
          color: #334155;
          margin-top: 0.2rem;
        }

        .paper-bullets {
          margin-left: 1.2rem;
          margin-top: 0.2rem;
        }

        .paper-bullets li {
          font-size: 0.8rem;
          color: #1e293b;
          margin-bottom: 0.18rem;
          line-height: 1.34;
        }

        .skills-table {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .skill-item {
          font-size: 0.8rem;
          color: #1e293b;
        }

        .skill-head {
          font-weight: 700;
          color: #0f172a;
          display: inline-block;
          min-width: 170px;
        }

        .resume-modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.4rem;
          background: rgba(18, 30, 24, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .footer-hint {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .footer-hint kbd {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          padding: 0.1rem 0.35rem;
          color: #f1f5f9;
          font-size: 0.75rem;
        }

        .footer-close-btn {
          padding: 0.45rem 1.1rem;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }

        .footer-close-btn:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #ef4444;
        }

        @media (max-width: 768px) {
          .resume-modal-card {
            height: 96vh;
            max-height: 96vh;
            border-radius: 12px;
          }
          .resume-modal-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.85rem 1rem;
            gap: 0.65rem;
          }
          .resume-modal-actions {
            width: 100%;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 0.4rem;
          }
          .resume-paper {
            padding: 1.5rem 1.15rem;
          }
          .modal-title {
            font-size: 0.95rem;
          }
          .entry-line1 {
            flex-direction: column;
            gap: 0.15rem;
          }
          .entry-line2 {
            flex-direction: column;
            gap: 0.1rem;
          }
          .paper-name {
            font-size: 1.35rem;
          }
        }

        @media (max-width: 480px) {
          .resume-modal-backdrop {
            padding: 0.25rem;
          }
          .resume-modal-card {
            height: 98vh;
            max-height: 98vh;
            border-radius: 8px;
          }
          .resume-paper {
            padding: 1rem 0.75rem;
            border-radius: 4px;
          }
          .resume-modal-scroll {
            padding: 0.75rem 0.5rem 2rem;
          }
          .modal-subtitle {
            display: none;
          }
          .modal-action-btn span {
            display: none;
          }
          .modal-action-btn {
            padding: 0.4rem;
          }
          .skill-head {
            display: block;
            min-width: 0;
            margin-bottom: 0.1rem;
          }
          .paper-bullets {
            margin-left: 0.85rem;
          }
          .paper-heading {
            font-size: 0.82rem;
          }
          .paper-name {
            font-size: 1.15rem;
          }
          .paper-tagline {
            font-size: 0.78rem;
          }
          .paper-contact {
            font-size: 0.72rem;
          }
          .resume-modal-footer {
            padding: 0.65rem 0.85rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          .footer-hint {
            font-size: 0.72rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
