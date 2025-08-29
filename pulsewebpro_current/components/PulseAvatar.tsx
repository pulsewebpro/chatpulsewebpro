export default function PulseAvatar({ size=48 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center border"
      style={{
        width: size, height: size,
        background: 'radial-gradient(60% 60% at 50% 40%, rgba(56,189,248,0.25), transparent)',
        borderColor: 'rgba(56,189,248,0.45)'
      }}
      title="Pulse"
      aria-label="Pulse avatar"
    >
      {/* Simple coffee-robot glyph */}
      <svg width={size*0.6} height={size*0.6} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="28" r="16" stroke="#38bdf8" strokeWidth="3"/>
        <rect x="18" y="38" width="28" height="12" rx="6" stroke="#38bdf8" strokeWidth="3"/>
        <path d="M44 42c4 0 6-2 6-6 0-2-2-4-4-4" stroke="#38bdf8" strokeWidth="3" fill="none"/>
        <path d="M24 22h16M26 26h12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
