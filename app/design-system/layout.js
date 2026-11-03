import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

export const metadata = pageMetadata({
  name: 'Design System',
  path: '/design-system/',
  description: caseStudies.find(s => s.id === 'design-system').description,
});

export default function Layout({ children }) {
  return children;
}
