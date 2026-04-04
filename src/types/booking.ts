export type TimeSlot = {
  start: string; // ISO string
  end: string;   // ISO string
  label: string; // "9:00am"
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
  "Website / Web App Design",
  "Brand Identity",
  "UI/UX Design",
  "Design System",
  "Webflow Development",
  "Consulting / Strategy",
  "Something else",
] as const;

export const BUDGET_OPTIONS = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1 – 2 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
] as const;
