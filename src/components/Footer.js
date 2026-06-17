import React from 'react';

const S = 16;

function FigmaIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 38 57" fill="none">
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
      <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z"/>
      <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg width={S} height={S} viewBox="-11.5 -10.232 23 20.463" fill="none">
      <circle r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

function ViteIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none">
      <path fill="#646CFF" d="M8.5 3L4 13.5H10L7 21.5 21 9H13.5L16.5 3z"/>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 109 113" fill="none">
      <path fill="#249361" d="M63.7 110.3C60.8 113.9 55.1 111.9 55 107.3L54 40H99.2C107.8 40 112.5 49.9 107.2 56.5L63.7 110.3z"/>
      <path fill="#3ECF8E" d="M45.3 2.1C48.2-1.5 53.9.4 54 5L54.5 72.3H9.8C1.3 72.3-3.5 62.4 1.8 55.8L45.3 2.1z"/>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#CC4415"/>
      <path fill="white" d="M12 4.5L17.5 19.5H14.8L13.6 16H10.4L9.2 19.5H6.5L12 4.5zM12 9.2L11 13.5h2L12 9.2z"/>
    </svg>
  );
}

function VSCodeIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none">
      <path fill="#007ACC" d="M17.484.58l-9.068 8.27-4.26-3.24L2 6.765v10.47l2.156 1.155 4.26-3.24 9.068 8.27L21 21.747V2.253L17.484.58zM17 15.56L10.906 12 17 8.44v7.12z"/>
    </svg>
  );
}

const iconStyle = {
  width: S,
  height: S,
  borderRadius: 3,
  overflow: 'hidden',
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const STACK = [
  {
    id: 'me',
    label: 'Me',
    render: () => (
      <img
        src="/images/profile.png"
        alt="Me"
        style={{ display: 'block', objectFit: 'cover', width: '100%', height: '100%' }}
      />
    ),
  },
  { id: 'figma',    label: 'Figma',    render: () => <FigmaIcon /> },
  { id: 'react',    label: 'React, Claude helped',    render: () => <ReactIcon /> },
  { id: 'vite',     label: 'Vite, Claude helped',     render: () => <ViteIcon /> },
  { id: 'supabase', label: 'Supabase', render: () => <SupabaseIcon /> },
  { id: 'claude',   label: 'Claude',   render: () => <ClaudeIcon /> },
  { id: 'vscode',   label: 'VS Code',  render: () => <VSCodeIcon /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8" style={{ marginBottom: '3rem' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Made with 🫶🏼 using</span>
          <div className="flex items-center gap-1.5" style={{ overflow: 'visible' }}>
            {STACK.map(item => (
              <div key={item.id} className="ftip-wrap">
                <div style={iconStyle}>{item.render()}</div>
                <div className="ftip">{item.label}</div>
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">© 2026</span>
        </div>
        <a
          href="https://www.linkedin.com/in/wahabalikhan/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-text text-blue-600 inline-flex items-center gap-1.5"
        >
          <img src="/linkedin-icon.svg" alt="LinkedIn" width="16" height="16" />
          <b>LinkedIn ↗</b>
        </a>
      </div>
    </footer>
  );
}
