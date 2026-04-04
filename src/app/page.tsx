import BookingFlow from "@/components/booking/BookingFlow";

export const metadata = {
  title: "Book a Call",
  description: "Schedule a 30-minute intro call to discuss your project.",
};

export default function BookACallPage() {
  return <BookingFlow />;
}
