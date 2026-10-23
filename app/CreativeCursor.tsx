'use client';
import {useEffect,useRef} from 'react';
export default function CreativeCursor(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  const el=root.current!;const canvas=el.querySelector('canvas')!;const ctx=canvas.getContext('2d');if(!ctx)return;
  const ring=el.querySelector<HTMLElement>('.cursor-orbit')!;const core=el.querySelector<HTMLElement>('.cursor-core')!;const label=el.querySelector<HTMLElement>('.cursor-word')!;
  let frame=0,x=-100,y=-100,rx=x,ry=y,visible=false,last=0;let points:{x:number;y:number;t:number}[]=[];
  const size=()=>{const d=Math.min(devicePixelRatio,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);};
  const hide=()=>{visible=false;el.classList.remove('cursor-visible');points=[];};
  const sync=()=>{const enabled=media.matches;el.hidden=!enabled;document.documentElement.classList.toggle('creative-cursor-enabled',enabled);if(!enabled)hide();};
  const draw=(now:number)=>{const dt=Math.min(40,now-last||16);last=now;const a=1-Math.exp(-dt/60);rx+=(x-rx)*a;ry+=(y-ry)*a;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;core.style.transform=`translate3d(${x}px,${y}px,0)`;ctx.clearRect(0,0,innerWidth,innerHeight);points=points.filter(p=>now-p.t<190);if(visible&&points.length>1){for(let i=1;i<points.length;i++){const fade=Math.max(0,1-(now-points[i].t)/190);ctx.beginPath();ctx.moveTo(points[i-1].x,points[i-1].y);ctx.lineTo(points[i].x,points[i].y);ctx.strokeStyle=`rgba(71,148,255,${fade*.3})`;ctx.lineWidth=fade*1.8;ctx.lineCap='round';ctx.stroke();}}if(points.length||(visible&&Math.abs(x-rx)+Math.abs(y-ry)>.05))frame=requestAnimationFrame(draw);else{frame=0;ctx.clearRect(0,0,innerWidth,innerHeight);}};
  const move=(e:PointerEvent)=>{if(!media.matches||e.pointerType==='touch')return;const target=e.target as HTMLElement;const native=!!target.closest('dialog[open],input,textarea,select,[contenteditable="true"]');document.documentElement.classList.toggle('cursor-native-field',native);if(native){hide();return;}if(!visible){rx=e.clientX;ry=e.clientY;}x=e.clientX;y=e.clientY;visible=true;el.classList.add('cursor-visible');points.push({x,y,t:performance.now()});if(points.length>24)points.shift();const interactive=target.closest('a,button,[role="button"],.motion-photo');el.classList.toggle('cursor-action',!!interactive);const inTools=!!target.closest('.tool-universe');el.classList.toggle('cursor-traverse',inTools&&!interactive);label.textContent=interactive?(interactive.tagName==='A'?'OPEN':'VIEW'):inTools?'SCROLL':'';if(!frame)frame=requestAnimationFrame(draw);};
  const down=()=>el.classList.add('cursor-pressed');const up=()=>el.classList.remove('cursor-pressed');const blur=()=>{hide();up();};
  size();sync();media.addEventListener('change',sync);window.addEventListener('resize',size);window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',blur);window.addEventListener('blur',blur);window.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',blur);
  return()=>{cancelAnimationFrame(frame);document.documentElement.classList.remove('creative-cursor-enabled','cursor-native-field');media.removeEventListener('change',sync);window.removeEventListener('resize',size);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',blur);window.removeEventListener('blur',blur);window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',blur);};
 },[]);
 return <div ref={root} className="creative-cursor" aria-hidden="true" hidden><canvas/><div className="cursor-orbit"><div className="cursor-reticle"><i/><i/><span className="cursor-word"/></div></div><div className="cursor-core"><i/></div></div>;
}
