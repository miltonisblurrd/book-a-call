import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "blurrd-studio-advantages.html",
  "/blurrd-studio-advantages"
);

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Something Worth Remembering."
      jsonLd={jsonLd}
    />
  );
}
