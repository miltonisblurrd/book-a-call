import HomeFeaturedFaqs from "@/components/HomeFeaturedFaqs";
import JsonLd from "@/components/JsonLd";
import PricingSection from "@/components/PricingSection";
import WebflowContent from "@/components/WebflowContent";
import WorkSection from "@/components/WorkSection";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { localBusinessSchema } from "@/lib/seo";
import { splitHomepageAtFeaturedFaqs } from "@/lib/split-homepage-content";

const { page, metadata, jsonLd } = getWebflowPageSeo("index.html", "/");
const { before, hasPricing, after } = splitHomepageAtFeaturedFaqs(page.content);
const pageJsonLd =
  jsonLd.length > 0 ? jsonLd : [localBusinessSchema()];

export { metadata };

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <WebflowContent html={before} depth={0} />
      <WorkSection />
      {hasPricing ? <PricingSection /> : null}
      <HomeFeaturedFaqs />
      <WebflowContent html={after} depth={0} />
    </>
  );
}
