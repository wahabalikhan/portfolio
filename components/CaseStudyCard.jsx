import Link from 'next/link';
import IconArt from '@/components/IconArt';

// A case-study card: the company logo with the headline beside it (two lines at most), the
// description (up to two lines, including the headline result; every card keeps room for
// two lines), then a 16:10 thumbnail cropped from the centre (or, with no bg_src yet, the
// study's thumb_icon on a dark background).
// The company's name is the logo's alt text and shows in a tooltip on hover. The thumbnail
// sits at the bottom of the card, so thumbnails line up across a row. Reads one entry of
// data/caseStudies.js. `compact`: smaller type, for "Other case studies".
// The description with its metric phrase (if any) picked out: semibold, main text colour.
function Description({ text, metric }) {
  const at = metric ? text.indexOf(metric) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="home-cs-metric">{metric}</span>
      {text.slice(at + metric.length)}
    </>
  );
}

export default function CaseStudyCard({ study, compact = false }) {
  return (
    <Link href={study.link} className={`case-study-link home-cs-card group${compact ? ' home-cs-card-compact' : ''}`}>
      <div className="home-cs-body">
        <div className="home-cs-head">
          <span className="ftip-wrap home-cs-logo-wrap">
            <img src={study.logo_src} alt={study.company} className="home-cs-logo rounded" />
            <span className="ftip" aria-hidden="true">{study.company}</span>
          </span>
          <h3 className="home-cs-title text-gray-900 group-hover:text-blue-600 transition-colors">
            <span className="home-cs-title-text">{study.title}</span>
          </h3>
        </div>
        <p className="home-cs-text text-gray-500"><Description text={study.description} metric={study.metric} /></p>
      </div>
      <div className="cs-thumb home-cs-thumb">
        {study.bg_src ? <img src={study.bg_src} alt={study.title} /> : <IconArt src={study.thumb_icon} />}
      </div>
    </Link>
  );
}
