'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, PersonaCards, SectionLabel, StepFlow } from '@/components/CaseStudyParts';

const PERSONAS = [
  { name: 'The designer new to code', text: 'Confident in Figma, but had never used a terminal, and was wary of breaking something.' },
  { name: 'The designer already experimenting', text: 'Trying AI tools on their own, but without a repeatable way to use them on real work.' },
];

const STEPS = ['Browser to Figma', 'Change it in code', 'Review and ship', 'Live prototypes'];

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
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
          src="/images/ai_workshop.png"
          alt="The AI Workflows Design Workshop board in FigJam: a schedule, an AI tool dot vote, the team's workflows mapped step by step, and sticky notes with pros and cons for Claude, Claude Design, Gemini, Figma Make and ChatGPT"
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
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>Three problems, not a vague goal</h2>
          <p className={P}>I joined halfway through, alongside a designer who had laid the groundwork. Working through the setup ourselves, and talking with the team, came down to three needs:</p>
          <ul className={UL}>
            <li>"I need my design files to reflect what's actually live, not a snapshot from three sprints ago."</li>
            <li>"I need to test ideas as working prototypes, not just static screens."</li>
            <li>"I need to move between design and code without losing context."</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Personas</SectionLabel>
          <h2 className={H2}>Some designers had never opened a terminal</h2>
          <PersonaCards people={PERSONAS} />
          <p className={P}><span className={LABEL}>How this shaped the work:</span> the setup had to be simple and documented enough for the first, and the workflow useful enough for the second.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Four decisions that shaped it</h2>
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
            title="Make the setup repeatable before asking anyone to use it"
            onOpen={open}
            parts={[
              { label: 'What I did:', text: "worked through installing dependencies, Docker configuration and errors on real machines, and fed every fix back into the step-by-step guide, so the next person didn't hit the same wall." },
              { label: 'Trade-off:', text: 'time on setup instead of design, but without it, the workflow would have stayed with the two people who already had it working.' },
            ]}
          />
          <Decision
            n={3}
            title="Run a workshop before rolling it out"
            onOpen={open}
            parts={[
              { label: 'Why:', text: 'adopting a new way of working is its own design problem, and much of it is about reducing fear of the tools. We ran a hands-on workshop: sharing experiences, comparing AI tools (Claude, Claude Design, Figma Make, Gemini and ChatGPT) and voting on them, then setting everyone up.' },
              { label: 'Result:', text: 'people who had never opened a terminal left with a working setup, and six designers went on to use the browser-to-Figma tool in their own work.' },
            ]}
          />
          <Decision
            n={4}
            title="Every change goes through engineering review"
            onOpen={open}
            parts={[
              { label: 'Why:', text: 'designers changing a live product needs trust. Every code or copy change went to GitHub for review, and had to pass engineering review and tests before reaching customers.' },
              { label: 'Trade-off:', text: "slower than changing things directly, but it meant engineers saw designers' changes as help, not risk." },
            ]}
          />
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
          <p className={P}>This was collaborative from start to finish: the initiative existed before I joined, another designer had done significant groundwork, and engineers were involved throughout. My part was getting it working, helping the team adopt it, and using it on real work.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> measure the impact from the start, for example how long it took to go from idea to prototype before and after. Without that, the results are real but harder to prove.</p>
          <p className={P}><span className={LABEL}>Next:</span> the role ended in a company restructuring in June 2026, before we could formalise the workflow, check shipped UI against designs automatically, and keep the design system in sync with code. The workflow and its documentation stayed with the team.</p>
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
