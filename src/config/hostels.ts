import { CigaretteOff, Snowflake, Sofa, WashingMachine, Wifi, WineOff, type LucideIcon } from "lucide-react";

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
  noSmoking: { label: "No smoking", icon: CigaretteOff },
  noDrinking: { label: "No drinking", icon: WineOff },
} satisfies Record<string, Facility>;

/** Photos in /public/hostel images (the folder name has a space, so paths are URL-encoded). */
const hostel1Files = [
  { file: "WhatsApp Image 2026-11-21 at 6.51.17 PM (1).jpeg", alt: "Hostel 1 building from the street" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.15 PM (2).jpeg", alt: "AC room with bunk beds" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.19 PM.jpeg", alt: "Bright room with ceiling fan" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.15 PM.jpeg", alt: "Sitting area with sofa and dining table" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.18 PM (1).jpeg", alt: "Hall with warm ceiling lights" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.15 PM (1).jpeg", alt: "Kitchen with fridge and water filter" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.18 PM (2).jpeg", alt: "Fully equipped kitchen" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.17 PM (2).jpeg", alt: "Clean washroom with shower" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.18 PM.jpeg", alt: "Washroom with wash basin" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.18 PM (3).jpeg", alt: "Balcony with a garden view" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.16 PM (2).jpeg", alt: "Terrace with open sky and greenery" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.16 PM (1).jpeg", alt: "AC rooms with wardrobes" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.16 PM.jpeg", alt: "Recreational spaces" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.14 PM.jpeg", alt: "Fully equipped kitchen with water filter" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.16 PM (3).jpeg", alt: "Clean and spacious washrooms" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.14 PM (1).jpeg", alt: "Balcony spaces" },
  { file: "WhatsApp Image 2026-11-21 at 6.51.17 PM.jpeg", alt: "Calm and quiet area" },
];
const hostel1Gallery = hostel1Files.map(({ file, alt }) => ({ src: encodeURI(`/hostel images/${file}`), alt }));

export type Hostel = {
  id: HostelId;
  name: string;
  /** Photo: replace the file in /public/images or change the path. */
  image: { src: string; alt: string };
  /** Optional photo gallery. When set, it replaces the single photo. */
  gallery?: { src: string; alt: string }[];
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
    gallery: hostel1Gallery,
    rooms: [
      { sharing: 6, pricePerMonth: 5555 },
      { sharing: 4, pricePerMonth: 6666 },
    ],
    totalOccupancy: 14,
    vacancy: 4,
    facilities: [facilityCatalog.ac, facilityCatalog.laundry, facilityCatalog.wifi, facilityCatalog.publicSpaces, facilityCatalog.noSmoking, facilityCatalog.noDrinking],
    map: {
      embedSrc: null,
      query: null, // add the place name here (or paste an embed link into embedSrc) to show a live map
      url: "https://goo.gl/maps/ptCyrFgAz8Pg84WB9?g_st=aw",
    },
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
    facilities: [facilityCatalog.ac, facilityCatalog.laundry, facilityCatalog.wifi, facilityCatalog.publicSpaces, facilityCatalog.noSmoking, facilityCatalog.noDrinking],
    map: {
      embedSrc: null,
      // Shows the map for this name. For an exact pin, paste the "Embed a map" src from Google Maps into embedSrc.
      query: "EH2 VENNALA",
      url: "https://maps.app.goo.gl/UKmiFDHCFp5yKMTc6?g_st=iw",
    },
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
