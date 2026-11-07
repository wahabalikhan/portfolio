import { pageMetadata } from '@/lib/metadata';
import { caseStudies } from '@/data/caseStudies';

const study = caseStudies.find(s => s.id === 'git-diff');

export const metadata = pageMetadata({
  name: study.headline,
  path: '/git-diff/',
  description: study.seoDescription,
});

export default function Layout({ children }) {
  return children;
}
