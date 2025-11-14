import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

export default function GitDiffPage() {
    const navigate = useNavigate();
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                How user-centric design improved visibility of user changes
            </h1>

            <p className="text-gray-600 mb-4">Oct 2023 — Dec 2023 • ~3 months</p>

            <img
                src="/images/matillion-bg.png"
                alt="Git Diff"
                className="w-full rounded-lg mb-8 border border-gray-200"
            />

            {/* Make Challenge prominent and full-width on small screens */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Challenge</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
                    <p className="text-gray-700 bg-yellow-50">
                        ⚠️ Data engineers struggled to see what changed before committing, creating <span className='font-semibold text-gray-900 bg-yellow-50'>uncertainty</span> and frequent Git resets. The challenge: <span className='font-semibold text-gray-900 bg-yellow-50'>build trust and visibility</span> into version control workflows without disrupting established habits.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">What I did</h3>
                    <p className="text-gray-700 mb-4">
                        I led end-to-end discovery, design and testing: drafting the research plan, running interviews, defining flows, prototyping side-by-side diffs, and working with engineers on implementation and metric instrumentation. I owned stakeholder communication and prioritisation across Product and Engineering.
                    </p>
                    <h3 className="font-bold text-gray-900 mb-2">Team</h3>
                    <p className="text-gray-700">
                        Product Designer (me), Product Owner, 2 Engineers + DataOps stakeholders
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Impact (metrics)</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ 34% increase</span> in Git commits
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ 15% decrease</span> in Git resets
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
                    I led the design of Git Diff, a new visibility feature within Matillion’s Data Producutivity Cloud that gave data engineers confidence when managing version control. Working within the DataOps team, I shaped the end-to-end experience from discovery and user research through to design, testing, and metric tracking. Git Diff enabled users to see exactly what changed before committing, reducing uncertainty and streamlining collaboration.
                </p>
            </section>

            <section className="mb-12">

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Add real-time capability for changed pipelines</li>
                    <li>Maintain familiarity for data engineers already comfortable with Git workflows</li>
                    <li>Increase confidence through better visibility</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Value to business and user</p>
                    <p className="text-gray-700 bg-blue-50">
                        Improving Git visibility would increase user confidence, reduce errors, and improve team collaboration ultimately leading to better adoption of Git features within Matillion.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Approach</h2>
                <p className="text-gray-700 leading-relaxed mb-8">I led discovery, design, and testing across the full lifecycle — from competitor analysis and user interviews to prototyping and rollout. I defined the research plan, facilitated ideation workshops, and set up ongoing metrics to track adoption and confidence post-launch.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    I ran competitive analysis on leading IDEs, conducted 5 interviews with internal data engineers, and ran a cross-functional workshop to co-create solutions. Interviews focused on workflows, pain points, and how engineers currently validate changes before committing. The goal was to surface clear user needs to inform concept selection.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Users need a way to easily understand what changed with a commit (side-by-side comparison)</li>
                    <li>Users need clearer, scannable change indicators to reduce cognitive load</li>
                    <li>Users need a Git experience that feels familiar to their existing workflows while surfacing the right context for data pipelines</li>
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
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <ul className="list-disc list-inside text-gray-700 bg-blue-50 space-y-2">
                        <li className='bg-blue-50'>Highlighting differences (added, changed, deleted) clearly through text format</li>
                        <li className='bg-blue-50'>Previous vs current commit comparison</li>
                        <li className='bg-blue-50'>Accept/reject differences when merging files</li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ideation & Design</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    We explored two concepts: inline visibility and side-by-side comparison.
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 mt-4">
                        <li>Inline visibility</li>
                        <li>side-by-side comparison</li>
                    </ul>
                    Testing showed users preferred the latter for clarity and familiarity, so I refined the design into an interactive diff view with colour-coded indicators and contextual filters. The result was a transparent, scannable experience that built user confidence.</p>

                <p className="text-gray-700 leading-relaxed mb-6">From early flows to high-fidelity prototypes, I focused on making diffs scannable and trustworthy by introducing visual indicators to help users understand what changed and why.
                </p>

                <img
                    src="/images/diff_flow.png"
                    alt="Git Diff flow"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>The flow illustrates how Git Diff activates within a branch showing the relationship between local (uncommitted) and remote (committed) changes. It defines when users can trigger a diff, view comparisons, or see an empty state, ensuring clarity and control throughout the workflow.</p>
</section>
<section className="mb-12">
    <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    I partnered with engineering to design and deliver Git Diff as a scalable, technically feasible feature. Through iterative builds and design QA, we balanced performance with clarity, ensuring the final implementation matched the intended UX. Regular check-ins with Product helped prioritise and sequence improvements for rollout.
                </p>

                <img
                    src="/images/diff_screen.png"
                    alt="Git Diff screen"
                    className="w-full mb-4"
                />

                <p className='mb-8 text-xs'>The Git Diff design providing a side-by-side comparison view showing exactly what changed between local and committed versions. Visual indicators highlight additions and deletions, while contextual filters like All files or Modified files only give users flexible control.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation & Testing</h2>
                <p className="text-gray-700 leading-relaxed mb-6">In usability testing with five data engineers, <span className='font-semibold text-gray-900'>100% completed the task successfully</span> and rated the experience <span className='font-semibold text-gray-900'>“easy” or “very easy.” </span> Feedback confirmed that the feature was clear, discoverable, and aligned with their mental model of Git workflows.
                </p>
                <img
                    src="/images/testing1.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>I ran tests with data engineers to test Git Diff’s findability and clarity. Participants were asked to locate and use the feature within realistic tasks, all successfully completed the comparison flow, describing it as “clear,” “easy,” and “intuitive.”</p>

                <img
                    src="/images/testing2.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4"
                />
                <p className='mb-8 text-xs'>All participants successfully completed the Git Diff task, confirming the feature was easy to find and understand. Most rated the experience as “very easy,” validating the clarity of the design and overall discoverability of the comparison flow.</p>

            </section>



            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                    <ul className="list-disc list-inside text-gray-700 bg-emerald-50 space-y-2">
                        <li className='bg-emerald-50'>📈 +34% commits</li>
                        <li className='bg-emerald-50'>🧩 −15% Git resets</li>
                        <li className='bg-emerald-50'>✅ 100% success rate in usability testing</li>
                    </ul>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Git Diff improved confidence, reduced errors, and strengthened collaboration across engineering teams. So what does that mean for Matillion and end users? Reduced Git resets translate to less time spent troubleshooting and reverting work — saving engineering and support time. Increased commits indicate smoother workflows and higher velocity: teams can iterate faster and ship improvements with more confidence. Together, these outcomes reduced friction in the development workflow, improved product reliability, and contributed to better customer satisfaction and lower support overhead.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Feedback</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Users described Git Diff as “clear,” “intuitive,” and “something we’ve wanted for a while.” Data engineers found it easier to review changes and trust the commit process. Internally, Product and Engineering teams saw fewer support queries and greater confidence in Git operations, prompting plans to extend Diff functionality in future releases.
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The project reinforced that clarity builds confidence. Close collaboration and incremental iteration proved that even small UX improvements can unlock measurable behavioural and business impact.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
                <p className="text-gray-700 leading-relaxed">
                    Next, we’ll extend Git Diff to support merge-level comparisons, conflict resolution, and side-by-side commit comparison — deepening transparency across the full version control workflow.
                </p>
            </section>
            <Footer />
        </div>
    );
}