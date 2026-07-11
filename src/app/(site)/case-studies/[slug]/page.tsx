import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.description,
    openGraph: {
      title: cs.title,
      description: cs.description,
      type: "article",
      images: cs.ogImage ? [cs.ogImage] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.description,
    about: cs.client,
    author: {
      "@type": "Organization",
      name: "BLURRD Studio",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyTemplate caseStudy={cs} />
    </>
  );
}
