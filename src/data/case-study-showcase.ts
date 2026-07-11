export type CaseStudyShowcase = {
  slug: string;
  name: string;
  thumbnail: string;
  thumbnailClass?: string;
  categories: string[];
};

const SHOWCASE_ORDER = [
  "symphny",
  "safefaces",
  "shipnetwork",
  "rakuten",
  "firstmile",
  "freedom-tax-strategies",
  "glass-cactus-marketing",
  "prcl-world",
  "how-much",
  "stronghold-ac",
  "elk",
  "dubmans",
] as const;

export const CASE_STUDY_SHOWCASE: CaseStudyShowcase[] = [
  {
    slug: "symphny",
    name: "Symphny",
    thumbnail: "/images/20260411202416001.gif",
    categories: ["Branding", "Website"],
  },
  {
    slug: "safefaces",
    name: "SafeFaces",
    thumbnail: "/images/Group-47654-1.jpg",
    categories: ["Branding", "Design", "Website", "iOS"],
  },
  {
    slug: "shipnetwork",
    name: "ShipNetwork",
    thumbnail: "/images/Group-47629_1.avif",
    thumbnailClass: "u-image-cover",
    categories: ["Branding", "Website", "Product"],
  },
  {
    slug: "rakuten",
    name: "Rakuten",
    thumbnail: "/images/Frame-47318-2_1.avif",
    categories: ["Website", "Product"],
  },
  {
    slug: "firstmile",
    name: "FirstMile",
    thumbnail: "/images/Frame-47315_1.avif",
    categories: ["Website", "Design"],
  },
  {
    slug: "freedom-tax-strategies",
    name: "Freedom Tax Strategies",
    thumbnail: "/images/Frame-47361_1.avif",
    categories: ["Website", "Branding"],
  },
  {
    slug: "glass-cactus-marketing",
    name: "Glass Cactus Marketing",
    thumbnail: "/images/Frame-47364-1_1.avif",
    categories: ["Website", "Design"],
  },
  {
    slug: "prcl-world",
    name: "PRCL World",
    thumbnail: "/images/Frame-47349_1.avif",
    categories: ["Website", "Branding"],
  },
  {
    slug: "how-much",
    name: "How Much",
    thumbnail: "/images/Frame-47327-3_1.avif",
    categories: ["Branding", "Website"],
  },
  {
    slug: "stronghold-ac",
    name: "Stronghold HVAC",
    thumbnail: "/images/Frame-47333-1_1.avif",
    categories: ["Website", "Design"],
  },
  {
    slug: "elk",
    name: "Elk",
    thumbnail: "/images/Frame-47400_1.avif",
    categories: ["Website", "Design"],
  },
  {
    slug: "dubmans",
    name: "DUBMANS",
    thumbnail: "/images/Frame-47386.svg",
    categories: ["Branding", "Website"],
  },
];

function showcaseSortIndex(slug: string) {
  const index = SHOWCASE_ORDER.indexOf(slug as (typeof SHOWCASE_ORDER)[number]);
  return index === -1 ? SHOWCASE_ORDER.length : index;
}

export function getCaseStudyShowcase(slug: string) {
  return CASE_STUDY_SHOWCASE.find((item) => item.slug === slug);
}

export function getOtherCaseStudyShowcases(excludeSlug: string, limit = 6) {
  return CASE_STUDY_SHOWCASE.filter((item) => item.slug !== excludeSlug)
    .sort((a, b) => showcaseSortIndex(a.slug) - showcaseSortIndex(b.slug))
    .slice(0, limit);
}
