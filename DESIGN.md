---
name: Portion
description: Settle up in seconds. A restaurant receipt that gets split in front of you.
colors:
  table: "#e3f0f2"
  ink: "#16697a"
  paper: "#ffffff"
  graphite: "#19191e"
  slate: "#55555f"
  rule: "#dedee4"
  tray: "#eaeaee"
  tangerine: "#ff7733"
  tangerine-press: "#e85d1a"
  tangerine-text: "#bf4810"
  tangerine-soft: "#fff4ec"
  on-tangerine: "#0f0f12"
  chip-priya: "#dfe6fb"
  chip-priya-text: "#2f4aa8"
  chip-marcus: "#ebe3fb"
  chip-marcus-text: "#5b3fa3"
  chip-lena: "#d6f1ee"
  chip-lena-text: "#126b62"
typography:
  wordmark:
    fontFamily: "PortionTitle, Spicy Rice, system-ui, sans-serif"
    fontSize: "68px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
  display:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body-lg:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.2
  ledger:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  ledger-total:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "tnum"
  ledger-meta:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  row: "8px"
  screen: "34px"
  device: "43px"
  pill: "999px"
spacing:
  gutter-mobile: "20px"
  gutter: "32px"
  container: "1200px"
  section-mobile: "96px"
  section: "128px"
  receipt-width: "420px"
components:
  status-pill:
    backgroundColor: "{colors.tangerine}"
    textColor: "{colors.on-tangerine}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.tray}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.rule}"
    textColor: "{colors.ink}"
  receipt-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    typography: "{typography.ledger}"
    rounded: "{rounded.row}"
    padding: "8px 12px"
  receipt-row-mine:
    backgroundColor: "{colors.tangerine-soft}"
    textColor: "{colors.graphite}"
  share-band:
    backgroundColor: "{colors.tangerine-soft}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.row}"
    padding: "10px 12px"
  claim-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate}"
    rounded: "{rounded.pill}"
    padding: "8px 16px 8px 8px"
  stub:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    typography: "{typography.ledger}"
    padding: "24px 20px 22px"
    width: "220px"
  stub-open:
    backgroundColor: "{colors.tangerine-soft}"
  step-slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    padding: "30px 26px 28px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  avatar-chip:
    backgroundColor: "{colors.tangerine}"
    textColor: "{colors.on-tangerine}"
    rounded: "{rounded.pill}"
    size: "26px"
  avatar-chip-friend:
    backgroundColor: "{colors.chip-priya}"
    textColor: "{colors.chip-priya-text}"
    rounded: "{rounded.pill}"
    size: "26px"
  phone-frame:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.device}"
    padding: "9px"
---

# Design System: Portion

## Overview

**Creative North Star: "The Split Receipt"**

The whole surface is a restaurant table seen from above: a pale teal tabletop, white thermal-receipt paper laid on it, and a teal pen that has annotated the paper with quick strokes. Content does not sit in cards; it is printed on slips of paper with torn zigzag edges, dashed rules between ledger blocks, and a dotted perforation where the paper is meant to tear. The signature move is that the paper behaves like paper: lines get claimed by friends' avatar chips, the long receipt tears into one stub per person, and slips tilt a fraction of a degree when they are the active one.

Density is low and calm around the paper and tight on it. Prose is set in Inter at generous sizes on the table; everything that is a bill (items, prices, totals, table metadata) is set in JetBrains Mono with tabular figures, the way a printer would. The wordmark PORTION in PortionTitle heads the receipt like a restaurant's name, and the Spicy Rice P mark is the only logo in the chrome.

The world is light only, by decision: white paper and line-art illustration on a pale ground. Tangerine is scarce and personal; it means "you" and "the status", and almost nothing else is orange.

