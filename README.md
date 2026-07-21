# IT Boutique consultancy website

A production-oriented public website, form API and protected administration surface for an international, founder-led technology consultancy launching from the Netherlands. The site leads with business outcomes, keeps all unverified project content explicit, and can be rebranded from a central configuration file.

## Stack

- React, Vite and TypeScript
- Tailwind CSS with local shadcn-style UI primitives
- React Router, React Hook Form, Zod, Framer Motion and Lucide
- Node.js, Express, MongoDB and Mongoose
- Private Multer file storage behind authenticated download routes
- Nodemailer-compatible SMTP notifications
- Cloudflare Turnstile support
- Vitest, Testing Library and Supertest

## Local setup

Requirements: Node.js 20+ and MongoDB 7+ (or the explicitly enabled in-memory development store).

```bash
cp .env.example .env
npm install
npm run dev
```

The web app runs at `http://localhost:5173`; Vite proxies `/api` to the API at `http://localhost:8787`.

For local UI work without MongoDB, leave `ALLOW_MEMORY_STORE=true`. Memory data disappears when the server restarts and is refused unless explicitly enabled. Never use it for production.

Generate the administrator password hash:

```bash
node -e "import('bcryptjs').then(b=>b.hash('replace-this-password',12).then(console.log))"
```

Paste the result into `ADMIN_PASSWORD_HASH`, set a random `JWT_SECRET` of at least 32 characters, and change `ADMIN_EMAIL`.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run check` runs the full sequence.

## Content replacement

Public company, services, industries, projects, process, principles and sample article records live in [`src/content/site.ts`](src/content/site.ts). Update the `company` object first.

The seven project entries are deliberately incomplete. For every project, provide and approve:

- project and client/organization names;
- industry, business problem and user groups;
- solution and main features;
- technology stack and security measures;
- production status and verified outcome;
- approved screenshots and alt text;
- public, partially anonymized or confidential publication level;
- an approved testimonial, if one exists.

Set `approved: true` only when the complete public record has been reviewed. Development testimonials remain absent, and the public section is hidden rather than populated with invented quotes.

Before launch also replace the placeholder domain in `public/robots.txt`, `public/sitemap.xml`, `index.html`, `.env`, and `company.siteUrl`.

## Forms and recovery

Project enquiries and talent profiles use shared Zod validation on client and server. Every submission receives an idempotency key. A recoverable local browser draft remains until the API confirms durable storage and returns a reference number. The success page is never shown on a network or storage failure.

Production records go to MongoDB. Uploaded CVs and project files are stored outside `public/`, with randomized names and MIME/size checks; downloads require an authenticated administrator session. For cloud deployment, replace local disk storage with a private Cloudinary/S3-compatible adapter because ephemeral application filesystems are not durable.

Email delivery is optional locally. With SMTP configured, the API sends an acknowledgement and an administrator alert after the record is stored. Email failure is logged without invalidating a safely stored submission.

Turnstile is enabled when both `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are configured. Keep them paired.

## Administration

`/admin` uses an HTTP-only, same-site session cookie, role claims, a per-session CSRF token, rate-limited login, audit logging and server-side authorization. Administrators can:

- search, filter and update enquiry/talent statuses;
- add internal notes and archive without permanent deletion;
- export records to CSV;
- access the private activity log;
- create/archive structured CMS-ready records for projects, case studies, services, industries, insights, testimonials and contact details.

The public site remains config-first until real content is approved. Import approved admin content into the public content layer or connect the public read API as the next CMS migration step.

## Production deployment

1. Provision a MongoDB database, persistent private object storage and an SMTP provider.
2. Set `NODE_ENV=production`, `CLIENT_ORIGIN`, `MONGODB_URI`, a strong `JWT_SECRET`, administrator credentials, email and Turnstile variables.
3. Set `ALLOW_MEMORY_STORE=false` or omit it.
4. Run `npm ci && npm run build`.
5. Run `npm start` behind an HTTPS reverse proxy. The Express server serves `dist` and the API on the same origin.
6. Persist or replace `UPLOAD_DIR`; do not use an ephemeral filesystem for production uploads.
7. Add backups, retention rules, uptime monitoring and log aggregation.
8. Run an accessibility audit and full browser/device review after real images, third-party integrations and content are added.

The included legal pages are marked as templates and require professional review for the relevant jurisdictions.

## Repository map

```text
src/                 React application
  components/        Layout, SEO and reusable UI
  content/site.ts    Central public content and schemas
  pages/             Public, utility and admin routes
server/              Express API, auth, storage and email
shared/schemas.ts    Shared validation contracts
public/              Static SEO files
```
