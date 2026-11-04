# Portfolio

The personal portfolio of Wahab (Bobby) Khan, a product designer: case studies,
writing and a CV, with Figma-style live comments and cursors on every page.

Live site: [wahabalikhan.com](https://wahabalikhan.com)

## Stack

- **Next.js** (App Router), exported as a static site
- **Supabase** for comments, live cursors and presence
- **Cloudflare Pages** for hosting, with a Pages Function for the GitHub contributions graph
- **Tailwind CSS** for styling

## Run it locally

You need Node.js 20 or later.

```bash
npm install
```

Create a `.env.local` file in the project root with your own Supabase project's details:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` creates the static site in `out/`.

The GitHub contributions graph (`functions/api/github-contributions.js`) only runs on
Cloudflare Pages, and needs a `GITHUB_TOKEN` set in the Pages project's settings.
The rest of the site works without it.

## Licence

The code is MIT licensed. All content (case studies, writing, images, the CV and
personal branding) is © Wahab Ali Khan, all rights reserved. See [LICENSE](LICENSE).