**Key Characteristics:**
- Pale teal table ground (#e3f0f2) with white paper objects resting on it; no generic cards.
- Torn zigzag edges, dashed rules and dotted perforations as the structural vocabulary.
- Two-voice type: Inter for prose and controls, JetBrains Mono with tabular numerals for anything on the bill.
- Teal ink (#16697a) for the wordmark, headlines, links and hand-drawn doodle strokes.
- Tangerine reserved for the visitor's own claims, their share, the Coming soon status, and focus.
- Friends are identified by pastel initial chips, never by photos.

## Colors

A cool teal-and-white tabletop with one warm accent that belongs to the visitor.

### Primary
- **Teal Ink** (ink): The pen and the brand. Wordmark, the P mark, every section headline, navigation and secondary-button text, doodle strokes, and the scrollbar thumb on hover. Headlines on the table are always ink, never graphite.
- **Tangerine** (tangerine): From the Figma design system. The Coming soon status pill, the visitor's own avatar chip (AS), and the 3px focus outline. Pressed state uses **Tangerine Press** (tangerine-press).
- **Tangerine Text** (tangerine-text): The legible accent for text and small icons on light grounds: inline claim notes ("Priya claimed this first.") and the clock beside "Coming soon." in the closing.
- **Tangerine Soft** (tangerine-soft): The tint of "yours". Rows you claimed, the your-share band on the receipt, the open "Still on the table" stub, and text selection.
- **On Tangerine** (on-tangerine): Near-black text on the tangerine pill and chip, never white.

### Secondary
- **Friend chips**: three pastel ground/text pairs from the Figma avatar set: Priya periwinkle (chip-priya / chip-priya-text), Marcus lavender (chip-marcus / chip-marcus-text), Lena mint (chip-lena / chip-lena-text). They identify people only; they never color surfaces, text blocks or buttons.

### Neutral
- **Table** (table): The page ground, also the sticky header at 95% with a light backdrop blur, and the scrollbar track.
- **Paper** (paper): Every receipt, stub, slip and claim tag.
- **Graphite** (graphite): Primary text on paper, totals, step titles when active, the phone bezel.
- **Slate** (slate): Secondary prose, subtotal/tax/tip lines, metadata, inactive step titles. Also the perforation at 45% alpha.
- **Rule** (rule): Dashed rules on paper, empty-claim dashed circles, secondary-button hover.
- **Tray** (tray): The resting fill of the secondary button.

### Named Rules
**The It's-Yours Rule.** Tangerine and its soft tint mark what belongs to the visitor (their rows, their chip, their share) plus the single Coming soon status and the focus ring. Totals for everyone else stay graphite. If something orange does not belong to "you" or the status, it is wrong.

**The Ink-On-Table Rule.** Large type that sits directly on the table ground is teal ink; type on paper is graphite and slate. The color tells you whether you are reading the page or the bill.

## Typography

**Display Font:** Inter Variable (with Inter, system-ui)
**Wordmark Font:** PortionTitle, the custom good-doce face (with Spicy Rice)
**Label/Mono Font:** JetBrains Mono 400 and 600 (with ui-monospace, Menlo)

**Character:** A friendly, tightly tracked bold sans talks to the visitor; a crisp monospace prints the bill. The chunky PortionTitle wordmark is the restaurant name at the top of the receipt and is used nowhere else.

### Hierarchy
- **Wordmark** (400, 60px mobile / 68px desktop, line-height 1, 0.01em, uppercase): "PORTION" heading the receipt only.
- **Display** (700, 40px mobile / 56px desktop, line-height 1.02, -0.035em): Section headlines on the table, ink, held to 13-16ch.
- **Headline** (700, 34px mobile / 40px desktop, line-height 1.05, -0.03em): The hero promise beside the receipt, ink, max 13ch.
- **Title** (700, 26px mobile / 30px desktop, line-height 1.1, -0.03em): Step titles on slips; 22px / -0.02em for the latest-post title.
- **Body large** (400, 18-19px, line-height 1.5): Lede paragraphs on the table, slate, 32-46ch.
- **Body** (400, 17px, line-height 1.55): Slip copy, slate, max 40ch.
- **Label** (600, 15-17px): Buttons, nav links, chip-holder names, "Settle up in seconds." under the wordmark.
- **Ledger** (Mono 400, 15px, tabular): Receipt items and prices; 13px in stubs. Totals step up to Mono 600 at 17px on the receipt and 20-24px on stubs.
- **Ledger meta** (Mono 400, 12-13px, 0.06-0.08em, uppercase): Table metadata printed on the paper, such as "SAMPLE TABLE / FRIDAY LUNCH" and "TOTAL 75.96". It is part of the printed receipt, not a heading device.

### Named Rules
**The Printer Rule.** Anything that is a line item, a price, a quantity, a date stamp or table metadata is set in JetBrains Mono with tabular numerals. Prose and controls never are.

**The One Wordmark Rule.** PortionTitle appears once per page, as the receipt's name. It is never used for headlines.

## Layout

A centered container (max 1200px) with 20px gutters on mobile and 32px from 768px. Sections breathe on the table with 96px vertical padding on mobile and 128px from 768px. The hero is a three-column grid at 1024px and up (flexible / 420px receipt / flexible, 56px gap) with the side columns pushed down so the receipt is the tallest object; below 1024px it stacks and the live claim feed keeps only its newest tag.

Paper objects are placed, not gridded: the hero receipt rests at -1deg, stubs fan out with offsets of 30-64px and rotations between -5deg and 4deg, and the active step slip shifts 8px left and rotates -0.6deg. Below 768px the tear becomes a static 2-column grid of stubs and the phone mockups follow each step inline at 260px wide instead of sticking beside them.

Breakpoints in use: 640px (sm), 768px (md), 1024px (lg).

## Elevation & Depth

Depth is physical: paper casting a soft shadow on a table. Because the zigzag edges are masks or clip-paths, shadows live on a wrapper as `filter: drop-shadow` so they follow the torn silhouette. Every shadow is two layers, a tight neutral contact shadow plus a long teal-tinted ambient one, so paper looks lit by the table color rather than by grey.

### Shadow Vocabulary
- **Receipt** (`filter: drop-shadow(0 2px 3px rgb(15 15 31 / 0.08)) drop-shadow(0 22px 28px rgb(22 105 122 / 0.18))`): The hero receipt.
- **Slip** (`filter: drop-shadow(0 2px 3px rgb(15 15 31 / 0.08)) drop-shadow(0 16px 22px rgb(22 105 122 / 0.16))`): Stubs, the receipt tail, step slips, the latest-post slip.
- **Tag** (`box-shadow: 0 1px 2px rgb(15 15 31 / 0.06), 0 8px 20px -8px rgb(22 105 122 / 0.25)`): Claim tags, which are pill-shaped and unmasked.
- **Device** (`box-shadow: 0 2px 6px rgb(15 15 31 / 0.1), 0 30px 60px -18px rgb(22 105 122 / 0.4)`): The phone frame around app screens.

### Named Rules
**The Teal Light Rule.** The ambient layer of every shadow is tinted with ink (rgb 22 105 122), never neutral black. Hard offset shadows do not exist in this world.

## Shapes

Two families. Paper is rectangular with torn edges: zigzag teeth via a conic-gradient mask (9px teeth on the receipt, 7px on slips) or an animated polygon clip-path on stubs, where the teeth grow from flat as the strip tears. Interactive and human things are round: buttons, the status pill, claim tags and avatar chips are full pills or circles (999px), receipt rows and the share band have gently rounded 8px corners, and the phone frame is 43px around a 34px screen.

Lines on paper are 2px dashed (rule color) between ledger blocks and under the receipt header, and 2px dotted slate at 45% for perforations and tear seams. Empty claim slots are 26px circles with a 2px dashed rule border.

## Components

### Buttons
Soft, round and thumb-sized.
- **Shape:** Full pill (999px), 52px tall, 22px horizontal padding, 8px icon gap, Inter 600 16px.
- **Status pill:** Tangerine ground with on-tangerine text and a bold clock icon. It is a status, not a link: "Coming soon".
- **Secondary:** Tray ground with ink text and a bold right arrow; hover moves to the rule fill and slides the arrow 3px right; active scales to 0.97 on the strong ease-out curve (160ms).
- **Focus:** 3px tangerine outline at 3px offset with an 8px radius, across the whole landing surface.

### Chips (avatar)
- **Style:** Circle with two initials in Inter 600 at 38% of the diameter (minimum 11px); sizes 22, 26, 28, 30 and 34px depending on context.
- **State:** The visitor (AS) is tangerine with on-tangerine text; friends use their pastel pair. Unclaimed units are a dashed empty circle. Chips enter with a 0.32s scale-and-unblur.

### Cards / Containers
There are no cards. Containers are paper:
- **Receipt:** Up to 420px wide, zigzag top and bottom, receipt shadow, resting at -1deg.
- **Stub:** 220px wide from 768px (full width in the mobile grid), Mono 14px, 24px / 20px / 22px padding, a dashed rule above the amount; the open stub uses the tangerine-soft ground.
- **Step slip:** 30px / 26px / 28px padding with 7px teeth; inactive titles fade to slate on desktop.
- **Claim tag:** White pill holding a 34px chip and a one-line "Name claimed Item" sentence in 14px slate with the name in graphite 600.

### Navigation
- **Style:** Sticky 64px header on table at 95% with backdrop blur; the Spicy Rice P (28px, ink) at left and a single "Dev Blog" link at right.
- **Links:** Ink, Inter 600 15px, with a 2px underline at 6px offset that is transparent at rest and turns tangerine on hover.
- **Footer:** A 15% ink hairline above, the P mark at 24px, copyright in 14px slate, and the same Dev Blog link.

### Receipt row (signature)
A full-width button for each line item: name, quantity line in 12px slate when more than one unit, the tabular amount, and one chip slot per unit. Hover (fine pointers only) tints the row #f4f4f7; a claimed-by-you row takes the tangerine-soft ground; press scales to 0.985. A refused claim shows a 13px tangerine-text note under the row for 2.4s.

### The Tear (signature)
On wide screens without reduced motion, a 230vh scroll section pins the header slip and the stubs; scroll progress grows the torn edges, fades the dotted seams and fans the stubs into their offsets. Otherwise the stubs render already torn with half rotation.

### Doodles
Hand-drawn strokes in ink: 4px stroke, round caps and joins, no fill. They are arrows, burst ticks and underlines that point at or emphasize something on the paper, and they draw on with a pathLength animation.

### Motion
One easing curve, cubic-bezier(0.23, 1, 0.32, 1), for every entrance, press and slip transition. Durations are short: 120-200ms for state changes, 300-700ms for entrances. Reduced motion collapses transitions to 1ms, shows the final claimed state, and replaces the tear with static stubs.

## Do's and Don'ts

### Do:
- **Do** put content on paper with torn zigzag edges (9px teeth for the main receipt, 7px for slips) and drop-shadows on a wrapper so the shadow follows the teeth.
- **Do** set every price, quantity, date and table line in JetBrains Mono with tabular numerals.
- **Do** set headlines on the table in Inter 700 teal ink with tight tracking (-0.03em to -0.035em) and a ch-based max width.
- **Do** keep tangerine for the visitor's own claims and share, the Coming soon status and the focus ring; use tangerine-text (#bf4810) whenever the accent is text.
- **Do** tint ambient shadows with teal ink (rgb 22 105 122) and pair them with a tight neutral contact shadow.
- **Do** separate ledger blocks with 2px dashed rule lines and mark tear lines with 2px dotted slate at 45%.
- **Do** annotate with ink doodle strokes (4px, round caps) that point at something real on the page.
- **Do** use the single strong ease-out curve and honor reduced motion with a finished, static state.

### Don't:
- **Don't** introduce generic rounded cards for content; this world's container is a paper slip with torn edges.
- **Don't** use tangerine for headlines, totals that are not the visitor's, large fills or decoration.
- **Don't** put white text on tangerine; the on-accent color is near-black (#0f0f12).
- **Don't** use PortionTitle for anything except the receipt's wordmark, or Spicy Rice for anything except the P mark.
- **Don't** add a dark theme; the world is white paper and line art on a pale ground.
- **Don't** use hard offset shadows or neutral grey ambient shadows.
- **Don't** use photos or illustrated faces for friends; people are initial chips.
