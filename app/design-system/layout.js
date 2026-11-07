import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

const study = caseStudies.find(s => s.id === 'design-system');

export const metadata = pageMetadata({
  name: study.headline,
  path: '/design-system/',
  description: study.seoDescription,
});

export default function Layout({ children }) {
  return children;
}
