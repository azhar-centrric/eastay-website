import { Snowflake, Sofa, WashingMachine, Wifi, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for hostel details: prices, occupancy, vacancy, photos and maps.
 * Edit this file only; the page updates automatically.
 */

export type HostelId = "hostel-1" | "hostel-2";

export type RoomPrice = {
  /** e.g. 6 for "6 Sharing" */
  sharing: number;
  /** Rupees per month */
  pricePerMonth: number;
};

export type HostelMap = {
  /**
   * Google Maps embed URL: Google Maps > Share > Embed a map > copy the `src="..."` value.
   * Leave null to show a placeholder.
   */
  embedSrc: string | null;
  /** Used only when embedSrc is null: an address or "lat,lng" to embed without needing an embed URL. */
  query: string | null;
  /** Normal Google Maps share link, used for the "Open in Google Maps" link. Leave null to hide it. */
  url: string | null;
};

export type Facility = { label: string; icon: LucideIcon };

/** Facility catalogue: add new ones here, then list them per hostel below. */
export const facilityCatalog = {
  ac: { label: "All rooms AC", icon: Snowflake },
  laundry: { label: "Laundry", icon: WashingMachine },
  wifi: { label: "Wi-Fi", icon: Wifi },
  publicSpaces: { label: "Public spaces", icon: Sofa },
} satisfies Record<string, Facility>;

export type Hostel = {
  id: HostelId;
  name: string;
  /** Photo: replace the file in /public/images or change the path. */
  image: { src: string; alt: string };
  rooms: RoomPrice[];
  totalOccupancy: number;
  vacancy: number;
  facilities: Facility[];
  map: HostelMap;
};

export const hostels: Hostel[] = [
  {
    id: "hostel-1",
    name: "Hostel 1",
    image: { src: "/images/room-1.png", alt: "Hostel 1 (placeholder photo)" },
    rooms: [
      { sharing: 6, pricePerMonth: 5555 },
      { sharing: 4, pricePerMonth: 6666 },
    ],
    totalOccupancy: 14,
    vacancy: 4,
    facilities: [facilityCatalog.ac, facilityCatalog.laundry, facilityCatalog.wifi, facilityCatalog.publicSpaces],
    map: { embedSrc: null, query: null, url: null }, // PLACEHOLDER: add Hostel 1 location
  },
  {
    id: "hostel-2",
    name: "Hostel 2",
    image: { src: "/images/room-2.png", alt: "Hostel 2 (placeholder photo)" },
    rooms: [
      { sharing: 6, pricePerMonth: 5555 },
      { sharing: 4, pricePerMonth: 6666 },
    ],
    totalOccupancy: 65,
    vacancy: 65,
    facilities: [facilityCatalog.ac, facilityCatalog.laundry, facilityCatalog.wifi, facilityCatalog.publicSpaces],
    map: { embedSrc: null, query: null, url: null }, // PLACEHOLDER: add Hostel 2 location
  },
];

/** WhatsApp message for "Book a Visit". */
export function visitMessage(hostel: Hostel) {
  return `Hi Eastay, I'm interested in visiting ${hostel.name}. Could you please let me know a convenient time for a visit?`;
}

export function getMapEmbedSrc(map: HostelMap): string | null {
  if (map.embedSrc) return map.embedSrc;
  if (map.query) return `https://www.google.com/maps?q=${encodeURIComponent(map.query)}&z=16&output=embed`;
  return null;
}

export const startingPrice = Math.min(...hostels.flatMap((h) => h.rooms.map((r) => r.pricePerMonth)));

export const formatRupees = (amount: number) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
