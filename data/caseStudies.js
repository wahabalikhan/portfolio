// One entry per case study. The home page cards, "Other case studies" and each page's
// search/link-preview metadata all read from here.
// Order here is the order on the home page's Design tab and in "Other case studies".
export const caseStudies = [
  {
    id: 'git-diff',
    title: 'Making risky commits feel safe',
    description: "Data engineers couldn't see what they were about to commit. I designed a side-by-side comparison that shows every change first. 34% more successful commits and 15% fewer error recoveries in the first 30 days.",
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/git-diff-card.png',
    link: '/git-diff',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: ['34% more successful commits and 15% fewer error recoveries in the first 30 days.'],
    // The browser-tab and search title (usually the page's H1, or a shorter version of it).
    headline: 'Making risky commits feel safe',
    // Search and link-preview description: under 160 characters.
    seoDescription: "How I designed Git Diff at Matillion, so data engineers see every change before committing: 34% more successful commits in the first 30 days.",
  },
  {
    id: 'design-system',
    title: 'From Framework to Design System',
    description: '36.1% reduction in design task completion time, achieved by building Matillion’s ETL design system from scratch: components, patterns, and documentation, while embedding UX practice into how the engineering team worked.',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/ds.png',
    link: '/design-system',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: ['36.1% reduction in design task completion time'],
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'From Framework to Design System',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'Building Matillion’s ETL design system from scratch, and embedding UX practice in how the engineering team worked. Design tasks got 36.1% faster.',
  },
  {
    id: 'schemas',
    title: 'Reframing a quick-win request into a user-validated strategy',
    description: 'A stakeholder asked for a search bar. I asked why. A month of research prevented the wrong thing from being built and redirected the roadmap toward the real problem. Stakeholder confidence up 12.3%.',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/schema_bg.png',
    link: '/schemas',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: ['Stakeholder confidence up 12.3%.'],
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'Reframing a quick-win request into a user-validated strategy',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'A stakeholder asked for a search bar. I asked why. A month of research redirected the roadmap to the real problem. Stakeholder confidence up 12.3%.',
  },
  {
    id: 'ai-workflow',
    title: 'Designing closer to the real product',
    description: 'How I helped get a design-to-code workflow working at Adverity, so designs started from the live product and ideas reached engineers as working prototypes.',
    logo_src: '/images/adverity.jpg',
    company: 'Adverity',
    bg_src: '/images/ai_thumbnail.png',
    link: '/ai-workflow',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: [],
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'Designing closer to the real product',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'How I helped get a design-to-code workflow working at Adverity, so designs started from the live product and ideas reached engineers as working prototypes.',
  },
];
