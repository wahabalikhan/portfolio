'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import RealTechJobsThumb from '@/components/RealTechJobsThumb';
import { AtAGlance, CaseImage, Decision, PersonaCards, SectionLabel, ShippedFirst, SimpleBars, VisualSlot } from '@/components/CaseStudyParts';

// Screenshots in public/images/realtechjobs: each cropped to the page's content column, as WebP
// at 720px (the column's width) and at full size (1040px, the capture's own resolution, for
// sharp screens and the viewer), with a PNG fallback.
const shot = (name, height) => ({
  src: `/images/realtechjobs/${name}-1040.png`,
  webp: `/images/realtechjobs/${name}-720.webp 720w, /images/realtechjobs/${name}-1040.webp 1040w`,
  full: `/images/realtechjobs/${name}-1040.webp`,
  width: 1040,
  height,
});
const SCREENSHOTS = {
  search: {
    ...shot('search-preview', 947),
    alt: "RealTechJobs search results for 'product designer': 41 jobs on the left, each with its company, location and when it was posted, and a Senior Product Designer role at the Financial Times open in a preview on the right, showing 'Salary not stated', London, Senior, an 'Apply on Financial Times's site' button and the employer's own job description.",
    caption: "Search with a job open in the preview. The facts come first, even when it's \"Salary not stated\", then the employer's own words, and Apply goes straight to their site, so people can compare roles without losing their place.",
  },
  approvals: {
    ...shot('admin-approvals', 949),
    alt: "The RealTechJobs admin page. A summary reads: This week: 82 checked, 39 approved automatically, 29 decided by you, 0 waiting, you agreed 27 of 28 (96%). Below it, 'Companies to review (0)' says nothing is waiting, 'On hold (13)' is collapsed, and 'Approved automatically this week (39)' lists THG, Sona and Neuphonic, each with the assistant's reason and an Undo button.",
    caption: "The approvals queue. Each week's summary shows how often I agreed with the AI review assistant (27 of 28), which is what lets it approve companies on its own, and every automatic approval can be undone.",
  },
  onHold: {
    ...shot('admin-on-hold', 947),
    alt: "The RealTechJobs admin page with 'On hold (13)' open: JOOR, Oxa and Hearst, each held automatically, with a note saying why, such as a name that's a common word or most of a company's jobs being outside the UK, and a Back to queue button.",
    caption: "Companies the assistant isn't sure about are held, not guessed at, with a note saying why, so a doubtful company never reaches the board without a person checking it.",
  },
};

// Jobs listed at each stage, for the chart above the results.
const LISTINGS = [
  { label: 'Before', value: 5000, display: '~5,000' },
  { label: 'Company-first', value: 1000, display: '~1,000' },
  { label: 'Kept while listed', value: 1834 },
];

const PERSONAS = [
  { name: 'The focused switcher', text: 'In work, browsing on their phone in spare moments. They want to judge a role in seconds, and only see ones worth their time.' },
  { name: 'The urgent seeker', text: "Recently redundant and applying widely. They need volume they can trust, alerts for new roles, and a way to track what they've applied for." },
];

const H2 = 'text-2xl font-bold mb-4 text-gray-900';
const P = 'text-gray-700 leading-relaxed mb-4';
const UL = 'list-disc pl-5 text-gray-700 leading-relaxed mb-6 space-y-2';
const LABEL = 'font-semibold text-gray-900';

