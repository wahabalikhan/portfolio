import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { codingProjects } from '../data/codingProjects';

export default function HomePage({ setCurrentPage, activeTab, setActiveTab }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <img 
        src="/api/placeholder/120/120" 
        alt="Wahab"
        className="w-32 h-32 rounded-full mb-6 object-cover"
      />
      
      <h1 className="text-5xl font-bold mb-6 text-gray-900">
        Hey! I'm Wahab 👋
      </h1>
      
      <p className="text-xl text-gray-700 mb-6 leading-relaxed">
        I'm a Product Designer @ <span className="inline-flex items-center gap-2 align-middle">
          <span className="font-medium">Matillion</span>
          <img src="/api/placeholder/24/24" alt="Matillion" className="w-6 h-6 rounded inline-block" />
        </span> with a background in Computer Science and know enough to be a vibe-coder. Also dabble in a few coding projects here and there
      </p>

      <div className="text-lg text-gray-700 space-y-2 mb-6">
        <p className="font-medium">Some things about me:</p>
        <ul className="space-y-1">
          <li>• Nielsen Norman Group (NN/g) UX Certified (ID: 1081116) 🎓</li>
          <li>• Metrics-driven 📊</li>
          <li>• Advocate for DEI and BAME 🗣️</li>
        </ul>
      </div>

      <a 
        href="https://linkedin.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline inline-flex items-center gap-1"
      >
        Full experience on LinkedIn ↗
      </a>

      <div className="mt-20 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Case studies</h2>
        
        {/* Tabs */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setActiveTab('designer')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === 'designer'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎨 Designer
          </button>
          <button
            onClick={() => setActiveTab('near-coder')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
              activeTab === 'near-coder'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💻 Near-coder
          </button>
        </div>

        {/* Designer Tab Content */}
        {activeTab === 'designer' && (
          <div className="space-y-12">
            {[
              {
                id: 'git-diff',
                title: 'How user-centric design improved visibility of user changes',
                description: 'Focusing on user needs, Git Diff, plus quality of life improvements to the overall Git experience leading to a 25-26% increase in key user interactions'
              },
              {
                id: 'schemas',
                title: 'Validating stakeholder assumptions with research-driven insights',
                description: 'Securing stakeholder buy-in to validate a time-sensitive \'quick-win\' request for \'Schemas\' with research, leading to refined reshape priorities and merge workflows for aligned business outcomes. Increased stakeholder confidence by 12.3%'
              },
              {
                id: 'design-system',
                title: 'Bridging gaps between UX x Eng through a Design System',
                description: '36.1% design task speed increase through building and maintaining the \'ETL Design System\' that bridged gaps and fostered a UX culture between teams'
              },
              {
                id: 'workflows',
                title: 'Resolving workflow blockers to increase decision-making and productivity',
                description: 'Resolving workflow blockers to \'in-context workflows\' to improve productivity. Usability testing achieved an 7.4% task speed increase, with expected gains in product adoption post-implementation'
              }
            ].map((study) => (
              <button
                key={study.id}
                onClick={() => setCurrentPage(study.id)}
                className="block group w-full text-left"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src="/api/placeholder/800/500" 
                    alt={study.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src="/api/placeholder/32/32" 
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
              </button>
            ))}
          </div>
        )}

        {/* Near-coder Tab Content */}
        {activeTab === 'near-coder' && (
          <div className="space-y-8">
            {codingProjects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    View on GitHub →
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-gray-900">Thoughts, ideas, & experiences</h2>
        
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setCurrentPage(post.id)}
              className="block text-left w-full group"
            >
              <h3 className="text-blue-600 hover:underline text-xl mb-1 group-hover:underline">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-600 leading-relaxed">
                {post.preview}
              </p>
            </button>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-8 pb-12">
        <p className="text-gray-600 text-sm">
          Made with ❤️ in Figma. © Wahab Ali Khan 2025
        </p>
      </footer>
    </div>
  );
}