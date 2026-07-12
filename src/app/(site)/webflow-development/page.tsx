import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "webflow-development.html",
  "/webflow-development",
  { serviceType: "Webflow Development" }
);

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Your Webflow Site Right."
      jsonLd={jsonLd}
    />
  );
}
