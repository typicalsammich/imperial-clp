# Imperial Crown Lath & Plastering

Custom Next.js website with 28 content pages, original reversible scroll-controlled cinematic keyframes, portrait mobile film, real project photography, selectable Before/After photographs and a real OpenStreetMap basemap with zoomable Census service-region overlays. Original Downloads project untouched; Google Search Console verification preserved.

## Run and deploy
Node 20.9+ required. Run npm ci, npm run dev. Production: npm run build, npm start. Current preview: http://localhost:3006. Keep the existing Vercel Next.js configuration, domain and default output directory. If uploading the parent repository set Root Directory to imperial-crown. The vulnerable source Next 14 was upgraded to patched Next 15.5.24 / React 19; dependency audit found zero vulnerabilities. No public deployment has been performed.

## Email delivery: configuration required
Destination: Imperialcrowniceja@gmail.com. Set CONTACT_EMAIL to that address, RESEND_API_KEY privately and FROM_EMAIL to a Resend-verified sending address in .env.local and Vercel. Never paste keys into chat. Redeploy and confirm delivery with a controlled inquiry. No key or verified sender was provided; delivery remains inactive. The form honestly displays both call options when unavailable. Before public launch, enable Vercel firewall/rate limiting on /api/contact. Honeypot, origin checks, input limits and validation are implemented.

## Editing
app/data.js holds business details, service/city copy and canonical domain. app/components/cinematic/assets.js configures assets and chapters. DesktopScrollExperience handles the pinned canvas and reversible timeline; DeviceCapabilityDetector selects delivery before heavy media. MobileCinematicExperience provides normal scrolling, portrait autoplay and immediate autoplay and pause/replay. ReducedMotionHero is the static fallback. All source photographs remain in public/projects, with responsive WebP derivatives. public/brand/logo-hd.png is the restored transparent logo; the original is preserved.

No fabricated testimonials or project totals. Business should confirm city service availability before launch, including legacy county routes preserved from the source. Metadata, breadcrumbs, service/contractor schema, sitemap, robots and crawlable navigation are included.

## Cinematic provenance and limitation
Built-in image generation with reference-based edits established one property, worker, wardrobe and lighting environment. Seven landscape masters in assets/masters are 1672x941; portrait masters are 941x1672. Delivery widths: 960,1280,1672. The portrait H.264 film is 540x960, 30 seconds at 60 fps (30 fps for constrained connections). It is rendered from the exact seven desktop master shots and the shared timeline, with portrait camera targets that keep the worker and tools visible. The desktop presentation uses scroll-linked keyframes, camera movement and transitions. It is not continuous live-action or native 4K source footage. The available generator returned 1672-pixel images even when 4K was requested. No asset was upscaled and labelled 4K. Replace masters with approved 4K filming for native 4K commercial fidelity; the modular player is ready. Generated imagery illustrates the craft; the project gallery uses the business's real photographs.

## Verification
node scripts/verify-capabilities.cjs checks capability selection. With the server running, node scripts/verify-routes.cjs checks every content route (TEST_URL overrides port). node scripts/lighthouse.cjs measures separate desktop/mobile profiles against localhost:3006 and saves reports in output/qa. QA.md records actual checks and limits. Browser emulation does not certify physical iPhone/Safari or hardware trackpad behavior.

Self-hosted Libre Caslon Display uses SIL OFL. County boundaries: US Census TIGER. Aerial imagery: Esri World Imagery. Street tiles: OpenStreetMap, attributed on the map and fetched only when it approaches the viewport. No bulk tile download or offline prefetch is used. No restaurant assets, branding or visual identity copied.


Homepage visits, reloads and Back/Forward restores restart the cinema. Versioned v3 URLs and bounded reload retries avoid stale-media failures. ImageBitmap decoding falls back to native image decoding; a later missing frame no longer removes the entire cinematic. Only reduced-motion selects a static hero. Constrained devices receive smaller cinematic assets. The mobile source is public/cinematic/v3/mobile-story-v3.mp4; regenerate with npm run media:mobile. Fractional canvas transforms avoid crop stepping, and shared focal points align dissolves. Yellow stucco is After; white stucco is Before. Photo frames follow each picture's aspect ratio without padded gutters. Native SVG pointers replace the trailing gold dot. Crown PNG/ICO routes use fresh v3 metadata URLs.

This source package must be deployed to update socalplastering.com. Local browser checks cannot reproduce the user's separate Chrome profile or its extensions.
