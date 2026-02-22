"use client";

import SectionHeading from "@/app/components/SectionHeading";
import portfolioData from "@/app/data/portfolio-data.json";

interface Achievement { id: string; title: string; description: string; type: "Competition" | "Hackathon" | "Award" | "Certification"; date: string; link: string; }

export default function AchievementsPage() {
  const achievements: Achievement[] = portfolioData.achievements.map((a, i) => ({
    id: a.id || `ach-${i}`,
    title: a.title,
    description: a.description || "",
    type: a.type as "Competition" | "Hackathon" | "Award" | "Certification",
    date: a.date || "",
    link: a.link || "",
  }));

  const typeIcons: Record<string, string> = { Competition: "🏅", Hackathon: "💻", Award: "🏆", Certification: "📜" };
  const typeColors: Record<string, string> = { Competition: "badge", Hackathon: "badge badge-violet", Award: "badge badge-pink", Certification: "badge badge-emerald" };

  return (
    <div className="section">
      <div className="section-glow section-glow-cyan" style={{ top: "20%", right: "-10%" }} />
      <div className="container" style={{ maxWidth: "900px" }}>
        <SectionHeading title="Achievements" subtitle="Competitions, hackathons, and certifications" />
        {achievements.length === 0 ? <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}><span style={{ fontSize: "3rem" }}>🏆</span><p style={{ marginTop: "1rem" }}>No achievements added yet. Add to portfolio-data.json.</p></div> :
          <div className="achievements-grid">
            {achievements.map((achievement: Achievement, i: number) => (
              <div key={achievement.id} className="achievement-card glass-card-glow animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="achievement-header">
                  <span className="achievement-icon">{typeIcons[achievement.type] || "🏆"}</span>
                  <span className={typeColors[achievement.type] || "badge"}>{achievement.type}</span>
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-desc">{achievement.description}</p>
                <div className="achievement-footer">
                  {achievement.date && <span className="achievement-date">📅 {achievement.date}</span>}
                  {achievement.link && <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="achievement-link">View Certificate →</a>}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <style jsx>{`
        .achievements-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .achievement-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .achievement-header { display: flex; align-items: center; gap: 0.75rem; }
        .achievement-icon { font-size: 1.75rem; }
        .achievement-title { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
        .achievement-desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; }
        .achievement-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-color); }
        .achievement-date { font-size: 0.82rem; color: var(--text-muted); }
        .achievement-link { font-size: 0.82rem; font-weight: 600; color: var(--cyan); text-decoration: none; transition: opacity var(--transition-fast); }
        .achievement-link:hover { opacity: 0.8; }
        @media (max-width: 640px) { .achievements-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
