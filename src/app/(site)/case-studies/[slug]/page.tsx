import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import JsonLd from "@/components/JsonLd";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import {
  articleSchema,
  breadcrumbSchema,
  buildPageMetadata,
} from "@/lib/seo";
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

  return buildPageMetadata({
    title: cs.title,
    description: cs.description,
    path: `/case-studies/${slug}`,
    ogImage: cs.ogImage,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const path = `/case-studies/${slug}`;
  const jsonLd = [
    articleSchema({
      title: cs.title,
      description: cs.description,
      path,
      image: cs.ogImage,
    }),
    breadcrumbSchema([
      { name: "Case Studies", path: "/about" },
      { name: cs.client || cs.title, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseStudyTemplate caseStudy={cs} />
    </>
  );
}
