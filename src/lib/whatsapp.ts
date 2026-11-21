import { siteConfig } from "@/config/site";

/** Builds a https://wa.me/<number>?text=<encoded message> URL. */
export function buildWhatsAppUrl(message?: string, number: string = siteConfig.contact.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
