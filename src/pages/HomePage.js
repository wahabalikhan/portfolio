
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { useGithubRepos } from '../hooks/UseGitHubRepos';
import Footer from '../components/Footer';
import SpotifyPlayerPill from '../components/SpotifyPlayerPill';

export default function HomePage({ setCurrentPage, activeTab, setActiveTab }) {
    const { repos, loading, error } = useGithubRepos('wahabalikhan');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <img 
        src="/images/profile.png" 
        alt="Wahab"
        className="w-24 h-24 rounded-full mb-6 object-cover"
      />
      
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Hey! I'm Wahab 👋 (portfolio WIP as we speak!)
      </h1>
      
      <p className="text-md text-gray-700 mb-6 leading-relaxed">
        <span class="font-bold">Product Designer</span> & <span class="font-bold">Vibe Coder</span> with a background in <span class="font-bold">BSc Computer Science</span>.
      </p>

      <div className="text-md text-gray-700 space-y-2 mb-6">
        <p className="font-bold">Other things about me:</p>
        <ul className="space-y-1">
          <li>• Nielsen Norman Group (NN/g) UX Certified (ID: 1081116)<img 
        src="/images/nng2.png" 
        alt="Ceritification"
        className="w-10 h-4 inline-block pl-2"
      /></li>
      <li>• Design @ Matillion <span className="inline-flex items-center gap-2 align-middle">
          <img src="/images/matillion-logo.svg" alt="Matillion" className="w-6 h-6 rounded inline-block" />
        </span></li>
          <li>• Metrics-driven 📊</li>
        </ul>
      </div>

      <div className="flex gap-4 items-center">
        <a 
          href="https://www.linkedin.com/in/wahabalikhan/" 
          target="_blank"
          rel="noopener noreferrer"
          className="link-text text-blue-600 dark:text-blue-400 inline-flex items-center gap-1"
        >
          <b>LinkedIn ↗</b>
        </a>
        <a 
          href="mailto:wahab-ali-khan@hotmail.com"
          className="link-text text-blue-600 dark:text-blue-400 inline-flex items-center gap-1"
        >
          <b>Contact ↗</b>
        </a>
      </div>

      <div className="mt-10 mb-10">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Case studies</h2>
        
        {/* Tabs */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setActiveTab('Design')}
            style={{ cursor: 'pointer' }}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === 'Design'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎨 Design
          </button>
          <button
            onClick={() => setActiveTab('Development')}
            style={{ cursor: 'pointer' }}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === 'Development'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💻 Development
          </button>
          <button
            onClick={() => setActiveTab('Extras')}
            style={{ cursor: 'pointer' }}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === 'Extras'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✨ Extras
          </button>
        </div>

        {/* Designer Tab Content */}
        {activeTab === 'Design' && (
          <div className="space-y-12">
            {[
              {
                id: 'git-diff',
                title: 'How user-centric design improved visibility of user changes',
                description: <>Introduced the Git Diff experience around real user needs, streamlining how data engineers review and commit changes to improve clarity, reduce errors, and build trust.
The result: <span className="font-bold">34% more commits</span> and <span className="font-bold">15% fewer resets</span>.</>, 
                logo_src: '/images/matillion-logo.svg',
                bg_src: '/images/matillion-bg.png',
                link: '/git-diff',
              },
              {
                id: 'schemas',
                title: 'Turning an anecdotal feature request into a validated, user-driven strategy',
                description: <>Securing stakeholder buy-in to validate a time-sensitive 'quick-win' request for with research, leading to refined reshape priorities and merge workflows for aligned business outcomes. <span className="font-bold">Increased stakeholder confidence by 12.3%</span></>, 
                logo_src: '/images/matillion-logo.svg',
                bg_src: '/images/schema_bg.png',
                link: '/schemas',
              },
              {
                id: 'design-system',
                title: 'Bridging gaps between UX x Eng through a Design System',
                description: <><span className="font-bold">36.1% design task speed increase </span> through building and maintaining the 'ETL Design System' that bridged gaps and fostered a UX culture between teams</>, 
                logo_src: '/images/matillion-logo.svg',
                bg_src: '/images/ds.png',
                link: '/design-system',
              },
            ].map((study) => (
              <Link
                key={study.id}
                to={study.link}
                className="case-study-link block group w-full text-left"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src={study.logo_src}
                    alt="Matillion"
                    className="w-8 h-8 rounded"
                  />
                  <span className="font-semibold text-gray-900 pt-1">
                    Matillion
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {study.description}
                </p>
                <div className="mb-4 mt-4 rounded-lg">
                  <img 
                    src={study.bg_src}
                    alt={study.title}
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
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

            {!loading && !error && repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-tile block group"
              >
                <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-8 border border-gray-200 hover:border-gray-400 transition-all">
                  <div className="flex items-start justify-between mb-3">
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {repo.title} ↗
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                  
                  {repo.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
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
              </a>
            ))}
          </div>
        )}

        {/* Extras Tab Content */}
        {activeTab === 'Extras' && (
          <div className="space-y-4">
            <a
              href="https://github.com/wahabalikhan"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              → GitHub
            </a>
            <a
              href="https://www.dribbble.com/wahabalikhan"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              → Dribbble
            </a>
            <a
              href="https://www.linkedin.com/in/wahabalikhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              → LinkedIn
            </a>
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