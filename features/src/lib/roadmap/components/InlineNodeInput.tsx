import { useState, useEffect, useRef } from 'react';

export type NewNodeType = 'root' | 'child';

type InlineNodeInputProps = {
  x: number;
  y: number;
  onConfirm: (label: string, nodeType: NewNodeType) => void;
  onCancel: () => void;
};

export function InlineNodeInput({ x, y, onConfirm, onCancel }: InlineNodeInputProps) {
  const [label, setLabel] = useState('');
  const [nodeType, setNodeType] = useState<NewNodeType>('root');
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && label.trim()) onConfirm(label.trim(), nodeType);
    if (e.key === 'Escape') onCancel();
  };

  // On mobile, center the input on screen instead of near the node
  const posStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
      }
    : {
        position: 'fixed',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      };

  return (
    <>
      {/* Backdrop on mobile */}
      {isMobile && (
        <div
          onClick={onCancel}
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(0,0,0,0.25)',
          }}
        />
      )}
      <div
        style={{
          ...posStyle,
          zIndex: 100,
          background: '#ffffff',
          border: '2px solid #2563eb',
          borderRadius: 12,
          padding: isMobile ? 20 : 16,
          boxShadow: '0 8px 24px rgba(37,99,235,0.15)',
          width: isMobile ? 'calc(100vw - 48px)' : 230,
          maxWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          animation: 'popIn 0.15s ease',
        }}
      >
        <style>{`
          @keyframes popIn {
            from { transform: translate(-50%, -50%) scale(0.85); opacity: 0; }
            to   { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
          }
        `}</style>

        <div style={{ color: '#1e3a8a', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Add Node
        </div>

        <input
          ref={inputRef}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Node label..."
          style={{
            background: '#f8fafc',
            border: '1.5px solid #bfdbfe',
            borderRadius: 8,
            padding: '8px 12px',
            color: '#1e3a8a',
            fontSize: 13,
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>Node Type</label>
          <select
            value={nodeType}
            onChange={e => setNodeType(e.target.value as NewNodeType)}
            style={{
              background: '#f8fafc',
              border: '1.5px solid #bfdbfe',
              borderRadius: 8,
              padding: '7px 10px',
              color: '#1e3a8a',
              fontSize: 13,
              outline: 'none',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <option value="root">🔵 Root — spine node</option>
            <option value="child">⚪ Child — side branch</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => label.trim() && onConfirm(label.trim(), nodeType)}
            style={{
              flex: 1, background: '#2563eb', border: 'none',
              borderRadius: 8, padding: '10px', color: '#ffffff',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Add
          </button>
          <button
            onClick={onCancel}
            style={{
              flex: 1, background: 'transparent',
              border: '1.5px solid #e2e8f0', borderRadius: 8,
              padding: '10px', color: '#64748b',
              fontSize: 13, cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
} 