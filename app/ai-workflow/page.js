'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import CaseStudyMeta from '@/components/CaseStudyMeta';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function AIWorkflowPage() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    usePageTitle('The Designer Who Ships Code');
    return (
        <div className="max-w-3xl mx-auto px-6 py-16" role="main">
            <FadeUp delay={100}>
            <BackButton onClick={() => router.back()} />

            <h1 className="text-4xl font-bold mb-2 text-gray-900">
                The Designer Who Ships Code
            </h1>
            </FadeUp>

            <FadeUp delay={100}>
            <CaseStudyMeta items={[
              { label: 'Timeline', value: 'April 2026 – June 2026' },
              { label: 'Team', value: '2 Product Designers, 2 Engineers' },
              { label: 'Role', value: 'Designer and contributor. Workflow adoption, tooling setup, code changes, engineering collaboration.' },
              { label: 'Stack', value: 'Figma, VS Code, Claude Code, Git, GitHub, Node.js, npm, React, HTML and CSS' },
            ]} />

            <img
                src="/images/ai_thumbnail.png"
                alt="AI Workflow"
                className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage({ src: '/images/ai_thumbnail.png', alt: 'AI Workflow' })}
            />
            </FadeUp>

            <FadeUp delay={100}>
            <div className="space-y-8 mb-12 pb-12 border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">The Problem</h3>
                    <div className="border-l-4 border-yellow-500 p-6 mb-6 bg-yellow-50">
                        <p className="mb-6" style={{ color: '#374151' }}>
                            ⚠️ <span className='font-bold' style={{ color: '#374151' }}>Design and code have always run on parallel tracks.</span>
                        </p>
                        <p className="mb-6" style={{ color: '#374151' }}>
                            At Adverity, an initiative was already underway to close that gap, bringing designers closer to the codebase and reducing the friction between design intent and what actually ships. The workflow existed in draft form. The step-by-step guide existed. The goal was clear. Getting it to actually work, consistently, across different machines and setups, was the harder part.
                        </p>
                        <p style={{ color: '#374151' }}>
                            That's where I came in.
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">My Role</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">I joined this initiative halfway through, collaborating with a designer who had already been laying the groundwork. My contribution was in getting the workflow from almost there to actually working, and then using it on real work.</p>
                    <p className="text-gray-700 leading-relaxed mb-2">Specifically:</p>
                    <p className="text-gray-700 mb-4">
                        <ul className='list-disc list-inside'>
                            <li>Worked through the setup process collaboratively: installing dependencies, working through Docker configuration, debugging errors, and feeding fixes back into the guide so the next person didn't hit the same walls.</li>
                            <li>Helped get the workflow to a polished, documented state the wider team could follow.</li>
                            <li>Participated in and helped run a team workshop to explore what AI looks like in design workflows, get everyone set up, and build shared understanding across the team.</li>
                            <li>Used the workflow on real work: committing via Git, getting changes reviewed by engineers, ensuring they passed tests, and getting them merged to main and shipped to customers.</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">The Workshop</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">Before anyone could adopt the workflow independently, we needed to get the team aligned on what it even meant to work closer to code as a designer.</p>
                    <p className="text-gray-700 leading-relaxed mb-4">We ran a hands-on workshop with the wider design team. The goal wasn't to turn designers into developers. It was to demystify the tools, show what was actually possible, and get everyone set up and confident enough to try it themselves.</p>
                    <p className="text-gray-700 leading-relaxed mb-4">We walked through the full workflow together: pulling live pages into Figma, making changes in VS Code with Claude Code, committing via Git, and seeing something run locally. People who had never opened a terminal left with a working dev environment.</p>
                    {/* Workshop image — replace src when image is supplied */}
                    <img src="/images/ai_workshop.png" alt="Workshop" className="w-full rounded-lg mb-4 border border-gray-200" />
                    <p className="text-gray-700 leading-relaxed mb-4">Getting a team aligned on a new way of working is its own design problem. The workshop was as much about reducing fear around the tooling as it was about the tools themselves.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Results</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-0">
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ Real changes shipped to production</span> - seen by customers, not just local demos.
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ A workflow that went from half-working to documented</span> - usable by the wider team.
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ A team workshop</span> - that got designers set up and aligned on AI-assisted workflows.
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-2">
                            <span className="font-bold bg-emerald-50">✅ Faster idea communication</span> - live prototypes instead of static screens for early conversations with engineers and product.
                        </p>
                        <p className="text-gray-700 bg-emerald-50 mb-0">
                            <span className="font-bold bg-emerald-50">✅ Design files grounded in reality</span> - generated from what was actually live, not rebuilt from memory.
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
                        <li>Installing Node.js and managing dependencies with npm, understanding package.json, running dev servers locally, and getting the right tooling in place.</li>
                        <li>Setting up VS Code with extensions for React, TypeScript linting, and Git integration.</li>
                        <li><span className='font-bold'>Using Claude Code</span> in the terminal as an AI coding assistant, not to generate code blindly, but to scaffold components based on design direction, then review and refine the output.</li>
                        <li>Managing all changes through Git: branching, committing, reviewing diffs, and pushing to GitHub for team review.</li>
                        <li>Running the app locally in a dev environment to test prototypes against the real product before anything reached users.</li>
                    </ul>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Every change that touched the live product went through engineering review and had to pass tests. The workflow was collaborative by design.</p>
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

                <h3 className="text-xl font-semibold mb-3 text-gray-900">1. Browser to Figma</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Pull a live product page directly into Figma as fully editable layers. Rather than starting from scratch or working from memory, the design file starts from what is actually live. Annotate, restyle, and explore changes on top of the real product.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">2. Making changes in code</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Take a direction from Figma into VS Code. Use Claude Code to scaffold or modify components, review the output, refine it, and test it locally against the live product. Then commit via Git, push to GitHub, and go through engineering review. Changes had to pass tests before anything got merged. This was the core of what I used day-to-day.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">3. Live prototyping</h3>
                <p className="text-gray-700 leading-relaxed mb-6">Another designer on the team built a separate workflow for generating live prototypes quickly, turning a design direction into something working and interactive in minutes. I used this to get ideas across to engineers and product people faster and move conversations forward without needing a fully polished static design first.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Why This Matters</h2>

                <p className="text-gray-700 leading-relaxed mb-6">Working closer to the codebase changes how you make design decisions. You are not designing in a vacuum and hoping it is feasible. You are testing against real constraints from the start. When design and engineering are operating in the same space, feedback loops shrink and the gap between what is designed and what ships gets smaller.</p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">Without this workflow</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Design happens disconnected from the live product</li>
                        <li>Feedback only arrives after something is fully built</li>
                        <li>Figma files are rebuilt from memory rather than generated from reality</li>
                        <li>Ideas take hours to communicate as static screens</li>
                    </ul>
                </p>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">With it</h3>
                <p className="text-gray-700 mb-6">
                    <ul className='list-disc list-inside'>
                        <li>Design decisions are grounded in what is technically real from the start</li>
                        <li>Feedback loops shrink from sprints to sessions</li>
                        <li>Prototypes replace static screens in early engineering conversations</li>
                        <li>The gap between designed and shipped gets smaller with every project</li>
                    </ul>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Reflection</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The honest version of this project is that it was collaborative from start to finish. The initiative existed before I joined. Another designer had done significant groundwork. Engineers were involved at every step. My contribution was in the middle and at the end: helping get the workflow working, running the workshop with the team, and using it to ship real things.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    That collaboration is actually the point. A closer-to-code design workflow only works if multiple people can run it. Getting it to a state where that was possible was the real outcome.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps</h2>
                <p className="text-gray-700 leading-relaxed">
                    <ul className='list-disc list-inside'>
                        <li>Formalise the workflow into a repeatable process other designers can pick up independently.</li>
                        <li>Explore AI-assisted design QA: checking shipped UI against design intent automatically.</li>
                        <li>Apply this approach to larger, multi-page products.</li>
                        <li>Contribute to a component-level design system kept in sync with the codebase.</li>
                    </ul>
                </p>
                <p className="text-gray-400 italic mt-4 leading-relaxed">
                    The role was made redundant due to organisational restructure in June 2026 before these could be taken further. The workflow and documentation remain with the team.
                </p>
            </section>

            </FadeUp>
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
