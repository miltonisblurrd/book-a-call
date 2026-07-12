import DesignFeaturedFaqs from "@/components/DesignFeaturedFaqs";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { stripBottomCtaSection } from "@/lib/strip-bottom-cta-section";
import { splitAtDesignFaqs } from "@/lib/strip-design-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "services/design.html",
  "/services/design",
  { serviceType: "Web Design" }
);
const { before, after } = splitAtDesignFaqs(page.content);
const afterWithoutTestimonialsAndCta = stripBottomCtaSection(
  stripTestimonialsSection(after)
);

export { metadata };

export default function Page() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={before} depth={1} />
      <DesignFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonialsAndCta} depth={1} />
      <PageCta headline="Let's Design a Product Users Love." />
    </>
  );
}
