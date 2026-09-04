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

const NAVY = "#003399";
const ORANGE = "#fbcc9b";

type BookingFlowProps = {
  embedded?: boolean;
};

export default function BookingFlow({ embedded = false }: BookingFlowProps) {
  const [step, setStep] = useState<BookingStep>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE = "";

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

  const selectSlot = (slot: TimeSlot) => {
    if (slot.available === false) return;
    setSelectedSlot(slot);
    setTimeout(() => setStep("form"), 300);
  };

  return (
    <div
      className={
        embedded
          ? "bg-[#f0ede8] flex items-start justify-center p-3 sm:p-4 py-6 sm:py-8 font-mono"
          : "min-h-screen bg-[#f0ede8] flex items-start lg:items-center justify-center p-3 sm:p-4 py-6 sm:py-8 font-mono"
      }
    >
      <div className="w-full max-w-5xl">

        {step === "confirmation" && confirmedBooking ? (
          <div>
            <div className="px-4 py-4 sm:px-5 md:px-6 mb-4 sm:mb-6" style={{ backgroundColor: ORANGE }}>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                You&apos;re booked!
              </h1>
            </div>
            <div style={{ border: `2px solid ${NAVY}` }}>
              <ConfirmationScreen booking={confirmedBooking} />
            </div>
          </div>
        ) : (
          <div>
            <div className="px-4 py-4 sm:px-5 md:px-6 mb-4 sm:mb-6" style={{ backgroundColor: ORANGE }}>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                Let&apos;s Chat!
              </h1>
              <p className="text-sm mt-0.5 font-medium" style={{ color: NAVY, opacity: 0.75 }}>
                Walk me through what you&apos;re building. I will outline how I can help.
              </p>
            </div>

            <div style={{ border: `2px solid ${NAVY}` }}>
              {/* Compact intro — phones + tablets in portrait */}
              <div className="lg:hidden px-4 py-4" style={{ backgroundColor: NAVY }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>
                  blurrd studio
                </p>
                <h2 className="text-lg font-bold text-white">Intro Call · 15 min</h2>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Google Meet link on confirm · America / Los Angeles
                </p>
              </div>

              <div
                className={
                  step === "datetime"
                    ? "flex flex-col lg:grid lg:grid-cols-[240px_minmax(0,1fr)_240px]"
                    : "flex flex-col lg:grid lg:grid-cols-[240px_minmax(0,1fr)]"
                }
              >
                <div className="hidden lg:block" style={{ backgroundColor: NAVY }}>
                  <Sidebar selectedSlot={step === "form" ? selectedSlot : null} />
                </div>

                <AnimatePresence mode="wait">
                  {step === "datetime" && (
                    <motion.div
                      key="calendar"
                      {...SLIDE}
                      className="lg:[border-left:2px_solid_#003399] min-w-0"
                    >
                      <CalendarPicker
                        selectedDate={selectedDate}
                        onSelectDate={(date) => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                      />

                      <div className="lg:hidden" style={{ borderTop: `2px solid ${NAVY}` }}>
                        {selectedDate ? (
                          <TimePicker
                            date={selectedDate}
                            slots={slots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={selectSlot}
                            loading={slotsLoading}
                          />
                        ) : (
                          <div className="flex items-center justify-center py-8 px-6">
                            <p className="text-sm text-center" style={{ color: NAVY, opacity: 0.5 }}>
                              Select a date to see available times
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === "form" && selectedSlot && (
                    <motion.div
                      key="form"
                      {...SLIDE}
                      className="lg:[border-left:2px_solid_#003399] min-w-0"
                    >
                      <IntakeForm
                        slot={selectedSlot}
                        onSubmit={handleConfirm}
                        onBack={() => setStep("datetime")}
                        submitting={submitting}
                      />
                      {error && (
                        <p className="text-xs text-red-500 text-center pb-4 px-4">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {step === "datetime" && (
                  <div className="hidden lg:block min-w-0" style={{ borderLeft: `2px solid ${NAVY}` }}>
                    {selectedDate ? (
                      <TimePicker
                        date={selectedDate}
                        slots={slots}
                        selectedSlot={selectedSlot}
                        onSelectSlot={selectSlot}
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
