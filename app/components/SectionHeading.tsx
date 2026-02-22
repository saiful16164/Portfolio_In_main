"use client";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      <h2 className="section-title">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-underline" />

      <style jsx>{`
        .section-heading {
          margin-bottom: 3rem;
        }
        .section-heading-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .section-subtitle {
          margin-top: 0.75rem;
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 550px;
          line-height: 1.6;
        }
        .section-underline {
          margin-top: 1rem;
          width: 60px;
          height: 3px;
          border-radius: 3px;
          background: var(--gradient-main);
        }
        @media (max-width: 640px) {
          .section-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}
