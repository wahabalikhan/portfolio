// The RealTechJobs case study card's thumbnail, built in HTML and CSS so the text stays sharp at
// any size: on the brand blue, the headline in white on three lines on the left,
// "realtechjobs.co.uk" in light blue at the bottom left, and on the right a phone showing a job
// on RealTechJobs in a mobile browser (the picture has its own frame and address bar, so it
// reads as a website, not an app). The phone is cropped by the bottom edge so its top two thirds
// show, with the job title and salary well inside that part. Colours are the --rtj-* variables
// in app/globals.css.
//
// Sizing: the box is a size container, so the padding and phone scale with its width (cqw).
// - The phone is 35.8cqw wide and 10cqw from the top: with the picture's 834 x 1836 shape, that
//   makes it 1.5 times the height left below it in the card's 16:10 box, so two thirds show.
// - The text column takes the rest, minus a fixed 24px gap (gap-6) before the phone's frame
//   (which runs to the picture's edges), so the text can never touch or run under the phone.
// - The text column is a size container too, so the headline's size is its width / 7.5: the
//   longest line, "from employers.", is 7.40em wide in Geist 800 at this letter spacing, so it
//   just fits. Its max-width of 7.5em keeps the three lines when the size hits its 56px cap.
//   Below 15px it stops shrinking and wraps to four lines (balanced) instead.
// Nothing is absolutely positioned, because the cards sit inside FadeUp.
// The picture is held to its own height (!h-auto), because the card's .cs-thumb img stretches
// images to fill the thumbnail. Its shadow is a drop-shadow, which follows its rounded corners.
// With `alt`, screen readers get it as one image; without, it's decorative.
const PHONE = '/images/realtechjobs/rtj-thumb-phone';

export default function RealTechJobsThumb({ alt = '' }) {
  return (
    <div
      className="w-full h-full overflow-hidden text-left bg-[color:var(--rtj-blue)] [container-type:inline-size] [font-family:'Geist','Inter',sans-serif]"
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <div className="flex h-full gap-6 pl-[6.22cqw] pr-[6cqw]">
        <div className="flex flex-1 min-w-0 flex-col py-[6cqw] [container-type:inline-size]">
          <p className="my-auto max-w-[7.5em] text-[length:clamp(15px,calc(100cqw/7.5),56px)] font-extrabold leading-[1.1] tracking-[-0.045em] text-[color:var(--rtj-headline)] text-balance">
            Only real tech jobs, straight from employers.
          </p>
          <p className="text-[length:clamp(11px,5cqw,14px)] font-medium leading-none text-[color:var(--rtj-url)]">realtechjobs.co.uk</p>
        </div>
        <picture className="block shrink-0 self-start mt-[10cqw] w-[35.8cqw] [filter:drop-shadow(var(--rtj-phone-shadow))]">
          <source type="image/webp" srcSet={`${PHONE}.webp`} />
          <img
            src={`${PHONE}.png`}
            alt=""
            width={834}
            height={1836}
            loading="lazy"
            decoding="async"
            className="block w-full !h-auto"
          />
        </picture>
      </div>
    </div>
  );
}
