
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { devProjectMeta, defaultDevProjectMeta } from '../data/devProjects';
import { useGithubRepos } from '../hooks/UseGitHubRepos';
import Footer from '../components/Footer';
import CommentPins from '../components/CommentPins';
import { usePageTitle } from '../hooks/usePageTitle';

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
      <CommentPins page="home" />
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
            Product Designer & Vibe Coder · BSc CS · NN/g Certified · Metrics-driven
          </p>

        </div>
      </div>

      <div className="mt-10 mb-10">
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
          <div className="space-y-12">
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
          <div className="space-y-12">
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading repositories...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading repos: {error}</p>
              </div>
            )}

            {!loading && !error && repos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No repositories found.</p>
              </div>
            )}

            {!loading && !error && repos.map((repo) => {
              const meta = devProjectMeta[repo.name] || defaultDevProjectMeta;
              const Icon = meta.icon;
              const tech = meta.tech || repo.tech;
              return (
                <a
                  key={repo.id}
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-tile block group"
                >
                  <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-6 border border-gray-200 hover:border-gray-400 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`icon-tile icon-tile-${meta.accent}`}>
                        <Icon size={22} stroke={1.75} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                          {meta.title || repo.title} ↗
                        </h3>

                        <p className="text-gray-700 leading-relaxed mb-3">
                          {meta.description || repo.description}
                        </p>

                        {tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {tech.map((t, index) => (
                              <span
                                key={index}
                                className={`tech-pill tech-pill-${meta.accent}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-4 items-center">
                          <span className="text-blue-600 inline-flex items-center gap-1 link-text">
                            View on GitHub →
                          </span>
                          {repo.demo && (
                            <span className="text-blue-600 inline-flex items-center gap-1 link-text">
                              Live Demo →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Extras Tab Content */}
        {activeTab === 'Extras' && (
          <div>
            <p className="text-gray-600 text-lg">Thinking about things to build at the moment, will update soon!</p>
          </div>
        )}
      </div>

      <div className="mb-10">
        <section className="border-t border-gray-200 pt-10 pb-0" />
        <h2 className="text-3xl font-bold mb-10 text-gray-900">What's in my head!</h2>
        
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/${post.id}`}
              className="blog-post-link block text-left w-full group"
            >
              <h3 className="text-blue-600 dark:text-blue-400 text-xl mb-1">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-600 leading-relaxed">
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