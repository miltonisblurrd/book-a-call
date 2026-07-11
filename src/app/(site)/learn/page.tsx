import { TipCard } from "@/components/LearnItemCard";
import { getTipsPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | BLURRD Studio",
  description:
    "Tips and thoughts on web design, development, branding, and building digital products from BLURRD Studio.",
};

export default function LearnPage() {
  const tips = getTipsPosts();

  return (
    <>
      <section className="section u-p-40-hero">
        <div className="container">
          <a
            href="https://www.google.com/search?q=blurrd+studio+las+vegas"
            target="_blank"
            rel="noopener noreferrer"
            className="link-gmb w-inline-block"
          >
            <img
              src="/images/Group-47609-1.svg"
              loading="lazy"
              alt=""
              className="iimage-reviews"
            />
          </a>
          <h1 className="h1 u-mt-2">
            <strong className="bold-text">Learn everything I know</strong>
          </h1>
          <p className="text-paragraph u-text-gray u-margin-19">
            Tips, thoughts, and articles on branding, design, development, and
            shipping better digital products.
          </p>
        </div>
      </section>

      <section id="tips-thoughts" className="section u-pt-0">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">Tips &amp; Thoughts</h2>
          </div>
          <div role="list" className="grid-3 u-p-0">
            {tips.length === 0 ? (
              <p className="text-paragraph u-text-gray">
                No articles yet. Add a blog post with category{" "}
                <code>Tips &amp; Thoughts</code> or tag <code>tips</code>.
              </p>
            ) : (
              tips.map((post) => (
                <TipCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
