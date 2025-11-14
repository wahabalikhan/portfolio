import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

export default function SchemasPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Turning an anecdotal feature request into a validated, user-driven strategy
      </h1>

      <p className="text-gray-600 mb-4">August 2024 — September 2024 • ~1 month</p>

      <img
        src="/images/schema_bg.png"
        alt="Schemas"
        className="w-full rounded-lg mb-8 border border-gray-200"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Role:</span> Product Designer
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Team:</span> Designer Team (PM, PO) and another Product Designer
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <p className="text-gray-700 bg-yellow-50">
              ⚠️ The project began as a quick “feature win” by adding a search bar to the schemas panel but the real challenge was validating whether it solved genuine user pain or just an anecdotal request, requiring stakeholder buy-in to pause and reframe the problem around real user value
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Approach</h3>
          <p className="text-gray-700">
            I led end-to-end discovery, design, and validation, partnering with Product and Engineering to create space for research before build. Through competitor analysis, user interviews, and playbacks, I turned a narrow feature request into a strategic, user-centred workflow improvement that reshaped scope and priorities to align with business outcomes
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
            <p className="text-gray-700 bg-emerald-50 mb-2">
              ✅ Stakeholder alignment on merging two overlapping initiatives into one cohesive roadmap
            </p>
            <p className="text-gray-700 bg-emerald-50 mb-2">✅ Reframed scope from “add search” to improving schema management and usability end-to-end</p>
            <p className="text-gray-700 bg-emerald-50">✅ Set a foundation for future schema interaction design in the Data Productivity Cloud</p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Matillion’s Data Productivity Cloud (DPC) helps data teams transform and manage cloud-based data pipelines. While users could manage schemas in the legacy Matillion ETL product, the DPC version lacked parity — simple tasks like previewing data or adding schemas to pipelines required manual steps.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          My goal was to validate whether users truly needed a “search” function or if there were broader workflow gaps undermining efficiency and confidence.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Approach</h2>
        <p className="text-gray-700 leading-relaxed mb-8"> </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          I started with desk research comparing how tools like Snowflake and other IDEs managed schema interactions — revealing best practices around metadata visibility, search, and table previews.
        </p>
        <img
                    src="/images/metl.png"
                    alt="Schema presentation"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>Matillion ETL, their legacy product, used as a reference point in the schema research. It highlights how users could search, view, and interact with schema metadata — including tables, SQL, and properties — directly within the canvas, offering a streamlined, automated workflow that informed design decisions for the new Data Productivity Cloud.</p>
        <p className="text-gray-700 leading-relaxed mb-4">To ground findings, I conducted 5 interviews (5 internal data engineers) focused on:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>How schemas fit into their workflow</li>
          <li>What information they prioritised (metadata, tables, views)</li>
          <li>How they searched, viewed, or reused schema data</li>
          <li>What Matillion ETL did well that DPC currently lacked</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-4">
          Users consistently mentioned that “searching” wasn’t the real issue — it was visibility, friction, and lack of context. Data engineers wanted to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>View schema metadata without building a pipeline</li>
          <li>Preview table data instantly (sampling)</li>
          <li>Use drag-and-drop or pre-populated components to save time</li>
        </ul>


        <h3 className="text-xl font-semibold mb-3 text-gray-900">Key findings</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <ul className="list-disc list-inside text-gray-700 bg-blue-50 space-y-2">
            <li className='bg-blue-50'>Search was a symptom, not the problem. Users needed holistic schema visibility and faster access to context.</li>
            <li className='bg-blue-50'>Manual effort replaced automation. What was effortless in ETL felt slow in DPC.</li>
            <li className='bg-blue-50'>Sampling mattered. Engineers wanted to see data on the fly, not through extra configuration.</li>
            <li className='bg-blue-50'>Design opportunity: Integrate schema interactions with pipeline creation for an end-to-end, intuitive experience.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The research exposed overlapping pain points between two initiatives — Schema Enhancements and Pipeline Creation Modals.
I proposed merging them, creating a single project addressing both data integrity and usability in one experience.</p>

        <p className="text-gray-700 leading-relaxed mb-6">This scope merge streamlined development, aligned teams, and ensured design consistency across workflows. I mapped key user flows from ETL to DPC, highlighting missing yet high-value interactions: search, metadata visibility, and schema sampling — features that directly improved productivity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation & Playback</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          I organised a playback session with stakeholders, presenting findings through real user quotes, flow diagrams, and competitor examples. Framing the story around user impact — not features — changed the conversation.
