import type { EnquiryFormValues } from "./schema";
import { createHttpTransport, type EnquiryTransport } from "./transports";

export type EnquiryPayload = EnquiryFormValues & {
  submittedAt: string;
  source: "eastay-landing-page";
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "failed"; message: string };

/**
 * Decide where enquiries go. Currently: nowhere, until NEXT_PUBLIC_ENQUIRY_ENDPOINT is set.
 * Swap or extend this function when a backend is chosen.
 */
function resolveTransport(): EnquiryTransport | null {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
  if (endpoint) return createHttpTransport(endpoint);
  return null;
}

export function isEnquiryConfigured() {
  return resolveTransport() !== null;
}

export async function submitEnquiry(values: EnquiryFormValues): Promise<SubmitResult> {
  const transport = resolveTransport();

  if (!transport) {
    // Never pretend an enquiry was sent.
    console.warn(
      "[Eastay] Enquiry NOT sent: no backend configured. Set NEXT_PUBLIC_ENQUIRY_ENDPOINT or edit src/lib/enquiry/submit.ts.",
    );
    return {
      ok: false,
      reason: "not_configured",
      message: "Enquiry backend is not configured yet. Nothing was sent.",
    };
  }

  try {
    await transport.send({ ...values, submittedAt: new Date().toISOString(), source: "eastay-landing-page" });
    return { ok: true };
  } catch (error) {
    console.error("[Eastay] Enquiry submission failed", error);
    return { ok: false, reason: "failed", message: "We couldn't send your enquiry. Please try again." };
  }
}
