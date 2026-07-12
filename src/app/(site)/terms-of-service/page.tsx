import JsonLd from "@/components/JsonLd";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "terms-of-service.html",
  "/terms-of-service"
);

export { metadata };

export default function Page() {
  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={page.content} depth={0} />
    </>
  );
}
