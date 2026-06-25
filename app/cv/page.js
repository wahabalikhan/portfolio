'use client';

import { useRouter } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import { usePageTitle } from '@/hooks/usePageTitle';

const EXPERIENCE = [
  {
    role: 'AI Product Designer',
    company: 'Adverity',
    dates: '04/2026 – 06/2026',
    location: 'Remote, Vienna',
    context: 'Data and marketing intelligence platform for analytics and marketing teams',
    bullets: [
      'Designed AI-powered features for analytics and marketing users, working across discovery, interaction design, and delivery at the intersection of data workflows and AI tooling.',
      'Contributed to an AI-assisted design-to-code workflow using Claude Code, VS Code, and Git, moving between Figma and the live codebase to validate design decisions against the real product, with engineers reviewing changes before shipping.',
      'Focused on helping users understand AI-driven outputs and maintain trust and control over automated processes.',
    ],
  },
  {
    role: 'Mid-level Product Designer',
    company: 'Matillion',
    dates: '05/2025 – 04/2026',
    location: 'Manchester, UK',
    context: 'Data pipeline and integration platform for data engineers',
    bullets: [
      'Led end-to-end design of complex, multi-step workflow features across the full lifecycle: discovery, problem framing, interaction design, prototyping, usability testing, and implementation support.',
      'Designed a side-by-side comparison interface for high-risk pipeline actions, making system changes visible and reviewable before users committed to them. 34% increase in successful workflow completions and 15% reduction in error recovery actions.',
      'Conducted qualitative user research with five data engineers to reframe a stakeholder quick-win request. Reframed scope, redirected roadmap, boosted stakeholder confidence by 12.3%.',
      'Designed for Maya, Matillion\'s AI assistant: surfacing reasoning transparently, previewing changes before they were made, and giving users full visibility and control before any action was taken.',
      'Partnered closely with engineers on interaction behaviours, states, edge cases, and technical constraints, attending implementation reviews to close the gap between design intent and shipped product.',
      'Mentored junior designers through design critiques, pairing sessions, and guidance on interaction design, accessibility, and systems thinking.',
    ],
  },
  {
    role: 'Associate Product Designer',
    company: 'Matillion',
    dates: '09/2023 – 05/2025',
    location: 'Manchester, UK',
    context: null,
    bullets: [
      'Took end-to-end ownership of features across multiple core workflows, balancing user needs, technical feasibility, and delivery speed in a fast-moving agile environment.',
      'Evolved and maintained the design system at scale, expanding component coverage, improving accessibility (WCAG 2.1) compliance, and onboarding designers and engineers onto the system as it matured.',
      'Built scalable UI patterns that had to serve multiple teams, multiple workflows, and multiple contexts simultaneously.',
      'Worked in a multi-disciplinary team alongside product managers, engineers, and researchers, driving design decisions forward while staying closely aligned with engineering on implementation quality.',
    ],
  },
  {
    role: 'Junior Product Designer',
    company: 'Matillion',
    dates: '07/2021 – 09/2023',
    location: 'Manchester, UK',
    context: null,
    bullets: [
      'Built Matillion\'s ETL design system from scratch as the sole designer: components, variants, auto layout, patterns, edge cases, and documentation. Reduced design task completion time by 36.1%, measured through structured before/after task testing.',
      'Embedded UX practice into the engineering team through sessions on fundamentals, shared design system resources, and establishing a working rhythm where engineers engaged with design thinking earlier in the process.',
      'Led interaction design for key developer-facing features, simplifying complex multi-step workflows for technical users.',
      'Conducted usability testing and iterated designs based on observed behaviour, embedding an evidence-based approach to design decisions across the team.',
    ],
  },
  {
    role: 'UI/UX Design Intern',
    company: 'The Lead Magnet Agency',
    dates: '10/2020 – 01/2021',
    location: 'London, UK',
    context: null,
    bullets: [
      'Supported UX research, prototyping, and iteration for client websites and digital campaigns.',
      'Collaborated with senior designers to improve user journeys and task completion rates.',
    ],
  },
];

const CASE_STUDIES = [
  { title: 'The Designer Who Ships Code', company: 'Adverity', desc: 'Contributed to a closer-to-code design workflow using Claude Code, VS Code, and Git. Real changes reviewed by engineers and shipped to production.' },
  { title: 'Designing confidence into a high-risk workflow', company: 'Matillion', desc: 'Data engineers were committing pipeline changes they could not see. Redesigned the workflow with a side-by-side comparison view. 34% more successful completions. 15% fewer error recoveries.' },
  { title: 'From Framework to Design System', company: 'Matillion', desc: 'Built the full component library, patterns, and documentation from scratch as sole designer. 36.1% reduction in design task completion time.' },
  { title: 'Reframing a quick-win request into a user-validated strategy', company: 'Matillion', desc: 'A stakeholder asked for search. Five user interviews later the problem was schema usability end-to-end. Stakeholder confidence up 12.3%.' },
];

