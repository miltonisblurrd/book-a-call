# BLURRD Studio — Pre-Launch Checklist

Use this in order. Check items off as you go.

---

## What Resend is for

**Resend sends booking notification emails to you** (`YOUR_EMAIL`) when someone completes the book-a-call flow.

It does **not** email the person who booked — they get a **Google Calendar invite with Meet link** instead.

Current sender: `Book a Call <onboarding@resend.dev>` (Resend sandbox — fine for testing, not ideal for production).

Production goal: verify `blurrdstudio.com` in Resend and send from something like `Book a Call <bookings@blurrdstudio.com>`.

---

## Phase 1 — Content (you)

- [ ] **Symphny** — replace 13 screenshot placeholders in `content/case-studies/symphny.md`
- [ ] **ShipNetwork** — replace 14 screenshot placeholders in `content/case-studies/shipnetwork.md`
- [ ] **Safe Faces** — replace 12 screenshot placeholders in `content/case-studies/safefaces.md`
- [ ] **Safe Faces wrong images** — swap borrowed Symphny assets (`Frame-47417`, `Group-47633`) in case study + homepage modal
- [ ] Quick read-through of all three case studies for typos / client approval

> **Launch shortcut:** You can go live with placeholders on non-hero sections if hero + 2–3 key shots per case study are done. Not ideal, but shippable.

---

## Phase 2 — Code & config (quick wins)

- [x] **Commit pricing** — local `$6,000` change in `blurrd-studi.webflow/index.html` + `services.html`
- [x] **Fix services JSON-LD** — update `"price": "12000"` → `"6000"` in `services.html`
- [x] **Homepage work cards** — update `src/data/work-projects.ts` (Safe Faces name, categories, remove Symphny placeholder images)
- [ ] **Dead links** (optional pre-launch) — About “Follow My Socials”, work section category `#` links
- [ ] Push to GitHub → confirm Vercel auto-deploy succeeds

---

## Phase 3 — Vercel production env

Add in Vercel → Project → Settings → Environment Variables (Production):

- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `GOOGLE_REFRESH_TOKEN`
- [ ] `GOOGLE_CALENDAR_ID`
- [ ] `RESEND_API_KEY`
- [ ] `YOUR_EMAIL` (where booking notifications go)
- [ ] `NEXT_PUBLIC_BOOKING_DURATION_MINUTES` (e.g. `30`)

Redeploy after adding vars.

---

## Phase 4 — Google Calendar / OAuth

- [ ] Google Cloud OAuth client has **production redirect URI** for your live domain
- [ ] Calendar used for availability is the one you want clients booking into
- [ ] Test account has free/busy synced correctly

---

## Phase 5 — Resend (production email)

- [ ] Add and verify domain `blurrdstudio.com` at [resend.com](https://resend.com)
- [ ] Update `from` in `src/lib/email.ts` to your verified address
- [ ] Send a test booking on staging/production and confirm email arrives at `YOUR_EMAIL`

---

## Phase 6 — DNS cutover

- [ ] Vercel project connected to `blurrdstudio.com` + `www.blurrdstudio.com`
- [ ] Update DNS (Netlify → Vercel): A/CNAME per Vercel docs
- [ ] Wait for SSL certificate (usually minutes)
- [ ] Confirm `https://www.blurrdstudio.com` loads the Next.js site (not old Webflow)

---

## Phase 7 — Production smoke test (15 min)

Run on live domain after DNS propagates:

- [ ] Homepage loads, work section opens all 3 project modals
- [ ] `/services` pricing tabs work
- [ ] `/case-studies/symphny`, `/safefaces`, `/shipnetwork` render correctly
- [ ] `/book-a-call` — pick slot, submit form, get confirmation
- [ ] Google Calendar event created with Meet link
- [ ] Resend notification hits your inbox
- [ ] `/blog`, `/faqs`, `/privacy` load
- [ ] Mobile spot-check (homepage + book-a-call)

---

## Phase 8 — Post-launch (first week)

- [ ] **GA4** — replace deprecated Universal Analytics (`UA-150386202-1`) in `src/app/layout.tsx`
- [ ] **Redirects** — add any old Webflow `.html` URL redirects if analytics/logs show 404s
- [ ] **Search Console** — submit sitemap `https://www.blurrdstudio.com/sitemap.xml`
- [ ] Monitor Vercel logs for booking API errors
- [ ] **Scheduled blogs deploy hook** (one-time):
  1. Vercel → Project → Settings → Git → Deploy Hooks → Create Hook named `monday-blogs` (Production)
  2. GitHub repo → Settings → Secrets and variables → Actions → New repository secret
  3. Name: `VERCEL_DEPLOY_HOOK_URL` · Value: the hook URL from step 1
  4. Confirm workflow `.github/workflows/publish-scheduled-blogs.yml` runs Mondays 8am PT (or trigger manually once)

---

## Already done ✓

- [x] Next.js migration + core pages
- [x] Sitewide SEO, privacy policy, sitemap, JSON-LD
- [x] Blog hub (`/blog`), `/learn` redirect
- [x] Flagship case studies expanded (Symphny, ShipNetwork, Safe Faces)
- [x] Case study footer grid limited to 3 flagship projects
- [x] Blue wrapper padding + header styling fixed
- [x] Latest case study work pushed to GitHub (`ebc32e2`)

---

## Minimum viable launch

If you need live **this week** with the least friction:

1. Vercel env vars + DNS cutover  
2. Resend domain verified (or accept sandbox sender temporarily)  
3. One production booking test  
4. Hero screenshots on 3 case studies (placeholders OK elsewhere temporarily)  
5. Push pricing commit if `$6,000` is final  

Everything else in Phase 8 can wait.
