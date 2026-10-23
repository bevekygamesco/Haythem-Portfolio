'use client';
import {useEffect} from 'react';
export function useReactiveSurfaces(dependency:unknown){
 useEffect(()=>{
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const cards=Array.from(document.querySelectorAll<HTMLElement>('.ref-feature,.real-project,.motion-photo'));
  const cleanups=cards.map(card=>{
   let x=0,y=0,tx=0,ty=0,frame=0,over=false;
   const animate=()=>{x+=(tx-x)*.13;y+=(ty-y)*.13;card.style.setProperty('--rx',`${-y*5}deg`);card.style.setProperty('--ry',`${x*7}deg`);card.style.setProperty('--lift',over?'-7px':'0px');card.style.setProperty('--mx',`${50+x*50}%`);card.style.setProperty('--my',`${50+y*50}%`);if(Math.abs(tx-x)+Math.abs(ty-y)>.002)frame=requestAnimationFrame(animate);else frame=0;};
   const schedule=()=>{if(!frame)frame=requestAnimationFrame(animate);};
   const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;const r=card.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));ty=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));over=true;card.classList.add('is-reactive');schedule();};
   const leave=()=>{tx=ty=0;over=false;card.classList.remove('is-reactive');schedule();};
   card.addEventListener('pointermove',move);card.addEventListener('pointerleave',leave);card.addEventListener('pointercancel',leave);
   return()=>{cancelAnimationFrame(frame);card.removeEventListener('pointermove',move);card.removeEventListener('pointerleave',leave);card.removeEventListener('pointercancel',leave);};
  });return()=>cleanups.forEach(fn=>fn());
 },[dependency]);
}
