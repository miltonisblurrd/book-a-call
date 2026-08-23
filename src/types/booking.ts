export type TimeSlot = {
  start: string; // ISO string
  end: string;   // ISO string
  label: string; // "9:00am"
  /** false = shown grayed out (calendar busy or held for scarcity) */
  available: boolean;
};

export type BookingStep = "datetime" | "form" | "confirmation";

export type BookingFormData = {
  name: string;
  email: string;
  website: string;
  help: string;
  budget: string;
  timeline: string;
  details: string;
};

export type BookingPayload = BookingFormData & {
  slot: TimeSlot;
};

export type BookingResult = {
  success: boolean;
  eventId?: string;
  error?: string;
};

export const HELP_OPTIONS = [
  "Branding",
  "Landing Page",
  "Full Site",
  "Product or App",
] as const;

export const BUDGET_OPTIONS = [
  "$7,500 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000+",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1 – 2 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
] as const;
