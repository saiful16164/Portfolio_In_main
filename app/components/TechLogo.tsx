import React from "react";

interface TechLogoProps {
  name: string;
  size?: number;
}

export default function TechLogo({ name, size = 38 }: TechLogoProps) {
  const normName = name.toLowerCase().trim();

  // Flutter
  if (normName.includes("flutter")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M14.314 0L2.3 12 6.071 15.771 21.856 0h-7.542z" fill="#02569B" />
        <path d="M14.286 9.686L8.4 15.571l3.771 3.772 5.886-5.886h5.829l-9.6-9.771z" fill="#0175C2" />
        <path d="M8.4 15.571l3.771 3.772-3.771 3.771-3.771-3.771L8.4 15.571z" fill="#29B6F6" />
        <path d="M12.171 19.343l2.143 2.143h5.857l-4.229-4.286-3.771 2.143z" fill="#02569B" />
      </svg>
    );
  }

  // Dart
  if (normName.includes("dart")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4.102 4.102H15.68L19.898 8.32V19.898H8.32L4.102 15.68V4.102Z" fill="#0081C6" />
        <path d="M8.32 4.102L4.102 8.32V19.898L15.68 19.898L19.898 15.68V8.32L15.68 4.102H8.32Z" fill="#00B4AB" opacity="0.8" />
        <path d="M4.102 4.102L19.898 19.898V15.68L8.32 4.102H4.102Z" fill="#01579B" />
        <path d="M10.2 6.5L6.5 10.2V17.5L17.5 6.5H10.2Z" fill="#29B6F6" />
      </svg>
    );
  }

  // Kotlin
  if (normName.includes("kotlin")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="kotlin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C757BC" />
            <stop offset="50%" stopColor="#7F52FF" />
            <stop offset="100%" stopColor="#00AFFF" />
          </linearGradient>
        </defs>
        <path d="M24 24H0V0h24L12 12Z" fill="url(#kotlin-grad)" />
      </svg>
    );
  }

  // Python
  if (normName.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.914 0C5.786 0 6.18 2.66 6.18 2.66l.007 2.76h5.817v.825H3.84S0 5.79 0 11.956c0 6.167 3.348 5.95 3.348 5.95h2v-2.812s-.11-3.348 3.284-3.348h5.637s3.176.05 3.176-3.07V3.07S17.904 0 11.914 0zm-3.2 1.838a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16z"
          fill="#3776AB"
        />
        <path
          d="M12.086 24c6.128 0 5.734-2.66 5.734-2.66l-.007-2.76h-5.817v-.825h8.164s3.84.455 3.84-5.711c0-6.167-3.348-5.95-3.348-5.95h-2v2.812s.11 3.348-3.284 3.348H9.728s-3.176-.05-3.176 3.07v5.609S6.096 24 12.086 24zm3.2-1.838a1.08 1.08 0 1 1 0-2.16 1.08 1.08 0 0 1 0 2.16z"
          fill="#FFD438"
        />
      </svg>
    );
  }

  // TypeScript
  if (normName.includes("typescript") || normName === "ts") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 13.5H9v6H7v-6H4.5v-2H11.5v2z" fill="#ffffff" />
        <path d="M19.5 14.2c0-.9-.6-1.5-1.7-1.8l-1.3-.3c-.6-.1-.9-.4-.9-.7 0-.4.3-.6.9-.6.7 0 1.3.3 1.7.7l1.1-1.3c-.7-.7-1.7-1-2.8-1-1.8 0-3 1-3 2.5 0 1 .6 1.6 1.8 1.9l1.2.3c.7.2.9.4.9.8 0 .4-.4.7-1.1.7-.8 0-1.6-.4-2-1l-1.2 1.3c.7.9 1.9 1.4 3.2 1.4 2 0 3.3-1.1 3.3-2.9z" fill="#ffffff" />
      </svg>
    );
  }

  // C / C++
  if (normName.includes("c++") || normName.includes("c/c++") || normName === "c") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 0L22.392 6v12L12 24 1.608 18V6L12 0z" fill="#00599C" />
        <path d="M12 2.309L20.392 7.155v9.69L12 21.691 3.608 16.845V7.155L12 2.309z" fill="#004482" />
        <path d="M12 6.5a5.5 5.5 0 1 0 3.89 9.39l-1.42-1.42A3.5 3.5 0 1 1 12 8.5c.96 0 1.83.39 2.47 1.03l1.42-1.42A5.48 5.48 0 0 0 12 6.5zm4.5 4v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1zm4 0v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1z" fill="#ffffff" />
      </svg>
    );
  }

  // React
  if (normName.includes("react")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // Next.js
  if (normName.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <path d="M15.5 7.5v9h-1.8V9.8l-5.4 6.7H6.5v-9h1.8v6.7l5.4-6.7h1.8z" fill="#ffffff" />
      </svg>
    );
  }

  // Supabase
  if (normName.includes("supabase")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M13.4 23.3c-.6.8-1.9.4-1.9-.6v-8.2h8.3c1 0 1.6 1.2.9 2l-7.3 6.8z"
          fill="#3ECF8E"
        />
        <path
          d="M10.6.7c.6-.8 1.9-.4 1.9.6v8.2H4.2c-1 0-1.6-1.2-.9-2L10.6.7z"
          fill="#3ECF8E"
        />
      </svg>
    );
  }

  // Firebase
  if (normName.includes("firebase")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4.3 18.2l7.7-14.4c.3-.5 1-.4 1.2.1l2.4 4.8L4.3 18.2z" fill="#FFA000" />
        <path d="M18.7 18.2L15.6 8.7l-9.8 9.5 5.5 3.1c.4.2.9.2 1.3 0l6.1-3.1z" fill="#FFCA28" />
        <path d="M4.3 18.2L8.2 2.6c.2-.6 1-.7 1.3-.2l2.5 4.6-7.7 11.2z" fill="#F57C00" />
      </svg>
    );
  }

  // SQL
  if (normName === "sql" || normName.includes("structured query")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8.5" ry="3" fill="#00758F" opacity="0.3" stroke="#00758F" strokeWidth="1.4" />
        <path d="M3.5 5v5.5c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3V5" stroke="#00758F" strokeWidth="1.4" fill="none" />
        <path d="M3.5 10.5v5.5c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3v-5.5" stroke="#00758F" strokeWidth="1.4" fill="none" />
        <rect x="6.5" y="10" width="11" height="8.5" rx="3" fill="#0B1D15" stroke="#C5A059" strokeWidth="1.2" />
        <text x="12" y="16.2" fontSize="5.2" fontWeight="bold" fill="#C5A059" textAnchor="middle" fontFamily="monospace">SQL</text>
      </svg>
    );
  }

  // PyTorch
  if (normName.includes("pytorch")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M13.62 1.35a.8.8 0 0 0-1.04.28l-1.9 3.29a.8.8 0 0 0 .28 1.04l.43.25a.8.8 0 0 0 1.04-.28l1.9-3.29a.8.8 0 0 0-.28-1.04l-.43-.25zM12 4.4a8.1 8.1 0 1 0 7.82 10.2.8.8 0 0 0-.62-.97.8.8 0 0 0-.96.61A6.5 6.5 0 1 1 12 5.99c.92 0 1.8.19 2.6.54l1.35-2.33A8.1 8.1 0 0 0 12 4.4z"
          fill="#EE4C2C"
        />
        <circle cx="18.5" cy="5.5" r="1.5" fill="#EE4C2C" />
      </svg>
    );
  }

  // Data Science
  if (normName.includes("data science") || normName.includes("datascience")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#6F887B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 8l-5 6-4-4-3 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="14" r="2" fill="#10B981" />
        <circle cx="10" cy="10" r="2" fill="#C5A059" />
        <circle cx="14" cy="14" r="2" fill="#10B981" />
        <circle cx="19" cy="8" r="2.2" fill="#6EE7B7" />
        <circle cx="16.5" cy="5" r="1.4" fill="#C5A059" opacity="0.85" />
        <circle cx="12" cy="18" r="1.4" fill="#10B981" opacity="0.6" />
      </svg>
    );
  }

  // PostgreSQL / Database
  if (normName.includes("postgres") || normName.includes("dbms")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C7 2 3 3.8 3 6v12c0 2.2 4 4 9 4s9-1.8 9-4V6c0-2.2-4-4-9-4z" fill="#336791" opacity="0.3" />
        <ellipse cx="12" cy="6" rx="9" ry="3.5" fill="#336791" />
        <path d="M3 6v6c0 2 4 3.5 9 3.5s9-1.5 9-3.5V6" stroke="#4169E1" strokeWidth="1.5" fill="none" />
        <path d="M3 12v6c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-6" stroke="#4169E1" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  // Android
  if (normName.includes("android")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M6 18c0 .55.45 1 1 1h1v3c0 .55.45 1 1 1s1-.45 1-1v-3h4v3c0 .55.45 1 1 1s1-.45 1-1v-3h1c.55 0 1-.45 1-1V9H6v9zm-3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zm18 0c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zM7 7.5h10c0-2.76-2.24-5-5-5s-5 2.24-5 5zm2.5-2.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zm5 0c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z" fill="#3DDC84" />
      </svg>
    );
  }

  // Git & GitHub
  if (normName.includes("git")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M23.546 10.93L13.067.452a1.499 1.499 0 0 0-2.124 0L8.85 2.544l2.678 2.679a1.777 1.777 0 0 1 2.246 2.261l2.576 2.576a1.777 1.777 0 0 1 1.705 2.87l-2.87-1.705v-5.26a1.776 1.776 0 0 1-1.077-.423L11.53 8.12v8.118a1.776 1.776 0 1 1-1.778 1.778V8.92a1.775 1.775 0 0 1-.954-2.316L6.155 3.962.454 9.664a1.5 1.5 0 0 0 0 2.124l10.48 10.48c.586.586 1.537.586 2.124 0l10.488-10.489a1.503 1.503 0 0 0 0-2.125l.001-.724z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // VS Code
  if (normName.includes("vs code") || normName.includes("vscode")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M17.5 1.5L8.5 8.2 3.8 4.6 1.5 5.8v12.4l2.3 1.2 4.7-3.6 9 6.7 4.5-2.2V3.7L17.5 1.5zM18 17.6L11.2 12 18 6.4v11.2z" fill="#007ACC" />
      </svg>
    );
  }

  // Generic fallback logo
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
