import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

const study = caseStudies.find(s => s.id === 'techjobs');

export const metadata = pageMetadata({
  name: study.headline,
  path: '/techjobs/',
  description: study.seoDescription,
});

export default function Layout({ children }) {
  return children;
}