Stakeholders immediately recognised the strategic value: “just search” had evolved into a validated, user-driven roadmap for schema management.</p>

<img
                    src="/images/slides.png"
                    alt="Schema presentation"
                    className="w-full rounded-lg mb-4"
                />

        <p className="text-gray-700 leading-relaxed mb-6">The presentation resonated strongly. Feedback from leadership called it “clear, actionable, and aligned with user workflows.” The team agreed to prioritise merging both initiatives for the next release phase.
        </p>

      </section>

      <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                    <ul className="list-disc list-inside text-gray-700 bg-emerald-50 space-y-2">
                        <li className='bg-emerald-50'>✅ Stakeholder buy-in to expand scope and merge related projects</li>
                        <li className='bg-emerald-50'>✅ Alignment across Product, Design, and Engineering on a unified schema workflow vision</li>
                        <li className='bg-emerald-50'>✅ Stronger foundation for user-centred iteration in future schema enhancements</li>
                    </ul>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This pivot turned what began as a “quick win” into a validated, impactful direction that better serves data engineers and strengthens Matillion’s competitive position.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Feedback</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Stakeholders praised the clarity and relevance of the research, noting how it “connected the dots between user value and business goals.” Data engineers confirmed that the proposed changes — instant schema previews, metadata visibility, and reduced manual setup — would directly improve their daily workflows.
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This project reinforced the power of pushing back with purpose. Saying “let’s validate first” helped transform a feature request into a strategic product improvement. I learned that aligning multiple teams through user evidence not only builds better products — it builds trust.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The validated scope now paves the way for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Schema sampling directly in DPC</li>
          <li>Pre-populated schema components for drag-and-drop workflows</li>
          <li>Extended metadata and comparison features integrated into future versions</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">These iterations will continue improving visibility, efficiency, and user trust across the Data Productivity Cloud.</p>
            </section>





      {/* 
      <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Role:</span> Product Designer
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Team:</span> Reshape Team
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
          <p className="text-gray-700">
            Should we build the 'Schemas' feature as a quick-win, or validate it first?
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context & Challenge</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Stakeholders believed that adding 'Schemas' functionality would be a time-sensitive quick-win for users. However, there was no research to validate this assumption. The request came during a critical product roadmap planning phase where prioritization decisions would impact the next quarter.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">🔍 HMW (How Might We)</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          How do we ensure users have confidence in seeing changes—when performing Git operations?
        </p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
          <p className="font-semibold text-gray-900 mb-2">🎯 Value to business and user</p>
          <p className="text-gray-700 mb-4">
            By validating assumptions before building, we could:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Avoid wasting engineering resources on unvalidated features</li>
            <li>Build confidence with stakeholders through data-driven decisions</li>
            <li>Ensure we're solving real user problems</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Strategic Approach</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Research Methods</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I conducted a comprehensive research study including:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li><span className="font-semibold">Stakeholder interviews</span> to understand business assumptions</li>
          <li><span className="font-semibold">User interviews with Data Engineers</span> about their workflow with schemas</li>
          <li><span className="font-semibold">Competitive analysis</span> of how other tools handle schema management</li>
          <li><span className="font-semibold">Usage analytics</span> to understand current pain points</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Research Findings</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The research revealed several critical insights:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Users didn't need the proposed quick-win feature</li>
          <li>The real pain point was in the reshape workflow, not schema visibility</li>
          <li>Data engineers wanted better ways to merge and reorganize schemas</li>
          <li>Priorities needed to shift toward workflow optimization</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution & Impact</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Stakeholder Management</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I presented the research findings to stakeholders, clearly showing the disconnect between assumptions and user needs. By framing the insights around business outcomes and user value, I secured buy-in to pivot the roadmap toward the validated priorities.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Strategic Pivot</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Based on the research, we refined the reshape priorities and focused on merge workflows instead. This alignment between user needs and business goals led to better-scoped features that would deliver real value.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="text-2xl font-bold text-gray-900 mb-2">12.3% increase</p>
          <p className="text-gray-700">in stakeholder confidence through research-backed decisions</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Learnings & Takeaways</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Lessons Learned</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Research is an investment, not a delay. By taking time to validate assumptions, we saved significant engineering effort and built the right features. Stakeholder confidence increased because decisions were backed by data rather than intuition.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Application</h3>
        <p className="text-gray-700 leading-relaxed">
          This project established a precedent for research-first decision making in our team. It demonstrated the value of questioning assumptions and using data to guide product strategy, a practice that has influenced subsequent roadmap planning.
        </p>
      </section> */}
      <Footer />
    </div>
  );
}