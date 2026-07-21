import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Crumbs } from './ui';

export type HeroVariant = 'editorial' | 'split' | 'project' | 'form' | 'article';
type Breadcrumb = { label: string; to?: string };

export function EditorialPageHero({ eyebrow, title, description, breadcrumbs, variant = 'editorial', actions, visual, meta }: { eyebrow: string; title: ReactNode; description: string; breadcrumbs: Breadcrumb[]; variant?: HeroVariant; actions?: ReactNode; visual?: ReactNode; meta?: ReactNode }) {
  const transition = { duration: .65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] };
  return <section className={`editorial-page-hero editorial-page-hero--${variant} ${visual ? 'has-visual' : ''}`}>
    <div className="editorial-ambient" aria-hidden="true" />
    <div className="container-shell editorial-page-shell">
      <Crumbs items={breadcrumbs}/>
      <div className="editorial-page-grid">
        <motion.div className="editorial-page-copy" initial={false} animate={{ opacity: 1, y: 0 }} transition={transition}>
          <p className="eyebrow text-mint">{eyebrow}</p>
          {meta && <div className="editorial-page-meta">{meta}</div>}
          <h1 className="editorial-page-title">{title}</h1>
          <p className="editorial-page-description">{description}</p>
          {actions && <div className="hero-actions">{actions}</div>}
        </motion.div>
        {visual && <motion.div className="editorial-page-visual" initial={false} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...transition, delay: .12 }}>{visual}</motion.div>}
      </div>
    </div>
  </section>;
}
