import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  name: 'CV',
  path: '/cv/',
  description: 'CV for Wahab (Bobby) Khan, product designer: experience, skills and selected case studies.',
});

export default function Layout({ children }) {
  return children;
}
