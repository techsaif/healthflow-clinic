# HealthFlow Clinic

Production-oriented Next.js 15 + TypeScript + Tailwind + Supabase starter for a premium medical clinic website and live patient queue platform.

## Included

- Responsive marketing site: home, about, services, service detail, doctors, doctor profiles, blog, FAQ, contact, privacy, terms and 404.
- Patient experience: appointment form, magic-link portal entry, private queue tracking and public live queue board.
- Reception experience: admin queue dashboard with status actions and analytics cards.
- Centralized demo clinic configuration in `lib/config.ts`.
- Supabase SSR browser/server clients, API routes, auth middleware, database schema, RLS policies and Realtime publication.
- Metadata, Open Graph, sitemap, robots, semantic HTML, keyboard-visible focus states and reduced-motion support.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Run the migration with the Supabase CLI or SQL editor:

```bash
supabase db push
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`. Never expose the service role key to the browser.

## Production hardening checklist

1. Replace demo content in `lib/config.ts` with Supabase-backed clinic, service and doctor records.
2. Add server-side role checks for `/admin` based on `app_metadata.role`; do not rely on client UI for authorization.
3. Configure Supabase Auth redirect URLs, email templates, MFA and session policies.
4. Add HIPAA/security review, audit logs, backups, retention rules, consent workflows and counsel-reviewed privacy/terms before handling PHI.
5. Replace the map placeholder with the clinic's approved map provider and real address.
6. Add monitoring, error boundaries, rate limiting and transactional email/SMS notifications.

The app is intentionally demo-safe: queue records and appointment numbers are sample content until Supabase is seeded and the clinic's operational policies are configured.
