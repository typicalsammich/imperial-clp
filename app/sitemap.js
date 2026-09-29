export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.socalplastering.com";
  const areas = ["los-angeles-county","san-diego-county","riverside-county","san-bernardino-county","orange-county"];
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...areas.map(slug => ({ url: `${base}/service-areas/${slug}`, changeFrequency: "monthly", priority: 0.8 }))
  ];
}
