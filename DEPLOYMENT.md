# Deployment checklist

## Required infrastructure

- Node.js 20+ runtime with HTTPS
- MongoDB connection with backups and least-privilege credentials
- Persistent private object storage or a persistent volume for `UPLOAD_DIR`
- SMTP service with verified sender domain
- Cloudflare Turnstile site and secret keys
- Application/error monitoring and centralized logs

## Required production variables

Use `.env.example` as the source list. In production, do not enable the memory store. Use a unique 32+ character `JWT_SECRET`, a bcrypt administrator password hash, exact `CLIENT_ORIGIN`, and a non-placeholder sender/contact address.

## Release sequence

1. Replace all placeholder company data and approve every public project/article record.
2. Update canonical domain values, robots and sitemap.
3. Run `npm ci` and `npm run check` in CI.
4. Build with `npm run build`.
5. Deploy the Node service and confirm `/api/health`.
6. Test project and talent submissions with real email delivery and private upload download.
7. Verify admin login, CSRF-protected updates, archiving, CSV export and audit logs.
8. Confirm public files cannot expose `UPLOAD_DIR`.
9. Review responsive layouts at 320, 375, 768, 1024, 1440 and 1920 pixels.
10. Run Lighthouse and an assistive-technology pass on the deployed origin.

## Operations

- Rotate administrator credentials and JWT secret on a controlled schedule.
- Define retention and deletion rules for enquiries, consent logs and CVs.
- Alert on repeated authentication failure and email delivery failure events.
- Test database and private-file recovery.
- Apply dependency and runtime security updates through reviewed releases.
