import JsonLd from "@/components/JsonLd";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "services/ongoing-support.html",
  "/services/ongoing-support",
  { serviceType: "Website Support" }
);

export { metadata };

export default function Page() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={page.content} depth={1} />
    </>
  );
}
