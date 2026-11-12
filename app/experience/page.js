'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import CommentPins from '@/components/CommentPins';

const BB_LINK = 'link-text text-blue-600';

const EXPERIENCE = [
  {
    company: 'Empathy Labs',
    role: 'UX Designer (part-time contract)',
    years: '2026 → Present',
    note: 'Redesigning a B2B assessment tool for specialist teams.',
    // Empathy Labs' own icon (its apple-touch-icon, 180px, from empathylabs.co.uk).
    logo: '/images/empathylabs.png',
    bullets: [
      'Complex results made clear: redesigning how teams see their results and what to act on, so the evidence behind every insight is easy to follow.',
      'Product logic for several user types: mapping one end-to-end process for different roles across a specialist team, including the edge cases and incomplete states a real team runs into.',
      'Information architecture: restructuring navigation so the places people return to are easy to find, and the steps of a process are clear, removing dead ends.',
      'Turning feedback into design: mapping stakeholder and usability feedback into the redesign, so every change traces back to the evidence behind it, and observing usability research sessions.',
    ],
  },
  {
    company: 'BobbyBuilds',
    role: 'Independent Product Designer',
    years: '2026 → Present',
    note: <>Designing and building my own products in public, with honest numbers for each, at <a href="https://bobbybuilds.app" target="_blank" rel="noopener noreferrer" className={BB_LINK}>bobbybuilds.app</a>.</>,
    logo: '/images/icons/bobbybuilds.png',
    bullets: [
      <><a href="https://realtechjobs.co.uk" target="_blank" rel="noopener noreferrer" className={BB_LINK}>RealTechJobs</a> (renamed from TechJobs): a UK job board with 1,800+ tech jobs taken straight from 290+ companies' own careers pages, designed and built with Claude Code.</>,
      'Set the AI up to succeed: studied 6,466 real job ads, then wrote the rules and examples it uses to sort every ad into the same sections.',
      'Checked the AI rather than trusting it: built an answer sheet of hand-checked ads, overruled the AI where it was confidently wrong, and tested it on ads it had never seen (79% correct with rules alone, between 87% and 92% with AI).',
      "Chose quality over volume, listing only jobs from employers' own sites, and improved the product through a UX audit.",
    ],
  },
  {
    company: 'Adverity',
    role: 'AI Product Designer',
    years: '2026 → 2026',
    note: 'Data and marketing intelligence platform. Role ended in a company restructuring.',
    logo: '/images/adverity.jpg',
    bullets: [
      'Helped get an AI-assisted design workflow from half-built to team-wide, so designers started from the live product instead of rebuilding screens from memory.',
      'Co-ran a workshop that got the design team set up and aligned on working closer to code.',
      'Fixed setup and documentation gaps, so the workflow was repeatable for the rest of the team.',
      'Shipped small front-end and copy changes through engineering review and tests, straight to customers.',
    ],
  },
  {
    company: 'Matillion',
    role: 'Product Designer',
    years: '2021 → 2026',
    note: 'Data pipeline and integration platform used by data engineers to build, run and manage data workflows at scale.',
    logo: '/images/matillion-logo.svg',
    bullets: [
      'Designed the Git diff interface for high-risk pipeline actions, achieving 34% more successful commits and 15% fewer error recoveries in the first 30 days.',
      'Built the ETL design system from scratch as sole designer, reducing design task completion time by 36.1%.',
      'Led research that reframed a stakeholder quick-win request into a validated service improvement, boosting stakeholder confidence by 12.3%.',
      'Contributed to the interaction design for Maia, Matillion\'s AI assistant: showing its reasoning, and previewing changes before they\'re made.',
      'Progressed from junior to mid-level, mentoring junior designers and working closely with engineering throughout.',
    ],
  },
  {
    company: 'The Lead Magnet Agency',
    role: 'UI/UX Design Intern',
    years: '2020 → 2021',
    logo: null,
    initials: 'LMA',
    color: '#6366f1',
    bullets: [
      'First professional design role.',
      'Supported UX research, prototyping, and iteration for client websites and digital campaigns, collaborating with senior designers to improve user journeys and task completion rates.',
    ],
  },
];

