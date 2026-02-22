"use client";

import SectionHeading from "@/app/components/SectionHeading";
import Link from "next/link";
import portfolioData from "@/app/data/portfolio-data.json";

export default function ResumePage() {
    const resumeLink = portfolioData.siteSettings.resumeLink || "";

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: "800px" }}>
                <SectionHeading
                    title="Resume"
                    subtitle="Download my resume or view it inline"
                />

                <div className="resume-card glass-card animate-fade-in-up">
                    {/* Resume Preview Area */}
                    <div className="resume-preview">
                        {resumeLink ? (
                            <iframe src={resumeLink} className="resume-iframe" title="Resume Preview" />
                        ) : (
                            <div className="resume-placeholder">
                                <span style={{ fontSize: "4rem" }}>📄</span>
                                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginTop: "1rem" }}>
                                    <span className="gradient-text">Resume Not Available</span>
                                </h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                                    A resume has not been uploaded yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
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
                        <Link href="/contact" className="btn-outline">
                            Contact Me
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .resume-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .resume-preview {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-glass);
        }
        .resume-iframe {
          width: 100%;
          height: 100%;
          min-height: 500px;
          border: none;
        }
        .resume-placeholder {
          text-align: center;
          padding: 2rem;
        }
        .resume-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .resume-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}
