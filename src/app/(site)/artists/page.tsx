import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo("artists.html", "/artists", {
  serviceType: "Artist Brand & Website Design",
});

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Your Artist Brand Online."
      jsonLd={jsonLd}
    />
  );
}
