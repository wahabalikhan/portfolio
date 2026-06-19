import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CaseStudyMeta from '../components/CaseStudyMeta';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import { usePageTitle } from '../hooks/usePageTitle';

export default function SchemasPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  usePageTitle('Reframing a quick-win request into a user-validated strategy');
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 tab-panel" role="main">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        Reframing a quick-win request into a user-validated strategy
      </h1>

      <p className="text-lg text-gray-700 mt-4 mb-4 leading-relaxed">
        Sometimes the most important design work happens before design. This project is about pushing back with purpose, validating a feature request nobody had questioned, and reshaping a roadmap based on what users actually needed.
      </p>

      <CaseStudyMeta items={[
        { label: 'Timeline', value: 'August 2024 – September 2024 · 1 month' },
        { label: 'Team', value: 'Designer working with Product Manager, Product Owner, and 1 additional Product Designer' },
        { label: 'Role', value: 'Product Designer. Research, strategy, metrics, stakeholder playback.' },
      ]} />


      <img
        src="/images/schema_bg.png"
        alt="Schemas"
        className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setSelectedImage({ src: '/images/schema_bg.png', alt: 'Schemas' })}
      />

      <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">

        <div>
          <h3 className="font-bold text-gray-900 mb-2">The Challenge</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">⚠️ In data tools, a schema is the structure of a database: the tables, columns, and relationships that define how data is organised. For data engineers using Matillion, schemas are referenced constantly while building pipelines. But in Matillion's newer product, schema information was buried. Engineers couldn't see what they needed without building a pipeline first, which created friction at every step.</p>
            <p className="text-gray-700 leading-relaxed mb-4">A stakeholder proposed a quick fix: add a search bar to the schema panel.</p>
            <p className="text-gray-700 leading-relaxed mb-2">It seemed reasonable. But search is only useful if engineers can already see the information they're searching through. The real question wasn't "should we add search?" It was "why can't engineers find what they need?"</p>
            <p className="text-gray-700 leading-relaxed mb-2">Without knowing that, the team risked <span className="font-bold">shipping the wrong improvement.</span></p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">My Role</h3>
          <p className="text-gray-700 leading-relaxed mb-2">I led:</p>
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside'>
              <li>Problem definition and challenge of the original brief</li>
              <li>Discovery planning and interview planning</li>
              <li>Competitive analysis of how other data tools handle schema visibility</li>
              <li>Five internal data engineer interviews</li>
              <li>Stakeholder alignment and playback</li>
              <li>Reframing and design direction shaping</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">The real design work happened before Figma opened.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Results</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
            <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span className="font-bold">12.3% increase in stakeholder confidence</span></p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              ✅ <span className="font-bold">Stakeholder alignment</span> on merging two overlapping projects into one roadmap
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span className="font-bold">Scope reframed</span> from "add search" to "fix schema usability end-to-end"</p>
            <p className="text-gray-700 bg-emerald-50">✅ <span className="font-bold">A validated problem definition</span> that everyone agreed on</p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Schemas power nearly every pipeline in Matillion's Data Productivity Cloud. But in the early versions of the product, schema management lacked the visibility that engineers had relied on in the previous Matillion tool. They were slower, less confident, and more frustrated.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          A stakeholder requested a quick win: just add search to the schema panel.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          But the request didn't match what I'd been hearing across teams. Search might help. But it might not. So the question was: what problem is search supposed to solve?
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Why I Pushed for Validation</h2>
        <p className="text-gray-700 leading-relaxed mb-6">Because shipping the wrong improvement is worse than shipping nothing.</p>
        <p className="text-gray-700 leading-relaxed mb-8">If search wasn't the real problem, adding it would have created UI noise, ignored the deeper workflow pain, and reinforced local assumptions rather than real user needs. This project became a test of pushing back with purpose.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Research and Insights</h3>
        <p className="text-gray-700 leading-relaxed mb-2">I started with desk research and competitive analysis, looking at how the following handled metadata visibility, search, and table previews:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Snowflake</li>
            <li>dbt Cloud</li>
            <li>Notebooks and IDEs</li>
            <li>Matillion's own legacy product</li>
          </ul>
        </p>
        <img
          src="/images/metl.png"
          alt="Schema presentation"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/metl.png', alt: 'Schema presentation' })}
        />
        <p className='mb-8 text-xs'>Matillion ETL, their legacy product, used as a reference point in the schema research. It highlights how users could search, view, and interact with schema metadata, including tables, SQL, and properties, directly within the canvas, offering a streamlined, automated workflow that informed design decisions for the new Data Productivity Cloud.</p>
        <p className="text-gray-700 leading-relaxed mb-6">Then I ran <span className='font-bold'>5 internal data engineer interviews</span> to uncover:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>How schemas fit into their actual workflow</li>
            <li>What information they prioritised</li>
            <li>How they searched, viewed, or reused schema data</li>
            <li>What the previous Matillion tool did well that the new product lacked</li>
            <li>Where the real pain points were</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">What users told me:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>"I can't see the schema metadata unless I build a pipeline."</li>
            <li>"Previewing tables takes too many clicks."</li>
            <li>"Building pipelines is slower because nothing is pre-populated."</li>
            <li>"The old tool used to give me context instantly."</li>
            <li>"Search isn't the main issue. I need visibility."</li>
          </ul>
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Reframing the problem</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside font-bold'>
              <li>"I need to see metadata instantly, without building a pipeline first."</li>
              <li>"I need to preview table data with fewer clicks."</li>
              <li>"I need components to be pre-populated so I don't waste time on basics."</li>
            </ul>

          </p>
          <p className="text-gray-700 leading-relaxed mb-2">Search was a symptom.</p>
          <p className="text-gray-700 leading-relaxed mb-2">Lack of visibility and context was the real problem.</p>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Building the playback</h3>
        <p className="text-gray-700 leading-relaxed mb-2">I built a playback deck showing:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Side-by-side comparisons of competitors and the legacy product against the current state</li>
            <li>Best-practice patterns from other data tools</li>
            <li>Direct quotes and insights from interviews</li>
            <li>The gaps affecting productivity</li>
          </ul>
        </p>

        <img
          src="/images/slides.png"
          alt="Schema presentation"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/slides.png', alt: 'Schema presentation' })}
        />

        <p className="text-gray-700 leading-relaxed mb-4">I reframed the decision from: "Should we add search?"</p>

        <p className="text-gray-700 leading-relaxed mb-4">to</p>

        <p className="text-gray-700 leading-relaxed mb-4 font-bold">"How do we make schema interactions intuitive, visible, and low-friction?"</p>

        <p className="text-gray-700 leading-relaxed mb-4">Stakeholders understood the difference immediately.</p>

      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
        <p className="text-gray-700 leading-relaxed mb-2">The research revealed <span className='font-bold'>two overlapping projects running in parallel:</span></p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Schema Enhancements</li>
            <li>Pipeline Creation Modals</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">Both required better schema metadata, visibility, and sampling.</p>

        <p className="text-gray-700 leading-relaxed mb-2">I proposed merging them into a <span className='font-bold'>single, user-centred project</span> to:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Increase impact</li>
            <li>Reduce rework</li>
            <li>Align UX across workflows</li>
            <li>Simplify engineering implementation</li>
          </ul>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation and Playback</h2>
        <p className="text-gray-700 leading-relaxed mb-2">In the playback session:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Stakeholders responded strongly to the story around user impact rather than features</li>
            <li>They agreed the initial request was too narrow and supported merging the initiatives</li>
            <li>What had started as a quick-win feature request had evolved into a validated, user-driven roadmap for schema management</li>
          </ul>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes and Impact</h2>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
          <p className="text-gray-700 bg-emerald-50 mb-6">While the project didn't ship before I moved on, it delivered measurable value internally:</p>
          <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span className="font-bold">12.3% increase in stakeholder confidence</span></p>
          <p className="text-gray-700 bg-emerald-50 mb-2">
            ✅ <span className="font-bold">Stakeholder alignment</span> on merging two projects into one roadmap
          </p>
          <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span className="font-bold">Scope reframed</span> from "add search" to "fix schema usability end-to-end"</p>
          <p className="text-gray-700 bg-emerald-50">✅ <span className="font-bold">A validated problem definition</span> that the whole team agreed on</p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Business outcome</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Business value:</p>
          <p className="text-gray-700 bg-blue-50">
            <ul className='list-disc list-inside'>
              <li>A future design that reduces engineering build time</li>
              <li>A more competitive schema experience compared to Snowflake and dbt</li>
              <li>A workflow that supports faster pipeline creation</li>
              <li>A more intuitive onboarding experience for new users</li>
              <li>Reduced support burden through clearer schema navigation</li>
              <li>Stronger trust in Matillion's UX practice</li>
            </ul>
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">The cost of skipping validation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          If the team had shipped search without this research, they would have added a feature that addressed a symptom rather than the cause. Engineers would still have struggled to see schema metadata. Two overlapping projects would have continued running in parallel, duplicating effort. And the roadmap would have been built on assumptions rather than evidence.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">Pausing to ask why cost one month. Skipping it would have cost several sprints of misdirected work and a feature that didn't move the needle.</p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          This project taught me that <span className="font-bold">the most valuable design work often happens before design.</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">Asking why and backing it with evidence helped avoid a shallow fix and move toward a meaningful workflow improvement. I didn't just design a solution. I reshaped the problem.</p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
        <p className="text-gray-700 leading-relaxed">
          <ul className='list-disc list-inside'>
            <li>Schema sampling</li>
            <li>Metadata visibility improvements</li>
            <li>Pre-populated components</li>
            <li>Connected schema-to-pipeline workflows</li>
          </ul>


        </p>
      </section>

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
