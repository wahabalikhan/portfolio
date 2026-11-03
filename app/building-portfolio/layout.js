import { pageMetadata } from '@/lib/metadata';
import { blogPosts } from '@/data/blogPosts';

export const metadata = pageMetadata({
  name: 'Building This Portfolio',
  path: '/building-portfolio/',
  description: blogPosts.find(p => p.id === 'building-portfolio').preview,
});

export default function Layout({ children }) {
  return children;
}
