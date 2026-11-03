import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

export const metadata = pageMetadata({
  name: 'AI Workflow',
  path: '/ai-workflow/',
  description: caseStudies.find(s => s.id === 'ai-workflow').description,
});

export default function Layout({ children }) {
  return children;
}
