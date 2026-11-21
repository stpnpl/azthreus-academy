# Azthreus Academy — public website

Static public website for **Azthreus Academy of Science and Technology**, the education and
research initiative of Azthreus Systems.

- Target repository: `stpnpl/azthreus-academy`
- Expected public URL: `https://stpnpl.github.io/azthreus-academy/`

Plain HTML, one shared stylesheet, and a small vanilla JavaScript file. No build step, no
packages, no database, no external asset hosting.

---

## File layout

```
azthreus-academy/
├── index.html            Home (full Academy name, two actions, three audience cards)
├── programs.html         Programs: #k12, #college, #professional
├── research.html         Research: #resilient-computing, #space-communications,
│                         #long-term-preservation
├── about.html            About the Academy
├── contact.html          Contact routes (no form; details to be published)
├── README.md             This file
└── assets/
    ├── css/
    │   └── style.css     Shared theme: tokens, layout, components, form controls
    ├── js/
    │   └── nav.js        Mobile menu toggle + footer year (progressive enhancement)
    └── img/
        ├── azthreus-academy.png          Academy emblem, master artwork (1254×1254 RGBA)
        ├── azthreus-academy-favicon.png  64×64 square transparent site icon
        ├── azthreus-logo.png             Parent crest, unmodified source copy (512×512 RGBA)
        ├── azthreus-logo-160.png         Trimmed 160×160 parent-crest derivative (retained)
        └── favicon.png                   64×64 parent-crest icon (retained)
```

All five HTML files sit at the repository root, as required for GitHub Pages. Every internal
link is relative (`programs.html#k12`, `assets/css/style.css`), so the site works under the
`/azthreus-academy/` path prefix without any configuration.

No file is loaded from the Azthreus Systems repository at runtime: every brand image is a local
copy. The only references to the parent site are ordinary hyperlinks to
`https://stpnpl.github.io/azthreus-systems/`.

---

## Brand assets

- **Source:** `azthreus-academy.png` is the Azthreus Academy emblem — the official mark of this
  site, used in the header, the footer, and as the browser tab icon. It is the master artwork:
  keep it unmodified and derive anything else from it.
- **Derivative:** `azthreus-academy-favicon.png` is the same emblem trimmed to its true artwork
  bounds, re-centred on a square canvas, and resized to 64×64 with its transparency intact. The
  filename is deliberately distinct from the retired `favicon.png`: browsers cache favicons by
  URL, so a new filename is what makes returning visitors pick up the new tab icon.
- **Retained parent assets:** `azthreus-logo.png` is the Azthreus Systems parent crest, copied
  unmodified from `stpnpl/azthreus-systems` (`logo-v2.png`) — keep it if you ever need the
  full-resolution parent mark. `azthreus-logo-160.png` and `favicon.png` are its trimmed
  160×160 and 64×64 derivatives. No page references them any more; they stay in the repository
  only so previously published URLs keep resolving.
- **Usage:** the emblem appears at 44px beside the text wordmark in the header and footer, at 36px
  between 380–620px, and at 32px below 380px, which keeps "Azthreus Academy" on one line down to
  320px. The `<img>` carries an empty `alt=""` because the adjacent wordmark already names the
  organisation to screen readers.
- **To replace it:** drop a new PNG in `assets/img/`, then edit the two `src` attributes per page
  (`class="brand__mark"` in the header, `class="footer-brand__mark"` in the footer) and the
  `<link rel="icon">` per page. If you change the artwork, regenerate the favicon from the new
  master and give it a fresh filename so browsers pick it up. The pages currently reference the
  master file directly; if you would rather serve a smaller file, add a trimmed derivative (for
  example 160×160) and point those two `src` attributes at it instead.

---

## Local preview

GitHub Pages serves this project from a subfolder, so preview it the same way. From the folder
that *contains* `azthreus-academy/`:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/azthreus-academy/> (and, for example,
<http://localhost:8000/azthreus-academy/programs.html#college>).

Opening `index.html` directly from disk also works, because all paths are relative — but the
path-prefix check above is the one that matches production.

---

## GitHub Pages setup

1. Upload the contents of this folder to the root of `stpnpl/azthreus-academy`
   (`index.html` at the top level of the repository).
2. In the repository: **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder
   **/ (root)**, then save.
4. The site appears at `https://stpnpl.github.io/azthreus-academy/` after the first build
   (usually under a minute).

No Jekyll configuration is needed: there are no underscore-prefixed files or folders, so a
`.nojekyll` file is optional. The parent repository does not need to change.

---

## Where to edit what

| What you want to change | Where |
| --- | --- |
| Colours, type scale, spacing, buttons, focus rings, form controls | `assets/css/style.css` — section **1. Tokens** (`:root`). Every component reads from these variables. |
| Site name in the header and footer wordmark | The `.wordmark` block near the top and bottom of each HTML file. |
| Navigation and footer links | Written directly into **each** of the five HTML files (so navigation works without JavaScript). Edit all five together; set `aria-current="page"` on the link for the current page. |
| Homepage audience cards | `index.html` — the `.audience-grid` block. Card hrefs point to `programs.html#k12`, `#college`, `#professional`. |
| Program descriptions, learning outcomes, worked examples, status labels | `programs.html` — one `<section class="path" id="…">` per audience. |
| Research themes and research questions | `research.html` — one `<article class="theme" id="…">` per theme. |
| Contact route text and contact details | `contact.html` — the `.route` cards. When an Academy address is confirmed, replace the "to be published" lines and, if useful, add a `mailto:` link. Do not add a form unless it actually delivers messages. |
| Page titles and descriptions | The `<title>` and `<meta name="description">` in each page's `<head>`. |
| Footer copyright year | The year updates itself in `nav.js`; the static fallback is `2026`. |

### Status labels

Copy about programs and research is deliberately marked as in development. Keep the labels
accurate when you edit:

- `<span class="status status--proposed">Proposed</span>` — designed but not running.
- `<span class="status">Illustrative</span>` — an example written to show the shape of the work.
- Text equivalents are used in the notes so the meaning survives without colour.

Nothing on the site claims enrollment is open, tuition has been set, credentials are awarded,
or that any research result has been published.

---

## Notes for reuse (azthreus-isms)

`assets/css/style.css` is organised in numbered sections. Section 1 defines colour, typography,
spacing, radius, and transition tokens; sections 5 and 13 define buttons and form controls
(`.btn`, `.input`, `.select`, `.textarea`, `.field`, `.field__hint`, `.field__error`, plus
`:focus-visible` and error states). Those parts are the pieces intended to carry over to the
Azthreus Integrated Student Management System; they are not used by the public pages except for
buttons.

Form controls are styled but no form is included anywhere on this site.

---

## Accessibility and behaviour notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, ordered headings.
- Skip link to `#main` as the first focusable element.
- Mobile menu: a real `<button>` with `aria-expanded` and `aria-controls="primary-nav"`, closes
  on Escape (returning focus to the button), on outside click, on resize to desktop, and after
  a link is followed.
- Without JavaScript, the navigation is a visible stacked list on small screens (the `<html>`
  element carries `no-js`, which `nav.js` swaps for `js`); all links and the footer work.
- Visible focus ring (`:focus-visible`, 3px teal-light) on links, buttons, and form controls.
- `prefers-reduced-motion` disables smooth scrolling and transitions; `prefers-contrast: more`
  and `forced-colors` have explicit handling.
- Anchored sections use `scroll-margin-top` so headings are not hidden under the fixed header.
- Body text, secondary text, links, and button labels meet WCAG AA contrast (verified; see
  notes in the handover message).
