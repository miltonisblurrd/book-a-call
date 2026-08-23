import BookingFlow from "@/components/booking/BookingFlow";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildPageMetadata, serviceSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Call — BLURRD Studio",
  description:
    "Schedule a free 15-minute intro call with BLURRD Studio. Tell us about your project and I'll outline how I can help with branding, web design, and development.",
  path: "/book-a-call",
});

const jsonLd = [
  serviceSchema({
    name: "Project Discovery Call",
    description:
      "Schedule a free 15-minute intro call with BLURRD Studio to discuss branding, web design, and development needs.",
    path: "/book-a-call",
    serviceType: "Consultation",
  }),
  breadcrumbSchema([{ name: "Book a Call", path: "/book-a-call" }]),
];

export default function BookACallPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <BookingFlow />
    </>
  );
}
