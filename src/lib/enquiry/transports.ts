import type { EnquiryPayload } from "./submit";

/**
 * A transport delivers an enquiry somewhere. To add a backend, write a new
 * transport (or point NEXT_PUBLIC_ENQUIRY_ENDPOINT at your API) and return it from
 * `resolveTransport()` in submit.ts. The form UI never needs to change.
 *
 * Future options (none chosen yet):
 *  - Database:  POST to a Next.js route handler / server action that inserts into Postgres, Supabase, etc.
 *  - Email:     route handler that calls Resend / SendGrid / SMTP.
 *  - WhatsApp:  build a wa.me URL from the payload (see lib/whatsapp.ts) or use the WhatsApp Business API server-side.
 *  - Other:     Google Sheets, Airtable, a CRM webhook, etc.
 */
export interface EnquiryTransport {
  name: string;
  send(payload: EnquiryPayload): Promise<void>;
}

/** Generic JSON POST. Throws on network error or non-2xx response. */
export function createHttpTransport(url: string): EnquiryTransport {
  return {
    name: "http",
    async send(payload) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Enquiry endpoint responded with ${res.status}`);
      }
    },
  };
}

/**
 * Emails each enquiry to the owner through Web3Forms (https://web3forms.com).
 * The access key is public by design; restrict it to eastay.in in the Web3Forms dashboard.
 */
export function createWeb3FormsTransport(accessKey: string): EnquiryTransport {
  return {
    name: "web3forms",
    async send(payload) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Eastay enquiry from ${payload.fullName}`,
          from_name: "Eastay Website",
          "Full name": payload.fullName,
          Phone: payload.phone,
          Gender: payload.gender,
          Status: payload.status,
          "Preferred joining date": payload.preferredJoiningDate || "Not given",
          Message: payload.message || "None",
          "Submitted at": payload.submittedAt,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        throw new Error(`Web3Forms responded with ${res.status}: ${json?.message ?? "unknown error"}`);
      }
    },
  };
}
