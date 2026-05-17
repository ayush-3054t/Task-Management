/* Inline SVG — no external image needed */
export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 520 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background card shadow */}
      <rect x="60" y="60" width="400" height="280" rx="20" fill="#EEF2FF" />

      {/* Main board card */}
      <rect x="50" y="50" width="400" height="280" rx="20" fill="white"
        stroke="#E0E7FF" strokeWidth="1.5" />

      {/* Header bar */}
      <rect x="50" y="50" width="400" height="52" rx="20" fill="#6366F1" />
      <rect x="50" y="82" width="400" height="20" fill="#6366F1" />
      {/* Dots */}
      <circle cx="80" cy="76" r="6" fill="white" fillOpacity=".4" />
      <circle cx="100" cy="76" r="6" fill="white" fillOpacity=".4" />
      <circle cx="120" cy="76" r="6" fill="white" fillOpacity=".4" />
      {/* Title text placeholder */}
      <rect x="150" y="70" width="120" height="12" rx="6" fill="white" fillOpacity=".5" />

      {/* Column 1 — To Do */}
      <rect x="70" y="120" width="100" height="14" rx="7" fill="#E0E7FF" />
      <rect x="70" y="145" width="100" height="70" rx="10" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
      <rect x="82" y="157" width="60" height="8" rx="4" fill="#8B5CF6" fillOpacity=".7" />
      <rect x="82" y="171" width="76" height="6" rx="3" fill="#C4B5FD" />
      <rect x="82" y="183" width="50" height="6" rx="3" fill="#C4B5FD" />
      <rect x="82" y="198" width="30" height="10" rx="5" fill="#EDE9FE" />
      <rect x="116" y="198" width="30" height="10" rx="5" fill="#DDD6FE" />

      <rect x="70" y="225" width="100" height="60" rx="10" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
      <rect x="82" y="237" width="50" height="8" rx="4" fill="#8B5CF6" fillOpacity=".7" />
      <rect x="82" y="251" width="76" height="6" rx="3" fill="#C4B5FD" />
      <rect x="82" y="263" width="40" height="10" rx="5" fill="#EDE9FE" />

      {/* Column 2 — In Progress */}
      <rect x="200" y="120" width="120" height="14" rx="7" fill="#DBEAFE" />
      <rect x="200" y="145" width="120" height="80" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
      <rect x="212" y="157" width="70" height="8" rx="4" fill="#3B82F6" fillOpacity=".8" />
      <rect x="212" y="171" width="96" height="6" rx="3" fill="#93C5FD" />
      <rect x="212" y="183" width="70" height="6" rx="3" fill="#93C5FD" />
      {/* Progress bar */}
      <rect x="212" y="196" width="96" height="6" rx="3" fill="#DBEAFE" />
      <rect x="212" y="196" width="65" height="6" rx="3" fill="#3B82F6" className="fill-bar" />
      <rect x="212" y="208" width="40" height="10" rx="5" fill="#DBEAFE" />

      <rect x="200" y="235" width="120" height="50" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
      <rect x="212" y="247" width="60" height="8" rx="4" fill="#3B82F6" fillOpacity=".8" />
      <rect x="212" y="261" width="96" height="6" rx="3" fill="#93C5FD" />
      <rect x="212" y="273" width="40" height="10" rx="5" fill="#DBEAFE" />

      {/* Column 3 — Done */}
      <rect x="350" y="120" width="90" height="14" rx="7" fill="#D1FAE5" />
      <rect x="350" y="145" width="90" height="65" rx="10" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
      {/* Checkmark circle */}
      <circle cx="366" cy="165" r="10" fill="#10B981" />
      <path d="M361 165l3.5 3.5 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="382" y="160" width="46" height="8" rx="4" fill="#6EE7B7" />
      <rect x="362" y="181" width="66" height="6" rx="3" fill="#A7F3D0" />
      <rect x="362" y="193" width="40" height="10" rx="5" fill="#D1FAE5" />

      <rect x="350" y="220" width="90" height="65" rx="10" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
      <circle cx="366" cy="240" r="10" fill="#10B981" />
      <path d="M361 240l3.5 3.5 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="382" y="235" width="46" height="8" rx="4" fill="#6EE7B7" />
      <rect x="362" y="256" width="66" height="6" rx="3" fill="#A7F3D0" />
      <rect x="362" y="268" width="40" height="10" rx="5" fill="#D1FAE5" />

      {/* Floating notification badge */}
      <rect x="370" y="30" width="110" height="36" rx="18" fill="white"
        stroke="#E0E7FF" strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(99,102,241,.15))' }} />
      <circle cx="390" cy="48" r="8" fill="#6366F1" />
      <path d="M387 48l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="403" y="42" width="50" height="6" rx="3" fill="#C7D2FE" />
      <rect x="403" y="52" width="35" height="5" rx="2.5" fill="#E0E7FF" />

      {/* Floating avatar group */}
      <circle cx="100" cy="355" r="18" fill="#6366F1" />
      <text x="100" y="360" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">A</text>
      <circle cx="128" cy="355" r="18" fill="#3B82F6" />
      <text x="128" y="360" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">B</text>
      <circle cx="156" cy="355" r="18" fill="#8B5CF6" />
      <text x="156" y="360" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">C</text>
      <rect x="178" y="340" width="60" height="30" rx="15" fill="#F3F4F6" />
      <text x="208" y="360" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="500">+12</text>
    </svg>
  );
}
