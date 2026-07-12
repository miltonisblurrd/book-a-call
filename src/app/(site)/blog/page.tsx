import BlogArticleExplorer from "@/components/BlogArticleExplorer";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/content";
import { breadcrumbSchema, buildPageMetadata, collectionPageSchema } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Words & Stuff | Blurrd Studio Blog",
  description:
    "Explore articles, insights, and creative perspectives from Blurrd Studio on branding, design, development, and digital strategy.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const articles = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
  }));

  const jsonLd = [
    collectionPageSchema({
      name: "BLURRD Studio Blog",
      description:
        "Articles and insights on branding, design, development, and digital strategy.",
      path: "/blog",
      items: posts.map((post) => ({
        name: post.title,
        path: `/blog/${post.slug}`,
      })),
    }),
    breadcrumbSchema([{ name: "Blog", path: "/blog" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogArticleExplorer articles={articles} />

      <section className="section u-p-40-hero">
        <div className="container">
          <img
            loading="lazy"
            src="/images/Group-47609-1.svg"
            alt=""
            className="iimage-reviews u-text-center"
          />
          <h2 className="h1 u-text-center u-mt-2">
            <strong className="bold-text">Let&apos;s Build to Scale.</strong>
          </h2>
          <div className="wrapper-buttons u-mt-2 u-text-center">
            <Link href="/book-a-call" className="btn u-mr-2 w-button">
              Book a 15 Min. Call
            </Link>
            <a
              href="mailto:milton@Blurrdstudio.com?subject=Question%20for%20Milton%20at%20BLURRD%20studio"
              className="btn white w-button"
            >
              Send Me An Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
