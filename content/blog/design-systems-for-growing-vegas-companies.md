---
title: "Design Systems for Growing Vegas Companies"
description: "A design system is not a Figma library you never open. Here is the small, practical version I build for Las Vegas companies — what goes in it, what to skip, and how it pays for itself by page four."
date: "2026-10-19"
category: "Design"
tags: ["las-vegas", "design-systems", "design", "frontend-architecture", "workflow"]
author: "Milton Amaya"
ogImage: "/images/blog/design-systems-for-growing-vegas-companies-og.png"
faqs:
  - question: "How big does a company need to be before a design system is worth it?"
    answer: "Smaller than most people think. If two people touch your site or product, or if you publish more than one landing page a quarter, a light system already pays off. You do not need a full component library — you need tokens, a type scale, and a handful of agreed patterns."
  - question: "What is the difference between a style guide and a design system?"
    answer: "A style guide describes how things should look. A design system is the actual working set of tokens, components, and rules that both design and code pull from. One is a document, the other is infrastructure."
  - question: "Can you build a design system on top of our existing brand?"
    answer: "Yes, and that is usually the right move. We take your existing brand and turn it into tokens, a type scale, and component rules. If the brand itself is inconsistent, we tighten it as part of the process rather than starting over."
  - question: "Do design systems slow down the first project?"
    answer: "Slightly, and then they speed up everything after. The first page costs a bit more because you are also defining the rules. Page four onward is dramatically faster, which is where the return shows up."
  - question: "Who maintains the system after launch?"
    answer: "Whoever ships most often. In small teams that is usually one developer plus one designer with a shared changelog. The system needs an owner or it drifts within a quarter."
  - question: "Does a design system work with Webflow or only with code?"
    answer: "Both. Webflow has variables and classes you can structure like tokens. The discipline matters more than the tool — the failure mode in Webflow is 400 one-off classes, and a system prevents that."
---

## The second page is where it hurts

Nobody has ever regretted their first page.

The first page is fun. You pick type, you pick color, you make it look good, you ship it. Everyone is happy. Then marketing needs a landing page for a campaign, and the developer building it has to guess. Is the heading the same size as the homepage or smaller? Which blue is the real blue? Do buttons have that shadow or not?

They guess. It ships. It is 85 percent right. Do that eight more times and now you have a website where every page is a slightly different interpretation of your brand, and nobody can point to which one is correct.

That is the actual problem a design system solves. Not "consistency" as an abstract virtue — the very concrete cost of every person on your team re-deciding the same thing every time they build something.

I work with a lot of companies here in Las Vegas going through exactly this transition: past the scrappy stage, real revenue, a small team, and a website that is starting to fight them. This is the version of a design system I actually build for them.

![Design systems for growing Las Vegas companies](/images/blog/design-systems-for-growing-vegas-companies-og.png)

## Start absurdly small

The thing that kills design systems is scope. Someone reads about how a large tech company does it, tries to build that, and six weeks later there is a beautiful Figma library nobody has opened since.

Here is what I actually start with. Three things.

**A type scale.** Not "we use Inter." An actual scale — how many sizes exist, what line height each one gets, what weight, and what each one is for. Five or six steps is plenty. The rule that matters: if a size is not in the scale, it does not exist.

**Color roles, not color names.** This is the one people skip and regret. Do not document "brand blue, dark gray, light gray." Document *roles*: surface, elevated surface, border, primary text, muted text, brand, brand hover, focus ring. Roles survive a rebrand. Names do not.

**Spacing as a fixed set.** Pick a scale and stick to it. When spacing is arbitrary, every developer picks whatever looks right on their monitor, and your pages get subtly inconsistent rhythm that nobody can name but everybody feels.

That is it to start. Three decisions, one afternoon, and you have already eliminated the majority of the guessing.

## Tokens are the handshake

The reason those three things matter is that they are the handshake between design and code. Design names a thing, code uses the same name, and now a conversation about the site is unambiguous.

In practice that looks like CSS custom properties:

```css
/* from: src/app/globals.css */
:root {
  --surface: #0b0b0f;
  --surface-raised: #14141b;
  --border: #23232e;
  --text: #f4f4f6;
  --text-muted: #9a9aa8;
  --brand: #3b6cf6;
  --space-3: 1rem;
  --space-5: 2rem;
}
```

Small file. Enormous leverage. Two things become true the moment this exists.

First, dark mode or a theme variant stops being a redesign — it is a second block of variable values. Second, when the brand shifts, you change one file instead of hunting hex codes across 40 components. I have done the hunting version. It takes days and you still miss one.

The naming discipline is the whole trick. `--brand` not `--blue`. When the brand goes green next year, `--blue: green` is a joke you will not find funny at 11pm.

## Components: build the ones you repeat

Now the components. The mistake here is building a library of everything. Build the things you actually repeat.

For most growing companies that is a short list:

