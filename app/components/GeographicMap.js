'use client';
import {useEffect,useRef,useState} from 'react';
import countyShapes from './map-shapes.json';
const groups=[
 {slug:'los-angeles-county',label:'Los Angeles County',counties:['037'],color:'#52738c',point:[34.28,-118.15]},
 {slug:'san-diego-county',label:'San Diego County',counties:['073'],color:'#ae8b48',point:[33.10,-116.92]},
 {slug:'inland-empire',label:'Inland Empire',counties:['065','071'],color:'#788269',point:[34.07,-117.05],focus:[[33.35,-117.95],[34.45,-116.9]]},
];
function coordinates(d){return d.split('M').filter(Boolean).map(ring=>{const numbers=ring.match(/-?\d+(?:\.\d+)?/g).map(Number),points=[];for(let i=0;i<numbers.length;i+=2)points.push([35.85-numbers[i+1]/111,numbers[i]/88-119.05]);return points;});}
export default function GeographicMap({selected,onSelect}){
 const holder=useRef(null),engine=useRef(null),choose=useRef(onSelect);const [ready,setReady]=useState(false),[unavailable,setUnavailable]=useState(false);
 choose.current=onSelect;
 useEffect(()=>{
  let disposed=false,resize;const observer=new IntersectionObserver(async entries=>{
   if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();
   try{
    const module=await import('leaflet'),L=module.default||module;if(disposed)return;
    const map=L.map(holder.current,{scrollWheelZoom:false,zoomControl:true,attributionControl:true,minZoom:5,maxZoom:12,zoomSnap:.25,tapHold:false}).setView([34.1,-117.2],7);
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',updateWhenIdle:true,keepBuffer:1}).addTo(map);
    let failures=0;tiles.on('tileerror',()=>{if(++failures>3&&!disposed)setUnavailable(true);});tiles.on('tileload',()=>{if(!disposed)setUnavailable(false);});
    const layers={};const all=L.featureGroup();
    groups.forEach(group=>{
     const polygons=countyShapes.filter(c=>group.counties.includes(c.county)).map(c=>{
      const polygon=L.polygon(coordinates(c.d),{color:group.color,weight:1.7,fillColor:group.color,fillOpacity:.23,bubblingMouseEvents:false}).addTo(map);
      polygon.on('click',()=>choose.current(group.slug));
      const element=polygon.getElement();element.setAttribute('tabindex','0');element.setAttribute('role','button');element.setAttribute('aria-label',`Explore ${group.label}`);
      element.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose.current(group.slug);}});
      polygon.on('mouseover',()=>polygon.setStyle({fillOpacity:.38}));polygon.on('mouseout',()=>polygon.setStyle({fillOpacity:holder.current.dataset.region===group.slug?.40:.23}));
      return polygon;
     });
     layers[group.slug]=L.featureGroup(polygons);layers[group.slug].eachLayer(layer=>all.addLayer(layer));
     L.marker(group.point,{icon:L.divIcon({className:'region-map-label',html:`<span>${group.label}</span>`,iconSize:[140,36],iconAnchor:[70,18]}),keyboard:true,title:`Explore ${group.label}`}).addTo(map).on('click',()=>choose.current(group.slug));
    });
    const initial=all.getBounds();map.fitBounds(initial,{padding:[20,20]});
    map.on('zoomend',()=>{holder.current.dataset.zoom=String(map.getZoom());});
    engine.current={map,layers,initial};resize=new ResizeObserver(()=>map.invalidateSize({pan:false}));resize.observe(holder.current);setReady(true);
   }catch{if(!disposed)setUnavailable(true);}
  },{rootMargin:'200px'});observer.observe(holder.current);
  return()=>{disposed=true;observer.disconnect();resize?.disconnect();engine.current?.map.remove();engine.current=null;};
 },[]);
 useEffect(()=>{
  if(!ready||!engine.current)return;const {map,layers,initial}=engine.current;
  Object.entries(layers).forEach(([slug,group])=>group.eachLayer(layer=>{layer.setStyle({fillOpacity:selected===slug?.40:.23,weight:selected===slug?2.6:1.7});layer.getElement()?.setAttribute('aria-pressed',String(selected===slug));}));
  const animate=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bounds=selected?(groups.find(group=>group.slug===selected).focus||layers[selected].getBounds()):initial;
  map.flyToBounds(bounds,{padding:[26,26],maxZoom:9,duration:.9,animate});
 },[selected,ready]);
 return <div className="geographic-map-wrap" data-reveal>
  <div ref={holder} className="leaflet-region-map" data-region={selected||'all'} role="group" aria-label="Southern California street map with shaded service regions"/>
  {!ready&&<div className="map-opening" aria-hidden="true"><span>Southern California</span><small>Coast. Cities. Service regions.</small><i/></div>}
  {selected&&<button className="geographic-map-reset" onClick={()=>onSelect(null)}>View all regions</button>}
  {unavailable&&<p className="map-connection-note">Street tiles are unavailable. Region boundaries and links remain usable.</p>}
  <div className="map-legend">{groups.map(g=><button key={g.slug} onClick={()=>onSelect(g.slug)} aria-pressed={selected===g.slug}><i style={{background:g.color}}/>{g.label}</button>)}</div>
  <small className="map-caption">Select a shaded region to zoom in · U.S. Census boundaries</small>
 </div>;
}

