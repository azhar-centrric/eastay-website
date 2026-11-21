import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatRupees, startingPrice } from "@/config/hostels";
import { EnquiryForm } from "@/components/enquiry-form";

export function HeroSection() {
  const { hero } = siteConfig;
  const [before, accent, after] = hero.headline;
  const description = hero.description.replace("{price}", formatRupees(startingPrice));

  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      {/* Background on the left: the building photo, softened and faded so the text stays easy to read. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-30 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] lg:w-[62%] lg:opacity-60 lg:[mask-image:linear-gradient(to_right,#000_35%,transparent_100%)]"
      >
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-hero/55" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 md:px-8 lg:grid-cols-12 lg:gap-10 lg:py-14">
        <div className="animate-fade-up lg:col-span-5">
          <h1 className="font-display text-[3.1rem] leading-[1] tracking-tight sm:text-7xl">
            {before}
            <em className="text-eastay">{accent}</em>
            {after}
          </h1>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-ink/80 sm:text-lg">{description}</p>
          <a
            href="#hostels"
            className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:text-eastay hover:underline"
          >
            View hostels
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </a>
        </div>

        <div id="enquire" className="scroll-mt-6 lg:col-span-7 lg:flex lg:justify-end">
          <div className="w-full max-w-3xl">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