const SKILLS = [
  { label: 'Design', items: 'Product design · Interaction design · End-to-end workflow design · Rapid prototyping (Figma, code) · Usability testing · Design systems · Component libraries · Accessibility (WCAG 2.1)' },
  { label: 'Research', items: 'User interviews · Qualitative research · Behavioural analytics · Qual and quant synthesis · Metrics-driven iteration' },
  { label: 'Collaboration', items: 'Agile delivery · Multi-disciplinary teams · Engineering partnership · Stakeholder alignment · Mentoring' },
  { label: 'Tools', items: 'Figma · FigJam · Miro · Confluence · Jira · Heap · Pendo · UserTesting · Claude Code · VS Code · Git' },
  { label: 'Engineering', items: 'HTML · CSS · JavaScript · React fundamentals · Git / GitHub · Supabase · Working in a live codebase' },
  { label: 'Domains', items: 'Complex B2B SaaS · Workflow and integration products · Data platform tooling · AI-powered features · Design-to-code workflows' },
  { label: 'Soft Skills', items: 'Consensus-building · Clear communication · Handling ambiguity · Decisive under ambiguity · Evidence-based mindset' },
];

export default function CVPage() {
  usePageTitle('CV');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <FadeUp delay={100}>

      {/* Header */}
      <h1 className="font-bold text-gray-900" style={{ fontSize: '2.5rem', lineHeight: 1.15, marginBottom: '0.25rem' }}>
        <span className="text-blue-600">Wahab Ali Khan</span>
      </h1>
      <p className="text-gray-900 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Product Designer</p>
      <p className="text-gray-500" style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>
        wahab-ali-khan@hotmail.com · 447411118708 · Leeds/Bradford, UK
      </p>
      <p className="text-gray-500" style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        <a href="https://linkedin.com/in/wahabalikhan" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">linkedin.com/in/wahabalikhan</a>
        {' · '}
        <a href="https://wahabalikhan.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">wahabalikhan.com</a>
      </p>
      <a
        href="/cv_wahab_ali_khan.pdf"
        download="CV_Wahab_Ali_Khan.pdf"
        className="inline-flex items-center gap-2 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:border-gray-400 transition-colors"
        style={{ marginBottom: '2.5rem', display: 'inline-flex' }}
      >
        Download CV (PDF)
      </a>

      {/* Profile */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Profile</h2>
        <p className="text-gray-700 leading-relaxed">
          Product Designer with 4+ years designing workflow and integration products for technical users in B2B SaaS. I specialise in the moments where complexity meets user intent: connecting systems, configuring automations, and managing integrations without losing clarity or confidence. I have built a design system from scratch, run qualitative research that redirected product roadmaps, and worked closer to the codebase than most designers using AI-assisted workflows. I care about scalable patterns that work across surfaces, not just features that work once.
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EXPERIENCE.map((job, i) => (
            <div key={i}>
              <p className="text-gray-900 font-semibold" style={{ fontSize: '1rem', marginBottom: '0.125rem' }}>{job.role}</p>
              <p className="text-gray-500" style={{ fontSize: '0.875rem', marginBottom: job.context ? '0.25rem' : '0.5rem' }}>
                {job.company} · {job.dates} | {job.location}
              </p>
              {job.context && (
                <p className="text-gray-400 italic" style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{job.context}</p>
              )}
              <ul style={{ paddingLeft: '1.125rem', margin: 0 }}>
                {job.bullets.map((b, j) => (
                  <li key={j} className="text-gray-700 leading-relaxed" style={{ fontSize: '0.9375rem', marginBottom: '0.375rem', listStyleType: 'disc' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Case Studies</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={i}>
              <p className="text-gray-900 font-semibold" style={{ fontSize: '0.9375rem', marginBottom: '0.125rem' }}>
                {cs.title}
                <span className="text-gray-400 font-normal">, {cs.company}</span>
              </p>
              <p className="text-gray-700" style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>{cs.desc}</p>
              <a href="/" className="text-blue-600 hover:underline" style={{ fontSize: '0.8125rem' }}>Full case study at wahabalikhan.com</a>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {SKILLS.map((s, i) => (
            <p key={i} className="text-gray-700" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
              <span className="text-gray-500 font-semibold">{s.label}: </span>
              {s.items}
            </p>
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Education</h2>
        <p className="text-gray-900 font-semibold" style={{ fontSize: '0.9375rem', marginBottom: '0.125rem' }}>BSc (Hons) Computer Science</p>
        <p className="text-gray-700" style={{ fontSize: '0.875rem', marginBottom: '0.125rem' }}>University of Bradford · First Class</p>
        <p className="text-gray-700" style={{ fontSize: '0.875rem', marginBottom: '0.125rem' }}>Diploma of Industrial Studies (88%)</p>
        <p className="text-gray-700" style={{ fontSize: '0.875rem', marginBottom: '0.125rem' }}>Placement year at Matillion</p>
        <p className="text-gray-500" style={{ fontSize: '0.8125rem' }}>09/2019 – 07/2023 | Bradford, UK</p>
      </section>

      {/* Certifications */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 className="text-blue-600 font-semibold" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Certifications</h2>
        <p className="text-gray-900 font-semibold" style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>Nielsen Norman Group UX Certification (ID: 1081116)</p>
        <p className="text-gray-700" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          Application Design for Web and Desktop · Information Architecture · UX Deliverables · Analytics and User Experience · Measuring UX and ROI
        </p>
      </section>

      </FadeUp>
      <Footer />
    </div>
  );
}
