type NodePanelProps = {
  label: string;
  onClose: () => void;
};

export function NodePanel({ label, onClose }: NodePanelProps) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
      <div
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 340, height: '100vh',
          background: 'linear-gradient(160deg, #ffffff, #f8fafc)',
          borderLeft: '1px solid #e2e8f0',
          boxShadow: '-8px 0 32px rgba(37,99,235,0.08)',
          zIndex: 20, display: 'flex', flexDirection: 'column',
          animation: 'slideIn 0.25s ease',
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '20px 24px', background: '#2563eb',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: '#ffffff', fontSize: 16, fontWeight: 700 }}>{label}</span>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: '#ffffff', fontSize: 16, cursor: 'pointer',
              padding: '4px 8px', borderRadius: 6,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <div style={{
            background: '#ffffff', border: '1.5px dashed #bfdbfe',
            borderRadius: 10, padding: '28px 20px', textAlign: 'center', lineHeight: 1.7,
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📦</div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Content for</div>
            <div style={{ color: '#1e3a8a', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{label}</div>
            <div style={{
              display: 'inline-block', background: '#eff6ff',
              border: '1px solid #bfdbfe', borderRadius: 20,
              padding: '3px 12px', color: '#2563eb', fontSize: 11, fontWeight: 600,
            }}>Coming from backend</div>
          </div>
        </div>
      </div>
    </>
  );
}