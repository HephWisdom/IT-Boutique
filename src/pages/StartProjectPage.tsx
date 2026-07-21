import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Clock3, LockKeyhole, MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import { projectEnquirySchema } from '../../shared/schemas';
import { SEO } from '../components/SEO';
import { EditorialPageHero } from '../components/EditorialPageHero';
import { TurnstileField } from '../components/TurnstileField';
import { Field, Input, Select, SubmitButton, Textarea } from '../components/ui';
import { company, services } from '../content/site';
import { submitWithRecovery } from '../lib/api';

type FormValues = z.input<typeof projectEnquirySchema>;
const orgTypes=['School or education','Business','Nonprofit or ministry','Professional services','Startup or product company','Government or public organization','Other'];

export default function StartProjectPage(){
  const navigate=useNavigate(); const [file,setFile]=useState<File>(); const [status,setStatus]=useState<{kind:'idle'|'sending'|'error';message?:string}>({kind:'idle'});
  const {register,handleSubmit,setValue,formState:{errors}}=useForm<FormValues>({resolver:zodResolver(projectEnquirySchema),defaultValues:{contactMethod:'email',consent:false,turnstileToken:''}});
  const submit=handleSubmit(async data=>{ if(file&&file.size>8*1024*1024){setStatus({kind:'error',message:'The attachment must be 8 MB or smaller.'});return;} setStatus({kind:'sending',message:'Securing your enquiry and requesting a reference number…'}); const result=await submitWithRecovery('/api/enquiries',data as Record<string,unknown>,file); if(result.ok){navigate(`/submission-success?type=project&reference=${encodeURIComponent(result.reference)}`);}else{setStatus({kind:'error',message:`We could not confirm delivery. A recoverable copy remains in this browser. Please retry without closing this page. ${result.message}`});}});
  return <><SEO title="Start a project" description="Tell us about the process, platform or idea you want to improve. Start a practical technology conversation." path="/start-a-project"/>
    <EditorialPageHero variant="form" eyebrow="Start a conversation" title="Tell us what you are trying to improve." description="Whether you need a new platform, better automation or guidance on an existing system, begin with the challenge—not the technology." breadcrumbs={[{label:'Home',to:'/'},{label:'Start a project'}]} visual={<div className="expectation-panel"><p>What to expect</p><div className="expectation-list"><span><i/>A human-reviewed response</span><span><i/>No obligation</span><span><i/>Confidential discussion</span><span><i/>A practical next-step recommendation</span></div></div>}/>
    <section className="section"><div className="container-shell form-shell"><aside><p className="eyebrow text-[#167d63]">What happens next</p><h2 className="heading-lg mt-6">A thoughtful response—not an automatic sales sequence.</h2><div className="mt-10 grid gap-7">{[[MessageSquareText,'We review your context','A technical lead assesses the problem, fit and useful questions.'],[Clock3,'You receive a human reply','We respond using your preferred method. Add the real response-time commitment before launch.'],[CheckCircle2,'We agree the next step','That may be a discovery call, an assessment, a proposal—or an honest referral.'],[LockKeyhole,'Your information is protected','Attachments are private and never placed in the public website directory.']].map(([Icon,title,text])=><div className="flex gap-4" key={title as string}><Icon className="text-[#167d63] shrink-0" size={22}/><div><h3 className="font-bold">{title as string}</h3><p className="mt-1 text-sm text-subtle leading-relaxed">{text as string}</p></div></div>)}</div></aside>
      <form className="form-card" onSubmit={submit} noValidate><h2 className="heading-md">Project enquiry</h2><p className="mt-2 mb-8 text-sm text-subtle">Fields marked with * are required.</p><div className="form-grid">
        <Field label="Your name *" error={errors.name?.message}><Input autoComplete="name" {...register('name')}/></Field>
        <Field label="Organization *" error={errors.organization?.message}><Input autoComplete="organization" {...register('organization')}/></Field>
        <Field label="Work email *" error={errors.email?.message}><Input type="email" autoComplete="email" {...register('email')}/></Field>
        <Field label="Phone or WhatsApp *" error={errors.phone?.message}><Input type="tel" autoComplete="tel" {...register('phone')}/></Field>
        <Field label="Country *" error={errors.country?.message}><Input autoComplete="country-name" {...register('country')}/></Field>
        <Field label="Organization type *" error={errors.organizationType?.message}><Select {...register('organizationType')}><option value="">Select one</option>{orgTypes.map(x=><option key={x}>{x}</option>)}</Select></Field>
        <Field label="Service needed *" error={errors.service?.message}><Select {...register('service')}><option value="">Choose the closest fit</option>{services.map(s=><option key={s.slug}>{s.name}</option>)}<option>Not sure yet</option></Select></Field>
        <Field label="Approximate budget *" error={errors.budget?.message}><Select {...register('budget')}><option value="">Select a range</option>{company.budgets.map(x=><option key={x}>{x}</option>)}</Select></Field>
        <Field className="full" label="Project summary *" error={errors.summary?.message}><Textarea placeholder="What are you considering building or improving?" {...register('summary')}/></Field>
        <Field className="full" label="Current challenge *" error={errors.challenge?.message}><Textarea placeholder="How does the current process work, and where is the friction?" {...register('challenge')}/></Field>
        <Field className="full" label="Desired outcome *" error={errors.outcome?.message}><Textarea placeholder="What would be different if this went well?" {...register('outcome')}/></Field>
        <Field label="Preferred start period *" error={errors.startPeriod?.message}><Select {...register('startPeriod')}><option value="">Select one</option>{['As soon as practical','Within 1–3 months','Within 3–6 months','Later / exploring'].map(x=><option key={x}>{x}</option>)}</Select></Field>
        <Field label="Preferred contact *" error={errors.contactMethod?.message}><Select {...register('contactMethod')}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></Select></Field>
        <Field label="Existing website or system URL" error={errors.existingUrl?.message}><Input type="url" placeholder="https://" {...register('existingUrl')}/></Field>
        <Field label="Supporting file (PDF, DOCX, PNG, JPG; 8 MB max)"><Input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={e=>setFile(e.target.files?.[0])}/></Field>
        <div className="field full"><label className="checkbox-row"><input type="checkbox" {...register('consent')}/><span>I consent to {company.name} using this information to respond to my enquiry, as described in the <a className="underline" href="/privacy">privacy policy</a>. *</span></label>{errors.consent?.message&&<span className="field-error" role="alert">{errors.consent.message}</span>}</div><div className="field full"><TurnstileField onToken={token=>setValue('turnstileToken',token)}/></div>
      </div><div className="mt-7 flex flex-col items-start"><SubmitButton disabled={status.kind==='sending'}>{status.kind==='sending'?'Sending securely…':'Send project enquiry'}</SubmitButton>{status.kind!=='idle'&&<div className={`form-status ${status.kind==='error'?'error':'success'}`} role="status">{status.message}</div>}</div></form>
    </div></section>
  </>;
}
