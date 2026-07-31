---
title: "Las Vegas Website Redesign Checklist"
description: "The checklist I actually work from on redesigns — what to capture before you touch anything, how to protect the rankings you already have, and the launch-day steps teams skip and regret."
date: "2026-11-30"
category: "Development"
tags: ["las-vegas", "web-design", "seo", "redesign", "performance"]
author: "Milton Amaya"
ogImage: "/images/blog/las-vegas-website-redesign-checklist-og.png"
faqs:
  - question: "How long does a website redesign take?"
    answer: "A focused marketing site redesign runs six to ten weeks from kickoff to launch. Larger sites with heavy content migration or custom integrations run twelve to sixteen. The design phase is rarely the bottleneck — content and approvals are."
  - question: "Will a redesign hurt my search rankings?"
    answer: "It can, and it usually does when redirects get skipped. If you map every old URL to a new one, keep your page titles and headings intentional, and hold your content depth, most sites recover within a few weeks and many improve."
  - question: "What should I capture before starting a redesign?"
    answer: "A full URL export, twelve months of analytics, your top twenty organic landing pages, current Core Web Vitals, and a screenshot archive of key pages. If you do not baseline it, you cannot prove the redesign worked."
  - question: "Do I need new content or can I reuse what I have?"
    answer: "Reuse what performs, rewrite what does not. Pulling your top organic pages into the new design mostly intact protects rankings. The pages nobody visits are where you should spend your writing energy."
  - question: "How much does a Las Vegas website redesign cost?"
    answer: "Small business marketing sites typically land in the low five figures. Larger sites with custom functionality, integrations, or extensive content migration go up from there. The variable is usually scope of functionality, not number of pages."
  - question: "Should I launch all at once or in phases?"
    answer: "All at once for marketing sites under roughly fifty pages — a partial launch means running two design systems in parallel, which is worse. Phase it only when you have hundreds of pages or genuinely separate sections."
---

## Redesigns fail in boring ways

Nobody has ever lost a redesign because the hero animation was not clever enough.

They lose it because 340 old URLs went to a 404 page, because the content that used to rank got trimmed to look cleaner, because nobody baselined the analytics so there is no way to prove anything improved. Boring stuff. Preventable stuff.

I have run redesigns for local firms in Summerlin and product teams downtown, and the pattern holds every time: the creative work is the fun part and the operational work is what determines whether it was worth doing.

![Las Vegas website redesign checklist](/images/blog/las-vegas-website-redesign-checklist-og.png)

So this is the actual checklist I work from. Steal it. Run it yourself if you are doing this in-house, or use it to pressure-test whoever you hire.

## Phase 1: Before you touch anything

This phase takes about a week and it is the one people skip. Do not skip it. Every item here is something you cannot recover after the old site is gone.

**Export every URL.** Crawl the current site with Screaming Frog or Sitebulb and export the full list. Every page, every PDF, every image URL that has ever been linked. This becomes your redirect map later. Without it you are guessing.

**Pull twelve months of analytics.** Sessions, top landing pages, conversion paths, bounce patterns. Twelve months so seasonality shows up — and in Vegas seasonality is real. Convention traffic, summer slowdowns, holiday patterns.

**Identify your top twenty organic pages.** These are load-bearing. They are why you get found. Every one needs a direct equivalent on the new site with comparable content depth. Losing one of these to a redesign is a self-inflicted wound.

**Baseline your Core Web Vitals.** Run PageSpeed Insights on your five most important pages and screenshot the results. Mobile and desktop. If you cannot show a before, the after means nothing.

**Screenshot the current site.** Full-page captures of every important page. Six months from now when someone asks "did the old one have that?", you will want this.

**Inventory the integrations.** Forms, CRM connections, booking widgets, chat, analytics, pixels, review feeds. Every one needs a home on the new site, and someone needs to own testing each after launch. This list is always longer than anyone expects.

**Write down why you are redesigning.** One sentence. "Our site does not reflect what we do now." "Mobile conversion is broken." "We cannot publish without a developer." If you cannot write it, you may not need a redesign — you may need a refresh. [When to rebuild your Vegas website](/blog/when-to-rebuild-your-vegas-website) covers that distinction in depth.

## Phase 2: Strategy and structure

**Decide the stack before the design.** Webflow and Next.js lead to different design decisions, different CMS structures, different handoffs. Choosing after the design is done means retrofitting. [Next.js vs Webflow for Las Vegas businesses](/blog/nextjs-vs-webflow-las-vegas) is the comparison I hand clients at this stage, and [Webflow for Vegas marketing teams](/blog/webflow-for-vegas-marketing-teams) goes deeper if your team publishes frequently.

**Build the sitemap before the wireframes.** What pages exist, what the hierarchy is, what gets merged, what gets cut. Kill pages that get under a handful of visits a month and carry no strategic weight. Merge thin pages that are really one topic split across three.

**Map the primary conversion path.** Landing page to consideration to action. For most local businesses that is homepage to service page to contact or booking. Every other page decision serves that path or it is decoration.

**Audit the competition honestly.** Not to copy — to know what your buyer just looked at before landing on you. If the three firms you compete with all have live pricing and you have a contact form, that is a positioning decision you should make on purpose.

**Sort out local SEO structure.** Location page, service area content, real NAP consistency, LocalBusiness schema. If you serve Henderson, Summerlin, and North Las Vegas as distinct markets, decide now whether those are separate pages with genuinely different content or one page. Thin duplicate location pages actively hurt you.

