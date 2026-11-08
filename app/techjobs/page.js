'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';
import CaseStudyReadTracker from '@/components/CaseStudyReadTracker';
import FadeUp from '@/components/FadeUp';
import Footer from '@/components/Footer';
import IconArt from '@/components/IconArt';
import ImageModal from '@/components/ImageModal';
import OtherCaseStudies from '@/components/OtherCaseStudies';
import { AtAGlance, CaseImage, Decision, PersonaCards, SectionLabel } from '@/components/CaseStudyParts';

// Screenshots, to add later: set one to { src, alt } and it shows in its place. Until then
// nothing shows, except the hero, which shows the TechJobs icon on a dark background.
// When the hero screenshot is added, use it for the card thumbnail too (bg_src in
// data/caseStudies.js).
const SCREENSHOTS = {
  hero: null, // The search page with the preview open.
  saved: null, // The Saved page, under "Final design".
  admin: null, // The admin review queue, under "Behind the scenes".
};

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
          Job boards bury real roles under recruiter reposts, old listings and walls of text. I designed and built TechJobs, a UK job board that lists jobs straight from employers' own careers pages, so people can judge a role quickly and apply at the source.
        </p>
        <p className="mb-6">
          <a href="https://techjobs.bobbybuilds.app" target="_blank" rel="noopener noreferrer" className="cs-try-link">
            Try TechJobs ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        {SCREENSHOTS.hero ? (
          <CaseImage src={SCREENSHOTS.hero.src} alt={SCREENSHOTS.hero.alt} onOpen={open} />
        ) : (
          <div className="cs-hero-art">
            <IconArt src="/images/icons/techjobs-512.png" alt="The TechJobs icon, a white T with a green dot, on a dark background" />
          </div>
        )}
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
          <p className={P}>I started TechJobs after being made redundant in June 2026, and spending months on job boards myself.</p>
          <ul className={UL}>
            <li><span className={LABEL}>For job seekers:</span> the same role appears several times through different recruiters, old listings stay up long after they've closed, and every ad is written differently, so comparing roles means reading thousands of words.</li>
            <li><span className={LABEL}>For trust:</span> "Remote" often means remote somewhere else, and a board full of reposts and dead links makes every listing feel unreliable.</li>
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
          <h2 className={`${H2} mb-6`}>Four decisions that shaped it</h2>
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
              { label: 'Why I held back:', text: "the four key facts (salary, working pattern, contract and level) were right 99.7% of the time using rules alone. So those ship first, after a week running quietly in the background, and the full layout waits until it's earned." },
            ]}
          />
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Final design</SectionLabel>
          <h2 className={H2}>From search to the employer's site in a few clicks</h2>
          {SCREENSHOTS.saved && <CaseImage src={SCREENSHOTS.saved.src} alt={SCREENSHOTS.saved.alt} onOpen={open} />}
          <ol className="list-decimal pl-5 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><span className={LABEL}>Search that understands plain English:</span> "product designer over 60k in Leeds" is read as a role, a salary and a place, without any forms to fill in.</li>
            <li><span className={LABEL}>Filters for what matters:</span> working pattern, salary, level and "Remote from the UK", with the job count shown before you apply them.</li>
            <li><span className={LABEL}>A preview beside the results:</span> read a job without losing your place, then go straight to the employer's own apply page.</li>
            <li><span className={LABEL}>Saved jobs with "To apply" and "Applied" tabs,</span> plus an "I've applied" tick, so the urgent seeker can track where they are.</li>
            <li><span className={LABEL}>Job alerts you can edit in place,</span> with pause, resume and undo.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-2"><span className={LABEL}>Details that build trust:</span></p>
          <ul className={UL}>
            <li>One message colour rule: green for success, blue for information, amber for warnings and red for errors, the same everywhere.</li>
            <li>Honest freshness: "Last checked 3 days ago" instead of claiming a job is still open when that hasn't been checked recently.</li>
            <li>Phones first-class: no layout jump when results load, Back returns you to exactly where you were, 44px tap targets, and a skip link for keyboard users.</li>
          </ul>
          <p className={P}><span className={LABEL}>Behind the scenes:</span> an admin review page where new companies are checked by an AI review assistant first. Companies are approved, held or rejected automatically, with an undo, so the board runs itself.</p>
          {SCREENSHOTS.admin && <CaseImage src={SCREENSHOTS.admin.src} alt={SCREENSHOTS.admin.alt} onOpen={open} />}
        </section>
      </FadeUp>

      <FadeUp delay={100}>
        <section className="mb-12">
          <SectionLabel>Results</SectionLabel>
          <h2 className={H2}>Fewer jobs at first, then more that you can trust</h2>
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
          <p className={P}><span className={LABEL}>Next:</span> showing the four key facts on every job, "Open for 60 days" and "Reposted" labels, and a Pro plan.</p>
        </section>
      </FadeUp>

      <OtherCaseStudies currentId="techjobs" />
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
