import BlogRecentArticles from "@/components/BlogRecentArticles";
import { getAllPosts, getPostBySlug, getRecentPosts } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function formatPublishedDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.ogImage ? [post.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const recentPosts = getRecentPosts(slug, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: post.author || "Milton Amaya",
      },
      publisher: {
        "@type": "Organization",
        name: "BLURRD Studio",
      },
      image: post.ogImage,
    },
    ...(post.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-breadcrumb u-mb-2">
            <Link href="/blog" className="text-paragraph u-text-gray">
              blogs
            </Link>
            {post.category && (
              <>
                <span className="text-paragraph u-text-gray"> → </span>
                <span className="text-paragraph u-text-gray">{post.category}</span>
              </>
            )}
          </div>
          <article>
            <header className="blog-post-header">
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-deck">{post.description}</p>
              <div className="blog-post-meta">
                {post.category && (
                  <span className="blog-post-meta-category">{post.category}</span>
                )}
                {post.date && (
                  <time dateTime={post.date}>
                    Published {formatPublishedDate(post.date)}
                  </time>
                )}
                {post.author && <span>By {post.author}</span>}
              </div>
            </header>
            <div className="wrapper-blue u-mb-2 u-scroll-none blog-article">
              <div className="u-p-all-around w-richtext blog-content">
                <MDXRemote source={post.content} />
              </div>
            </div>
          </article>
        </div>
      </section>
      <BlogRecentArticles posts={recentPosts} />
      <section className="section u-p-40-hero">
        <div className="container">
          <img
            loading="lazy"
            src="/images/Group-47609-1.svg"
            alt=""
            className="iimage-reviews u-text-center"
          />
          <h1 className="h1 u-text-center u-mt-2">
            <strong className="bold-text">Let&apos;s Build to Scale.</strong>
          </h1>
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
