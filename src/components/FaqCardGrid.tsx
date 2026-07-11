import type { ContentItem } from "@/lib/content";
import Link from "next/link";

type FaqCardGridProps = {
  faqs: ContentItem[];
  heading?: string;
};

export default function FaqCardGrid({
  faqs,
  heading = "Frequently Asked Questions",
}: FaqCardGridProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="section u-pt-0">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">{heading}</h2>
        </div>
        <div className="grid-3 u-p-0">
          {faqs.map((faq) => (
            <article key={faq.slug} className="wrapper-article">
              <h3 className="text-paragraph-article-header">{faq.title}</h3>
              <p className="text-paragraph-article-body">{faq.description}</p>
              <div className="wrapper-article-learn">
                <img
                  src="/images/Group-47652.svg"
                  loading="lazy"
                  alt=""
                  className="image-arrows"
                />
                <Link
                  href={`/faqs/${faq.slug}`}
                  className="text-paragraph-article-header u-mb-0"
                >
                  View Question
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
