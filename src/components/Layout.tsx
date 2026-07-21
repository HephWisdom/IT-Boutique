import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Menu, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { company, industries, services } from '../content/site';
import { useVisitorCountry } from '../lib/visitorCountry';
import { ButtonLink } from './ui';

const links = [
  { to: '/', label: 'Home' }, { to: '/services', label: 'Services' }, { to: '/industries', label: 'Industries' },
  { to: '/work', label: 'Work' }, { to: '/about', label: 'About' }, { to: '/insights', label: 'Insights' }, { to: '/join', label: 'Join Us' },
];

function Logo() {
  return <Link to="/" className="brand" aria-label={`${company.name} home`}><span className="brand-mark" aria-hidden="true">IT</span><span>{company.name}</span></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const visitorCountry = useVisitorCountry();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { document.body.classList.toggle('menu-open', open); return () => document.body.classList.remove('menu-open'); }, [open]);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  useEffect(() => { if (!open) return; const closeButton = menuRef.current?.querySelector<HTMLButtonElement>('[data-menu-close]'); closeButton?.focus(); }, [open]);
  const closeMenu = (restoreFocus = false) => { setOpen(false); if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus()); };
  const handleMenuKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return; }
    if (event.key !== 'Tab' || !menuRef.current) return;
    const focusable = [...menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const first = focusable[0]; const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {company.announcement.enabled && <div className="announcement"><span className="inline-block size-1.5 rounded-full bg-ink" />{visitorCountry ? `Project availability: ${visitorCountry}` : company.announcement.text} · HQ: {company.headquarters}</div>}
      <header className={`site-header ${company.announcement.enabled ? 'has-announcement' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container-shell nav-row">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(({ to, label }) => <NavLink key={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to}>{label}</NavLink>)}
            <ButtonLink to="/start-a-project">Start a project</ButtonLink>
          </nav>
          <button ref={triggerRef} className="menu-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"><Menu /></button>
        </div>
      </header>
      <AnimatePresence>
        {open && <motion.div ref={menuRef} id="mobile-menu" className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Navigation menu" onKeyDown={handleMenuKeys} onClick={(event) => { if ((event.target as HTMLElement).closest('a')) closeMenu(); }}>
          <div className="flex items-center justify-between"><Logo /><button data-menu-close className="menu-trigger !block" type="button" onClick={() => closeMenu(true)} aria-label="Close menu"><X /></button></div>
          <nav>{links.map(({ to, label }, index) => <motion.div key={to} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .035 }}><Link to={to}>{label}</Link></motion.div>)}</nav>
          <ButtonLink to="/start-a-project">Start a project</ButtonLink>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return <footer className="site-footer">
    <div className="container-shell">
      <div className="footer-top">
        <div><Logo /><h2 className="heading-lg mt-8 max-w-md">Better systems. Less friction. More room to grow.</h2><a className="mt-8 inline-flex items-center gap-2 text-mint" href={`mailto:${company.email}`}>{company.email}<ArrowRight size={16} /></a></div>
        <div className="footer-links">
          <div><h3>Explore</h3><Link to="/about">About</Link><Link to="/work">Selected work</Link><Link to="/insights">Insights</Link><Link to="/join">Talent network</Link></div>
          <div><h3>Expertise</h3>{services.slice(0,4).map(s => <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>)}</div>
          <div><h3>Industries</h3>{industries.slice(0,4).map(i => <Link key={i.slug} to={`/industries/${i.slug}`}>{i.name}</Link>)}</div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {company.name}. Headquarters: {company.headquarters} · Serving clients worldwide.</span><span className="flex flex-wrap gap-4"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/accessibility">Accessibility</Link><a href={company.whatsapp} aria-label="WhatsApp"><MessageCircle size={15} /></a><a href={company.linkedIn} aria-label="LinkedIn"><BriefcaseBusiness size={15} /></a></span></div>
    </div>
  </footer>;
}

export function Layout() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  return <><Header /><AnimatePresence mode="wait"><motion.main id="main-content" key={location.pathname} initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><Outlet /></motion.main></AnimatePresence><Footer /></>;
}

export function FinalCTA() {
  return <section className="section"><div className="container-shell"><div className="cta-panel noise"><p className="eyebrow text-mint">A practical next step</p><h2 className="heading-xl mt-6 max-w-4xl">Have a process, platform or idea that needs better technology?</h2><p className="body-lg !text-[#b6c1c5] mt-6 max-w-2xl">Tell us what you are trying to improve. We will help determine the most practical next step.</p><div className="hero-actions"><ButtonLink to="/start-a-project">Start a project</ButtonLink><ButtonLink to="/start-a-project?intent=discovery" variant="outline-light">Book a discovery call</ButtonLink></div></div></div></section>;
}
