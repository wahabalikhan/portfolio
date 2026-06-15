import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function AIWorkflowPage() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                The Designer Who Ships: Building a Closer-to-Code Workflow with AI
            </h1>

            <p className="text-gray-600 mt-4"><span className="font-semibold">Timeline:</span> 2025 - Ongoing</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Team:</span> Solo project - personal practice</p>

            <img
                src="/images/ai-workflow-hero.png"
                alt="AI Workflow"
                className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ src: '/images/ai-workflow-hero.png', alt: 'AI Workflow' })}
            />

            <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Challenge</h3>
                    <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
                        <p className="mb-6" style={{ color: '#374151' }}>
                            ⚠️ <span className='font-bold' style={{ color: '#374151' }}>Design and code have always lived in separate worlds. Figma files drift from the live product, and feedback only arrives once something is already built.</span>
                        </p>
                        <p style={{ color: '#374151' }}>
                            The challenge was to <span className='font-bold' style={{ color: '#374151' }}>close that gap and work closer to the actual codebase</span>, so design decisions could be validated against the real product, not just a static mockup.
                        </p>

                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Role: Designer & Builder (workflow design, tooling, prototyping, development)</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">I led this end-to-end:</p>
                    <p className="text-gray-700 mb-6">
                        <ul className='list-disc list-inside'>
                            <li>Evaluated AI tools for converting between design and code</li>
                            <li>Rebuilt live product pages as editable Figma files</li>
                            <li>Built working prototypes directly from design intent using AI coding assistants</li>
                            <li>Applied the workflow to real projects, including this portfolio</li>
                            <li>Iterated on the workflow based on what actually sped things up</li>
                        </ul>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">This project touched tooling exploration, prototyping, interaction design, and how I work day-to-day with engineering.</p>

                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ Design files</span> that stay in sync with the live product
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="text-2xl font-bold bg-emerald-50">✅ Prototypes built and tested</span> in hours, not days
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-0">
                            <span className=" text-2xl font-bold bg-emerald-50">✅ A workflow</span> that closes the gap between design and engineering
                        </p>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Context</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    For most of my career, design and development have run on parallel tracks. I'd design in Figma, hand off specs, and wait, sometimes days or weeks, before seeing how a feature actually looked and behaved in the product. By the time it shipped, the Figma file was already out of date.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    AI tools changed that equation. Code-aware design plugins and AI coding assistants made it possible to move fluidly between a live product and an editable design file, and between a design concept and a working prototype, often in the same sitting.
                </p>
            </section>

            <section className="mb-12">

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Design Goals</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Turn live product pages into editable Figma files, so design always reflects reality</li>
                        <li>Go from idea to clickable, testable prototype without waiting on a dev cycle</li>
                        <li>Validate feasibility and feel early, by working with real code instead of static mockups</li>
                    </ul>
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 Value to business and user</p>
                    <p className="text-gray-700 bg-blue-50">
                        Working closer to the codebase means design decisions are tested against the real product from day one, reducing rework, shortening feedback loops, and giving stakeholders something tangible to react to far earlier in the process.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Approach</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Exploration & Discovery</h3>
                <p className="text-gray-700 leading-relaxed mb-2">I tested several ways of working across a few AI-assisted tools:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Importing live pages from this portfolio and other projects into Figma as fully editable layers</li>
                        <li><span className='font-bold'>
                            Using AI coding assistants</span> to scaffold and modify real components based on design direction</li>
                        <li>Round-tripping changes - design in Figma, implement in code, re-import to check for drift</li>
                        <li>Comparing how each tool handled structure, styling, and componentisation</li>
                    </ul>
                </p>

                <img
                    src="/images/ai-workflow-figma.png"
                    alt="Live page imported into Figma"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-figma.png', alt: 'Live page imported into Figma' })}
                />

                <p className='mb-8 text-xs'>A live product page imported into Figma as fully editable layers, ready to annotate, restyle, or hand off without rebuilding it from scratch.</p>

                <img
                    src="/images/ai-workflow-prototype.png"
                    alt="Prototype generated from design"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-prototype.png', alt: 'Prototype generated from design' })}
                />
                <p className='mb-8 text-xs'>A working prototype generated directly from a design concept, interactive and running on real code rather than a static mockup.</p>

                <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Needs (framed as problems)</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">

                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside font-bold'>
                        <li>"I need my design files to reflect what's actually live, not a snapshot from three sprints ago."</li>
                        <li>"I need to test ideas as working prototypes, not just static screens."</li>
                        <li>"I need a way to move between design and code without losing context each time."</li>
                        <li>"I need the workflow to fit around real projects, not just demos."</li>
                    </ul>

                </p>
                <p className="text-gray-700 leading-relaxed mb-2">This reframing turned a vague interest in "AI for design" into a concrete set of workflow problems to solve.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ideation & Design</h2>
                <p className="text-gray-700 leading-relaxed mb-6">Using what I learned from testing, I explored two ways of structuring the workflow:</p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept A - Design-first, AI-assisted handoff</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Familiar starting point for designers</li>
                        <li>AI translates finished designs into code</li>
                        <li>Still a one-way handoff - drift creeps back in over time</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2 font-bold">Concept B - Code-first, design stays connected to the live product</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Live pages pulled into Figma as editable files</li>
                        <li>Prototypes built from design intent directly in code</li>
                        <li>Design and code stay in sync because they're never fully separated</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Working through real projects, including this portfolio, confirmed <span className="font-bold">Concept B</span> was the better fit, so I built it out further through:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>A repeatable process for importing live pages into Figma for design exploration</li>
                        <li>AI-assisted prototyping that turns design direction into working code</li>
                        <li>A lightweight habit of re-syncing design and code whenever either side changes</li>
                    </ul>
                </p>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution</h2>
                <p className="text-gray-700 leading-relaxed mb-2">I applied this workflow directly to real projects:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Rebuilt sections of this portfolio as editable Figma files to explore layout changes</li>
                        <li>Used AI coding assistants to prototype new features directly in code, then tested them live</li>
                        <li>Treated the running app as the source of truth, syncing design files back to it as things changed</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Each round trip between design and code shortened the loop for the next one.</p>

                <img
                    src="/images/ai-workflow-execution.png"
                    alt="Prototyping live in the codebase"
                    className="w-full mb-4 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-execution.png', alt: 'Prototyping live in the codebase' })}
                />

                <p className='mb-8 text-xs'>Working live in the codebase - prototyping a feature directly in code and testing it in the browser before formalising it in Figma.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Putting It Into Practice</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Rather than running formal usability tests, I validated the workflow by using it for real work, this portfolio included. The questions I was asking:</p>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Could I get from idea to working prototype faster than a traditional design-first flow?</li>
                        <li>Did the Figma files stay useful, or go stale within days?</li>
                        <li>Did working closer to the code change how I made design decisions?</li>
                    </ul>
                </p>

                <p className="text-gray-700 leading-relaxed mb-2">What I found:</p>
                <p className="text-gray-700">
                    <ul className='list-disc list-inside mb-6'>
                        <li>Iteration cycles shrank from days to hours</li>
                        <li>Design files stayed relevant because they were generated from, or directly informed, the live product</li>
                        <li>Working in code earlier surfaced feasibility issues before they became design debt</li>
                    </ul>
                </p>
                <img
                    src="/images/ai-workflow-testing.png"
                    alt="Design and live component side by side"
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage({ src: '/images/ai-workflow-testing.png', alt: 'Design and live component side by side' })}
                />
                <p className='mb-8 text-xs'>Side-by-side: a design concept in Figma and the same component running live, kept in sync throughout the project.</p>

            </section>



            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-3">
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ Faster iteration</span> from idea to working prototype in hours, not days
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-2">
                        <span className="text-2xl font-bold bg-emerald-50">✅ Design files</span> that stay in sync with the live product
                    </p>
                    <p className="text-gray-700 bg-emerald-50 mb-0">
                        <span className=" text-2xl font-bold bg-emerald-50">✅ Earlier feasibility checks</span>, fewer late-stage surprises
                    </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This workflow change didn't just save time, it changed how early I could validate ideas, and how confidently I could commit to a direction.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Why this matters</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                    <p className="font-semibold text-gray-900 bg-blue-50 mb-2">🎯 A closer-to-code design workflow means:</p>
                    <p className="text-gray-700 bg-blue-50">
                        <ul className='list-disc list-inside'>
                            <li>Less time lost to handoff and rebuild cycles</li>
                            <li>Stakeholders see working prototypes, not just static screens, much earlier</li>
                            <li>Design decisions are grounded in what's technically real, not just what's visually possible</li>
                        </ul>
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">But here's the real so what?</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Designers can validate ideas against real constraints from the very start</li>
                        <li>Feedback loops shrink from sprints to sessions</li>
                        <li>The gap between "designed" and "shipped" gets smaller with every project</li>
                        <li>Design work becomes inherently more collaborative with engineering, because it's happening in the same space</li>
                    </ul>
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">What would have happened without this</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    <ul className='list-disc list-inside'>
                        <li>I'd still be designing in a vacuum, disconnected from the live product</li>
                        <li>Feedback would only arrive after something was fully built</li>
                        <li>Figma files would keep drifting out of sync, becoming less useful over time</li>
                        <li>Ideas that didn't work in code would only be discovered late, after design sign-off</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">This workflow shift ensured my design work stayed <span className="font-bold">grounded, current, and testable</span>.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Reflection</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    This project reinforced something I'd suspected for a while: <span className="font-semibold">the closer design lives to the real product, the more useful it becomes.</span>
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">Working this way also changed how I think about my own skill set, not just as a designer who hands off to engineers, but as someone who can move fluidly between design intent and working code.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Next steps</h3>
                <p className="text-gray-700 leading-relaxed">
                    <ul className='list-disc list-inside'>
                        <li>Formalise the workflow into a repeatable process for future projects</li>
                        <li>Explore AI-assisted design QA, checking shipped UI against design intent automatically</li>
                        <li>Apply this approach to a larger, multi-page product rather than a single portfolio</li>
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
