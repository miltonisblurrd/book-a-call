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
const BOOKING_TIMEZONE = "America/Los_Angeles";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Convert a wall-clock time in America/Los_Angeles on YYYY-MM-DD to a UTC Date.
 * Avoids depending on the server's local timezone (Vercel = UTC).
 */
function laLocalToUtc(dateStr: string, hour: number, minute: number): Date {
  const asUtc = new Date(
    `${dateStr}T${pad2(hour)}:${pad2(minute)}:00.000Z`
  );
  const inLa = new Date(
    asUtc.toLocaleString("en-US", { timeZone: BOOKING_TIMEZONE })
  );
  const inUtc = new Date(asUtc.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(asUtc.getTime() + (inUtc.getTime() - inLa.getTime()));
}

function formatSlotLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(":00", "");
}

function isWeekendInLa(dateStr: string): boolean {
  const midday = laLocalToUtc(dateStr, 12, 0);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    weekday: "short",
  }).format(midday);
  return weekday === "Sat" || weekday === "Sun";
}

/** Stable hash so “fake busy” slots don’t flicker between refreshes. */
function hashSlot(dateStr: string, slotStart: Date): number {
  const key = `${dateStr}|${slotStart.toISOString()}`;
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

function assertCalendarEnv(): void {
  const missing = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REFRESH_TOKEN",
    "GOOGLE_CALENDAR_ID",
  ].filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    throw new Error(
      `Calendar not configured. Missing env: ${missing.join(", ")}`
    );
  }
}

async function getAccessToken(): Promise<string> {
  assertCalendarEnv();

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
  if (isWeekendInLa(dateStr)) {
    return [];
  }

  const token = await getAccessToken();

  const windowStart = laLocalToUtc(dateStr, WORK_START_HOUR, 0);
  const lastSlotStart = laLocalToUtc(
    dateStr,
    LAST_SLOT_HOUR,
    LAST_SLOT_MINUTE
  );
  const windowEnd = new Date(
    lastSlotStart.getTime() + DURATION_MINUTES * 60_000
  );

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
    calendars: Record<
      string,
      { busy?: { start: string; end: string }[]; errors?: { reason: string }[] }
    >;
  };

  const calendar = data.calendars?.[calendarId];
  if (calendar?.errors?.length) {
    throw new Error(
      `Freebusy calendar error: ${calendar.errors
        .map((e) => e.reason)
        .join(", ")}`
    );
  }

  const busyPeriods = calendar?.busy ?? [];

  const slots: TimeSlot[] = [];
  let cursor = windowStart.getTime();
  const lastStartMs = lastSlotStart.getTime();
  const stepMs = DURATION_MINUTES * 60_000;

  while (cursor <= lastStartMs) {
    const slotStart = new Date(cursor);
    const slotEnd = new Date(cursor + stepMs);

    const calendarBusy = busyPeriods.some((period) => {
      const busyStart = new Date(period.start).getTime();
      const busyEnd = new Date(period.end).getTime();
      return cursor < busyEnd && cursor + stepMs > busyStart;
    });

    const available =
      !calendarBusy && !isArtificiallyBusy(dateStr, slotStart);

    slots.push({
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      label: formatSlotLabel(slotStart),
      available,
    });

    cursor += stepMs;
  }

  return slots;
}

export async function isSlotStillAvailable(
  startIso: string,
  endIso: string
): Promise<boolean> {
  const start = new Date(startIso);
  const dateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(start);
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
        start: {
          dateTime: params.start,
          timeZone: BOOKING_TIMEZONE,
        },
        end: {
          dateTime: params.end,
          timeZone: BOOKING_TIMEZONE,
        },
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
