import JsonLd from "@/components/JsonLd";
import PricingSection from "@/components/PricingSection";
import WebflowContent from "@/components/WebflowContent";
import { splitAtPricingSection } from "@/lib/split-pricing-section";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo("services.html", "/services");
const { before, hasPricing, after } = splitAtPricingSection(page.content);

export { metadata };

export default function ServicesPage() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={before} depth={0} />
      {hasPricing ? <PricingSection id="pricing" /> : null}
      <WebflowContent html={after} depth={0} />
    </>
  );
}