const testimonials = [
  {
    highlight: 'Thinking of hiring Wahab? Smart move, but make sure you have space for his inevitable growth.',
    quote: 'He was fundamental in design system work that enabled our team to build and ship consistent products faster. Many, including myself and our Principal UXD, were consistently surprised by his ability to immediately demonstrate rapid new learnings in his outputs.',
    name: 'Craig Barron',
    role: 'Experience Design Leader (ex-Matillion, hired and managed Wahab)',
    link: 'https://linkedin.com/in/craigbarronux',
    avatar: '/images/craig.jpeg',
  },
  {
    highlight: 'An exceptional product designer. His expertise in tackling complex design areas, such as variables and schemas, is invaluable.',
    quote: "Wahab consistently impresses with his ability to handle multiple complex projects while maintaining a high standard of work. He's become a confident and influential voice in design discussions, with strong stakeholder engagement and a key role in shaping the product.",
    name: 'Adam Males',
    role: 'Design Leader, building AI-native B2B products (ex-Matillion, managed Wahab directly)',
    link: 'https://linkedin.com/in/adam-males',
    avatar: '/images/adam.jpeg',
  },
  {
    highlight: 'I was particularly impressed by his initiative in developing a design system for one of our products that lacked one, demonstrating strategic thinking and a great eye for process improvement.',
    quote: 'Wahab brought a refreshing perspective to our team, consistently demonstrating thoughtfulness, curiosity, and a growth mindset. His self-learning skills enabled him to quickly understand complex topics and make a meaningful impact on whichever project he worked on.',
    name: 'José Viso',
    role: 'Staff Product Designer at Snowplow (senior colleague at Matillion)',
    link: 'https://linkedin.com/in/joseviso',
    avatar: '/images/jose.jpeg',
  },
];

function ExperienceItem({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="exp-item-header"
        style={{ display: 'flex', alignItems: 'center', columnGap: '0.75rem', padding: '0.625rem 0', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <ChevronRight
          size={14}
          style={{
            flexShrink: 0,
            color: '#9ca3af',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
        {job.logo ? (
          <img src={job.logo} alt={job.company} className="w-8 h-8 rounded flex-shrink-0" />
        ) : (
          <div style={{ width: 32, height: 32, borderRadius: 4, flexShrink: 0, background: job.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.5rem', fontWeight: 700 }}>{job.initials}</div>
        )}
        <span className="exp-company" style={{ fontWeight: 600, color: '#111827', fontSize: '1rem', whiteSpace: 'nowrap' }}>{job.company}</span>
        <span className="exp-role" style={{ color: '#6b7280', fontSize: '1rem', whiteSpace: 'nowrap' }}>{job.role}</span>
        <div className="exp-divider" style={{ flex: 1, borderBottom: '1px solid #d1d5db' }} />
        <span className="exp-years" style={{ color: '#9ca3af', fontSize: '1rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{job.years}</span>
      </div>

      {open && (
        <>
        {job.note && (
          <p style={{ margin: '0.125rem 0 0.5rem 2.75rem', color: '#6b7280', fontSize: '1rem', fontStyle: 'italic' }}>
            {job.note}
          </p>
        )}
        <ul style={{ margin: '0 0 0.75rem 2.75rem' }}>
          {job.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5" style={{ color: '#374151', lineHeight: '1.6', fontSize: '1rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#374151', flexShrink: 0, userSelect: 'none' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 relative experience-page" role="main">
      <CommentPins page="experience" />
      <FadeUp delay={100}>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Experience</h1>

        <div className="exp-list">
          {EXPERIENCE.map((job, i) => (
            <ExperienceItem key={i} job={job} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-8 text-gray-900">References</h2>

        <div className="space-y-10 mb-10">
          {testimonials.map((t) => (
            <div key={t.name}>
              <p className="text-gray-900 font-semibold italic mb-3">"{t.highlight}"</p>
              <p className="text-gray-700 leading-relaxed mb-3">{t.quote}</p>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <p className="text-gray-900 font-semibold">
                  {t.name}<span className="text-gray-500 font-normal">, {t.role}</span>
                </p>
              </div>
              <a
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 text-sm"
              >
                LinkedIn ↗
              </a>
            </div>
          ))}
        </div>
      </FadeUp>
      <Footer />
    </div>
  );
}
