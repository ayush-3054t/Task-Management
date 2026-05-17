export default function AuthIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="160" cy="140" r="110" fill="#EEF2FF" />
      {/* Shield */}
      <path
        d="M160 50 L220 75 L220 130 C220 165 190 190 160 200 C130 190 100 165 100 130 L100 75 Z"
        fill="#6366F1"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(99,102,241,.3))' }}
      />
      <path
        d="M160 65 L210 87 L210 130 C210 158 185 180 160 188 C135 180 110 158 110 130 L110 87 Z"
        fill="#818CF8"
      />
      {/* Lock body */}
      <rect x="140" y="120" width="40" height="32" rx="6" fill="white" />
      {/* Lock shackle */}
      <path d="M148 120 L148 112 C148 104 172 104 172 112 L172 120" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="160" cy="133" r="5" fill="#6366F1" />
      <rect x="157" y="136" width="6" height="8" rx="2" fill="#6366F1" />

      {/* Floating task cards */}
      <rect x="20" y="80" width="70" height="44" rx="10" fill="white" stroke="#E0E7FF" strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.06))' }} />
      <rect x="30" y="92" width="40" height="6" rx="3" fill="#C7D2FE" />
      <rect x="30" y="104" width="50" height="6" rx="3" fill="#E0E7FF" />
      <circle cx="30" cy="92" r="0" />

      <rect x="230" y="100" width="70" height="44" rx="10" fill="white" stroke="#E0E7FF" strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.06))' }} />
      <rect x="240" y="112" width="40" height="6" rx="3" fill="#A7F3D0" />
      <rect x="240" y="124" width="50" height="6" rx="3" fill="#D1FAE5" />

      <rect x="30" y="170" width="70" height="44" rx="10" fill="white" stroke="#E0E7FF" strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.06))' }} />
      <rect x="40" y="182" width="40" height="6" rx="3" fill="#FDE68A" />
      <rect x="40" y="194" width="50" height="6" rx="3" fill="#FEF3C7" />

      {/* Checkmark badge */}
      <circle cx="220" cy="185" r="22" fill="#10B981"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(16,185,129,.3))' }} />
      <path d="M211 185l5.5 5.5 11-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
