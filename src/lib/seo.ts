import type { Metadata } from "next";

export const SITE_URL = "https://www.blurrdstudio.com";
export const SITE_NAME = "BLURRD Studio";
export const DEFAULT_OG_IMAGE =
  "https://cdn.prod.website-files.com/635708aab1dd169d3b9ed6aa/69ec0ec62704bb697e904ba8_blurrdStudioOpenGraph.jpg";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImageUrl(image?: string) {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image);
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
}: BuildPageMetadataInput): Metadata {
  const decodedTitle = decodeHtmlEntities(title).trim();
  const decodedDescription = decodeHtmlEntities(description).trim();
  const url = absoluteUrl(path);
  const image = absoluteImageUrl(ogImage);

  return {
    title: { absolute: decodedTitle },
    description: decodedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: decodedTitle,
      description: decodedDescription,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, alt: decodedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: decodedTitle,
      description: decodedDescription,
      images: [image],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/BLURRD.svg"),
    sameAs: [
      "https://x.com/BlurrdStudio",
      "https://www.instagram.com/blurrdstudio/",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Las Vegas",
      containedInPlace: {
        "@type": "State",
        name: "Nevada",
      },
    },
    sameAs: [
      "https://x.com/BlurrdStudio",
      "https://www.instagram.com/blurrdstudio/",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqAnswerPlainText(markdown: string) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^-\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function faqPageSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteImageUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Person",
      name: input.author || "Milton Amaya",
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function videoObjectSchema(input: {
  title: string;
  description: string;
  path: string;
  youtubeId: string;
  thumbnail?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.title,
    description: input.description,
    thumbnailUrl: absoluteImageUrl(input.thumbnail),
    uploadDate: input.datePublished,
    embedUrl: `https://www.youtube.com/embed/${input.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    url: absoluteUrl(input.path),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: "Worldwide",
  };
}

export function softwareSourceCodeSchema(input: {
  name: string;
  description: string;
  path: string;
  repoUrl: string;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    codeRepository: input.repoUrl,
    programmingLanguage: input.language,
    author: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

function normalizeSchemaNode(node: unknown): unknown {
  if (Array.isArray(node)) {
    return node.map((item) => normalizeSchemaNode(item));
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  const record = { ...(node as Record<string, unknown>) };

  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") {
      if (key === "url" || key === "@id") {
        record[key] = value.startsWith("/") ? absoluteUrl(value) : value;
      }
      continue;
    }

    record[key] = normalizeSchemaNode(value);
  }

  if (typeof record.url === "string" && record.url.startsWith("/")) {
    record.url = absoluteUrl(record.url);
  }

  return record;
}

export function normalizeJsonLd(blocks: Record<string, unknown>[]) {
  return blocks.map((block) => normalizeSchemaNode(block) as Record<string, unknown>);
}
