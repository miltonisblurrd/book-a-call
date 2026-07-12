import JsonLd from "./JsonLd";
import HomeFeaturedFaqs from "./HomeFeaturedFaqs";
import PageCta from "./PageCta";
import TestimonialsSection from "./TestimonialsSection";
import WebflowContent from "./WebflowContent";
import { stripBottomCtaSection } from "@/lib/strip-bottom-cta-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";

type ServiceStylePageProps = {
  html: string;
  ctaHeadline: string;
  depth?: number;
  jsonLd?: Array<Record<string, unknown>>;
};

export default function ServiceStylePage({
  html,
  ctaHeadline,
  depth = 0,
  jsonLd,
}: ServiceStylePageProps) {
  const content = stripBottomCtaSection(stripTestimonialsSection(html));

  return (
    <>
      {jsonLd && jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={content} depth={depth} />
      <HomeFeaturedFaqs />
      <TestimonialsSection />
      <PageCta headline={ctaHeadline} />
    </>
  );
}
