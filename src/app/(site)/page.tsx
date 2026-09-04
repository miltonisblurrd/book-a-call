import BookingFlow from "@/components/booking/BookingFlow";
import JsonLd from "@/components/JsonLd";
import TestimonialsSection from "@/components/TestimonialsSection";
import WebflowContent from "@/components/WebflowContent";
import { extractHomepageHero } from "@/lib/extract-homepage-hero";
import { getWebflowPage } from "@/lib/get-webflow-page";
import { localBusinessSchema, buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "BLURRD Studio — Coming Soon | Rebrand in Progress",
  description:
    "BLURRD Studio is undergoing a rebrand. Text Milton at 702-677-8392 or book a 15-minute call while the new site comes together.",
  path: "/",
});

const jsonLd = [localBusinessSchema()];

export default function Page() {
  const page = getWebflowPage("index.html");
  const heroHtml = extractHomepageHero(page.content);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WebflowContent html={heroHtml} depth={page.depth} />
      <TestimonialsSection />

      <section className="section u-pt-0">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">Coming Soon</h2>
          </div>
          <div className="wrapper-blue">
            <div className="wrapper-blue-header u-p-20-around">
              <div className="wrapper-header u-mb-0">
                <p className="text-paragraph u-extra-bold u-text-white u-mb-0">
                  A rebrand is in progress
                </p>
              </div>
            </div>
            <div className="u-p-20-around">
              <p className="text-paragraph u-text-gray">
                I&apos;m refreshing the BLURRD Studio brand and site. The work
                continues—reach out anytime while the new experience comes
                online.
              </p>
              <p className="text-paragraph u-text-gray u-mt-2">
                Prefer text?{" "}
                <a
                  href="sms:+17026778392"
                  className="u-extra-bold"
                  style={{ color: "#003399" }}
                >
                  Text me: 702-677-8392
                </a>
              </p>
              <p className="text-paragraph u-text-gray u-mt-2">
                Or book a 15-minute intro call below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section u-pt-0">
        <div className="container">
          <BookingFlow embedded />
        </div>
      </section>
    </>
  );
}
