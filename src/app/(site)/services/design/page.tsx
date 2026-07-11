import DesignFeaturedFaqs from "@/components/DesignFeaturedFaqs";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { stripBottomCtaSection } from "@/lib/strip-bottom-cta-section";
import { splitAtDesignFaqs } from "@/lib/strip-design-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";
import type { Metadata } from "next";

const page = getWebflowPage("services/design.html");
const { before, after } = splitAtDesignFaqs(page.content);
const afterWithoutTestimonialsAndCta = stripBottomCtaSection(
  stripTestimonialsSection(after)
);

export const metadata: Metadata = {
  title: page.metadata.title.replace(" | BLURRD Studio", "").replace(" — BLURRD Studio", ""),
  description: page.metadata.description,
  openGraph: page.metadata.ogImage
    ? { images: [page.metadata.ogImage] }
    : undefined,
};

export default function Page() {
  return (
    <>
      <WebflowContent html={before} depth={1} />
      <DesignFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonialsAndCta} depth={1} />
      <PageCta headline="Let's Design a Product Users Love." />
    </>
  );
}
