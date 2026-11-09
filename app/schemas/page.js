'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, FromTo, SectionLabel, ShippedFirst, VisualSlot } from '@/components/CaseStudyParts';

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const H3 = 'text-lg font-semibold mt-8 mb-3 text-gray-900';
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
          <p className={P}>Schema management lacked the visibility that engineers had relied on in the previous Matillion tool. They were slower, less confident, and more frustrated.</p>
          <p className={P}>A stakeholder proposed a quick win: add search to the schema panel. It sounded reasonable, but search only helps if you can already see what you're searching through, and it didn't match what I'd been hearing across teams.</p>
          <p className={P}>Search might help. But it might not. So the question was: what problem is search supposed to solve?</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>My role</SectionLabel>
          <h2 className={H2}>Most of my work happened before any design</h2>
          <p className="text-gray-700 leading-relaxed mb-2">I led:</p>
          <ul className={UL}>
            <li>Problem definition and challenge of the original brief</li>
            <li>Discovery planning and interview planning</li>
            <li>Competitive analysis of how other data tools handle schema visibility</li>
            <li>Five internal data engineer interviews</li>
            <li>Stakeholder alignment and playback</li>
            <li>Reframing and design direction shaping</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>"Search isn't the main issue. I need visibility."</h2>
          <p className={P}>I compared how Snowflake, dbt Cloud, notebooks and IDEs, and Matillion's own legacy product handle schema visibility, search and table previews, then interviewed five internal data engineers.</p>
          <p className={P}>Matillion ETL, Matillion's legacy product, was the main reference point. Users could search, view, and interact with schema metadata, including tables, SQL, and properties, directly within the canvas. That streamlined, automated workflow informed design decisions for the new Data Productivity Cloud.</p>
          <CaseImage
            src="/images/metl.png"
            alt="Matillion ETL's schema browser: the Environments panel lists every table, a menu filters by schema type, table type and columns, and a properties window shows a table's columns, types and keys"
            onOpen={open}
          />
          <p className="text-gray-700 leading-relaxed mb-2">The interviews set out to uncover:</p>
          <ul className={UL}>
            <li>How schemas fit into their actual workflow</li>
            <li>What information they prioritised</li>
            <li>How they searched, viewed, or reused schema data</li>
            <li>What the previous Matillion tool did well that the new product lacked</li>
            <li>Where the real pain points were</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">What they told me:</p>
          <ul className={UL}>
            <li>"I can't see the schema metadata unless I build a pipeline."</li>
            <li>"Previewing tables takes too many clicks."</li>
            <li>"Building pipelines is slower because nothing is pre-populated."</li>
            <li>"The old tool used to give me context instantly."</li>
          </ul>
          <h3 className={H3}>What engineers actually needed</h3>
          <ul className={UL}>
            <li>"I need to see metadata instantly, without building a pipeline first."</li>
            <li>"I need to preview table data with fewer clicks."</li>
            <li>"I need components to be pre-populated so I don't waste time on basics."</li>
          </ul>
          <p className={P}>Search was a symptom. Lack of visibility and context was the real problem.</p>
          <p className={P}>Engineers who'd used the old tool missed its instant context; those building new pipelines wanted components pre-filled.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Changing the question</h2>
          <Decision
            n={1}
            title="Question the request before building it"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'ship the search bar as a quick win, or spend a month finding out what problem it was meant to solve.' },
              { label: 'Why I pushed for a month:', text: 'shipping the wrong improvement is worse than shipping nothing. Search on its own would have added more interface, left the real problem untouched, and built the roadmap on assumptions.' },
              { label: 'Trade-off:', text: 'a month without a visible change, and a stakeholder whose idea I was questioning. I made the case with evidence, not opinion.' },
            ]}
          />
          <Decision
            n={2}
            title="Reframe the question"
            onOpen={open}
            lead={<FromTo from={'"Should we add search?"'} to={'"How do we make schema information visible, without extra steps?"'} />}
            parts={[
              { label: 'Why:', text: 'search addressed none of the three needs from the interviews directly.' },
            ]}
          />
          <Decision
            n={3}
            title="Merge two projects into one workflow"
            onOpen={open}
            parts={[
              { label: 'What I found:', text: 'two separate projects, Schema Enhancements and Pipeline Creation Modals, both needed better schema information, visibility and sampling.' },
              { label: 'What I proposed:', text: 'combine them into one end-to-end workflow, to avoid duplicated effort and keep the experience consistent.' },
              { label: 'To:', list: ['Increase impact', 'Reduce rework', 'Align UX across workflows', 'Simplify engineering implementation'] },
              { label: 'Trade-off:', text: "the schema work wouldn't ship as a feature of its own. Instead, my research shaped the designs of the merged workflow wherever schemas came up." },
            ]}
          >
            <ShippedFirst>The playback and the reframe. The designs came in the merged workflow, shaped by this research.</ShippedFirst>
          </Decision>
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
            <li><span className={LABEL}>A validated problem definition</span> that the whole team agreed on.</li>
          </ul>
          <h3 className={H3}>Expected impact</h3>
          <p className="text-gray-700 leading-relaxed mb-2">What we expected this to change, beyond what we measured:</p>
          <ul className={UL}>
            <li>A workflow that supports faster pipeline creation</li>
            <li>Reduced support burden through clearer schema navigation</li>
            <li>A more competitive schema experience compared to Snowflake and dbt</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>The most valuable design work often happens before design</h2>
          <p className={P}>Asking why, and backing it with evidence, avoided a shallow fix and moved the team towards a real workflow improvement.</p>
          <h3 className={H3}>The cost of skipping validation</h3>
          <p className={P}>If the team had shipped search without this research, they would have added a feature that addressed a symptom rather than the cause. Engineers would still have struggled to see schema metadata. Two overlapping projects would have continued running in parallel, duplicating effort. And the roadmap would have been built on assumptions rather than evidence.</p>
          <p className={P}>Pausing to ask why cost one month. Skipping it would have cost several sprints of misdirected work and a feature that didn't move the needle.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> pair the findings with a rough sketch of what "visible" could look like. Stakeholders understood the reframe, but a quick visual would have made the direction even easier to picture, and given the merged project a head start.</p>
          <h3 className={H3}>Next steps</h3>
          <ul className={UL}>
            <li>Schema sampling</li>
            <li>Metadata visibility improvements</li>
            <li>Pre-populated components</li>
            <li>Connected schema-to-pipeline workflows</li>
          </ul>
          <VisualSlot
            src="/images/schemas-concept-sketch.png"
            alt="A rough concept sketch: schema details and a table preview shown beside the pipeline canvas, without building a pipeline first"
            caption="A sketch of the direction, made for this case study."
            onOpen={open}
          />
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
