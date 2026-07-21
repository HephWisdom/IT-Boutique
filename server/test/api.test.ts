import bcrypt from 'bcryptjs';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../app.ts';
import { connectStore } from '../services/store.ts';

const enquiry={name:'Eva de Vries',organization:'Example School',email:'eva@example.org',phone:'+31600000000',country:'Netherlands',organizationType:'School or education',service:'Custom Software Development',summary:'We need to connect several important administrative workflows.',challenge:'Staff currently repeat the same information across several disconnected tools.',outcome:'One reliable workflow with clear reporting.',budget:'Need guidance',startPeriod:'Within 1–3 months',existingUrl:'',contactMethod:'email',consent:true,turnstileToken:''};
const talent={name:'Eva de Vries',email:'eva@example.com',phone:'+31600000000',countryTimezone:'Netherlands · CET/CEST',role:'Full-stack developer',yearsExperience:5,skills:'TypeScript, React and Node.js',portfolioUrl:'',githubUrl:'https://github.com/example',linkedinUrl:'',availability:'15 hours each week',engagementType:'Freelance',introduction:'I build maintainable web platforms and enjoy collaborating closely with delivery teams.',consent:true,turnstileToken:''};
let app:ReturnType<typeof createApp>;
beforeAll(async()=>{await connectStore(undefined,true);app=createApp({nodeEnv:'test',jwtSecret:'a-test-secret-that-is-longer-than-thirty-two-characters',adminEmail:'admin@example.com',adminPasswordHash:await bcrypt.hash('strong-test-password',4),uploadDir:'/tmp/it-boutique-test-uploads'})});

describe('submission API',()=>{
  it('rejects incomplete submissions',async()=>{const response=await request(app).post('/api/enquiries').set('Idempotency-Key','ENQ-test-invalid-1234').field('payload',JSON.stringify({name:'A'}));expect(response.status).toBe(400);expect(response.body.message).toMatch(/review/i)});
  it('stores a valid enquiry once and returns the same reference on retry',async()=>{const key='ENQ-test-idempotent-123456';const first=await request(app).post('/api/enquiries').set('Idempotency-Key',key).field('payload',JSON.stringify(enquiry));const second=await request(app).post('/api/enquiries').set('Idempotency-Key',key).field('payload',JSON.stringify(enquiry));expect(first.status).toBe(201);expect(first.body.reference).toMatch(/^ENQ-/);expect(second.status).toBe(200);expect(second.body.reference).toBe(first.body.reference)});
  it('requires a private CV for talent profiles and accepts an allowed PDF',async()=>{const missing=await request(app).post('/api/talent').set('Idempotency-Key','TAL-test-missing-file-123').field('payload',JSON.stringify(talent));expect(missing.status).toBe(400);const accepted=await request(app).post('/api/talent').set('Idempotency-Key','TAL-test-with-file-12345').field('payload',JSON.stringify(talent)).attach('attachment',Buffer.from('%PDF-1.4 test CV'),{filename:'kojo-cv.pdf',contentType:'application/pdf'});expect(accepted.status).toBe(201);expect(accepted.body.reference).toMatch(/^TAL-/)});
  it('rejects unsupported upload types',async()=>{const response=await request(app).post('/api/talent').set('Idempotency-Key','TAL-test-bad-file-12345').field('payload',JSON.stringify(talent)).attach('attachment',Buffer.from('not a cv'),{filename:'payload.exe',contentType:'application/octet-stream'});expect(response.status).toBe(400);expect(response.body.message).toMatch(/not allowed/i)});
});

describe('admin authorization',()=>{
  it('blocks unauthenticated record access',async()=>{expect((await request(app).get('/api/admin/enquiries')).status).toBe(401)});
  it('requires a matching CSRF token for updates',async()=>{const agent=request.agent(app);const login=await agent.post('/api/admin/login').send({email:'admin@example.com',password:'strong-test-password'});expect(login.status).toBe(200);const list=await agent.get('/api/admin/enquiries');expect(list.status).toBe(200);const record=list.body.items[0];const denied=await agent.patch(`/api/admin/enquiries/${record._id}`).send({status:'Reviewing'});expect(denied.status).toBe(403);const updated=await agent.patch(`/api/admin/enquiries/${record._id}`).set('X-CSRF-Token',login.body.csrfToken).send({status:'Reviewing'});expect(updated.status).toBe(200);expect(updated.body.item.status).toBe('Reviewing')});
});
