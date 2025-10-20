import React from 'react';
import BackButton from '../components/BackButton';

export default function WorkflowsPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />
      
      <img 
        src="/api/placeholder/800/500" 
        alt="Workflows"
        className="w-full rounded-lg mb-8"
      />
      
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Resolving workflow blockers to increase decision-making and productivity
      </h1>

      <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Role:</span> Product Designer
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Team:</span> Workflows Team
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
          <p className="text-gray-700">
            How do we remove friction from workflows to boost productivity?
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context & Challenge</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Users were experiencing workflow blockers that forced them to context-switch between different parts of the application. Tasks that should have been quick were taking significantly longer because users had to navigate away from their current work to complete related actions. This constant interruption reduced productivity and increased cognitive load.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Impact on Users</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Data engineers and analysts reported frustration with having to leave their pipelines to make configuration changes or access related information. The lack of contextual tools meant users were spending time navigating rather than doing their core work—transforming data.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Strategic Approach</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          I conducted user research to identify the most common workflow blockers:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Users had to navigate away to edit configuration settings</li>
          <li>Related actions were scattered across different screens</li>
          <li>Context-switching broke concentration and slowed work</li>
          <li>Users wanted quick access to related tools without losing their place</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Strategy</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The solution focused on 'in-context workflows'—bringing tools and actions directly into the user's current workspace. By embedding functionality contextually, users could complete tasks without navigation, maintaining flow state and productivity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution & Leadership</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Implementation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I designed in-context workflow patterns including side panels, inline editing, and contextual menus that surfaced relevant actions based on what users were working on. These patterns allowed users to complete related tasks without leaving their primary workspace.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Usability Testing</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Before full implementation, I conducted usability testing sessions to validate the approach. Users performed common tasks while we measured completion time and observed friction points. The testing revealed significant improvements in task efficiency and user satisfaction.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Collaboration</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Working with the engineering team, I ensured the in-context patterns were technically feasible and performant. We prioritized the highest-impact workflows first, then gradually expanded the pattern across the product.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="text-2xl font-bold text-gray-900 mb-2">7.4% task speed increase</p>
          <p className="text-gray-700">achieved through usability testing, with expected gains in product adoption post-implementation</p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The in-context workflows successfully removed major friction points. Users completed tasks faster, reported higher satisfaction, and experienced less cognitive load. The improved productivity translated to better overall platform engagement.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">User Feedback</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Users praised the ability to "stay in the flow" and appreciated not having to remember where different settings lived. The contextual approach made the product feel more intuitive and responsive to their needs.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Learnings & Takeaways</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Lessons Learned</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Context matters more than we often realize. By reducing the cognitive burden of navigation and context-switching, we enabled users to focus on their actual work. Small improvements in workflow efficiency compound into significant productivity gains.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Application</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The in-context workflow pattern has become a standard approach for new features. When designing new functionality, the team now defaults to asking "how can this be contextual?" rather than "where should this live in the navigation?"
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Future Outlook</h3>
        <p className="text-gray-700 leading-relaxed">
          Expected gains in product adoption post-implementation will be tracked through analytics and user feedback. The workflow improvements create a foundation for more advanced productivity features in future releases.
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