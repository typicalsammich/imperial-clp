'use client';
import {useCallback,useEffect,useState} from 'react';
import {detectCapabilities} from './DeviceCapabilityDetector';
import DesktopScrollExperience from './DesktopScrollExperience';
import MobileCinematicExperience from './MobileCinematicExperience';
import ReducedMotionHero from './ReducedMotionHero';

export default function CinematicHero(){
 const [capability,setCapability]=useState(null),[failed,setFailed]=useState(false),[visit,setVisit]=useState(0);
 const failure=useCallback(()=>setFailed(true),[]);
 useEffect(()=>{
  let timer,resetFrame;const previous=history.scrollRestoration;history.scrollRestoration='manual';
  const restart=()=>{window.scrollTo({top:0,left:0,behavior:'instant'});setFailed(false);setCapability(detectCapabilities());setVisit(v=>v+1);};
  restart();resetFrame=requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
  const restored=e=>{if(e.persisted)restart();};window.addEventListener('pageshow',restored);
  const update=()=>{clearTimeout(timer);timer=setTimeout(()=>setCapability(detectCapabilities()),150);};
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),pointer=matchMedia('(pointer:fine) and (hover:hover)');
  window.addEventListener('resize',update);motion.addEventListener('change',update);pointer.addEventListener('change',update);navigator.connection?.addEventListener('change',update);
  return()=>{clearTimeout(timer);cancelAnimationFrame(resetFrame);history.scrollRestoration=previous;window.removeEventListener('pageshow',restored);window.removeEventListener('resize',update);motion.removeEventListener('change',update);pointer.removeEventListener('change',update);navigator.connection?.removeEventListener('change',update);};
 },[]);
 if(!capability)return <div className="hero-initial"><ReducedMotionHero opening/><noscript><style>{'.hero-initial .static-copy{opacity:1!important}.hero-initial{height:auto!important}'}</style></noscript></div>;
 if(failed||capability.mode==='static')return <ReducedMotionHero/>;
 return capability.mode==='desktop'?<DesktopScrollExperience key={visit} quality={capability.quality} onFailure={failure}/>:<MobileCinematicExperience key={visit}/>;
}

