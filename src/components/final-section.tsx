import Image from "next/image";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

const visitMessage = "Hi Eastay, I'd like to visit one of your hostels. Could you please let me know a convenient time?";

/** The closing page: a different message from the opening one, with the ways to reach us. */
export function FinalSection() {
  const { hero, contact } = siteConfig;

  return (
    <section id="welcome" className="relative overflow-hidden bg-hero">
      {/* Height matches the walkway in the photo (about 7.4% of its height) so the two line up. */}
      <div aria-hidden className="street absolute inset-x-0 bottom-0 h-[8.94vw] lg:h-[calc(min(100dvh-6rem,52rem)*0.074)]" />
      <div className="mx-auto grid max-w-6xl items-end px-5 md:px-8 lg:grid-cols-12">
        <div className="pb-10 pt-10 md:pt-14 lg:col-span-5 lg:self-center lg:pb-16 lg:pt-0">
          <h2 className="font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
            Come and see it <em className="text-eastay">in person</em>.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
            Visit either hostel, or give us a call. We&rsquo;re happy to show you around.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <WhatsAppButton message={visitMessage} variant="primary" size="lg" className="w-full sm:w-auto">
              Book a Visit
            </WhatsAppButton>
            <a
              href="#enquire"
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:text-eastay hover:underline"
            >
              Back to enquiry
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-3 border-t border-ink/15 pt-6 text-[15px]">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-3 underline-offset-4 hover:text-eastay hover:underline">
                <Phone className="size-4 text-eastay" strokeWidth={1.75} aria-hidden />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 underline-offset-4 hover:text-eastay hover:underline">
                <Mail className="size-4 text-eastay" strokeWidth={1.75} aria-hidden />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Image background matches the page colour; edges fade so it blends in. */}
        <div className="relative -mx-5 md:-mx-8 lg:col-span-7 lg:mx-0 lg:-mr-8">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="fade-x block h-auto w-full lg:ml-auto lg:h-[min(calc(100dvh-6rem),52rem)] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
