import { formatRupees, hostels, visitMessage, type Hostel } from "@/config/hostels";
import { Eyebrow } from "@/components/section-heading";
import { Photo } from "@/components/photo";
import { HostelMap } from "@/components/hostel-map";
import { WhatsAppButton } from "@/components/whatsapp-button";

function HostelDetails({ hostel }: { hostel: Hostel }) {
  const headingId = `${hostel.id}-title`;
  return (
    <article id={hostel.id} aria-labelledby={headingId} className="scroll-mt-6">
      <h3 id={headingId} className="border-b border-ink pb-4 font-display text-4xl leading-none tracking-tight sm:text-5xl">
        {hostel.name}
      </h3>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="relative aspect-[4/3] self-start overflow-hidden bg-sand lg:col-span-5">
          <Photo src={hostel.image.src} alt={hostel.image.alt} sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>

        <div className="lg:col-span-7">
          <dl className="border-t border-line">
            {hostel.rooms.map((room) => (
              <div key={room.sharing} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <dt className="text-lg">{room.sharing} Sharing</dt>
                <dd>
                  <span className="font-display text-4xl leading-none sm:text-5xl">{formatRupees(room.pricePerMonth)}</span>
                  <span className="ml-1 text-sm text-muted">/month</span>
                </dd>
              </div>
            ))}
          </dl>

          <dl className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">Total occupancy</dt>
              <dd className="mt-1 font-display text-4xl leading-none">{hostel.totalOccupancy}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">Vacancy</dt>
              <dd className="mt-1 font-display text-4xl leading-none text-eastay">
                {hostel.vacancy > 0 ? hostel.vacancy : "Full"}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 grid grid-cols-3 gap-x-2 gap-y-5 border-y border-line py-5 sm:grid-cols-6">
            {hostel.facilities.map(({ label, icon: Icon }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-6 text-eastay" strokeWidth={1.5} aria-hidden />
                <span className="text-xs leading-tight sm:text-[13px]">{label}</span>
              </li>
            ))}
          </ul>

          <WhatsAppButton message={visitMessage(hostel)} size="lg" className="mt-8 w-full sm:w-auto">
            Book a Visit
          </WhatsAppButton>
        </div>
      </div>

      <div className="mt-10">
        <HostelMap hostel={hostel} />
      </div>
    </article>
  );
}

export function HostelSection() {
  return (
    <section id="hostels" className="scroll-mt-6 border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Eyebrow>Our hostels</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">Rooms, prices and vacancy.</h2>
        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {hostels.map((hostel) => (
            <HostelDetails key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </div>
    </section>
  );
}
