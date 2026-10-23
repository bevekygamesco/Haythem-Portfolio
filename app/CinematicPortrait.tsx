'use client';
import {useEffect,useRef} from 'react';
const FRAME_COUNT=23,NEUTRAL=10;
export default function CinematicPortrait({onProgress}:{onProgress:(progress:number)=>void}){
const canvasRef=useRef<HTMLCanvasElement>(null),progressCallback=useRef(onProgress);
progressCallback.current=onProgress;
useEffect(()=>{
const canvas=canvasRef.current!,ctx=canvas.getContext('2d',{alpha:false});if(!ctx){progressCallback.current(1);return;}
const mobile=matchMedia('(max-width:700px)').matches,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const frames:Array<HTMLImageElement|undefined>=new Array(FRAME_COUNT);let disposed=false,frame=0,visible=true,target=.5,position=.5,last=0,lastDraw=-100,loaded=0;
const folder=mobile?'mobile':'desktop',width=mobile?360:720,height=mobile?640:1280;
canvas.width=width;canvas.height=height;
function paint(at:number){if(!ctx)return;const lower=Math.floor(at),upper=Math.min(FRAME_COUNT-1,lower+1),mix=at-lower;const a=frames[lower]??frames[NEUTRAL],b=frames[upper]??a;if(!a)return;ctx.globalAlpha=1;ctx.drawImage(a,0,0,width,height);if(b&&mix>.001){ctx.globalAlpha=mix;ctx.drawImage(b,0,0,width,height);ctx.globalAlpha=1;}canvas.classList.add('is-ready');canvas.dataset.gazeFrame=at.toFixed(2);}
const load=async(index:number)=>{if(disposed)return;const img=new Image();img.decoding='async';img.src=`/hero/${folder}/frame-${String(index+1).padStart(2,'0')}.webp`;try{await img.decode();if(disposed)return;frames[index]=img;if(index===NEUTRAL)paint(NEUTRAL);}catch{/* Poster remains available if a frame cannot load. */}if(!disposed){loaded++;progressCallback.current(loaded/FRAME_COUNT);}};
async function prepare(){await load(NEUTRAL);const order=Array.from({length:FRAME_COUNT},(_,i)=>i).filter(i=>i!==NEUTRAL);let next=0;await Promise.all(Array.from({length:4},async()=>{while(next<order.length&&!disposed){const index=order[next++];await load(index);}}));if(!disposed){lastDraw=-100;progressCallback.current(1);}}
void prepare();
const hero=canvas.closest('.reference-hero')!;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)lastDraw=-100;});observer.observe(hero);
const move=(event:PointerEvent)=>{if(reduced||event.pointerType==='touch'||!visible)return;const rect=hero.getBoundingClientRect();if(event.clientY<rect.top||event.clientY>rect.bottom){target=.5;return;}const photo=canvas.getBoundingClientRect(),center=photo.left+photo.width*.5;target=Math.max(0,Math.min(1,.5+(event.clientX-center)/(innerWidth*.8)));};
let releaseTimer:ReturnType<typeof setTimeout>|undefined;let touch:{id:number;x:number;y:number;axis:'pending'|'horizontal'|'vertical'}|null=null;
const report=(value:number,engaged:boolean)=>{window.dispatchEvent(new CustomEvent('portfolio:gaze-progress',{detail:{value,engaged}}));hero.toggleAttribute('data-gaze-interacting',engaged);};
const guide=(value:number)=>{if(reduced||!visible||!Number.isFinite(value))return;clearTimeout(releaseTimer);target=Math.max(0,Math.min(1,value));report(target,true);};
const release=()=>{clearTimeout(releaseTimer);releaseTimer=setTimeout(()=>{target=.5;report(.5,false);},850);};
const guideEvent=(event:Event)=>guide((event as CustomEvent<number>).detail);
const point=(x:number)=>{const r=canvas.getBoundingClientRect();return Math.max(0,Math.min(1,(x-r.left)/Math.max(1,r.width)));};
const down=(event:PointerEvent)=>{if(event.pointerType!=='touch'||reduced||!visible)return;const element=event.target as HTMLElement;if(element.closest('a,button,input,select,textarea'))return;const r=canvas.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)return;clearTimeout(releaseTimer);touch={id:event.pointerId,x:event.clientX,y:event.clientY,axis:'pending'};};
const touchMove=(event:PointerEvent)=>{if(!touch||event.pointerId!==touch.id)return;const dx=Math.abs(event.clientX-touch.x),dy=Math.abs(event.clientY-touch.y);if(touch.axis==='pending'&&Math.max(dx,dy)>8)touch.axis=dx>dy*1.2?'horizontal':'vertical';if(touch.axis==='horizontal')guide(point(event.clientX));};
const up=(event:PointerEvent)=>{if(!touch||event.pointerId!==touch.id)return;if(touch.axis==='pending')guide(point(event.clientX));if(touch.axis!=='vertical')release();touch=null;};
const cancel=()=>{touch=null;target=.5;report(.5,false);clearTimeout(releaseTimer);};
const reset=()=>{target=.5;};window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerdown',down,{passive:true});window.addEventListener('pointermove',touchMove,{passive:true});window.addEventListener('pointerup',up,{passive:true});window.addEventListener('pointercancel',cancel,{passive:true});window.addEventListener('portfolio:gaze',guideEvent);window.addEventListener('portfolio:gaze-release',release);document.documentElement.addEventListener('pointerleave',reset);
const animate=(now:number)=>{frame=requestAnimationFrame(animate);const dt=last?Math.min(now-last,50):16;last=now;if(!visible||document.hidden)return;position=reduced ? .5 : position+(target-position)*(1-Math.exp(-dt/85));const at=position<=.5?position*2*NEUTRAL:NEUTRAL+(position-.5)*2*(FRAME_COUNT-1-NEUTRAL);if(Math.abs(at-lastDraw)>.008||lastDraw===-100){paint(at);lastDraw=at;}};frame=requestAnimationFrame(animate);
return()=>{disposed=true;clearTimeout(releaseTimer);window.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',touchMove);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cancel);window.removeEventListener('portfolio:gaze',guideEvent);window.removeEventListener('portfolio:gaze-release',release);cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',reset);frames.fill(undefined);};
},[]);
return <div className="cinematic-portrait"><img className="portrait-poster" src="/hero/poster.webp" alt="Haythem Ben Haddada wearing blue neon eyewear" width="720" height="1280" fetchPriority="high"/><canvas ref={canvasRef} className="portrait-canvas" aria-hidden="true"/></div>;
}
