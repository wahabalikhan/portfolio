import React from 'react';
import FadeUp from '../components/FadeUp';
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
      'Joined an in-progress AI-assisted design workflow initiative and contributed to getting it from a half-built process to a documented, team-wide workflow, working through setup, debugging, and refining the step-by-step guide collaboratively with another designer.',
      'Worked through environment setup hands-on: resolving Docker configuration issues, debugging dependency errors, and feeding solutions back into the documentation so the process was repeatable for others.',
      'Took part in a team workshop mapping AI into design workflows, contributing to how the team understood and adopted the new process.',
      'Used the workflow to ship real changes: making code and copy changes via VS Code and Claude Code, going through engineering review, passing tests, and seeing changes merged to production in front of customers.',
      'Contributed to the browser-to-Figma process, grounding design work in live product pages rather than rebuilding from memory.',
    ],
  },
  {
    title: 'Product Designer',
    company: 'Matillion',
    logo: '/images/matillion-logo.svg',
    dates: 'Jul 2021 – Mar 2026',
    location: 'Manchester, UK',
    context: 'Data pipeline and ETL platform for data engineers',
    progression: 'Joined at junior level and progressed to mid-level in under five years',
    bullets: [
      'Designed the Git diff interface for high-risk pipeline actions, achieving a 34% increase in successful commits and 15% reduction in error recoveries.',
      'Built the ETL design system from scratch as sole designer, reducing design task completion time by 36.1%.',
      'Led research that reframed a stakeholder quick-win request into a validated service improvement, boosting stakeholder confidence by 12.3%.',
      'Progressed from junior to mid-level over five years, mentoring junior designers and working closely with engineering throughout.',
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

export default function ExperiencePage() {
  usePageTitle('Experience');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 relative experience-page" role="main">
      <CommentPins page="experience" showPresets={false} />
      <FadeUp delay={100}>
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

              {job.paragraph ? (
                <p className="text-gray-700 leading-relaxed">{job.paragraph}</p>
              ) : job.subtiers ? (
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
