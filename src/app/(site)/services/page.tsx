import JsonLd from "@/components/JsonLd";
import ServicesPricingTabs from "@/components/ServicesPricingTabs";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo("services.html", "/services");

export { metadata };

export default function ServicesPage() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={page.content} depth={0} />
      <ServicesPricingTabs />
    </>
  );
}
