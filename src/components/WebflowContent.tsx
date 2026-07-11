import { processWebflowHtml } from "@/lib/webflow-html";
import { splitAtTestimonials } from "@/lib/strip-testimonials-section";
import TestimonialsSection from "./TestimonialsSection";

type WebflowContentProps = {
  html: string;
  depth?: number;
};

function WebflowHtmlBlock({ html, depth }: { html: string; depth: number }) {
  if (!html) return null;
  const processed = processWebflowHtml(html, depth);
  return <div dangerouslySetInnerHTML={{ __html: processed }} />;
}

export default function WebflowContent({ html, depth = 0 }: WebflowContentProps) {
  const { before, after, hasTestimonials } = splitAtTestimonials(html);

  return (
    <>
      <WebflowHtmlBlock html={before} depth={depth} />
      {hasTestimonials ? <TestimonialsSection /> : null}
      <WebflowHtmlBlock html={after} depth={depth} />
    </>
  );
}
