import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imperial-clp.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stucco, Plaster & Lath Contractor | Imperial Crown Lath & Plastering",
    template: "%s | Imperial Crown Lath & Plastering"
  },
  description: "Imperial Crown Lath & Plastering provides stucco, plaster, lath, re-stucco, repair and exterior finish services across Los Angeles, Orange, Riverside, San Bernardino and San Diego counties.",
  keywords: ["stucco contractor", "plaster contractor", "lath and plaster", "stucco repair", "re-stucco", "exterior plaster", "Southern California stucco"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Imperial Crown Lath & Plastering",
    title: "Imperial Crown Lath & Plastering | Stucco, Plaster & Lath Contractor",
    description: "20+ years of craftsmanship in stucco, plaster, lath, repairs, re-stucco and exterior finishes across Southern California.",
    images: [{ url: "/projects/project-11.png", width: 1200, height: 630, alt: "Imperial Crown exterior stucco and plaster project" }]
  },
  twitter: { card: "summary_large_image", title: "Imperial Crown Lath & Plastering", description: "Stucco, plaster and lath craftsmanship across Southern California.", images: ["/projects/project-11.png"] },
  robots: { index: true, follow: true }
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#business`,
  name: "Imperial Crown Lath & Plastering",
  alternateName: "Imperial Crown",
  url: siteUrl,
  logo: `${siteUrl}/brand/imperial-crown-logo.png`,
  image: `${siteUrl}/projects/project-11.png`,
  description: "Stucco, plaster, lath, re-stucco, repair and exterior finish contractor serving Southern California.",
  telephone: "+1-951-880-3103",
  sameAs: ["https://www.instagram.com/imperial_clp/"],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Los Angeles County, California" },
    { "@type": "AdministrativeArea", name: "Orange County, California" },
    { "@type": "AdministrativeArea", name: "Riverside County, California" },
    { "@type": "AdministrativeArea", name: "San Bernardino County, California" },
    { "@type": "AdministrativeArea", name: "San Diego County, California" }
  ],
  knowsAbout: ["Stucco", "Stucco repair", "Re-stucco", "Plastering", "Lath and plaster", "Exterior plaster", "Custom exterior finishes"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        {children}
      </body>
    </html>
  );
}
