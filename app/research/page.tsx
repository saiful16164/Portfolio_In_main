"use client";

import SectionHeading from "@/app/components/SectionHeading";
import portfolioData from "@/app/data/portfolio-data.json";

interface Research { id: string; title: string; abstract: string; publicationName: string; pdfLink: string; doiLink: string; status: "Published" | "Under Review" | "In Progress"; }

export default function ResearchPage() {
  const research: Research[] = portfolioData.research.map((r, i) => ({
    id: r.id || `res-${i}`,
    title: r.title,
    abstract: r.abstract || "",
    publicationName: r.publicationName || "",
    pdfLink: r.pdfLink || "",
    doiLink: r.doiLink || "",
    status: r.status as "Published" | "Under Review" | "In Progress",
  }));

  return (
    <div className="section">
      <div className="section-glow section-glow-violet" style={{ top: "0", right: "-15%" }} />
      <div className="container" style={{ maxWidth: "900px" }}>
        <SectionHeading title="Research" subtitle="Academic publications and ongoing research projects" />
        {research.length === 0 ? <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}><span style={{ fontSize: "3rem" }}>🔬</span><p style={{ marginTop: "1rem" }}>No research added yet. Add to portfolio-data.json.</p></div> :
          <div className="research-list">
            {research.map((paper: Research, i: number) => (
              <div key={paper.id} className="research-card glass-card-glow animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="research-status-row">
                  <span className={`research-status ${paper.status === "Published" ? "badge-emerald" : paper.status === "Under Review" ? "badge-violet" : "badge"}`}>
                    {paper.status === "Published" ? "📄" : paper.status === "Under Review" ? "⏳" : "🔬"}{" "}
                    {paper.status}
                  </span>
                </div>
                <h3 className="research-title">{paper.title}</h3>
                <p className="research-venue">{paper.publicationName}</p>
                <p className="research-abstract">{paper.abstract}</p>
                <div className="research-links">
                  {paper.doiLink && (
                    <a href={paper.doiLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.82rem" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      DOI / Reference
                    </a>
                  )}
                  {paper.pdfLink && (
                    <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.82rem" }}>📥 Download PDF</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <style jsx>{`
        .research-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .research-card { padding: 1.75rem; }
        .research-status-row { margin-bottom: 0.75rem; }
        .research-status { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3rem 0.8rem; font-size: 0.78rem; font-weight: 600; border-radius: var(--radius-full); background: var(--bg-glass-strong); border: 1px solid var(--border-color); }
        .research-title { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); line-height: 1.4; margin-bottom: 0.3rem; }
        .research-venue { font-size: 0.88rem; color: var(--cyan); font-weight: 500; font-style: italic; margin-bottom: 0.75rem; }
        .research-abstract { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem; }
        .research-links { display: flex; gap: 0.75rem; flex-wrap: wrap; }
      `}</style>
    </div>
  );
}
