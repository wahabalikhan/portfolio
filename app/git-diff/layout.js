import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

export const metadata = pageMetadata({
  name: 'Git Diff',
  path: '/git-diff/',
  description: caseStudies.find(s => s.id === 'git-diff').description,
});

export default function Layout({ children }) {
  return children;
}
