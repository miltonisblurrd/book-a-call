import AboutPageEnhancements from "@/components/AboutPageEnhancements";
import JsonLd from "@/components/JsonLd";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";
import { stripEmbeddedScripts } from "@/lib/strip-embedded-scripts";

const { metadata, jsonLd } = getWebflowPageSeo("about.html", "/about");

export { metadata };

export default function Page() {
  const { content } = getWebflowPage("about.html");

  return (
    <>
      {jsonLd.length > 0 ? <JsonLd data={jsonLd} /> : null}
      <WebflowContent html={stripEmbeddedScripts(content)} depth={0} />
      <AboutPageEnhancements />
    </>
  );
}
