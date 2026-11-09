
'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import { caseStudies } from '@/data/caseStudies';
import Footer from '@/components/Footer';
import CommentPins from '@/components/CommentPins';
import FadeUp from '@/components/FadeUp';
import LinkedInPostCard from '@/components/LinkedInPostCard';
import CaseStudyCard from '@/components/CaseStudyCard';
import JustForFunCard from '@/components/JustForFunCard';
import GitHubContributions from '@/components/GitHubContributions';
import LoadingOverlay from '@/components/LoadingOverlay';
import { smoothScrollToElement } from '@/utils/smoothScroll';

// RealTechJobs' status on BobbyBuilds: 'building' (still amber dot) or 'live' (pulsing green).
// Set by hand: BobbyBuilds has no public status feed to read it from, so change this when
// RealTechJobs' status changes there.
const REALTECHJOBS_STATUS = 'building';

// "Things I've built" → Products: my own products, each with a one-line problem, one result
// (optional) and a link to try it.
const PRODUCTS = [
  {
    name: 'RealTechJobs',
    icon: '/images/icons/realtechjobs.svg',
    problem: "UK tech jobs straight from companies' own careers pages, every ad in one readable shape.",
    result: '1,800+ jobs from 290+ companies',
    url: 'https://realtechjobs.co.uk',
  },
  {
    name: 'BobbyBuilds',
    icon: '/images/icons/bobbybuilds.png',
    problem: 'My HQ for building in public: honest numbers, costs and progress for every product I make.',
    result: null,
    url: 'https://bobbybuilds.app',
  },
];

// "Things I've built" → Earlier projects: compact rows with one line and the main tools.
const EARLIER_PROJECTS = [
  {
    name: 'This portfolio',
    line: 'Built with Next.js, with live Figma-style comments and cursors for visitors.',
    tools: 'Next.js · Supabase · Cloudflare Pages',
    url: 'https://github.com/wahabalikhan/portfolio',
  },
  {
    name: 'Insurance brokerage system',
    line: 'Final-year project: designed in Figma, then built in PHP and MySQL.',
    tools: 'Figma · PHP · MySQL',
    url: 'https://github.com/wahabalikhan/final-FYP-Insurance_Brokerage_and_Management_System-19001546',
  },
  {
    name: 'Escape game',
    line: 'A 2D escape game in Java, built around object-oriented design.',
    tools: 'Java · IntelliJ',
    url: 'https://github.com/wahabalikhan/escape-game',
  },
  {
    name: "Bobby's Desserts",
    line: 'A desserts shop web app, designed in Figma, then built in PHP and MySQL.',
    tools: 'Figma · PHP · MySQL',
    url: 'https://github.com/wahabalikhan/bobbys-desserts',
  },
];

