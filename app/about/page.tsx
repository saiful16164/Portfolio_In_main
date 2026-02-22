"use client";

import SectionHeading from "@/app/components/SectionHeading";
import { personalInfo } from "@/app/data";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="section">
            <div className="container about-container">
                <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

                {/* Intro */}
                <div className="about-intro glass-card animate-fade-in-up">
                    <div className="about-avatar">👨‍💻</div>
                    <div className="about-intro-text">
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                            <span className="gradient-text">{personalInfo.name}</span>
                        </h3>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                            {personalInfo.personalStory}
                        </p>
                    </div>
                </div>

                {/* Education Timeline */}
                <div className="about-section animate-fade-in-up delay-200">
                    <h3 className="about-section-title">
                        <span className="gradient-text-cv">🎓 Education</span>
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
                                        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "0.5rem", lineHeight: 1.6 }}>
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
                        <span className="gradient-text-cv">🎯 Career Goals</span>
                    </h3>
                    <div className="glass-card" style={{ padding: "1.5rem" }}>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                            {personalInfo.careerGoals}
                        </p>
                    </div>
                </div>

                {/* Technical Interests */}
                <div className="about-section animate-fade-in-up delay-400">
                    <h3 className="about-section-title">
                        <span className="gradient-text-cv">💡 Technical Interests</span>
                    </h3>
                    <div className="interests-grid">
                        {personalInfo.technicalInterests.map((interest, i) => (
                            <div key={i} className="interest-card glass-card">
                                <span className="interest-bullet">▹</span>
                                <span>{interest}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="about-cta animate-fade-in-up delay-500">
                    <Link href="/contact" className="btn-primary">
                        Let&apos;s Connect →
                    </Link>
                    <Link href="/projects" className="btn-outline">
                        See My Work
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .about-container {
          max-width: 800px;
        }
        .about-intro {
          display: flex;
          gap: 1.5rem;
          padding: 2rem;
          align-items: flex-start;
          margin-bottom: 2.5rem;
        }
        .about-avatar {
          font-size: 4rem;
          min-width: 80px;
          text-align: center;
        }
        .about-section {
          margin-bottom: 2.5rem;
        }
        .about-section-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          padding-left: 1.5rem;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--gradient-main);
          border-radius: 2px;
        }
        .timeline-item {
          position: relative;
          padding: 1.25rem 1.5rem;
        }
        .timeline-dot {
          position: absolute;
          left: -1.75rem;
          top: 1.5rem;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--gradient-main);
          border: 3px solid var(--bg-primary);
        }
        .timeline-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .timeline-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.75rem;
        }
        .interest-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          font-size: 0.93rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .interest-bullet {
          color: var(--cyan);
          font-size: 1.1rem;
        }
        .about-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        @media (max-width: 640px) {
          .about-intro {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .interests-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