export default function TechJobsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const open = setSelectedImage;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main">
      <CaseStudyReadTracker study="techjobs" />

      <FadeUp delay={100}>
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Taking the faff out of finding a tech job</h1>
        <p className="text-lg text-gray-700 mt-4 mb-3 leading-relaxed">
          Job boards bury real roles under recruiter reposts, old listings and walls of text. I designed and built RealTechJobs, a UK job board that lists jobs straight from employers' own careers pages, so people can judge a role quickly and apply at the source. (It launched as TechJobs, and was renamed RealTechJobs in November 2026.)
        </p>
        <p className="mb-6">
          <a href="https://realtechjobs.co.uk" target="_blank" rel="noopener noreferrer" className="cs-try-link">
            Try RealTechJobs ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <div className="cs-hero-art">
          <RealTechJobsThumb alt="RealTechJobs: its white icon and name on the brand blue, above the line 'Only real tech jobs, straight from employers.'" />
        </div>
        <AtAGlance items={[
          { label: 'Role', value: 'Product designer and builder: research, product decisions, design, and building with Claude Code' },
          { label: 'Team', value: 'Just me' },
          { label: 'Timeline', value: 'October 2026 to now' },
          { label: 'Results', value: "1,800+ jobs from 290+ companies, all from employers' own sites. Most searches show results in under a second." },
        ]} />
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>The problem</SectionLabel>
          <h2 className={H2}>Finding a real tech job meant wading through noise</h2>
          <p className={P}>I started RealTechJobs after being made redundant in June 2026, and spending months on job boards myself.</p>
          <ul className={UL}>
            <li><span className={LABEL}>For job seekers:</span> the same role appears several times through different recruiters, old listings stay up long after they've closed, and every ad is written differently, so comparing roles means reading thousands of words.</li>
            <li><span className={LABEL}>For trust:</span> "Remote" often means remote somewhere else, and a board full of reposts and dead links makes every listing feel unreliable.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Goals</SectionLabel>
          <h2 className={H2}>Goals for users and the business</h2>
          <ul className={UL}>
            <li><span className={LABEL}>For job seekers:</span> find real jobs fast, judge them at a glance, and apply at the source.</li>
            <li><span className={LABEL}>For RealTechJobs:</span> earn trust, so people come back and recommend it, and so a Pro plan can work later.</li>
            <li><span className={LABEL}>How I'd know:</span> more searches that lead to Apply, people returning, and few reports of wrong jobs.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Research</SectionLabel>
          <h2 className={H2}>Every ad was written differently, but the same facts kept coming up</h2>
          <p className={P}>I studied 6,466 real job ads to see how employers actually write them, and ran a heuristic UX review of my own product once it was live.</p>
          <ul className={UL}>
            <li>Nearly every ad uses headings, and 82% of those headings fall into about 50 groups, so ads can be put into one consistent shape.</li>
            <li>The facts people check first (salary, working pattern, contract and level) are often missing, buried, or contradicted by the job board's own fields.</li>
            <li>My UX review found three areas to fix: finding jobs, credibility, and phones.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Personas</SectionLabel>
          <h2 className={H2}>Some people browse; others need a job now</h2>
          <p className={P}>These come from my own search, and from talking to other job seekers.</p>
          <PersonaCards people={PERSONAS} />
          <p className={P}><span className={LABEL}>How this shaped the design:</span> both needed the same thing: real jobs, straight from the employer, readable at a glance. The urgent seeker also needed Saved jobs, applied tracking and alerts.</p>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Decisions</SectionLabel>
          <h2 className={`${H2} mb-6`}>Saying no to volume</h2>
          <Decision
            n={1}
            title="Quality over volume: jobs only from employers' own sites"
            onOpen={open}
            parts={[
              { label: 'Options:', text: "list everything from big job boards, or only jobs from companies' own careers pages, with other boards as an opt-in." },
              { label: 'Why I chose company-first:', text: `a job straight from the employer is real, current and has one apply link, with no recruiter reposts or duplicates. It's the clearest answer to "can I trust this?"` },
              { label: 'Trade-off:', text: "listings fell from about 5,000 to about 1,000 overnight. A smaller board you can trust beat a bigger one you can't, and a switch in the filters still brings other boards back for anyone who wants them." },
            ]}
          />
          <Decision
            n={2}
            title="Keep jobs while the employer still lists them"
            onOpen={open}
            parts={[
              { label: 'Options:', text: "remove every job after 30 days, or keep company jobs for as long as they're still on the employer's own site, up to 90 days." },
              { label: 'Why:', text: `a 30-day cut-off was removing real, open roles. Checking the employer's site tells you for certain whether a job is still open, which a date can't. "Always open" talent pools are left out, and a reposted job keeps its original date, so it doesn't look newer than it is.` },
              { label: 'Result:', text: 'listings grew from 1,013 to 1,834 (81% more), all still open at the source.' },
            ]}
          />
          <Decision
            n={3}
            title={'"Remote" has to mean remote from the UK'}
            onOpen={open}
            parts={[
              { label: 'What I found:', text: 'many "Remote" roles from overseas companies only hire in their own country, and places like Durham, North Carolina were being read as Durham, UK. 104 US jobs were showing as UK roles.' },
              { label: 'What I changed:', text: `every remote role is labelled by who can apply: "Remote (UK)", "Remote (Europe, UK eligible)" or "Remote (worldwide)". Roles only open elsewhere are dropped, and overseas companies get extra checks before they're listed.` },
            ]}
          />
          <Decision
            n={4}
            title="Only show what's proven"
            onOpen={open}
            parts={[
              { label: 'Options:', text: 'use AI to rearrange every job ad into the same sections, or start with only the facts I could prove were right.' },
              { label: 'What happened:', text: 'I built an answer sheet of hand-checked ads and tested the AI on ads it had never seen. It scored well on companies it knew, but not well enough on new ones: a wrongly sorted ad would mislead people.' },
              { label: 'Why I held back:', text: "the four key facts (salary, working pattern, contract and level) were right 99.7% of the time using rules alone." },
            ]}
          >
            <ShippedFirst>The four facts people check first: salary, working pattern, contract and level. The full layout waits until it's earned.</ShippedFirst>
          </Decision>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Final design</SectionLabel>
          <h2 className={H2}>From search to the employer's site in a few clicks</h2>
          <ol className="list-decimal pl-5 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><span className={LABEL}>Search that understands plain English:</span> "product designer over 60k in Leeds" is read as a role, a salary and a place, without any forms to fill in.</li>
            <li><span className={LABEL}>Filters for what matters:</span> working pattern, salary, level and "Remote from the UK", with the job count shown before you apply them.</li>
            <li><span className={LABEL}>A preview beside the results:</span> read a job without losing your place, then go straight to the employer's own apply page.</li>
            <li><span className={LABEL}>Saved jobs with "To apply" and "Applied" tabs,</span> plus an "I've applied" tick, so the urgent seeker can track where they are.</li>
            <li><span className={LABEL}>Job alerts you can edit in place,</span> with pause, resume and undo.</li>
          </ol>
          <CaseImage {...SCREENSHOTS.search} onOpen={open} />
          <VisualSlot src="/images/techjobs-job.png" alt="A RealTechJobs job page: the role, company, salary, working pattern and level at the top, and an Apply button that goes to the employer's own site" onOpen={open} />
          <VisualSlot src="/images/techjobs-saved.png" alt="The RealTechJobs Saved page, with To apply and Applied tabs and an I've applied tick on each job" onOpen={open} />
          <VisualSlot src="/images/techjobs-alerts.png" alt="RealTechJobs job alerts, each editable in place, with pause, resume and undo" onOpen={open} />
          <p className="text-gray-700 leading-relaxed mb-2"><span className={LABEL}>Details that build trust:</span></p>
          <ul className={UL}>
            <li>One message colour rule: green for success, blue for information, amber for warnings and red for errors, the same everywhere.</li>
            <li>Honest freshness: "Last checked 3 days ago" instead of claiming a job is still open when that hasn't been checked recently.</li>
            <li>Phones first-class: no layout jump when results load, Back returns you to exactly where you were, 44px tap targets, and a skip link for keyboard users.</li>
            <li>Honest labels: 'Reposted' on jobs that were taken down and listed again, and how long a job has been open, with the dates on hover.</li>
            <li>Report this job: when three different people report a job, it's hidden while it's checked again.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Back office</SectionLabel>
          <h2 className={H2}>The internal tools that run the board</h2>
          <p className={P}>Every new company is checked by an AI review assistant before its jobs are listed. Companies are approved, held or rejected automatically, with an undo, so the board runs itself, and I only step in when the assistant isn't sure.</p>
          <CaseImage {...SCREENSHOTS.approvals} onOpen={open} />
          <CaseImage {...SCREENSHOTS.onHold} onOpen={open} />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>Fewer jobs at first, then more that you can trust</h2>
          <SimpleBars
            bars={LISTINGS}
            caption="Jobs listed on RealTechJobs at each stage."
            summary="Bar chart of jobs listed: about 5,000 before, about 1,000 after switching to jobs only from employers' own sites, and 1,834 after keeping jobs while the employer still lists them."
          />
          <ul className={UL}>
            <li>1,834 jobs from 291 companies, every one straight from the employer's own site.</li>
            <li>81% more listings after keeping jobs while they're still listed, without adding old ones.</li>
            <li>104 wrongly labelled US jobs removed, and every remote role labelled by who can apply.</li>
            <li>Most searches show results in under a second, and no layout jump on phones (layout shift down from 0.256 to 0).</li>
            <li>Running costs of a few pence a day for the AI that checks new companies.</li>
          </ul>
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Reflection</SectionLabel>
          <h2 className={H2}>Trust is the product</h2>
          <p className={P}>Every big decision, from company-first to holding back the AI, came down to one question: will this make people trust what they see? Saying no to volume, and to an impressive-looking AI feature that wasn't ready, made the product better.</p>
          <p className={P}><span className={LABEL}>What I'd do differently:</span> test the AI on unseen examples from day one. My first results looked excellent only because I was measuring on the same examples I'd tuned it on.</p>
          <p className={P}><span className={LABEL}>Next:</span> showing the key facts and the sorted layout on every job, and a Pro plan.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="realtechjobs" />
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
