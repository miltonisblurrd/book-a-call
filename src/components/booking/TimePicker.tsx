"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/types/booking";

type TimePickerProps = {
  date: Date;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  loading?: boolean;
};

export default function TimePicker({
  date,
  slots,
  selectedSlot,
  onSelectSlot,
  loading,
}: TimePickerProps) {
  const [format12h, setFormat12h] = useState(true);

  function displayLabel(slot: TimeSlot): string {
    const start = parseISO(slot.start);
    if (format12h) return format(start, "h:mmaaa");
    return format(start, "HH:mm");
  }

  return (
    <div className="flex flex-col gap-3 p-6 border-l border-gray-100 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-gray-900">
          <span className="text-base">{format(date, "EEE")}</span>{" "}
          <span className="text-base text-gray-500">{format(date, "dd")}</span>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-medium">
          <button
            onClick={() => setFormat12h(true)}
            className={cn(
              "px-2.5 py-1 transition-colors",
              format12h ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            12h
          </button>
          <button
            onClick={() => setFormat12h(false)}
            className={cn(
              "px-2.5 py-1 transition-colors",
              !format12h ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            24h
          </button>
        </div>
      </div>

      {/* Slot list */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px] time-scroll pr-1">
        {loading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && slots.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No availability on this day.
          </p>
        )}

        {!loading &&
          slots.map((slot) => {
            const isSelected =
              selectedSlot?.start === slot.start;
            return (
              <button
                key={slot.start}
                onClick={() => onSelectSlot(slot)}
                className={cn(
                  "w-full py-2.5 rounded-xl text-sm font-medium border transition-all",
                  isSelected
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                )}
              >
                {displayLabel(slot)}
              </button>
            );
          })}
      </div>
    </div>
  );
}
