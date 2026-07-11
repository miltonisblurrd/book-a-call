const FAQ_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Frequently Asked Questions<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

const WORK_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<h2 class="h2 u-position-work">Work<\/h2>[\s\S]*?<\/section>/;

const PRICING_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Pricing<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

function stripWorkSection(html: string) {
  return html.replace(WORK_SECTION_PATTERN, "");
}

function stripPricingSection(html: string) {
  return html.replace(PRICING_SECTION_PATTERN, "");
}

function extractPricingSection(html: string) {
  return html.match(PRICING_SECTION_PATTERN)?.[0] ?? "";
}

export function splitHomepageAtFeaturedFaqs(html: string) {
  const pricing = extractPricingSection(html);
  const withoutWorkAndPricing = stripPricingSection(stripWorkSection(html));
  const match = withoutWorkAndPricing.match(FAQ_SECTION_PATTERN);

  if (!match || match.index == null) {
    return { before: withoutWorkAndPricing, pricing, after: "" };
  }

  return {
    before: withoutWorkAndPricing.slice(0, match.index),
    pricing,
    after: withoutWorkAndPricing.slice(match.index + match[0].length),
  };
}
