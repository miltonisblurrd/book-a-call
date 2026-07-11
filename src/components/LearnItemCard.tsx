import Link from "next/link";

type StreamCardProps = {
  href: string;
  thumbnail: string;
};

export function StreamCard({ href, thumbnail }: StreamCardProps) {
  return (
    <div className="wrapper-article u-p-1">
      <img src={thumbnail} loading="lazy" alt="" className="image-stream-thumbnail" />
      <div className="wrapper-article-learn">
        <img
          src="/images/Group-47652.svg"
          loading="lazy"
          alt=""
          className="image-arrows"
        />
        <Link href={href} className="text-paragraph-article-header u-mb-0">
          Watch Stream
        </Link>
      </div>
    </div>
  );
}

type RepoCardProps = {
  href: string;
  title: string;
  description: string;
};

export function RepoCard({ href, title, description }: RepoCardProps) {
  return (
    <div className="wrapper-article">
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
          View Repo
        </Link>
      </div>
    </div>
  );
}

type TipCardProps = {
  href: string;
  title: string;
  description: string;
  category?: string;
};

export function TipCard({ href, title, description, category }: TipCardProps) {
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
          Learn More
        </Link>
      </div>
    </div>
  );
}
