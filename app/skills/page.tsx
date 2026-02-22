"use client";

import SectionHeading from "@/app/components/SectionHeading";
import SkillBar from "@/app/components/SkillBar";
import portfolioData from "@/app/data/portfolio-data.json";

interface Skill { id: string; name: string; category: "Programming Languages" | "Technologies" | "Tools"; proficiency: number; }

export default function SkillsPage() {
    const skills: Skill[] = portfolioData.skills
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(s => ({
            id: s.id,
            name: s.name,
            category: s.category as "Programming Languages" | "Technologies" | "Tools",
            proficiency: s.proficiency,
        }));

    const categories = ["Programming Languages", "Technologies", "Tools"] as const;
    const categoryIcons: Record<string, string> = { "Programming Languages": "📝", Technologies: "⚙️", Tools: "🛠️" };
    const categoryGradients: Record<string, string> = { "Programming Languages": "var(--gradient-main)", Technologies: "var(--gradient-cyan-violet)", Tools: "var(--gradient-violet-pink)" };

    return (
        <div className="section">
            <div className="section-glow section-glow-pink" style={{ bottom: "10%", left: "-10%" }} />
            <div className="container" style={{ maxWidth: "900px" }}>
                <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />
                {skills.length === 0 ? <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}><span style={{ fontSize: "3rem" }}>🧠</span><p style={{ marginTop: "1rem" }}>No skills added yet. Add them in portfolio-data.json.</p></div> :
                    <div className="skills-categories">
                        {categories.map((category, catIdx) => {
                            const categorySkills = skills.filter((s: Skill) => s.category === category);
                            if (categorySkills.length === 0) return null;
                            return (
                                <div key={category} className="skill-category-section animate-fade-in-up" style={{ animationDelay: `${catIdx * 0.2}s` }}>
                                    <h3 className="category-title"><span>{categoryIcons[category]}</span><span className="gradient-text">{category}</span></h3>
                                    <div className="skill-bars-grid glass-card" style={{ padding: "1.5rem" }}>
                                        {categorySkills.map((skill: Skill) => (
                                            <SkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency} color={categoryGradients[category]} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
            <style jsx>{`
        .skills-categories { display: flex; flex-direction: column; gap: 2.5rem; }
        .category-title { display: flex; align-items: center; gap: 0.6rem; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
        .skill-bars-grid { display: flex; flex-direction: column; gap: 1.25rem; }
      `}</style>
        </div>
    );
}
