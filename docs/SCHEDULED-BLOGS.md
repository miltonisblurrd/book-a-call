# Scheduled blogs (hands-off Mondays)

20 Las Vegas posts live in `content/blog/` with future `date` fields (Aug 3 – Dec 14, 2026).

## How publishing works

1. `getPublishedPosts()` in `src/lib/content.ts` only returns posts where `date <= today` in **America/Los_Angeles**.
2. Blog listing, detail pages, recent posts, and the sitemap all use that filter. Future slugs return 404 until their date.
3. Static builds freeze at deploy time, so a **Monday redeploy** unlocks the next post.

## One-time setup

1. Vercel → Project → Settings → Git → **Deploy Hooks** → Create Hook (`monday-blogs`, Production).
2. Copy the hook URL.
3. GitHub → repo → Settings → Secrets and variables → Actions → **New repository secret**:
   - Name: `VERCEL_DEPLOY_HOOK_URL`
   - Value: the Deploy Hook URL
4. Workflow file: `.github/workflows/publish-scheduled-blogs.yml`
   - Cron: Mondays `15:00` UTC (8:00 AM PT)
   - Also runnable via **Actions → Publish scheduled blogs → Run workflow**

After that, you do not need to touch the blog calendar — wake up Mondays and the next post is live (once the redeploy finishes).
