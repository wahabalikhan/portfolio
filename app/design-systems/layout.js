import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  name: 'Design Systems and Documentation',
  path: '/design-systems/',
  description: "A design system without documentation is just a collection of components. Why documentation is what turns a component library into a shared language.",
});

export default function Layout({ children }) {
  return children;
}
