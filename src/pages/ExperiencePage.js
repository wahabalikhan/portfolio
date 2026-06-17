import React from 'react';
import Footer from '../components/Footer';
import CommentPins from '../components/CommentPins';
import { usePageTitle } from '../hooks/usePageTitle';

const experience = [
  {
    title: 'AI Product Designer',
    company: 'Adverity',
    logo: '/images/adverity.jpg',
    dates: 'Apr 2026 – Jun 2026',
    location: 'Remote / Vienna, Austria',
    context: 'Data and marketing intelligence platform',
    bullets: [
      'Designed AI-powered features for a data and marketing intelligence platform used by analytics and BI teams, working across discovery, interaction design, and delivery.',
      'Built a closer-to-code design workflow using Claude Code, VS Code, and version control (Git), moving between Figma and the live codebase to prototype and validate design decisions against the real product, with changes reviewed by engineers before shipping.',
      'Collaborated with engineering to ensure design intent translated cleanly into production UI throughout.',
    ],
  },
  {
    title: 'Product Designer',
    company: 'Matillion',
    logo: '/images/matillion-logo.svg',
    dates: 'Jul 2021 – Apr 2026',
    location: 'Manchester, UK',
    context: 'Data pipeline and ETL platform for data engineers',
    progression: 'Joined at junior level and progressed to mid-level over just under five years',
    subtiers: [
      {
        label: 'Mid-level Product Designer, May 2025 – Apr 2026',
        bullets: [
          'Led end-to-end design of complex, developer-facing features across the full lifecycle: discovery, problem framing, interaction design, prototyping, usability testing, and implementation support.',
          'Designed a side-by-side comparison interface for high-risk pipeline actions, making changes transparent and reviewable before actioning. Achieved a 34% increase in successful commits and 15% reduction in error recoveries. Prototyped directly with engineers to validate feasibility and refine the interaction model under real technical constraints.',
          'Led design for pipeline variables and schema features, complex multi-step workflows for technical users where clarity, error prevention, and system transparency were critical. Conducted user interviews that reframed scope from a surface feature to a broader service improvement, boosting stakeholder confidence by 12.3% and preventing misdirected development effort.',
          'Partnered closely with front-end engineers on interaction behaviours, states, edge cases, and technical constraints, attending implementation reviews regularly to close the gap between design intent and shipped product.',
          'Mentored junior designers and placement students through design critiques, pairing sessions, and guidance on interaction design, accessibility, and systems thinking.',
          'Used usability testing, behavioural analytics, and support data to drive iterative improvements, grounding design decisions in evidence throughout.',
        ],
      },
      {
        label: 'Associate Product Designer, Sep 2023 – May 2025',
        bullets: [
          'Took end-to-end ownership of features from concept through release across multiple core workflows, balancing user needs, technical feasibility, and delivery speed in a fast-moving agile environment.',
          'Translated user research findings into actionable design decisions, validated through structured usability testing and iterated based on observed behaviour and analytics data.',
          'Worked in a multi-disciplinary team alongside product managers, engineers, and researchers, driving design decisions forward while staying closely aligned with engineering on implementation quality and handover.',
          'Took ownership of evolving and maintaining the ETL design system at scale, expanding component coverage, improving accessibility (WCAG 2.1) compliance, and onboarding other designers and engineers onto the system as it matured.',
        ],
      },
      {
        label: 'Junior Product Designer, Jul 2021 – Sep 2023',
        bullets: [
          'Built Matillion\'s ETL design system from scratch as the sole designer: components, variants, auto layout, patterns, edge cases, and documentation. Reduced design task completion time by 36.1%, measured through structured before/after task testing with the design team. Mapped components to the Sencha GXT framework and introduced custom components where the framework fell short.',
          'Embedded UX culture into the engineering team. Ran sessions on UX fundamentals, introduced the design system as a shared working resource, and established a rhythm where engineers engaged with design thinking earlier in the process.',
          'Led interaction design for key developer-facing features, simplifying complex multi-step workflows for technical users.',
          'Conducted usability testing and iterated designs based on observed user behaviour, helping embed an evidence-based approach to design decisions across the team.',
        ],
      },
    ],
  },
  {
    title: 'UI/UX Design Intern',
    company: 'The Lead Magnet Agency',
    logo: null,
    dates: 'Oct 2020 – Jan 2021',
    location: 'London, UK',
    context: 'Digital agency, first professional design role',
    bullets: [
      'Supported UX research, prototyping, and iteration for client websites and digital campaigns.',
      'Collaborated with senior designers to improve user journeys and task completion rates.',
    ],
  },
];

const testimonials = [
  {
    highlight: 'Thinking of hiring Wahab? Smart move — but make sure you have space for his inevitable growth.',
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
    highlight: 'I was particularly impressed by his initiative in developing a design system for one of our products that lacked one — demonstrating strategic thinking and a great eye for process improvement.',
    quote: 'Wahab brought a refreshing perspective to our team, consistently demonstrating thoughtfulness, curiosity, and a growth mindset. His self-learning skills enabled him to quickly understand complex topics and make a meaningful impact on whichever project he worked on.',
    name: 'José Viso',
    role: 'Staff Product Designer at Snowplow (senior colleague at Matillion)',
    link: 'https://linkedin.com/in/joseviso',
    avatar: '/images/jose.jpeg',
  },
];

export default function ExperiencePage() {
  usePageTitle('Experience');
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-28 relative">
      <CommentPins page="experience" showPresets={false} />
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Experience</h1>

      <div className="space-y-12 mb-16">
        {experience.map((job) => (
          <div key={job.title} className="flex gap-4 items-start">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-10 h-10 rounded object-cover flex-shrink-0 mt-0.5"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg leading-snug">
                {job.title}
                {job.company && <span className="text-gray-500 font-normal"> · {job.company}</span>}
              </h3>

              <p className="text-sm text-gray-500 mt-0.5 mb-1">
                {job.dates}
                {job.location && <span className="text-gray-500"> · {job.location}</span>}
              </p>

              <p className="text-sm text-gray-400 italic mb-3">{job.context}</p>

              {job.progression && (
                <p className="text-sm text-gray-500 italic mb-3">
                  {job.progression}
                </p>
              )}

              {job.subtiers ? (
                <div className="space-y-5">
                  {job.subtiers.map((tier, ti) => (
                    <div key={ti}>
                      <p className="text-sm font-semibold text-gray-700 mb-2">{tier.label}</p>
                      <ul className="space-y-2">
                        {tier.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-gray-700 leading-relaxed">
                            <span className="text-gray-900 flex-shrink-0 select-none">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {job.bullets && job.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-700 leading-relaxed">
                      <span className="text-gray-900 flex-shrink-0 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="border-t border-gray-200 pt-10 pb-0" />
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
                {t.name} <span className="text-gray-500 font-normal">— {t.role}</span>
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

      <Footer />
    </div>
  );
}
