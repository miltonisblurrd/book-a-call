import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Words & Stuff | Blurrd Studio Blog",
  description:
    "Explore articles, insights, and creative perspectives from Blurrd Studio on branding, design, development, and digital strategy.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">Articles</h2>
          </div>
          <div className="grid-3 u-p-0">
            {posts.map((post) => (
              <article key={post.slug} className="wrapper-article">
                {post.category && (
                  <div className="text-paragraph-article-header">{post.category}</div>
                )}
                <h1 className="text-paragraph-article-header">{post.title}</h1>
                <p className="text-paragraph-article-body">{post.description}</p>
                <div className="wrapper-article-learn">
                  <img
                    src="/images/Group-47652.svg"
                    loading="lazy"
                    alt=""
                    className="image-arrows"
                  />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-paragraph-article-header u-mb-0"
                  >
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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
