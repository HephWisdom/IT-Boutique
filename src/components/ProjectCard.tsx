import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../content/site';

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card interactive-card card">
    <Link to={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}>
      <div className={`project-visual ${project.accent}`} aria-hidden="true">
        <div className="project-window"><div className="project-toolbar"><i /><i /><i /></div><div className="project-ui"><div><div className="ui-line" /><div className="ui-line short" /><div className="ui-line" /></div><div><div className="ui-line short" /><div className="ui-tile" /><div className="ui-tile" /></div></div></div>
      </div>
      <div className="project-body">
        <div className="project-meta"><span className="tag">{project.status}</span><span className="tag">{project.visibility}</span></div>
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#167d63]">{project.industry}</p><h3 className="heading-md mt-2">{project.name}</h3><p className="mt-3 text-sm leading-relaxed text-subtle">{project.result}</p></div><ArrowUpRight className="flow-arrow shrink-0" /></div>
      </div>
    </Link>
  </article>;
}
