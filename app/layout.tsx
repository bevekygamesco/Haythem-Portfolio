import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Haythem Ben Haddada — Creative Developer & 3D Artist',
 description: 'Frontend developer and 3D modeler in Tunisia. Cinematic Next.js websites, interactive 3D configurators and product visualization. Explore work by Haythem Ben Haddada.',
 metadataBase: new URL('https://haythem-cinematic-portfolio.braveshore128.chatgpt.site'),
 openGraph: {title:'Haythem Ben Haddada — Digital experiences with dimension', description:'Frontend development · 3D modeling · Cinematic websites',images:['/haythem.jpg']},
 icons: {icon:'/favicon.svg'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
