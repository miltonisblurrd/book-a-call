"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";

import Sidebar from "./Sidebar";
import CalendarPicker from "./CalendarPicker";
import TimePicker from "./TimePicker";
import IntakeForm from "./IntakeForm";
import ConfirmationScreen from "./ConfirmationScreen";

import type { Transition } from "framer-motion";
import type {
  BookingStep,
  TimeSlot,
  BookingFormData,
  BookingPayload,
} from "@/types/booking";

const TRANSITION: Transition = { duration: 0.22, ease: "easeInOut" };

const SLIDE = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: TRANSITION,
};

// Brand colors matching blurrdstudio.com
const NAVY = "#1B2D6B";
const ORANGE = "#F5A23A";

export default function BookingFlow() {
  const [step, setStep] = useState<BookingStep>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE = "/book-a-call";

  const fetchSlots = useCallback(async (date: Date) => {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const res = await fetch(`${BASE}/api/availability?date=${dateStr}`);
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  async function handleConfirm(formData: BookingFormData) {
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload: BookingPayload = { ...formData, slot: selectedSlot };
      const res = await fetch(`${BASE}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Booking failed. Please try again.");
      }
      setConfirmedBooking(payload);
      setStep("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-5xl">

        {step === "confirmation" && confirmedBooking ? (
          /* Confirmation — orange banner + navy card */
          <div>
            <div
              className="px-6 py-4 mb-0"
              style={{ backgroundColor: ORANGE }}
            >
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                You&apos;re booked!
              </h1>
            </div>
            <div style={{ border: `3px solid ${NAVY}` }}>
              <ConfirmationScreen booking={confirmedBooking} />
            </div>
          </div>
        ) : (
          <div>
            {/* Orange banner — "Let's Chat!" */}
            <div
              className="px-6 py-4"
              style={{ backgroundColor: ORANGE }}
            >
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                Let&apos;s Chat!
              </h1>
              <p className="text-sm mt-0.5 font-medium" style={{ color: NAVY, opacity: 0.75 }}>
                Walk us through what you&apos;re building. We&apos;ll outline how we can help.
              </p>
            </div>

            {/* Main card — navy border */}
            <div style={{ border: `3px solid ${NAVY}`, borderTop: "none" }}>
              <div
                className={
                  step === "datetime"
                    ? "grid grid-cols-[260px_1fr_260px]"
                    : "grid grid-cols-[260px_1fr]"
                }
              >
                {/* Sidebar — navy background */}
                <div style={{ backgroundColor: NAVY }}>
                  <Sidebar selectedSlot={step === "form" ? selectedSlot : null} />
                </div>

                {/* Divider line */}
                <AnimatePresence mode="wait">
                  {step === "datetime" && (
                    <motion.div
                      key="calendar"
                      {...SLIDE}
                      style={{ borderLeft: `3px solid ${NAVY}` }}
                    >
                      <CalendarPicker
                        selectedDate={selectedDate}
                        onSelectDate={(date) => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                      />
                    </motion.div>
                  )}

                  {step === "form" && selectedSlot && (
                    <motion.div
                      key="form"
                      {...SLIDE}
                      style={{ borderLeft: `3px solid ${NAVY}` }}
                    >
                      <IntakeForm
                        slot={selectedSlot}
                        onSubmit={handleConfirm}
                        onBack={() => setStep("datetime")}
                        submitting={submitting}
                      />
                      {error && (
                        <p className="text-xs text-red-500 text-center pb-4">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Time picker — step 1 only */}
                {step === "datetime" && (
                  <div style={{ borderLeft: `3px solid ${NAVY}` }}>
                    {selectedDate ? (
                      <TimePicker
                        date={selectedDate}
                        slots={slots}
                        selectedSlot={selectedSlot}
                        onSelectSlot={(slot) => {
                          setSelectedSlot(slot);
                          setTimeout(() => setStep("form"), 300);
                        }}
                        loading={slotsLoading}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-6">
                        <p className="text-sm text-center" style={{ color: NAVY, opacity: 0.5 }}>
                          Select a date to see available times
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
