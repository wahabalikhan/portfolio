
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import Footer from '@/components/Footer';
import CommentPins from '@/components/CommentPins';
import FadeUp from '@/components/FadeUp';
import LinkedInPostCard from '@/components/LinkedInPostCard';
import BuildLogCard from '@/components/BuildLogCard';
import JustForFunCard from '@/components/JustForFunCard';
import GitHubRepoCard from '@/components/GitHubRepoCard';
import GitHubContributions from '@/components/GitHubContributions';
import { usePageTitle } from '@/hooks/usePageTitle';

const HARDCODED_REPOS = [
  {
    name: 'portfolio',
    description: 'The codebase behind this portfolio. Built in React and Next.js with a real-time Figma-style comment system, live cursors, and multiplayer presence powered by Supabase. Hosted on Cloudflare Pages. Every design decision on this site was made by a designer who then built it. This repo is the proof.',
    language: 'JavaScript',
    langColor: '#f1e05a',
    topics: ['react', 'nextjs', 'supabase', 'claude', 'vscode', 'git', 'github', 'figma', 'cloudflare'],
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


const TOOLKIT = [
  {
    label: 'Claude Code',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 512 509.64" fill="none" shapeRendering="geometricPrecision">
        <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
        <path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474z"/>
      </svg>
    ),
  },
  {
    label: 'Figma',
    icon: () => (
      <svg width="20" height="28" viewBox="0 0 38 57" fill="none">
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z"/>
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    ),
  },
  {
    label: 'Supabase',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 109 113" fill="none">
        <path fill="#249361" d="M63.7 110.3C60.8 113.9 55.1 111.9 55 107.3L54 40H99.2C107.8 40 112.5 49.9 107.2 56.5L63.7 110.3z"/>
        <path fill="#3ECF8E" d="M45.3 2.1C48.2-1.5 53.9.4 54 5L54.5 72.3H9.8C1.3 72.3-3.5 62.4 1.8 55.8L45.3 2.1z"/>
      </svg>
    ),
  },
  {
    label: 'VS Code',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path fill="#007ACC" d="M17.484.58l-9.068 8.27-4.26-3.24L2 6.765v10.47l2.156 1.155 4.26-3.24 9.068 8.27L21 21.747V2.253L17.484.58zM17 15.56L10.906 12 17 8.44v7.12z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="#24292e">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    ),
  },
];

function GitHubMark() {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('Design');
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
          className="h-[100px] w-[100px] aspect-square rounded-full object-cover flex-shrink-0"
        />

        <div>
          <h1 className="font-bold mb-2 text-gray-900" style={{ fontSize: '2.75rem', lineHeight: '1.12' }}>
            Hey <span className="nav-wave">👋</span>, I{' '}
            <span className="hero-accent-word hero-accent-design" onClick={() => showTooltip('designing')}>
              {activeTooltip === 'design' && <span className="hero-word-tooltip">Figma, mostly 👀</span>}
              design
            </span>
            {' '}products then help{' '}
            <span className="hero-accent-word hero-accent-ship" onClick={() => showTooltip('ship')}>
              {activeTooltip === 'ship' && <span className="hero-word-tooltip">Claude Code helped 🤝</span>}
              ship
            </span>
            {' '}them.
          </h1>

          <p className="text-gray-500 leading-relaxed mt-3 mb-3" style={{ fontSize: '15.6px' }}>
            4+ years designing enterprise SaaS for technical users. I use AI to move faster on implementation so I can spend more time on the work that actually matters: aligning teams around the right problem.
          </p>

          <p className="text-base text-gray-700 leading-relaxed" style={{ fontSize: '15.6px' }}>
            <span className="font-bold">Product Designer</span> & AI-first Coder <span style={{ margin: '0 4px' }}>·</span> <span className="font-bold">Enterprise B2B SaaS</span> <span style={{ margin: '0 4px' }}>·</span> BSc CS <span style={{ margin: '0 4px' }}>·</span> NN/g Certified (ID: 1081116)
          </p>

        </div>
      </FadeUp>

      {/* Toolkit */}
      <FadeUp delay={0} className="mb-8">
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Toolkit</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TOOLKIT.map((tool) => (
            <div key={tool.label} title={tool.label} style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #e5e7eb', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <tool.icon />
            </div>
          ))}
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
            onClick={() => setActiveTab('JustForFun')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'JustForFun' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            🌈 Just for fun
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
                href={study.link}
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

            <p className="text-gray-700 leading-relaxed mb-6">
              These repos span university projects and personal work. They're here because building things, even imperfect things, is how I learned to think like an engineer while designing like one.
            </p>

            <GitHubContributions />

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

            <div className="mt-8">
              <BuildLogCard />
            </div>
          </FadeUp>
        )}

        {/* Just for Fun Tab Content */}
        {activeTab === 'JustForFun' && (
          <FadeUp className="flex flex-col gap-8 items-center">
            <LinkedInPostCard />
            <JustForFunCard />
          </FadeUp>
        )}
      </div>

      <FadeUp className="mb-10">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-2xl font-bold mb-8 text-gray-900">What's in my head!</h2>

        <div className="space-y-12" role="feed" aria-label="Blog posts">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.id}`}
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
