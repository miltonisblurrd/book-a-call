import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date. Expected YYYY-MM-DD." },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailability(date);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[availability]", err);
    const message =
      err instanceof Error ? err.message : "Failed to fetch availability.";
    const isConfig = message.includes("Calendar not configured");
    return NextResponse.json(
      {
        error: isConfig
          ? "Booking calendar is not configured on the server."
          : "Failed to fetch availability.",
      },
      { status: 500 }
    );
  }
}
