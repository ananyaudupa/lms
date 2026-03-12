import { useState, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BoltIcon from '@mui/icons-material/Bolt';
import ArticleIcon from '@mui/icons-material/Article';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { NodeContent } from '../data/node.data';

type Status = 'Pending' | 'Mark As Done' | 'In Progress';

const statusColors: Record<Status, string> = {
  'Pending':      '#64748b',
  'Mark As Done': '#16a34a',
  'In Progress':  '#d97706',
};
const statusDots: Record<Status, string> = {
  'Pending':      '#94a3b8',
  'Mark As Done': '#22c55e',
  'In Progress':  '#f59e0b',
};

type NodePanelProps = {
  label: string;
  content: NodeContent;
  onClose: () => void;
};

export function NodePanel({ label, content, onClose }: NodePanelProps) {
  const [status, setStatus]         = useState<Status>('Pending');
  const [dropdownOpen, setDropdown] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when panel is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isMobile]);

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '85vh',
        borderRadius: '20px 20px 0 0',
        borderLeft: 'none',
        borderTop: '1px solid #e2e8f0',
        top: 'auto',
      }
    : {
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'min(420px, 100vw)',
        height: '100vh',
        borderLeft: '1px solid #e2e8f0',
      };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 10, background: isMobile ? 'rgba(0,0,0,0.3)' : 'transparent' }} />
      <div style={{
        background: '#ffffff',
        boxShadow: isMobile
          ? '0 -8px 32px rgba(37,99,235,0.12)'
          : '-8px 0 32px rgba(37,99,235,0.10)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        animation: isMobile ? 'slideUp 0.25s ease' : 'slideIn 0.25s ease',
        fontFamily: 'inherit',
        ...panelStyle,
      }}>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          .chapter-row:hover  { background: #eff6ff !important; }
          .resource-row:hover { background: #f8fafc !important; }
          .np-status-btn { font-size: 13px !important; }
          @media (max-width: 400px) {
            .np-status-btn { font-size: 11px !important; padding: 5px 8px !important; }
            .np-resources-badge { padding: 5px 10px !important; }
            .np-resources-badge span { font-size: 12px !important; }
          }
        `}</style>

        {/* Mobile drag handle */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#cbd5e1' }} />
          </div>
        )}

        {/* Top bar */}
        <div style={{
          padding: isMobile ? '10px 16px' : '14px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #e2e8f0',
          gap: 8,
          flexWrap: 'nowrap',
          minHeight: 0,
        }}>
          {/* Resources badge */}
          <div className="np-resources-badge" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#0165f9', borderRadius: 20,
            padding: '6px 14px', flexShrink: 0,
          }}>
            <LanguageIcon sx={{ fontSize: 15, color: '#fff' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>Resources</span>
          </div>

          {/* Status + Close */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Status dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="np-status-btn"
                onClick={() => setDropdown(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  background: '#fff', padding: '6px 10px',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  color: statusColors[status], whiteSpace: 'nowrap',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusDots[status], display: 'inline-block', flexShrink: 0 }} />
                <span style={{ display: isMobile && window.innerWidth < 380 ? 'none' : 'inline' }}>{status}</span>
                <KeyboardArrowDownIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, zIndex: 100,
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  minWidth: 160, overflow: 'hidden',
                }}>
                  {(['Pending', 'Mark As Done', 'In Progress'] as Status[]).map(s => (
                    <div key={s} onClick={() => { setStatus(s); setDropdown(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', cursor: 'pointer', fontSize: 13,
                        fontWeight: 600, color: statusColors[s],
                        background: status === s ? '#f1f5f9' : '#fff',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                      onMouseLeave={e => (e.currentTarget.style.background = status === s ? '#f1f5f9' : '#fff')}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusDots[s], display: 'inline-block' }} />
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Close */}
            <button onClick={onClose} style={{
              background: '#f1f5f9', border: 'none', borderRadius: 8,
              width: 32, height: 32, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b', flexShrink: 0,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f1f5f9')}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px 16px 40px' : '20px 20px 32px' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#1e3a8a' }}>
            {label}
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: 13.5, color: '#475569', lineHeight: 1.75 }}>
            {content.description}
          </p>

          {/* Topic Units */}
          <div style={{ marginBottom: 28 }}>
            <SectionDivider icon={<MenuBookIcon sx={{ fontSize: 15, color: '#1e3a8a' }} />} title="Topic Units" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {content.chapters.map((chapter, i) => (
                <div key={i} className="chapter-row" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                  transition: 'background 0.15s',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: '#0165f9', borderRadius: 20,
                    padding: '4px 10px', flexShrink: 0,
                  }}>
                    <AutoStoriesIcon sx={{ fontSize: 12, color: '#fff' }} />
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>
                      Chapter {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{chapter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Resources */}
          <div>
            <SectionDivider icon={<BoltIcon sx={{ fontSize: 15, color: '#1e3a8a' }} />} title="Recommended Resources" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {content.resources.map((r, i) => (
                <div key={i} className="resource-row" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                }}>
                  {r.type === 'article' ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: '#0165f9', borderRadius: 8,
                      padding: '5px 12px', flexShrink: 0,
                    }}>
                      <ArticleIcon sx={{ fontSize: 13, color: '#fff' }} />
                      <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Article</span>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: '#ef4444', borderRadius: 8,
                      padding: '5px 12px', flexShrink: 0,
                    }}>
                      <YouTubeIcon sx={{ fontSize: 14, color: '#fff' }} />
                      <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>Video</span>
                    </div>
                  )}
                  <span style={{
                    fontSize: 13, color: '#0165f9', fontWeight: 500,
                    textDecoration: 'underline', cursor: 'pointer',
                    wordBreak: 'break-word',
                  }}>{r.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionDivider({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        border: '1.5px solid #0165f9', borderRadius: 20,
        padding: '5px 14px', background: '#fff',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        {icon}
        <span style={{ fontWeight: 700, fontSize: 13, color: '#1e3a8a' }}>{title}</span>
      </div>
      <div style={{ flex: 1, height: 1.5, background: '#e2e8f0', marginLeft: 12 }} />
    </div>
  );
}