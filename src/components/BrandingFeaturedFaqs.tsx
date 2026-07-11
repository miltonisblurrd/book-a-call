import { getBrandingFeaturedFaqs } from "@/lib/content";
import FaqCardGrid from "./FaqCardGrid";

export default function BrandingFeaturedFaqs() {
  const faqs = getBrandingFeaturedFaqs();

  return (
    <FaqCardGrid
      faqs={faqs}
      heading="Frequently Asked Questions About My Branding Services"
    />
  );
}