## Phase 3: Design and content

**Design mobile first, seriously.** Most local service businesses see sixty to seventy percent mobile traffic. Designing desktop-first and adapting down produces a mobile experience that feels like a compromise, because it is one.

**Build a system, not pages.** Type scale, color roles, spacing rhythm, component library. The second page should be faster to build than the first. If it is not, you are making one-off pages and you will feel it on every future campaign. More on that in [design systems beat one-off pages](/blog/design-systems-beat-one-off-pages).

**Write the content before the final design.** Design around real copy, not lorem ipsum. Real headlines are longer than you want. Real testimonials are awkward lengths. Designing around fake content means redesigning around real content later.

**Protect your ranking content.** For the top twenty pages from Phase 1: keep comparable word count, keep the heading structure meaningful, keep the terms you actually rank for. You can absolutely make it look better. Do not make it shorter for the sake of visual cleanliness.

**Get real photography.** This is my most repeated advice for local businesses. Your actual space, your actual team. Stock photos of a generic conference room signal nothing. In a market where a lot of businesses look interchangeable online, real photography is the cheapest differentiation available.

**Design the empty and error states.** Form validation, search with no results, 404. The 404 especially — you will have traffic hitting it during the redirect settling period, and it should route people somewhere useful.

## Phase 4: Pre-launch

This is the phase where discipline pays off. Do not compress it because launch day is scheduled.

**Build the redirect map.** Every old URL mapped to a new one. 301, not 302. Where there is no direct equivalent, send it to the closest relevant page — not the homepage. Bulk-redirecting everything to the homepage is the single most common way redesigns tank rankings.

```
/services/web-design-old    →  /services/design
/about-us.html              →  /about
/blog/2019/old-post-title   →  /blog/old-post-title
```

**Test every form end to end.** Submit each one. Confirm the email arrives, the CRM record is created, the confirmation page loads, the thank-you tracking fires. Do it on mobile too. Broken forms after launch are invisible until someone asks why leads stopped.

**Verify analytics and tracking.** New property or same one, conversion goals configured, pixels present. Decide beforehand whether you are annotating the launch date in analytics — you want that marker when you review performance in three months.

**Run accessibility checks.** Color contrast, keyboard navigation, alt text, focus states, form labels. Beyond being the right thing to do, it is a real legal exposure for consumer-facing businesses.

**Check performance on real devices.** Not just your MacBook on office wifi. An actual mid-range Android on cellular. That is what a meaningful share of your traffic is using.

**Proofread with fresh eyes.** Someone who has not read the copy forty times. Typos in headlines survive launch more often than you would believe.

**Confirm the staging site is not indexed.** Password protection or noindex. Duplicate content from a public staging environment is a genuinely annoying problem to clean up.

## Phase 5: Launch day and after

**Launch mid-week, mid-morning.** Tuesday or Wednesday. Never Friday afternoon. If something breaks you want your whole team available, not scattered across the weekend.

**Submit the new sitemap** in Search Console immediately and request indexing on your most important pages.

**Crawl the live site.** Same tool as Phase 1. Look for 404s, redirect chains, missing meta descriptions, broken images. Fix them the same day.

**Watch Search Console for two weeks.** Coverage errors, crawl anomalies, ranking shifts. A modest dip in the first ten days is normal. A continuing decline at week three means something is wrong — usually redirects.

**Compare against your baseline at thirty and ninety days.** The metrics you captured in Phase 1. Did Core Web Vitals improve? Is conversion up? This is the only way to know whether the money worked.

**Keep a running fix list.** Small things surface for weeks after launch. Track them in one place instead of scattered Slack messages, and knock them out in batches. This is exactly what [ongoing support](/services/ongoing-support) is for if you would rather not manage it internally.

## What actually determines the timeline

Clients always ask how long this takes, and the honest answer is that it depends almost entirely on things outside the design process.

Six to ten weeks is realistic for a marketing site redesign. But I have watched an eight-week project stretch to five months, and it was never because the design took longer. It was content. Somebody had to write nine service pages and that person also had a full-time job. Or approvals — three stakeholders, none of whom could get in the same room, each giving feedback in a separate direction two weeks apart.

Two things fix this and both happen before kickoff. Assign one decision-maker who can approve on behalf of the group, even if others weigh in. And get the content written or at least outlined during the strategy phase, not during build. If writing is the bottleneck, budget for a copywriter — it is cheaper than two extra months of project drift.

If your brand itself is also changing as part of this, that is a different scope. [What a Las Vegas rebrand includes](/blog/las-vegas-rebrand-whats-included) walks through how those two projects sequence together.

## Takeaways

- The week of prep before design starts is the highest-leverage week of the entire project
- Redirects are not a technical detail — they are the difference between keeping and losing your organic traffic
- Protect your top twenty organic pages above every aesthetic preference
- Real photography beats a clever layout for local businesses, every time
- Baseline your metrics or you will never be able to prove the redesign was worth it

## Bottom line

A redesign is a project management exercise wearing a creative project's clothes. The design work matters, but the wins and losses live in redirects, content decisions, and whether anyone tested the forms.

Run this checklist honestly and your redesign is boring in the best way. Skip Phase 1 and you will spend the next quarter explaining a traffic drop.

Want help running one? See how I approach [web development](/services/development) and [design](/services/design), or [book a 15-minute call](/book-a-call) and we can go through your current site together.
