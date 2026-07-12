import Footer from "@/components/Footer";
import GlowCode from "@/components/GlowCode";
import Navigation from "@/components/Navigation";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const page = getWebflowPage("404.html");

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: page.metadata.title || "Page Not Found | BLURRD Studio",
    description:
      page.metadata.description ||
      "The page you are looking for could not be found. Return to BLURRD Studio to explore our services.",
    path: "/404",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="page-wrapper code">
      <Navigation />
      <main className="body-wrapper code">
        <WebflowContent html={page.content} />
        <Footer />
        <GlowCode />
      </main>
    </div>
  );
}
