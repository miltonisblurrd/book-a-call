import HomeFeaturedFaqs from "@/components/HomeFeaturedFaqs";
import JsonLd from "@/components/JsonLd";
import ServicesPricingTabs from "@/components/ServicesPricingTabs";
import WebflowContent from "@/components/WebflowContent";
import WorkSection from "@/components/WorkSection";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { localBusinessSchema } from "@/lib/seo";
import { splitHomepageAtFeaturedFaqs } from "@/lib/split-homepage-content";

const { page, metadata, jsonLd } = getWebflowPageSeo("index.html", "/");
const { before, pricing, after } = splitHomepageAtFeaturedFaqs(page.content);
const pageJsonLd =
  jsonLd.length > 0 ? jsonLd : [localBusinessSchema()];

export { metadata };

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
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
