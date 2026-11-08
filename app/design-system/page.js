'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, PersonaCards, SectionLabel } from '@/components/CaseStudyParts';

const PERSONAS = [
  { name: 'Designers', text: 'Needed components they could pull in and trust, with every state already designed, so they never had to improvise one.' },
  { name: 'Engineers', text: 'Needed to know what was buildable in GXT, and how, with a clear match between each Figma component and the code.' },
];

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const P = 'text-gray-700 leading-relaxed mb-4';
const UL = 'list-disc pl-5 text-gray-700 leading-relaxed mb-6 space-y-2';
const LABEL = 'font-semibold text-gray-900';

export default function DesignSystemPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const open = setSelectedImage;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <CaseStudyReadTracker study="design-system" />

      <FadeUp delay={100}>
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">From Framework to Design System</h1>
        <p className="text-lg text-gray-700 mt-4 mb-6 leading-relaxed">
          Matillion's ETL product was built on a rigid framework with no design system, so every designer rebuilt the same UI from scratch. As the sole designer on it, I built the system that made design tasks 36.1% faster, and changed how engineers worked with design.
        </p>
        <CaseImage
          src="/images/ds.png"
          alt="Frames from the ETL design system in Figma: colour palettes, buttons, tables and dialogs, laid out at an angle"
          onOpen={open}
        />
        <AtAGlance items={[
          { label: 'Role', value: "Product Designer, and the system's sole designer: audit, components, documentation, testing and engineering enablement" },
          { label: 'Team', value: "Me, working with Matillion's engineering team" },
          { label: 'Timeline', value: 'February to June 2022' },
          { label: 'Results', value: 'Design tasks 36.1% faster in timed before-and-after tests, with the system shipped and in use' },
        ]} />
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The problem</SectionLabel>
          <h2 className={H2}>Every designer was rebuilding the same UI from scratch</h2>
          <p className={P}>Matillion ETL was built fast on Sencha GXT, a rigid Java framework, with no design system behind it.</p>
          <ul className={UL}>
            <li><span className={LABEL}>For designers:</span> no shared components, patterns or naming, so every new screen started from blank artboards, and time went on assembly rather than real problems.</li>
            <li><span className={LABEL}>For the product:</span> it looked and felt like it was built by different people, because it was.</li>
            <li><span className={LABEL}>For engineers:</span> without design guidance, they made visual and interaction decisions themselves.</li>
          </ul>
          <CaseImage
            src="/images/metl.png"
            alt="Matillion ETL before the design system: an environments panel, a pipeline canvas, a task list and a properties dialog, each styled differently"
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>The gap was structural, not people</h2>
          <p className={P}>I audited the product's components and patterns, and how designers and engineers worked with them.</p>
          <ul className={UL}>
            <li>GXT gave functional building blocks, not a design language.</li>
            <li>Figma files were organised designer by designer, feature by feature.</li>
            <li>Design reviews were slow, because most feedback was fixing inconsistencies rather than improving the experience.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Personas</SectionLabel>
          <h2 className={H2}>A system with two kinds of user</h2>
          <PersonaCards people={PERSONAS} />
          <p className={P}><span className={LABEL}>How this shaped the design:</span> every component had to work for both: complete in Figma for designers, and realistic in GXT for engineers.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Four decisions that shaped it</h2>
          <Decision
            n={1}
            title="Extend the framework, don't replace it"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'push to replace Sencha GXT with something more flexible, or design a system that works within it.' },
              { label: 'Why I chose to extend it:', text: "replacing the framework would have stalled product work for months. Instead, I styled GXT's components wherever they could match the system, documented exactly how, and designed new components only where GXT fell short." },
              { label: 'Trade-off:', text: 'some designs had to bend to what the framework could do, but the system could ship alongside real product work, not instead of it.' },
            ]}
          />
          <Decision
            n={2}
            title="Design every state, not just the happy path"
            onOpen={open}
            parts={[
              { label: 'Why:', text: 'designers had been improvising states like errors and empty screens, which is where most inconsistency crept in. Every component covers default, hover, focus, active, disabled, error, loading and empty, using variants and component properties to keep the library manageable.' },
              { label: 'Trade-off:', text: 'far more work up front, but no designer ever had to invent a state again.' },
            ]}
          />
          <Decision
            n={3}
            title="Toast notifications: ship simple first, refine after"
            onOpen={open}
            parts={[
              { label: 'What I found:', text: "GXT had no built-in toast notification, so engineers had to build one as a custom component, while still following the framework's styles and restrictions." },
              { label: 'What we did:', text: 'shipped a very simple version first, with just its core states. Once it was in use, we designed the rest: actions within a toast, how it animates in, how long it stays, and how several notifications behave together.' },
              { label: 'Why phased:', text: 'a custom component in a rigid framework is costly to get wrong. Shipping the simple version first gave teams consistent feedback messages straight away, and let us refine the harder parts with real use behind us.' },
            ]}
          />
          <Decision
            n={4}
            title="Teach engineers, not just hand off to them"
            onOpen={open}
            parts={[
              { label: 'Why:', text: 'a system only works if engineers use it. I ran practical UX sessions on flows and interactions, walked engineers through every component, and made the system the starting point for new engineering work.' },
              { label: 'Result:', text: 'over time, engineers started raising UX questions earlier, in planning rather than review.' },
            ]}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Final design</SectionLabel>
          <h2 className={H2}>One library designers pull from, not build from</h2>
          <CaseImage
            src="/images/design-system-bg.png"
            alt="Pages of the ETL design system in Figma: colour swatches, components and tables, with notes on how to use them"
            onOpen={open}
          />
          <ol className="list-decimal pl-5 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><span className={LABEL}>Foundations:</span> colour, type and spacing, shared by every component.</li>
            <li><span className={LABEL}>Components built for change:</span> Auto Layout so they stretch and stack with any content, variants for every state, and nested components, so updating a button updates everything that uses it.</li>
            <li><span className={LABEL}>Patterns, not just parts:</span> forms (label placement, validation timing, error messages, helper text), data display (tables, empty states, loading skeletons, pagination), feedback (toasts, inline errors, confirmation dialogs) and navigation.</li>
            <li><span className={LABEL}>Documentation for every pattern:</span> when to use it, when not to, and which edge cases to plan for, like long content or missing data.</li>
            <li><span className={LABEL}>Figma and code matched:</span> a Figma match for every coded component, so design and code stayed aligned.</li>
          </ol>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>Faster design, and better conversations</h2>
          <ul className={UL}>
            <li>Design tasks 36.1% faster, measured in timed tasks with the design team: building screens from scratch, then from the system.</li>
            <li>Design reviews changed focus, from "this doesn't match that" to "does this solve the user's problem?"</li>
            <li>Engineers raised UX questions earlier, in planning rather than review.</li>
            <li>The system shipped and stayed in use, maintained as a living resource rather than a one-off file.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>Building the culture was harder than building the components</h2>
          <p className={P}>The 36.1% gets the attention, but what mattered more was what it freed up: designers spent their time thinking instead of assembling, and engineers started bringing UX into their work.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> measure engineering adoption too, for example how many new screens were built from the system's components.</p>
          <p className={P}><span className={LABEL}>Next:</span> design tokens that map directly between Figma and code, automated checks that shipped UI matches the system, and patterns for data visualisation.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="design-system" />
      <Footer />
      <ImageModal
        isOpen={!!selectedImage}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
        markers={selectedImage?.markers}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
