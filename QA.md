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
| Mobile simulated slow connection |94|100|100|100|3.0s|50ms|0|

Reports and screenshots are in output/qa. These are actual local production audits, not guarantees of deployed network performance. Desktop uses a40ms/10Mbps connection and1x CPU. Mobile uses Lighthouse's standard simulation. The remaining mobile cost comes from the framework and cinematic payload. Native desktop source resolution is1672x941, not4K.

## Launch conditions

Add private RESEND_API_KEY and verified FROM_EMAIL, configure CONTACT_EMAIL=Imperialcrowniceja@gmail.com, confirm receipt after deployment, set Vercel endpoint abuse controls, and have the business approve final service availability/content. Generated cinema is illustrative; real project gallery photographs come from the source business website/project. No fabricated reviews included.

## Version 3 revision checks

Desktop forward scrolling reached .40; reverse scrolling returned .20; warm reload reset to .00 with all seven frames ready. Mobile starts autoplay immediately after initialization without the former page-load delay. Repeated mobile reload starts playback again. The portrait film is 30 seconds at 60 fps, 2.76 MB, with fractional camera movement and shared transition focal points. Constrained connections use a 30 fps encode. Browser viewport checks covered 375, 390, 430, 768, 1024, 1366, 1440 and 1920 pixels; no horizontal overflow. Settled 1024px fine-pointer landscape correctly switches to desktop canvas. Physical mobile Safari and hardware trackpad feel are not certified by emulation.

White hillside image is Before; yellow is After. Each photo gets its own unpadded frame with preserved aspect ratio. The hero, photo controls, aerial tiles and San Diego zoom were visually inspected; screenshots are saved in output/qa. Esri aerial tiles loaded at zoom 9, with county shading and provider attribution. Streets toggle works.

Loader checks exercise HTTP 404, abort, ImageBitmap decoder failure followed by native decode, and a transient 503 followed by a successful retry. Capabilities cover reduced motion and smaller cinematic delivery for data saver / low memory. All 28 content routes, schema, canonical metadata, sitemap, robots and preserved Google verification pass. The form honestly returns 503 until email credentials are configured.

PNG/ICO crown assets are provided through Next app routes and fresh v3 metadata URLs. The separate user Chrome profile and its cache/extensions are unavailable to this automation, so the production-only symptom is hardened against but not independently reproduced in that profile. Public production requires deployment of this package.
