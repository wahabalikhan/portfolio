'use client';

import React from 'react';

const S = 16;

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

function VSCodeIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none">
      <path fill="#007ACC" d="M17.484.58l-9.068 8.27-4.26-3.24L2 6.765v10.47l2.156 1.155 4.26-3.24 9.068 8.27L21 21.747V2.253L17.484.58zM17 15.56L10.906 12 17 8.44v7.12z"/>
    </svg>
  );
}

const imgStyle = { display: 'block', width: '100%', height: '100%', objectFit: 'cover' };

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
  { id: 'me',         label: 'Me',                  render: () => <img src="/images/profile.png"          alt="Me"               style={imgStyle} /> },
  { id: 'figma',      label: 'Figma',                render: () => <img src="/images/icons/figma.png"      alt="Figma"            style={imgStyle} /> },
  { id: 'react',      label: 'React, Claude helped', render: () => <ReactIcon /> },
  { id: 'supabase',   label: 'Supabase',             render: () => <img src="/images/icons/supabase.jpeg"  alt="Supabase"         style={imgStyle} /> },
  { id: 'claude',     label: 'Claude',               render: () => <img src="/images/icons/claude.svg"     alt="Claude"           style={imgStyle} /> },
  { id: 'vscode',     label: 'VS Code',              render: () => <VSCodeIcon /> },
  { id: 'cloudflare', label: 'Cloudflare Pages',     render: () => <img src="/images/icons/cloudflare.png" alt="Cloudflare Pages" style={imgStyle} /> },
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
