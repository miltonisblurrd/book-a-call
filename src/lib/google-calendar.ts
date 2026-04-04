import { google } from "googleapis";
import { addMinutes, format, parseISO, setHours, setMinutes, startOfDay } from "date-fns";
import type { TimeSlot } from "@/types/booking";

const DURATION_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_BOOKING_DURATION_MINUTES ?? "30",
  10
);

// Working hours: 9am – 6pm
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return client;
}

function formatSlotLabel(date: Date): string {
  return format(date, "h:mmaaa"); // "9:00am"
}

/**
 * Returns available time slots for a given date by checking Google Calendar freebusy.
 */
export async function getAvailability(dateStr: string): Promise<TimeSlot[]> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const dayStart = startOfDay(parseISO(dateStr));
  const windowStart = setMinutes(setHours(dayStart, WORK_START_HOUR), 0);
  const windowEnd = setMinutes(setHours(dayStart, WORK_END_HOUR), 0);

  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin: windowStart.toISOString(),
      timeMax: windowEnd.toISOString(),
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });

  const busyPeriods =
    data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? [];

  const slots: TimeSlot[] = [];
  let cursor = windowStart;

  while (addMinutes(cursor, DURATION_MINUTES) <= windowEnd) {
    const slotEnd = addMinutes(cursor, DURATION_MINUTES);
    const slotStart = cursor;

    const isBusy = busyPeriods.some((period) => {
      const busyStart = parseISO(period.start!);
      const busyEnd = parseISO(period.end!);
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

  console.log("[availability] slots generated:", slots.length);
  return slots;}

/**
 * Creates a Google Calendar event and sends invites to both attendees.
 */
export async function createCalendarEvent(params: {
  title: string;
  start: string;
  end: string;
  attendeeEmail: string;
  attendeeName: string;
  description: string;
}): Promise<string> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const { data } = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    sendUpdates: "all",
    requestBody: {
      summary: params.title,
      description: params.description,
      start: { dateTime: params.start },
      end: { dateTime: params.end },
      attendees: [
        { email: process.env.GOOGLE_CALENDAR_ID, displayName: "Your Name" },
        { email: params.attendeeEmail, displayName: params.attendeeName },
      ],
      conferenceData: {
        createRequest: {
          requestId: `bac-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
    conferenceDataVersion: 1,
  });

  return data.id!;
}
