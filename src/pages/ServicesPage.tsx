import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FinalCTA } from '../components/Layout';
import { EditorialPageHero } from '../components/EditorialPageHero';
import { CapabilityMapVisual } from '../components/HeroVisuals';
import { SEO } from '../components/SEO';
import { Accordion, ButtonLink, SectionIntro } from '../components/ui';
import { faqs, process, projects, services } from '../content/site';
import { NotFoundPage } from './UtilityPages';

export default function ServicesPage() {
  return <>
    <SEO title="Technology consulting services" description="Strategy, custom software, responsible AI, workflow automation, digital experiences, data and cloud services focused on practical outcomes." path="/services" />
    <EditorialPageHero variant="split" eyebrow="What we do" title="Technology services designed around real operational challenges." description="From strategy and product engineering to AI and automation, we help organizations choose, build and improve the systems that support their growth." breadcrumbs={[{label:'Home',to:'/'},{label:'Services'}]} visual={<CapabilityMapVisual/>}/>
    <section className="section"><div className="container-shell"><SectionIntro eyebrow="Six connected capabilities" title="Use one service—or combine the right ones around a clear outcome." />
      <div className="grid md:grid-cols-2 gap-4">{services.map(service => { const Icon = service.icon; return <Link to={`/services/${service.slug}`} className="flow-cell card p-6 md:p-8 min-h-80 flex flex-col" key={service.slug}><div className="flex items-center justify-between"><span className="service-icon"><Icon size={19} /></span><span className="text-xs text-subtle">{service.number}</span></div><h2 className="heading-lg mt-12">{service.name}</h2><p className="mt-5 leading-relaxed text-subtle">{service.short}</p><span className="mt-auto pt-8 inline-flex gap-2 font-bold text-sm">Explore service <ArrowRight className="flow-arrow" size={16} /></span></Link> })}</div>
    </div></section>
    <section className="section bg-white"><div className="container-shell detail-layout"><div><p className="eyebrow text-[#167d63]">Engagement options</p><h2 className="heading-xl mt-6">Start at the level the problem needs.</h2></div><div className="grid gap-3">{[['Focused assessment','A short engagement to understand the current system, risks and practical next step.'],['Defined project','A scoped outcome delivered through discovery, design, engineering and launch.'],['Ongoing improvement','Regular support, feature delivery, monitoring and technical guidance.'],['Specialist delivery team','A right-sized team assembled for a larger or multidisciplinary initiative.']].map(([title,text])=><div className="card p-6" key={title}><h3 className="heading-md">{title}</h3><p className="mt-3 text-subtle leading-relaxed">{text}</p></div>)}</div></div></section>
    <section className="section"><div className="container-shell max-w-4xl"><SectionIntro eyebrow="Common questions" title="Before we begin." /><Accordion items={faqs} /></div></section><FinalCTA />
  </>;
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find(item => item.slug === slug);
  if (!service) return <NotFoundPage />;
  const Icon = service.icon;
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.short, provider: { '@type': 'Organization', name: 'IT Boutique' }, areaServed: ['Netherlands', 'European Union', 'Worldwide'] };
  return <>
    <SEO title={service.name} description={service.short} path={`/services/${service.slug}`} jsonLd={serviceSchema} />
    <EditorialPageHero variant="split" eyebrow={`${service.number} · Service`} title={service.name} description={service.short} breadcrumbs={[{label:'Home',to:'/'},{label:'Services',to:'/services'},{label:service.name}]} meta={<span className="service-icon !border-white/30"><Icon size={19}/></span>} actions={<ButtonLink to="/start-a-project">Discuss this service</ButtonLink>} visual={<CapabilityMapVisual/>}/>
    <section className="section"><div className="container-shell detail-layout"><aside className="sticky-aside"><p className="eyebrow text-[#167d63]">The problem</p><h2 className="heading-lg mt-5">{service.problem}</h2></aside><div><p className="text-xs font-bold uppercase tracking-widest text-[#167d63]">The intended outcome</p><p className="heading-lg mt-5">{service.outcome}</p><div className="grid sm:grid-cols-2 gap-4 mt-12">{service.capabilities.map(capability=><div className="card p-6" key={capability}><Check size={18} className="text-[#167d63]"/><h3 className="font-bold mt-8">{capability}</h3></div>)}</div></div></div></section>
    <section className="section bg-[#e6eae7]"><div className="container-shell"><SectionIntro eyebrow="Typical deliverables" title="Tangible outputs, agreed before delivery." /><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">{service.deliverables.map((item,i)=><div className="bg-paper p-6 rounded-xl min-h-44 flex flex-col" key={item}><span className="text-xs text-[#167d63]">0{i+1}</span><h3 className="heading-md mt-auto">{item}</h3></div>)}</div></div></section>
    <section className="section bg-ink text-white"><div className="container-shell"><SectionIntro eyebrow="Delivery" title="A visible path from discovery to improvement." light /><div className="process-grid">{process.map(step=><div className="process-step flow-cell" key={step.number}><span className="step-number">{step.number}</span><h3 className="heading-md mt-8">{step.name}</h3><p className="mt-3 text-sm text-[#9fadb3] leading-relaxed">{step.text}</p></div>)}</div></div></section>
    <section className="section"><div className="container-shell detail-layout"><div><p className="eyebrow text-[#167d63]">Engineering context</p><h2 className="heading-xl mt-6">Tools follow the decision.</h2><p className="body-lg mt-6">Relevant technologies are selected for security, maintainability, cost and team fit.</p></div><div className="flex flex-wrap gap-3 content-start">{service.technologies.map(tech=><span className="tag text-sm !px-4 !py-2" key={tech}>{tech}</span>)}</div></div></section>
    <section className="section-sm bg-white"><div className="container-shell card p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center"><div className="flex gap-4"><ShieldCheck className="text-[#167d63] shrink-0"/><div><p className="font-bold">Related project content is awaiting approval.</p><p className="mt-2 text-sm text-subtle">{projects.find(p=>p.services.includes(service.name))?.result ?? 'A matching production project will appear here after client review.'}</p></div></div><Link to="/work" className="text-link text-sm">View work <ArrowRight className="flow-arrow" size={15}/></Link></div></section>
    <section className="section"><div className="container-shell max-w-4xl"><SectionIntro eyebrow="FAQ" title={`Questions about ${service.name.toLowerCase()}.`} /><Accordion items={[...faqs.slice(0,3),{q:'What will you need from our team?',a:'Access to relevant decision-makers and users, honest context about the current process, and timely feedback on priorities and working increments.'}]} /></div></section><FinalCTA />
  </>;
}
