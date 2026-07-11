const DESIGN_FAQ_SECTION_PATTERN =
  /<section class="section u-pt-0">\s*<div class="container">\s*<div class="wrapper-orange">\s*<h2 class="h2">Frequently Asked Questions About My Design Services<\/h2>\s*<\/div>[\s\S]*?<\/section>/;

export function splitAtDesignFaqs(html: string) {
  const match = html.match(DESIGN_FAQ_SECTION_PATTERN);

  if (!match || match.index == null) {
    return { before: html, after: "", hasDesignFaqs: false };
  }

  return {
    before: html.slice(0, match.index),
    after: html.slice(match.index + match[0].length),
    hasDesignFaqs: true,
  };
}
