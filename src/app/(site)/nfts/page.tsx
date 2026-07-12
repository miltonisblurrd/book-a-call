import ServiceStylePage from "@/components/ServiceStylePage";
import { getWebflowPageSeo } from "@/lib/webflow-page-seo";

const { page, metadata, jsonLd } = getWebflowPageSeo("nfts.html", "/nfts", {
  serviceType: "NFT & Web3 Development",
});

export { metadata };

export default function Page() {
  return (
    <ServiceStylePage
      html={page.content}
      ctaHeadline="Let's Build Your Next Web3 Experience."
      jsonLd={jsonLd}
    />
  );
}
