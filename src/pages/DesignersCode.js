import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';

export default function DesignersCode() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-5xl font-bold mb-4 text-gray-900">
        Should designers learn how to code?
      </h1>

      <p className="text-gray-600 mb-12">October 20, 2025</p>

            <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          This question pops up every few months, sometimes as a debate and sometimes as a humble brag. The truth is, there's no single answer. But after a few years of designing with one hand in Figma and the other occasionally buried in VS Code, I've come to believe this: designers don't need to code, but learning to think in code changes everything.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          When I started out, I saw design and development as two separate worlds, the dreamers and the builders. Over time, especially working on more complex systems, that line started to fade. Understanding how components behave, how states change, and how data flows doesn't make me less of a designer; it makes me a better one.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Knowing how to code isn't about shipping production apps. It's about empathy. It's understanding why a "simple animation" might take half a sprint, or why design system tokens actually matter. It's about speaking the same language as engineers so collaboration feels less like a handoff and more like building something together.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          And here's the real benefit: once you start coding, you stop designing in screenshots. You start designing in flow, thinking about interactions, constraints, performance, and behaviour. That awareness leads to cleaner, more realistic designs that ship faster and hold up better.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          You don't need to become a front-end developer, but it helps to be comfortable opening a text editor, tweaking some CSS, or experimenting with logic in a sandbox. Even a little bit of code literacy changes how you see your craft.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          For me, it's not about being a "unicorn." It's about curiosity. And that curiosity, the drive to understand how things actually work, is one of the most powerful design tools you can have.
        </p>
      </div>

      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Posts</h2>

        <div className="space-y-8">
          {blogPosts.filter(post => post.id !== 'designers-code').map((post) => (
            <Link
              key={post.id}
              to={`/${post.id}`}
              className="block text-left w-full"
            >
              <h3 className="text-blue-600 text-xl mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700">{post.preview}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}