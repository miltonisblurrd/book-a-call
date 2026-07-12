const BOTTOM_CTA_SECTION_PATTERN =
  /<section class="section u-p-40-hero">\s*<div class="container">\s*<img[^>]*iimage-reviews u-text-center[\s\S]*?<\/section>/;

export function stripBottomCtaSection(html: string) {
  return html.replace(BOTTOM_CTA_SECTION_PATTERN, "");
}
