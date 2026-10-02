# Verification record — 2 October 2026

Production build passed on Next 15.5.24. npm audit: zero vulnerabilities. All 28 sitemap content URLs return 200 with one H1, unique descriptions/canonicals and structured data. Google verification and robots return 200. Invalid form input returns 400; absent delivery credentials return 503 with clear phone fallback. No email was sent.

## Rendered browser checks

1920x1080, 1440x900,1366x768,1024 landscape,768 tablet,430,390 and375 mobile widths were inspected in the in-app Chromium browser. No horizontal overflow observed. Device mode switched correctly when resizing desktop to mobile and back. Additional 844x390 orientation check retained normal mobile playback/scrolling and had no overflow.

Desktop: opening poster/canvas, forward progress, backward progress, rapid wheel/key input, idle frame, skip link and sticky hero release inspected. Final material close-up and branding reviewed. Mobile: portrait autoplay, pause/replay, normal scrolling, sticky estimate CTA and menu expand/collapse/Escape inspected. Services dropdown navigation and city pages checked. The San Diego map region zoom and Carlsbad link were exercised. Before/After buttons and selection of another real project were exercised. Form submission displayed the expected delivery-unavailable status and retained entered data.

## Automated checks

verify-capabilities.cjs:10 cases cover fine/coarse input, screen dimensions, reduced motion, connection/data saver and low memory.
verify-media.cjs:21 responsive encodings, transparent logo alpha, actual HTTP404 handling, aborted request and injected decode failure passed.
verify-routes.cjs:28 content routes and form/verification checks passed.

Reduced-motion selection was tested programmatically; OS/browser preference switching was not available in the browser tool. Media failure rejection was tested at the preloader boundary; a full rendered network-blocking scenario was not available. No physical hardware trackpad, iPhone/Safari or Android certification is claimed. Confirm on physical devices before public launch.

## Lighthouse final local production measurements

| Profile | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | ---: |
| Desktop1440x900 |100|100|100|100|0.7s|0ms|0|
| Mobile simulated slow connection |97|100|100|100|2.6s|40ms|0|

Reports and screenshots are in output/qa. These are actual local production audits, not guarantees of deployed network performance. Desktop uses a40ms/10Mbps connection and1x CPU. Mobile uses Lighthouse's standard simulation. The remaining mobile cost comes from the framework and cinematic payload. Native desktop source resolution is1672x941, not4K.

## Launch conditions

Add private RESEND_API_KEY and verified FROM_EMAIL, configure CONTACT_EMAIL=Imperialcrowniceja@gmail.com, confirm receipt after deployment, set Vercel endpoint abuse controls, and have the business approve final service availability/content. Generated cinema is illustrative; real project gallery photographs come from the source business website/project. No fabricated reviews included.

## Requested revision checks

Homepage reload at scroll progress .40 reset scroll top and progress to zero. Navigation away and browser Back likewise returned to the opening. Mobile reload returned to the opening; the 32-second movie autoplays all seven desktop shots and eight chapter texts. Playback completed on its final branding frame, replay worked, and ordinary page scrolling at375px left playback running (time14s) with sticky CTA visible. Width390px showed preparation and finished reveal without overflow.

The gallery starts with yellow stucco labelled Before. Clicking After selects the neutral stucco image. New versioned favicon URLs are in rendered metadata and both icon assets return200. The ICO includes16/32/48/64 sizes.

Map uses real OpenStreetMap street tiles and separate blue/gold/charcoal geographic regions. Tiles loaded successfully. Clicking the shaded San Diego polygon selected the corresponding city links and zoomed desktop from7.25 to9. Mobile region controls and reset worked without horizontal overflow. Basemap attribution remains visible. The map is imported only near the viewport.

All three desktop region targets verified: overview zoom7.25, Los Angeles8, San Diego9, Inland Empire8.75. Inland Empire centers on Riverside/Temecula/Rancho Cucamonga communities rather than the distant desert county extent.
