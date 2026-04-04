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

export default function BookingFlow() {
  const [step, setStep] = useState<BookingStep>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Title */}
        {step !== "confirmation" && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Let&apos;s chat!
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Walk us through what you&apos;re building.
              <br />
              We&apos;ll outline how we can help.
            </p>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {step === "confirmation" && confirmedBooking ? (
            <ConfirmationScreen booking={confirmedBooking} />
          ) : (
            <div
              className={
                step === "datetime"
                  ? "grid grid-cols-[260px_1fr_280px] divide-x divide-gray-100"
                  : "grid grid-cols-[260px_1fr] divide-x divide-gray-100"
              }
            >
              {/* Sidebar */}
              <Sidebar selectedSlot={step === "form" ? selectedSlot : null} />

              <AnimatePresence mode="wait">
                {step === "datetime" && (
                  <motion.div key="calendar" {...SLIDE}>
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
                  <motion.div key="form" {...SLIDE}>
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

              {/* Time picker — only on step 1 */}
              {step === "datetime" && (
                <div>
                  {selectedDate ? (
                    <TimePicker
                      date={selectedDate}
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelectSlot={(slot) => {
                        setSelectedSlot(slot);
                        // Small delay so user sees the selection before advancing
                        setTimeout(() => setStep("form"), 300);
                      }}
                      loading={slotsLoading}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full p-6">
                      <p className="text-sm text-gray-400 text-center">
                        Select a date to see available times
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
