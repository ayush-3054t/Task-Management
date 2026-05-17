export default function EmptyIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Clipboard body */}
      <rect x="60" y="30" width="120" height="150" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      {/* Clip */}
      <rect x="95" y="22" width="50" height="20" rx="10" fill="#CBD5E1" />
      <rect x="100" y="26" width="40" height="12" rx="6" fill="#94A3B8" />
      {/* Lines */}
      <rect x="80" y="65" width="80" height="8" rx="4" fill="#E2E8F0" />
      <rect x="80" y="83" width="60" height="8" rx="4" fill="#E2E8F0" />
      <rect x="80" y="101" width="70" height="8" rx="4" fill="#E2E8F0" />
      <rect x="80" y="119" width="45" height="8" rx="4" fill="#E2E8F0" />
      {/* Big plus */}
      <circle cx="170" cy="150" r="28" fill="#6366F1" style={{ filter: 'drop-shadow(0 4px 12px rgba(99,102,241,.35))' }} />
      <path d="M170 138v24M158 150h24" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Stars */}
      <circle cx="55" cy="55" r="4" fill="#FCD34D" />
      <circle cx="185" cy="45" r="3" fill="#A5B4FC" />
      <circle cx="195" cy="130" r="5" fill="#FCA5A5" />
      <circle cx="45" cy="140" r="3" fill="#6EE7B7" />
    </svg>
  );
}
