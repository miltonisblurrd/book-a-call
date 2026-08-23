"use client";

import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import confetti from "canvas-confetti";
import type { BookingPayload } from "@/types/booking";

type ConfirmationScreenProps = {
  booking: BookingPayload;
};

const CONFETTI_COLORS = ["#003399", "#ff6601", "#fbcc9b", "#b7cafb", "#ffffff"];

function fireConfettiEverywhere() {
  const defaults = {
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  };

  // Big center burst
  confetti({
    ...defaults,
    particleCount: 160,
    spread: 100,
    startVelocity: 55,
    origin: { x: 0.5, y: 0.55 },
  });

  // Side cannons
  confetti({
    ...defaults,
    particleCount: 90,
    angle: 60,
    spread: 70,
    startVelocity: 65,
    origin: { x: 0, y: 0.7 },
  });
  confetti({
    ...defaults,
    particleCount: 90,
    angle: 120,
    spread: 70,
    startVelocity: 65,
    origin: { x: 1, y: 0.7 },
  });

  // Keep raining from the top for a few beats
  const end = Date.now() + 2200;
  const frame = () => {
    confetti({
      ...defaults,
      particleCount: 6,
      startVelocity: 25,
      spread: 360,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.25,
      },
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export default function ConfirmationScreen({ booking }: ConfirmationScreenProps) {
  const start = parseISO(booking.slot.start);
  const end = parseISO(booking.slot.end);

  useEffect(() => {
    fireConfettiEverywhere();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 sm:p-10 text-center min-h-[400px] font-mono">
      {/* Check icon */}
      <div className="w-16 h-16 flex items-center justify-center border-4 border-[#003399]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#003399"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#003399] mb-2">
          You&apos;re confirmed!
        </h2>
        <p className="text-[#003399]/60 text-sm max-w-xs mx-auto">
          A Google Calendar invite has been sent to{" "}
          <strong className="text-[#003399]">{booking.email}</strong>. I&apos;m
          looking forward to chatting.
        </p>
      </div>

      {/* Booking summary */}
      <div className="border-2 border-[#003399] px-8 py-5 w-full max-w-sm text-left space-y-3">
        <SummaryRow label="Date" value={format(start, "EEEE, MMMM d, yyyy")} />
        <SummaryRow
          label="Time"
          value={`${format(start, "h:mmaaa")} – ${format(end, "h:mmaaa")}`}
        />
        <SummaryRow label="Duration" value="15 min" />
        <SummaryRow label="Name" value={booking.name} />
        <SummaryRow label="Email" value={booking.email} />
      </div>

      <p className="text-xs text-[#003399]/40">
        Check your inbox for the calendar invite and Google Meet link.
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm border-b border-[#003399]/10 pb-2 last:border-0 last:pb-0">
      <span className="text-[#003399]/50 font-bold">{label}</span>
      <span className="text-[#003399] text-right font-medium">{value}</span>
    </div>
  );
}
