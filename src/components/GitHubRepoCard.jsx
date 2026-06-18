import React from 'react';

const IC = 20;

const iconWrapStyle = {
  width: IC, height: IC,
  overflow: 'hidden',
  borderRadius: 3,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

// ── Footer icons (exact SVGs from Footer.js, resized to IC) ───────────────

function FigmaIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 38 57" fill="none">
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
    <svg width={IC} height={IC} viewBox="-11.5 -10.232 23 20.463" fill="none">
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
    <svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
      <path fill="#646CFF" d="M8.5 3L4 13.5H10L7 21.5 21 9H13.5L16.5 3z"/>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 109 113" fill="none">
      <path fill="#249361" d="M63.7 110.3C60.8 113.9 55.1 111.9 55 107.3L54 40H99.2C107.8 40 112.5 49.9 107.2 56.5L63.7 110.3z"/>
      <path fill="#3ECF8E" d="M45.3 2.1C48.2-1.5 53.9.4 54 5L54.5 72.3H9.8C1.3 72.3-3.5 62.4 1.8 55.8L45.3 2.1z"/>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 512 509.64" fill="none" shapeRendering="geometricPrecision">
      <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
      <path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/>
    </svg>
  );
}

function VSCodeIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
      <path fill="#007ACC" d="M17.484.58l-9.068 8.27-4.26-3.24L2 6.765v10.47l2.156 1.155 4.26-3.24 9.068 8.27L21 21.747V2.253L17.484.58zM17 15.56L10.906 12 17 8.44v7.12z"/>
    </svg>
  );
}

// ── New icons ─────────────────────────────────────────────────────────────

function GitIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 24 24" fill="#F05032">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 11-1.101 1.03l-2.48-2.48v6.511a1.84 1.84 0 11-1.51-.012V9.303a1.839 1.839 0 01-.999-2.417L7.635 4.218.452 11.4a1.55 1.55 0 000 2.188l10.48 10.478a1.55 1.55 0 002.187 0l10.427-10.427a1.55 1.55 0 000-2.108"/>
    </svg>
  );
}

function GitHubCardIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 16 16" className="gh-tool-github">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg width={IC} height={IC} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path fill="#323330" d="M7 17c.4.8.9 1.4 2.1 1.4 1 0 1.6-.5 1.6-1.2 0-.9-.6-1.2-1.7-1.6l-.7-.3C6.6 14.6 5.5 13.7 5.5 11.8c0-1.8 1.3-3.1 3.3-3.1 1.4 0 2.4.5 3.1 1.8l-1.7 1.1c-.4-.6-.8-.9-1.4-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.7.3c2 .8 3.1 1.8 3.1 3.8 0 2.2-1.7 3.3-3.9 3.3-2.2 0-3.6-1-4.2-2.4L7 17zm6.1.3c.3.6.7 1.2 1.6 1.2.7 0 1.2-.3 1.2-1.5V9h2.1v8c0 2.5-1.5 3.7-3.6 3.7-1.9 0-3-1-3.6-2.1l2.3-1.3z"/>
    </svg>
  );
}

// Brand logos sourced from devicons CDN
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

function PHPIcon()           { return <img src={`${CDN}/php/php-original.svg`}                     width={IC} height={IC} alt="" style={{ display: 'block' }} />; }
function MySQLIcon()         { return <img src={`${CDN}/mysql/mysql-original.svg`}                 width={IC} height={IC} alt="" style={{ display: 'block' }} />; }
function XAMPPIcon()         { return <img src={`${CDN}/xampp/xampp-original.svg`}                 width={IC} height={IC} alt="" style={{ display: 'block' }} />; }
function JavaIcon()          { return <img src={`${CDN}/java/java-original.svg`}                   width={IC} height={IC} alt="" style={{ display: 'block' }} />; }
function IntelliJIcon()      { return <img src={`${CDN}/intellij/intellij-original.svg`}           width={IC} height={IC} alt="" style={{ display: 'block' }} />; }
function StackOverflowIcon() { return <img src={`${CDN}/stackoverflow/stackoverflow-original.svg`} width={IC} height={IC} alt="" style={{ display: 'block' }} />; }

// ── Icon registry ─────────────────────────────────────────────────────────

const TOOL_ICON_MAP = {
  figma:         { label: 'Figma',          Icon: FigmaIcon },
  react:         { label: 'React',          Icon: ReactIcon },
  vite:          { label: 'Vite',           Icon: ViteIcon },
  supabase:      { label: 'Supabase',       Icon: SupabaseIcon },
  claude:        { label: 'Claude',         Icon: ClaudeIcon },
  vscode:        { label: 'VS Code',        Icon: VSCodeIcon },
  git:           { label: 'Git',            Icon: GitIcon },
  github:        { label: 'GitHub',         Icon: GitHubCardIcon },
  javascript:    { label: 'JavaScript',     Icon: JavaScriptIcon },
  php:           { label: 'PHP',            Icon: PHPIcon },
  mysql:         { label: 'MySQL',          Icon: MySQLIcon },
  xampp:         { label: 'XAMPP',          Icon: XAMPPIcon },
  java:          { label: 'Java',           Icon: JavaIcon },
  intellij:      { label: 'IntelliJ',       Icon: IntelliJIcon },
  stackoverflow: { label: 'Stack Overflow', Icon: StackOverflowIcon },
};

// ── Shared helpers ────────────────────────────────────────────────────────

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Java:       '#b07219',
  PHP:        '#4F5D95',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  Ruby:       '#701516',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  'C#':       '#178600',
  'C++':      '#f34b7d',
  Swift:      '#fa7343',
  Kotlin:     '#A97BFF',
  Dart:       '#00B4AB',
};

// ── Component ─────────────────────────────────────────────────────────────

export default function GitHubRepoCard({ name, description, language, langColor: langColorProp, topics = [], updatedLabel, url }) {
  const langColor = langColorProp || LANGUAGE_COLORS[language] || '#8b949e';
  const updatedText = updatedLabel ? `Updated ${updatedLabel}` : '';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="gh-card">
      <div className="gh-card-top">
        <span className="gh-repo-name">{name}</span>
        <span className="gh-badge">Public</span>
      </div>

      {description && <p className="gh-description">{description}</p>}

      {topics.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {topics.map((key) => {
            const tool = TOOL_ICON_MAP[key];
            if (!tool) return null;
            const { label, Icon } = tool;
            return (
              <div key={key} className="ftip-wrap">
                <div style={iconWrapStyle}><Icon /></div>
                <div className="ftip">{label}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="gh-footer">
        {language && (
          <span className="gh-lang">
            <span className="gh-lang-dot" style={{ backgroundColor: langColor }} />
            {language}
          </span>
        )}
        {updatedText && <span className="gh-updated">{updatedText}</span>}
      </div>

      <div style={{ paddingTop: '0.25rem' }}>
        <span className="gh-view-link">View on GitHub ↗</span>
      </div>
    </a>
  );
}
