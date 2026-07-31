import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import RelatedFaqs from "@/components/RelatedFaqs";
import { getAllFaqs, getFaqBySlug } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqAnswerPlainText,
  faqPageSchema,
} from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllFaqs().map((faq) => ({ slug: faq.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFaqBySlug(slug);
  if (!faq) return {};

  return buildPageMetadata({
    title: faq.titleTag || faq.title,
    description: faq.metaDescription || faq.description,
    path: `/faqs/${slug}`,
  });
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const faq = getFaqBySlug(slug);
  if (!faq) notFound();

  const path = `/faqs/${slug}`;
  const answerText =
    faqAnswerPlainText(faq.content) || faq.metaDescription || faq.description;
  const jsonLd = [
    faqPageSchema([{ question: faq.title, answer: answerText }]),
    breadcrumbSchema([
      { name: "FAQs", path: "/faqs" },
      { name: faq.title, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-breadcrumb u-mb-2">
            <Link href="/faqs" className="text-paragraph u-text-gray">
              faqs
            </Link>
            {faq.category && (
              <>
                <span className="text-paragraph u-text-gray"> → </span>
                <span className="text-paragraph u-text-gray">{faq.category}</span>
              </>
            )}
          </div>
          <h1 className="h1 text-paragraph u-extra-bold">{faq.title}</h1>
          <div className="wrapper-blue u-mb-2 u-mt-2 u-scroll-none faq-answer">
            <div className="u-p-all-around w-richtext">
              <MDXRemote source={faq.content} />
            </div>
          </div>
        </div>
      </section>
      <RelatedFaqs currentSlug={faq.slug} />
      <PageCta
        headline="Still Have Questions? I'll Provide Clarity."
        emailOnly
      />
    </>
  );
}
