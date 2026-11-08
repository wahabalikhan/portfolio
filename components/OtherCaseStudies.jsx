import { caseStudies } from '@/data/caseStudies';
import CaseStudyCard from '@/components/CaseStudyCard';

// The other case studies, from data/caseStudies.js: the same category first (design or
// building), then the rest, each in data order.
export default function OtherCaseStudies({ currentId }) {
  const current = caseStudies.find(s => s.id === currentId);
  const others = caseStudies.filter(s => s.id !== currentId);
  const ordered = [
    ...others.filter(s => s.category === current?.category),
    ...others.filter(s => s.category !== current?.category),
  ];
  if (ordered.length === 0) return null;

  return (
    <section className="mt-12 mb-12">
      <div className="border-t border-gray-200 pt-8 mb-8" />
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Other case studies</h2>
      <div className="other-cs-grid">
        {ordered.map(study => <CaseStudyCard key={study.id} study={study} compact />)}
      </div>
    </section>
  );
}
