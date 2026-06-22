'use client';

import React from 'react';

const TIMELINE = [
  {
    date: '15 June 2026',
    headline: 'Day one. Blank canvas.',
    body: `Started with Vite and React. The goal was to build something that actually reflected how I work now, not how I worked two years ago. The first version was exactly what you would expect from day one. White background, placeholder text, no personality. But the bones were right.\n\nDeployed to GoDaddy cPanel via FTP. Took about twenty minutes longer than it should have. Made a note to fix the deployment process later.`,
  },
  {
    date: '16 June 2026',
    headline: 'The comment system.',
    body: `The idea: make the portfolio feel like a live Figma canvas. Visitors drop comment pins anywhere on the page, see live cursors of other people browsing, leave notes that persist. Multiplayer by design, not as an afterthought.\n\nBuilt on Supabase with real-time presence. Session tokens so visitors can move and delete their own comments. Anonymous identities on arrival so the canvas feels alive even before anyone drops a comment.\n\nGetting it working took most of the day. Getting it working consistently across Chrome and Safari took significantly longer.`,
  },
  {
    date: '17 June 2026',
    headline: 'The positioning problem.',
    body: `Chrome and Safari measure the same element differently. That one sentence cost me most of a day.\n\nComment pins are positioned as percentages of a content container. The container width is the same in every browser. The left offset is not. Chrome said 150px. Safari said 201px. Fifty-one pixels of drift on every single pin.\n\nThe fix was to stop trusting getBoundingClientRect left and calculate it mathematically instead: window.innerWidth minus content width divided by two. Browser agnostic. Consistent everywhere.\n\nThen Safari broke position fixed by applying a CSS transform to a page ancestor. Then scrollHeight changed between tabs. Then floating point drift in the ResizeObserver triggered re-renders on every scroll event. Each one felt solved until the next surfaced.`,
  },
  {
    date: '18 June 2026',
    headline: 'Migration day.',
    body: `Two things broke the same day and both needed fixing properly rather than patched.\n\nSafari Reader Mode was stripping the portfolio styling for new visitors. The fix required migrating from Vite to Next.js 15 with static export. Not a small change but the right one.\n\nGoDaddy cPanel FTP deploys were unsustainable. Moved to Cloudflare Pages. Auto-deploys on every push to main now. Should have done this on day one.`,
  },
  {
    date: '19 June 2026',
    headline: 'Polish and copy.',
    body: `The technical foundation was solid. The content needed work.\n\nRewrote all four case study descriptions to remove em dashes, AI tells, and anything that sounded like it was written by a language model rather than a person. Tightened the experience page. Updated the CV to reflect the honest version of the Adverity contribution.\n\nAdded the GitHub repos tab with hardcoded cards. Added tool icons with hover tooltips. Added the LinkedIn card to Extras. Fixed z-index layering on comment cards. Fixed the toolbar on the experience page. A lot of small things. The kind of day that looks unproductive in a commit log but makes everything feel considered.`,
  },
  {
    date: '20 June 2026',
    headline: 'This page.',
    body: `Writing this on the day I am posting it.\n\nThe portfolio is not finished. Portfolios are never finished. But it is honest, it is fast, and it is mine in a way that a template never would have been.`,
  },
];

const S = 16;
const iconStyle = { width: S, height: S, borderRadius: 3, overflow: 'hidden', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };

