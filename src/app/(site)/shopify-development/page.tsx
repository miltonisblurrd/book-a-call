import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "shopify-development.html",
  "/shopify-development",
  { serviceType: "Shopify Development" }
);

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Your Shopify Store."
      jsonLd={jsonLd}
    />
  );
}
