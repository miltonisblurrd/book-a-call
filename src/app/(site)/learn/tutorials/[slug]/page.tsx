import LearnPageCta from "@/components/LearnPageCta";
import { getAllTutorials, getTutorialBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllTutorials().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: "video.other",
      images: tutorial.thumbnail ? [tutorial.thumbnail] : undefined,
    },
  };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  return (
    <>
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-breadcrumb u-mb-2">
            <Link href="/learn" className="text-paragraph u-text-gray">
              learn
            </Link>
            <span className="text-paragraph u-text-gray"> → tutorials</span>
          </div>
          <h1 className="h1">{tutorial.title}</h1>
          <p className="text-paragraph u-text-gray u-margin-19">
            {tutorial.description}
          </p>
          {tutorial.date && (
            <p className="text-paragraph u-text-gray u-mb-2">
              Published {tutorial.date}
            </p>
          )}
          <div className="wrapper-blue u-mb-2 u-scroll-none">
            <div
              style={{ paddingTop: "56.17021276595745%" }}
              className="w-embed-youtubevideo recent-tutorials-video"
            >
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.youtubeId}?rel=0&controls=1&autoplay=0&mute=0&start=0`}
                frameBorder="0"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "auto",
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={tutorial.title}
              />
            </div>
          </div>
          {tutorial.content.trim() && (
            <div className="wrapper-blue u-mb-2">
              <div className="u-p-all-around w-richtext prose-content">
                <MDXRemote source={tutorial.content} />
              </div>
            </div>
          )}
        </div>
      </section>
      <LearnPageCta />
    </>
  );
}
