import AboutPageEnhancements from "@/components/AboutPageEnhancements";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { stripEmbeddedScripts } from "@/lib/strip-embedded-scripts";
import type { Metadata } from "next";

const page = getWebflowPage("about.html");

export const metadata: Metadata = {
  title: page.metadata.title.replace(" | BLURRD Studio", "").replace(" — BLURRD Studio", ""),
  description: page.metadata.description,
  openGraph: page.metadata.ogImage
    ? { images: [page.metadata.ogImage] }
    : undefined,
};

export default function Page() {
  // Read fresh on each request so dev picks up about.html edits without stale module cache.
  const { content } = getWebflowPage("about.html");

  return (
    <>
      <WebflowContent html={stripEmbeddedScripts(content)} depth={0} />
      <AboutPageEnhancements />
    </>
  );
}
