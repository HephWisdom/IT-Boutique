import { z } from 'zod';

const optionalUrl = z.union([z.literal(''), z.string().url('Enter a complete URL, including https://')]);
const consent = z.boolean().refine((value) => value, { message: 'Consent is required' });

export const projectEnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  organization: z.string().trim().min(2).max(140),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  country: z.string().trim().min(2).max(100),
  organizationType: z.string().min(1),
  service: z.string().min(1),
  summary: z.string().trim().min(20).max(2000),
  challenge: z.string().trim().min(20).max(3000),
  outcome: z.string().trim().min(10).max(2000),
  budget: z.string().min(1),
  startPeriod: z.string().min(1),
  existingUrl: optionalUrl,
  contactMethod: z.enum(['email', 'phone', 'whatsapp']),
  consent,
  turnstileToken: z.string().optional().default(''),
});

export const talentApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  countryTimezone: z.string().trim().min(3).max(120),
  role: z.string().min(1),
  yearsExperience: z.coerce.number().int().min(0).max(60),
  skills: z.string().trim().min(3).max(1000),
  portfolioUrl: optionalUrl,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  availability: z.string().trim().min(2).max(200),
  engagementType: z.string().min(1),
  introduction: z.string().trim().min(30).max(2000),
  consent,
  turnstileToken: z.string().optional().default(''),
});

export const loginSchema = z.object({
  email: z.string().email().max(180),
  password: z.string().min(8).max(200),
});

export const enquiryStatuses = ['New', 'Reviewing', 'Discovery scheduled', 'Proposal sent', 'Won', 'On hold', 'Closed'] as const;
export const talentStatuses = ['New', 'Reviewing', 'Shortlisted', 'Talent pool', 'Contacted', 'Not currently suitable', 'Archived'] as const;

export type ProjectEnquiryInput = z.infer<typeof projectEnquirySchema>;
export type TalentApplicationInput = z.infer<typeof talentApplicationSchema>;
