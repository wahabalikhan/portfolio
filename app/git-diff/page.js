'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, MarkerNumber, PersonaCards, SectionLabel } from '@/components/CaseStudyParts';

// Numbered markers on the final design (diff_screen.png), as percentages of the image.
// They match the numbered list under it.
const FINAL_DESIGN_MARKERS = [
  { n: 1, x: 44.7, y: 13.6 }, // between the last-commit and local-changes headers
  { n: 2, x: 23.4, y: 58.5 }, // the removed lines (red) beside their additions
  { n: 3, x: 10.6, y: 13.8 }, // the Files filter
  { n: 4, x: 69.4, y: 17.3 }, // the Unified view toggle
  { n: 5, x: 88.0, y: 33.6 }, // Compare, beside each file in the commit drawer
];

// The Personas section (set to null to hide it). Each person is a card with their name as
// its title; image ({ src, alt }) is optional.
const PERSONAS = {
  heading: 'Some engineers lived in Git; others feared it',
  intro: "The interviews with data engineers and data scientists pointed to two kinds of user, split by how much they'd used version control:",
  people: [
    { name: 'The experienced committer', text: 'Comfortable with Git from tools like VS Code. They wanted to check changes quickly, then get on with their work, without leaving the product.' },
    { name: 'The cautious committer', text: "Newer to Git, or using it rarely. They worried about committing changes they couldn't see or didn't recognise, including other people's, and about what would happen if something broke and they had to undo it." },
  ],
  shaped: 'whatever their experience, everyone needed the same thing: to see every change before committing. So one design had to work for both, clear enough for someone new to Git, and quick enough for someone who uses it every day.',
};

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const P = 'text-gray-700 leading-relaxed mb-4';
const UL = 'list-disc pl-5 text-gray-700 leading-relaxed mb-6 space-y-2';
const LABEL = 'font-semibold text-gray-900';

