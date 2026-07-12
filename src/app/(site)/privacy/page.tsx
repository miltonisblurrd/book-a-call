import JsonLd from "@/components/JsonLd";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | BLURRD Studio",
  description:
    "How BLURRD Studio collects, uses, and protects information when you visit our website, book a call, or browse our blog.",
  path: "/privacy",
});

const jsonLd = [
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]),
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="section u-p-40-hero">
        <div className="container">
          <div className="wrapper-orange">
            <h1 className="h2">Privacy Policy</h1>
          </div>
          <PrivacyPolicyContent />
        </div>
      </section>
    </>
  );
}
