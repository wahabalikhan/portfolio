import React from 'react';
import Footer from '../components/Footer';
import CommentPins from '../components/CommentPins';
import { usePageTitle } from '../hooks/usePageTitle';

const experience = [
  {
    title: 'AI Product Designer',
    company: 'Adverity',
    logo: '/images/adverity.jpg',
    dates: '2025 – Present',
    description: "Designing AI-powered features for a data and marketing intelligence platform used by analytics and BI teams. Working closer to the codebase than ever — moving between Figma and live code to validate design decisions against the real product.",
  },
  {
    title: 'Product Designer',
    company: 'Matillion',
    logo: '/images/matillion-logo.svg',
    dates: '2020 – 2025',
    description: 'Joined as a placement designer and progressed through to mid-level under five years, designing for a complex data pipeline product used by data engineers.',
    bullets: [
      'Built and maintained the ETL design system from scratch — components, patterns, and documentation — cutting design task time by 36.1%.',
      'Designed complex interaction-heavy features including pipeline variables, schemas, and editor components for technical users.',
      'Bridged design and engineering, embedding UX practice into how the engineering team worked.',
    ],
  },
  {
    title: 'UI/UX Design Intern',
    company: null,
    logo: null,
    dates: '2020 · 3 months',
    description: 'First professional design role. Built a foundation in user-centred design, interface work, and working within a product team.',
  },
];

const testimonials = [
  {
    highlight: 'Thinking of hiring Wahab? Smart move — but make sure you have space for his inevitable growth.',
    quote: 'He was fundamental in design system work that enabled our team to build and ship consistent products faster. Many, including myself and our Principal UXD, were consistently surprised by his ability to immediately demonstrate rapid new learnings in his outputs.',
    name: 'Craig Barron',
    role: 'Experience Design Leader (ex-Matillion, hired and managed Wahab)',
    link: 'https://linkedin.com/in/craigbarronux',
  },
  {
    highlight: 'An exceptional product designer. His expertise in tackling complex design areas, such as variables and schemas, is invaluable.',
    quote: "Wahab consistently impresses with his ability to handle multiple complex projects while maintaining a high standard of work. He's become a confident and influential voice in design discussions, with strong stakeholder engagement and a key role in shaping the product.",
    name: 'Adam Males',
    role: 'Design Leader, building AI-native B2B products (ex-Matillion, managed Wahab directly)',
    link: 'https://linkedin.com/in/adam-males',
  },
  {
    highlight: 'I was particularly impressed by his initiative in developing a design system for one of our products that lacked one — demonstrating strategic thinking and a great eye for process improvement.',
    quote: 'Wahab brought a refreshing perspective to our team, consistently demonstrating thoughtfulness, curiosity, and a growth mindset. His self-learning skills enabled him to quickly understand complex topics and make a meaningful impact on whichever project he worked on.',
    name: 'José Viso',
    role: 'Staff Product Designer at Snowplow (senior colleague at Matillion)',
    link: 'https://linkedin.com/in/joseviso',
  },
];

export default function ExperiencePage() {
  usePageTitle('Experience');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <CommentPins page="experience" />
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Experience</h1>

      <div className="space-y-10 mb-16">
        {experience.map((job) => (
          <div key={job.title} className="flex gap-4 items-start">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {job.title}{job.company && <> · {job.company}</>}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{job.dates}</p>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
              {job.bullets && (
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2 space-y-1">
                  {job.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
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
            <p className="text-gray-900 font-semibold">
              {t.name} <span className="text-gray-500 font-normal">— {t.role}</span>
            </p>
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
