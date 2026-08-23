import {
  addMinutes,
  format,
  getDay,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import type { TimeSlot } from "@/types/booking";

const DURATION_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_BOOKING_DURATION_MINUTES ?? "15",
  10
);
const WORK_START_HOUR = 9;
/** Last bookable start time — 4:30pm (meeting ends by 4:45pm; nothing after 5pm). */
const LAST_SLOT_HOUR = 16;
const LAST_SLOT_MINUTE = 30;
/** Fraction of free slots to show as already booked (visual scarcity). */
const FAKE_BUSY_PERCENT = 38;

function formatSlotLabel(date: Date): string {
  return format(date, "h:mmaaa");
}

function isWeekend(date: Date): boolean {
  const day = getDay(date); // 0 = Sun, 6 = Sat
  return day === 0 || day === 6;
}

/** Stable hash so “fake busy” slots don’t flicker between refreshes. */
function hashSlot(dateStr: string, slotStart: Date): number {
  const key = `${dateStr}|${slotStart.getUTCHours()}:${slotStart.getUTCMinutes()}`;
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function isArtificiallyBusy(dateStr: string, slotStart: Date): boolean {
  return hashSlot(dateStr, slotStart) % 100 < FAKE_BUSY_PERCENT;
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get access token: ${err}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function getAvailability(dateStr: string): Promise<TimeSlot[]> {
  const dayStart = startOfDay(parseISO(dateStr));

  if (isWeekend(dayStart)) {
    return [];
  }

  const token = await getAccessToken();

  const windowStart = setMinutes(setHours(dayStart, WORK_START_HOUR), 0);
  const lastSlotStart = setMinutes(
    setHours(dayStart, LAST_SLOT_HOUR),
    LAST_SLOT_MINUTE
  );
  const windowEnd = addMinutes(lastSlotStart, DURATION_MINUTES);

  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: windowStart.toISOString(),
        timeMax: windowEnd.toISOString(),
        items: [{ id: calendarId }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Freebusy query failed: ${err}`);
  }

  const data = (await res.json()) as {
    calendars: Record<string, { busy: { start: string; end: string }[] }>;
  };

  const busyPeriods = data.calendars?.[calendarId]?.busy ?? [];

  const slots: TimeSlot[] = [];
  let cursor = windowStart;

  while (cursor <= lastSlotStart) {
    const slotEnd = addMinutes(cursor, DURATION_MINUTES);
    const slotStart = cursor;

    const calendarBusy = busyPeriods.some((period) => {
      const busyStart = parseISO(period.start);
      const busyEnd = parseISO(period.end);
      return slotStart < busyEnd && slotEnd > busyStart;
    });

    const available =
      !calendarBusy && !isArtificiallyBusy(dateStr, slotStart);

    slots.push({
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      label: formatSlotLabel(slotStart),
      available,
    });

    cursor = addMinutes(cursor, DURATION_MINUTES);
  }

  return slots;
}

export async function isSlotStillAvailable(
  startIso: string,
  endIso: string
): Promise<boolean> {
  const dateStr = format(parseISO(startIso), "yyyy-MM-dd");
  const slots = await getAvailability(dateStr);
  return slots.some(
    (slot) =>
      slot.available && slot.start === startIso && slot.end === endIso
  );
}

export async function createCalendarEvent(params: {
  title: string;
  start: string;
  end: string;
  attendeeEmail: string;
  attendeeName: string;
  description: string;
}): Promise<string> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all&conferenceDataVersion=1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: params.title,
        description: params.description,
        start: { dateTime: params.start },
        end: { dateTime: params.end },
        attendees: [
          { email: calendarId },
          { email: params.attendeeEmail, displayName: params.attendeeName },
        ],
        conferenceData: {
          createRequest: {
            requestId: `bac-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create calendar event: ${err}`);
  }

  const event = (await res.json()) as { id: string };
  return event.id;
}
