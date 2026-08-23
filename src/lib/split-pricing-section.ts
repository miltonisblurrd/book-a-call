const PRICING_SECTION_PATTERN =
  /<section(?:\s+id="pricing")?\s+class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Pricing<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

export function stripPricingSection(html: string) {
  return html.replace(PRICING_SECTION_PATTERN, "");
}

export function splitAtPricingSection(html: string) {
  const match = html.match(PRICING_SECTION_PATTERN);

  if (!match || match.index == null) {
    return { before: html, hasPricing: false, after: "" };
  }

  return {
    before: html.slice(0, match.index),
    hasPricing: true,
    after: html.slice(match.index + match[0].length),
  };
}
