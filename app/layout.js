import "./globals.css";

export const metadata = {
  title: "Imperial Crown Lath & Plastering | Premium Stucco & Plaster Craftsmanship",
  description:
    "Imperial Crown Lath & Plastering delivers refined stucco, lath, plaster, repairs and exterior finish work backed by 20 years of experience.",
  openGraph: {
    title: "Imperial Crown Lath & Plastering",
    description: "20 years of craftsmanship in lath, plaster, stucco and exterior finishes."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}