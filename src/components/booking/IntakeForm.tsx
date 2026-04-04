"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  HELP_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type BookingFormData,
  type TimeSlot,
} from "@/types/booking";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().url("Enter a valid URL").or(z.literal("")),
  help: z.string().min(1, "Please select an option"),
  budget: z.string().min(1, "Please select a budget"),
  timeline: z.string().min(1, "Please select a timeline"),
  details: z.string().optional().default(""),
});

type IntakeFormProps = {
  slot: TimeSlot;
  onSubmit: (data: BookingFormData) => void;
  onBack: () => void;
  submitting?: boolean;
};

export default function IntakeForm({
  slot,
  onSubmit,
  onBack,
  submitting,
}: IntakeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 p-6 overflow-y-auto"
    >
      {/* Selected time reminder */}
      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>
          {format(parseISO(slot.start), "EEEE, MMMM d")} &middot;{" "}
          {format(parseISO(slot.start), "h:mmaaa")} –{" "}
          {format(parseISO(slot.end), "h:mmaaa")}
        </span>
      </div>

      {/* Fields */}
      <Field label="Your name" error={errors.name?.message} required>
        <input
          {...register("name")}
          placeholder="Jane Smith"
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Email address" error={errors.email?.message} required>
        <input
          {...register("email")}
          type="email"
          placeholder="jane@company.com"
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Website" error={errors.website?.message} required>
        <input
          {...register("website")}
          placeholder="https://yoursite.com"
          className={inputClass(!!errors.website)}
        />
      </Field>

      <Field label="How can we help?" error={errors.help?.message} required>
        <select {...register("help")} className={inputClass(!!errors.help)}>
          <option value="">Select an option…</option>
          {HELP_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Estimated budget"
        error={errors.budget?.message}
        required
      >
        <select
          {...register("budget")}
          className={inputClass(!!errors.budget)}
        >
          <option value="">Select a range…</option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Timeline" error={errors.timeline?.message} required>
        <select
          {...register("timeline")}
          className={inputClass(!!errors.timeline)}
        >
          <option value="">Select a timeline…</option>
          {TIMELINE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Additional project details" error={undefined}>
        <textarea
          {...register("details")}
          rows={4}
          placeholder="Add project details or notes..."
          className={cn(inputClass(false), "resize-none")}
        />
      </Field>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Confirming…" : "Confirm"}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center -mt-2">
        By proceeding you agree to receive a Google Calendar invite at the email
        address provided.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-gray-400 ml-0.5"> *</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 bg-white outline-none transition-colors",
    "focus:border-gray-400 focus:ring-2 focus:ring-gray-100",
    hasError ? "border-red-300" : "border-gray-200"
  );
}