export default function GitDiffPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const open = setSelectedImage;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <CaseStudyReadTracker study="git-diff" />

      <FadeUp delay={100}>
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Making risky commits feel safe: designing Git Diff for data engineers
        </h1>
        <p className="text-lg text-gray-700 mt-4 mb-6 leading-relaxed">
          Data engineers at Matillion couldn't see what they were about to change before committing, so they hesitated, made mistakes and undid their own work. I designed a side-by-side comparison that shows every change before the point of no return.
        </p>
        <CaseImage
          src="/images/diff_screen.png"
          alt="The Git Diff design: Compare changes shows the last commit on the left and local changes on the right, line by line, beside the Commit changes drawer"
          onOpen={open}
        />
        <AtAGlance items={[
          { label: 'Role', value: 'Product Designer, leading research, design, testing and success metrics' },
          { label: 'Team', value: 'DataOps (PM, PO, 3 engineers), plus 1 other product designer, who supported the interviews and workshop' },
          { label: 'Timeline', value: 'January to March 2025' },
          { label: 'Results', value: '34% more successful commits and 15% fewer error recoveries in the first 30 days. 5 of 5 testers completed the task.' },
        ]} />
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The problem</SectionLabel>
          <h2 className={H2}>Engineers couldn't trust a commit they couldn't see</h2>
          <p className={P}>In Matillion's Data Productivity Cloud, data engineers save their pipeline work with version control. Before committing, they had no way to see exactly what would change.</p>
          <ul className={UL}>
            <li><span className={LABEL}>For users:</span> they hesitated, made mistakes and undid their own work. Some avoided version control altogether.</li>
            <li><span className={LABEL}>For the business:</span> serious mistakes pulled engineers or support staff in to help, collaboration suffered, and Matillion felt less reliable than the developer tools engineers already trusted.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>What engineers needed was clarity, not more features</h2>
          <p className={P}>I compared how VS Code, GitHub Desktop and JetBrains show changes, interviewed 1 external customer and 4 internal data engineers, and ran a cross-functional workshop (How Might We framing, two rounds of sketching and dot voting).</p>
          <p className={P}>Four needs came out of it:</p>
          <ol className="list-decimal pl-5 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>See what changed between my local version and what's already saved.</li>
            <li>Scan it side by side, because inline views hide context.</li>
            <li>Tell additions from removals at a glance.</li>
            <li>Choose to see every file, or only the ones that changed.</li>
          </ol>
          <CaseImage
            src="/images/diff_workshop.png"
            alt="The remote Git Diff workshop board: How Might We notes, two rounds of paper sketches and dot voting, with the team on video"
            onOpen={open}
          />
          <CaseImage
            src="/images/diff_research_1.png"
            alt="A recorded research session: a data engineer walks through a commit's changes in GitHub's side-by-side view"
            onOpen={open}
          />
        </section>
      </FadeUp>

      {PERSONAS && (
        <FadeUp delay={100}>
          <section className="mb-12">
            <SectionLabel>Personas</SectionLabel>
            <h2 className={H2}>{PERSONAS.heading}</h2>
            <p className={P}>{PERSONAS.intro}</p>
            <PersonaCards people={PERSONAS.people} />
            <p className={P}><span className={LABEL}>How this shaped the design:</span> {PERSONAS.shaped}</p>
            {PERSONAS.image && <CaseImage src={PERSONAS.image.src} alt={PERSONAS.image.alt} onOpen={open} />}
          </section>
        </FadeUp>
      )}

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Three decisions that shaped it</h2>
          <Decision
            n={1}
            title="Side by side, not inline"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'an inline comparison, familiar from command-line tools and lighter to build, or a side-by-side view like the IDEs engineers already use.' },
              { label: 'Why I chose side by side:', text: "it matches the mental model engineers bring from VS Code, keeps the surrounding context visible, and separates what changed from what didn't. Testing with internal engineers confirmed it felt clearer and more trustworthy." },
              { label: 'Trade-off:', text: "building a side-by-side view from scratch would have taken too long, so we built on VS Code's open-source diff view instead. It shipped sooner and already felt familiar to engineers, but it meant designing within what that component could do." },
            ]}
          />
          <Decision
            n={2}
            title="Colour plus labels, added after testing"
            onOpen={open}
            parts={[
              { label: 'What happened:', text: 'the first design showed additions and removals in red and green, like most diff tools. Nobody misread it, but in testing a participant pointed out that someone with a visual impairment might not be able to tell them apart.' },
              { label: 'What I changed:', text: 'I added labels and states alongside the colour, as IDEs do, so every change reads at a glance without relying on colour.' },
              { label: 'What I learned:', text: "accessibility should be designed in from the start, not found in testing. Next time, I'd check colour use against accessibility guidelines before the first test." },
            ]}
          />
          <Decision
            n={3}
            title="Show the changes first; keep or discard later"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'ship a full comparison with keeping or discarding each change straight away, or ship a view-only comparison first and add control later.' },
              { label: 'Why phased:', text: 'we needed to ship quickly, and engineering had other priorities alongside this. A clear view of changes solved the core problem, confidence before committing, so control over individual changes could come next.' },
              { label: 'Trade-off:', text: 'engineers could see every change, but not act on one from the comparison. Keeping or discarding individual changes was planned as the next step.' },
            ]}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Final design</SectionLabel>
          <h2 className={H2}>Every change visible before committing</h2>
          <CaseImage
            src="/images/diff_screen.png"
            alt="The final Git Diff design with numbered markers: 1 the side-by-side comparison, 2 additions and removals, 3 the file filter, 4 the unified view toggle, 5 Compare in the commit drawer"
            markers={FINAL_DESIGN_MARKERS}
            onOpen={open}
          />
          <ol className="cs-marked-list">
            <li><MarkerNumber n={1} /><span><span className="sr-only">1. </span><span className={LABEL}>Compare changes:</span> the last commit on the left, local changes on the right, line by line.</span></li>
            <li><MarkerNumber n={2} /><span><span className="sr-only">2. </span><span className={LABEL}>Additions and removals:</span> marked with colour, labels and states, never colour alone.</span></li>
            <li><MarkerNumber n={3} /><span><span className="sr-only">3. </span><span className={LABEL}>File filter:</span> "All files" or "Modified files only", so engineers focus on what matters.</span></li>
            <li><MarkerNumber n={4} /><span><span className="sr-only">4. </span><span className={LABEL}>Unified view:</span> a toggle back to a single-column view, for people who prefer it.</span></li>
            <li><MarkerNumber n={5} /><span><span className="sr-only">5. </span><span className={LABEL}>Compare where you commit:</span> Compare appears beside each file in the commit drawer, at the moment of risk, so checking becomes part of committing, not a separate trip.</span></li>
          </ol>
          <p className={P}>States and constraints I designed for:</p>
          <ul className={UL}>
            <li><span className={LABEL}>Nothing to compare:</span> an empty state when a branch has no uncommitted changes.</li>
            <li><span className={LABEL}>Compare, not edit:</span> the comparison is read-only, so it can't change the file by accident.</li>
            <li><span className={LABEL}>Last commit only:</span> it compares against the most recent commit, keeping version one simple.</li>
            <li><span className={LABEL}>Every changed file listed:</span> the commit drawer lists each one, with its own Compare trigger.</li>
          </ul>
          <CaseImage
            src="/images/diff_flow.png"
            alt="User flow: open a branch, open one or more files, trigger Git Diff and compare local, uncommitted changes with the last commit; with no changes, an empty state"
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>Tested before launch, measured after</h2>
          <p className={P}><span className={LABEL}>Usability testing:</span> five data engineers, screened on UserTesting and new to the feature, had to find and use Git Diff in realistic tasks.</p>
          <ul className={UL}>
            <li>All 5 completed the task, with no misclicks.</li>
            <li>3 rated it "very easy" (5 of 5) and 2 rated it 4 of 5. One summed it up as "exactly what we needed".</li>
          </ul>
          <p className={P}><span className={LABEL}>After launch:</span> I set up tracking in Heap before release, then compared the first 30 days after launch with the period before.</p>
          <ul className={UL}>
            <li>34% more successful commits.</li>
            <li>15% fewer error recoveries (times engineers had to undo or reset their work; serious ones needed engineers or support staff to step in).</li>
          </ul>
          <CaseImage
            src="/images/testing2.png"
            alt="UserTesting results: all 5 participants completed the task; on difficulty, 3 rated it 5 (very easy) and 2 rated it 4"
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>Clarity creates confidence</h2>
          <p className={P}>Showing engineers exactly what would change was enough to change how they worked: more commits, fewer recoveries. Researching first meant we tested side by side against inline, instead of shipping a basic view and hoping.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> time allowed only 1 external customer interview, so I'd push for more customers earlier. I'd also measure adoption, which was a goal but wasn't tracked, and check accessibility before testing rather than after.</p>
          <p className={P}><span className={LABEL}>Next:</span> keeping or discarding individual changes, comparing whole branches before merging, resolving conflicts, and comparing any two commits.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="git-diff" />
      <Footer />
      <ImageModal
        isOpen={!!selectedImage}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
        markers={selectedImage?.markers}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
