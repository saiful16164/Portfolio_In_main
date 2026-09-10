"use client";

import React, { useState, useEffect } from "react";
import { EventItem } from "@/app/data";

interface EventCardProps {
  event: EventItem;
  typeColors: Record<string, string>;
  autoSlideInterval?: number;
}

export default function EventCard({
  event,
  typeColors,
  autoSlideInterval = 3500,
}: EventCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = event.images || [];
  const hasImages = images.length > 0;

  // Auto-slide effect when there are multiple images
  useEffect(() => {
    if (!hasImages || images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [hasImages, images.length, isPaused, autoSlideInterval]);

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="event-stack-card glass-card animate-fade-in-up">
      {/* Left Column: Image Slider / Visual Showcase */}
      <div className="event-visual-col">
        {hasImages ? (
          <div
            className="event-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <img
              key={currentIdx}
              src={images[currentIdx]}
              alt={`${event.title} photo ${currentIdx + 1}`}
              className="event-slide-img"
            />

            {/* Slider Overlay Controls (shown only when multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="event-nav-btn event-prev"
                  aria-label="Previous photo"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="event-nav-btn event-next"
                  aria-label="Next photo"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter Pill */}
                <span className="event-counter-badge">
                  {currentIdx + 1} / {images.length}
                </span>

                {/* Dots */}
                <div className="event-dots-strip">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`event-dot ${currentIdx === idx ? "event-dot-active" : ""}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Elegant Placeholder when images are pending */
          <div className="event-placeholder-wrapper">
            <div className="placeholder-content">
              <div className="placeholder-icon-circle">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <span className="placeholder-label">Event Gallery</span>
              <span className="placeholder-hint">Photos will slide here</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Event Info & Specifications */}
      <div className="event-info-col">
        <div className="event-meta-header">
          <span className={typeColors[event.type] || "badge badge-emerald"}>{event.type}</span>
          {event.location && (
            <span className="event-location-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.location}</span>
            </span>
          )}
        </div>

        <h3 className="event-title">{event.title}</h3>

        {event.date && (
          <div className="event-date-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{event.date}</span>
          </div>
        )}

        <p className="event-description">{event.description}</p>

        {event.link && (
          <div className="event-action-row">
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="event-details-btn"
            >
              <span>Event Details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .event-stack-card {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.25fr);
          gap: 2rem;
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
          align-items: center;
        }

        .event-stack-card:hover {
          transform: translateY(-3px);
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), 0 0 25px rgba(16, 185, 129, 0.08);
        }

        /* Visual Showcase / Slider */
        .event-visual-col {
          width: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .event-slider-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #0d1410;
        }

        @keyframes slideFadeIn {
          from {
            opacity: 0.78;
          }
          to {
            opacity: 1;
          }
        }

        .event-slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: slideFadeIn 0.4s ease-out;
          transition: transform 0.4s ease;
        }

        .event-slider-wrapper:hover .event-slide-img {
          transform: scale(1.02);
        }

        .event-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 5;
        }

        .event-nav-btn:hover {
          background: var(--accent);
          color: #000;
          border-color: var(--accent);
          transform: translateY(-50%) scale(1.08);
        }

        .event-prev { left: 10px; }
        .event-next { right: 10px; }

        .event-counter-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(10, 18, 14, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34D399;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }

        .event-dots-strip {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
        }

        .event-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .event-dot-active {
          background: var(--accent);
          width: 18px;
          border-radius: 4px;
        }

        /* Placeholder */
        .event-placeholder-wrapper {
          width: 100%;
          aspect-ratio: 16 / 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 32, 26, 0.6) 100%);
        }

        .placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
        }

        .placeholder-icon-circle {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .placeholder-hint {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        /* Right Column Info */
        .event-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .event-meta-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .event-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .event-title {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .event-date-row {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.84rem;
          color: var(--accent);
          font-weight: 600;
        }

        .event-description {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .event-action-row {
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .event-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.15rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34D399;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .event-details-btn:hover {
          background: rgba(16, 185, 129, 0.22);
          border-color: #10B981;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
        }

        @media (max-width: 860px) {
          .event-stack-card {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.25rem;
          }

          .event-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .event-stack-card {
            padding: 1rem;
            gap: 1rem;
          }

          .event-title {
            font-size: 1.05rem;
          }

          .event-description {
            font-size: 0.85rem;
          }

          .event-date-row {
            font-size: 0.78rem;
          }

          .event-details-btn {
            padding: 0.45rem 0.9rem;
            font-size: 0.8rem;
          }

          .event-nav-btn {
            width: 28px;
            height: 28px;
          }

          .event-nav-btn svg {
            width: 14px;
            height: 14px;
          }

          .event-meta-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
