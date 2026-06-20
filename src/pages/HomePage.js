
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import CommentPins from '../components/CommentPins';
import FadeUp from '../components/FadeUp';
import LinkedInPostCard from '../components/LinkedInPostCard';
import GitHubRepoCard from '../components/GitHubRepoCard';
import { usePageTitle } from '../hooks/usePageTitle';

const HARDCODED_REPOS = [
  {
    name: 'portfolio',
    description: 'The codebase behind this portfolio. Built in React and Vite with a real-time Figma-style comment system, live cursors, and multiplayer presence powered by Supabase. Every design decision on this site was made by a designer who then built it. This repo is the proof.',
    language: 'JavaScript',
    langColor: '#f1e05a',
    topics: ['react', 'vite', 'supabase', 'claude', 'vscode', 'git', 'github', 'figma'],
    updatedLabel: '16 hours ago',
    url: 'https://github.com/wahabalikhan/portfolio',
  },
  {
    name: 'insurance-brokerage-management-system',
    description: 'Final year CS project. I designed the UI in Figma first, then built the whole thing: a PHP and MySQL insurance platform with role-based access for admins, brokers, and consumers. Policy management, bookings, and quotes all in one system. Building it end-to-end taught me how design decisions become engineering constraints, which shapes how I work with engineers now.',
    language: 'PHP',
    langColor: '#4F5D95',
    topics: ['figma', 'vscode', 'php', 'mysql', 'xampp'],
    updatedLabel: '4 months ago',
    url: 'https://github.com/wahabalikhan/final-FYP-Insurance_Brokerage_and_Management_System-19001546',
  },
  {
    name: 'escape-game',
    description: 'Solo university project in Java. A GUI-based 2D escape game built around object-oriented design, game loop architecture, and UI state management. Not a design project, but the systems thinking required to build it is the same thinking I bring to complex product design problems. Built in IntelliJ. Debugged extensively with Stack Overflow.',
    language: 'Java',
    langColor: '#b07219',
    topics: ['java', 'intellij', 'stackoverflow'],
    updatedLabel: '4 months ago',
    url: 'https://github.com/wahabalikhan/escape-game',
  },
  {
    name: 'bobbys-desserts',
    description: 'University project built around a fictional brief for a desserts business. I designed the UI in Figma before writing a line of code, then built a PHP and MySQL web app with role-based access, authentication, and CRUD features. Same process I use professionally: design first, then build, then iterate.',
    language: 'PHP',
    langColor: '#4F5D95',
    topics: ['figma', 'vscode', 'php', 'mysql', 'javascript'],
    updatedLabel: '4 months ago',
    url: 'https://github.com/wahabalikhan/bobbys-desserts',
  },
];


function GitHubMark() {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function HomePage({ setCurrentPage, activeTab, setActiveTab }) {
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
    <div className="max-w-3xl mx-auto px-6 py-16 relative home-page" role="application">
      <CommentPins page="home" activeTab={activeTab} />
      <FadeUp delay={0} className="flex items-stretch gap-4 mb-6">
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

          <p className="text-base text-gray-700 leading-relaxed mb-3" style={{ fontSize: '15.6px' }}>
            Product Designer <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> AI-first Coder <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> BSc CS <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> NN/g Certified <span style={{ fontSize: '1.1em', verticalAlign: 'middle' }}>·</span> Metrics-driven
          </p>

        </div>
      </FadeUp>

      <div id="case-studies" className="mt-10 mb-10">
        <FadeUp delay={0}>
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
        </FadeUp>

        {/* Designer Tab Content */}
        {activeTab === 'Design' && (
          <FadeUp className="space-y-12">
            {[
              {
                id: 'ai-workflow',
                title: 'The Designer Who Ships Code',
                description: <>How I contributed to bringing a closer-to-code design workflow to life at Adverity, collaborating on setup, getting it from half-built to team-wide, and using it to ship real changes through engineering review to production.</>,
                logo_src: '/images/adverity.jpg',
                company: 'Adverity',
                bg_src: '/images/ai_thumbnail.png',
                link: '/ai-workflow',
              },
              {
                id: 'git-diff',
                title: 'Designing confidence into a high-risk engineering workflow',
                description: <>Data engineers were committing changes they couldn't see, leading to errors and lost trust in the tool. I redesigned the workflow to give them clarity before the point of no return. <span className="font-bold">34% more commits.</span> <span className="font-bold">15% fewer resets.</span></>,
                logo_src: '/images/matillion-logo.svg',
                company: 'Matillion',
                bg_src: '/images/matillion-bg.png',
                link: '/git-diff',
              },
              {
                id: 'design-system',
                title: 'From Framework to Design System',
                description: <>36.1% reduction in design task completion time, achieved by building Matillion's ETL design system from scratch: components, patterns, and documentation, while embedding UX practice into how the engineering team worked.</>,
                logo_src: '/images/matillion-logo.svg',
                company: 'Matillion',
                bg_src: '/images/ds.png',
                link: '/design-system',
              },
              {
                id: 'schemas',
                title: 'Reframing a quick-win request into a user-validated strategy',
                description: <>A stakeholder asked for a search bar. I asked why. A month of research prevented the wrong thing from being built and redirected the roadmap toward the real problem. <span className="font-bold">Stakeholder confidence up 12.3%.</span></>,
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
          </FadeUp>
        )}

        {/* Development Tab Content */}
        {activeTab === 'Development' && (
          <FadeUp>
            <div className="gh-from">
              <GitHubMark />
              <span>from GitHub</span>
            </div>

            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              These repos span university projects and personal work. They're here because building things, even imperfect things, is how I learned to think like an engineer while designing like one.
            </p>

            <div className="gh-grid">
              {HARDCODED_REPOS.map((repo) => (
                <GitHubRepoCard
                  key={repo.name}
                  name={repo.name}
                  description={repo.description}
                  language={repo.language}
                  langColor={repo.langColor}
                  topics={repo.topics}
                  updatedLabel={repo.updatedLabel}
                  url={repo.url}
                />
              ))}
            </div>
          </FadeUp>
        )}

        {/* Extras Tab Content */}
        {activeTab === 'Extras' && (
          <FadeUp className="flex flex-col gap-8 items-center">
            <LinkedInPostCard />
          </FadeUp>
        )}
      </div>

      <FadeUp className="mb-10">
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
      </FadeUp>

      <Footer />
    </div>
  );
}