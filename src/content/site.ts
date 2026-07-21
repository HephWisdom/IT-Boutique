import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CloudCog,
  Code2,
  GraduationCap,
  HandHeart,
  Lightbulb,
  Network,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const company = {
  name: 'IT Boutique',
  shortName: 'ITB',
  tagline: 'Practical technology for real-world growth.',
  description: 'An international, founder-led technology consultancy designing, building and automating dependable digital systems.',
  email: 'hello@example.com',
  phone: '+31 6 0000 0000',
  whatsapp: 'https://wa.me/31600000000',
  location: 'Netherlands',
  headquarters: 'Netherlands, EU',
  availability: 'Launching from the Netherlands and available for projects worldwide',
  siteUrl: 'https://example.com',
  linkedIn: '#',
  founder: {
    name: 'Founder name pending',
    role: 'Founder & Technical Lead',
    bio: 'Add the founder’s approved background, delivery experience and professional biography here before launch.',
  },
  announcement: { enabled: true, text: 'Project availability: Worldwide' },
  stats: [
    { value: '7+', label: 'Production projects' },
    { value: 'End-to-end', label: 'Full-stack delivery' },
    { value: 'Applied', label: 'AI & automation experience' },
    { value: 'EU → global', label: 'Delivery availability' },
  ],
  budgets: ['Need guidance', 'Small engagement', 'Medium project', 'Large or ongoing engagement'],
} as const;

export type Service = {
  slug: string;
  number: string;
  name: string;
  short: string;
  problem: string;
  outcome: string;
  deliverables: string[];
  capabilities: string[];
  technologies: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: 'technology-strategy', number: '01', name: 'Technology Strategy & Consulting', short: 'Make the right technology decisions before committing budget and time.',
    problem: 'Your systems no longer match how the organization works—or it is unclear what to improve first.', outcome: 'A realistic roadmap that connects priorities, risk and investment.',
    deliverables: ['System and workflow assessment', 'Technology roadmap', 'Architecture recommendations', 'Implementation plan'],
    capabilities: ['Discovery workshops', 'Process mapping', 'Technical due diligence', 'Solution architecture'], technologies: ['Architecture diagrams', 'Risk registers', 'Delivery roadmaps'], icon: Lightbulb,
  },
  {
    slug: 'custom-software', number: '02', name: 'Custom Software Development', short: 'Turn a fragmented process into one secure, maintainable platform.',
    problem: 'Spreadsheets, inboxes and disconnected tools are slowing down daily operations.', outcome: 'A purpose-built system that supports real users and grows with the organization.',
    deliverables: ['Web applications', 'Management platforms', 'Client and staff portals', 'Internal business tools'],
    capabilities: ['Product discovery', 'UX and interface design', 'Full-stack engineering', 'Quality assurance'], technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL / MongoDB'], icon: Code2,
  },
  {
    slug: 'ai-knowledge-systems', number: '03', name: 'AI & Knowledge Systems', short: 'Make trusted organizational knowledge easier to find and use.',
    problem: 'Important information is scattered, difficult to search, or dependent on a few people.', outcome: 'Responsible AI workflows grounded in your approved information and access rules.',
    deliverables: ['Knowledge assistants', 'Retrieval systems', 'AI workflow prototypes', 'Responsible AI controls'],
    capabilities: ['Use-case assessment', 'Knowledge architecture', 'RAG implementation', 'Evaluation and guardrails'], technologies: ['LLM APIs', 'Vector search', 'Python', 'Evaluation pipelines'], icon: Bot,
  },
  {
    slug: 'automation-integration', number: '04', name: 'Automation & System Integration', short: 'Connect tools and remove repetitive administrative work.',
    problem: 'Teams re-enter the same data, chase routine approvals and compile reports by hand.', outcome: 'Fewer handoffs, cleaner data and more time for valuable work.',
    deliverables: ['Workflow automation', 'API integrations', 'Reporting pipelines', 'Notification systems'],
    capabilities: ['Workflow analysis', 'Integration design', 'Automation delivery', 'Monitoring and support'], technologies: ['REST / GraphQL', 'Webhooks', 'n8n', 'Cloud functions'], icon: Workflow,
  },
  {
    slug: 'digital-experience', number: '05', name: 'Digital Experience Development', short: 'Give customers, teams and partners a clear digital experience.',
    problem: 'Your public or internal experience feels confusing, dated or difficult to use on mobile.', outcome: 'An accessible, responsive experience that makes important actions simple.',
    deliverables: ['Professional websites', 'Client portals', 'Interface systems', 'Accessible frontends'],
    capabilities: ['Content architecture', 'UX/UI design', 'Design systems', 'Frontend engineering'], technologies: ['React', 'Vite', 'Tailwind CSS', 'WCAG'], icon: Blocks,
  },
  {
    slug: 'data-cloud', number: '06', name: 'Data & Cloud Solutions', short: 'Create a dependable foundation for data, reporting and growth.',
    problem: 'Data is hard to trust, systems are slow, or deployment and recovery are fragile.', outcome: 'Secure infrastructure and accessible information for better decisions.',
    deliverables: ['Database design', 'Dashboards', 'Cloud deployment', 'Migration and performance plans'],
    capabilities: ['Data modeling', 'Cloud architecture', 'Security hardening', 'Observability'], technologies: ['AWS / Azure / GCP', 'Docker', 'SQL / NoSQL', 'CI/CD'], icon: CloudCog,
  },
];

