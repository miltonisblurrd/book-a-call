"use client";

import { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
  format,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type CalendarPickerProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  availableDates?: string[]; // ISO date strings that have availability
};

export default function CalendarPicker({
  selectedDate,
  onSelectDate,
  availableDates,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday-first offset (0=Mon … 6=Sun)
  const startOffset = (getDay(monthStart) + 6) % 7;

  function isAvailable(date: Date) {
    if (isBefore(date, today)) return false;
    const weekday = getDay(date); // 0 = Sun, 6 = Sat
    if (weekday === 0 || weekday === 6) return false;
    if (!availableDates) return true; // optimistic until fetched
    return availableDates.includes(format(date, "yyyy-MM-dd"));
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#003399] font-mono">
            {format(currentMonth, "MMMM")}
          </span>
          <span className="text-lg font-bold text-[#003399]/40 font-mono">
            {format(currentMonth, "yyyy")}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            disabled={isBefore(startOfMonth(currentMonth), today)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#003399]/50 hover:text-[#003399] hover:bg-[#003399]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#003399]/50 hover:text-[#003399] hover:bg-[#003399]/10 transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Leading empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const available = isAvailable(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const todayFlag = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => available && onSelectDate(day)}
              disabled={!available}
              className={cn(
                "relative flex items-center justify-center rounded-full w-10 h-10 sm:w-9 sm:h-9 text-sm font-medium mx-auto transition-all font-mono",
                available && !selected
                  ? "text-[#003399] hover:bg-[#003399]/10 cursor-pointer"
                  : "",
                selected
                  ? "bg-[#003399] text-white hover:bg-[#003399]/90"
                  : "",
                !available
                  ? "text-gray-300 cursor-not-allowed"
                  : "",
                todayFlag && !selected
                  ? "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-[#fbcc9b]"
                  : ""
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
