'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, MarkerNumber, PersonaCards, SectionLabel, ShippedFirst, VisualSlot } from '@/components/CaseStudyParts';

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
};

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const H3 = 'text-lg font-semibold mt-8 mb-3 text-gray-900';
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
          src="/images/matillion-bg.png"
          alt="The Matillion and Git logos side by side on a green background"
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
          <p className={P}>Matillion's Data Productivity Cloud helps data engineers build and manage cloud-native data pipelines. Version control was already part of the workflow, but users had no way to see what changed before saving their work. That lack of visibility created uncertainty, mistakes, and frequent undos, making version control feel risky rather than reliable.</p>
          <ul className={UL}>
            <li><span className={LABEL}>For users:</span> they hesitated, made mistakes and undid their own work. Some avoided version control altogether.</li>
            <li><span className={LABEL}>For the business:</span> serious mistakes pulled engineers or support staff in to help, collaboration suffered, and Matillion felt less reliable than the developer tools engineers already trusted.</li>
          </ul>
          <p className={P}>Data engineers needed clarity before they could trust the process.</p>
          <VisualSlot
            src="/images/git-diff-before.png"
            alt="Committing in Matillion before Git Diff: a list of changed files, with no way to see what changed inside them"
            onOpen={open}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Goals</SectionLabel>
          <h2 className={H2}>Goals for users and the business</h2>
          <ul className={UL}>
            <li>Give engineers real-time visibility of what changed before they commit</li>
            <li>Maintain familiarity for engineers already comfortable with developer tool workflows</li>
            <li>Increase confidence through clarity, not through adding more UI</li>
          </ul>
          <p className={P}><span className={LABEL}>Success metrics:</span> successful commits and error recoveries, tracked in Heap before and after launch.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>My role</SectionLabel>
          <h2 className={H2}>I led the design from research to post-launch tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-2">I led the full design process end-to-end:</p>
          <ul className={UL}>
            <li>Discovery planning and user research</li>
            <li>Competitive analysis of how other developer tools handle this problem</li>
            <li>Co-design workshop facilitation</li>
            <li>Prototyping and testing</li>
            <li>UX delivery, design QA, and analytics setup</li>
            <li>Post-launch tracking and iteration planning</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>What engineers needed was clarity, not more features</h2>
          <p className={P}>I compared how VS Code, GitHub Desktop and JetBrains show changes, interviewed 1 external customer and 4 internal data engineers, and ran a cross-functional workshop (How Might We framing, two rounds of sketching and dot voting). I also mapped the workflow, to understand when and why engineers need to see what changed.</p>
          <h3 className={H3}>Key user needs (framed as problems)</h3>
          <ul className={UL}>
            <li>"I need to easily understand what changed between my local version and what has been saved."</li>
            <li>"I need a scannable, side-by-side view because inline comparisons hide too much context."</li>
            <li>"I need clear indicators of what was added and what was removed."</li>
            <li>"I need control. Show me all files, or only the ones that matter."</li>
          </ul>
          <CaseImage
            src="/images/diff_workshop.png"
            alt="The remote Git Diff workshop board: How Might We notes, two rounds of paper sketches and dot voting, with the team on video"
            caption="The co-design workshop: How Might We framing, two rounds of ideas, then a vote."
            onOpen={open}
          />
          <CaseImage
            src="/images/diff_research_1.png"
            alt="A recorded research session: a data engineer walks through a commit's changes in GitHub's side-by-side view"
            caption="Interviews on how engineers use Git today, and what they need from it."
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
            {PERSONAS.image && <CaseImage src={PERSONAS.image.src} alt={PERSONAS.image.alt} onOpen={open} />}
          </section>
        </FadeUp>
      )}

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Clarity over cleverness</h2>
          <Decision
            n={1}
            title="Side by side, not inline"
            onOpen={open}
            sketch={{ src: '/images/git-diff-sketch-1.png', alt: 'Sketch of the two options: changes shown inline in one column, and side by side in two', caption: 'Recreated to show the options we considered.' }}
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
            sketch={{ src: '/images/git-diff-sketch-2.png', alt: 'Sketch of an added and a removed line, before (colour only) and after (colour with labels)', caption: 'Recreated to show the change.' }}
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
            sketch={{ src: '/images/git-diff-sketch-3.png', alt: 'Sketch of the two options: a view-only comparison, and one with keep and discard on each change', caption: 'Recreated to show the options we considered.' }}
            parts={[
              { label: 'Options:', text: 'ship a full comparison with keeping or discarding each change straight away, or ship a view-only comparison first and add control later.' },
              { label: 'Why phased:', text: 'we needed to ship quickly, and engineering had other priorities alongside this. A clear view of changes solved the core problem, confidence before committing, so control over individual changes could come next.' },
            ]}
          >
            <ShippedFirst>A view-only comparison, so engineers could see every change before committing. Keeping or discarding individual changes was planned next.</ShippedFirst>
          </Decision>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Working with engineering</SectionLabel>
          <h2 className={H2}>Built with engineering, checked against the design</h2>
          <p className="text-gray-700 leading-relaxed mb-2">I partnered closely with engineering to:</p>
          <ul className={UL}>
            <li>Deliver a scalable, technically feasible feature</li>
            <li>Balance performance with clarity throughout</li>
            <li>Ensure the final implementation matched the intended UX through regular QA checks</li>
          </ul>
          <p className={P}>Regular check-ins with Product helped prioritise and sequence improvements for rollout.</p>
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
            caption="When Git Diff can be used, what it compares, and the empty state."
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
            <li>All 5 completed the task, with no misclicks or moments of confusion.</li>
            <li>3 rated it "very easy" (5 of 5) and 2 rated it 4 of 5.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">Participants described the experience as:</p>
          <ul className={UL}>
            <li>"Clear"</li>
            <li>"Intuitive"</li>
            <li>"Exactly what we needed"</li>
          </ul>
          <CaseImage
            src="/images/testing1.png"
            alt="A UserTesting session recording: a participant compares a file's last commit with their local changes in the Git Diff prototype, with the task transcript beside it"
            caption="A participant finding and using Git Diff in a realistic task."
            onOpen={open}
          />
          <CaseImage
            src="/images/testing2.png"
            alt="UserTesting results: all 5 participants completed the task; on difficulty, 3 rated it 5 (very easy) and 2 rated it 4"
            caption="All 5 completed the task; 3 rated it very easy."
            onOpen={open}
          />
          <p className={P}><span className={LABEL}>After launch:</span> I set up tracking in Heap before release, then compared the first 30 days after launch with the period before.</p>
          <ul className={UL}>
            <li>34% more successful commits.</li>
            <li>15% fewer error recoveries (times engineers had to undo or reset their work; serious ones needed engineers or support staff to step in).</li>
          </ul>
          <h3 className={H3}>Expected impact</h3>
          <p className="text-gray-700 leading-relaxed mb-2">What we expected this to change, beyond what we measured:</p>
          <ul className={UL}>
            <li>Fewer support tickets related to version control errors</li>
            <li>Teams trusting Matillion's workflows more, reducing reliance on external tools</li>
            <li>More time focused on real work, not recovering from mistakes</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>Clarity creates confidence</h2>
          <h3 className={`${H3} mt-0`}>The cost of skipping validation</h3>
          <p className={P}>Without a research-led approach, the team would have shipped a basic comparison view with no grounding in how data engineers actually think about changes. The scannability vs inline debate wouldn't have been tested. Edge cases around file filtering would have been missed. There would have been no metric baseline to measure whether the feature actually changed behaviour.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> time allowed only 1 external customer interview, so I'd push for more customers earlier. I'd also measure adoption, which was a goal but wasn't tracked, and check accessibility before testing rather than after.</p>
          <h3 className={H3}>Next steps</h3>
          <ul className={UL}>
            <li>Keeping or discarding individual changes</li>
            <li>Merge-level comparisons</li>
            <li>Conflict resolution flows</li>
            <li>Commit-to-commit comparisons</li>
          </ul>
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
