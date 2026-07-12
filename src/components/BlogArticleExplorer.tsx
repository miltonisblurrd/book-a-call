"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BLOG_SORT_OPTIONS,
  compareBlogArticles,
  filterBlogArticles,
  getBlogCategoryOptions,
  type BlogArticleSummary,
  type BlogSortOption,
} from "@/lib/blog-articles.shared";

type BlogArticleExplorerProps = {
  articles: BlogArticleSummary[];
};

export default function BlogArticleExplorer({ articles }: BlogArticleExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<BlogSortOption>("newest");
  const categoryOptions = useMemo(() => getBlogCategoryOptions(articles), [articles]);

  const filteredArticles = useMemo(() => {
    const filtered = filterBlogArticles(articles, query, category);
    return [...filtered].sort((a, b) => compareBlogArticles(a, b, sort));
  }, [articles, category, query, sort]);

  return (
    <section className="section u-p-40-hero">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">Articles</h2>
        </div>

        <div className="blog-toolbar">
          <label className="blog-field blog-field-search">
            <span className="blog-field-label">Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles…"
              className="w-input blog-search-input"
              aria-label="Search articles"
            />
          </label>

          <label className="blog-field">
            <span className="blog-field-label">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-select blog-select"
              aria-label="Filter by category"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All categories" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="blog-field">
            <span className="blog-field-label">Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as BlogSortOption)}
              className="w-select blog-select"
              aria-label="Sort articles"
            >
              {BLOG_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-paragraph u-text-gray blog-results-meta">
          {filteredArticles.length === 1
            ? "1 article"
            : `${filteredArticles.length} articles`}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>

        {filteredArticles.length === 0 ? (
          <div className="wrapper-blue blog-empty-state">
            <p className="text-paragraph u-p-all-around u-mb-0">
              No articles match your search. Try a different keyword or category.
            </p>
          </div>
        ) : (
          <div role="list" className="grid-3 u-p-0">
            {filteredArticles.map((post) => (
              <article key={post.slug} className="wrapper-article">
                {post.category && (
                  <div className="text-paragraph-article-header">{post.category}</div>
                )}
                <h3 className="text-paragraph-article-header">{post.title}</h3>
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
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
