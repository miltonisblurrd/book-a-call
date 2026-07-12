import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo("seo.html", "/seo", {
  serviceType: "SEO Services",
});

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Ready to Grow Your Search Visibility?"
      jsonLd={jsonLd}
    />
  );
}
