import BrandingFeaturedFaqs from "@/components/BrandingFeaturedFaqs";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { splitAtBrandingFaqs } from "@/lib/strip-branding-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "services/branding.html",
  "/services/branding"
);
const { before, after } = splitAtBrandingFaqs(page.content);
const afterWithoutTestimonials = stripTestimonialsSection(after);

export { metadata };

export default function Page() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={before} depth={1} />
      <BrandingFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonials} depth={1} />
      <PageCta headline="Make Your Brand Instantly Recognizable." />
    </>
  );
}
