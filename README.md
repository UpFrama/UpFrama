# Upframa site

Marketing site for **Upframa**, AI voice agents that answer inbound calls, qualify leads and book appointments for service businesses.

Plain HTML, CSS and JavaScript, split into one folder per page component. [Vite](https://vitejs.dev) is the only dependency (dev server and production build).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the built site locally
```

## Structure

```
index.html, voice-ai.html, web-design.html   Page shells. Each lists its components in page order.
vite.config.js              Small plugin that expands <!-- @include ... --> tags.
src/
  main.js, voice-ai.js, web-design.js   One entry per page: imports its stylesheets and starts its components.
  config.js                 Cal.com link, contact email, embed on/off flag.
  styles/                   Shared styles
    tokens.css              Colors, fonts, spacing, per-breakpoint overrides
    base.css                Reset, body, grain overlay, wrappers
    animations.css          Entrance animations (.appear)
    buttons.css             Liquid-glass buttons
    glass.css               Glass cards + pointer spotlight
    logo.css  utilities.css  section.css  scroll-effects.css
  js/                       Shared behaviour
    utils.js                Helpers ($, $$, reduce-motion flag, whenVisible, ...)
    scroll.js               One requestAnimationFrame scroll loop (onScrollFrame)
    scrub.js                Scroll-scrubbed parallax/scale + section lines
    reveal.js  headings.js  spotlight.js  appear.js
  components/<name>/        One folder per section, each with its own files
    <name>.html             Markup
    <name>.css              Styles for that component only
    <name>.js               Behaviour (where it has any)
```

The site has three pages, each with its own entry file and root HTML file:

| Page | HTML | Entry | Contents |
|---|---|---|---|
| Home (short intro to Upframa) | `index.html` | `src/main.js` | `pages/home/` (hero, about, services, how we work), `booking`, `footer` |
| Voice AI | `voice-ai.html` | `src/voice-ai.js` | `hero` (with `simulator`), `scroll-band`, `demos`, `capabilities` (with `integrations`), `industries`, `calculator`, `pages/voice-ai/va-process.html`, `pricing`, `booking` |
| Website design | `web-design.html` | `src/web-design.js` | `pages/web-design/` (hero with work strip, services, projects, process, closing block) |

All pages share `ambient` (glow orbs plus the flowing light ribbons drawn on a canvas), `header`, `footer`, the `portal` scroll moment (each page has its own statement in its `*-portal.html` partial). The shared header/footer use three tokens that `vite.config.js` fills per page: `{{home}}` (so `#section` links go back to the home page), `{{wd_active}}` and `{{va_active}}` (highlight the current page in the nav). Project images live in `src/assets/work/`.

### Editing

- **Copy and markup:** edit the component's `.html` file.
- **Look:** edit the component's `.css`. Colors, fonts and the orange accent live in `src/styles/tokens.css` (`--accent: #F26522`).
- **Call simulator and demo scripts:** `simulator.data.js` and `demos.data.js`.
- **Add a section:** create `src/components/foo/foo.{html,css,js}`, add its `<!-- @include components/foo/foo.html -->` line to `index.html`, then import the CSS and call its init function in `src/main.js`.

## Booking embed (Cal.com)

`src/components/booking/booking.js` loads the official Cal.com inline embed for `upframa/discovery`. Change the link or turn it off in `src/config.js`:

```js
export const ENABLE_CAL_EMBED = true;
export const CAL_LINK = 'upframa/discovery';
```

The embed needs the site to be served over http(s). It will not render when `index.html` is opened from disk or in a sandboxed preview. If it cannot load, the section shows a message with the contact email.

## Deploy

`vite.config.js` uses `base: './'`, so `dist/` works on any static host or a GitHub Pages sub-path.

- **Netlify / Vercel / Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **GitHub Pages:** publish the `dist/` folder (for example with a GitHub Actions workflow that runs `npm ci && npm run build` and uploads `dist`).

## Things to check before launch

- Logo is a vector trace of the supplied PNG. Swap in the official SVG if you have one (`src/components/header/header.html`, `footer.html`).
- LinkedIn link in the footer is a guess (`https://www.linkedin.com/company/upframa`).
- Privacy, Terms and Brand Assets footer links are `mailto:` placeholders.
- The ROI calculator's cost-per-month slider uses a placeholder default.
- The audio demos and live call simulator are simulated in the browser, not real calls.
- Confirm the "SOC-2 Ready" and "256-bit TLS" badges and the "Book Free Blueprint" label are accurate.
