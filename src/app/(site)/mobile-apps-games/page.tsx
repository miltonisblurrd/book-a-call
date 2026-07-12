import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo(
  "mobile-apps-games.html",
  "/mobile-apps-games",
  { serviceType: "Mobile App & Game Development" }
);

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Your App or Game."
      jsonLd={jsonLd}
    />
  );
}
