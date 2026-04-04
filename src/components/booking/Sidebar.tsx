"use client";

import { format, parseISO } from "date-fns";
import type { TimeSlot } from "@/types/booking";

type SidebarProps = {
  selectedSlot?: TimeSlot | null;
};

export default function Sidebar({ selectedSlot }: SidebarProps) {
  return (
    <aside className="flex flex-col gap-5 p-6 w-full">
      {/* Avatar / brand */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            K
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white -ml-2">
            S
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">your.studio</p>
        <h2 className="text-xl font-bold text-gray-900">Intro Call</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          An intro call to discuss your project scope, timeline, and what
          working together could look like.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm text-gray-600">
        {/* Duration */}
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span>30m</span>
        </div>

        {/* Selected date/time — shown after slot is picked */}
        {selectedSlot && (
          <div className="flex items-start gap-2">
            <CalendarIcon />
            <span>
              {format(parseISO(selectedSlot.start), "EEEE, MMMM d, yyyy")}
              <br />
              <span className="text-gray-500">
                {format(parseISO(selectedSlot.start), "h:mmaaa")} –{" "}
                {format(parseISO(selectedSlot.end), "h:mmaaa")}
              </span>
            </span>
          </div>
        )}

        {/* Meet link placeholder */}
        <div className="flex items-center gap-2">
          <LinkIcon />
          <span>Google Meet link sent on confirm</span>
        </div>

        {/* Timezone */}
        <div className="flex items-center gap-2">
          <GlobeIcon />
          <span>America/Los_Angeles</span>
        </div>
      </div>
    </aside>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="shrink-0 mt-0.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="shrink-0">
      <path strokeLinecap="round" d="M13.828 10.172a4 4 0 00-5.656 0l-3 3a4 4 0 005.656 5.656l1.5-1.5" />
      <path strokeLinecap="round" d="M10.172 13.828a4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 3a15 15 0 010 18M3 12h18" />
      <path strokeLinecap="round" d="M3.6 7.5h16.8M3.6 16.5h16.8" />
    </svg>
  );
}
