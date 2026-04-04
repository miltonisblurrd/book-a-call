import { Resend } from "resend";
import { format, parseISO } from "date-fns";
import type { BookingPayload } from "@/types/booking";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendBookingEmail(booking: BookingPayload): Promise<void> {
  const resend = getResend();
  const startDate = parseISO(booking.slot.start);
  const endDate = parseISO(booking.slot.end);

  const dateLabel = format(startDate, "EEEE, MMMM d, yyyy");
  const timeLabel = `${format(startDate, "h:mmaaa")} – ${format(endDate, "h:mmaaa")}`;

  const htmlBody = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #111111; margin-bottom: 4px;">New Intro Call Booked</h1>
      <p style="font-size: 14px; color: #6b7280; margin-bottom: 32px;">${dateLabel} &middot; ${timeLabel}</p>

      <table style="width: 100%; border-collapse: collapse;">
        ${row("Name", booking.name)}
        ${row("Email", `<a href="mailto:${booking.email}" style="color: #111111;">${booking.email}</a>`)}
        ${row("Website", booking.website ? `<a href="${booking.website}" style="color: #111111;">${booking.website}</a>` : "—")}
        ${row("How can we help?", booking.help)}
        ${row("Estimated budget", booking.budget)}
        ${row("Timeline", booking.timeline)}
        ${row("Additional details", booking.details || "—")}
      </table>

      <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-radius: 8px; font-size: 13px; color: #6b7280;">
        This booking was made via your book-a-call page. A Google Calendar invite has been sent to ${booking.email}.
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Book a Call <onboarding@resend.dev>",
    to: process.env.YOUR_EMAIL!,
    replyTo: booking.email,
    subject: `New call booked: ${booking.name} — ${dateLabel}`,
    html: htmlBody,
  });
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 600; color: #6b7280; width: 160px; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #111111; vertical-align: top;">${value}</td>
    </tr>
  `;
}
