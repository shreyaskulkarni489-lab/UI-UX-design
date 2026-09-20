# Ananya & Aarav - Royal Indian wedding invitation (redesign)

A fully animated, responsive redesign of the original invitation landing page.
Plain HTML, CSS and JavaScript. No build step and no dependencies.

## What is inside
- `index.html` - the complete site in ONE file (images embedded). Double-click to open, or upload it anywhere.
- `source/` - the same site as readable, editable code:
  - `index.html` - page structure and all text
  - `style.css` - colours, fonts, layout, animations (colour tokens are at the top, under `:root`)
  - `script.js` - gate opening, toran garland, countdown, wishes carousel, schedule vine, petals, music
  - `assets/` - couple illustration and the two portraits from the original site

## Change the details
- Names, parents, bios, schedule times, address: edit `source/index.html`
- Countdown date: `source/script.js`, search for `new Date('2026-10-31T11:00:00+05:30')`
- Colours: `source/style.css`, the `:root { ... }` block
- Wishes shown in the carousel: `source/script.js`, the `wishes` array

## Run it
Open `index.html` (or `source/index.html`) in a browser. Fonts load from Google Fonts, so use an internet connection.

## Put it online (free)
Drag the `source` folder (or just `index.html`) onto https://app.netlify.com/drop or import it as a static site on Vercel.

## Design notes
- Palette: night plum, maroon, antique gold, ivory, marigold, with rose and mint taken from the couple illustration
- Fonts: Cormorant Garamond (headings), Pinyon Script (names), Jost (body)
- Motifs drawn as SVG: toran of marigolds, jharokha arch, mandalas, diyas, interlocking rings
- Respects `prefers-reduced-motion`; music is off until tapped
