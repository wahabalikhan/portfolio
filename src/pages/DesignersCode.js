import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import { usePageTitle } from '../hooks/usePageTitle';

export default function DesignersCode() {
  const navigate = useNavigate();
  usePageTitle('Do designers need to code? Wrong question.');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        Do designers need to code? Wrong question.
      </h1>

      <p className="text-gray-600 mb-12">October 20, 2025</p>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          Every few months this debate resurfaces, usually as a LinkedIn hot take or a quiet anxiety in a design team Slack. After a few years designing with one hand in Figma and the other occasionally in VS Code, I've stopped trying to answer it directly. Because the question isn't really about code. It's about curiosity.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          When I started out, design and development felt like two separate worlds. Designers dreamed things up, engineers made them real. Over time, especially working on more complex data products where the UI and the underlying system are deeply intertwined, that clean separation started to feel less useful. More like a gap than a boundary.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Understanding how components behave, how states change, and how data flows doesn't make you less of a designer. It makes you a more useful one. Not because you can ship production code, but because you stop designing in screenshots. You start designing in flow, thinking about interactions, constraints, edge cases, and what happens when something goes wrong. That changes what you put in your Figma files.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The practical version of this isn't "learn React." It's being comfortable opening a text editor, tweaking some CSS, or understanding why a "simple animation" might take half a sprint. It's being able to look at a code review and understand roughly what changed. It's speaking enough of the same language as engineers that a handoff becomes a conversation rather than a delivery.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          For me, it's never been about being a unicorn. It's about not designing things that fall apart the moment they meet a real codebase. That curiosity, the drive to understand how things actually work, is one of the most useful things you can bring to a team.
        </p>
      </div>

      <div className="mt-16 mb-12">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Recent Posts</h2>

        <div className="space-y-12">
          {blogPosts.filter(post => post.id !== 'designers-code').map((post) => (
            <Link
              key={post.id}
              to={`/${post.id}`}
              className="blog-post-link block text-left w-full group"
            >
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{post.preview}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
