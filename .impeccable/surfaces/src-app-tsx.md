---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Landing page (/)

Scope: portion.lol home route. Mode: Persuade (build awareness pre-launch; primary status "Coming soon", action = read the Dev Blog).
Audience: friends who split restaurant bills; curious visitors before launch.
Constraints: evolve the incumbent look (teal PortionTitle wordmark, Spicy Rice P, hand-drawn line doodles and line illustrations), accent from Figma design system (#ff7733, pressed #e85d1a, accent text #bf4810, subtle #fff4ec, text on accent #0f0f12). No fake proof, no store badges. App screens exported from Figma into public/screens/.

## Direction contract

THESIS: The page is one long restaurant receipt that gets split in front of you. It refuses the category default of a split hero with a phone mockup and three feature cards.

OWN-WORLD: Pale teal table ground (#e3f0f2), white thermal-receipt paper with a zigzag torn top and dashed rules, JetBrains Mono for line items and prices, PortionTitle wordmark in deep teal #16697a, Inter for prose. Friends appear as Figma avatar chips (AS orange, PK blue, LO mint, MR lavender). Orange #ff7733 only for claims, the primary status and totals. Teal ink line doodles annotate the paper like pen marks.

STORY: Visitor sees a real receipt being claimed line by line, understands "snap, tap what you had, tax and tip split", scrolls to watch the receipt tear into one stub per person, sees the real app screens doing each step, then reads the dev blog.

FIRST VIEWPORT: Left column (about 30%): headline "Snap the receipt. Everyone taps what they had." and one sentence. Center: the receipt at large scale, headed PORTION + "Settle up in seconds.", six claimable lines, subtotal/tax/tip/total, and the footer row with the Coming soon status and Dev Blog link. Right: live claim tags with doodle arrows. Signature interaction: avatars claim lines in sequence on load; hovering/tapping a line cycles who claimed it and totals update. On scroll the perforation tears and four stubs fan out with each person's share.

FORM: Receipt tape (grounded list position 4 of 7), seed key cdb42b15.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
