import Link from "next/link";

type ArticleCardProps = {
  href: string;
  title: string;
  description: string;
  category?: string;
};

export function ArticleCard({ href, title, description, category }: ArticleCardProps) {
  return (
    <div className="wrapper-article">
      {category && (
        <div className="text-paragraph-article-header">{category}</div>
      )}
      <div className="text-paragraph-article-header">{title}</div>
      <div className="text-paragraph-article-body">{description}</div>
      <div className="wrapper-article-learn">
        <img
          src="/images/Group-47652.svg"
          loading="lazy"
          alt=""
          className="image-arrows"
        />
        <Link href={href} className="text-paragraph-article-header u-mb-0">
          Read Article
        </Link>
      </div>
    </div>
  );
}
