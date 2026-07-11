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
  "learn.html": "/learn",
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

export function extractMetadata(html: string) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/i
  );
  const ogImageMatch = html.match(
    /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i
  );
  return {
    title: titleMatch?.[1]?.replace(/&amp;/g, "&") || "BLURRD Studio",
    description: descMatch?.[1]?.replace(/&amp;/g, "&") || "",
    ogImage: ogImageMatch?.[1],
  };
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
