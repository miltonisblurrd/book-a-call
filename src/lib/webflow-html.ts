const ROUTE_MAP: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "services.html": "/services",
  "services/branding.html": "/services/branding",
  "services/design.html": "/services/design",
  "services/development.html": "/services/development",
  "services/ongoing-support.html": "/services/ongoing-support",
  "blog.html": "/blog",
  "faqs.html": "/faqs",
  "learn.html": "/blog",
  "terms-of-service.html": "/terms-of-service",
  "blurrd-studio-advantages.html": "/blurrd-studio-advantages",
  "seo.html": "/seo",
  "shopify-development.html": "/shopify-development",
  "webflow-development.html": "/webflow-development",
  "mobile-apps-games.html": "/mobile-apps-games",
  "nfts.html": "/nfts",
  "self-service-project-request.html": "/self-service-project-request",
  "artists.html": "/artists",
  "case-studies/rakuten.html": "/case-studies/rakuten",
  "case-studies/shipnetwork.html": "/case-studies/shipnetwork",
  "case-studies/firstmile.html": "/case-studies/firstmile",
  "case-studies/elk.html": "/case-studies/elk",
  "case-studies/dubmans.html": "/case-studies/dubmans",
  "case-studies/freedom-tax-strategies.html": "/case-studies/freedom-tax-strategies",
  "case-studies/glass-cactus-marketing.html": "/case-studies/glass-cactus-marketing",
  "case-studies/how-much.html": "/case-studies/how-much",
  "case-studies/prcl-world.html": "/case-studies/prcl-world",
  "case-studies/stronghold-ac.html": "/case-studies/stronghold-ac",
};

export function processWebflowHtml(html: string, depth = 0): string {
  let result = html;

  const imagePrefix = depth > 0 ? "/images/" : "/images/";
  result = result.replace(/src="\.\.\/images\//g, 'src="/images/');
  result = result.replace(/srcset="\.\.\/images\//g, 'srcset="/images/');
  result = result.replace(/src="images\//g, `src="${imagePrefix}`);
  result = result.replace(/srcset="images\//g, `srcset="${imagePrefix}`);
  result = result.replace(/href="images\//g, 'href="/images/');
  result = result.replace(/poster="\.\.\/videos\//g, 'poster="/videos/');
  result = result.replace(/src="\.\.\/videos\//g, 'src="/videos/');
  result = result.replace(/poster="videos\//g, 'poster="/videos/');
  result = result.replace(/src="videos\//g, 'src="/videos/');

  for (const [from, to] of Object.entries(ROUTE_MAP)) {
    result = result.replaceAll(`href="${from}"`, `href="${to}"`);
    result = result.replaceAll(`href="../${from}"`, `href="${to}"`);
  }

  result = result.replace(
    /href="https:\/\/www\.blurrdstudio\.com\/book-a-call"/g,
    'href="/book-a-call"'
  );

  return result;
}

function getMetaContent(
  html: string,
  key: string,
  attr: "name" | "property"
): string | undefined {
  const regex = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["']`,
    "i"
  );
  const match = html.match(regex);
  return match?.[1] || match?.[2];
}

function getLinkHref(html: string, rel: string): string | undefined {
  const regex = new RegExp(
    `<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']*)["']|<link[^>]+href=["']([^"']*)["'][^>]+rel=["']${rel}["']`,
    "i"
  );
  const match = html.match(regex);
  return match?.[1] || match?.[2];
}

export function extractMetadata(html: string) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title =
    getMetaContent(html, "og:title", "property") ||
    titleMatch?.[1]?.replace(/&amp;/g, "&") ||
    "BLURRD Studio";
  const description =
    getMetaContent(html, "description", "name") ||
    getMetaContent(html, "og:description", "property") ||
    "";
  const ogImage =
    getMetaContent(html, "og:image", "property") ||
    getMetaContent(html, "twitter:image", "name");
  const canonical = getLinkHref(html, "canonical");

  return {
    title,
    description: description.replace(/&amp;/g, "&"),
    ogImage,
    canonical,
  };
}

export function extractJsonLd(html: string): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1].trim()) as Record<string, unknown>);
    } catch {
      // Skip invalid JSON-LD blocks from source HTML.
    }
  }

  return blocks;
}

export function extractMainContent(html: string): string {
  let content: string | undefined;

  const mainMatch = html.match(
    /<main[^>]*class="[^"]*body-wrapper[^"]*"[^>]*>([\s\S]*?)<\/main>/i
  );
  if (mainMatch) {
    content = mainMatch[1];
  } else {
    // about.html and 404.html use div.body-wrapper instead of main
    const divMatch = html.match(
      /<div class="body-wrapper">([\s\S]*?)<\/div>\s*<footer/i
    );
    content = divMatch?.[1];
  }

  if (!content) return "";

  content = content.replace(/<footer[\s\S]*$/i, "");
  content = content.replace(/<div class="glow-test">[\s\S]*$/i, "");
  return content.trim();
}
