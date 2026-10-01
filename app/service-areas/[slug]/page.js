import Link from "next/link";
import { notFound } from "next/navigation";
import SiteCursor from "../../SiteCursor";

const areas = {"los-angeles-county": {"name": "Los Angeles County", "region": "Los Angeles County", "intro": "Lath, plaster and stucco craftsmanship for residential and commercial properties throughout Los Angeles County.", "cities": ["Los Angeles", "Long Beach", "Glendale", "Pasadena", "Burbank", "Santa Clarita", "Torrance", "Downey", "Whittier", "Pomona", "West Covina", "Lancaster"]}, "san-diego-county": {"name": "San Diego County", "region": "San Diego County", "intro": "Professional stucco, lath, plaster, repair and exterior finish work for projects throughout San Diego County.", "cities": ["San Diego", "Chula Vista", "Oceanside", "Escondido", "Carlsbad", "El Cajon", "Vista", "San Marcos", "Encinitas", "La Mesa", "National City", "Poway"]}, "riverside-county": {"name": "Riverside County", "region": "Riverside County and the Inland Empire", "intro": "Experienced lath, plaster and stucco services for homes, remodels and commercial properties throughout Riverside County.", "cities": ["Riverside", "Corona", "Moreno Valley", "Temecula", "Murrieta", "Menifee", "Perris", "Lake Elsinore", "Hemet", "Jurupa Valley", "Eastvale", "Beaumont"]}, "san-bernardino-county": {"name": "San Bernardino County", "region": "San Bernardino County and the Inland Empire", "intro": "Exterior plaster, stucco, lath and repair craftsmanship serving communities throughout San Bernardino County.", "cities": ["San Bernardino", "Fontana", "Rancho Cucamonga", "Ontario", "Chino", "Chino Hills", "Redlands", "Rialto", "Upland", "Victorville", "Highland", "Yucaipa"]}, "orange-county": {"name": "Orange County", "region": "Orange County", "intro": "Premium stucco, lath and plaster craftsmanship for remodels, repairs and exterior transformations throughout Orange County.", "cities": ["Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Garden Grove", "Orange", "Fullerton", "Costa Mesa", "Mission Viejo", "Yorba Linda", "Tustin", "Lake Forest"]}};

export function generateStaticParams() {
  return Object.keys(areas).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const area = areas[params.slug];
  if (!area) return {};
  return {
    title: `Stucco & Plaster Contractor in ${area.name}`,
    description: `Looking for stucco, plaster, lath, re-stucco or repair services in ${area.name}? Imperial Crown brings 20+ years of exterior craftsmanship to Southern California projects.`,
    alternates: { canonical: `/service-areas/${params.slug}` },
    openGraph: { title: `Stucco & Plaster Contractor in ${area.name} | Imperial Crown`, description: area.intro }
  };
}

export default function ServiceAreaPage({ params }) {
  const area = areas[params.slug];
  if (!area) notFound();

  return (
    <main className="area-page">
      <SiteCursor />
      <header className="area-page-header">
        <Link href="/" className="area-brand"><img src="/brand/imperial-crown-logo.png" alt="Imperial Crown Lath and Plastering" /></Link>
        <Link href="/#contact" className="btn btn-gold">Request an Estimate</Link>
      </header>

      <section className="area-hero">
        <div className="section-kicker">IMPERIAL CROWN · {area.name.toUpperCase()}</div>
        <h1>Stucco, plaster and lath contractor serving {area.name}.</h1>
          <div className="license-inline area-license">CSLB License #1161215</div>
        <p>{area.intro} Every project is approached with an emphasis on preparation, durable execution and a clean finished appearance.</p>
        <div className="area-actions">
          <a href="tel:+19518803103" className="btn btn-gold">Call Diego: (951) 880-3103</a>
          <a href="tel:+19514250490" className="btn btn-ghost">Call Isaiah: (951) 425-0490</a>
        </div>
      </section>

      <section className="area-page-section">
        <div>
          <div className="section-kicker">LOCAL EXTERIOR CRAFTSMANSHIP</div>
          <h2>20+ years of hands-on experience.</h2>
        </div>
        <p>Imperial Crown works on exterior remodels, stucco and plaster repairs, re-stucco projects, additions, custom finishes and lath-and-plaster scopes throughout {area.region}. The focus is on work that performs properly and looks intentional when complete.</p>
      </section>

      <section className="area-page-services">
        {["Lath & Plaster","Stucco & Re-Stucco","Repairs & Patching","Additions & Remodels","Custom Exterior Finishes","Outdoor Living Surfaces"].map((s,i)=>(
          <div key={s}><small>{String(i+1).padStart(2,"0")}</small><h3>{s}</h3></div>
        ))}
      </section>

      <section className="area-cities">
        <div className="section-kicker">COMMUNITIES WE SERVE</div>
        <h2>Serving {area.name} and surrounding communities.</h2>
        <div className="city-list">{area.cities.map(city=><span key={city}>{city}</span>)}</div>
        <p>Don't see your city listed? Service is not limited to the communities above. Contact Imperial Crown to confirm availability for your project.</p>
      </section>

      <section className="area-final">
        <div><div className="section-kicker">START YOUR PROJECT</div><h2>Talk directly with Imperial Crown.</h2></div>
        <Link href="/#contact" className="btn btn-gold">Request an Estimate</Link>
      </section>
    </main>
  );
}