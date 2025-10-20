import React from 'react';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

export default function GitDiffPage({ setCurrentPage }) {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <BackButton onClick={() => setCurrentPage('home')} />

            <h1 className="text-4xl font-bold mb-8 text-gray-900">
                How user-centric design improved visibility of user changes
            </h1>

            <img
                src="/images/matillion-bg.png"
                alt="Git Diff"
                className="w-full rounded-lg mb-8 border border-gray-200"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Role:</span> Product Designer
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Team:</span> DataOps Team (PO, Engs) and another Product Designer
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
                    <p className="text-gray-700">
                        How do we ensure users have confidence in seeing changes—when performing Git operations?
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Approach</h3>
                    <p className="text-gray-700">
                        I owned the end-to-end process of discovery, design & testing strategy and metric tracking (on-going) to ensure the success of the feature—and suggest changes for future phases
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                        <p className="text-gray-700 bg-emerald-50">
                            <span className="font-bold bg-emerald-50">✅ 34% increase</span> in Committing and <span className="font-bold bg-emerald-50">15% decrease</span> in Git resets as a result of Git Diff and seeing changes before committing
                        </p>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Matillion is a cloud-native data transformation platform that enables businesses to extract, load, and transform data in modern cloud data warehouses. As a Product Designer on the DataOps team, I worked on improving the Git integration experience within our product, the Data Productivity Cloud.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    I led the design of Git Diff, a new visibility feature within Matillion’s data transformation platform that gave data engineers confidence when managing version control. Working within the Platform team, I shaped the end-to-end experience — from discovery and user research through to design, testing, and metric tracking. Git Diff enabled users to see exactly what changed before committing, reducing uncertainty and streamlining collaboration. The rollout drove a 34% increase in commits, a 15% reduction in Git resets, and a broader 25% uplift in engagement across Git workflows.
                </p>
            </section>

            <section className="mb-12">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-yellow-50 mb-2">⚠️ Lack of visibility, uncertainty and reduced confidence</p>
                    <p className="text-gray-700 bg-yellow-50">
                        Users struggled to understand what changes were being made when performing Git operations. The lack of visibility created uncertainty and reduced confidence in the platform, particularly for teams collaborating on complex data transformation projects.
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Add real-time capability for changed jobs and pipelines</li>
                    <li>Maintain familiarity for users already comfortable with Git workflows</li>
                    <li>Increase confidence through better visibility</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Value to business and user</p>
                    <p className="text-gray-700 bg-blue-50">
                        Improving Git visibility would increase user confidence, reduce errors, and improve team collaboration—ultimately leading to better adoption of Git features within Matillion.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Strategic Approach</h2>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    I conducted competitor analysis and user research to understand pain points around Git operations:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Users couldn't see what changed before committing</li>
                    <li>Teams struggled to review changes from collaborators</li>
                    <li>The existing Git UI lacked clarity on file modifications</li>
                    <li>Users wanted a familiar Git experience similar to traditional dev tools</li>
                </ul>

                <img
                    src="/images/diff_research_1.png"
                    alt="Git Diff research"
                    className="w-full rounded-lg mb-4"
                />

                <p className='mb-8 text-xs'>User interviews exploring topics such as experience with existing Git functions, what worked well, what needed improvement, workarounds, priority of information, and defining the Minimum Viable Product from the user’s perspective.</p>

                <img
                    src="/images/diff_workshop.png"
                    alt="Git Diff workshop"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>A collaborative workshop that moved from discovery and scoping through How Might We framing, two rounds of ideation, and group voting to select iterations to progress into design.</p>


                <h3 className="text-xl font-semibold mb-3 text-gray-900">Key findings</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Highlighting differences (added, changed, deleted) clearly through text format</li>
                    <li>Previous vs current commit comparison</li>
                    <li>Accept/reject differences when merging files</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ideation & Design</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    We explored multiple ways to make Git changes more transparent without disrupting existing workflows. Two main directions emerged:
Inline visibility, where users could see changes directly within their workspace, and side-by-side comparison, mirroring the familiarity of established Git tools. The latter was prioritised for its clarity and alignment with user expectations uncovered in research.</p>

<p className="text-gray-700 leading-relaxed mb-6">From early flows to high-fidelity prototypes, I focused on making diffs scannable and trustworthy — introducing visual indicators, contextual metadata, and lightweight animations to help users understand what changed and why. Alongside the core feature, I identified and designed several quality-of-life improvements across the Git experience, reducing friction and aligning interactions with broader platform patterns.
                </p>

                <img
                    src="/images/diff_flow.png"
                    alt="Git Diff flow"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>A collaborative workshop that moved from discovery and scoping through How Might We framing, two rounds of ideation, and group voting to select iterations to progress into design.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Implementation</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    I designed and shipped a comprehensive Git Diff feature that showed users exactly what changed in their pipelines and transformations. The solution included visual indicators, side-by-side comparisons, and contextual information about modifications. Additionally, I implemented several quality-of-life improvements to streamline the entire Git workflow.
                </p>

                <img
                    src="/images/diff_screen.png"
                    alt="Git Diff screen"
                    className="w-full mb-4"
                />

                <p className='mb-8 text-xs'>User interviews exploring topics such as experience with existing Git functions, what worked well, what needed improvement, workarounds, priority of information, and defining the Minimum Viable Product from the user’s perspective.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Collaboration</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    I worked closely with engineering to ensure technical feasibility while maintaining design quality. Regular check-ins with the product team helped prioritize features, and user testing sessions validated our approach before full rollout.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation & Testing</h2>
                <img
                    src="/images/testing1.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>A collaborative workshop that moved from discovery and scoping through How Might We framing, two rounds of ideation, and group voting to select iterations to progress into design.</p>

                <img
                    src="/images/testing2.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>A collaborative workshop that moved from discovery and scoping through How Might We framing, two rounds of ideation, and group voting to select iterations to progress into design.</p>

            </section>

            

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                    <p className="font-bold text-gray-900 bg-emerald-50 mb-2">✅ 34% increase in Committing and 15% decrease in Git resets</p>
                    <p className="text-gray-700 bg-emerald-50">as a result of Git Diff and seeing changes before committing</p>
                </div>
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
            <Footer />
        </div>
    );
}