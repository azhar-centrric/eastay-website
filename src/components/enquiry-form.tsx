"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldPath, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { generalWhatsAppMessage } from "@/config/site";
import { GENDER_OPTIONS, STATUS_OPTIONS, enquirySchema, type EnquiryFormValues } from "@/lib/enquiry/schema";
import { isEnquiryConfigured, submitEnquiry } from "@/lib/enquiry/submit";
import { cn } from "@/lib/utils";

type FormState = { status: "idle" } | { status: "success" } | { status: "error"; reason: "not_configured" | "failed" };

const labelClass = "text-[13px] font-medium uppercase tracking-[0.14em] text-muted";

/** Soft, rounded fields. Focus just brightens the field; no ring or glow. */
const inputClass =
  "mt-2 block w-full rounded-2xl border border-transparent bg-sand/70 px-5 py-3.5 text-lg text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/30 focus:bg-white focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-700";

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={cn(labelClass, "block")}>
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-eastay">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

/** Radio options as simple chips. The chosen one is filled green. */
function ChipGroup({
  legend,
  name,
  options,
  register,
  error,
}: {
  legend: string;
  name: FieldPath<EnquiryFormValues>;
  options: readonly { value: string; label: string }[];
  register: UseFormRegister<EnquiryFormValues>;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className={cn(labelClass, "mb-3")}>
        {legend}
        <span aria-hidden className="ml-0.5 text-eastay">
          *
        </span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type="radio"
              value={o.value}
              aria-describedby={error ? `${name}-error` : undefined}
              className="peer sr-only"
              {...register(name)}
            />
            <span className="inline-flex min-h-12 items-center rounded-full border border-ink/20 px-4 text-[15px] transition-colors hover:border-ink/50 peer-checked:border-eastay peer-checked:bg-eastay peer-checked:text-white peer-focus-visible:border-eastay">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function EnquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { fullName: "", phone: "", preferredJoiningDate: "", message: "" },
  });

  const [state, setState] = useState<FormState>({ status: "idle" });
  const [minDate, setMinDate] = useState<string>();
  const [showMore, setShowMore] = useState(false);
  const inFlight = useRef(false); // guards against double submits

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  async function onSubmit(data: EnquiryFormValues) {
    if (inFlight.current) return;
    inFlight.current = true;
    setState({ status: "idle" });
    try {
      const result = await submitEnquiry(data);
      if (result.ok) {
        setState({ status: "success" });
        setShowMore(false);
        reset();
      } else {
        setState({ status: "error", reason: result.reason });
      }
    } catch {
      setState({ status: "error", reason: "failed" });
    } finally {
      inFlight.current = false;
    }
  }

  const card =
    "rounded-[2rem] bg-paper p-6 ring-1 ring-black/5 shadow-[0_40px_90px_-30px_rgba(30,38,34,0.38),0_10px_30px_-10px_rgba(30,38,34,0.14)] sm:p-9";

  if (state.status === "success") {
    return (
      <div role="status" className={cn(card, "py-12 text-center")}>
        <CircleCheck className="mx-auto size-12 text-eastay" strokeWidth={1.5} aria-hidden />
        <h3 className="mt-5 font-display text-3xl">Thank you. Your enquiry has been sent.</h3>
        <p className="mx-auto mt-3 max-w-xs text-muted">We will get back to you as soon as we can.</p>
        <Button variant="outline" className="mt-8" onClick={() => setState({ status: "idle" })}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Enquiry" className={card}>
        <h2 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">Enquire</h2>
        <p className="mt-3 text-base text-muted">A few quick details and we&rsquo;ll get back to you.</p>

        <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={inputClass}
              {...register("fullName")}
            />
          </Field>

          <Field id="phone" label="Phone number" required error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass}
              {...register("phone")}
            />
          </Field>

          <ChipGroup legend="Gender" name="gender" options={GENDER_OPTIONS} register={register} error={errors.gender?.message} />
          <ChipGroup legend="Status" name="status" options={STATUS_OPTIONS} register={register} error={errors.status?.message} />

          {showMore ? (
            <>
              <Field id="preferredJoiningDate" label="Preferred joining date" optional error={errors.preferredJoiningDate?.message}>
                <input id="preferredJoiningDate" type="date" min={minDate} className={inputClass} {...register("preferredJoiningDate")} />
              </Field>
              <Field id="message" label="Message" optional error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Anything you'd like us to know"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClass, "resize-y")}
                  {...register("message")}
                />
              </Field>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="inline-flex items-center gap-2 justify-self-start text-sm font-medium text-ink underline-offset-4 hover:text-eastay hover:underline sm:col-span-2"
            >
              <ChevronDown className="size-4" aria-hidden />
              Add joining date or a message (optional)
            </button>
          )}
        </div>

        {state.status === "error" && (
          <div role="alert" className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-medium">
              {state.reason === "not_configured"
                ? "We can't take online enquiries right now."
                : "Something went wrong and your enquiry was not sent."}
            </p>
            <p className="mt-1">
              {state.reason === "not_configured"
                ? "Nothing was sent. Please message us on WhatsApp or call us instead."
                : "Please try again, or message us on WhatsApp."}
            </p>
            <WhatsAppButton message={generalWhatsAppMessage} size="sm" className="mt-3">
              Message us on WhatsApp
            </WhatsAppButton>
          </div>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting} className="mt-7 min-h-14 w-full rounded-2xl text-base">
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Sending&hellip;
            </>
          ) : (
            "Send Enquiry"
          )}
        </Button>
      </form>

      {process.env.NODE_ENV !== "production" && !isEnquiryConfigured() && (
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <strong className="font-semibold">Developer notice:</strong> no enquiry backend is configured, so submissions are
            validated but <strong>not sent anywhere</strong>. Set <code>NEXT_PUBLIC_ENQUIRY_ENDPOINT</code> or edit{" "}
            <code>src/lib/enquiry/submit.ts</code>.
          </p>
        </div>
      )}
    </div>
  );
}
