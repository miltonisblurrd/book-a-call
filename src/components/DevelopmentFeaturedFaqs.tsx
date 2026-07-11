import { getDevelopmentFeaturedFaqs } from "@/lib/content";
import FaqCardGrid from "./FaqCardGrid";

export default function DevelopmentFeaturedFaqs() {
  const faqs = getDevelopmentFeaturedFaqs();

  return (
    <FaqCardGrid
      faqs={faqs}
      heading="Frequently Asked Questions About My Development Services"
    />
  );
}
