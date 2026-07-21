import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Article } from '../content/site';

export function ArticleCard({ article }: { article: Article }) {
  return <article className="article-card interactive-card card"><p className="text-xs font-bold uppercase tracking-wider text-[#167d63]">{article.category}</p><h3 className="heading-md mt-5"><Link to={`/insights/${article.slug}`}>{article.title}</Link></h3><p className="mt-4 text-sm leading-relaxed text-subtle">{article.excerpt}</p><div className="article-meta flex items-center justify-between"><span>{article.readTime} · {article.date}</span><ArrowUpRight className="flow-arrow" size={18} /></div></article>;
}
