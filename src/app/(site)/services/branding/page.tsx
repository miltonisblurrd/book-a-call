import BrandingFeaturedFaqs from "@/components/BrandingFeaturedFaqs";
import PageCta from "@/components/PageCta";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { splitAtBrandingFaqs } from "@/lib/strip-branding-faq-section";
import { stripTestimonialsSection } from "@/lib/strip-testimonials-section";
import type { Metadata } from "next";

const page = getWebflowPage("services/branding.html");
const { before, after } = splitAtBrandingFaqs(page.content);
const afterWithoutTestimonials = stripTestimonialsSection(after);

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
      <BrandingFeaturedFaqs />
      <TestimonialsSection />
      <WebflowContent html={afterWithoutTestimonials} depth={1} />
      <PageCta headline="Make Your Brand Instantly Recognizable." />
    </>
  );
}
