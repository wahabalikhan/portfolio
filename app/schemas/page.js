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
  { name: 'The engineer used to the old tool', text: 'Relied on Matillion ETL showing schema details instantly, and found the new product slower without them.' },
  { name: 'The engineer building something new', text: "Needed components pre-filled with schema information, so they didn't waste time on the basics." },
];

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const P = 'text-gray-700 leading-relaxed mb-4';
const UL = 'list-disc pl-5 text-gray-700 leading-relaxed mb-6 space-y-2';
const LABEL = 'font-semibold text-gray-900';

export default function SchemasPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const open = setSelectedImage;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <CaseStudyReadTracker study="schemas" />

      <FadeUp delay={100}>
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Asking why before adding search</h1>
        <p className="text-lg text-gray-700 mt-4 mb-6 leading-relaxed">
          A stakeholder asked for a quick win: a search bar in the schema panel. A month of research showed the real problem was that engineers couldn't see schema information at all, and turned a single feature request into a better roadmap.
        </p>
        <CaseImage
          src="/images/schema_bg.png"
          alt="A search bar with a hand-drawn arrow pointing into the Data Productivity Cloud, where a long Schemas list sits beside the Files panel"
          onOpen={open}
        />
        <AtAGlance items={[
          { label: 'Role', value: 'Product Designer: problem definition, research, competitor analysis and stakeholder playback' },
          { label: 'Team', value: 'Product Manager, Product Owner, and 1 other product designer' },
          { label: 'Timeline', value: 'August to September 2024 (1 month)' },
          { label: 'Results', value: 'Stakeholder confidence up 12.3%, two overlapping projects merged into one, and the research used to design the merged workflow' },
        ]} />
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The problem</SectionLabel>
          <h2 className={H2}>The request was a quick fix for a deeper problem</h2>
          <p className={P}>Schemas (the tables, columns and relationships in a database) power nearly every pipeline in Matillion's Data Productivity Cloud. But in the newer product, engineers couldn't see schema information without building a pipeline first.</p>
          <p className={P}>A stakeholder proposed a quick win: add search to the schema panel. It sounded reasonable, but search only helps if you can already see what you're searching through, and it didn't match what I'd been hearing across teams.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>"Search isn't the main issue. I need visibility."</h2>
          <p className={P}>I compared how Snowflake, dbt Cloud, notebooks and IDEs, and Matillion's own legacy product handle schema visibility, search and table previews, then interviewed five internal data engineers.</p>
          <p className={P}>What they told me:</p>
          <ul className={UL}>
            <li>"I can't see the schema metadata unless I build a pipeline."</li>
            <li>"Previewing tables takes too many clicks."</li>
            <li>"The old tool used to give me context instantly."</li>
          </ul>
          <CaseImage
            src="/images/metl.png"
            alt="Matillion ETL's schema browser: the Environments panel lists every table, a menu filters by schema type, table type and columns, and a properties window shows a table's columns, types and keys"
            caption="Matillion ETL, the legacy product, showed schema details instantly, which made it the reference point for the research."
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Personas</SectionLabel>
          <h2 className={H2}>Engineers who'd lost the context they used to have</h2>
          <PersonaCards people={PERSONAS} />
          <p className={P}><span className={LABEL}>How this shaped the work:</span> both needed to see schema information sooner, not search for it, which is what changed the question.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Three decisions that shaped it</h2>
          <Decision
            n={1}
            title="Question the request before building it"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'ship the search bar as a quick win, or spend a month finding out what problem it was meant to solve.' },
              { label: 'Why I pushed for a month:', text: 'shipping the wrong improvement is worse than shipping nothing. Search on its own would have added more interface, left the real problem untouched, and built the roadmap on assumptions.' },
              { label: 'Trade-off:', text: "a month without a visible change, and a stakeholder whose idea I was questioning. I made the case with evidence, not opinion." },
            ]}
          />
          <Decision
            n={2}
            title="Reframe the question"
            onOpen={open}
            parts={[
              { label: 'From:', text: '"Should we add search?"' },
              { label: 'To:', text: '"How do we make schema information visible, without extra steps?"' },
              { label: 'Why:', text: 'the interviews pointed to three real needs: see schema details instantly, preview tables in fewer clicks, and have components pre-filled. Search addressed none of them directly.' },
            ]}
          />
          <Decision
            n={3}
            title="Merge two projects into one workflow"
            onOpen={open}
            parts={[
              { label: 'What I found:', text: 'two separate projects, Schema Enhancements and Pipeline Creation Modals, both needed better schema information, visibility and sampling.' },
              { label: 'What I proposed:', text: 'combine them into one end-to-end workflow, to avoid duplicated effort and keep the experience consistent.' },
              { label: 'Trade-off:', text: "the schema work wouldn't ship as a feature of its own. Instead, my research shaped the designs of the merged workflow wherever schemas came up." },
            ]}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>What I delivered</SectionLabel>
          <h2 className={H2}>A playback that changed the question</h2>
          <p className={P}>This project's output wasn't a screen: it was the evidence to change direction. I built a playback deck and presented it to stakeholders:</p>
          <ul className={UL}>
            <li>Side-by-side comparisons of competitors and the legacy product against the current experience.</li>
            <li>Patterns other data tools use for metadata, previews and search.</li>
            <li>The engineers' own words, grouped by need.</li>
            <li>The reframed question, and the case for merging the two projects.</li>
          </ul>
          <CaseImage
            src="/images/slides.png"
            alt="The playback deck in FigJam: six frames titled What we're looking at, What are schemas, What did we do, What did they say, Other problems, and Next steps, each with sticky notes"
            onOpen={open}
          />
          <p className={P}>Stakeholders saw the difference straight away, agreed the original request was too narrow, and backed merging the projects.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>A smaller request became a better roadmap</h2>
          <ul className={UL}>
            <li>Stakeholder confidence up 12.3%, measured in a survey before I started and again after the playback.</li>
            <li>Two overlapping projects merged into one, avoiding duplicated work.</li>
            <li>The research shaped the merged workflow's designs wherever schemas came up.</li>
            <li>Several sprints of misdirected work avoided, for the cost of one month.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>The most valuable design work often happens before design</h2>
          <p className={P}>Asking why, and backing it with evidence, avoided a shallow fix and moved the team towards a real workflow improvement.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> pair the findings with a rough sketch of what "visible" could look like. Stakeholders understood the reframe, but a quick visual would have made the direction even easier to picture, and given the merged project a head start.</p>
          <p className={P}><span className={LABEL}>Next, carried into the merged workflow:</span> schema sampling, better metadata visibility, pre-filled components, and schema information connected to pipeline building.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="schemas" />
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
