"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { personalInfo } from "@/app/data";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent") === "true";
  const [redirectUrl, setRedirectUrl] = useState("/contact?sent=true");

  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/contact?sent=true`);
  }, []);
  return (
    <>
      {sent && (
        <div className="success-banner glass-card">
          <span className="success-icon">✓</span>
          <div>
            <h4 style={{ color: "var(--emerald)", marginBottom: "0.25rem" }}>Message Sent!</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Thank you for reaching out. I&apos;ll get back to you soon!
            </p>
          </div>
        </div>
      )}

      <form
        className="contact-form glass-card"
        action={`https://formsubmit.co/${personalInfo.email}`}
        method="POST"
      >
        {/* FormSubmit configuration */}
        <input type="hidden" name="_subject" value="New Portfolio Contact Message!" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={redirectUrl} />
        <input type="hidden" name="_template" value="table" />
        {/* Honeypot spam protection */}
        <input type="text" name="_honey" style={{ display: "none" }} />

        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="form-input"
            placeholder="you@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            className="form-input form-textarea"
            placeholder="Write your message here..."
            rows={5}
            required
          />
        </div>

        <button type="submit" className="btn-primary contact-submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          Send Message
        </button>

        <style jsx>{`
          .success-banner {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(16, 185, 129, 0.3);
            background: rgba(16, 185, 129, 0.05);
          }
          .success-icon {
            font-size: 1.5rem;
            color: var(--emerald);
            font-weight: bold;
            min-width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.15);
          }
          .contact-form {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .form-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .form-input {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            font-family: inherit;
            color: var(--text-primary);
            background: var(--bg-glass);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            transition: all var(--transition-fast);
            outline: none;
          }
          .form-input:focus {
            border-color: var(--cyan);
            box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
          }
          .form-input::placeholder {
            color: var(--text-muted);
          }
          .form-textarea {
            resize: vertical;
            min-height: 120px;
          }
          .contact-submit {
            align-self: flex-start;
            margin-top: 0.5rem;
          }
        `}</style>
      </form>
    </>
  );
}
