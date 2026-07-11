import { getFeaturedFaqs } from "@/lib/content";
import FaqCardGrid from "./FaqCardGrid";

export default function HomeFeaturedFaqs() {
  const faqs = getFeaturedFaqs();

  return <FaqCardGrid faqs={faqs} />;
}
