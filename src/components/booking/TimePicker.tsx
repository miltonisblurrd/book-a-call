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
    <div className="flex flex-col gap-3 p-4 sm:p-6 border-l-0 lg:border-l border-gray-100 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold text-[#003399] font-mono">
          <span className="text-base">{format(date, "EEE")}</span>{" "}
          <span className="text-base text-[#003399]/50">{format(date, "dd")}</span>
        </div>
        <div className="flex rounded border-2 border-[#003399] overflow-hidden text-xs font-bold font-mono">
          <button
            onClick={() => setFormat12h(true)}
            className={cn(
              "px-2.5 py-1 transition-colors",
              format12h ? "bg-[#003399] text-white" : "text-[#003399] hover:bg-[#003399]/10"
            )}
          >
            12h
          </button>
          <button
            onClick={() => setFormat12h(false)}
            className={cn(
              "px-2.5 py-1 transition-colors",
              !format12h ? "bg-[#003399] text-white" : "text-[#003399] hover:bg-[#003399]/10"
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
            const isSelected = selectedSlot?.start === slot.start;
            const isOpen = slot.available !== false;

            return (
              <button
                key={slot.start}
                type="button"
                disabled={!isOpen}
                onClick={() => {
                  if (isOpen) onSelectSlot(slot);
                }}
                className={cn(
                  "w-full py-2.5 rounded text-sm font-bold border-2 transition-all font-mono",
                  !isOpen &&
                    "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through decoration-gray-300",
                  isOpen &&
                    isSelected &&
                    "bg-[#003399] text-white border-[#003399]",
                  isOpen &&
                    !isSelected &&
                    "bg-white text-[#003399] border-[#003399]/30 hover:border-[#003399] hover:bg-[#003399]/5"
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
