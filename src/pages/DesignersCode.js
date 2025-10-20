import React from 'react';
import BackButton from '../components/BackButton';
import { blogPosts } from '../data/blogPosts';

export default function KeepingBarHighPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />

      <h1 className="text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'monospace' }}>
        Should designers learn how to code?
      </h1>

      <p className="text-gray-600 mb-12">June 18, 2025</p>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          This question pops up every few months — sometimes as a debate, sometimes as a humble-brag. The truth? There’s no single answer. But after a few years designing with one hand on Figma and the other occasionally buried in VS Code, I’ve landed on this: designers don’t need to code — but learning to think in code changes everything.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          When I first started, I treated design and development as two separate worlds: the dreamers and the builders. But the more I worked on complex systems, the more that line blurred. I realised that understanding how components behave, how states change, and how data flows doesn’t make me less of a designer — it makes me a better one.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Knowing how to code isn’t about writing production-ready apps. It’s about empathy.
          It’s about understanding why your “simple animation” request might take half a sprint, or why a design system token actually matters. It’s about communicating with engineers in their language, so collaboration feels less like a handoff and more like a conversation.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          And here’s the secret benefit: once you start coding, you stop designing in screenshots. You start designing in flow — thinking about interactions, constraints, performance, and behaviour. That awareness shapes cleaner, more realistic designs that ship faster and break less.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          So no, you don’t need to be a front-end developer. But you should get comfortable opening a text editor, tweaking some CSS, or prototyping logic in a sandbox. Even a tiny bit of code literacy changes how you see your craft.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          For me, it’s not about being a “unicorn.” It’s about curiosity.
          And that curiosity — to understand how things actually work — is one of the most powerful design tools you can have.
        </p>
      </div>

      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Posts</h2>

        <div className="space-y-8">
          {blogPosts.filter(post => post.id !== 'designers-code').map((post) => (
            <button
              key={post.id}
              onClick={() => setCurrentPage(post.id)}
              className="block text-left w-full"
            >
              <h3 className="text-blue-600 hover:underline text-xl font-semibold mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700">{post.preview}</p>
            </button>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-8 pb-12">
        <p className="text-gray-600 text-sm">
          Made with 🫶 using my current coding knowledge, Claude, VS Code Copilot and anything else I got my hands on! © Wahab Ali Khan 2025
        </p>
      </footer>
    </div>
  );
}