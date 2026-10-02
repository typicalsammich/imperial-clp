import {services,areas,siteUrl} from './data';
export default function sitemap(){return ['','/services','/our-work','/service-areas','/about','/contact','/privacy',...services.map(s=>`/services/${s.slug}`),...areas.map(a=>`/service-areas/${a.slug}`)].map(path=>({url:siteUrl+path,changeFrequency:'monthly',priority:path===''?1:path.split('/').length>2?.7:.8}));}
