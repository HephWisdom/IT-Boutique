import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ButtonLink({ to, children, variant = 'primary', className = '' }: { to: string; children: ReactNode; variant?: 'primary' | 'dark' | 'outline' | 'outline-light'; className?: string }) {
  return <Link className={`btn btn-${variant} ${className}`} to={to}>{children}<ArrowUpRight className="button-arrow" size={17} aria-hidden="true" /></Link>;
}

export function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="split-heading">
      <p className={`eyebrow ${light ? 'text-mint' : 'text-[#167d63]'}`}>{eyebrow}</p>
      <div>
        <h2 className={`heading-xl liquid-heading ${light ? 'liquid-heading-light' : ''}`}>{title}</h2>
        {text && <p className={`body-lg mt-6 max-w-3xl ${light ? '!text-[#b6c1c5]' : ''}`}>{text}</p>}
      </div>
    </div>
  );
}

export function Field({ label, error, className = '', children }: PropsWithChildren<{ label: string; error?: string; className?: string }>) {
  return <div className={`field ${className}`}><label>{label}</label>{children}{error && <span className="field-error" role="alert">{error}</span>}</div>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input {...props} />; }
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) { return <select {...props} />; }
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} />; }
export function SubmitButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="btn btn-dark" type="submit" {...props}>{children}<ArrowUpRight className="button-arrow" size={17} /></button>; }

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return <div className="accordion">{items.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>;
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return <nav className="crumbs" aria-label="Breadcrumb">{items.map((item, i) => <span key={item.label}>{i > 0 && <span aria-hidden="true"> / </span>}{item.to ? <Link to={item.to}>{item.label}</Link> : item.label}</span>)}</nav>;
}
