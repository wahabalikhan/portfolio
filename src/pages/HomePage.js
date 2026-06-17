
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { useGithubRepos } from '../hooks/UseGitHubRepos';
import Footer from '../components/Footer';
import CommentPins from '../components/CommentPins';
import LinkedInPostCard from '../components/LinkedInPostCard';
import GitHubRepoCard from '../components/GitHubRepoCard';
import { usePageTitle } from '../hooks/usePageTitle';

// HARDCODED PREVIEW — remove this card once GitHub API is confirmed working in production
const PREVIEW_CARD = {
  id: '__preview__',
  name: 'portfolio',
  description: 'Coding my portfolio live! Built with Vite + React, Supabase for real-time comments, and deployed via GitHub.',
  language: 'JavaScript',
  topics: ['react', 'vite', 'supabase'],
  updated: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  fork: false,
  parent: null,
  github: 'https://github.com/wahabalikhan/portfolio',
};

function GitHubMark() {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function HomePage({ setCurrentPage, activeTab, setActiveTab }) {
    const { repos, loading, error } = useGithubRepos('wahabalikhan');
    usePageTitle();

    const [activeTooltip, setActiveTooltip] = useState(null);
    const tooltipTimerRef = useRef(null);

    const showTooltip = (word) => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      setActiveTooltip(word);
      tooltipTimerRef.current = setTimeout(() => {
        setActiveTooltip(null);
        tooltipTimerRef.current = null;
      }, 1500);
    };
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 relative home-page">
      <CommentPins page="home" activeTab={activeTab} />
      <div className="flex items-stretch gap-4 mb-6">
        <img
          src="/images/profile.png"
          alt="Wahab"
          className="h-[105px] w-[105px] aspect-square rounded-full object-cover flex-shrink-0"
        />

        <div>
          <h1 className="font-bold mb-2 text-gray-900" style={{ fontSize: '2.75rem', lineHeight: '1.12' }}>
            I{' '}
            <span className="hero-accent-word hero-accent-design" onClick={() => showTooltip('design')}>
              {activeTooltip === 'design' && <span className="hero-word-tooltip">Figma, mostly 👀</span>}
              design
            </span>
            {' '}products. Then I help{' '}
            <span className="hero-accent-word hero-accent-ship" onClick={() => showTooltip('ship')}>
              {activeTooltip === 'ship' && <span className="hero-word-tooltip">Claude Code helped 🤝</span>}
              ship
</span>
            {' '}them.
          </h1>

          <p className="text-base text-gray-700 leading-relaxed mb-3">
            Product Designer & Vibe Coder <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> BSc CS <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> NN/g Certified <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> Metrics-driven
          </p>

        </div>
      </div>

      <div id="case-studies" className="mt-10 mb-10">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Case studies</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setActiveTab('Design')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'Design' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            🎨 Design
          </button>
          <button
            onClick={() => setActiveTab('Development')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'Development' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            💻 Development
          </button>
          <button
            onClick={() => setActiveTab('Extras')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'Extras' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            ✨ Extras
          </button>
        </div>

        {/* Designer Tab Content */}
        {activeTab === 'Design' && (
          <div className="tab-panel space-y-12">
            {[
              {
                id: 'ai-workflow',
                title: 'The Designer Who Ships Code',
                description: <>A detailed look at how I rebuilt my day-to-day design workflow around AI tools, turning live product pages into editable Figma files, building live prototypes for faster feedback, and working closer to the codebase than ever before.</>,
                logo_src: '/images/adverity.jpg',
                company: 'Adverity',
                bg_src: '/images/ai-workflow-hero.png',
                link: '/ai-workflow',
              },
              {
                id: 'git-diff',
                title: 'How user-centric design improved visibility of user changes',
                description: <>Introduced the Git Diff experience around real user needs, streamlining how data engineers review and commit changes to improve clarity, reduce errors, and build trust.
The result: <span className="font-bold">34% more commits</span> and <span className="font-bold">15% fewer resets</span>.</>,
                logo_src: '/images/matillion-logo.svg',
                company: 'Matillion',
                bg_src: '/images/matillion-bg.png',
                link: '/git-diff',
              },
              {
                id: 'design-system',
                title: 'From Framework to Design System',
                description: <><span className="font-bold">36.1% reduction in design task completion time</span>, achieved by building Matillion's ETL design system from scratch - components, patterns, and documentation - while embedding UX practice into how the engineering team worked.</>,
                logo_src: '/images/matillion-logo.svg',
                company: 'Matillion',
                bg_src: '/images/ds.png',
                link: '/design-system',
              },
              {
                id: 'schemas',
                title: 'Turning an anecdotal feature request into a validated, user-driven strategy',
                description: <>Securing stakeholder buy-in to validate a time-sensitive 'quick-win' request for with research, leading to refined reshape priorities and merge workflows for aligned business outcomes. <span className="font-bold">Increased stakeholder confidence by 12.3%</span></>,
                logo_src: '/images/matillion-logo.svg',
                company: 'Matillion',
                bg_src: '/images/schema_bg.png',
                link: '/schemas',
              }
            ].map((study) => (
              <Link
                key={study.id}
                to={study.link}
                className="case-study-link block group w-full text-left"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={study.logo_src}
                    alt={study.company}
                    className="w-8 h-8 rounded"
                  />
                  <span className="font-semibold text-gray-900 pt-1">
                    {study.company}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {study.description}
                </p>
                <div className="cs-thumb">
                  {study.bg_src ? (
                    <img src={study.bg_src} alt={study.title} />
                  ) : (
                    <div className="cs-thumb-placeholder">
                      <span>{study.title}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Development Tab Content */}
        {activeTab === 'Development' && (
          <div className="tab-panel">
            <div className="gh-from">
              <GitHubMark />
              <span>from GitHub</span>
            </div>

            {loading && (
              <p className="text-sm text-gray-500 py-8 text-center">Loading repositories…</p>
            )}
            {error && (
              <p style={{ fontSize: '14px', color: '#ef4444', padding: '1rem 0' }}>
                Couldn't load repos right now — see them at{' '}
                <a
                  href="https://github.com/wahabalikhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                >
                  github.com/wahabalikhan
                </a>
              </p>
            )}

            <div className="gh-grid">
              <GitHubRepoCard
                key={PREVIEW_CARD.id}
                name={PREVIEW_CARD.name}
                description={PREVIEW_CARD.description}
                language={PREVIEW_CARD.language}
                topics={PREVIEW_CARD.topics}
                updated={PREVIEW_CARD.updated}
                fork={PREVIEW_CARD.fork}
                parent={PREVIEW_CARD.parent}
                url={PREVIEW_CARD.github}
              />
              {!loading && repos.map((repo) => (
                <GitHubRepoCard
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                  language={repo.language}
                  topics={repo.tech}
                  updated={repo.updated}
                  fork={repo.fork}
                  parent={repo.parent}
                  url={repo.github}
                />
              ))}
            </div>
          </div>
        )}

        {/* Extras Tab Content */}
        {activeTab === 'Extras' && (
          <div className="tab-panel flex flex-col gap-8 items-center">
            <LinkedInPostCard />
          </div>
        )}
      </div>

      <div className="mb-10">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-2xl font-bold mb-8 text-gray-900">What's in my head!</h2>

        <div className="space-y-12">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/${post.id}`}
              className="blog-post-link block text-left w-full group"
            >
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {post.preview}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}