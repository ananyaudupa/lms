import { useEffect, useState } from 'react';

type ToastProps = {
  nodeLabel: string;
  x: number;
  y: number;
  onDone: () => void;
};

export function Toast({ nodeLabel, x, y, onDone }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const fade = setTimeout(() => setVisible(false), 4000);
    const done = setTimeout(onDone, 5000);
    return () => { clearTimeout(fade); clearTimeout(done); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed',
      // On mobile: center bottom; on desktop: bottom-right
      bottom: isMobile ? 80 : 32,
      right: isMobile ? undefined : 32,
      left: isMobile ? '50%' : undefined,
      transform: isMobile
        ? (visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(12px)')
        : (visible ? 'translateY(0)' : 'translateY(12px)'),
      zIndex: 100,
      background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
      border: '1px solid #e2e8f0',
      borderLeft: '3px solid #2563eb',
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(37,99,235,0.12)',
      minWidth: isMobile ? 200 : 220,
      maxWidth: isMobile ? 'calc(100vw - 48px)' : 260,
      pointerEvents: 'none',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', boxShadow: '0 0 6px rgba(37,99,235,0.5)', flexShrink: 0 }} />
        <span style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Node Moved</span>
      </div>
      <div style={{ color: '#1e3a8a', fontSize: 13, fontWeight: 600, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {nodeLabel}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ label: 'x', val: x }, { label: 'y', val: y }].map(({ label: l, val }) => (
          <div key={l} style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: 6, padding: '4px 10px',
            fontSize: 12, fontFamily: 'monospace', color: '#2563eb',
          }}>{l}: {Math.round(val)}</div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 2,
        borderRadius: '0 0 10px 10px', background: '#2563eb',
        width: visible ? '0%' : '100%',
        transition: 'width 4s linear', opacity: 0.4,
      }} />
    </div>
  );
}