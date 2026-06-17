import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import { usePageTitle } from '../hooks/usePageTitle';

export default function GitDiffPage() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    usePageTitle('How user-centric design improved visibility of user changes');
    return (
        <div className="max-w-3xl mx-auto px-6 py-16 tab-panel">
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                Designing confidence into a high-risk engineering workflow
            </h1>

            <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> January 2025 - March 2025 ~ 3 months</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Team:</span> DataOps (PO, Engineers), 1 additional Product Designer</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Role:</span> Product Designer. Research, strategy, design, testing, metrics.</p>

            <img
                src="/images/matillion-bg.png"
                alt="Git Diff"
                className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ src: '/images/matillion-bg.png', alt: 'Git Diff' })}
            />

            <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">The Problem</h3>
                    <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
                        <p className="mb-6" style={{ color: '#374151' }}>
                            ⚠️ <span className='font-bold' style={{ color: '#374151' }}>At Matillion, data engineers build and manage cloud data pipelines using version control to track and save their work.</span> Version control works by letting engineers commit changes, essentially saving a snapshot of their work at a given point. But before committing, engineers had no way to see exactly what they were about to change.
                        </p>
                        <p className="mb-6" style={{ color: '#374151' }}>
                            They were flying blind.
                        </p>
                        <p className="mb-6" style={{ color: '#374151' }}>
                            The result was predictable. Engineers hesitated. They made mistakes. They undid their own work at high rates. And they started avoiding version control features altogether, which undermined collaboration across the whole team.
                        </p>
                        <p style={{ color: '#374151' }}>
                            The challenge wasn't to add a feature. <span className='font-bold' style={{ color: '#374151' }}>It was to give engineers the confidence to act.</span>
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">My Role</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">I led the full design process end-to-end:</p>
                    <p className="text-gray-700 mb-6">
                        <ul className='list-disc list-inside'>
                            <li>Discovery planning and user research</li>
                            <li>Competitive analysis of how other developer tools handle this problem</li>
                            <li>Co-design workshop facilitation</li>
                            <li>Prototyping and testing</li>
                            <li>UX delivery, design QA, and analytics setup</li>
                            <li>Post-launch tracking and iteration planning</li>
                        </ul>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">This project touched research, product strategy, engineering alignment, interaction design, and behavioural change.</p>

                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Results</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ 34% increase</span> in successful commits
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ 15% decrease</span> in error recoveries
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-0">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ 100% task success rate</span> in usability testing
                        </p>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Context</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Matillion's Data Productivity Cloud helps data engineers build and manage cloud-native data pipelines. Version control was already part of the workflow, but users had no way to see what changed before saving their work. That lack of visibility created uncertainty, mistakes, and frequent undos, making version control feel risky rather than reliable.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Data engineers needed clarity before they could trust the process.
                </p>
            </section>

            <section className="mb-12">

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Give engineers real-time visibility of what changed before they commit</li>
                        <li>Maintain familiarity for engineers already comfortable with developer tool workflows</li>
                        <li>Increase confidence through clarity, not through adding more UI</li>
                    </ul>
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Value to the business and user</p>
                    <p className="text-gray-700 bg-blue-50">
                        Better visibility would increase user confidence, reduce errors, and improve team collaboration, ultimately driving adoption of version control features within Matillion.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Research and Discovery</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">What I conducted</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Competitive analysis of how VS Code, GitHub Desktop, and JetBrains handle this problem</li>
                        <li><span className='font-bold'>5 internal data engineer interviews</span> covering the full user spectrum</li>
                        <li>A cross-functional workshop to explore different visualisation approaches</li>
                        <li>Workflow mapping to understand when and why engineers need to see what changed</li>
                    </ul>
                </p>

                <img
                    src="/images/diff_research_1.png"
                    alt="Git Diff research"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/diff_research_1.png', alt: 'Git Diff research' })}
                />

                <p className='mb-8 text-xs'>User interviews exploring topics such as experience with existing Git functions, what worked well, what needed improvement, workarounds, priority of information, and defining the Minimum Viable Product from the user's perspective.</p>

                <img
                    src="/images/diff_workshop.png"
                    alt="Git Diff workshop"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/diff_workshop.png', alt: 'Git Diff workshop' })}
                />
                <p className='mb-8 text-xs'>A collaborative workshop that moved from discovery and scoping through How Might We framing, two rounds of ideation, and group voting to select iterations to progress into design.</p>

                <img
                    src="/images/diff_flow.png"
                    alt="Git Diff flow"
                    className="w-full rounded-lg mt-4 mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/diff_flow.png', alt: 'Git Diff flow' })}
                />
                <p className='mb-8 text-xs'>The flow illustrates how Git Diff activates within a branch showing the relationship between local (uncommitted) and remote (committed) changes. It defines when users can trigger a diff, view comparisons, or see an empty state, ensuring clarity and control throughout the workflow.</p>


                <h3 className="text-xl font-semibold mb-4 text-gray-900">Key user needs (framed as problems)</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">

                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside font-bold'>
                        <li>"I need to easily understand what changed between my local version and what has been saved."</li>
                        <li>"I need a scannable, side-by-side view because inline comparisons hide too much context."</li>
                        <li>"I need clear indicators of what was added and what was removed."</li>
                        <li>"I need control. Show me all files, or only the ones that matter."</li>
                    </ul>

                </p>
                <p className="text-gray-700 leading-relaxed mb-2">These weren't feature requests. They were framed as problems to solve.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ideation and Design</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Using insights from the workshop, I explored two directions:</p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept A: Inline comparison</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Lightweight</li>
                        <li>Familiar to engineers used to command-line tools</li>
                        <li>But less visual clarity, harder to scan quickly</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept B: Side-by-side comparison, inspired by IDE tools (chosen)</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Mirrors the mental model engineers already have from tools like VS Code</li>
                        <li>Clearer structure, better scannability</li>
                        <li>Stronger visual separation between what changed and what didn't</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Testing with internal engineers confirmed <span className="font-bold">Concept B</span> was more intuitive and trustworthy. We developed it further through:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>An interactive comparison view with contextual filters</li>
                        <li>A transparent, scannable layout that built user confidence</li>
                        <li>Visual indicators that made additions and deletions immediately obvious</li>
                    </ul>
                </p>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
                <p className="text-gray-700 leading-relaxed mb-2">I partnered closely with engineering to:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Deliver a scalable, technically feasible feature</li>
                        <li>Balance performance with clarity throughout</li>
                        <li>Ensure the final implementation matched the intended UX through regular QA checks</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Regular check-ins with Product helped prioritise and sequence improvements for rollout.</p>

                <img
                    src="/images/diff_screen.png"
                    alt="Git Diff screen"
                    className="w-full mb-4 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/diff_screen.png', alt: 'Git Diff screen' })}
                />

                <p className='mb-8 text-xs'>The Git Diff design providing a side-by-side comparison view showing exactly what changed between local and committed versions. Visual indicators highlight additions and deletions, while contextual filters like All files or Modified files only give users flexible control.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation and Testing</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Usability testing with five data engineers:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li><span className='font-bold'>100% task success rate</span></li>
                        <li>All participants rated the flow <span className='font-bold'>"easy" or "very easy"</span></li>
                        <li>Zero misclicks or moments of confusion</li>
                    </ul>
                </p>

                <p className="text-gray-700 leading-relaxed mb-2">Participants described the experience as:</p>
                <p className="text-gray-700">
                    <ul className='list-disc list-inside mb-6'>
                        <li>"Clear"</li>
                        <li>"Intuitive"</li>
                        <li>"Exactly what we needed"</li>
                    </ul>
                </p>
                <img
                    src="/images/testing1.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/testing1.png', alt: 'Git Diff testing' })}
                />
                <p className='mb-8 text-xs'>I ran tests with data engineers to test Git Diff's findability and clarity. Participants were asked to locate and use the feature within realistic tasks, all successfully completed the comparison flow, describing it as "clear," "easy," and "intuitive."</p>

                <img
                    src="/images/testing2.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/testing2.png', alt: 'Git Diff testing' })}
                />
                <p className='mb-8 text-xs'>All participants successfully completed the Git Diff task, confirming the feature was easy to find and understand. Most rated the experience as "very easy," validating the clarity of the design and overall discoverability of the comparison flow.</p>

            </section>



            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes and Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-3">
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ 34% increase</span> in successful commits
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className="text-2xl font-bold bg-emerald-50">✅ 15% decrease</span> in error recoveries
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-0">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ 100% success rate</span> in usability testing
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Business outcome</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Better version control visibility increased overall platform trust:</p>
                    <p className="text-gray-700 bg-blue-50">
                        <ul className='list-disc list-inside'>
                            <li>Lower cognitive load on engineering teams</li>
                            <li>Fewer support tickets related to version control errors</li>
                            <li>Teams trusting Matillion's workflows more, reducing reliance on external tools</li>
                            <li>Increased commit confidence leading to faster pipelines shipped</li>
                            <li>More time focused on real work, not recovering from mistakes</li>
                            <li>Matillion feeling more like a reliable IDE, not just a data tool</li>
                        </ul>
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">The cost of skipping validation</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Without a research-led approach, the team would have shipped a basic comparison view with no grounding in how data engineers actually think about changes. The scannability vs inline debate wouldn't have been tested. Edge cases around file filtering would have been missed. There would have been no metric baseline to measure whether the feature actually changed behaviour.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The 34% increase in commits and 15% reduction in error recoveries are not just outcomes. They are evidence that the design changed how engineers work, not just how the screen looks.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This project reinforced a principle I keep coming back to: <span className="font-semibold">clarity creates confidence, and confidence drives adoption.</span>
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">I also learned the value of shaping not just the UI, but the behaviour around it. Supporting engineers in shifting to integrated version control workflows, with less friction and more trust in the tool, was the real outcome. The numbers confirmed it.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
                <p className="text-gray-700 leading-relaxed">
                    <ul className='list-disc list-inside'>
                        <li>Merge-level comparisons</li>
                        <li>Conflict resolution flows</li>
                        <li>Commit-to-commit comparisons</li>
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
