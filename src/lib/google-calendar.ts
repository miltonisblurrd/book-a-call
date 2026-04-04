import {
  addMinutes,
  format,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import type { TimeSlot } from "@/types/booking";

const DURATION_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_BOOKING_DURATION_MINUTES ?? "30",
  10
);
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

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

  const data = await res.json() as { access_token: string };
  return data.access_token;
}

function formatSlotLabel(date: Date): string {
  return format(date, "h:mmaaa");
}

export async function getAvailability(dateStr: string): Promise<TimeSlot[]> {
  const token = await getAccessToken();

  const dayStart = startOfDay(parseISO(dateStr));
  const windowStart = setMinutes(setHours(dayStart, WORK_START_HOUR), 0);
  const windowEnd = setMinutes(setHours(dayStart, WORK_END_HOUR), 0);

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
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Freebusy query failed: ${err}`);
  }

  const data = await res.json() as {
    calendars: Record<string, { busy: { start: string; end: string }[] }>;
  };

  const busyPeriods =
    data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? [];

  const slots: TimeSlot[] = [];
  let cursor = windowStart;

  while (addMinutes(cursor, DURATION_MINUTES) <= windowEnd) {
    const slotEnd = addMinutes(cursor, DURATION_MINUTES);
    const slotStart = cursor;

    const isBusy = busyPeriods.some((period) => {
      const busyStart = parseISO(period.start);
      const busyEnd = parseISO(period.end);
      return slotStart < busyEnd && slotEnd > busyStart;
    });

    if (!isBusy) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        label: formatSlotLabel(slotStart),
      });
    }

    cursor = addMinutes(cursor, DURATION_MINUTES);
  }

  return slots;
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

  const event = await res.json() as { id: string };
  return event.id;
}
