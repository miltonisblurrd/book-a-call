import { getFaqBySlug, getRelatedFaqs } from "@/lib/content";
import FaqCardGrid from "./FaqCardGrid";

type RelatedFaqsProps = {
  currentSlug: string;
};

export default function RelatedFaqs({ currentSlug }: RelatedFaqsProps) {
  const faq = getFaqBySlug(currentSlug);
  if (!faq) return null;

  const related = getRelatedFaqs(faq);
  if (related.length === 0) return null;

  return <FaqCardGrid faqs={related} heading="Related Questions" />;
}
