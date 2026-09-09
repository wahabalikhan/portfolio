'use client';

export const OVERLAY_BG_STYLE = {
  backgroundColor: '#F8FAFD',
  backgroundImage: 'radial-gradient(ellipse 50% 220px at 18% 80px, rgba(37, 99, 235, 0.50) 0%, transparent 100%)',
  backgroundSize: '100% 300px',
  backgroundRepeat: 'no-repeat',
};

const TOOL_ICONS = [
  { name: 'Figma',       src: '/images/icons/figma.png',       alt: 'Figma',       group: 'unstyled',  top: '7%',  left: '8%',  rotate: '-14deg', opacity: 0.17 },
  { name: 'React',       src: '/images/icons/react.svg',       alt: 'React',       group: 'container', top: '12%', left: '55%', rotate:  '11deg', opacity: 0.15 },
  { name: 'Slack',       src: '/images/icons/slack.svg',       alt: 'Slack',       group: 'unstyled',  top: '6%',  left: '38%', rotate:  '-7deg', opacity: 0.14 },
  { name: 'VSCode',      src: '/images/icons/vs-code.png',     alt: 'VS Code',     group: 'unstyled',  top: '15%', left: '78%', rotate:  '15deg', opacity: 0.16 },
  { name: 'GitHub',      src: '/images/icons/github.png',      alt: 'GitHub',      group: 'unstyled',  top: '8%',  left: '88%', rotate:  '-9deg', opacity: 0.18 },
  { name: 'Claude',      src: '/images/icons/claude.svg',      alt: 'Claude',      group: 'unstyled',  top: '28%', left: '5%',  rotate:   '8deg', opacity: 0.15 },
  { name: 'Git',         src: '/images/icons/git.png',         alt: 'Git',         group: 'unstyled',  top: '33%', left: '72%', rotate: '-12deg', opacity: 0.16 },
  { name: 'Jira',        src: '/images/icons/jira.webp',       alt: 'Jira',        group: 'unstyled',  top: '45%', left: '14%', rotate:  '14deg', opacity: 0.14 },
  { name: 'Supabase',    src: '/images/icons/supabase.jpeg',   alt: 'Supabase',    group: 'rounded',   top: '52%', left: '85%', rotate: '-10deg', opacity: 0.17 },
  { name: 'Notion',      src: '/images/icons/notion.png',      alt: 'Notion',      group: 'unstyled',  top: '40%', left: '48%', rotate: '-13deg', opacity: 0.15 },
  { name: 'Confluence',  src: '/images/icons/confluence.png',  alt: 'Confluence',  group: 'unstyled',  top: '62%', left: '7%',  rotate:   '9deg', opacity: 0.13 },
  { name: 'Miro',        src: '/images/icons/miro.png',        alt: 'Miro',        group: 'unstyled',  top: '58%', left: '65%', rotate:  '-8deg', opacity: 0.16 },
  { name: 'Pendo',       src: '/images/icons/pendo.avif',      alt: 'Pendo',       group: 'rounded',   top: '72%', left: '28%', rotate:  '11deg', opacity: 0.14 },
  { name: 'Cloudflare',  src: '/images/icons/cloudflare.png',  alt: 'Cloudflare',  group: 'rounded',   top: '78%', left: '78%', rotate:   '7deg', opacity: 0.17 },
  { name: 'UserTesting', src: '/images/icons/usertesting.png', alt: 'UserTesting', group: 'unstyled',  top: '85%', left: '10%', rotate: '-11deg', opacity: 0.15 },
  { name: 'Heap',        src: '/images/icons/heap.png',        alt: 'Heap',        group: 'container', top: '88%', left: '50%', rotate:  '13deg', opacity: 0.16 },
  { name: 'Zoom',        src: '/images/icons/zoom.svg',        alt: 'Zoom',        group: 'unstyled',  top: '82%', left: '88%', rotate:  '-9deg', opacity: 0.18 },
];

export function OverlayIcons({ visible = true }) {
  return (
    <>
      {TOOL_ICONS.map(({ name, src, alt, group, top, left, rotate, opacity }) => (
        <div
          key={name}
          style={{
            position: 'absolute',
            top,
            left,
            transform: `rotate(${rotate})`,
            opacity: visible ? opacity : 0,
            transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
            lineHeight: 0,
          }}
        >
          {group === 'container' ? (
            <div style={{ width: 56, height: 56, boxSizing: 'border-box', background: 'white', borderRadius: 10, border: '1px solid #e5e7eb', padding: 8 }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          ) : group === 'rounded' ? (
            <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden' }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          ) : (
            <div style={{ width: 56, height: 56 }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
