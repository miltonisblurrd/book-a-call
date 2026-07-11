import LearnPageCta from "@/components/LearnPageCta";
import { getAllRepos, getRepoBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllRepos().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) return {};
  return {
    title: repo.title,
    description: repo.description,
  };
}

export default async function RepoPage({ params }: Props) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) notFound();

  return (
    <>
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-breadcrumb u-mb-2">
            <Link href="/learn" className="text-paragraph u-text-gray">
              learn
            </Link>
            <span className="text-paragraph u-text-gray"> → repos</span>
          </div>
          <h1 className="h1">{repo.title}</h1>
          <p className="text-paragraph u-text-gray u-margin-19">
            {repo.description}
          </p>
          {(repo.language || repo.topics?.length) && (
            <p className="text-paragraph u-text-gray u-mb-2">
              {[repo.language, repo.topics?.join(", ")].filter(Boolean).join(" · ")}
            </p>
          )}
          <div className="wrapper-buttons u-mb-2">
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn u-mr-2 w-button"
            >
              View on GitHub
            </a>
          </div>
          {repo.content.trim() && (
            <div className="wrapper-blue u-mb-2">
              <div className="u-p-all-around w-richtext prose-content">
                <MDXRemote source={repo.content} />
              </div>
            </div>
          )}
        </div>
      </section>
      <LearnPageCta />
    </>
  );
}
