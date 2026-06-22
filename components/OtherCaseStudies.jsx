import Link from 'next/link';
import { caseStudies } from '@/data/caseStudies';

export default function OtherCaseStudies({ currentId }) {
  const others = caseStudies.filter(s => s.id !== currentId);
  if (others.length === 0) return null;

  return (
    <section className="mt-12 mb-12">
      <div className="border-t border-gray-200 pt-8 mb-8" />
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Other case studies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' }}>
        {others.map(study => (
          <Link key={study.id} href={study.link} className="case-study-link block group" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="cs-thumb" style={{ height: '180px', aspectRatio: 'unset', marginTop: 0, marginBottom: '0.75rem' }}>
              <img src={study.bg_src} alt={study.title} />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontSize: '0.875rem', lineHeight: 1.4, marginBottom: '0.25rem' }}>
              {study.title}
            </h3>
            <p className="text-gray-500" style={{ fontSize: '0.8125rem', lineHeight: 1.4, marginBottom: '0.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {study.description}
            </p>
            <span className="text-blue-600 group-hover:underline" style={{ fontSize: '0.75rem', fontWeight: 500, marginTop: 'auto' }}>
              View case study
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
