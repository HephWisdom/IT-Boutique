import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { FinalCTA } from '../components/Layout';
import { EditorialPageHero } from '../components/EditorialPageHero';
import { SEO } from '../components/SEO';
import { ButtonLink } from '../components/ui';
import { articles } from '../content/site';
import { NotFoundPage } from './UtilityPages';

export default function InsightsPage(){
  const [query,setQuery]=useState(''); const [category,setCategory]=useState(''); const categories=[...new Set(articles.map(a=>a.category))]; const filtered=useMemo(()=>articles.filter(a=>(!query||`${a.title} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))&&(!category||a.category===category)),[query,category]);
  return <><SEO title="Insights" description="Practical field notes on technology strategy, software engineering, AI, automation, education technology and reliable digital systems." path="/insights"/>
    <EditorialPageHero variant="split" eyebrow="Ideas and practical guidance" title="Clear thinking for better technology decisions." description="Perspectives on software engineering, AI, automation and digital transformation for growing organizations." breadcrumbs={[{label:'Home',to:'/'},{label:'Insights'}]} visual={<Link className="article-feature" to={`/insights/${articles[0].slug}`}><small>Latest field note</small><strong>{articles[0].title}</strong><span>{articles[0].category} · {articles[0].readTime}</span></Link>}/>
    <section className="section"><div className="container-shell"><div className="filter-bar"><div className="search-wrap"><Search size={17}/><input className="search-input" type="search" placeholder="Search insights" value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search insights"/></div><select className="filter-select" value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter by category"><option value="">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="article-grid">{filtered.map(article=><ArticleCard article={article} key={article.slug}/>)}</div></div></section>
    <section className="section-sm bg-[#8ef0c7]"><div className="container-shell grid md:grid-cols-[1fr_auto] gap-8 items-end"><div><p className="eyebrow">Updates</p><h2 className="heading-lg mt-5">Occasional practical notes. No noise.</h2><p className="mt-4 text-[#40545c]">Newsletter delivery is prepared for later connection to an approved email provider.</p></div><form className="flex flex-col sm:flex-row gap-2" onSubmit={e=>e.preventDefault()}><label className="sr-only" htmlFor="newsletter">Email address</label><input id="newsletter" type="email" required placeholder="you@organization.org" className="min-h-13 rounded-full border border-ink/20 bg-white/50 px-5"/><button className="btn btn-dark">Notify me</button></form></div></section><FinalCTA/>
  </>;
}

export function ArticlePage(){
  const {slug}=useParams(); const article=articles.find(item=>item.slug===slug); if(!article)return <NotFoundPage/>;
  const schema={'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.excerpt,author:{'@type':'Organization',name:article.author}};
  return <><SEO title={article.title} description={article.excerpt} path={`/insights/${article.slug}`} type="article" jsonLd={schema}/>
    <article><EditorialPageHero variant="article" eyebrow={article.category} title={article.title} description={article.excerpt} breadcrumbs={[{label:'Home',to:'/'},{label:'Insights',to:'/insights'},{label:article.title}]} meta={<div className="flex gap-2 flex-wrap"><span className="tag tag-dark">{article.author}</span><span className="tag tag-dark">{article.readTime}</span>{article.sample&&<span className="tag tag-dark">Editorial sample</span>}</div>}/><div className="section"><div className="container-shell article-body"><p className="rounded-lg border border-[#e0c38d] bg-[#f6e9d1] !text-sm p-4">This is clearly marked sample editorial content. Review, date and approve it before publication.</p>{article.sections.map(section=><section className="mt-14" key={section.heading}><h2 className="heading-lg">{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}<div className="mt-16 border-t border-black/15 pt-8 flex flex-wrap gap-2">{article.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div></div></div></article>
    <section className="section-sm bg-white"><div className="container-shell flex flex-col md:flex-row items-start md:items-center justify-between gap-8"><div><p className="eyebrow text-[#167d63]">Need to apply this?</p><h2 className="heading-lg mt-5">Turn the idea into a practical next step.</h2></div><ButtonLink to="/start-a-project" variant="dark">Talk to us</ButtonLink></div></section><FinalCTA/>
  </>;
}
