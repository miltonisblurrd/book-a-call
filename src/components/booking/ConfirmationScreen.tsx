"use client";

import { format, parseISO } from "date-fns";
import type { BookingPayload } from "@/types/booking";

type ConfirmationScreenProps = {
  booking: BookingPayload;
};

export default function ConfirmationScreen({ booking }: ConfirmationScreenProps) {
  const start = parseISO(booking.slot.start);
  const end = parseISO(booking.slot.end);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 text-center min-h-[400px]">
      {/* Check icon */}
      <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re confirmed!
        </h2>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          A Google Calendar invite has been sent to{" "}
          <strong className="text-gray-700">{booking.email}</strong>. We&apos;re
          looking forward to chatting.
        </p>
      </div>

      {/* Booking summary */}
      <div className="bg-gray-50 rounded-2xl px-8 py-5 w-full max-w-sm text-left space-y-3">
        <SummaryRow label="Date" value={format(start, "EEEE, MMMM d, yyyy")} />
        <SummaryRow
          label="Time"
          value={`${format(start, "h:mmaaa")} – ${format(end, "h:mmaaa")}`}
        />
        <SummaryRow label="Duration" value="30 minutes" />
        <SummaryRow label="Name" value={booking.name} />
        <SummaryRow label="Email" value={booking.email} />
      </div>

      <p className="text-xs text-gray-400">
        Check your inbox for the calendar invite and Google Meet link.
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className="text-gray-900 text-right">{value}</span>
    </div>
  );
}
