import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { getAllFaqs } from "@/lib/content";
import { breadcrumbSchema, buildPageMetadata, faqPageSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQs at BLURRD Studio",
  description:
    "Have questions about BLURRD Studio services, process, or pricing? Browse frequently asked questions or reach out directly.",
  path: "/faqs",
});

export default function FaqsPage() {
  const faqs = getAllFaqs();
  const jsonLd = [
    faqPageSchema(
      faqs.map((faq) => ({
        question: faq.title,
        answer: faq.content.replace(/\n+/g, " ").trim() || faq.description,
      }))
    ),
    breadcrumbSchema([{ name: "FAQs", path: "/faqs" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="section u-p-40-hero">
        <div className="container">
          <img
            loading="lazy"
            src="/images/Group-47609-1.svg"
            alt=""
            className="iimage-reviews"
          />
          <h1 className="h1 u-mt-2">
            <strong className="bold-text">Have questions? Well I have answers (:</strong>
          </h1>
          <p className="text-paragraph u-text-gray u-margin-19">
            Browse common questions below or email{" "}
            <a href="mailto:milton@blurrdstudio.com">milton@blurrdstudio.com</a> anytime.
          </p>
        </div>
      </section>
      <section className="section u-pt-0">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">Frequently Asked Questions</h2>
          </div>
          <div className="grid-3 u-p-0">
            {faqs.map((faq) => (
              <article key={faq.slug} className="wrapper-article">
                <h2 className="text-paragraph-article-header">{faq.title}</h2>
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
      <section className="section u-p-40-hero">
        <div className="container">
          <h1 className="h1 u-text-center u-mt-2">
            <strong className="bold-text">Still Have Any Questions?</strong>
          </h1>
          <div className="wrapper-buttons u-mt-2 u-text-center">
            <a
              href="mailto:milton@Blurrdstudio.com?subject=Question%20for%20Milton%20at%20BLURRD%20studio"
              className="btn u-mr-2 w-button"
            >
              Send Me An Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
