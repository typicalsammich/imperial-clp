# Imperial Crown Lath & Plastering

Premium one-page Next.js website built around the supplied project photos.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Upload this folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: **Next.js**
4. Build command: default (`npm run build`)
5. Output Directory: leave blank / Override OFF
6. Add the environment variables below.

## Make the contact form send email

The form already posts to `/api/contact` and is wired for Resend.

Create a free Resend account and add these environment variables in Vercel:

- `RESEND_API_KEY`
- `CONTACT_EMAIL` — the email address that should receive new leads
- `FROM_EMAIL` — optional; use a verified sending address once the domain is connected

An example is included in `.env.example`.

## Phone numbers

- (951) 880-3103
- (951) 425-0490

## Instagram

https://www.instagram.com/imperial_clp/