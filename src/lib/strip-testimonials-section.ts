const TESTIMONIALS_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Testimonials<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

export function splitAtTestimonials(html: string) {
  const match = html.match(TESTIMONIALS_SECTION_PATTERN);

  if (!match || match.index == null) {
    return { before: html, after: "", hasTestimonials: false };
  }

  return {
    before: html.slice(0, match.index),
    after: html.slice(match.index + match[0].length),
    hasTestimonials: true,
  };
}

export function stripTestimonialsSection(html: string) {
  return html.replace(TESTIMONIALS_SECTION_PATTERN, "");
}

export function extractTestimonialsSection(html: string) {
  return html.match(TESTIMONIALS_SECTION_PATTERN)?.[0] ?? "";
}
