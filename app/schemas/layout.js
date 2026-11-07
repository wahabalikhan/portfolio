import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

const study = caseStudies.find(s => s.id === 'schemas');

export const metadata = pageMetadata({
  name: study.headline,
  path: '/schemas/',
  description: study.seoDescription,
});

export default function Layout({ children }) {
  return children;
}
