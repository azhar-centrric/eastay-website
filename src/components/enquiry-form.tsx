"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldPath, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleAlert, CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { generalWhatsAppMessage } from "@/config/site";
import { GENDER_OPTIONS, STATUS_OPTIONS, enquirySchema, type EnquiryFormValues } from "@/lib/enquiry/schema";
import { isEnquiryConfigured, submitEnquiry } from "@/lib/enquiry/submit";
import { cn } from "@/lib/utils";

type FormState = { status: "idle" } | { status: "success" } | { status: "error"; reason: "not_configured" | "failed" };

/* ---------- Building pieces ---------- */

/** Rooftop: parapet, railing and a little greenery. */
function Roof() {
  return (
    <div aria-hidden className="relative h-12 overflow-hidden">
      <span className="absolute bottom-4 left-8 h-5 w-12 rounded-t-full bg-[#7e8f5a]/70" />
      <span className="absolute bottom-4 left-14 h-7 w-8 rounded-t-full bg-[#6f8450]/70" />
      <span className="absolute bottom-4 right-10 h-4 w-10 rounded-t-full bg-[#7e8f5a]/70" />
      <span className="absolute right-4 top-2 size-3 bg-eastay" />
      <div className="absolute inset-x-0 bottom-[22px] h-5 border-t-2 border-steel bg-[repeating-linear-gradient(to_right,var(--color-steel)_0_2px,transparent_2px_14px)]" />
      <div className="absolute inset-x-0 bottom-0 h-[22px] bg-steel" />
    </div>
  );
}