- **Button** — two variants, three states, one size unless you genuinely need two
- **Section wrapper** — handles vertical rhythm and max width so nobody sets padding by hand
- **Card** — one card that takes an image, eyebrow, heading, and body
- **Form field** — input, label, help text, error state, all together
- **CTA block** — the repeating conversion moment at the bottom of pages

Five components. That is a real system.

The rule I hold to: a component earns its place the third time you need it. Twice is a coincidence. Three times is a pattern. Building abstractions for things you have needed once is how you end up with a system more complicated than the pages it produces.

And every component needs its unhappy states defined, not just the pretty one. The long name that wraps to two lines. The missing image. The error message. Those states are where inconsistency actually shows up, because whoever hits them first invents a solution on the spot.

## Sections are the real unlock for marketing

Here is the piece that changes how a company operates, and it is the part most design system conversations miss.

Components help developers. **Composable page sections help everyone else.**

If your site is built from a set of sections — hero, feature row, logo strip, testimonial, stat band, FAQ, CTA — then a new landing page is picking sections and writing copy. Marketing does not file a ticket. Design does not mock up a new page. Someone assembles it in an hour and it looks correct because it was built from correct pieces.

That is the difference between a website that is a bottleneck and a website that is a tool. I made the shorter version of this argument in [design systems beat one-off pages](/blog/design-systems-beat-one-off-pages), and every project since has reinforced it.

Practical test for whether you have this: can your marketing lead ship a campaign landing page this week without a developer? If not, that is the gap, and it is more valuable to close than another component variant.

## Documentation people actually read

The word documentation makes everyone tired, and that is because most design system docs are written as a reference manual nobody opens.

The docs that get used are short and decision-shaped. For each component, three things: what it is for, when not to use it, and one example of correct usage. That is it. If a component needs three paragraphs of explanation, the component is too complicated.

The other half is a plain changelog. Not semantic versioning ceremony — a running list of what changed and why, in the repo, that a developer sees when they pull. "Removed the small button variant, use the default with the compact section wrapper instead." One line. Now nobody reintroduces the thing you just deleted.

I also keep one page that is just the tokens rendered visually. Every color role with its value, every type step at real size, every spacing increment as a bar. It takes an hour to build and it becomes the page everyone actually references, because it answers the question people have most often: which one is the right one.

What I have stopped doing is writing usage guidelines for things the code can enforce. If a button should never appear twice in the same section, that is better handled by how the section component is built than by a paragraph asking people nicely.

## Where systems drift

Systems do not fail at launch. They rot quietly. Here is how, in the order I see it happen.

**The one-off exception.** A campaign needs a slightly different hero. Someone adds a variant with a hardcoded value "just for this page." Reasonable. It never gets removed, and now there are two sources of truth.

**No owner.** Everybody uses the system, nobody maintains it. Within a quarter design and code have diverged and nobody knows which is right.

**Design and code out of sync.** Figma gets updated, code does not, or the reverse. Now the system is actively misleading, which is worse than not having one.

**Too many variants.** Every request gets a new option instead of a conversation about whether the existing pattern works. Eventually the system has so many choices that guessing is easier again, and you are back where you started with extra steps.

The fixes are unglamorous. One owner. A changelog anyone can read. A standing rule that new variants require a reason, and that reason gets written down. Quarterly cleanup where you delete what nobody used.

## What this looks like on a real timeline

For a company with an existing site and brand, here is roughly how it goes.

**Week one — audit.** I pull every page and inventory what exists. Every font size in use, every color, every button. This is always uncomfortable and always useful. The typical result is something like 14 font sizes where there should be six and nine grays where there should be three.

**Week two — define.** Tokens, type scale, spacing, color roles. Written down and implemented in code, not just in Figma. If it only lives in Figma it is not a system yet.

**Weeks three and four — build.** The core components and the section set, built against real content. Never lorem ipsum — real headlines break layouts in ways placeholder text never will.

**Ongoing — apply and prune.** Rebuild pages onto the system as you touch them. Do not stop everything for a big-bang migration. Migrate opportunistically and the system earns its keep as you go.

If you are also weighing whether the underlying stack is right, [Next.js vs Webflow for Las Vegas companies](/blog/nextjs-vs-webflow-las-vegas) covers that decision, because a system on the wrong platform is still going to feel like friction.

## Takeaways

- Three things get you most of the value: type scale, color roles, spacing scale.
- Name tokens by role, never by appearance. Roles survive rebrands.
- Build a component the third time you need it, not the first.
- Define unhappy states or your team will invent them inconsistently.
- Composable page sections are what let marketing move without engineering.
- Assign one owner and keep a changelog, or the system drifts in a quarter.

## Where to start

If your site currently has nine grays and four button styles, you do not need a six-week initiative. You need one afternoon of decisions and someone to put them in code.

Take a look at how I handle [design](/services/design) and [design work for Las Vegas companies](/las-vegas/design), or [book a 15-minute call](/book-a-call) and I will do the audit part with you live. It is usually pretty clear within twenty minutes where the guessing is happening.
