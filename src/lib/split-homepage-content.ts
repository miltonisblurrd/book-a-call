import {
  splitAtPricingSection,
  stripPricingSection,
} from "@/lib/split-pricing-section";

const FAQ_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Frequently Asked Questions<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

const WORK_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<h2 class="h2 u-position-work">Work<\/h2>[\s\S]*?<\/section>/;

function stripWorkSection(html: string) {
  return html.replace(WORK_SECTION_PATTERN, "");
}

export function splitHomepageAtFeaturedFaqs(html: string) {
  const { hasPricing } = splitAtPricingSection(html);
  const withoutWorkAndPricing = stripPricingSection(stripWorkSection(html));
  const match = withoutWorkAndPricing.match(FAQ_SECTION_PATTERN);

  if (!match || match.index == null) {
    return { before: withoutWorkAndPricing, hasPricing, after: "" };
  }

  return {
    before: withoutWorkAndPricing.slice(0, match.index),
    hasPricing,
    after: withoutWorkAndPricing.slice(match.index + match[0].length),
  };
}
