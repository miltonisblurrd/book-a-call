import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
  client?: string;
  projectLabel?: string;
  heroLogo?: string;
  involvement?: string;
  projectImages?: string[];
  testimonial?: {
    name: string;
    photo?: string;
    logo?: string;
    quote: string;
  };
  author?: string;
  titleTag?: string;
  metaDescription?: string;
  categorySlug?: string;
  faqs?: { question: string; answer: string }[];
  caseStudy?: {
    eyebrow?: string;
    headline: string;
    summary: string;
    industry: string;
    engagement: string;
    role: string;
    services: string[];
    challengeTitle?: string;
    challenge: string;
    approachTitle?: string;
    approach: string;
    outcomes: string[];
    deliverables: string[];
    resultSummary?: string;
    ctaHeadline?: string;
  };
  content: string;
};

function readMarkdownFiles(subdir: string): ContentItem[] {
  const dir = path.join(contentDirectory, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
   .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date,
        category: data.category,
        tags: data.tags,
        ogImage: data.ogImage,
        client: data.client,
        projectLabel: data.projectLabel,
        heroLogo: data.heroLogo,
        involvement: data.involvement,
        projectImages: data.projectImages,
        testimonial: data.testimonial,
        author: data.author,
        titleTag: data.titleTag,
        metaDescription: data.metaDescription,
        categorySlug: data.categorySlug,
        faqs: data.faqs,
        caseStudy: data.caseStudy,
        content,
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      return a.title.localeCompare(b.title);
    });
}

export function getAllPosts() {
  return readMarkdownFiles("blog");
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getRecentPosts(excludeSlug: string, limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}

export function getAllFaqs() {
  return readMarkdownFiles("faqs");
}

export function getFaqBySlug(slug: string) {
  return getAllFaqs().find((faq) => faq.slug === slug) || null;
}

const FEATURED_FAQ_SLUGS = [
  "do-you-recommend-shopify-hydrogen-for-ecommerce",
  "when-should-i-choose-next-js-for-a-project",
  "what-factors-increase-the-cost-of-a-web-or-product-build",
  "do-you-offer-sprint-pricing-for-fast-deliverables",
  "how-do-you-keep-a-boutique-process-high-touch-without-too-many-meetings",
  "do-you-provide-weekly-updates-during-a-build",
] as const;

export const BRANDING_FEATURED_FAQ_SLUGS = [
  "what-does-enterprise-brand-identity-include",
  "how-long-does-enterprise-branding-take",
  "can-branding-scale-across-products-and-markets",
  "how-do-you-handle-enterprise-rebrands",
  "what-is-the-investment-for-enterprise-branding",
  "can-you-work-with-our-internal-brand-team",
] as const;

export const DESIGN_FEATURED_FAQ_SLUGS = [
  "whats-included-in-a-web-product-design-project",
  "how-long-does-a-design-project-take",
  "do-you-design-web-apps-and-dashboards",
  "can-you-work-with-our-internal-product-team",
  "what-does-product-design-typically-cost",
  "how-do-design-files-hand-off-to-development",
] as const;

export const DEVELOPMENT_FEATURED_FAQ_SLUGS = [
  "whats-included-in-a-development-project",
  "how-long-does-a-development-project-take",
  "do-you-build-websites-and-web-apps",
  "can-you-migrate-or-rebuild-an-existing-product",
  "what-does-development-typically-cost",
  "can-you-work-with-our-internal-engineering-team",
] as const;

const SERVICE_FEATURED_FAQ_SLUGS = [
  ...BRANDING_FEATURED_FAQ_SLUGS,
  ...DESIGN_FEATURED_FAQ_SLUGS,
  ...DEVELOPMENT_FEATURED_FAQ_SLUGS,
] as const;

export function getFeaturedFaqs() {
  const faqs = getAllFaqs();

  return FEATURED_FAQ_SLUGS.map((slug) => faqs.find((faq) => faq.slug === slug)).filter(
    (faq): faq is ContentItem => faq != null
  );
}

export function getBrandingFeaturedFaqs() {
  return getFeaturedFaqsBySlugs(BRANDING_FEATURED_FAQ_SLUGS);
}

export function getDesignFeaturedFaqs() {
  return getFeaturedFaqsBySlugs(DESIGN_FEATURED_FAQ_SLUGS);
}

export function getDevelopmentFeaturedFaqs() {
  return getFeaturedFaqsBySlugs(DEVELOPMENT_FEATURED_FAQ_SLUGS);
}

function getFeaturedFaqsBySlugs(slugs: readonly string[]) {
  const faqs = getAllFaqs();

  return slugs
    .map((slug) => faqs.find((faq) => faq.slug === slug))
    .filter((faq): faq is ContentItem => faq != null);
}

export function getRelatedFaqs(faq: ContentItem) {
  const faqs = getAllFaqs();
  const serviceSlugs = new Set<string>(SERVICE_FEATURED_FAQ_SLUGS);

  if (serviceSlugs.has(faq.slug)) {
    const slugSet =
      BRANDING_FEATURED_FAQ_SLUGS.includes(
        faq.slug as (typeof BRANDING_FEATURED_FAQ_SLUGS)[number]
      )
        ? BRANDING_FEATURED_FAQ_SLUGS
        : DESIGN_FEATURED_FAQ_SLUGS.includes(
              faq.slug as (typeof DESIGN_FEATURED_FAQ_SLUGS)[number]
            )
          ? DESIGN_FEATURED_FAQ_SLUGS
          : DEVELOPMENT_FEATURED_FAQ_SLUGS;

    return slugSet
      .filter((slug) => slug !== faq.slug)
      .map((slug) => faqs.find((item) => item.slug === slug))
      .filter((item): item is ContentItem => item != null);
  }

  return faqs
    .filter(
      (item) =>
        item.slug !== faq.slug &&
        item.categorySlug &&
        item.categorySlug === faq.categorySlug
    )
    .slice(0, 5);
}

export function getAllCaseStudies() {
  return readMarkdownFiles("case-studies");
}

export function getCaseStudyBySlug(slug: string) {
  return getAllCaseStudies().find((cs) => cs.slug === slug) || null;
}
