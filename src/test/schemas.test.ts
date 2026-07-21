import { describe, expect, it } from 'vitest';
import { projectEnquirySchema, talentApplicationSchema } from '../../shared/schemas';

const enquiry={name:'Eva de Vries',organization:'Example School',email:'eva@example.org',phone:'+31600000000',country:'Netherlands',organizationType:'School or education',service:'Custom Software Development',summary:'We need to connect several important administrative workflows.',challenge:'Staff currently repeat the same information across several disconnected tools.',outcome:'One reliable workflow with clear reporting.',budget:'Need guidance',startPeriod:'Within 1–3 months',existingUrl:'',contactMethod:'email' as const,consent:true,turnstileToken:''};

describe('shared form validation',()=>{
  it('accepts a complete project enquiry',()=>expect(projectEnquirySchema.safeParse(enquiry).success).toBe(true));
  it('rejects missing consent and vague project context',()=>{const result=projectEnquirySchema.safeParse({...enquiry,consent:false,challenge:'Too short'});expect(result.success).toBe(false);if(!result.success)expect(result.error.issues.map(i=>i.path[0])).toEqual(expect.arrayContaining(['consent','challenge']))});
  it('validates a talent profile and coerces years of experience',()=>{const result=talentApplicationSchema.safeParse({name:'Eva de Vries',email:'eva@example.com',phone:'+31600000000',countryTimezone:'Netherlands · CET/CEST',role:'Full-stack developer',yearsExperience:'5',skills:'TypeScript, React and Node.js',portfolioUrl:'',githubUrl:'https://github.com/example',linkedinUrl:'',availability:'15 hours each week',engagementType:'Freelance',introduction:'I build maintainable web platforms and enjoy working closely with product teams.',consent:true,turnstileToken:''});expect(result.success).toBe(true);if(result.success)expect(result.data.yearsExperience).toBe(5)});
});
