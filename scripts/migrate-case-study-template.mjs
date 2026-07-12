import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../content/case-studies");

function workSection(title, figures) {
  const figureHtml = figures
    .map(
      ({ num, image, alt, label, caption }) => `
            <figure class="case-study-visual">
              <img src="../images/${image}" loading="lazy" alt="${alt}" class="image-one-window">
              <figcaption><span>${num}</span><strong>${label}</strong> — ${caption}</figcaption>
            </figure>`
    )
    .join("");

  return `<section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">The Work</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">${title}</p>
              </div>
            </div>${figureHtml}
          </div>
        </div>
      </section>`;
}

function involvementSection(text) {
  return `<section class="section u-p-40-hero">
        <div class="container">
          <p class="text-paragraph u-extra-bold margin-19">Our Involvement:</p>
          <p class="text-paragraph u-text-gray">${text}</p>
        </div>
      </section>`;
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

function buildFile(entry) {
  const fm = entry.frontmatter;
  const lines = [
    "---",
    `title: ${yamlQuote(fm.title)}`,
    `description: ${yamlQuote(fm.description)}`,
    `client: ${yamlQuote(fm.client)}`,
    `ogImage: ${yamlQuote(fm.ogImage)}`,
    "caseStudy:",
    `  eyebrow: ${yamlQuote(fm.caseStudy.eyebrow)}`,
    `  headline: ${yamlQuote(fm.caseStudy.headline)}`,
    `  summary: ${yamlQuote(fm.caseStudy.summary)}`,
    `  industry: ${yamlQuote(fm.caseStudy.industry)}`,
    `  engagement: ${yamlQuote(fm.caseStudy.engagement)}`,
    `  role: ${yamlQuote(fm.caseStudy.role)}`,
    "  services:",
    ...fm.caseStudy.services.map((s) => `    - ${yamlQuote(s)}`),
    `  challengeTitle: ${yamlQuote(fm.caseStudy.challengeTitle)}`,
    `  challenge: ${yamlQuote(fm.caseStudy.challenge)}`,
    `  approachTitle: ${yamlQuote(fm.caseStudy.approachTitle)}`,
    `  approach: ${yamlQuote(fm.caseStudy.approach)}`,
    "  outcomes:",
    ...fm.caseStudy.outcomes.map((s) => `    - ${yamlQuote(s)}`),
    "  deliverables:",
    ...fm.caseStudy.deliverables.map((s) => `    - ${yamlQuote(s)}`),
    `  resultSummary: ${yamlQuote(fm.caseStudy.resultSummary)}`,
    `  ctaHeadline: ${yamlQuote(fm.caseStudy.ctaHeadline)}`,
    "---",
    "",
    involvementSection(entry.involvement),
    workSection(entry.workTitle, entry.figures),
    "",
  ];

  return lines.join("\n");
}

const CASE_STUDIES = [
  {
    slug: "safefaces",
    involvement:
      "SafeFaces spans branding, product design, web, and iOS — a full-stack creative partnership to bring a safety-focused product to market with clarity and trust built into every touchpoint.",
    workTitle: "A safety product built for trust at every touchpoint",
    figures: [
      {
        num: "01",
        image: "Group-47654-1.jpg",
        alt: "SafeFaces brand and product overview",
        label: "Brand system",
        caption:
          "Identity, product UI, and marketing work share one visual language so the product feels credible from first impression through daily use.",
      },
      {
        num: "02",
        image: "Frame-47417_1.avif",
        alt: "SafeFaces responsive website design",
        label: "Web experience",
        caption:
          "The site explains the product clearly while supporting conversion paths for users evaluating a safety-focused platform.",
      },
      {
        num: "03",
        image: "Group-47633_1.avif",
        alt: "SafeFaces interface and product design details",
        label: "Product design",
        caption:
          "Interface patterns scale across web and mobile without losing the clarity users need in a safety context.",
      },
    ],
    frontmatter: {
      title: "SafeFaces Case Study | Branding, Design & Product",
      description:
        "How BLURRD helped SafeFaces launch a safety-focused product with cohesive branding, product design, website, and iOS experience.",
      client: "SafeFaces",
      ogImage: "/images/Group-47654-1.jpg",
      caseStudy: {
        eyebrow: "SafeFaces · Safety Product",
        headline:
          "Building a safety-focused product buyers can understand and trust.",
        summary:
          "SafeFaces needed more than a logo and landing page. The team needed a full creative partner to shape brand identity, product design, web, and iOS into one coherent experience that earns trust quickly.",
        industry: "Safety & consumer product",
        engagement: "Brand identity + product design + web + iOS",
        role: "End-to-end brand and product partner",
        services: [
          "Brand identity",
          "Product UX and UI design",
          "Website design",
          "iOS app design",
          "Design system",
        ],
        challengeTitle: "Launch a new product category with credibility.",
        challenge:
          "Safety products live or die on trust. SafeFaces needed to communicate reliability and clarity across brand, marketing, and product without feeling clinical or overwhelming.",
        approachTitle: "Unify brand, product, and go-to-market design.",
        approach:
          "We built one visual and UX system across web and mobile — prioritizing clarity in messaging, confidence in the interface, and consistency in every customer touchpoint.",
        outcomes: [
          "A cohesive brand that reads trustworthy across web and product.",
          "A product experience designed for clarity in high-stakes moments.",
          "A scalable design foundation for web, iOS, and future marketing.",
        ],
        deliverables: [
          "Brand identity system",
          "Product UX/UI",
          "Marketing website",
          "iOS interface design",
          "Reusable design components",
        ],
        resultSummary:
          "SafeFaces launched with a unified experience — not a collection of separate assets — giving the team a stronger foundation to earn user trust from day one.",
        ctaHeadline: "Launching a Product That Needs Trust?",
      },
    },
  },
  {
    slug: "shipnetwork",
    involvement:
      "Rakuten Super Logistics became ShipNetwork in August 2022 — a full rebrand, new logo, and website redesign under a tight timeline. BLURRD led the creative and web work so the sales team could keep generating leads without interruption.",
    workTitle: "Rebrand and relaunch under deadline pressure",
    figures: [
      {
        num: "01",
        image: "Group-47629_1.avif",
        alt: "ShipNetwork homepage after rebrand",
        label: "Brand relaunch",
        caption:
          "A new identity and homepage gave ShipNetwork a credible first impression the moment Rakuten Super Logistics transitioned off the market.",
      },
      {
        num: "02",
        image: "Frame-47407_1.avif",
        alt: "ShipNetwork website design screens",
        label: "Conversion-focused pages",
        caption:
          "Key service and sales pages were rebuilt to support lead generation while the rebrand rolled out company-wide.",
      },
      {
        num: "03",
        image: "Group-47631_1.avif",
        alt: "ShipNetwork responsive web design",
        label: "Scalable web system",
        caption:
          "Reusable layouts helped the marketing team ship pages quickly during a compressed two-month timeline.",
      },
    ],
    frontmatter: {
      title: "ShipNetwork Case Study | Rebrand & Website",
      description:
        "How BLURRD rebranded Rakuten Super Logistics into ShipNetwork and launched a new website in under two months.",
      client: "ShipNetwork",
      ogImage: "/images/Group-47629_1.avif",
      caseStudy: {
        eyebrow: "ShipNetwork · Logistics",
        headline:
          "Rebranding a logistics company without losing momentum in market.",
        summary:
          "When Rakuten Super Logistics became ShipNetwork, the business could not pause. BLURRD delivered a full rebrand and website redesign in under two months so sales could keep moving.",
        industry: "Logistics & fulfillment",
        engagement: "Rebrand + website redesign",
        role: "Brand and web partner",
        services: [
          "Rebrand strategy",
          "Logo and identity",
          "Website redesign",
          "Responsive UI",
          "Launch support",
        ],
        challengeTitle: "Rebrand fast without breaking the sales pipeline.",
        challenge:
          "The company had to stop operating as Rakuten Super Logistics immediately. Marketing needed a new name, identity, and website before leads could stall or brand confusion set in.",
        approachTitle: "Prioritize clarity, speed, and sales-ready pages.",
        approach:
          "We focused on the highest-impact brand and web assets first — identity, homepage, and core conversion pages — then built a system the internal team could extend after launch.",
        outcomes: [
          "A complete rebrand delivered inside a two-month window.",
          "A website ready to support lead generation from day one.",
          "A visual system the marketing team could extend post-launch.",
        ],
        deliverables: [
          "New brand identity",
          "Logo suite",
          "Website redesign",
          "Responsive page templates",
          "Launch-ready marketing pages",
        ],
        resultSummary:
          "ShipNetwork entered the market with a credible new identity and a website built to keep sales moving through a major business transition.",
        ctaHeadline: "Rebranding Under a Hard Deadline?",
      },
    },
  },
  {
    slug: "rakuten",
    involvement:
      "We played a significant role in building and scaling Rakuten's website — improving usability, performance, and SEO while managing cross-functional web projects from ideation through deployment.",
    workTitle: "Scaling a high-traffic Webflow platform",
    figures: [
      {
        num: "01",
        image: "Rectangle-2037-1_1.avif",
        alt: "Rakuten website homepage design",
        label: "Platform experience",
        caption:
          "A refined site structure helps users and internal teams navigate a large content ecosystem with less friction.",
      },
      {
        num: "02",
        image: "MacBook-Air-2022-2_1.avif",
        alt: "Rakuten responsive website layouts",
        label: "Responsive system",
        caption:
          "Layouts adapt cleanly across breakpoints so marketing content stays consistent on every device.",
      },
      {
        num: "03",
        image: "iPhone-16-1_1.avif",
        alt: "Rakuten mobile website design",
        label: "Mobile performance",
        caption:
          "Mobile-first patterns keep key journeys fast and readable for users on the go.",
      },
    ],
    frontmatter: {
      title: "Rakuten Case Study | Web Development & CMS",
      description:
        "How BLURRD helped Rakuten build, scale, and optimize a high-traffic Webflow website with stronger performance and SEO.",
      client: "Rakuten",
      ogImage: "/images/Frame-47318-2_1.avif",
      caseStudy: {
        eyebrow: "Rakuten · Enterprise Web",
        headline:
          "Scaling a complex Webflow platform for performance, SEO, and growth.",
        summary:
          "Rakuten needed a web platform that could keep pace with marketing, product, and regional teams — without sacrificing speed, usability, or maintainability.",
        industry: "E-commerce & logistics",
        engagement: "Webflow development + CMS",
        role: "Web platform partner",
        services: [
          "Webflow development",
          "CMS architecture",
          "Performance optimization",
          "SEO improvements",
          "Cross-functional project leadership",
        ],
        challengeTitle: "Keep a large site fast, usable, and easy to manage.",
        challenge:
          "Enterprise websites break when content, campaigns, and stakeholders move faster than the platform. Rakuten needed better performance, clearer workflows, and a CMS teams could actually use.",
        approachTitle: "Build for scale, speed, and internal alignment.",
        approach:
          "We improved site architecture, tightened performance, and established documentation and processes so marketing and product teams could ship with confidence.",
        outcomes: [
          "Stronger site performance across key marketing pages.",
          "Better SEO foundations for discoverability and growth.",
          "Clearer workflows for cross-functional web updates.",
        ],
        deliverables: [
          "Webflow CMS structure",
          "Performance improvements",
          "SEO enhancements",
          "Project documentation",
          "Responsive page system",
        ],
        resultSummary:
          "Rakuten gained a more scalable web platform — one that supports ongoing marketing velocity without sacrificing speed or usability.",
        ctaHeadline: "Need Enterprise Webflow at Scale?",
      },
    },
  },
  {
    slug: "firstmile",
    involvement:
      "FirstMile.com was slow, clunky, and difficult to use. We migrated the site from WordPress to Webflow, rebuilt the experience with a cleaner layout, and dramatically improved performance, SEO, and usability.",
    workTitle: "WordPress to Webflow migration",
    figures: [
      {
        num: "01",
        image: "Frame-47291_1.avif",
        alt: "FirstMile homepage after Webflow migration",
        label: "New homepage",
        caption:
          "A cleaner hierarchy helps users understand services faster while giving the brand a more modern first impression.",
      },
      {
        num: "02",
        image: "Frame-47404_1.avif",
        alt: "FirstMile website page designs",
        label: "Service pages",
        caption:
          "Core pages were rebuilt for clarity and conversion, replacing the friction of the old WordPress experience.",
      },
      {
        num: "03",
        image: "Group-47628_1.avif",
        alt: "FirstMile responsive website system",
        label: "Performance lift",
        caption:
          "The Webflow rebuild delivered a faster, easier-to-manage platform for the internal marketing team.",
      },
    ],
    frontmatter: {
      title: "FirstMile Case Study | WordPress to Webflow Migration",
      description:
        "How BLURRD migrated FirstMile from WordPress to Webflow and improved performance, SEO, and user experience.",
      client: "FirstMile",
      ogImage: "/images/Frame-47315_1.avif",
      caseStudy: {
        eyebrow: "FirstMile · Shipping & Logistics",
        headline:
          "Replacing a slow WordPress site with a fast, manageable Webflow platform.",
        summary:
          "FirstMile's old site was holding the business back. BLURRD migrated the platform to Webflow and rebuilt the experience for speed, clarity, and long-term marketing agility.",
        industry: "Shipping & logistics",
        engagement: "Website migration + redesign",
        role: "Web migration and design partner",
        services: [
          "WordPress to Webflow migration",
          "UX and page redesign",
          "Performance optimization",
          "SEO improvements",
          "CMS setup",
        ],
        challengeTitle: "Fix a site that was slow for users and painful to manage.",
        challenge:
          "The WordPress site was clunky for visitors and the internal team. Marketing needed a faster platform they could update without fighting plugins, bloat, or performance issues.",
        approachTitle: "Migrate fast, then redesign for clarity and speed.",
        approach:
          "We used Webflow's migration tooling to move efficiently, then rebuilt key templates with a cleaner layout inspired by best-in-class SaaS and commerce experiences.",
        outcomes: [
          "A significantly faster site experience for users.",
          "Improved SEO and page performance after migration.",
          "A CMS the marketing team could manage with confidence.",
        ],
        deliverables: [
          "Webflow migration",
          "Page redesign",
          "Responsive templates",
          "SEO setup",
          "CMS training-ready structure",
        ],
        resultSummary:
          "FirstMile moved from a bloated WordPress stack to a fast Webflow platform built for marketing velocity and better user experience.",
        ctaHeadline: "Stuck on a Slow WordPress Site?",
      },
    },
  },
  {
    slug: "freedom-tax-strategies",
    involvement:
      "BLURRD partnered with Freedom Tax Strategies to design and develop their Webflow site, integrate HubSpot forms for lead capture, and establish an SEO foundation for long-term growth.",
    workTitle: "Conversion-focused site with HubSpot integration",
    figures: [
      {
        num: "01",
        image: "Group-47617_1.avif",
        alt: "Freedom Tax Strategies homepage",
        label: "Homepage",
        caption:
          "The homepage introduces services clearly and routes visitors toward consultation and onboarding flows.",
      },
      {
        num: "02",
        image: "Frame-47397-1_1.avif",
        alt: "Freedom Tax Strategies service page design",
        label: "Service pages",
        caption:
          "Structured service content helps prospects understand offerings before they reach out.",
      },
      {
        num: "03",
        image: "Frame-47400_1.avif",
        alt: "Freedom Tax Strategies responsive website",
        label: "Lead capture",
        caption:
          "Custom HubSpot forms connect marketing pages directly to the firm's client intake workflow.",
      },
    ],
    frontmatter: {
      title: "Freedom Tax Strategies Case Study | Webflow & HubSpot",
      description:
        "How BLURRD built Freedom Tax Strategies' Webflow site with HubSpot integration and SEO foundations for growth.",
      client: "Freedom Tax Strategies",
      ogImage: "/images/Frame-47361_1.avif",
      caseStudy: {
        eyebrow: "Freedom Tax Strategies · Financial Services",
        headline:
          "A professional web presence built to capture leads and earn client trust.",
        summary:
          "Freedom Tax Strategies needed a modern site that looked credible, converted visitors, and connected cleanly to their sales workflow from day one.",
        industry: "Tax & financial services",
        engagement: "Website + HubSpot + SEO",
        role: "Web design and integration partner",
        services: [
          "Webflow design and development",
          "HubSpot form integration",
          "Conversion-focused UX",
          "SEO foundation",
          "Responsive design",
        ],
        challengeTitle: "Look credible online and convert the right leads.",
        challenge:
          "Professional services sites fail when they feel generic or make it hard to take the next step. Freedom Tax Strategies needed trust, clarity, and a reliable lead capture system.",
        approachTitle: "Design for trust, then wire it to HubSpot.",
        approach:
          "We built a clean, authoritative site experience and integrated HubSpot forms so marketing pages connected directly to the firm's intake process.",
        outcomes: [
          "A polished site that reflects professional credibility.",
          "Streamlined lead capture through HubSpot integration.",
          "SEO foundations in place from launch.",
        ],
        deliverables: [
          "Webflow website",
          "HubSpot form integration",
          "Service page templates",
          "SEO setup",
          "Responsive UI",
        ],
        resultSummary:
          "Freedom Tax Strategies launched with a site built to earn trust, capture leads, and support long-term search visibility.",
        ctaHeadline: "Need a Site That Converts?",
      },
    },
  },
  {
    slug: "glass-cactus-marketing",
    involvement:
      "BLURRD developed Glass Cactus Marketing's Webflow site in close collaboration with their design team — turning static concepts into a responsive, animated, high-performance website with SEO foundations.",
    workTitle: "Design-to-Webflow build with motion",
    figures: [
      {
        num: "01",
        image: "Frame-47364-1_1.avif",
        alt: "Glass Cactus Marketing homepage",
        label: "Homepage",
        caption:
          "The homepage brings the agency's visual style to life with responsive layouts and polished motion.",
      },
      {
        num: "02",
        image: "Group-47621_1.avif",
        alt: "Glass Cactus Marketing page designs",
        label: "Page system",
        caption:
          "Reusable templates help the team publish new work and service content without breaking the design system.",
      },
      {
        num: "03",
        image: "Rectangle-2092_1.avif",
        alt: "Glass Cactus Marketing interface details",
        label: "Motion and detail",
        caption:
          "Animations and interaction details translate the original design intent into a live Webflow experience.",
      },
    ],
    frontmatter: {
      title: "Glass Cactus Marketing Case Study | Webflow Development",
      description:
        "How BLURRD built Glass Cactus Marketing's Webflow site from their design team's concepts with animation and SEO.",
      client: "Glass Cactus Marketing",
      ogImage: "/images/Frame-47364-1_1.avif",
      caseStudy: {
        eyebrow: "Glass Cactus Marketing · Agency",
        headline:
          "Turning an agency's design vision into a high-performance Webflow site.",
        summary:
          "Glass Cactus Marketing had strong design direction — they needed a development partner who could preserve the details, add motion, and launch a site optimized for growth.",
        industry: "Marketing agency",
        engagement: "Webflow development + SEO",
        role: "Design-to-development partner",
        services: [
          "Webflow development",
          "Responsive implementation",
          "Animation and interaction",
          "SEO foundation",
          "Design collaboration",
        ],
        challengeTitle: "Preserve design quality in a live Web build.",
        challenge:
          "Agency sites often lose fidelity when they move from Figma to production. Glass Cactus needed a partner who could honor the design team's intent without sacrificing performance.",
        approachTitle: "Build closely with the design team, detail by detail.",
        approach:
          "We collaborated directly with their designers to implement responsive layouts, smooth animations, and a Webflow system ready for ongoing updates.",
        outcomes: [
          "A live site that matches the original design intent.",
          "Smooth animations without sacrificing performance.",
          "SEO foundations established from launch.",
        ],
        deliverables: [
          "Webflow build",
          "Responsive templates",
          "Interaction implementation",
          "SEO setup",
          "CMS-ready structure",
        ],
        resultSummary:
          "Glass Cactus Marketing launched a site that feels as intentional live as it did in design — with the performance and SEO foundations to support growth.",
        ctaHeadline: "Have Designs That Need a Better Build?",
      },
    },
  },
  {
    slug: "prcl-world",
    involvement:
      "BLURRD collaborated with PRCL World to design and develop a modern Webflow site that showcases their brand, supports growth, and launches with a strong SEO foundation.",
    workTitle: "Brand-forward Webflow experience",
    figures: [
      {
        num: "01",
        image: "Frame-47349-1_1.avif",
        alt: "PRCL World homepage design",
        label: "Homepage",
        caption:
          "The homepage introduces PRCL World's brand with a bold, modern layout built for discovery and engagement.",
      },
      {
        num: "02",
        image: "Frame-47417_1.avif",
        alt: "PRCL World website page designs",
        label: "Content pages",
        caption:
          "Interior pages extend the brand system while keeping information easy to scan and share.",
      },
      {
        num: "03",
        image: "Group-47635_1.avif",
        alt: "PRCL World responsive website design",
        label: "Responsive system",
        caption:
          "A flexible layout system keeps the experience polished across desktop, tablet, and mobile.",
      },
    ],
    frontmatter: {
      title: "PRCL World Case Study | Webflow Design & SEO",
      description:
        "How BLURRD designed and developed PRCL World's Webflow site with SEO foundations for visibility and growth.",
      client: "PRCL World",
      ogImage: "/images/Frame-47349_1.avif",
      caseStudy: {
        eyebrow: "PRCL World · Brand & Media",
        headline:
          "Launching a brand-forward website built for visibility and growth.",
        summary:
          "PRCL World needed a site that could showcase the brand with energy and credibility while giving the team a platform they could grow over time.",
        industry: "Brand & media",
        engagement: "Website design + SEO",
        role: "Brand web partner",
        services: [
          "Webflow design",
          "Webflow development",
          "Brand web experience",
          "SEO foundation",
          "Responsive UI",
        ],
        challengeTitle: "Make the brand feel alive online from day one.",
        challenge:
          "PRCL World needed more than a brochure site. The experience had to feel distinctive, perform well, and support discoverability as the brand expanded.",
        approachTitle: "Design for impact, then optimize for search.",
        approach:
          "We built a visually strong Webflow experience with reusable templates and SEO fundamentals so the site could perform at launch and scale afterward.",
        outcomes: [
          "A distinctive brand presence online from launch.",
          "A flexible site structure for future content and campaigns.",
          "SEO foundations in place for long-term visibility.",
        ],
        deliverables: [
          "Webflow website",
          "Brand page templates",
          "Responsive design system",
          "SEO setup",
          "Launch-ready content structure",
        ],
        resultSummary:
          "PRCL World launched with a site that matches the ambition of the brand — built to grow, not just go live.",
        ctaHeadline: "Launching a Brand That Needs Impact?",
      },
    },
  },
  {
    slug: "how-much",
    involvement:
      "BLURRD partnered with How Much – Air & Home Improvements to create a professional logo and brand identity, design and develop their Webflow site, and establish an SEO foundation for lead generation.",
    workTitle: "Brand identity and lead-ready website",
    figures: [
      {
        num: "01",
        image: "Frame-47413-1_1.avif",
        alt: "How Much brand and homepage design",
        label: "Brand launch",
        caption:
          "Logo, identity, and homepage work together to present a trustworthy local service brand online.",
      },
      {
        num: "02",
        image: "Frame-47407-2_1.avif",
        alt: "How Much service page website design",
        label: "Service pages",
        caption:
          "Service content is structured to help homeowners understand offerings and request quotes quickly.",
      },
      {
        num: "03",
        image: "Group-47629-1_1.avif",
        alt: "How Much responsive website design",
        label: "Lead generation",
        caption:
          "Clear calls to action and SEO foundations help the site attract and convert local search traffic.",
      },
    ],
    frontmatter: {
      title: "How Much Case Study | Brand Identity & Web Design",
      description:
        "How BLURRD created How Much's brand identity, Webflow website, and SEO foundation for local lead generation.",
      client: "How Much",
      ogImage: "/images/Frame-47327-3_1.avif",
      caseStudy: {
        eyebrow: "How Much · Home Services",
        headline:
          "Giving a local services brand the credibility to win more leads online.",
        summary:
          "How Much – Air & Home Improvements needed a professional identity and website that could compete locally, explain services clearly, and convert search traffic into inquiries.",
        industry: "Air & home improvements",
        engagement: "Brand identity + website + SEO",
        role: "Brand and web partner",
        services: [
          "Logo and brand identity",
          "Webflow website",
          "Service page design",
          "SEO foundation",
          "Lead-focused UX",
        ],
        challengeTitle: "Look established online in a competitive local market.",
        challenge:
          "Home services buyers choose fast — often based on trust signals alone. How Much needed branding and a website that felt credible before the first phone call.",
        approachTitle: "Build trust first, then optimize for local search.",
        approach:
          "We created a clean identity and Webflow site with service-focused pages and SEO fundamentals designed to support local lead generation.",
        outcomes: [
          "A professional brand that reads trustworthy to local buyers.",
          "A website structured to drive quote requests and calls.",
          "SEO foundations supporting long-term local visibility.",
        ],
        deliverables: [
          "Logo and brand identity",
          "Webflow website",
          "Service page templates",
          "SEO setup",
          "Conversion-focused homepage",
        ],
        resultSummary:
          "How Much launched with a brand and website built to compete locally — clear, credible, and ready to generate leads.",
        ctaHeadline: "Need a Local Brand That Converts?",
      },
    },
  },
  {
    slug: "stronghold-ac",
    involvement:
      "BLURRD worked with Stronghold HVAC to design and develop a modern, conversion-focused Webflow site and establish an SEO foundation for local search success in Southern California.",
    workTitle: "Local HVAC site built to convert",
    figures: [
      {
        num: "01",
        image: "Frame-47411-1_1.avif",
        alt: "Stronghold HVAC homepage design",
        label: "Homepage",
        caption:
          "The homepage communicates services and service area quickly for homeowners searching for HVAC help.",
      },
      {
        num: "02",
        image: "Frame-47408-1_1.avif",
        alt: "Stronghold HVAC service page design",
        label: "Service pages",
        caption:
          "Dedicated service pages help prospects understand offerings and take action with confidence.",
      },
      {
        num: "03",
        image: "Group-47631-1_1.avif",
        alt: "Stronghold HVAC responsive website",
        label: "Local SEO ready",
        caption:
          "The site structure supports local search visibility across Southern California service areas.",
      },
    ],
    frontmatter: {
      title: "Stronghold HVAC Case Study | Web Design & SEO",
      description:
        "How BLURRD designed Stronghold HVAC's conversion-focused Webflow site and built an SEO foundation for local visibility.",
      client: "Stronghold HVAC",
      ogImage: "/images/Frame-47333-1_1.avif",
      caseStudy: {
        eyebrow: "Stronghold HVAC · Home Services",
        headline:
          "A conversion-focused HVAC website built for local search and trust.",
        summary:
          "Stronghold HVAC needed a site that looked professional, explained services clearly, and helped the business show up when local customers searched for help.",
        industry: "HVAC & home services",
        engagement: "Website design + SEO",
        role: "Web design and SEO partner",
        services: [
          "Webflow design",
          "Webflow development",
          "Conversion-focused UX",
          "Local SEO foundation",
          "Service page architecture",
        ],
        challengeTitle: "Win local customers in a crowded service market.",
        challenge:
          "HVAC buyers often choose the company that looks most credible and makes it easiest to request service. Stronghold needed a site that could compete on both fronts.",
        approachTitle: "Design for clarity, urgency, and local discovery.",
        approach:
          "We built a clean Webflow experience with strong service pages, clear calls to action, and SEO fundamentals aimed at local search performance.",
        outcomes: [
          "A professional site that supports service inquiries.",
          "Clear service messaging for faster buyer decisions.",
          "SEO foundations for local search visibility.",
        ],
        deliverables: [
          "Webflow website",
          "Service page templates",
          "Local SEO setup",
          "Responsive UI",
          "Conversion-focused homepage",
        ],
        resultSummary:
          "Stronghold HVAC launched with a site built to earn trust locally and convert visitors searching for HVAC help.",
        ctaHeadline: "Need a Local Service Site That Converts?",
      },
    },
  },
  {
    slug: "elk",
    involvement:
      "ELK wanted to move away from WordPress bloat and maintenance overhead. BLURRD migrated the site to Webflow so the team could publish faster and take advantage of built-in SEO capabilities.",
    workTitle: "WordPress to Webflow for a marketing team",
    figures: [
      {
        num: "01",
        image: "MacBook-Pro-18_1.avif",
        alt: "Elk Marketing website homepage",
        label: "New platform",
        caption:
          "The Webflow rebuild gave ELK a cleaner publishing workflow and a faster site experience.",
      },
      {
        num: "02",
        image: "Rectangle-2117_1.avif",
        alt: "Elk Marketing page designs",
        label: "Content flexibility",
        caption:
          "Marketing pages are easier to create and update without plugin overhead or maintenance drag.",
      },
      {
        num: "03",
        image: "Frame-47265_1.avif",
        alt: "Elk Marketing responsive website design",
        label: "Performance gains",
        caption:
          "A lighter stack improves load times and gives the team more confidence shipping new pages.",
      },
    ],
    frontmatter: {
      title: "Elk Case Study | WordPress to Webflow Migration",
      description:
        "How BLURRD migrated Elk from WordPress to Webflow to improve performance, publishing speed, and SEO.",
      client: "Elk",
      ogImage: "/images/Frame-47400_1.avif",
      caseStudy: {
        eyebrow: "Elk · Marketing Technology",
        headline:
          "Replacing WordPress maintenance with a faster Webflow publishing workflow.",
        summary:
          "ELK was ready to leave WordPress behind. BLURRD migrated the platform to Webflow so the marketing team could ship pages faster with less technical overhead.",
        industry: "Marketing technology",
        engagement: "Website migration + redesign",
        role: "Web migration partner",
        services: [
          "WordPress to Webflow migration",
          "Webflow development",
          "CMS setup",
          "Performance optimization",
          "SEO improvements",
        ],
        challengeTitle: "Escape plugin bloat and slow publishing cycles.",
        challenge:
          "WordPress had become a maintenance burden. ELK needed a platform that was easier to manage, faster for users, and better suited to ongoing marketing updates.",
        approachTitle: "Migrate, simplify, and optimize for marketing velocity.",
        approach:
          "We moved ELK to Webflow with a cleaner page system and SEO-friendly structure so the team could publish without fighting the stack.",
        outcomes: [
          "Faster page publishing for the marketing team.",
          "Reduced maintenance overhead from plugins and legacy tooling.",
          "Improved site performance and SEO readiness.",
        ],
        deliverables: [
          "Webflow migration",
          "Page template system",
          "CMS configuration",
          "Performance improvements",
          "SEO setup",
        ],
        resultSummary:
          "ELK moved to a platform that supports marketing speed — not constant maintenance — with a better experience for users and editors alike.",
        ctaHeadline: "Ready to Leave WordPress Behind?",
      },
    },
  },
  {
    slug: "dubmans",
    involvement:
      "BLURRD collaborated with DUBMANS to create a distinctive logo and brand identity, design and develop their Webflow site, and establish an SEO foundation for long-term growth.",
    workTitle: "Brand identity and Webflow launch",
    figures: [
      {
        num: "01",
        image: "Group-47621-1_1.avif",
        alt: "DUBMANS brand and homepage design",
        label: "Brand identity",
        caption:
          "Logo and visual direction give DUBMANS a distinctive presence before visitors explore the rest of the site.",
      },
      {
        num: "02",
        image: "Frame-47400-1_1.avif",
        alt: "DUBMANS website page designs",
        label: "Web experience",
        caption:
          "The Webflow build balances clean visuals with straightforward navigation and strong brand consistency.",
      },
      {
        num: "03",
        image: "Frame-47398-1_1.avif",
        alt: "DUBMANS responsive website design",
        label: "Launch-ready system",
        caption:
          "Reusable templates and SEO foundations give the team room to grow the site after launch.",
      },
    ],
    frontmatter: {
      title: "DUBMANS Case Study | Brand Identity & Webflow",
      description:
        "How BLURRD built DUBMANS' brand identity, Webflow website, and SEO foundation for launch.",
      client: "DUBMANS",
      ogImage: "/images/Frame-47386.svg",
      caseStudy: {
        eyebrow: "DUBMANS · Brand Launch",
        headline:
          "Launching a new brand with identity, web, and SEO built together.",
        summary:
          "DUBMANS needed a partner who could shape the brand and bring it to life online — not hand off a logo and walk away.",
        industry: "Consumer brand",
        engagement: "Brand identity + website + SEO",
        role: "Brand and web launch partner",
        services: [
          "Logo and brand identity",
          "Webflow design",
          "Webflow development",
          "SEO foundation",
          "Responsive UI",
        ],
        challengeTitle: "Launch with a brand that feels complete, not rushed.",
        challenge:
          "New brands often launch with mismatched assets — a logo here, a website there, no system holding it together. DUBMANS needed one cohesive launch.",
        approachTitle: "Build identity and web as one system.",
        approach:
          "We developed the brand and Webflow site together so visual direction, page design, and SEO foundations launched as a unified experience.",
        outcomes: [
          "A cohesive brand presence from logo through website.",
          "A Webflow site the team can extend after launch.",
          "SEO foundations supporting early visibility.",
        ],
        deliverables: [
          "Logo and brand identity",
          "Webflow website",
          "Page templates",
          "SEO setup",
          "Launch-ready creative assets",
        ],
        resultSummary:
          "DUBMANS launched with a brand and website that feel intentional together — giving the team a stronger starting point for growth.",
        ctaHeadline: "Launching a New Brand?",
      },
    },
  },
];

for (const entry of CASE_STUDIES) {
  const filePath = path.join(outDir, `${entry.slug}.md`);
  fs.writeFileSync(filePath, buildFile(entry));
  console.log("Wrote", entry.slug);
}

console.log(`Done — migrated ${CASE_STUDIES.length} case studies.`);
