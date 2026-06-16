import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import CommentPins from '../components/CommentPins';
import { usePageTitle } from '../hooks/usePageTitle';

export default function DesignSystemPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  usePageTitle('From Framework to Design System');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        From Framework to Design System
      </h1>

      <p className="text-lg text-gray-700 mt-4 mb-4 leading-relaxed">
        A 36.1% reduction in design task completion time, achieved by building Matillion's ETL design system from scratch - components, patterns, and documentation - while embedding UX practice into how the engineering team worked.
      </p>

      <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> February 2022 - June 2022 ~ 5 months</p>
      <p className="text-gray-600 mb-1"><span className="font-semibold">Team:</span> Solo - designed, built, tested, and documented end-to-end</p>
      <p className="text-gray-600 mb-1"><span className="font-semibold">Role:</span> Product Designer - design system architecture, component design, UX education, engineering enablement</p>
      <p className="text-gray-600 mb-4"><span className="font-semibold">Stack:</span> Figma (Auto Layout, Variants, Component Properties), Sencha GXT (Java/ExtJS)</p>

      <img
        src="/images/ds.png"
        alt="Design System"
        className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setSelectedImage({ src: '/images/ds.png', alt: 'Design System' })}
      />

      <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">The Problem</h3>
          <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
            <p className="mb-6" style={{ color: '#374151' }}>
              ⚠️ <span className='font-bold' style={{ color: '#374151' }}>Matillion's ETL product had been built without a design system.</span>
            </p>
            <p className="mb-6" style={{ color: '#374151' }}>
              Engineering had moved fast using Sencha GXT - a rigid Java/ExtJS component framework - to build out the product. It worked technically. But the design side was a different story. Designers were working in isolation, rebuilding UI from scratch with every new feature. There were no shared components, no agreed patterns, no single source of truth.
            </p>
            <p className="mb-6" style={{ color: '#374151' }}>
              The result was a product that looked and felt inconsistent. And a design team spending significant time on assembly work - building what should already exist - rather than solving real user problems.
            </p>
            <p style={{ color: '#374151' }}>
              But the deeper issue wasn't just tooling. The engineering team had limited exposure to UX thinking. <span className='font-bold' style={{ color: '#374151' }}>Design and engineering weren't collaborating - they were operating in parallel, occasionally intersecting at handoff.</span> There was no shared language, no shared process, and no shared understanding of what good looked like.
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">My Role</h3>
          <p className="text-gray-700 leading-relaxed mb-2">I owned this entirely, end-to-end:</p>
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside'>
              <li>Audited the existing product to understand the current state of components, patterns, and inconsistencies</li>
              <li>Built the ETL design system in Figma - components, variants, Auto Layout, edge cases, and documentation</li>
              <li>Tested the system with the design team using structured task-based tests (old workflow vs. new)</li>
              <li>Educated the engineering team on UX practice and how to work with the design system</li>
              <li>Worked with engineers to implement components within the constraints of Sencha GXT</li>
              <li>Introduced new components and patterns where GXT's rigidity required custom solutions</li>
              <li>Maintained the system as a live, evolving resource - not a one-off deliverable</li>
            </ul>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Results</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
            <p className="text-gray-700 bg-emerald-50 mb-2">
              <span className="text-2xl font-bold bg-emerald-50">✅ 36.1% faster</span> design task completion - measured through structured before/after testing
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              <span className="text-2xl font-bold bg-emerald-50">✅ Full design system shipped</span> - components, patterns, and documentation, all live and in use
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              <span className="text-2xl font-bold bg-emerald-50">✅ Engineering team upskilled</span> - practical UX knowledge embedded in how the team works
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              <span className="text-2xl font-bold bg-emerald-50">✅ Product consistency improved</span> - shared components and patterns replaced designer-by-designer decisions
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              <span className="text-2xl font-bold bg-emerald-50">✅ Design reviews more focused</span> - less time correcting inconsistencies, more time improving the experience
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-0">
              <span className="text-2xl font-bold bg-emerald-50">✅ Business value protected</span> - delivered alongside prioritised product work, not instead of it
            </p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">What I Set Out to Solve</h2>
        <p className="text-gray-700 leading-relaxed mb-6">Three problems, not one:</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside font-bold'>
              <li>"Designers are rebuilding the same components from scratch, every time." No shared library meant every new screen started from zero. Inconsistency crept in at every edge.</li>
              <li>"The product looks like it was built by different people, because it was." Without a system, visual and interaction patterns diverged across the product over time.</li>
              <li>"Engineers are building without UX context." The team was shipping functional software, but UX culture - thinking about how people actually use things - wasn't embedded in how they worked.</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">Solving any one of these in isolation wouldn't be enough. The design system had to address all three at once.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Understanding the Landscape First</h2>
        <p className="text-gray-700 leading-relaxed mb-6">Before building anything, I needed to understand what existed and why it had evolved that way. What I found:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Sencha GXT provided a baseline set of UI components, but they weren't designed with UX consistency in mind - they were functional building blocks, not a design language</li>
            <li>Figma files were designer-by-designer, feature-by-feature. No shared styles, no shared components, no naming conventions</li>
            <li>Engineers were making visual and interaction decisions themselves when design guidance wasn't available - not out of carelessness, but because there was no system to reference</li>
            <li>Design reviews were slow and feedback-heavy because so much needed correcting at the pattern level, not just the pixel level</li>
          </ul>
        </p>

        <img
          src="/images/metl.png"
          alt="Matillion ETL product before the design system"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/metl.png', alt: 'Matillion ETL product before the design system' })}
        />
        <p className='mb-8 text-xs'>Matillion's ETL product, built on Sencha GXT - functional, but designed feature-by-feature with no shared system behind it.</p>

        <p className="text-gray-700 leading-relaxed mb-6">This wasn't a failure of people. It was a structural gap - the product had outgrown the way it was being designed and built.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Design Goals</h2>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li><span className='font-bold'>One source of truth</span> - a Figma library that designers pull from, not build from scratch</li>
            <li><span className='font-bold'>Components that reflect reality</span> - aligned to what engineers can actually build in Sencha GXT, with custom patterns introduced where GXT falls short</li>
            <li><span className='font-bold'>Every state designed</span> - not just the happy path. Empty states, error states, loading states, edge cases with long content or missing data</li>
            <li><span className='font-bold'>Engineers enabled, not just handed off to</span> - the system needed to change how the engineering team worked, not just give designers faster tools</li>
            <li><span className='font-bold'>Business value protected</span> - this ran alongside prioritised product work, not instead of it</li>
          </ul>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Building the System</h2>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Component Architecture in Figma</h3>
        <p className="text-gray-700 leading-relaxed mb-2">Every component was built with Figma's Auto Layout and Variants from the ground up:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li><span className='font-bold'>Auto Layout</span> ensured components stretched, stacked, and responded correctly across different content lengths and screen sizes - no manual resizing</li>
            <li><span className='font-bold'>Variants</span> covered every meaningful state: default, hover, focus, active, disabled, error, loading, empty - so designers never had to improvise a state that wasn't designed</li>
            <li><span className='font-bold'>Component Properties</span> allowed text, icons, and visibility to be toggled within a single component, reducing the number of variants needed while keeping the library clean</li>
            <li><span className='font-bold'>Nested components</span> meant global changes propagated automatically - update the button atom, every component using it updates instantly</li>
          </ul>
        </p>

        <img
          src="/images/design-system-bg.png"
          alt="ETL design system component library"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/design-system-bg.png', alt: 'ETL design system component library' })}
        />
        <p className='mb-8 text-xs'>The ETL design system in Figma - components, variants, and documentation built with Auto Layout from the ground up.</p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Patterns, Not Just Components</h3>
        <p className="text-gray-700 leading-relaxed mb-2">Individual components weren't enough. I built out the interaction patterns that connect them:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li><span className='font-bold'>Form patterns</span> - label placement, validation timing, error message structure, helper text rules</li>
            <li><span className='font-bold'>Data display patterns</span> - tables, empty states, loading skeletons, pagination</li>
            <li><span className='font-bold'>Feedback patterns</span> - toast notifications, inline errors, confirmation dialogs</li>
            <li><span className='font-bold'>Navigation patterns</span> - consistent with GXT's structural constraints but designed to feel intentional</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">Each pattern included annotated documentation covering when to use it, when not to, and what edge cases to account for.</p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Working Within Sencha GXT's Constraints</h3>
        <p className="text-gray-700 leading-relaxed mb-2">GXT is rigid. It has its own component model and styling system that doesn't map cleanly to a modern design system. This required a practical approach:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Where GXT components could be styled to match the design system, I documented exactly how</li>
            <li>Where GXT fell short, I worked with engineers to introduce new, custom components - built and owned by the team, not inherited from the framework</li>
            <li>Every new component had a clear Figma counterpart, so design and code stayed aligned</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">The goal was never to replace GXT wholesale. It was to extend it thoughtfully, and make the seams invisible to the end user.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Testing the System</h2>
        <p className="text-gray-700 leading-relaxed mb-6">The primary users of the design system were the product designers on the team. So I tested it with them.</p>

        <p className="text-gray-700 leading-relaxed mb-2"><span className='font-bold'>Method:</span> Structured task-based testing - old workflow vs. new workflow, timed.</p>
        <p className="text-gray-700 leading-relaxed mb-2"><span className='font-bold'>Old workflow:</span> Designers building UI from scratch. No shared components, no library to pull from. Every screen started with blank artboards and manually constructed elements.</p>
        <p className="text-gray-700 leading-relaxed mb-6"><span className='font-bold'>New workflow:</span> Designers working from the ETL design system. Components slotted in, variants switched, patterns applied. Everything snapping into place.</p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
          <p className="text-gray-700 bg-emerald-50 mb-0">
            <span className="text-2xl font-bold bg-emerald-50">✅ Result: 36.1% reduction</span> in time to complete design tasks
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">That number came from real timed tasks with real designers on the actual team - not estimated, not projected. The speed increase came from eliminating the assembly work that had been eating into design time, freeing up the team to focus on the harder, more valuable problems.</p>

        <p className="text-gray-700 leading-relaxed mb-6">Design reviews also improved. With a shared system, feedback shifted from "this doesn't match that" to "does this solve the user's problem?" - a fundamentally more useful conversation.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Engineering Enablement</h2>
        <p className="text-gray-700 leading-relaxed mb-6">Building the system was only half the job. Getting engineers to use it was the other half.</p>
        <p className="text-gray-700 leading-relaxed mb-6">The engineering team at Matillion was skilled and experienced, but UX culture wasn't embedded in how they worked. They were building features, not experiences. That gap needed to close.</p>

        <p className="text-gray-700 leading-relaxed mb-2">What I did:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Ran structured sessions with the engineering team on UX fundamentals - not theory, but practical: how to think about user flows, what makes an interaction feel right, how to spot a UX problem before it ships</li>
            <li>Walked engineers through the design system - how to read it, how to use it, what each component and pattern was for</li>
            <li>Established a working rhythm where design system components were the starting point for new engineering work, not an afterthought</li>
            <li>Made changes available progressively - prioritised alongside real product work so the team was never pulled away from business goals entirely</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">The shift wasn't instant. But over time, engineers started raising UX questions earlier - in planning, not just in review. That's the real marker of culture change.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Why This Matters for a Design Engineering Role</h2>
        <p className="text-gray-700 leading-relaxed mb-2">A design system is the most direct intersection of design and engineering work that exists. It requires:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Enough design depth to build components that are flexible, consistent, and cover every real-world state</li>
            <li>Enough engineering understanding to know what's actually buildable, and how</li>
            <li>The ability to communicate across both disciplines - and change how each one works</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">This project wasn't just about making Figma files faster to build. It was about closing the structural gap between how design thought about the product and how engineering built it. That gap is exactly what a Design Engineer exists to close.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Reflection</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The 36.1% speed improvement is the number that gets attention. But what mattered more was what it unlocked. Designers stopped spending time on assembly and started spending it on thinking. Engineers started asking UX questions earlier. The product started feeling like it was built by one team with a shared vision - because, eventually, it was.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          A design system only works if the people around it trust it and use it. Building the system was one challenge. Building the culture around it was the harder, more important one.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps</h2>
        <p className="text-gray-700 leading-relaxed">
          <ul className='list-disc list-inside'>
            <li>Extend the system to cover more complex data visualisation and pipeline-specific patterns</li>
            <li>Build a design QA process - checking shipped UI against design system components automatically</li>
            <li>Explore a tokenised approach to styling that maps directly between Figma and code, reducing drift between design and implementation</li>
          </ul>
        </p>
      </section>

      <CommentPins page="design-system" />
      <Footer />
      <ImageModal
        isOpen={!!selectedImage}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
