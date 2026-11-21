import { ArrowUpRight, MapPin } from "lucide-react";
import { getMapEmbedSrc, type Hostel } from "@/config/hostels";

export function HostelMap({ hostel }: { hostel: Hostel }) {
  const src = getMapEmbedSrc(hostel.map);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          <MapPin className="size-4 text-eastay" aria-hidden />
          Location
        </h4>
        {hostel.map.url && (
          <a
            href={hostel.map.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-eastay underline-offset-4 hover:underline"
          >
            Open in Google Maps <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
      <div className="h-60 overflow-hidden bg-sand sm:h-72">
        {src ? (
          <iframe
            src={src}
            title={`${hostel.name} location on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <div
            className="flex size-full flex-col items-center justify-center gap-2 text-sm text-muted"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(30 38 34 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(30 38 34 / 0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <MapPin className="size-6 text-eastay" strokeWidth={1.5} aria-hidden />
            {hostel.map.url ? (
              <a
                href={hostel.map.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-eastay px-4 py-2.5 font-medium text-eastay transition-colors hover:bg-eastay hover:text-white"
              >
                View {hostel.name} on Google Maps <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              "Map location coming soon"
            )}
          </div>
        )}
      </div>
    </div>
  );
}
