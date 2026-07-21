import { ArrowRight, CheckCircle2, CircleArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { HomeHero } from '../components/HomeHero';
import { FinalCTA } from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';
import { SEO } from '../components/SEO';
import { ButtonLink, SectionIntro } from '../components/ui';
import { articles, company, industries, principles, process, projects, services } from '../content/site';

const problems = [
  ['01', 'Disconnected manual processes', 'automation-integration'], ['02', 'Repetitive administrative work', 'automation-integration'],
  ['03', 'Outdated or unreliable systems', 'custom-software'], ['04', 'Data trapped across multiple tools', 'data-cloud'],
  ['05', 'Limited operational visibility', 'technology-strategy'], ['06', 'Technology that does not scale', 'data-cloud'],
];

export default function HomePage() {
  const orgSchema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: company.name, description: company.description, areaServed: ['Netherlands', 'European Union', 'Worldwide'], email: company.email, url: company.siteUrl };
  return <>
    <SEO title="Practical technology for real-world growth" description="From the Netherlands, we design, build and automate secure digital systems for organizations across Europe and worldwide." jsonLd={orgSchema} />
    <HomeHero/>

    <section className="section bg-ink text-white"><div className="container-shell">
      <SectionIntro eyebrow="Where value starts" title="Technology should remove friction—not create more of it." text="We begin with the operational pressure your team feels, then choose the most proportionate response." light />
      <div className="problems-grid">{problems.map(([number, title, slug]) => <Link className="problem flow-cell" to={`/services/${slug}`} key={title}><span>{number}</span><div className="flex items-end justify-between gap-4"><h3 className="heading-md max-w-xs">{title}</h3><CircleArrowRight className="text-mint flow-arrow" /></div></Link>)}</div>
    </div></section>

    <section className="section"><div className="container-shell">
      <SectionIntro eyebrow="What we do" title="From a difficult process to a dependable system." text="One accountable partner across strategy, experience and engineering—with specialists assembled where the work needs them." />
      <div className="service-grid">{services.map(service => { const Icon = service.icon; return <article className="service-row liquid-row" key={service.slug}><div className="flex items-center gap-3"><span className="text-xs font-bold text-subtle">{service.number}</span><span className="service-icon"><Icon size={18} /></span></div><div><h3 className="heading-md">{service.name}</h3><p className="mt-3 text-sm leading-relaxed text-subtle">{service.short}</p></div><p className="text-sm leading-relaxed text-subtle"><strong className="mb-1 block text-ink">The outcome</strong>{service.outcome}</p><Link className="text-link text-sm" to={`/services/${service.slug}`}>Explore <ArrowRight className="flow-arrow" size={15} /></Link></article> })}</div>
    </div></section>

    <section className="section bg-[#e6eae7]"><div className="container-shell">
      <SectionIntro eyebrow="Selected work" title="Built to be used—not just launched." text="Seven projects are currently in production. Public project details remain intentionally withheld until their names, screenshots and outcomes are approved." />
      <div className="project-grid">{projects.slice(0,4).map(project => <ProjectCard project={project} key={project.slug} />)}</div>
      <div className="mt-10"><ButtonLink to="/work" variant="outline">View all work</ButtonLink></div>
    </div></section>

    <section className="section bg-ink text-white"><div className="container-shell">
      <SectionIntro eyebrow="How we deliver" title="Clear steps. Useful progress. No black box." text="We stay involved after launch through support, measurement and continuous improvement." light />
      <div className="process-grid">{process.map(step => <div className="process-step flow-cell" key={step.number}><span className="step-number">{step.number}</span><h3 className="heading-md mt-8">{step.name}</h3><p className="mt-3 text-sm leading-relaxed text-[#9fadb3]">{step.text}</p></div>)}</div>
    </div></section>

    <section className="section"><div className="container-shell">
      <SectionIntro eyebrow="Sector understanding" title="Technology shaped around the way your organization works." />
      <div className="industry-list">{industries.map(industry => { const Icon = industry.icon; return <Link className="industry-card flow-cell" key={industry.slug} to={`/industries/${industry.slug}`}><Icon size={25} strokeWidth={1.5} /><div><h3 className="heading-md">{industry.name}</h3><p className="mt-3 text-sm leading-relaxed text-subtle">{industry.intro}</p></div></Link> })}</div>
    </div></section>

    <section className="section bg-white"><div className="container-shell"><div className="detail-layout">
      <div><p className="eyebrow text-[#167d63]">Why IT Boutique</p><h2 className="heading-xl mt-6">Senior attention stays close to the work.</h2><p className="body-lg mt-6">A focused consultancy gives you direct access to the technical lead and a specialist network that flexes to the problem.</p></div>
      <div className="grid sm:grid-cols-2 gap-px bg-[#d9deda] border border-[#d9deda] rounded-2xl overflow-hidden">{principles.map(item => { const Icon = item.icon; return <div className="flow-cell bg-white p-6 min-h-40 flex flex-col justify-between" key={item.name}><Icon size={23} className="text-[#167d63]" /><h3 className="heading-md mt-8">{item.name}</h3></div> })}</div>
    </div></div></section>

    <section className="section bg-[#8ef0c7]"><div className="container-shell grid lg:grid-cols-[1.3fr_.7fr] gap-12 items-end"><div><p className="eyebrow">Talent network</p><h2 className="heading-xl mt-6 max-w-4xl">Do meaningful work with a growing technology network.</h2><p className="body-lg !text-[#30434c] mt-6 max-w-2xl">Developers, designers, data specialists, project managers and other professionals can share their profiles for future project collaboration.</p></div><div><ButtonLink to="/join" variant="dark">Join our talent network</ButtonLink><p className="mt-4 text-xs text-[#43565d]">Joining does not guarantee immediate work or employment.</p></div></div></section>

    <section className="section"><div className="container-shell"><SectionIntro eyebrow="Field notes" title="Clear thinking about practical technology." /><div className="article-grid">{articles.slice(0,3).map(article => <ArticleCard article={article} key={article.slug} />)}</div><div className="mt-10"><ButtonLink to="/insights" variant="outline">Explore insights</ButtonLink></div></div></section>

    {import.meta.env.DEV && <section className="section-sm"><div className="container-shell card p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"><div className="flex gap-4"><CheckCircle2 className="text-[#167d63] shrink-0" /><div><p className="font-bold">Development placeholder: testimonials are hidden until approved.</p><p className="mt-1 text-sm text-subtle">The data structure is ready; no client statement will appear without permission.</p></div></div><Link className="text-link text-sm" to="/content-guide">Content checklist <ArrowRight className="flow-arrow" size={15} /></Link></div></section>}
    <FinalCTA />
  </>;
}
