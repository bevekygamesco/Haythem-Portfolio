'use client';
import {useEffect,useRef} from 'react';
export default function CinematicHero({children}:{children:React.ReactNode}){
const ref=useRef<HTMLDivElement>(null);
useEffect(()=>{const root=ref.current!;if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;let frame=0;
const update=()=>{frame=0;const rect=root.getBoundingClientRect(),pin=root.querySelector<HTMLElement>('.hero-pin')!;const range=Math.max(1,root.offsetHeight-pin.offsetHeight),progress=Math.max(0,Math.min(1,-rect.top/range));root.style.setProperty('--hero-progress',progress.toFixed(4));root.style.setProperty('--hero-scale',String(1-progress*.065));root.style.setProperty('--hero-tilt',`${progress*5}deg`);root.style.setProperty('--hero-round',`${18+progress*26}px`);root.style.setProperty('--portal-glow',String(Math.sin(progress*Math.PI)*.5));};
const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
},[]);
return <div ref={ref} className="hero-scroll-stage"><div className="hero-pin">{children}<div className="portal-overlay" aria-hidden="true"><i/><i/><span/></div></div></div>;
}
