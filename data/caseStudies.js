// One entry per case study. The home page cards, "Other case studies" and each page's
// search/link-preview metadata all read from here.
export const caseStudies = [
  {
    id: 'ai-workflow',
    title: 'The Designer Who Ships Code',
    description: 'How I contributed to bringing a closer-to-code design workflow to life at Adverity, collaborating on setup, getting it from half-built to team-wide, and using it to ship real changes through engineering review to production.',
    logo_src: '/images/adverity.jpg',
    company: 'Adverity',
    bg_src: '/images/ai_thumbnail.png',
    link: '/ai-workflow',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: [],
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'The Designer Who Ships Code',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'How I helped take Adverity’s closer-to-code design workflow from half-built to team-wide, then used it to ship real changes through engineering review.',
  },
  {
    id: 'git-diff',
    title: 'Designing confidence into a high-risk engineering workflow',
    description: 'Data engineers were committing changes they couldn’t see, leading to errors and lost trust in the tool. I redesigned the workflow to give them clarity before the point of no return. 34% more commits. 15% fewer resets.',
    logo_src: '/images/matillion-logo.svg',
    company: 'Matillion',
    bg_src: '/images/matillion-bg.png',
    link: '/git-diff',
    // Bold on the home page card. Each must appear word for word in the description.
    highlights: ['34% more commits.','15% fewer resets.'],
    // The case study page's H1, used as its browser-tab and search title.
    headline: 'Designing confidence into a high-risk engineering workflow (Git Diff)',
    // Search and link-preview description: under 160 characters.
    seoDescription: 'Data engineers were committing changes they couldn’t see. I redesigned the workflow to show them first: 34% more commits, 15% fewer resets.',
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
];
