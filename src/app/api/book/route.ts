import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { parseISO } from "date-fns";
import {
  createCalendarEvent,
  isSlotStillAvailable,
} from "@/lib/google-calendar";
import { sendBookingEmail } from "@/lib/email";

const schema = z.object({
  slot: z.object({
    start: z.string(),
    end: z.string(),
    label: z.string(),
    available: z.boolean().optional(),
  }),
  name: z.string().min(1),
  email: z.string().email(),
  website: z.string().optional().default(""),
  help: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  details: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request data.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const booking = {
    ...parsed.data,
    slot: {
      ...parsed.data.slot,
      available: parsed.data.slot.available ?? true,
    },
  };
  const start = parseISO(booking.slot.start);
  const end = parseISO(booking.slot.end);

  try {
    const stillOpen = await isSlotStillAvailable(
      booking.slot.start,
      booking.slot.end
    );
    if (!stillOpen) {
      return NextResponse.json(
        {
          error:
            "That time was just taken. Please pick another available slot.",
        },
        { status: 409 }
      );
    }
  } catch (err) {
    console.error("[book] availability check", err);
    return NextResponse.json(
      { error: "Could not verify availability. Please try again." },
      { status: 503 }
    );
  }

  const description = [
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    booking.website ? `Website: ${booking.website}` : null,
    `How we can help: ${booking.help}`,
    `Estimated budget: ${booking.budget}`,
    `Timeline: ${booking.timeline}`,
    booking.details ? `Additional details:\n${booking.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const [eventId] = await Promise.all([
      createCalendarEvent({
        title: `Intro Call — ${booking.name}`,
        start: start.toISOString(),
        end: end.toISOString(),
        attendeeEmail: booking.email,
        attendeeName: booking.name,
        description,
      }),
      sendBookingEmail(booking),
    ]);

    return NextResponse.json({ success: true, eventId });
  } catch (err) {
    console.error("[book]", err);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}