export type Industry = { slug: string; name: string; intro: string; challenges: string[]; solutions: string[]; icon: LucideIcon };
export const industries: Industry[] = [
  { slug: 'education', name: 'Education', intro: 'Connected systems for schools and learning organizations.', challenges: ['Student and staff records across separate tools', 'Time-consuming administration', 'Limited operational visibility'], solutions: ['Management platforms', 'Parent and staff portals', 'Reporting automation'], icon: GraduationCap },
  { slug: 'nonprofits-ministries', name: 'Nonprofits & ministries', intro: 'Practical technology that protects resources and supports mission delivery.', challenges: ['Distributed teams and programs', 'Manual donor or member records', 'Reporting obligations'], solutions: ['Program systems', 'Knowledge hubs', 'Automated reporting'], icon: HandHeart },
  { slug: 'growing-businesses', name: 'Growing businesses', intro: 'Systems that keep operations coherent as demand increases.', challenges: ['Processes held together by spreadsheets', 'Repeated data entry', 'Tools that no longer scale'], solutions: ['Operations platforms', 'System integration', 'Management dashboards'], icon: Building2 },
  { slug: 'professional-services', name: 'Professional services', intro: 'Clearer delivery from enquiry through service and reporting.', challenges: ['Client communication gaps', 'Manual case or project tracking', 'Fragmented documents'], solutions: ['Client portals', 'Workflow automation', 'Secure document processes'], icon: BriefcaseBusiness },
  { slug: 'startups-digital-products', name: 'Startups & digital products', intro: 'Focused product delivery without unnecessary complexity.', challenges: ['Unclear product scope', 'Speed versus technical quality', 'Need for specialist capacity'], solutions: ['Discovery and prototyping', 'Product engineering', 'Flexible delivery teams'], icon: Sparkles },
];

export type Project = {
  slug: string; name: string; client: string; industry: string; services: string[]; technology: string[]; status: 'In production'; visibility: 'Public' | 'Partially anonymized' | 'Confidential summary only'; challenge: string; solution: string; result: string; approved: boolean; accent: string;
};

// PROJECT CONTENT PLACEHOLDERS: replace only with client-approved, verified information.
export const projects: Project[] = Array.from({ length: 7 }, (_, index) => ({
  slug: `project-${String(index + 1).padStart(2, '0')}`,
  name: `Project ${String(index + 1).padStart(2, '0')}`,
  client: 'Client details awaiting approval',
  industry: industries[index % industries.length].name,
  services: [services[index % services.length].name],
  technology: ['Technology stack pending'],
  status: 'In production' as const,
  visibility: index > 3 ? 'Confidential summary only' as const : 'Partially anonymized' as const,
  challenge: 'Business problem and constraints awaiting approved project information.',
  solution: 'Solution details will be published after content review and client approval.',
  result: 'Verified operational outcome pending.',
  approved: false,
  accent: ['mint', 'blue', 'amber'][index % 3],
}));

export const process = [
  { number: '01', name: 'Discover', text: 'Understand people, workflows, constraints and the outcome that matters.' },
  { number: '02', name: 'Define', text: 'Agree priorities, success measures, scope and a practical delivery path.' },
  { number: '03', name: 'Design', text: 'Shape the experience and technical approach before expensive decisions.' },
  { number: '04', name: 'Build & validate', text: 'Deliver in useful increments, test with real users and communicate clearly.' },
  { number: '05', name: 'Launch & improve', text: 'Deploy carefully, measure performance and continue improving after launch.' },
];

export const principles = [
  { name: 'Understand before building', icon: UsersRound },
  { name: 'Make business-first decisions', icon: ChartNoAxesCombined },
  { name: 'Protect client data', icon: ShieldCheck },
  { name: 'Keep systems maintainable', icon: RefreshCcw },
  { name: 'Communicate clearly', icon: Network },
  { name: 'Improve continuously', icon: Sparkles },
];

