'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, SectionLabel, ShippedFirst, VisualSlot } from '@/components/CaseStudyParts';

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const H3 = 'text-lg font-semibold mt-8 mb-3 text-gray-900';
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
            caption="Matillion's ETL product, built on Sencha GXT: functional, but designed feature-by-feature with no shared system behind it."
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Goals</SectionLabel>
          <h2 className={H2}>Goals for users and the business</h2>
          <ul className={UL}>
            <li><span className={LABEL}>One source of truth:</span> a Figma library that designers pull from, not build from scratch</li>
            <li><span className={LABEL}>Components that reflect reality:</span> aligned to what engineers can actually build in Sencha GXT, with custom patterns introduced where GXT falls short</li>
            <li><span className={LABEL}>Every state designed:</span> not just the happy path. Empty states, error states, loading states, edge cases with long content or missing data.</li>
            <li><span className={LABEL}>Engineers enabled, not just handed off to:</span> the system needed to change how the engineering team worked, not just give designers faster tools</li>
          </ul>
          <p className={P}><span className={LABEL}>Success metric:</span> the time designers take to complete design tasks, timed before and after with the design team.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>My role</SectionLabel>
          <h2 className={H2}>I owned it, from the audit to the live system</h2>
          <p className="text-gray-700 leading-relaxed mb-2">I owned this entirely, end-to-end:</p>
          <ul className={UL}>
            <li>Audited the existing product to understand the current state of components, patterns, and inconsistencies</li>
            <li>Built the ETL design system in Figma: components, variants, Auto Layout, edge cases, and documentation</li>
            <li>Tested the system with the design team using structured task-based tests (old workflow vs new)</li>
            <li>Educated the engineering team on UX practice and how to work with the design system</li>
            <li>Worked with engineers to implement components within the constraints of Sencha GXT</li>
            <li>Introduced new components and patterns where GXT's rigidity required custom solutions</li>
            <li>Maintained the system as a live, evolving resource, not a one-off deliverable</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>The gap was structural, not people</h2>
          <p className={P}>I audited the product's components and patterns, and how designers and engineers worked with them.</p>
          <ul className={UL}>
            <li>GXT gave functional building blocks, not a design language.</li>
            <li>Figma files were organised designer by designer, feature by feature, with no shared styles, no shared components and no naming conventions.</li>
            <li>Design reviews were slow, because most feedback was fixing inconsistencies rather than improving the experience.</li>
          </ul>
          <p className={P}><span className={LABEL}>Two kinds of user:</span> designers needed components they could pull in and trust, with every state already designed, so they never had to improvise one. Engineers needed to know what was buildable in GXT, and how, with a clear match between each Figma component and the code. So every component had to work for both: complete in Figma for designers, and realistic in GXT for engineers.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Working with the framework, not against it</h2>
          <Decision
            n={1}
            title="Extend the framework, don't replace it"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'push to replace Sencha GXT with something more flexible, or design a system that works within it.' },
              { label: 'Why I chose to extend it:', text: 'replacing the framework would have stalled product work for months.' },
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
            sketch={{ src: '/images/ds-toast.png', alt: 'The toast notification in its states: success, information, warning and error, with and without an action' }}
            parts={[
              { label: 'What I found:', text: "GXT had no built-in toast notification, so engineers had to build one as a custom component, while still following the framework's styles and restrictions." },
              { label: 'What we did:', text: 'shipped a very simple version first, with just its core states. Once it was in use, we designed the rest: actions within a toast, how it animates in, how long it stays, and how several notifications behave together.' },
              { label: 'Why phased:', text: 'a custom component in a rigid framework is costly to get wrong. Shipping the simple version first gave teams consistent feedback messages straight away, and let us refine the harder parts with real use behind us.' },
            ]}
          >
            <ShippedFirst>A simple toast with its core states. Actions, animation, timing and stacking came after we'd seen it in use.</ShippedFirst>
          </Decision>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Working with engineering</SectionLabel>
          <h2 className={H2}>Building it into GXT, and into how engineers worked</h2>
          <h3 className={`${H3} mt-0`}>Working Within Sencha GXT's Constraints</h3>
          <p className="text-gray-700 leading-relaxed mb-2">GXT is rigid. It has its own component model and styling system that doesn't map to a modern design system without significant work. This required a practical approach:</p>
          <ul className={UL}>
            <li>Where GXT components could be styled to match the design system, I documented exactly how.</li>
            <li>Where GXT fell short, I worked with engineers to introduce new, custom components: built and owned by the team, not inherited from the framework.</li>
          </ul>
          <p className={P}>The goal was never to replace GXT wholesale. It was to extend it thoughtfully, and make the seams invisible to the end user.</p>
          <h3 className={H3}>Engineering Enablement</h3>
          <p className={P}>Building the system was only half the job. Getting engineers to use it was the other half.</p>
          <p className={P}>The engineering team at Matillion was skilled and experienced, but UX culture wasn't embedded in how they worked. They were building features, not experiences. That gap needed to close.</p>
          <p className="text-gray-700 leading-relaxed mb-2">What I did:</p>
          <ul className={UL}>
            <li>Ran structured sessions with the engineering team on UX fundamentals: not theory, but practical. How to think about user flows, what makes an interaction feel right, how to spot a UX problem before it ships.</li>
            <li>Walked engineers through the design system: how to read it, how to use it, what each component and pattern was for.</li>
            <li>Established a working rhythm where design system components were the starting point for new engineering work, not an afterthought.</li>
            <li>Made changes available progressively, prioritised alongside real product work so the team was never pulled away from business goals entirely.</li>
          </ul>
          <p className={P}>The shift wasn't instant. But over time, engineers started raising UX questions earlier, in planning, not just in review. That's the real marker of culture change.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Final design</SectionLabel>
          <h2 className={H2}>One library designers pull from, not build from</h2>
          <VisualSlot
            src="/images/ds-component-states.png"
            alt="One component from the ETL design system in every state: default, hover, focus, active, disabled, error, loading and empty"
            onOpen={open}
          />
          <CaseImage
            src="/images/design-system-bg.png"
            alt="Pages of the ETL design system in Figma: colour swatches, components and tables, with notes on how to use them"
            caption="The ETL design system in Figma: components, variants, and documentation built with Auto Layout from the ground up."
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
            <li>Design tasks 36.1% faster.</li>
            <li>Design reviews changed focus, from "this doesn't match that" to "does this solve the user's problem?"</li>
            <li>Engineers raised UX questions earlier, in planning rather than review.</li>
            <li>The system shipped and stayed in use, maintained as a living resource rather than a one-off file.</li>
          </ul>
          <h3 className={H3}>How I tested it</h3>
          <p className={P}>The primary users of the design system were the product designers on the team. So I tested it with them.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><span className={LABEL}>Method:</span> Structured task-based testing, old workflow vs new workflow, timed.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><span className={LABEL}>Old workflow:</span> Designers building UI from scratch. No shared components, no library to pull from. Every screen started with blank artboards and manually constructed elements.</p>
          <p className={P}><span className={LABEL}>New workflow:</span> Designers working from the ETL design system. Components slotted in, variants switched, patterns applied. Everything snapping into place.</p>
          <p className={P}>That number came from real timed tasks with real designers on the actual team. Not estimated. Not projected. The speed increase came from eliminating the assembly work that had been eating into design time, freeing up the team to focus on the harder, more valuable problems.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>Building the culture was harder than building the components</h2>
          <p className={P}>The 36.1% gets the attention, but what mattered more was what it freed up: designers spent their time thinking instead of assembling, and engineers started bringing UX into their work.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> measure engineering adoption too, for example how many new screens were built from the system's components.</p>
          <h3 className={H3}>Why this matters</h3>
          <p className="text-gray-700 leading-relaxed mb-2">A design system is the most direct intersection of design and engineering work that exists. It requires:</p>
          <ul className={UL}>
            <li>Enough design depth to build components that are flexible, consistent, and cover every real-world state</li>
            <li>Enough engineering understanding to know what's actually buildable, and how</li>
            <li>The ability to communicate across both disciplines and change how each one works</li>
          </ul>
          <h3 className={H3}>Next steps</h3>
          <ul className={UL}>
            <li>Extend the system to cover more complex data visualisation and pipeline-specific patterns</li>
            <li>Build a design QA process: checking shipped UI against design system components automatically</li>
            <li>Explore a tokenised approach to styling that maps directly between Figma and code, reducing drift between design and implementation</li>
          </ul>
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
