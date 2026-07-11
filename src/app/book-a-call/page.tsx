import BookingFlow from "@/components/booking/BookingFlow";

export const metadata = {
  title: "Book a Call — BLURRD Studio",
  description:
    "Schedule a free 30-minute intro call with BLURRD Studio. Tell us about your project and we'll outline how we can help with branding, web design, and development.",
};

export default function BookACallPage() {
  return <BookingFlow />;
}
