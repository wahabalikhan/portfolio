import { pageMetadata } from '@/lib/metadata';
import { blogPosts } from '@/data/blogPosts';

export const metadata = pageMetadata({
  name: 'Do Designers Need to Code?',
  path: '/designers-code/',
  description: blogPosts.find(p => p.id === 'designers-code').seoDescription,
});

export default function Layout({ children }) {
  return children;
}
