export type BlogArticleSummary = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  tags?: string[];
};

export const BLOG_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
] as const;

export type BlogSortOption = (typeof BLOG_SORT_OPTIONS)[number]["value"];

export function compareBlogArticles(
  a: BlogArticleSummary,
  b: BlogArticleSummary,
  sort: BlogSortOption
) {
  switch (sort) {
    case "oldest":
      return (a.date || "").localeCompare(b.date || "") || a.title.localeCompare(b.title);
    case "title-asc":
      return a.title.localeCompare(b.title);
    case "title-desc":
      return b.title.localeCompare(a.title);
    case "newest":
    default:
      return (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title);
  }
}

export function filterBlogArticles(
  items: BlogArticleSummary[],
  query: string,
  category: string
) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    if (category !== "all" && item.category !== category) {
      return false;
    }

    if (!normalizedQuery) return true;

    const haystack = [item.title, item.description, item.category, ...(item.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getBlogCategoryOptions(items: BlogArticleSummary[]) {
  const categories = new Set<string>();
  for (const item of items) {
    if (item.category) categories.add(item.category);
  }
  return ["all", ...Array.from(categories).sort()];
}
