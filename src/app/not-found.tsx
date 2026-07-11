import Footer from "@/components/Footer";
import GlowCode from "@/components/GlowCode";
import Navigation from "@/components/Navigation";
import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";

const page = getWebflowPage("404.html");

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
