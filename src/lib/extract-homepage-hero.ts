/** First homepage hero section only (excludes About / Learn / etc.). */
export function extractHomepageHero(html: string): string {
  const match = html.match(
    /<section class="section u-p-40-hero">[\s\S]*?<\/section>/
  );
  return match?.[0] ?? "";
}
