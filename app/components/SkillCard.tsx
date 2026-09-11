"use client";

import React from "react";
import TechLogo from "./TechLogo";

interface SkillCardProps {
  name: string;
}

export default function SkillCard({ name }: SkillCardProps) {
  return (
    <div className="skill-card glass-card">
      <div className="skill-logo-wrap">
        <TechLogo name={name} size={40} />
      </div>
      <span className="skill-title">{name}</span>

      <style jsx>{`
        .skill-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          padding: 1.5rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(22, 44, 34, 0.45);
          border: 1px solid var(--border-color);
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
          cursor: default;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .skill-card:hover {
          transform: translateY(-4px);
          border-color: rgba(197, 160, 89, 0.45);
          background: rgba(26, 52, 40, 0.65);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, 0.12);
        }

        .skill-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: rgba(11, 29, 21, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .skill-card:hover .skill-logo-wrap {
          transform: scale(1.08);
          border-color: rgba(197, 160, 89, 0.35);
          box-shadow: 0 6px 18px rgba(197, 160, 89, 0.2);
        }

        .skill-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          transition: color var(--transition-fast);
        }

        .skill-card:hover .skill-title {
          color: var(--accent-light);
        }

        @media (max-width: 480px) {
          .skill-card {
            padding: 0.85rem 0.45rem;
            gap: 0.5rem;
            border-radius: var(--radius-sm);
          }

          .skill-logo-wrap {
            width: 42px;
            height: 42px;
            border-radius: 10px;
          }

          .skill-title {
            font-size: 0.76rem;
            line-height: 1.25;
            word-break: normal;
          }
        }
      `}</style>
    </div>
  );
}
