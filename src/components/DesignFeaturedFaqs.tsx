import { getDesignFeaturedFaqs } from "@/lib/content";
import FaqCardGrid from "./FaqCardGrid";

export default function DesignFeaturedFaqs() {
  const faqs = getDesignFeaturedFaqs();

  return (
    <FaqCardGrid
      faqs={faqs}
      heading="Frequently Asked Questions About My Design Services"
    />
  );
}
