import HomeFeaturedFaqs from "@/components/HomeFeaturedFaqs";
import ServicesPricingTabs from "@/components/ServicesPricingTabs";
import WebflowContent from "@/components/WebflowContent";
import WorkSection from "@/components/WorkSection";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { splitHomepageAtFeaturedFaqs } from "@/lib/split-homepage-content";
import type { Metadata } from "next";

const page = getWebflowPage("index.html");
const { before, pricing, after } = splitHomepageAtFeaturedFaqs(page.content);

export const metadata: Metadata = {
  title: page.metadata.title.replace(" | BLURRD Studio", "").replace(" — BLURRD Studio", ""),
  description: page.metadata.description,
  openGraph: page.metadata.ogImage
    ? { images: [page.metadata.ogImage] }
    : undefined,
};

export default function Page() {
  return (
    <>
      <WebflowContent html={before} depth={0} />
      <WorkSection />
      {pricing ? (
        <>
          <WebflowContent html={pricing} depth={0} />
          <ServicesPricingTabs />
        </>
      ) : null}
      <HomeFeaturedFaqs />
      <WebflowContent html={after} depth={0} />
    </>
  );
}
