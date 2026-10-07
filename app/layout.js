import 'leaflet/dist/leaflet.css';
import './globals.css';
import {Header,Footer,SiteEffects} from './components/SiteChrome';
import {siteUrl} from './data';
export const metadata={metadataBase:new URL(siteUrl),title:{default:'Imperial Crown Lath & Plastering',template:'%s | Imperial Crown Lath & Plastering'},description:'20+ years of Southern California stucco, plaster and lath experience. CA License #1161215.',openGraph:{type:'website',siteName:'Imperial Crown Lath & Plastering'},icons:{icon:[{url:'/icon.png?v=3',type:'image/png',sizes:'64x64'},{url:'/favicon.ico?v=3',sizes:'any'}],shortcut:'/favicon.ico?v=3',apple:'/apple-icon.png?v=3'},robots:{index:true,follow:true}};
const schema={'@context':'https://schema.org','@type':'HomeAndConstructionBusiness','@id':`${siteUrl}/#business`,name:'Imperial Crown Lath & Plastering',url:siteUrl,logo:`${siteUrl}/brand/logo-hd.png`,image:`${siteUrl}/projects/project-11.webp`,telephone:'+1-951-425-0490',sameAs:['https://www.instagram.com/imperial_clp/'],areaServed:['Los Angeles County','San Diego County','Inland Empire'].map(name=>({'@type':'AdministrativeArea',name})),identifier:{'@type':'PropertyValue',propertyID:'California Contractor License',value:'1161215'}};
export default function RootLayout({children}){return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Header/>{children}<Footer/><SiteEffects/></body></html>;}


