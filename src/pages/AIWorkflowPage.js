import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import { usePageTitle } from '../hooks/usePageTitle';

export default function AIWorkflowPage() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    usePageTitle('The Designer Who Ships Code');
    return (
        <div className="max-w-3xl mx-auto px-6 py-16 tab-panel">
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                The Designer Who Ships Code
            </h1>

            <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> April 2026 - June 2026</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Team:</span> 2 Product Designers, 2 Engineers</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Role:</span> Designer and Builder. Workflow design, tooling, prototyping, development.</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Stack:</span> Figma, VS Code, Claude Code, Git, GitHub, Node.js, npm, React, HTML and CSS</p>

            <img
                src="/images/ai-workflow-hero.png"
                alt="AI Workflow"
                className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ src: '/images/ai-workflow-hero.png', alt: 'AI Workflow' })}
            />

            <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">The Problem</h3>
                    <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
                        <p className="mb-6" style={{ color: '#374151' }}>
                            ⚠️ <span className='font-bold' style={{ color: '#374151' }}>Design and code have always run on parallel tracks.</span>
                        </p>
                        <p className="mb-6" style={{ color: '#374151' }}>
                            I'd design in Figma, hand off specs, and wait. Sometimes days, sometimes weeks, before seeing how a feature actually looked and behaved in the product. By the time it shipped, the Figma file was already out of date. Feedback arrived too late. Feasibility issues surfaced after design sign-off, not before.
                        </p>
                        <p style={{ color: '#374151' }}>
                            The gap wasn't a process failure. It was a structural one. <span className='font-bold' style={{ color: '#374151' }}>Design and engineering were operating in completely separate environments, and nothing was keeping them in sync.</span>
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">My Role</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">I ran this end-to-end:</p>
                    <p className="text-gray-700 mb-4">
                        <ul className='list-disc list-inside'>
                            <li>Evaluated AI-assisted tools for moving between design and code</li>
                            <li>Set up a full local development environment: Node.js, npm packages, Git, VS Code, Claude Code</li>
                            <li>Used Claude Code to scaffold, modify, and test real components from design intent</li>
                            <li>Committed and reviewed code via Git and GitHub, working closely with engineers to ensure changes passed tests before anything went live</li>
                            <li>Applied the workflow to real projects, including live changes pushed to production</li>
                        </ul>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">The primary focus was working directly in the codebase: scaffolding components, reviewing diffs, shipping changes through engineering review. Rebuilding live product pages as editable Figma files and building live prototypes were part of the process too, but the real shift was moving design closer to where the product actually lives.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Results</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Faster iteration</span> - from idea to working prototype in hours, not days
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Design files that stay current</span> - generated from or directly informed by the live product
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Earlier feasibility checks</span> - issues surfaced before design sign-off, not after
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Live changes pushed to production</span> - real users, not just local demos
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-0">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Shorter feedback loops</span> - stakeholders react to working prototypes, not static screens
                        </p>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">What I Set Out to Do</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Three concrete workflow problems, not vague goals:</p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="text-gray-700 mb-6">
                        <ul className='list-disc list-inside font-bold'>
                            <li>"I need my design files to reflect what's actually live, not a snapshot from three sprints ago."</li>
                            <li>"I need to test ideas as working prototypes, not just static screens."</li>
                            <li>"I need to move between design and code without losing context each time."</li>
                        </ul>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">The goal wasn't to replace engineering. It was to make my design work more grounded, more testable, and more useful to the engineers I work with.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">The Environment Setup</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Getting to the point where I could work fluidly between Figma and a live codebase meant building the right environment first:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Installing Node.js and managing dependencies with npm: understanding package.json, running dev servers locally, and installing the right tooling</li>
                        <li>Setting up VS Code as the primary coding environment with extensions for React, TypeScript linting, and Git integration</li>
                        <li><span className='font-bold'>Using Claude Code</span> in the terminal as an AI coding assistant, not to generate code blindly, but to scaffold components based on design direction, then review and refine the output</li>
                        <li>Managing all changes through Git: branching, committing, reviewing diffs, and pushing to GitHub for team review</li>
                        <li>Running the app locally in a dev environment to test prototypes against the real product before anything reached users</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Every change that touched the live product went through review with engineers and had to pass tests. The workflow was collaborative by design, not just design-adjacent.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Two Approaches Considered</h2>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept A: Design-first, AI-assisted handoff</p>
                <p className="text-gray-700 leading-relaxed mb-6">The familiar path. Design in Figma, use AI to translate finished designs into code. Faster than a traditional handoff, but still one-directional. Drift creeps back in. The Figma file is already stale by the time the code ships.</p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept B: Code-first, design stays connected to the live product (chosen)</p>
                <p className="text-gray-700 leading-relaxed mb-6">Live pages pulled into Figma as editable layers. Prototypes built directly in code from design intent. Design and code stay in sync because they're never fully separated.</p>
                <p className="text-gray-700 leading-relaxed mb-6">Working through real projects confirmed Concept B. It became the foundation of the workflow.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">What the Workflow Actually Looks Like</h2>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">1. Import and explore</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Pull a live product page into Figma as fully editable layers. Annotate, restyle, and explore layout changes without rebuilding from scratch. The Figma file starts from reality, not from memory.</p>

                <img
                    src="/images/ai-workflow-figma.png"
                    alt="Live page imported into Figma"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-figma.png', alt: 'Live page imported into Figma' })}
                />
                <p className='mb-8 text-xs'>A live product page imported into Figma as fully editable layers, ready to annotate, restyle, or explore without rebuilding it from scratch.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">2. Design and prototype in code</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Take a design direction into VS Code. Use Claude Code to scaffold the component or feature, then review, refine, and test it locally. The prototype is running on real code, not a static mockup.</p>

                <img
                    src="/images/ai-workflow-prototype.png"
                    alt="Prototype scaffolded with Claude Code"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-prototype.png', alt: 'Prototype scaffolded with Claude Code' })}
                />
                <p className='mb-8 text-xs'>A design direction taken into VS Code and scaffolded with Claude Code - running on real code, not a static mockup.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">3. Review and ship</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Run the change in the local dev environment. Check it against the live product. Commit via Git, push to GitHub, and go through engineering review before anything reaches users. Live changes were pushed to production and tested by real users.</p>

                <img
                    src="/images/ai-workflow-execution.png"
                    alt="Reviewing and shipping a change"
                    className="w-full mb-4 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-execution.png', alt: 'Reviewing and shipping a change' })}
                />
                <p className='mb-8 text-xs'>Running a change locally, reviewing it against the live product, then committing via Git and pushing to GitHub for engineering review.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">4. Sync and repeat</h3>
                <p className="text-gray-700 leading-relaxed mb-6">When the live product changes, the Figma file gets updated to match. When a Figma exploration goes further, it feeds back into code. Neither side goes stale.</p>

                <img
                    src="/images/ai-workflow-testing.png"
                    alt="Design and live component kept in sync"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-testing.png', alt: 'Design and live component kept in sync' })}
                />
                <p className='mb-8 text-xs'>Side-by-side: a design concept in Figma and the same component running live, kept in sync throughout the project.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Why This Matters</h2>

                <p className="text-gray-700 leading-relaxed mb-6">Working closer to the codebase changes how you make design decisions. You're not designing in a vacuum and hoping it's feasible. You're testing against real constraints from the start. UX and implementation influence each other in the same sitting. That's where the best design work happens.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Without this workflow</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Design happens disconnected from the live product</li>
                        <li>Feedback only arrives after something is fully built</li>
                        <li>Figma files drift out of sync and become less useful over time</li>
                        <li>Ideas that don't work in code are only discovered after design sign-off</li>
                    </ul>
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">With it</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Design decisions are grounded in what's technically real, not just visually possible</li>
                        <li>Feedback loops shrink from sprints to sessions</li>
                        <li>The gap between designed and shipped gets smaller with every project</li>
                        <li>Design work becomes inherently more collaborative with engineering, because it's happening in the same space</li>
                    </ul>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Reflection</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The closer design lives to the real product, the more useful it becomes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Working this way also changed how I think about my own skill set. Not as a designer who hands off to engineers, but as someone who can move fluidly between design intent and working code, and who understands what it takes to get something over the line.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps</h2>
                <p className="text-gray-700 leading-relaxed">
                    <ul className='list-disc list-inside'>
                        <li>Formalise the workflow into a repeatable, documented process for future projects</li>
                        <li>Explore AI-assisted design QA: checking shipped UI against design intent automatically</li>
                        <li>Apply this approach to a larger multi-page product, not just a single portfolio</li>
                        <li>Contribute to a component-level design system that's kept in sync with the codebase</li>
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
