import React from 'react';
import BackButton from '../components/BackButton';

export default function GitDiffPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />
      
      <img 
        src="/api/placeholder/800/500" 
        alt="Git Diff"
        className="w-full rounded-lg mb-8"
      />
      
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        How user-centric design improved visibility of user changes
      </h1>

      <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Role:</span> Product Designer
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Team:</span> Platform Team
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
          <p className="text-gray-700">
            How do we ensure users have confidence in seeing changes—when performing Git operations?
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context & Challenge</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Organisation & Role</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Matillion is a cloud-native data transformation platform that enables businesses to extract, load, and transform data in modern cloud data warehouses. As a Product Designer on the Platform Team, I worked on improving the Git integration experience within our ETL (Extract, Transform, Load) product.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Users struggled to understand what changes were being made when performing Git operations. The lack of visibility created uncertainty and reduced confidence in the platform, particularly for teams collaborating on complex data transformation projects.
        </p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
          <p className="font-semibold text-gray-900 mb-2">🎯 Value to business and user</p>
          <p className="text-gray-700">
            Improving Git visibility would increase user confidence, reduce errors, and improve team collaboration—ultimately leading to better adoption of Git features within Matillion.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Strategic Approach</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          I conducted user research to understand pain points around Git operations:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Users couldn't see what changed before committing</li>
          <li>Teams struggled to review changes from collaborators</li>
          <li>The existing Git UI lacked clarity on file modifications</li>
          <li>Users wanted a familiar Git experience similar to traditional dev tools</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Add real-time Git Diff capability for changed jobs and pipelines</li>
          <li>Improve overall quality of life in the Git experience</li>
          <li>Maintain familiarity for users already comfortable with Git workflows</li>
          <li>Increase confidence through better visibility</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution & Leadership</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Implementation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I designed and shipped a comprehensive Git Diff feature that showed users exactly what changed in their pipelines and transformations. The solution included visual indicators, side-by-side comparisons, and contextual information about modifications. Additionally, I implemented several quality-of-life improvements to streamline the entire Git workflow.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Collaboration</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I worked closely with engineering to ensure technical feasibility while maintaining design quality. Regular check-ins with the product team helped prioritize features, and user testing sessions validated our approach before full rollout.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="text-2xl font-bold text-gray-900 mb-2">25-26% increase</p>
          <p className="text-gray-700">in key user interactions with Git features</p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The Git Diff feature significantly improved user confidence and engagement with version control features. Users reported feeling more secure when making changes, and collaboration between team members became smoother. The quality-of-life improvements reduced friction in daily workflows.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Learnings & Takeaways</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Lessons Learned</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Visibility builds confidence. By showing users exactly what was changing, we removed uncertainty and increased their willingness to use advanced features. Small quality-of-life improvements alongside major features can significantly enhance the overall experience.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Application</h3>
        <p className="text-gray-700 leading-relaxed">
          This project reinforced the importance of transparent interfaces, especially for technical users. The principle of "show, don't tell" became a guiding principle for future platform features.
        </p>
      </section>
    </div>
  );
}