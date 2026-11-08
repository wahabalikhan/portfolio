// One entry per case study. The home page cards, "Other case studies" and each page's
// search/link-preview metadata all read from here.
// Order here is the order on the home page (Design tab, then "How I work") and in each page's
// "Other case studies" (same category first).
export const caseStudies = [
  {
    id: 'git-diff',
    // 'design': the Design tab. 'building': "Things I've built" (How I work).
    category: 'design',
    title: 'Making risky commits feel safe',
    // Card text: up to two lines, including the headline result.
    description: 'Every change shown before committing, for 34% more successful commits.',
    // Shown semibold in the main text colour; must appear word for word in the description (null: none).
    metric: '34% more successful commits',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/matillion-bg.png',
    link: '/git-diff',
    // The browser-tab and search title (usually the page's H1, or a shorter version of it).
    headline: 'Making risky commits feel safe',
    // Search and link-preview description: under 160 characters.
    seoDescription: "How I designed Git Diff at Matillion, so data engineers see every change before committing: 34% more successful commits in the first 30 days.",
  },
  {
    id: 'design-system',
    // 'design': the Design tab. 'building': "Things I've built" (How I work).
    category: 'design',
    title: 'From Framework to Design System',
    // Card text: up to two lines, including the headline result.
    description: 'Built from scratch as the sole designer. Design tasks 36.1% faster.',
    // Shown semibold in the main text colour; must appear word for word in the description (null: none).
    metric: 'Design tasks 36.1% faster',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/ds.png',
    link: '/design-system',
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'From Framework to Design System',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'Building Matillion’s ETL design system from scratch, and embedding UX practice in how the engineering team worked. Design tasks got 36.1% faster.',
  },
  {
    id: 'schemas',
    // 'design': the Design tab. 'building': "Things I've built" (How I work).
    category: 'design',
    title: 'Asking why before adding search',
    // Card text: up to two lines, including the headline result.
    description: 'Asking why led to a better roadmap, and stakeholder confidence rose 12.3%.',
    // Shown semibold in the main text colour; must appear word for word in the description (null: none).
    metric: 'stakeholder confidence rose 12.3%',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/schema_bg.png',
    link: '/schemas',
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'Asking why before adding search',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'A stakeholder asked for a search bar. I asked why. A month of research redirected the roadmap to the real problem. Stakeholder confidence up 12.3%.',
  },
  {
    id: 'ai-workflow',
    // 'design': the Design tab. 'building': "Things I've built" (How I work).
    category: 'building',
    title: 'Designing closer to the real product',
    // Card text: up to two lines, including the headline result.
    description: 'Starting designs from the live product, not from memory.',
    // Shown semibold in the main text colour; must appear word for word in the description (null: none).
    metric: null,
    logo_src: '/images/adverity.jpg',
    company: 'Adverity',
    bg_src: '/images/ai_thumbnail.png',
    link: '/ai-workflow',
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'Designing closer to the real product',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'How I helped get a design-to-code workflow working at Adverity, so designs started from the live product and ideas reached engineers as working prototypes.',
  },
];
