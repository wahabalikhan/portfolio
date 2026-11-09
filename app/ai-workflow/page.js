'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, SectionLabel, StepFlow, VisualSlot } from '@/components/CaseStudyParts';

const STEPS = ['Browser to Figma', 'Change it in code', 'Review and ship', 'Live prototypes'];

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const H3 = 'text-lg font-semibold mt-8 mb-3 text-gray-900';
const P = 'text-gray-700 leading-relaxed mb-4';
const UL = 'list-disc pl-5 text-gray-700 leading-relaxed mb-6 space-y-2';
const LABEL = 'font-semibold text-gray-900';

export default function AIWorkflowPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const open = setSelectedImage;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <CaseStudyReadTracker study="ai-workflow" />

      <FadeUp delay={100}>
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Designing closer to the real product</h1>
        <p className="text-lg text-gray-700 mt-4 mb-6 leading-relaxed">
          At Adverity, design files drifted from what was actually live, and ideas reached engineers as static screens. I helped get an AI-assisted workflow working across the design team, so designs started from the live product and ideas could be tested as working prototypes.
        </p>
        <CaseImage
          src="/images/ai_thumbnail.png"
          alt="Three windows from the workflow, overlapping: a Figma file's layers panel, VS Code's Source Control panel with a Commit button, and a GitHub repository's code page"
          onOpen={open}
        />
        <AtAGlance items={[
          { label: 'Role', value: 'AI Product Designer: getting the workflow working, documentation, co-running the workshop, and shipping changes' },
          { label: 'Team', value: '3 product designers and an engineering pod' },
          { label: 'Timeline', value: 'April to June 2026' },
          { label: 'Results', value: 'The workflow went from half-built to team-wide, six designers used the browser-to-Figma tool after the workshop, and real changes shipped to production' },
        ]} />
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The problem</SectionLabel>
          <h2 className={H2}>Design and code were running on parallel tracks</h2>
          <p className={P}>At Adverity, design files were rebuilt from memory and quickly fell out of date, and ideas took hours to communicate as static screens. A workflow to bring designers closer to the codebase already existed in draft, but getting it to work consistently, on different machines and setups, was the hard part.</p>
          <p className={P}>The goal wasn't to replace engineering. It was to make my design work more grounded, more testable, and more useful to the engineers I work with.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>My role</SectionLabel>
          <h2 className={H2}>From almost there to actually working</h2>
          <p className={P}>I joined this initiative halfway through, collaborating with a designer who had already been laying the groundwork. My contribution was in getting the workflow from almost there to actually working, and then using it on real work.</p>
          <p className="text-gray-700 leading-relaxed mb-2">Specifically:</p>
          <ul className={UL}>
            <li>Worked through the setup process collaboratively: installing dependencies, working through Docker configuration, debugging errors, and feeding fixes back into the guide so the next person didn't hit the same walls.</li>
            <li>Helped get the workflow to a polished, documented state the wider team could follow.</li>
            <li>Participated in and helped run a team workshop to explore what AI looks like in design workflows, get everyone set up, and build shared understanding across the team.</li>
            <li>Used the workflow on real work, shipping changes to customers.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>Three problems, not a vague goal</h2>
          <p className={P}>Working through the setup ourselves, and talking with the team, came down to three needs:</p>
          <ul className={UL}>
            <li>"I need my design files to reflect what's actually live, not a snapshot from three sprints ago."</li>
            <li>"I need to test ideas as working prototypes, not just static screens."</li>
            <li>"I need to move between design and code without losing context."</li>
          </ul>
          <p className={P}><span className={LABEL}>Two kinds of designer:</span> some were confident in Figma but had never used a terminal, and were wary of breaking something. Others were already trying AI tools on their own, but without a repeatable way to use them on real work. So the setup had to be simple and documented enough for the first, and the workflow useful enough for the second.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>The choices that got it adopted</h2>
          <Decision
            n={1}
            title="Start from the live product, not a blank file"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'keep designing in Figma and use AI to turn finished designs into code, or start from the live product itself.' },
              { label: 'Why live first:', text: 'an AI-assisted handoff is faster, but still one-way, so the Figma file is out of date by the time code ships. Pulling live pages into Figma as editable layers, and prototyping in code, keeps design and code connected. Real projects confirmed it.' },
              { label: 'Trade-off:', text: 'every designer needed a working local setup, which was the hardest part to get right.' },
            ]}
          />
          <Decision
            n={2}
            title="Run a workshop before rolling it out"
            onOpen={open}
            parts={[
              { label: 'Why:', text: 'adopting a new way of working is its own design problem, and much of it is about reducing fear of the tools. We ran a hands-on workshop: sharing experiences, comparing AI tools (Claude, Claude Design, Figma Make, Gemini and ChatGPT) and voting on them, then setting everyone up.' },
              { label: 'Result:', text: 'people who had never opened a terminal left with a working setup, and six designers went on to use the browser-to-Figma tool in their own work.' },
            ]}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Working with engineering</SectionLabel>
          <h2 className={H2}>A working setup first, and every change reviewed</h2>
          <p className={P}>Getting there meant a working local setup first: Node.js, VS Code, Git, and Claude Code in the terminal to scaffold components from design direction.</p>
          <p className={P}>Every change went to GitHub for review, and anything touching the live product had to pass engineering review and tests.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The workflow</SectionLabel>
          <h2 className={H2}>From the live product to a reviewed change</h2>
          <StepFlow
            steps={STEPS}
            label="The workflow in four steps: 1, Browser to Figma; 2, Change it in code; 3, Review and ship; 4, Live prototypes."
          />
          <ol className="list-decimal pl-5 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><span className={LABEL}>Browser to Figma:</span> pull a live product page into Figma as editable layers, so the design starts from what's actually there, then annotate and explore changes on top of it.</li>
            <li><span className={LABEL}>Change it in code:</span> take the direction into VS Code, use Claude Code to make or adjust components, review what it produces, and test it locally against the live product.</li>
            <li><span className={LABEL}>Review and ship:</span> commit through Git, open it for engineering review, pass the tests, then merge and ship to customers.</li>
            <li><span className={LABEL}>Live prototypes:</span> another designer on the team built a separate workflow for quick, working prototypes. I used it to get ideas to engineers and product faster, without a polished static design first.</li>
          </ol>
          <VisualSlot
            src="/images/ai-workflow-before-after.png"
            alt="Before and after: a design file rebuilt from memory, and the same screen pulled from the live product into Figma as editable layers"
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>A workflow the whole team could run</h2>
          <ul className={UL}>
            <li>From half-built to team-wide, documented well enough for anyone to set it up.</li>
            <li>Six designers used the browser-to-Figma tool in their own work after the workshop.</li>
            <li>Real changes shipped to production, through engineering review and tests.</li>
            <li>Faster conversations with engineers and product, using working prototypes instead of static screens.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>A closer-to-code workflow only works if many people can run it</h2>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> measure the impact from the start, for example how long it took to go from idea to prototype before and after. Without that, the results are real but harder to prove.</p>
          <h3 className={H3}>Why this matters</h3>
          <p className={P}>Working closer to the codebase changes how you make design decisions. You are not designing in a vacuum and hoping it is feasible. You are testing against real constraints from the start. When design and engineering are operating in the same space, feedback loops shrink and the gap between what is designed and what ships gets smaller.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><span className={LABEL}>With it:</span></p>
          <ul className={UL}>
            <li>Design decisions are grounded in what is technically real from the start</li>
            <li>Feedback loops shrink from sprints to sessions</li>
            <li>Prototypes replace static screens in early engineering conversations</li>
            <li>The gap between designed and shipped gets smaller with every project</li>
          </ul>
          <h3 className={H3}>Next steps</h3>
          <ul className={UL}>
            <li>Formalise the workflow into a repeatable process other designers can pick up independently.</li>
            <li>Explore AI-assisted design QA: checking shipped UI against design intent automatically.</li>
            <li>Apply this approach to larger, multi-page products.</li>
            <li>Contribute to a component-level design system kept in sync with the codebase.</li>
          </ul>
          <p className={P}>The role ended in a company restructuring in June 2026, before these could be taken further. The workflow and its documentation stayed with the team.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="ai-workflow" />
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