const STACK_ICONS = [
  { id: 'nextjs', label: 'Next.js', reason: 'Static export with proper routing and Safari compatibility out of the box', icon: () => <svg width={S} height={S} viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg> },
  { id: 'tailwind', label: 'Tailwind CSS', reason: 'Utility-first styling that lets me design directly in the markup', icon: () => <svg width={S} height={S} viewBox="0 0 24 24" fill="none"><path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
  { id: 'supabase', label: 'Supabase', reason: 'Real-time presence, comment pins, live cursors, and session-based auth without needing a backend', icon: () => <svg width={S} height={S} viewBox="0 0 109 113" fill="none"><path fill="#249361" d="M63.7 110.3C60.8 113.9 55.1 111.9 55 107.3L54 40H99.2C107.8 40 112.5 49.9 107.2 56.5L63.7 110.3z"/><path fill="#3ECF8E" d="M45.3 2.1C48.2-1.5 53.9.4 54 5L54.5 72.3H9.8C1.3 72.3-3.5 62.4 1.8 55.8L45.3 2.1z"/></svg> },
  { id: 'cloudflare', label: 'Cloudflare Pages', reason: 'Auto-deploys on every push to main. Should have used it from day one.', icon: () => <div style={{ width: S, height: S, borderRadius: 3, overflow: 'hidden', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#F6821F' }}><svg width="12" height="10" viewBox="0 0 52 36" fill="none"><path d="M40.9 15.7C40.7 15.7 40.5 15.7 40.3 15.7C39.8 11.9 36.6 9 32.7 9C31.2 9 29.8 9.4 28.6 10.2C26.5 6.7 22.7 4.5 18.4 4.5C11.6 4.5 6 10.1 6 16.9C6 17.4 6 17.9 6.1 18.4C2.6 19.3 0 22.4 0 26.1C0 30.5 3.6 34.1 8 34.1H40.9C45.3 34.1 48.9 30.5 48.9 26.1C48.9 21.6 45.3 15.7 40.9 15.7Z" fill="white"/></svg></div> },
  { id: 'github', label: 'GitHub', reason: 'Version control and the source of truth for every change made to this portfolio', icon: () => <svg width={S} height={S} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg> },
  { id: 'claude', label: 'Claude', reason: 'Design thinking partner, implementation collaborator, and the reason this got built in five days', icon: () => <svg width={S} height={S} viewBox="0 0 512 509.64" fill="none" shapeRendering="geometricPrecision"><path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/><path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/></svg> },
  { id: 'vscode', label: 'VS Code', reason: 'Primary coding environment with Claude Code running in the terminal alongside it', icon: () => <svg width={S} height={S} viewBox="0 0 24 24" fill="none"><path fill="#007ACC" d="M17.484.58l-9.068 8.27-4.26-3.24L2 6.765v10.47l2.156 1.155 4.26-3.24 9.068 8.27L21 21.747V2.253L17.484.58zM17 15.56L10.906 12 17 8.44v7.12z"/></svg> },
  { id: 'figma', label: 'Figma', reason: 'Where every design decision started before it became code', icon: () => <svg width={S} height={S} viewBox="0 0 38 57" fill="none"><path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/><path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z"/><path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg> },
];

export default function BuildLogCard() {
  return (
    <div className="build-log-card">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="blog-meta-tag" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
          🗂️ Build log
        </span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.375rem' }} className="text-gray-900">
          How this portfolio was built
        </h3>
        <p className="text-gray-500" style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
          A behind-the-scenes account of five days, a lot of terminal errors, and one very patient AI.
        </p>
      </div>

      {/* Timeline */}
      <div className="build-log-timeline">
        {TIMELINE.map((entry, i) => (
          <div key={i} className="build-log-entry">
            <div className="build-log-left">
              <div className="build-log-dot" />
              {i < TIMELINE.length - 1 && <div className="build-log-line" />}
            </div>
            <div className="build-log-content">
              <div className="build-log-date-row">
                <span className="build-log-date">{entry.date}</span>
              </div>
              <p className="build-log-headline">{entry.headline}</p>
              <p className="build-log-body">{entry.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* On using Claude */}
      <div className="build-log-section">
        <div className="build-log-divider" />
        <p className="build-log-section-headline">On using Claude throughout</p>
        <p className="build-log-body">
          Claude was not just a code generator on this project. It was closer to a design thinking partner.
        </p>
        <p className="build-log-body" style={{ marginTop: '0.75rem' }}>
          I used it the way I would use a senior colleague: describing problems, getting a first response, pushing back when the output was wrong, iterating until it felt right. The UX decisions were mine. The copy decisions were mine. The architectural decisions were mine. Claude helped me move faster on implementation and challenged me when my framing was off.
        </p>
        <p className="build-log-body" style={{ marginTop: '0.75rem' }}>
          Every prompt was written like a design brief: context, constraints, acceptance criteria. Every output was reviewed like a design review: does this solve the actual problem, or does it just look like it does.
        </p>
        <p className="build-log-body" style={{ marginTop: '0.75rem' }}>
          The result is a portfolio where I can point to every decision and explain why it was made. That matters more than shipping fast.
        </p>
      </div>

      {/* The stack */}
      <div className="build-log-section">
        <div className="build-log-divider" />
        <p className="build-log-section-headline">The stack</p>
        <div className="build-log-stack-list">
          {STACK_ICONS.map(item => (
            <div key={item.id} className="build-log-stack-item">
              <div style={iconStyle}>{item.icon()}</div>
              <div>
                <span className="build-log-stack-name">{item.label}</span>
                <span className="build-log-stack-reason">{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What I would do differently */}
      <div className="build-log-section">
        <div className="build-log-divider" />
        <p className="build-log-section-headline">What I would do differently</p>
        <p className="build-log-body">
          Start with Next.js. The Vite to Next.js migration on day four was necessary but painful. If I had known I would need proper routing and Safari compatibility from the start, I would have started there.
        </p>
        <p className="build-log-body" style={{ marginTop: '0.75rem' }}>
          Sort out the deployment pipeline on day one. The move to Cloudflare Pages improved everything immediately. There was no reason to wait until day four.
        </p>
        <p className="build-log-body" style={{ marginTop: '0.75rem' }}>
          Commit more often. The commit history on this project is messier than it should be because I was moving fast and not stopping to checkpoint. Good habits matter even when you are the only person on the repo.
        </p>
      </div>

      {/* Footer */}
      <div className="build-log-divider" style={{ marginTop: '1.5rem' }} />
      <p className="text-gray-400" style={{ fontSize: '0.75rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
        Still evolving. UI polish and final touches ongoing post-launch.
      </p>
    </div>
  );
}
