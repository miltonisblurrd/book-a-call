import { ArticleCard } from "@/components/ArticleCard";
import type { ContentItem } from "@/lib/content";

type BlogRecentArticlesProps = {
  posts: ContentItem[];
};

export default function BlogRecentArticles({ posts }: BlogRecentArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section u-pt-0">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">Recent Articles</h2>
        </div>
        <div className="grid-3 u-p-0">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.description}
              category={post.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
