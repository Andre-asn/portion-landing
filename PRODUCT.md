# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Friends eating out together who need to split a restaurant bill at the end of the meal: usually at the table, phone in hand, with one person holding the receipt. The landing page visitor is someone curious about the app before it launches.

## Product Purpose
Portion is a mobile app (Flutter + Supabase, in development) that makes splitting a restaurant bill fast and painless. One person photographs the receipt, friends join the table, and everyone claims what they ordered. The landing page at portion.lol exists to build awareness ahead of launch. There is no waitlist or download yet; the primary CTA stays "Coming Soon" and the secondary path is the Dev Blog.

## Positioning
- **Receipt photo, no typing.** OCR (Mistral) reads the receipt and lists every item; nobody enters line items by hand.
- **Everyone claims live.** Friends join the same table and tap their own items in real time, including partial quantities (1 of 3 sodas).
- **Tax and tip handled.** Each person's share of tax and tip is calculated automatically.

## Operating Context
Used at a restaurant table at the end of a meal, often in a group, on phones. Core app concepts: Tables (a live shared bill), Buddies (friend list), receipt scanning, claiming items.

## Capabilities and Constraints
- Site stack: Vite + React 19 + TypeScript, Tailwind CSS v4, framer-motion, phosphor-react, React Router; deployed on Vercel.
- Routes: `/` (landing), `/blog` (dev blog, built by a solo student developer), `/verification` (email verification landing for the app).
- Undecided: launch date, app store availability, pricing, payment integration. Do not claim any of these.

## Brand Commitments
- Name "Portion", domain portion.lol, the "P" mark set in Spicy Rice, and the "PORTION" wordmark set in the custom PortionTitle font (good-doce).
- Hand-drawn doodle illustration style (strokes in the existing site) is part of the identity the user wants to keep.
- The user's redesign in commit a06cf45 is liked; this round evolves that look rather than replacing it.
- Accent colors must come from the user's Figma design system: https://www.figma.com/design/psXZ9yd8UAuOKm6NXeSIZk/Portion-Design-System?node-id=31-2
- Voice: casual, friendly, short ("Settle up in seconds.", "Snap & split.").

## Evidence on Hand
- App screenshots: `public/screenshot-1.png` … `screenshot-3.png`; feature imagery `public/img_1.jpg`, `img_2.png`, `img_3.jpg`.
- Illustrations: `public/hero_image_1.png`, `hero_image.png`, `hero-illustration.svg`, `finger_pointing.png`, `receipt.png` / `receipt.svg`.
- Dev blog posts with real app screenshots in `public/blog/`.
- No users, testimonials, ratings, download counts, or press exist. Do not fabricate any.

## Product Principles
1. The receipt is the hero: show the photo-to-split flow, not abstract finance imagery.
2. Fun, not fintech: the app is about friends at a meal, not money management.
3. Honest about being pre-launch: no fake social proof, no fake store badges.
4. Speed is the promise: everything should feel instant and effortless.