/** One storey: a row of windows with a concrete slab beneath. */
function Floor({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative border-b-[6px] border-black/10 py-5 last:border-b-0">
      <span aria-hidden className="absolute -left-9 top-6 hidden text-[10px] font-medium tracking-[0.2em] text-ink/45 sm:block">
        {label}
      </span>
      <div className="grid items-stretch gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/**
 * A window. Cool glass by day; the warm light switches on when the field is focused or filled.
 * `as="fieldset"` is used for radio groups (the legend goes inside as the first child).
 */
function Window({
  id,
  label,
  required,
  optional,
  lit,
  noLamp,
  error,
  as = "div",
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  lit: boolean;
  /** Radio windows: no mullion, and the lamp follows the choice rather than focus. */
  noLamp?: boolean;
  error?: string;
  as?: "div" | "fieldset";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  const labelText = (
    <>
      {label}
      {required && (
        <span aria-hidden className="ml-0.5 text-eastay">
          *
        </span>
      )}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-ink/55">(optional)</span>}
    </>
  );
  const labelClass = "text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70";

  return (
    <div className={cn("group flex flex-col", className)}>
      <Tag
        data-lit={lit}
        className={cn(
          "relative flex min-w-0 flex-1 flex-col overflow-hidden border-[3px] bg-glass px-4 pb-3 pt-3 transition-colors duration-300",
          error ? "border-red-800" : "border-steel",
        )}
      >
        {/* The lamp: fades in when filled (and on focus, except for radio windows) */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,#ffd27a_0%,var(--color-lamp)_55%,#fff1cf_100%)] opacity-0 transition-opacity duration-500 group-has-[[data-lit=true]]:opacity-100",
            !noLamp && "group-focus-within:opacity-100",
          )}
        />
        {/* Mullion */}
        {!noLamp && <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-steel/10 sm:block" />}
        <div className="relative z-10 flex flex-1 flex-col">
          {as === "fieldset" ? (
            <legend className={cn(labelClass, "float-left mb-2 w-full p-0")}>{labelText}</legend>
          ) : (
            <label htmlFor={id} className={cn(labelClass, "block")}>
              {labelText}
            </label>
          )}
          <div className={cn(as === "fieldset" && "clear-both", "flex flex-1 flex-col")}>{children}</div>
        </div>
      </Tag>
      {/* Window sill */}
      <div aria-hidden className="-mx-1.5 h-2 bg-steel" />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-800">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "block min-h-10 w-full rounded-none border-0 bg-transparent px-0 py-1.5 text-base text-ink placeholder:text-ink/45 outline-none focus:outline-none focus-visible:outline-none";

/** Radio options as panes of one window: equal widths, thin bars between, chosen pane lights up. */
function ChoiceGroup({
  name,
  options,
  register,
  error,
}: {
  name: FieldPath<EnquiryFormValues>;
  options: readonly { value: string; label: string }[];
  register: UseFormRegister<EnquiryFormValues>;
  error?: string;
}) {
  return (
    <div
      className="-mx-4 -mb-3 mt-2 grid divide-x divide-steel/20 border-t border-steel/20"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => (
        <label key={o.value} className="relative cursor-pointer">
          <input
            type="radio"
            value={o.value}
            aria-describedby={error ? `${name}-error` : undefined}
            className="peer sr-only"
            {...register(name)}
          />
          <span className="flex min-h-14 items-center justify-center gap-1.5 px-2 text-[15px] transition-colors duration-300 hover:bg-white/40 peer-checked:bg-[#ffc65c] peer-checked:font-medium  peer-focus-visible:bg-white/60 [&>svg]:hidden peer-checked:[&>svg]:block">
            <Check className="size-4 text-eastay" strokeWidth={2.5} aria-hidden />
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}

/* ---------- Form ---------- */

export function EnquiryForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { fullName: "", phone: "", preferredJoiningDate: "", message: "" },
  });

  const [state, setState] = useState<FormState>({ status: "idle" });
  const [minDate, setMinDate] = useState<string>();
  const inFlight = useRef(false); // guards against double submits
  const values = watch();

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

  if (state.status === "success") {
    return (
      <div role="status">
        <div className="bg-concrete">
          <Roof />
          <div className="px-4 py-8 sm:px-8">
            <div className="border-[3px] border-steel bg-[radial-gradient(ellipse_at_50%_100%,#ffd27a_0%,var(--color-lamp)_55%,#fff1cf_100%)] px-6 py-10 text-center">
              <CircleCheck className="mx-auto size-12 text-eastay" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 font-display text-3xl sm:text-4xl">Thank you. Your enquiry has been sent.</h3>
              <p className="mx-auto mt-3 max-w-md text-ink/70">We will get back to you as soon as we can.</p>
              <Button variant="outline" className="mt-8" onClick={() => setState({ status: "idle" })}>
                Send another enquiry
              </Button>
            </div>
            <div aria-hidden className="-mx-1.5 mt-0 h-2 bg-steel" />
          </div>
        </div>
        <div aria-hidden className="h-2 bg-steel" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Enquiry">
      {/* {process.env.NODE_ENV !== "production" && !isEnquiryConfigured() && (
        <div className="mb-5 flex gap-3 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <strong className="font-semibold">Developer notice:</strong> no enquiry backend is configured, so submissions are
            validated but <strong>not sent anywhere</strong>. Set <code>NEXT_PUBLIC_ENQUIRY_ENDPOINT</code> or edit{" "}
            <code>src/lib/enquiry/submit.ts</code>.
          </p>
        </div>
      )} */}

      <div className="bg-concrete">
        <Roof />

        <div className="px-4 sm:pl-12 sm:pr-8">
          <Floor label="3F">
            <Window id="fullName" label="Full name" required lit={!!values.fullName} error={errors.fullName?.message}>
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
            </Window>
            <Window id="phone" label="Phone number" required lit={!!values.phone} error={errors.phone?.message}>
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
            </Window>
          </Floor>

          <Floor label="2F">
            <Window id="gender" as="fieldset" label="Gender" required lit={!!values.gender} noLamp error={errors.gender?.message}>
              <ChoiceGroup name="gender" options={GENDER_OPTIONS} register={register} error={errors.gender?.message} />
            </Window>
            <Window id="status" as="fieldset" label="Status" required lit={!!values.status} noLamp error={errors.status?.message}>
              <ChoiceGroup name="status" options={STATUS_OPTIONS} register={register} error={errors.status?.message} />
            </Window>
          </Floor>

          <Floor label="1F">
            <Window
              id="preferredJoiningDate"
              label="Preferred joining date"
              optional
              lit={!!values.preferredJoiningDate}
              error={errors.preferredJoiningDate?.message}
            >
              <input id="preferredJoiningDate" type="date" min={minDate} className={inputClass} {...register("preferredJoiningDate")} />
            </Window>
            <Window id="message" label="Message" optional lit={!!values.message} error={errors.message?.message}>
              <textarea
                id="message"
                rows={3}
                placeholder="Anything you'd like us to know"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(inputClass, "flex-1 resize-y")}
                {...register("message")}
              />
            </Window>
          </Floor>
        </div>

        {state.status === "error" && (
          <div role="alert" className="mx-4 mb-5 border border-red-300 bg-red-50 p-4 text-sm text-red-900 sm:ml-12 sm:mr-8">
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

        {/* Ground floor: the glass shopfront, with the door (submit) */}
        <div className="relative overflow-hidden bg-[#24211e] px-4 py-6 sm:px-8">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_130%,rgba(255,190,100,0.55),transparent_70%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent_0_calc(25%-1px),rgba(255,255,255,0.12)_calc(25%-1px)_25%)]"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#f3e7d2]">
              <span aria-hidden className="text-[#7be0b3]">
                *
              </span>{" "}
              Required field
            </p>
            <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full sm:w-auto sm:min-w-48">
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  Sending&hellip;
                </>
              ) : (
                "Send Enquiry"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div aria-hidden className="h-2 bg-steel" />
    </form>
  );
}
