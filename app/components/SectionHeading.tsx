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
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-underline">
        <span className="underline-dot" />
      </div>

      <style jsx>{`
        .section-heading {
          margin-bottom: 3.5rem;
        }
        .section-heading-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-title {
          font-family: var(--font-playfair, var(--font-heading));
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--text-primary);
        }
        .section-subtitle {
          margin-top: 0.85rem;
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 550px;
          line-height: 1.7;
        }
        .section-underline {
          margin-top: 1.25rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .section-underline::before,
        .section-underline::after {
          content: "";
          width: 28px;
          height: 1.5px;
          background: var(--accent);
          border-radius: 2px;
          opacity: 0.5;
        }
        .underline-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
        @media (max-width: 640px) {
          .section-title {
            font-size: 1.9rem;
          }
        }
      `}</style>
    </div>
  );
}
