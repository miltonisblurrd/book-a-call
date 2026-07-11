import LearnPageCta from "@/components/LearnPageCta";
import { getAllStreams, getStreamBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllStreams().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stream = getStreamBySlug(slug);
  if (!stream) return {};
  return {
    title: stream.title,
    description: stream.description,
    openGraph: {
      title: stream.title,
      description: stream.description,
      images: stream.thumbnail ? [stream.thumbnail] : undefined,
    },
  };
}

export default async function StreamPage({ params }: Props) {
  const { slug } = await params;
  const stream = getStreamBySlug(slug);
  if (!stream) notFound();

  return (
    <>
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-breadcrumb u-mb-2">
            <Link href="/learn" className="text-paragraph u-text-gray">
              learn
            </Link>
            <span className="text-paragraph u-text-gray"> → streams</span>
          </div>
          <h1 className="h1">{stream.title}</h1>
          <p className="text-paragraph u-text-gray u-margin-19">
            {stream.description}
          </p>
          {stream.date && (
            <p className="text-paragraph u-text-gray u-mb-2">
              Streamed {stream.date}
            </p>
          )}
          {stream.thumbnail && (
            <img
              src={stream.thumbnail}
              loading="lazy"
              alt=""
              className="image-stream-thumbnail u-mb-2"
            />
          )}
          <div className="wrapper-buttons u-mb-2">
            <a
              href={stream.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn u-mr-2 w-button"
            >
              Watch on {stream.platform === "kick" ? "Kick" : stream.platform}
            </a>
          </div>
          {stream.embedUrl && (
            <div className="wrapper-blue u-mb-2 u-scroll-none">
              <div
                style={{ paddingTop: "56.17021276595745%" }}
                className="w-embed-youtubevideo recent-tutorials-video"
              >
                <iframe
                  src={stream.embedUrl}
                  frameBorder="0"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "auto",
                  }}
                  allowFullScreen
                  title={stream.title}
                />
              </div>
            </div>
          )}
          {stream.content.trim() && (
            <div className="wrapper-blue u-mb-2">
              <div className="u-p-all-around w-richtext prose-content">
                <MDXRemote source={stream.content} />
              </div>
            </div>
          )}
        </div>
      </section>
      <LearnPageCta />
    </>
  );
}
