import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

export const metadata = pageMetadata({
  name: 'Schemas',
  path: '/schemas/',
  description: caseStudies.find(s => s.id === 'schemas').description,
});

export default function Layout({ children }) {
  return children;
}
