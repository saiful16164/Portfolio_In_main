"use client";

import { useEffect, useRef, useState } from "react";

export default function SkillBar({
  name,
  proficiency,
  color = "var(--accent)",
}: {
  name: string;
  proficiency: number;
  color?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar-wrapper" ref={barRef}>
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{proficiency}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${proficiency}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>

      <style jsx>{`
        .skill-bar-wrapper {
          width: 100%;
        }
        .skill-bar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .skill-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .skill-pct {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }
        .skill-bar-track {
          width: 100%;
          height: 6px;
          background: var(--bg-glass-strong);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 0 8px rgba(203, 180, 128, 0.15);
        }
      `}</style>
    </div>
  );
}
