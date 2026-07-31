---
title: "Core Web Vitals for Vegas Business Sites"
description: "What LCP, INP, and CLS actually mean, why Vegas sites fail them more than most, and the specific fixes that move the numbers — in the order I do them."
date: "2026-11-09"
category: "Development"
tags: ["las-vegas", "core-web-vitals", "performance", "seo", "development"]
author: "Milton Amaya"
ogImage: "/images/blog/core-web-vitals-for-vegas-business-sites-og.png"
faqs:
  - question: "What are Core Web Vitals in plain terms?"
    answer: "Three measurements of how a page feels to a real visitor. LCP is how long until the main content appears. INP is how quickly the page responds when you tap something. CLS is how much the layout jumps around while loading."
  - question: "Do Core Web Vitals affect Google rankings?"
    answer: "They are a ranking factor, but a modest one compared to content and relevance. The bigger effect is on conversion — slow pages lose visitors before they ever read your content, which hurts every metric downstream."
  - question: "Why does my site score well in Lighthouse but poorly in Search Console?"
    answer: "Lighthouse is a lab test on your machine. Search Console reports field data from real visitors on real devices and connections. Field data is the one that counts, and it is almost always worse than lab data."
  - question: "What is usually the single biggest fix?"
    answer: "Images. Oversized hero images and unoptimized photography cause more failed LCP scores than anything else. Correct formats and sizes often fix the metric on their own."
  - question: "Can a Webflow or WordPress site pass Core Web Vitals?"
    answer: "Yes, with discipline. The platform is rarely the hard limit. Heavy themes, stacked plugins, and third-party embeds are what usually cause failures, and those are choices rather than platform constraints."
  - question: "How long does it take to fix a failing site?"
    answer: "Most sites see meaningful improvement in a few days of focused work. Field data in Search Console lags by about 28 days, so the reporting catches up well after the site is actually faster."
---

## Three numbers, and why they matter here

Core Web Vitals get talked about like an SEO chore. They are actually a decent proxy for something simpler: does your website feel good to use on a phone.

There are three of them.

**LCP — Largest Contentful Paint.** How long until the biggest piece of content on screen shows up. Usually your hero image or headline. You want it under 2.5 seconds.

**INP — Interaction to Next Paint.** When someone taps a button, how long before the page visibly responds. Under 200 milliseconds.

**CLS — Cumulative Layout Shift.** How much the page jumps around while it loads. This is the one where you go to tap a link and an ad loads above it and you tap the wrong thing. Under 0.1.

Here is the Vegas-specific part. A meaningful share of traffic to businesses in this city arrives on a phone, on a connection that is worse than yours — hotel Wi-Fi with a few hundred other guests on it, a casino floor, a rideshare on the 15, a convention hall where fifteen thousand people are all on the same network.

Your site is fast on your MacBook on office fiber. That measurement is not the one that matters.

![Core Web Vitals for Las Vegas business sites](/images/blog/core-web-vitals-for-vegas-business-sites-og.png)

## Measure the right thing first

Before touching anything, get real data.

**Search Console, Core Web Vitals report.** This is field data from actual visitors. It is grouped by URL pattern, so you can see that your blog is fine and your product pages are failing. Start here. Always.

**PageSpeed Insights on a specific URL.** Shows you field data at the top and lab data below. Read the field data. The lab score is a diagnostic, not a grade.

**Chrome DevTools with throttling on.** Set the network to Slow 4G and CPU throttling to 4x, then reload. This is the closest you will get to a real visitor on hotel Wi-Fi without standing in a hotel.

The mistake almost everyone makes is running Lighthouse on their laptop, seeing 94, and concluding the site is fine. Lighthouse on a fast machine on a fast connection is a best-case scenario. Field data is the truth, and it lags 28 days, which means you need to know the delay exists before you panic that your fix "did not work."

## Fix LCP first: it is almost always images

If your LCP is failing, the cause is your hero image about 80 percent of the time. Here is the order I work in.

**Serve the right size.** The number of sites shipping a 4000 pixel wide photo to a 390 pixel wide phone is genuinely staggering. That is a multi-megabyte download to display a fraction of it.

**Use a modern format.** WebP or AVIF. Frequently 40 to 60 percent smaller than the JPEG at the same visible quality.

**Do not lazy load the hero.** This one bites people who applied lazy loading globally. Lazy loading your LCP element actively delays it. Everything below the fold, yes. The hero, never.

**Preload it.** Tell the browser about the important image before it discovers it in the HTML.

```html
<link
  rel="preload"
  as="image"
  href="/images/hero-1200.avif"
  imagesrcset="/images/hero-800.avif 800w, /images/hero-1200.avif 1200w"
  imagesizes="100vw"
/>
```

In Next.js most of this is handled for you if you use the image component with proper sizes and mark the hero as priority:

```tsx
// from: src/components/Hero.tsx
<Image
  src="/images/hero.jpg"
  alt="Storefront on Fremont Street at night"
  width={1600}
  height={900}
  sizes="100vw"
  priority
/>
```

The `priority` flag is what skips lazy loading and adds the preload. One prop, frequently a full second of LCP.

**Then check fonts.** If your hero is text, a web font that loads late means the text is invisible until it arrives. Use `font-display: swap`, preload the one font file that matters, and stop shipping four weights you do not use.

