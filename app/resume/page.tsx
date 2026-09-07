"use client";

import React from "react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="resume-container-page">
      {/* Top Action Bar (hidden on print) */}
      <div className="resume-action-bar no-print">
        <Link href="/#resume" className="resume-back-link" title="Close and return to portfolio">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span>Close Resume</span>
        </Link>
        <div className="resume-btn-group">
          <button onClick={handlePrint} className="resume-print-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print</span>
          </button>
          <a href="/resume.pdf" download="Saiful_Islam_Resume.pdf" className="resume-download-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="resume-sheet">
        {/* HEADER */}
        <header className="resume-header">
          <h1 className="resume-name">SAIFUL ISLAM</h1>
          <p className="resume-tagline">Computer Science & Engineering Undergraduate • Mobile & Web Developer</p>
          <div className="resume-contact-bar">
            <span>Sylhet, Bangladesh</span>
            <span className="bullet-sep">•</span>
            <a href="tel:+8801707224860">+880 1707-224860</a>
            <span className="bullet-sep">•</span>
            <a href="mailto:saiful1616.islam@gmail.com">saiful1616.islam@gmail.com</a>
            <span className="bullet-sep">•</span>
            <a href="https://github.com/saiful16164" target="_blank" rel="noreferrer">github.com/saiful16164</a>
            <span className="bullet-sep">•</span>
            <a href="https://www.linkedin.com/in/saiful1616/" target="_blank" rel="noreferrer">linkedin.com/in/saiful1616</a>
          </div>
        </header>

        {/* EDUCATION */}
        <section className="resume-section">
          <h2 className="section-heading">Education</h2>
          <div className="entry">
            <div className="entry-head">
              <span className="entry-bold">Sylhet Engineering College</span>
              <span className="entry-date">2022 – Present</span>
            </div>
            <div className="entry-subhead">
              <span>Bachelor of Science in Computer Science & Engineering</span>
              <span className="entry-location">Sylhet, Bangladesh</span>
            </div>
            <p className="entry-coursework">
              <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Engineering, Machine Learning, Operating Systems, Computer Networks.
            </p>
          </div>
          <div className="entry" style={{ marginTop: "0.4rem" }}>
            <div className="entry-head">
              <span className="entry-bold">BAF Shaheen College Shamshernagar</span>
              <span className="entry-date">2020 – 2022</span>
            </div>
            <div className="entry-subhead">
              <span>Higher Secondary Certificate (HSC), Science</span>
              <span className="entry-location">Moulvibazar, Bangladesh</span>
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="resume-section">
          <h2 className="section-heading">Technical Skills</h2>
          <div className="skills-stack">
            <div className="skills-line">
              <span className="skill-cat">Programming Languages:</span>
              <span className="skill-vals">C, C++, Python, Dart, Kotlin, TypeScript, JavaScript, SQL</span>
            </div>
            <div className="skills-line">
              <span className="skill-cat">Frameworks & Libraries:</span>
              <span className="skill-vals">Flutter, Android SDK, React.js, Next.js, PyTorch, Node.js, Tailwind CSS</span>
            </div>
            <div className="skills-line">
              <span className="skill-cat">Databases & Cloud:</span>
              <span className="skill-vals">PostgreSQL, Supabase, Firebase (Firestore, Auth, Cloud Messaging), SQLite</span>
            </div>
            <div className="skills-line">
              <span className="skill-cat">Developer Tools:</span>
              <span className="skill-vals">Git, GitHub, VS Code, Android Studio, Linux, RESTful APIs, Postman</span>
            </div>
          </div>
        </section>

        {/* RESEARCH PUBLICATIONS */}
        <section className="resume-section">
          <h2 className="section-heading">Research Publications</h2>
          <div className="entry">
            <div className="entry-head">
              <span className="entry-bold">Classification of Guava and Mango Leaf Diseases Using YOLOv11 and Stable Diffusion-Based Augmentation</span>
              <span className="entry-date">Dec 2025</span>
            </div>
            <div className="entry-subhead">
              <span>2025 28th International Conference on Computer and Information Technology (ICCIT)</span>
              <a href="https://doi.org/10.1109/ICCIT68739.2025.11491324" target="_blank" rel="noreferrer" className="doi-badge">DOI: 10.1109/ICCIT68739.2025.11491324</a>
            </div>
            <ul className="entry-bullets">
              <li>Formulated a deep learning framework pairing YOLOv11 with generative Stable Diffusion data augmentation to overcome agricultural dataset scarcity.</li>
              <li>Achieved superior precision and recall in plant pathogen diagnosis under variable outdoor illumination and uncontrolled field environments.</li>
            </ul>
          </div>
          <div className="entry" style={{ marginTop: "0.5rem" }}>
            <div className="entry-head">
              <span className="entry-bold">Bangla Optical Character Recognition using Vision Transformers and CNN Ensembles</span>
              <span className="entry-date">Dec 2025</span>
            </div>
            <div className="entry-subhead">
              <span>2025 IEEE WIECON-ECE Conference</span>
              <a href="https://doi.org/10.1109/WIECON-ECE69386.2025.11526313" target="_blank" rel="noreferrer" className="doi-badge">DOI: 10.1109/WIECON-ECE69386.2025.11526313</a>
            </div>
            <ul className="entry-bullets">
              <li>Engineered a hybrid Vision Transformer (ViT) and Convolutional Neural Network architecture for cursive and printed Bangla script recognition.</li>
              <li>Demonstrated marked reduction in Character Error Rate (CER) on noisy and distorted document scans against standard OCR benchmarks.</li>
            </ul>
          </div>
        </section>

        {/* KEY PROJECTS */}
        <section className="resume-section">
          <h2 className="section-heading">Key Projects</h2>
          <div className="entry">
            <div className="entry-head">
              <span className="entry-bold">Smart Ledger — Personal Finance & Expense Tracker</span>
              <span className="entry-date">Flutter • Dart • Supabase • PostgreSQL</span>
            </div>
            <ul className="entry-bullets">
              <li>Engineered a full-featured cross-platform expense tracker with real-time cloud data synchronization, category budgeting, and multi-currency support.</li>
              <li>Architected offline-first local persistence with Supabase background syncing, maintaining sub-50ms UI response times during intermittent connectivity.</li>
              <li>Designed interactive analytics visualizers displaying categorized spending trends, monthly burn rates, and financial reports.</li>
            </ul>
          </div>
          <div className="entry" style={{ marginTop: "0.5rem" }}>
            <div className="entry-head">
              <span className="entry-bold">SEC Routine App — Automated College Schedule Manager</span>
              <span className="entry-date">Flutter • Firebase • Kotlin • Android</span>
            </div>
            <ul className="entry-bullets">
              <li>Developed an academic scheduling application adopted by Sylhet Engineering College students to automate lecture tracking and timetable lookups.</li>
              <li>Integrated Firebase Cloud Messaging (FCM) to trigger background push notifications prior to scheduled class and lab sessions.</li>
              <li>Built personalized schedule filtering by batch, department, and semester with persistent offline timetable storage.</li>
            </ul>
          </div>
          <div className="entry" style={{ marginTop: "0.5rem" }}>
            <div className="entry-head">
              <span className="entry-bold">Exam Rush Hour — Real-Time Academic Assessment Platform</span>
              <span className="entry-date">Next.js • TypeScript • React • PostgreSQL</span>
            </div>
            <ul className="entry-bullets">
              <li>Architected an online competitive assessment platform featuring timed challenge sessions and live score leaderboards.</li>
              <li>Implemented high-performance server-rendered UI components with Next.js App Router and secure user session management.</li>
            </ul>
          </div>
        </section>

        {/* HONORS & ACTIVITIES */}
        <section className="resume-section">
          <h2 className="section-heading">Honors & Activities</h2>
          <div className="entry">
            <div className="entry-head">
              <span className="entry-bold">SUST Hackathon 2026</span>
              <span className="entry-date">2026</span>
            </div>
            <div className="entry-subhead">
              <span>Shahjalal University of Science and Technology (SUST EEE Carnival 2026)</span>
            </div>
            <ul className="entry-bullets">
              <li>Collaborated in an intensive sprint environment to architect, build, and pitch technical solutions under competitive deadlines.</li>
            </ul>
          </div>
          <div className="entry" style={{ marginTop: "0.4rem" }}>
            <div className="entry-head">
              <span className="entry-bold">Leading University Junior IUPC 2024</span>
              <span className="entry-date">2024</span>
            </div>
            <div className="entry-subhead">
              <span>Inter-University Programming Contest (LU IUPC)</span>
            </div>
            <ul className="entry-bullets">
              <li>Represented Sylhet Engineering College solving complex algorithmic, dynamic programming, and data structure problem sets.</li>
            </ul>
          </div>
          <div className="entry" style={{ marginTop: "0.4rem" }}>
            <div className="entry-head">
              <span className="entry-bold">Paper Presenter</span>
              <span className="entry-date">Dec 2025</span>
            </div>
            <div className="entry-subhead">
              <span>IEEE ICCIT 2025 & IEEE WIECON-ECE 2025 (Cox&apos;s Bazar, Bangladesh)</span>
            </div>
            <ul className="entry-bullets">
              <li>Delivered technical oral presentations defending research findings to academic and industry peers.</li>
            </ul>
          </div>
        </section>
      </main>

      <style jsx>{`
        .resume-container-page {
          min-height: calc(100vh - 70px);
          background: #09100d;
          color: #1a202c;
          padding: 1.5rem 1rem 4rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .resume-action-bar {
          width: 100%;
          max-width: 8.5in;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(18, 30, 24, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 12px;
        }

        .resume-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #34d399;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          transition: all 0.2s ease;
          background: rgba(16, 185, 129, 0.12);
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .resume-back-link:hover {
          background: rgba(16, 185, 129, 0.25);
          color: #ffffff;
          transform: translateX(-3px);
        }

        .resume-btn-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .resume-print-btn,
        .resume-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .resume-print-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .resume-print-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }

        .resume-download-btn {
          background: #10b981;
          color: #061e14;
          border: 1px solid #10b981;
        }

        .resume-download-btn:hover {
          background: #34d399;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        }

        .resume-sheet {
          width: 100%;
          max-width: 8.5in;
          margin: 0 auto;
          background: #ffffff !important;
          color: #0f172a !important;
          padding: 0.65in 0.75in;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          border-radius: 4px;
          line-height: 1.38;
          height: auto !important;
          min-height: min-content;
        }

        .resume-header {
          text-align: center;
          margin-bottom: 0.75rem;
        }

        .resume-name {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .resume-tagline {
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f766e;
          margin-bottom: 0.4rem;
        }

        .resume-contact-bar {
          font-size: 0.82rem;
          color: #334155;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.45rem;
        }

        .resume-contact-bar a {
          color: #0f766e;
          text-decoration: none;
        }

        .resume-contact-bar a:hover {
          text-decoration: underline;
        }

        .bullet-sep {
          color: #94a3b8;
          font-size: 0.75rem;
        }

        .resume-section {
          margin-top: 0.85rem;
        }

        .section-heading {
          font-size: 0.92rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0f172a;
          border-bottom: 1.5px solid #0f766e;
          padding-bottom: 0.2rem;
          margin-bottom: 0.5rem;
        }

        .entry {
          margin-bottom: 0.45rem;
        }

        .entry-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.88rem;
        }

        .entry-bold {
          font-weight: 700;
          color: #0f172a;
        }

        .entry-date {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
        }

        .entry-subhead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.82rem;
          font-weight: 500;
          color: #334155;
          margin-top: 0.1rem;
        }

        .entry-location {
          font-style: italic;
          color: #64748b;
          font-size: 0.78rem;
        }

        .doi-badge {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.78rem;
        }

        .doi-badge:hover {
          text-decoration: underline;
        }

        .entry-coursework {
          font-size: 0.8rem;
          color: #334155;
          margin-top: 0.25rem;
        }

        .entry-bullets {
          margin-left: 1.25rem;
          margin-top: 0.25rem;
        }

        .entry-bullets li {
          font-size: 0.82rem;
          color: #1e293b;
          margin-bottom: 0.2rem;
          line-height: 1.35;
        }

        .skills-stack {
          display: flex;
          flex-direction: column;
          gap: 0.28rem;
        }

        .skills-line {
          font-size: 0.82rem;
          color: #1e293b;
        }

        .skill-cat {
          font-weight: 700;
          color: #0f172a;
          display: inline-block;
          min-width: 175px;
        }

        @media (max-width: 640px) {
          .resume-sheet {
            padding: 1.5rem 1.25rem;
          }
          .resume-action-bar {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
          }
          .resume-btn-group {
            justify-content: space-between;
          }
          .skill-cat {
            display: block;
            min-width: 0;
            margin-bottom: 0.1rem;
          }
        }

        @media print {
          .no-print {
            display: none !important;
          }
          .resume-container-page {
            background: #ffffff !important;
            padding: 0 !important;
          }
          .resume-sheet {
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