export type Article = { slug: string; title: string; excerpt: string; category: string; tags: string[]; date: string; readTime: string; author: string; sample: boolean; sections: { heading: string; paragraphs: string[] }[] };
export const articles: Article[] = [
  {
    slug: 'choosing-the-right-system', title: 'Choose the right system before you choose the technology', excerpt: 'A practical framework for moving from operational frustration to a sound technology decision.', category: 'Technology Strategy', tags: ['Planning', 'Operations'], date: 'Sample article', readTime: '6 min read', author: 'IT Boutique editorial', sample: true,
    sections: [
      { heading: 'Start with the operating problem', paragraphs: ['The best system decisions begin with work: who does it, where it slows down, which information matters and what a better outcome would look like. A feature list is useful later; it is a poor place to start.', 'Map the current journey with the people closest to it. Look for repeated entry, unclear ownership, missing approvals and information that arrives too late.'] },
      { heading: 'Evaluate fit, not novelty', paragraphs: ['A sound choice may be a better-configured existing tool, a careful integration, or custom software. Compare options by total operational fit, security, maintainability and the team’s ability to support them.'] },
      { heading: 'Make the next step testable', paragraphs: ['Before a large commitment, validate the highest-risk assumption with a prototype, a short discovery engagement or a limited pilot. Good strategy reduces uncertainty in deliberate steps.'] },
    ],
  },
  {
    slug: 'practical-ai-adoption', title: 'A grounded way to begin adopting AI', excerpt: 'Find a narrow, valuable use case—and put quality, access and human oversight around it.', category: 'AI and Automation', tags: ['AI', 'Responsible technology'], date: 'Sample article', readTime: '7 min read', author: 'IT Boutique editorial', sample: true,
    sections: [
      { heading: 'Begin with a decision or task', paragraphs: ['“Use AI” is not a useful project brief. Identify a recurring task where people spend time finding, classifying or summarizing information and where a human can judge the result.'] },
      { heading: 'Design the controls with the workflow', paragraphs: ['Define approved sources, permissions, evaluation examples and escalation rules early. Responsible adoption is part of the system design, not an audit at the end.'] },
      { heading: 'Measure usefulness', paragraphs: ['Track whether the system reduces time, improves consistency or makes information more accessible. If it does not improve the work, the sophistication of the model is beside the point.'] },
    ],
  },
  {
    slug: 'automating-administration', title: 'What to automate first in a busy organization', excerpt: 'Prioritize repetitive work without turning a messy process into a faster messy process.', category: 'Software Engineering', tags: ['Automation', 'Process design'], date: 'Sample article', readTime: '5 min read', author: 'IT Boutique editorial', sample: true,
    sections: [
      { heading: 'Look for volume and predictability', paragraphs: ['Good early candidates happen frequently, follow understandable rules and cause visible delay or error. Reports, reminders, routing and data synchronization often qualify.'] },
      { heading: 'Fix the process boundary', paragraphs: ['Automation exposes ambiguous ownership. Agree who can trigger, approve, correct and override the process before connecting systems.'] },
      { heading: 'Keep a recovery path', paragraphs: ['Every important automation needs logs, alerts and a safe manual fallback. Reliability includes knowing when something did not happen.'] },
    ],
  },
  {
    slug: 'digital-foundations-for-schools', title: 'Digital foundations for growing schools', excerpt: 'A practical sequence for connecting administration, communication and reporting.', category: 'Education Technology', tags: ['Education', 'Digital transformation'], date: 'Sample article', readTime: '8 min read', author: 'IT Boutique editorial', sample: true,
    sections: [{ heading: 'Build around the record of truth', paragraphs: ['Schools generate interdependent information across admissions, attendance, fees, learning and communication. Establishing clear ownership of core records is more valuable than adding isolated features.', 'Plan access by role and responsibility, train staff on the new flow, and introduce changes in phases that protect daily operations.'] }],
  },
];

export const faqs = [
  { q: 'Can you work with an existing system?', a: 'Yes. An engagement can begin with an assessment, integration or focused improvement rather than a complete rebuild.' },
  { q: 'Where do you work?', a: 'We are launching from the Netherlands and structured to collaborate with organizations across Europe and worldwide, with remote delivery built into every engagement.' },
  { q: 'How do projects usually begin?', a: 'Most begin with a short discovery conversation, followed by a scoped assessment or proposal when there is a clear fit.' },
  { q: 'Can you support the system after launch?', a: 'Yes. Support, monitoring and continuous improvement can be included in an ongoing engagement.' },
];

export const specialistRoles = ['Frontend developer', 'Backend developer', 'Full-stack developer', 'UI/UX designer', 'Data engineer', 'AI/ML specialist', 'DevOps/cloud specialist', 'QA engineer', 'Business analyst', 'Project manager', 'Technical writer', 'Other'];
