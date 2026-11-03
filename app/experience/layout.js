import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  name: 'Experience',
  path: '/experience/',
  description: 'Where Wahab (Bobby) Khan has worked as a product designer, and what colleagues say about working together.',
});

export default function Layout({ children }) {
  return children;
}
