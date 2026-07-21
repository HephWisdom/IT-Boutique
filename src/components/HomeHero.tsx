import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Layers3, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { company } from '../content/site';
import { useVisitorCountry } from '../lib/visitorCountry';
import { SystemInterfaceVisual } from './HeroVisuals';
import { ButtonLink } from './ui';

const proof=[{value:'7+',label:'Production projects'},{value:'Full-stack',label:'Strategy to launch',Icon:Layers3},{value:'Applied',label:'AI & automation',Icon:Sparkles},{value:'EU → world',label:'Globally available',Icon:Globe2}];

export function HomeHero(){
  const reduceMotion=useReducedMotion();const sectionRef=useRef<HTMLElement>(null);const visitorCountry=useVisitorCountry();
  const pointerMove=(event:React.PointerEvent<HTMLElement>)=>{if(reduceMotion||event.pointerType==='touch'||!sectionRef.current)return;const rect=sectionRef.current.getBoundingClientRect();sectionRef.current.style.setProperty('--hero-x',`${event.clientX-rect.left}px`);sectionRef.current.style.setProperty('--hero-y',`${event.clientY-rect.top}px`);const visual=sectionRef.current.querySelector<HTMLElement>('.system-visual');if(visual){const x=((event.clientX-rect.left)/rect.width-.5)*7;const y=((event.clientY-rect.top)/rect.height-.5)*5;visual.style.setProperty('--tilt-x',`${x}px`);visual.style.setProperty('--tilt-y',`${y}px`)}};
  const item=(delay:number)=>({initial:reduceMotion?false:{opacity:1,y:14},animate:{opacity:1,y:0},transition:{duration:.65,delay,ease:[0.22,1,0.36,1] as [number,number,number,number]}});
  return <section ref={sectionRef} className="hero-premium grid-lines" onPointerMove={pointerMove}>
    <div className="hero-pointer-light" aria-hidden="true"/>
    <div className="container-shell hero-premium-shell">
      <div className="hero-premium-main">
        <div className="hero-premium-copy">
          <motion.p className="eyebrow text-mint" {...item(.05)}>Technology consulting · Software engineering · AI & automation</motion.p>
          <motion.h1 className="hero-premium-title" {...item(.12)}>We build technology that <span>moves organizations forward.</span></motion.h1>
          <motion.p className="hero-premium-description" {...item(.2)}>We help schools, businesses and mission-driven organizations replace operational friction with secure software, intelligent automation and connected digital systems.</motion.p>
          <motion.div className="hero-actions" {...item(.27)}><ButtonLink to="/start-a-project">Start a project</ButtonLink><ButtonLink to="/work" variant="outline-light">Explore our work</ButtonLink></motion.div>
          <motion.p className="hero-trust" {...item(.32)}><Globe2 size={15}/><span>Available in {visitorCountry ?? 'your country'} · Headquarters: {company.headquarters}</span></motion.p>
        </div>
        <div className="hero-premium-visual"><SystemInterfaceVisual/></div>
      </div>
      <motion.div className="hero-proof" initial={reduceMotion?false:{opacity:1,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.46}}>{proof.map(({value,label,Icon})=><div className="hero-proof-item" key={label}>{Icon&&<Icon size={16} aria-hidden="true"/>}<strong>{value}</strong><span>{label}</span></div>)}</motion.div>
    </div>
  </section>
}
