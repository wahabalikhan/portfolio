'use client';

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
    <svg width={S} height={S} viewBox="0 0 512 509.64" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
      <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
      <path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/>
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

function CloudflareIcon() {
  return (
    <div style={{ width: S, height: S, borderRadius: 3, overflow: 'hidden', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#F6821F' }}>
      <svg width="12" height="10" viewBox="0 0 52 36" fill="none">
        <path d="M40.9 15.7C40.7 15.7 40.5 15.7 40.3 15.7C39.8 11.9 36.6 9 32.7 9C31.2 9 29.8 9.4 28.6 10.2C26.5 6.7 22.7 4.5 18.4 4.5C11.6 4.5 6 10.1 6 16.9C6 17.4 6 17.9 6.1 18.4C2.6 19.3 0 22.4 0 26.1C0 30.5 3.6 34.1 8 34.1H40.9C45.3 34.1 48.9 30.5 48.9 26.1C48.9 21.6 45.3 15.7 40.9 15.7Z" fill="white"/>
      </svg>
    </div>
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
  { id: 'cloudflare', label: 'Cloudflare Pages', render: () => <CloudflareIcon /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8 footer-fade-in">
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
          <b><span className="linkedin-label">LinkedIn </span>↗</b>
        </a>
      </div>
    </footer>
  );
}
