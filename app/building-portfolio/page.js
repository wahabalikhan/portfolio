'use client';


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import BlogMeta from '@/components/BlogMeta';
import { blogPosts } from '@/data/blogPosts';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function BuildingPortfolioPage() {
  const router = useRouter();
  usePageTitle('Building this portfolio');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <FadeUp delay={100}>
      <BackButton onClick={() => router.back()} />

      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        Building this portfolio, or: what happens when a designer gets too deep into a codebase at 2am
      </h1>

      <BlogMeta date="June 20, 2026" />
      </FadeUp>

      <FadeUp delay={100}>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          I've always found portfolio sites uncomfortable to build. Too polished and they feel like a brochure. Too casual and they undersell the work. So I took the only logical approach: spent several weeks building mine from scratch while simultaneously questioning every decision I've ever made.
        </p>

        <div style={{
          width: '100%', borderRadius: 8, overflow: 'hidden',
          marginTop: '0.5rem', marginBottom: '1.5rem',
          border: '1px solid rgba(0,0,0,0.09)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}>
          <img
            src="/images/portfolio_screenshot.png"
            alt="Portfolio screenshot"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          This version is built with Vite and React. I chose it partly because it made sense technically, and partly because I wanted to understand what I was actually building rather than hiding behind a template. Version control lives in GitHub, partly for safety, and partly because pushing commits to a repo called "portfolio" at 2am feels right in a way that's hard to explain.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The bit I'm most proud of is the comment system. It's built on Supabase with real-time presence. Visitors can drop Figma-style comment pins anywhere on the page, see live cursors of other people browsing at the same time, and leave notes that persist. I built it because I wanted the portfolio itself to be a proof of concept, not just a container for them.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Since writing this the portfolio has kept evolving. Moved from Vite to Next.js 15. Moved from GoDaddy cPanel to Cloudflare Pages with auto-deploys on every push to main. Debugged a cross-browser positioning issue that cost me a day and taught me more about getBoundingClientRect than I ever wanted to know. The full story is in the Extras tab if you want the unfiltered version.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Claude Code did a lot of the implementation heavy lifting. I'd describe what I wanted, review what came back, push back when it wasn't right, and iterate. It felt less like coding and more like designing with a very fast implementation partner. The decisions were mine. The 2am hours were entirely my fault.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The honest version of building with AI isn't magic. It's knowing enough to ask the right questions, recognising when the output is wrong, and caring enough about the details to keep going until it feels right. That's not so different from design, really. Just with more terminal errors.
        </p>
      </div>

      <div className="mt-16 mb-12">
        <section className="border-t border-gray-200 pt-8 pb-0" />
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Recent Posts</h2>

        <div className="space-y-12">
          {blogPosts.filter(post => post.id !== 'building-portfolio').map((post) => (
            <Link
              key={post.id}
              href={`/${post.id}`}
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

      </FadeUp>
      <Footer />
    </div>
  );
}
