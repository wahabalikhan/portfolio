import React from 'react';
import BackButton from '../components/BackButton';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';

export default function BuildingPortfolioPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />

      <h1 className="text-5xl font-bold mb-4 text-gray-900">
        Building my portfolio
      </h1>

      <p className="text-gray-600 mb-12">October 19, 2025</p>

            <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          Designing my own portfolio has always felt like an identity crisis in code form. You want it to look polished enough to reflect your craft but still feel alive, personal, and a little bit you. Instead of treating it like a static showcase, I decided to vibe-code it: part design, part development, and a lot of creative improvisation.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This version of my site lives somewhere between Figma and production. I use VS Code Copilot and Claude to speed up development and problem-solve as I go, with GitHub as my version control safety net (and sometimes my memory). The setup feels less like a toolchain and more like a conversation between creative and technical instincts.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Under the hood, it's built with Tailwind CSS, which is lightweight, fast, and expressive enough to let me design directly in the browser. I'm pulling live repo data from GitHub's API using personal tokens so case studies and projects update dynamically as I commit new work. It's a small touch that makes the portfolio feel less like a frozen snapshot and more like an evolving log of what I'm actually building.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Every component and every line of code is a reminder that design and engineering are never separate. My own coding knowledge helps bridge the gap, turning visual ideas into living, interactive pieces without waiting on a full build pipeline. It's hands-on, sometimes messy, but deeply satisfying.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Building this site wasn't just about having a nice place to host projects. It was about owning the process end to end, from concept to commit. Every gradient, hover, and animation is a design decision expressed through code. That's what vibe-coding means to me: creating things that feel designed and built in the same heartbeat.
        </p>
      </div>

      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Posts</h2>

        <div className="space-y-8">
          {blogPosts.filter(post => post.id !== 'building-portfolio').map((post) => (
            <button
              key={post.id}
              onClick={() => setCurrentPage(post.id)}
              className="block text-left w-full"
            >
              <h3 className="text-blue-600 hover:underline text-xl mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700">{post.preview}</p>
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}