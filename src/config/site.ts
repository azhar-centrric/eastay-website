/**
 * Central site configuration. PLACEHOLDER values should be replaced with real details.
 * Hostel-specific data lives in hostels.ts.
 */

export const siteConfig = {
  name: "Eastay Hostels",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Shared AC rooms at Eastay Hostels. See prices and vacancy, book a visit on WhatsApp or send an enquiry.",
  logo: { src: "/eastay-logo.png", width: 1200, height: 441, alt: "Eastay Hostels" },

  hero: {
    /** [before, emphasised, after] */
    headline: ["Comfortable AC rooms, ", "simply priced", "."] as const,
    /** {price} is replaced with the lowest monthly price from hostels.ts */
    description: "Shared AC rooms from {price} a month across two hostels. See what’s available and get in touch.",
    image: { src: "/images/hero-building.jpg", width: 1141, height: 1378, alt: "Eastay hostel building on a tree-lined street, with architectural floor plans above" },
  },

  contact: {
    // PLACEHOLDER values
    phoneDisplay: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    /** Digits only, international format. Set NEXT_PUBLIC_WHATSAPP_NUMBER to override. */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000",
    whatsappDisplay: "+91 00000 00000",
    email: "hello@eastay.example",
  },
} as const;

/** General WhatsApp message, used as a fallback from the enquiry form. */
export const generalWhatsAppMessage = "Hi Eastay, I'd like to know more about your hostels.";
