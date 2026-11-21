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