## Fix CLS second: reserve space for everything

Layout shift is the cheapest one to fix and the most annoying to experience.

Causes, in order of how often I find them:

**Images without dimensions.** The browser does not know how tall the image is, so it renders the text, then the image arrives and shoves everything down. Set width and height, or an aspect ratio, on every image. Every single one.

**Web fonts causing reflow.** The fallback font is a different size than the real one, so text reflows when the font loads. Pick fallbacks with similar metrics and adjust with size-adjust so the swap is invisible.

**Embeds and widgets.** Reservation widgets, review carousels, chat bubbles, maps. They load late and push content around. Wrap each one in a container with a fixed height so the space is already claimed.

**Banners injected at the top.** Cookie notices, announcement bars, promo strips. Anything inserted above existing content shifts the entire page. Either render it server side so it is in the initial layout, or position it as an overlay.

```css
/* Claim the space before the widget arrives */
.reservation-embed {
  min-height: 420px;
}
```

Not elegant. Extremely effective.

## Fix INP third: get scripts off the main thread

INP is where third-party scripts come home to roost.

The typical business site is running analytics, a tag manager, a heatmap tool, a chat widget, a review widget, a pixel or two, and a popup tool. Each vendor swears their script is lightweight. Collectively they are running enough JavaScript that the main thread is busy when your visitor taps a button, and the tap does nothing for 400 milliseconds.

What I do:

- **Inventory every script and make someone justify it.** In practice a third of them are from a campaign that ended a year ago. Delete those first — it is the highest-leverage performance work there is and it costs nothing.
- **Load non-essential scripts after interaction or on idle.** Analytics does not need to run before the page is usable.
- **Defer widgets until they are near the viewport.** A chat bubble does not need to exist at first paint.
- **Break up long tasks.** If your own code is doing heavy work on load, chunk it so the browser can respond to input between pieces.

In Next.js the strategy prop handles most of the third-party case:

```tsx
<Script src="https://example.com/widget.js" strategy="lazyOnload" />
```

## The twenty-minute audit

If you want to check your own site right now, this is the sequence I run and it takes about twenty minutes.

Open Search Console and note which URL groups are failing and on which metric. That tells you where to look and what kind of problem you have.

Open the worst-performing URL in Chrome, DevTools open, network throttled to Slow 4G, cache disabled. Reload and watch. Sort the network panel by size and look at the top five requests — if an image is over a few hundred kilobytes, you found your LCP problem. Then reload again and just watch the page with your eyes. If anything visibly jumps, that is your CLS, and you can usually name the culprit on sight.

Then filter the network panel to scripts and read the domains. Every domain that is not yours is a third party someone added for a reason that may no longer exist. Write that list down and take it to whoever owns marketing.

That is the whole audit. No tooling beyond the browser, and it finds the real problems on most sites.

## What I do not bother with

Some performance advice is real and some is theater. Things I skip on most business sites:

**Micro-optimizing a bundle that is already small.** If your JavaScript is 90KB, shaving 6KB is not your problem. The 900KB hero image is your problem.

**Chasing a perfect 100 in Lighthouse.** The gap between 92 and 100 is usually invisible to humans and takes longer than the gap from 40 to 92. Fix the field data, then stop.

**Replacing the whole stack for performance alone.** A slow site is usually slow because of what was loaded onto it, not because of the platform. Fix the loading before you consider a rebuild. If the platform genuinely is the ceiling, [why migrate from Webflow to Next.js](/blog/why-migrate-from-webflow-to-nextjs) and [Next.js vs Webflow for Las Vegas companies](/blog/nextjs-vs-webflow-las-vegas) both get into where that line is.

## Keeping it fast after you fix it

Sites do not stay fast on their own. They degrade one reasonable decision at a time — a new tracking pixel, a bigger hero video, one more embed.

Two habits prevent it.

**A performance budget agreed up front.** Decide what a page is allowed to weigh and how many third-party scripts it gets before you design it. Saying no to a background video in the design phase is easy. Removing it after the client fell in love with it is not.

**A check in your deploy pipeline.** Run Lighthouse on your key templates on every pull request and fail the build if LCP regresses past a threshold. It turns performance from a periodic cleanup project into something that just does not break.

And check Search Console monthly. Field data lagging means a regression can be live for weeks before you feel it in the report.

## Takeaways

- Field data in Search Console is the truth. Lighthouse on your laptop is not.
- LCP is almost always images. Right size, modern format, never lazy load the hero.
- CLS is fixed by reserving space for every image, font, and embed.
- INP is fixed by deleting scripts you no longer need and deferring the rest.
- Skip micro-optimizations and perfect scores. Fix the big things and move on.
- Set a performance budget before designing, and check it in CI after launch.

## Want someone to look at yours

Most Vegas sites I audit are failing on two or three specific things, and the fixes take days rather than a rebuild.

Have a look at how I approach [development](/services/development) and [development work in Las Vegas](/las-vegas/development), or [book a 15-minute call](/book-a-call) and I will pull your Search Console data up with you. If your traffic is mostly local search, pair this with [local SEO for Vegas service businesses](/blog/local-seo-for-vegas-service-businesses) — speed and local visibility compound.
