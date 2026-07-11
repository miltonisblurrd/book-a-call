import DevelopmentFeaturedFaqs from "@/components/DevelopmentFeaturedFaqs";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { stripBottomCtaSection } from "@/lib/strip-bottom-cta-section";
import { splitAtDevelopmentFaqs } from "@/lib/strip-development-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";
import type { Metadata } from "next";

const page = getWebflowPage("services/development.html");
const { before, after } = splitAtDevelopmentFaqs(page.content);
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
      <DevelopmentFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonialsAndCta} depth={1} />
      <PageCta headline="Ship & Deploy with Confidence." />
    </>
  );
}
