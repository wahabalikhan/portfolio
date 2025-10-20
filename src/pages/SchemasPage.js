import React from 'react';
import BackButton from '../components/BackButton';

export default function SchemasPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />
      
      <img 
        src="/api/placeholder/800/500" 
        alt="Schemas"
        className="w-full rounded-lg mb-8"
      />
      
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Validating stakeholder assumptions with research-driven insights
      </h1>

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
      </section>
      <footer className="border-t border-gray-200 pt-8 pb-12">
        <p className="text-gray-600 text-sm">
          Made with ❤️ using my current coding knowledge, Claude, VS Code Copilot and anything else I got my hands on! © Wahab Ali Khan 2025
        </p>
      </footer>
    </div>
  );
}