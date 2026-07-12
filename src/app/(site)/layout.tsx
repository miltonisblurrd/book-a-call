import JsonLd from "@/components/JsonLd";
import Footer from "@/components/Footer";
import GlowCode from "@/components/GlowCode";
import Navigation from "@/components/Navigation";
import WebflowSlider from "@/components/WebflowSlider";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import Script from "next/script";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <div className="page-wrapper code">
        <Navigation />
        <main className="body-wrapper code">
          {children}
          <Footer />
          <GlowCode />
          <WebflowSlider />
        </main>
      </div>
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=635708aab1dd169d3b9ed6aa"
        strategy="afterInteractive"
      />
      <Script src="/js/blurrd-studi.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/gh/miltonisblurrd/backgroundHover@main/scripts.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://unpkg.com/@rive-app/canvas@2.26.4"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/miltonisblurrd/image-blurrd-nav@main/webflow-rive-image-blurrd.js"
        strategy="afterInteractive"
      />
    </>
  );
}
