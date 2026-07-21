import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { Bot, Braces, Check, Database, GraduationCap, HandHeart, LockKeyhole, Network, Sparkles, Workflow } from 'lucide-react';

const enter = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export function SystemInterfaceVisual({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={`system-visual ${compact ? 'is-compact' : ''}`} variants={enter} initial={reduceMotion ? false : { opacity: 1, y: 18 }} animate="show" transition={{ duration: .7, delay: .25, ease: [0.22, 1, 0.36, 1] }} aria-label="Abstract system map connecting operational intake, secure records, workflows and reporting">
    <div className="system-glow" aria-hidden="true" />
    <div className="system-window">
      <div className="system-window-bar"><span className="system-status"><i /> Production experience</span><span className="system-window-title">Connected operations</span><span aria-hidden="true">•••</span></div>
      <div className="system-canvas">
        <div className="system-canvas-label"><span>System delivery map</span><span>Access controlled</span></div>
        <svg className="system-connectors" viewBox="0 0 680 370" fill="none" aria-hidden="true">
          <g className="connector-tracks">
            <path d="M116 186H245"/><path d="M566 186H435"/><path d="M340 100V148"/><path d="M340 300V224"/>
          </g>
          <g className="connector-flow">
            <path d="M116 186H245"/><path d="M566 186H435"/><path d="M340 100V148"/><path d="M340 300V224"/>
          </g>
          <g className="connector-points">
            <circle cx="116" cy="186" r="3"/><circle cx="245" cy="186" r="3"/><circle cx="435" cy="186" r="3"/><circle cx="566" cy="186" r="3"/>
            <circle cx="340" cy="100" r="3"/><circle cx="340" cy="148" r="3"/><circle cx="340" cy="224" r="3"/><circle cx="340" cy="300" r="3"/>
          </g>
        </svg>
        <div className="system-node node-input"><Workflow size={18}/><span>Intake</span><small>Clear hand-offs</small></div>
        <div className="system-node node-core"><LockKeyhole size={19}/><span>Operations</span><small>Permission-aware</small></div>
        <div className="system-node node-output"><Database size={18}/><span>Records</span><small>One source</small></div>
        <div className="system-node node-top"><Bot size={18}/><span>Knowledge</span></div>
        <div className="system-node node-bottom"><Network size={18}/><span>Reporting</span></div>
      </div>
      <div className="system-window-footer"><span><Check size={13}/> Maintainable delivery</span><span><Check size={13}/> Secure foundations</span></div>
    </div>
    {!compact && <>
      <div className="system-mobile" aria-hidden="true"><div className="system-mobile-device"><div className="system-mobile-top"/><div className="mobile-flow-title"><span>Today</span><i /></div><div className="mobile-flow-card"><Workflow size={15}/><span>Workflow ready</span></div><div className="mobile-flow-card"><LockKeyhole size={15}/><span>Access verified</span></div></div></div>
      <div className="system-support-card support-top"><span className="support-icon"><Braces size={16}/></span><div><small>Integration layer</small><strong>Systems connected</strong></div></div>
      <div className="system-support-card support-bottom"><span className="support-icon"><Sparkles size={16}/></span><div><small>Designed around</small><strong>Real operations</strong></div></div>
      <div className="capability-pills" aria-label="Capabilities"><span>Software</span><span>AI</span><span>Data</span><span>Automation</span></div>
    </>}
  </motion.div>;
}

export function CapabilityMapVisual() {
  return <div className="header-visual capability-map" aria-label="Strategy connecting software, artificial intelligence, automation and cloud capabilities"><span className="map-core">Useful<br/>outcomes</span><span className="map-node map-one">Strategy</span><span className="map-node map-two">Software</span><span className="map-node map-three">AI</span><span className="map-node map-four">Automation</span><span className="map-node map-five">Cloud</span><svg viewBox="0 0 420 310" aria-hidden="true"><path d="M210 155 105 64M210 155 325 63M210 155 350 203M210 155 210 279M210 155 65 210"/></svg></div>;
}

export function IndustryPreviewVisual() {
  const items=[{label:'Education',Icon:GraduationCap},{label:'Growing business',Icon:Network},{label:'Mission-driven',Icon:HandHeart}];
  return <div className="header-visual industry-preview" aria-label="Industry focus areas">{items.map(({label,Icon},index)=><div className="industry-preview-card" key={label} style={{'--preview-index':index} as CSSProperties}><span>0{index+1}</span><Icon size={24}/><strong>{label}</strong></div>)}</div>;
}

export function ProjectPreviewVisual({ label = 'Operational system' }: { label?: string }) {
  return <div className="header-visual project-preview" aria-label="Abstract interface preview; approved project screenshot has not yet been supplied"><div className="project-preview-bar"><span><i/>Production system</span><span>IT Boutique</span></div><div className="project-preview-body"><div className="project-preview-nav"><span/><span/><span/></div><div className="project-preview-content"><small>{label}</small><div className="project-preview-flow"><span>People</span><b>→</b><span>Process</span><b>→</b><span>Insight</span></div><div className="project-preview-panels"><i/><i/><i/></div></div></div></div>;
}
