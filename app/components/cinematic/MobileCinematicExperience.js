'use client';
import {useEffect,useRef,useState} from 'react';
import {cinematicAssets,chapters} from './assets';
export default function MobileCinematicExperience(){
 const video=useRef(null),section=useRef(null);const [source,setSource]=useState(),[paused,setPaused]=useState(true),[failed,setFailed]=useState(false),[chapter,setChapter]=useState(0);
 useEffect(()=>{
  let timer;const start=()=>{timer=setTimeout(()=>setSource(cinematicAssets.mobileVideo),650);};
  if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
  return()=>{clearTimeout(timer);window.removeEventListener('load',start);};
 },[]);
 const progress=()=>{const media=video.current;if(!media?.duration)return;const p=media.currentTime/media.duration;section.current.dataset.progress=p.toFixed(4);setChapter(chapters.reduce((previous,c,i)=>p>=c.at?i:previous,0));};
 const play=()=>{const media=video.current;if(!media)return;if(media.ended){media.currentTime=0;setChapter(0);}media.play().catch(()=>setPaused(true));};
 const scene=chapters[failed?7:chapter],final=failed||chapter===7;
 return <section ref={section} className="cinematic mobile-cinematic" id="cinematic" aria-label="Automatic exterior transformation film">
  <h1 className="sr-only">Imperial Crown Lath &amp; Plastering · Southern California</h1>
  <div className="mobile-media"><img src={failed?cinematicAssets.mobileStaticPoster:cinematicAssets.mobilePoster} width="540" height="960" alt="The same Southern California property at the start of its exterior transformation" fetchPriority="high"/>{!failed&&<video ref={video} src={source} poster={cinematicAssets.mobilePoster} autoPlay muted playsInline preload="metadata" onLoadedData={play} onTimeUpdate={progress} onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} onError={()=>setFailed(true)} onEnded={()=>{setPaused(true);setChapter(7);}}/>}<div className="cinematic-shade"/></div>
  <div className={`mobile-story-copy ${final?'mobile-story-final':''}`}>
   <p className="eyebrow">{final?'Lath & Plastering':`0${chapter+1} / ${scene.label}`}</p>
   {final?<h2>IMPERIAL<br/>CROWN</h2>:<h2>{scene.line}</h2>}<p>{scene.sub}</p>
   {final&&<><div className="hero-actions"><a className="button" href="/contact">Request an estimate</a><a className="mobile-work-link" href="/our-work">View our work</a></div><small>CA License #1161215</small></>}
  </div>
  {!failed&&<><button className="motion-control" onClick={()=>paused?play():video.current.pause()}>{paused?'Play film':'Pause film'}</button>{!final&&<button className="film-skip" onClick={()=>{if(video.current?.duration){video.current.currentTime=video.current.duration-.05;setChapter(7);}}}>Skip to reveal</button>}</>}
 </section>;
}

