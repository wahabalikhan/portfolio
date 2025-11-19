import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function GitDiffPage() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                How user-centric design improved visibility of user changes
            </h1>

            <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> January 2025 — March 2025 ~ 3 months</p>
            <p className="text-gray-600"><span className="font-semibold">Team:</span> DataOps (PO, Engineers), 1 additional Product Designer</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Role:</span> Product Designer (research, strategy, design, testing, metrics)</p>

            <img
                src="/images/matillion-bg.png"
                alt="Git Diff"
                className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ src: '/images/matillion-bg.png', alt: 'Git Diff' })}
            />

            <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
                    <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
                        <p className="mb-6" style={{ color: '#374151' }}>
                            ⚠️ <span className='font-bold' style={{ color: '#374151' }}>Data engineers couldn't see what they were committing leading to resets, rework, and hesitation to adopt Git inside Matillion.</span>
                        </p>
                        <p style={{ color: '#374151' }}>
                            The challenge was to <span className='font-bold' style={{ color: '#374151' }}>give users confidence and visibility</span>, without disrupting existing mental models and workflows built around traditional IDEs like VS Code.
                        </p>

                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Approach</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">I led the full design process end-to-end:</p>
                    <p className="text-gray-700 mb-6">
                        <ul className='list-disc list-inside'>
                            <li>Discovery planning & user research</li>
                            <li>Competitive analysis of IDE diff tools</li>
                            <li>Co-design workshop facilitation</li>
                            <li>Prototyping and testing</li>
                            <li>UX delivery, design QA, and analytics setup</li>
                            <li>Post-launch tracking and iteration planning</li>
                        </ul>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">This project touched research, product, engineering alignment, interaction design, and behavioural change.</p>

                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ 34% increase</span> in Git Commits
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ 15% decrease</span> in Git Resets
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-0">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ 100% success rate</span> in usability testing
                        </p>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Matillion’s Data Productivity Cloud helps data engineers build and manage cloud-native data pipelines. Git was already part of the workflow, but users had no way to see what changed before committing. That lack of visibility created uncertainty, mistakes, and frequent Git resets — making version control feel risky.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Data engineers needed clarity before they could trust the commit process.
                </p>
            </section>

            <section className="mb-12">

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Add real-time capability for changed pipelines</li>
                        <li>Maintain familiarity for data engineers already comfortable with Git workflows</li>
                        <li>Increase confidence through better visibility</li>
                    </ul>
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Value to business and user</p>
                    <p className="text-gray-700 bg-blue-50">
                        Improving Git visibility would increase user confidence, reduce errors, and improve team collaboration ultimately leading to better adoption of Git features within Matillion.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Approach</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Discovery</h3>
                <p className="text-gray-700 leading-relaxed mb-2">I conducted:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Competitive analysis of Git diff patterns in VS Code, GitHub Desktop, JetBrains</li>
                        <li>5 internal data engineer interviews (representing the full DataOps user spectrum)</li>
                        <li>A cross-functional workshop to expand possible diff formats and visualisation approaches</li>
                        <li>Workflow mapping to understand when diffs are needed and why</li>
                    </ul>
                </p>

                <img
                    src="/images/diff_research_1.png"
                    alt="Git Diff research"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/diff_research_1.png', alt: 'Git Diff research' })}
                />

                <p className='mb-8 text-xs'>User interviews exploring topics such as experience with existing Git functions, what worked well, what needed improvement, workarounds, priority of information, and defining the Minimum Viable Product from the user’s perspective.</p>

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


                <h3 className="text-xl font-semibold mb-3 text-gray-900">Key User Needs (framed as problems)</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside font-bold'>
                        <li>“I need to easily understand what changed between local and committed versions.”</li>
                        <li>“I need a scannable, side-by-side view because inline diffing hides too much context.”</li>
                        <li>“I need clear indicators of additions and deletions.”</li>
                        <li>“I need control — show me all files, or only the ones that matter.”</li>
                    </ul>
                    
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">This reframing turned features into actionable problems to solve.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ideation & Design</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Using insights from the workshop, I explored two directions:</p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept A — Inline Diff</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Lightweight</li>
                        <li>Familiar to users who used to Git CLI tools</li>
                        <li>Less visual clarity</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept B — Side-by-Side Diff (IDE-inspired)</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Mirrors IDE mental model</li>
                        <li>Clearer structure, better scannability</li>
                        <li>Stronger visual separation</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">A/B testing with internal data engineers confirmed <span className="font-bold">Concept B</span> was more intuitive and trustworthy, so we developed it further through:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>An interactive diff view with contextual filters</li>
                        <li>A transparent, scannable experience that built user confidence</li>
                        <li>Introducing visual indicators to help users understand what changed and why</li>
                    </ul>
                </p>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
                <p className="text-gray-700 leading-relaxed mb-2">I partnered closely with engineering to:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Deliver Git Diff as a scalable, technically feasible feature</li>
                        <li>Balanced performance with clarity</li>
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
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Validation & Testing</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Usability testing with five data engineers:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li><span className='font-bold'>100% task success</span></li>
                        <li>All participants rated the flow <span className='font-bold'>“easy” or “very easy”</span></li>
                        <li>Zero misclicks or “what am I looking at?” moments”</li>
                    </ul>
                </p>

                <p className="text-gray-700 leading-relaxed mb-2">Participants described the experience as:</p>
                <p className="text-gray-700">
                    <ul className='list-disc list-inside mb-6'>
                        <li>“Clear”</li>
                        <li>“Intuitive”</li>
                        <li>“Exactly what we needed”</li>
                    </ul>
                </p>
                <img
                    src="/images/testing1.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/testing1.png', alt: 'Git Diff testing' })}
                />
                <p className='mb-8 text-xs'>I ran tests with data engineers to test Git Diff’s findability and clarity. Participants were asked to locate and use the feature within realistic tasks, all successfully completed the comparison flow, describing it as “clear,” “easy,” and “intuitive.”</p>

                <img
                    src="/images/testing2.png"
                    alt="Git Diff testing"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/testing2.png', alt: 'Git Diff testing' })}
                />
                <p className='mb-8 text-xs'>All participants successfully completed the Git Diff task, confirming the feature was easy to find and understand. Most rated the experience as “very easy,” validating the clarity of the design and overall discoverability of the comparison flow.</p>

            </section>



            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-3">
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ 34% increase</span> in Git Commits
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className="text-2xl font-bold bg-emerald-50">✅ 15% decrease</span> in Git Resets
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-0">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ 100% success rate</span> in usability testing
                    </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Git Diff improved confidence, reduced errors, and strengthened collaboration across engineering teams.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Business outcome</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Improved Git workflows increased overall platform trust, a key driver of:</p>
                    <p className="text-gray-700 bg-blue-50">
                        <ul className='list-disc list-inside'>
                            <li>Lowered cognitive load on engineering teams</li>
                            <li>Fewer support tickets related to version control</li>
                        </ul>
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">But here’s the real so what?</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Teams trusted Matillion’s Git workflows more, reducing reliance on external tools</li>
                        <li>Increased commit confidence led to faster pipelines shipped</li>
                        <li>Reduction in resets meant more time focused on real work, not debugging Git issues</li>
                        <li>Product’s perception improved: Matillion felt more like an IDE they could rely on, not just a data tool</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">My involvement ensured the feature was <span className="font-bold">researched, validated, testable, and measurable</span>.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This project reinforced a core principle for me: <span className="font-semibold">Clarity creates confidence. And confidence drives adoption.</span>
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">I also learned the value of shaping not just UI, but behaviour — supporting engineers in shifting to integrated version control workflows with less friction.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
                <p className="text-gray-700 leading-relaxed">
                    <ul className='list-disc list-inside'>
                        <li>Merge-level diffs</li>
                        <li>Conflict resolution</li>
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