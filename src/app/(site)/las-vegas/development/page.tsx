import DevelopmentFeaturedFaqs from "@/components/DevelopmentFeaturedFaqs";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { stripBottomCtaSection } from "@/lib/strip-bottom-cta-section";
import { splitAtDevelopmentFaqs } from "@/lib/strip-development-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "las-vegas/development.html",
  "/las-vegas/development",
  { serviceType: "Web Development" }
);
const { before, after } = splitAtDevelopmentFaqs(page.content);
const afterWithoutTestimonialsAndCta = stripBottomCtaSection(
  stripTestimonialsSection(after)
);

export { metadata };

export default function Page() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={before} depth={1} />
      <DevelopmentFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonialsAndCta} depth={1} />
      <PageCta headline="Ship & Deploy from Las Vegas with Confidence." />
    </>
  );
}
