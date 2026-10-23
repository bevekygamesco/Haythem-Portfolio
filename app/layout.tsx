import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Haythem Ben Haddada — Creative Developer & 3D Artist',
 description: 'Frontend developer and 3D modeler in Tunisia. Cinematic Next.js websites, interactive 3D configurators and product visualization. Explore work by Haythem Ben Haddada.',
 metadataBase: new URL('https://haythem-cinematic-portfolio.braveshore128.chatgpt.site'),
 openGraph: {title:'Haythem Ben Haddada — Digital experiences with dimension', description:'Frontend development · 3D modeling · Cinematic websites',images:['/haythem.jpg']},
 icons: {icon:'/favicon.svg'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:`(function(){try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);var top=function(){window.scrollTo({top:0,left:0,behavior:'instant'});};top();window.addEventListener('pageshow',top,{once:true});}}catch(e){}})();`}}/></head><body>{children}</body></html>}