function GitHubMark() {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const designStudies = caseStudies.filter((s) => s.category === 'design');
const buildingStudies = caseStudies.filter((s) => s.category === 'building');

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('Design');

    const [activeTooltip, setActiveTooltip] = useState(null);
    const tooltipTimerRef = useRef(null);

    // Always start false so the server and client agree at hydration time.
    // suppressHydrationWarning keeps the server DOM value, so initialising from
    // sessionStorage in the lazy init produces opacity:0 that never gets updated.
    const [splashDone, setSplashDone] = useState(false);

    useEffect(() => {
      try {
        if (sessionStorage.getItem('splash_shown')) setSplashDone(true);
      } catch {}
    }, []);

    useEffect(() => {
      try {
        const section = sessionStorage.getItem('scrollToSection');
        if (section) {
          sessionStorage.removeItem('scrollToSection');
          requestAnimationFrame(() => requestAnimationFrame(() => smoothScrollToElement(section)));
        }
      } catch {}
    }, []);

    // Keep an open tooltip inside the window: if it would run off an edge, slide it back in
    // (its arrow stays over the word).
    useLayoutEffect(() => {
      const tip = document.querySelector('.hero-word-tooltip');
      if (!tip) return;
      tip.style.setProperty('--tip-shift', '0px');
      const r = tip.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const shift = r.right > vw - 12 ? vw - 12 - r.right : r.left < 12 ? 12 - r.left : 0;
      tip.style.setProperty('--tip-shift', `${Math.round(shift)}px`);
    }, [activeTooltip]);

    const showTooltip = (word) => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      setActiveTooltip(word);
      tooltipTimerRef.current = setTimeout(() => {
        setActiveTooltip(null);
        tooltipTimerRef.current = null;
      }, 1500);
    };
  // The container's width (850px) and padding are set for every page in globals.css (.max-w-3xl.mx-auto).
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:pt-10 relative home-page" role="application">
      <CommentPins page="home" activeTab={activeTab} />
      <div
        suppressHydrationWarning
        style={{
          opacity: splashDone ? 1 : 0,
          transform: splashDone ? 'translateY(0)' : 'translateY(10px)',
          transition: splashDone
            ? 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
            : 'none',
        }}
      >
      <FadeUp delay={0} className="flex items-stretch gap-4 hero-intro">
        <div className="hero-pic" style={{ position: 'relative', width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src="/images/profile.png"
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px)', transform: 'scale(1.15)' }}
          />
          <img
            src="/images/profile.png"
            alt="Wahab"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        <div className="hero-body">
          <h1 className="font-bold mb-2 text-gray-900" style={{ fontSize: '2.65rem', lineHeight: '1.12' }}>
            Hey <span className="nav-wave">👋</span> I'm Wahab (Bobby).{' '}<br className="hero-break" />I{' '}
            <span className="hero-accent-word hero-accent-design" onClick={() => showTooltip('design')}>
              {activeTooltip === 'design' && <span className="hero-word-tooltip">Figma, mostly 👀</span>}
              design
            </span>
            {' '}products and{' '}
            <span className="hero-accent-word hero-accent-ship" onClick={() => showTooltip('ship')}>
              {activeTooltip === 'ship' && <span className="hero-word-tooltip">With engineers at work, and with Claude Code on my own products.</span>}
              ship
            </span>
            {' '}them.
          </h1>

          <p className="text-gray-500 leading-relaxed mt-3 mb-2 reading-width" style={{ fontSize: '15.6px' }}>
            4+ years designing B2B data tools at Matillion and Adverity: research, interaction design and design systems that make complex workflows feel safe. I build my own products too.
          </p>

          <p className="text-base text-gray-700 leading-relaxed reading-width" style={{ fontSize: '15.6px' }}>
            <span className="font-bold">Product Designer</span> <span style={{ margin: '0 4px' }}>·</span> <span className="font-bold">B2B SaaS</span> <span style={{ margin: '0 4px' }}>·</span> BSc Computer Science <span style={{ margin: '0 4px' }}>·</span> NN/g UX Certified (ID: 1081116)
          </p>

          <p className="hero-status">
            <span className={`hero-status-dot is-${REALTECHJOBS_STATUS}`} aria-hidden="true" />
            <span>
              Currently building{' '}
              <a href="https://realtechjobs.co.uk" target="_blank" rel="noopener noreferrer">
                RealTechJobs ↗
              </a>
              , a UK job board with 1,800+ jobs, at{' '}
              <a href="https://bobbybuilds.app" target="_blank" rel="noopener noreferrer">
                BobbyBuilds ↗
              </a>
              .
            </span>
          </p>

        </div>
      </FadeUp>

      {/* Sections are separated by space alone (.home-divider, --home-section-gap in
          globals.css), down to the footer: no lines. */}
      <div id="case-studies">
        <FadeUp delay={0}>
        <div className="home-divider" aria-hidden="true" />
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Case studies</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('Design')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'Design' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            🎨 Design
          </button>
          <button
            onClick={() => setActiveTab('Built')}
            style={{ cursor: 'pointer' }}
            className={`tab-pill transition-all ${activeTab === 'Built' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            🛠️ Things I've built
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

        {/* Design: the design case studies, two to a row on wider screens. */}
        {activeTab === 'Design' && (
          <FadeUp className="home-cs-grid">
            {designStudies.map((study) => <CaseStudyCard key={study.id} study={study} />)}
          </FadeUp>
        )}

        {/* Things I've built: products, how I work, earlier projects. */}
        {activeTab === 'Built' && (
          <FadeUp>
            <section className="built-section" aria-labelledby="built-products">
              <h3 id="built-products" className="built-heading">Products</h3>
              <ul className="product-grid">
                {PRODUCTS.map((p) => (
                  <li key={p.name} className="product-card">
                    <div className="product-head">
                      <img src={p.icon} alt="" aria-hidden="true" className="product-icon" />
                      <h4 className="product-name">{p.name}</h4>
                    </div>
                    <p className="product-problem">{p.problem}</p>
                    {p.result && <p className="product-result">{p.result}</p>}
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="product-link">
                      Try it ↗<span className="sr-only"> ({p.name}, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="built-section" aria-labelledby="built-how">
              <h3 id="built-how" className="built-heading">How I work</h3>
              <div className="home-cs-grid">
                {buildingStudies.map((study) => <CaseStudyCard key={study.id} study={study} />)}
              </div>
            </section>

            <section className="built-section" aria-labelledby="built-earlier">
              <h3 id="built-earlier" className="built-heading">Earlier projects</h3>
              <div className="gh-contrib-small">
                <div className="gh-from">
                  <GitHubMark />
                  <span>from GitHub</span>
                </div>
                <GitHubContributions />
              </div>
              <ul className="project-rows">
                {EARLIER_PROJECTS.map((p) => (
                  <li key={p.name} className="project-row">
                    <div className="project-row-main">
                      <span className="project-row-name">{p.name}</span>
                      <span className="project-row-line">{p.line}</span>
                      <span className="project-row-tools">{p.tools}</span>
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-row-link">
                      GitHub ↗<span className="sr-only"> ({p.name}, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
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

      {/* Writing: compact rows, like the Journey on bobbybuilds.app. */}
      <FadeUp>
        <div className="home-divider" aria-hidden="true" />
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Writing</h2>
        <ol className="writing-list" aria-label="Writing">
          {blogPosts.map((post) => (
            <li key={post.id} className="writing-row">
              <span className="writing-dot" aria-hidden="true" />
              <p className="writing-meta">{post.date} <span aria-hidden="true">·</span> {post.readMinutes} min read</p>
              <h3 className="writing-title">
                <Link href={`/${post.id}`} className="writing-link">{post.title}</Link>
              </h3>
              <p className="writing-summary">{post.summary}</p>
            </li>
          ))}
        </ol>
      </FadeUp>

      <Footer />
      </div>
      <LoadingOverlay onExiting={() => setSplashDone(true)} />
    </div>
  );
}
