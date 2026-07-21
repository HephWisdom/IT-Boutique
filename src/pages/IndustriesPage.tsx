import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FinalCTA } from '../components/Layout';
import { EditorialPageHero } from '../components/EditorialPageHero';
import { IndustryPreviewVisual } from '../components/HeroVisuals';
import { SEO } from '../components/SEO';
import { ButtonLink, SectionIntro } from '../components/ui';
import { industries, services } from '../content/site';
import { NotFoundPage } from './UtilityPages';

export default function IndustriesPage() {
  return <>
    <SEO title="Industries" description="Practical digital systems for education, nonprofits, ministries, growing businesses, professional services and digital products." path="/industries" />
    <EditorialPageHero variant="split" eyebrow="Who we work with" title="Technology shaped around how your organization actually works." description="We bring practical digital systems to education, growing businesses, nonprofits, ministries and professional organizations." breadcrumbs={[{label:'Home',to:'/'},{label:'Industries'}]} visual={<IndustryPreviewVisual/>}/>
    <section className="section"><div className="container-shell"><div className="grid gap-px bg-[#cdd4d0] border border-[#cdd4d0] rounded-2xl overflow-hidden">{industries.map((industry,index)=>{const Icon=industry.icon;return <Link className="flow-cell bg-paper grid md:grid-cols-[.25fr_.8fr_1fr_auto] gap-6 p-6 md:p-8 items-center" to={`/industries/${industry.slug}`} key={industry.slug}><span className="text-xs text-subtle">0{index+1}</span><div className="flex items-center gap-4"><Icon className="text-[#167d63]"/><h2 className="heading-md">{industry.name}</h2></div><p className="text-sm text-subtle leading-relaxed">{industry.intro}</p><ArrowRight className="flow-arrow" /></Link>})}</div></div></section><FinalCTA />
  </>;
}

export function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = industries.find(item=>item.slug===slug);
  if(!industry) return <NotFoundPage/>;
  const Icon=industry.icon;
  return <>
    <SEO title={`${industry.name} technology consulting`} description={industry.intro} path={`/industries/${industry.slug}`} />
    <EditorialPageHero variant="split" eyebrow="Industry focus" title={`Better digital foundations for ${industry.name.toLowerCase()}.`} description={`${industry.intro} We combine operational understanding with secure, maintainable engineering.`} breadcrumbs={[{label:'Home',to:'/'},{label:'Industries',to:'/industries'},{label:industry.name}]} meta={<Icon size={34} className="text-mint"/>} actions={<ButtonLink to="/start-a-project">Discuss your context</ButtonLink>} visual={<IndustryPreviewVisual/>}/>
    <section className="section"><div className="container-shell detail-layout"><div><p className="eyebrow text-[#167d63]">Operational challenges</p><h2 className="heading-xl mt-6">Solve the bottleneck people actually experience.</h2></div><div className="grid gap-3">{industry.challenges.map((item,index)=><div className="card p-6 flex gap-5" key={item}><span className="text-xs text-[#167d63]">0{index+1}</span><h3 className="heading-md">{item}</h3></div>)}</div></div></section>
    <section className="section bg-[#e6eae7]"><div className="container-shell"><SectionIntro eyebrow="Possible solutions" title="A proportionate response—not a pre-packaged answer." /><div className="grid md:grid-cols-3 gap-4">{industry.solutions.map(item=><div className="bg-paper rounded-xl p-6 min-h-52 flex flex-col" key={item}><CheckCircle2 className="text-[#167d63]"/><h3 className="heading-md mt-auto">{item}</h3></div>)}</div></div></section>
    <section className="section"><div className="container-shell"><SectionIntro eyebrow="Relevant expertise" title="Capabilities that can work together." /><div className="grid md:grid-cols-3 gap-4">{services.slice(0,3).map(service=><Link className="flow-cell card p-6 min-h-60 flex flex-col" to={`/services/${service.slug}`} key={service.slug}><span className="text-xs text-[#167d63]">{service.number}</span><h3 className="heading-md mt-8">{service.name}</h3><p className="mt-4 text-sm text-subtle">{service.short}</p><ArrowRight className="flow-arrow mt-auto pt-8" size={32}/></Link>)}</div></div></section>
    <section className="section-sm bg-white"><div className="container-shell flex gap-5 items-start max-w-4xl"><ShieldCheck className="text-[#167d63] shrink-0" size={30}/><div><h2 className="heading-md">Security and reliability belong in the first conversation.</h2><p className="mt-4 text-subtle leading-relaxed">Access rules, data sensitivity, connectivity, backup, recovery and staff capacity are considered throughout discovery and delivery—not added after launch.</p></div></div></section><FinalCTA />
  </>;
}
