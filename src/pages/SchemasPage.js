import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function SchemasPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        Turning an anecdotal feature request into a validated, user-driven strategy
      </h1>

      <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> August 2024 — September 2024 ~ 1 month</p>
      <p className="text-gray-600 mb-4"><span className="font-semibold">Team:</span> Designer (PM, PO), 1 additional Product Designer</p>


      <img
        src="/images/schema_bg.png"
        alt="Schemas"
        className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setSelectedImage({ src: '/images/schema_bg.png', alt: 'Schemas' })}
      />

      <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">

        <div>
          <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-2">⚠️ The real challenge wasn’t adding search. <span className="font-bold">It was validating whether search mattered at all.</span></p>
            <p className="text-gray-700 leading-relaxed mb-2">Adding the feature blindly would have:</p>
            <p className="text-gray-700 mb-6">
              <ul className='list-disc list-inside'>
                <li>Added UI noise</li>
                <li>Ignored deeper workflow pain</li>
                <li>Reinforced local biases instead of real user needs</li>
              </ul>

            </p>
            <p className="text-gray-700 leading-relaxed mb-2">This project became a test of <span className="font-bold">pushing back with purpose.</span></p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Role: Product Designer (research, strategy, metrics/playback)</h3>
          <p className="text-gray-700 leading-relaxed mb-2">I led:</p>
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside'>
              <li>Problem definition</li>
              <li>Discovery & interview planning</li>
              <li>Competitive analysis</li>
              <li>User interviews (5 internal data engineers)</li>
              <li>Stakeholder alignment</li>
              <li>Playback & reframing</li>
              <li>Design direction shaping</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">The real design work happened before Figma even opened.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
            <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span class="font-bold">Stakeholder confidence increase by 12.3%</span></p>
            <p className="text-gray-700 bg-emerald-50 mb-2">
              ✅ <span class="font-bold">Stakeholder alignment</span> on merging two projects into one roadmap
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span class="font-bold">Reframed scope</span> from “add search” to “fix schema usability end-to-end”</p>
            <p className="text-gray-700 bg-emerald-50">✅ <span class="font-bold">A validated problem definition</span> everyone agreed on</p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Schemas power nearly every pipeline in Matillion DPC. But in the early versions of the product, schema management lacked parity with the previous Matillion ETL tool — slowing engineers down.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          A stakeholder requested a “quick win”: “Just add search to the schema panel.”
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          But it wasn’t clear if a search bar actually solved the real user problem.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Approach</h2>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Why I pushed for validation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">Because the request didn’t match the symptoms I’d heard across teams. Search might help, but it might not. So the question was: <span className='font-bold'>“What problem is search supposed to solve?”</span></p>
        <p className="text-gray-700 leading-relaxed mb-8">Without knowing that, we risked shipping the wrong improvement.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Research & Insights</h3>
        <p className="text-gray-700 leading-relaxed mb-2">Started with desk research and competitor analyis to revealing best practices around metadata visibility, search, and table previews.. I analysed:</p>
        <p className="text-gray-700 mb-6">
          <ul className='list-disc list-inside'>
            <li>Snowflake</li>
            <li>DBT Cloud</li>
            <li>Notebooks/IDEs</li>
            <li>Matillion ETL (legacy product)</li>
          </ul>
        </p>
        <img
          src="/images/metl.png"
          alt="Schema presentation"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/metl.png', alt: 'Schema presentation' })}
        />
        <p className='mb-8 text-xs'>Matillion ETL, their legacy product, used as a reference point in the schema research. It highlights how users could search, view, and interact with schema metadata — including tables, SQL, and properties — directly within the canvas, offering a streamlined, automated workflow that informed design decisions for the new Data Productivity Cloud.</p>
        <p className="text-gray-700 leading-relaxed mb-6">Then I ran (internal) <span className='font-bold'>5 data engineer interviews</span> to uncover:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>How schemas fit into their workflow</li>
            <li>What information they prioritised (metadata, tables, views)</li>
            <li>How they searched, viewed, or reused schema data</li>
            <li>What Matillion ETL did well that DPC currently lacked</li>
            <li>And <span className='font-bold'>pain points</span></li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">Users told me:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>“I can’t see the schema metadata unless I build a pipeline.”</li>
            <li>“Previewing tables takes too many clicks.”</li>
            <li>“Building pipelines is slower because nothing is pre-populated.”</li>
            <li>“ETL used to give me context instantly.”</li>
            <li>“Search isn’t the main issue — I need visibility.”</li>
          </ul>
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">User Needs (framed as problems)</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <p className="text-gray-700 mb-6">
            <ul className='list-disc list-inside font-bold'>
              <li>“I need to see metadata instantly, not after building a pipeline.”</li>
              <li>“I need to sample table data on the fly.”</li>
              <li>“I need components to be pre-populated so I don’t waste time configuring basics.”</li>
            </ul>

          </p>
          <p className="text-gray-700 leading-relaxed mb-2">Search was a symptom.</p>
          <p className="text-gray-700 leading-relaxed mb-2">Lack of visibility and context was the real problem.</p>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Reframing the problem</h3>
        <p className="text-gray-700 leading-relaxed mb-2">I built a playback deck showing:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Side-by-side comparisons (Competitors (and METL) vs DPC)</li>
            <li>Best-practice patterns from other data tools</li>
            <li>Quotes and insights from interviews</li>
            <li>Other friction points along with the user's actual problem</li>
            <li>Gaps affecting productivity</li>
          </ul>
        </p>

        <img
          src="/images/slides.png"
          alt="Schema presentation"
          className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage({ src: '/images/slides.png', alt: 'Schema presentation' })}
        />

        <p className="text-gray-700 leading-relaxed mb-4">I reframed the decision from: ❌ “Should we add search?”</p>

        <p className="text-gray-700 leading-relaxed mb-4">to</p>

        <p className="text-gray-700 leading-relaxed mb-4">✅ “How do we make schema interactions intuitive, visible, and low-friction?”</p>

        <p className="text-gray-700 leading-relaxed mb-4">Stakeholders immediately understood the difference.</p>

      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
        <p className="text-gray-700 leading-relaxed mb-2">The research revealed <span className='font-bold'>two overlapping projects:</span></p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Schema Enhancements</li>
            <li>Pipeline Creation Modals</li>
            <li>And immediately recognised the strategic value: "just search" had evolved into a validated, user-driven roadmap for schema management.</li>

          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">Both required better schema metadata, visibility, and sampling.</p>

        <p className="text-gray-700 leading-relaxed mb-2">I proposed merging the two into a <span className='font-bold'>single, user-centred project</span> to:</p>
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
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation & Playback</h2>
        <p className="text-gray-700 leading-relaxed mb-2">In the playback session:</p>
        <p className="text-gray-700 mb-8">
          <ul className='list-disc list-inside'>
            <li>Stakeholders responded strongly to the story around user impact, not features</li>
            <li>They agreed the initial request was too narrow and supported merging initiatives for efficiency</li>
            <li>And immediately recognised the strategic value: "just search" had evolved into a validated, user-driven roadmap for schema management.</li>

          </ul>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
          <p className="text-gray-700 bg-emerald-50 mb-6">While the project didn’t ship yet, it delivered measurable value internally:</p>
          <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span class="font-bold">Stakeholder confidence increase by 12.3%</span></p>
          <p className="text-gray-700 bg-emerald-50 mb-2">
            ✅ <span class="font-bold">Stakeholder alignment</span> on merging two projects into one roadmap
          </p>
          <p className="text-gray-700 bg-emerald-50 mb-2">✅ <span class="font-bold">Reframed scope</span> from “add search” to “fix schema usability end-to-end”</p>
          <p className="text-gray-700 bg-emerald-50">✅ <span class="font-bold">A validated problem definition</span> everyone agreed on</p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Business outcome</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 This validation step resulted in:</p>
          <p className="text-gray-700 bg-blue-50">
            <ul className='list-disc list-inside'>
              <li>A future design that reduces engineering build time</li>
              <li>A more competitive schema experience vs Snowflake/DBT</li>
              <li>A workflow that supports faster pipeline creation</li>
              <li>A more intuitive onboarding experience for new users</li>
              <li>Reduced support burden due to clearer schema navigation</li>
              <li>Stronger trust in Matillion’s UX practice</li>
            </ul>
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">What would have happened without me</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          <ul className='list-disc list-inside'>
            <li>The team would have built search — and missed the real workflow gaps</li>
            <li>Schema visibility and sampling wouldn’t have been prioritised</li>
            <li>Stakeholders wouldn’t have seen the bigger opportunity</li>
            <li>Two overlapping projects wouldn’t have merged</li>
            <li>The roadmap would have been filled with low-impact tickets</li>
          </ul>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">I didn’t just design the solution. <span className="font-bold">I reshaped the problem</span>.</p>


        <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          This project taught me that <span className="font-bold">the most valuable design happens before design.</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">Asking “Why?” and backing it with evidence helped avoid a shallow fix and instead move toward a meaningful workflow improvement.</p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
        <p className="text-gray-700 leading-relaxed">
          <ul className='list-disc list-inside'>
            <li>Schema sampling</li>
            <li>Metadata visibility</li>
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
