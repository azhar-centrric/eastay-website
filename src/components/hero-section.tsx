import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatRupees, startingPrice } from "@/config/hostels";
import { EnquireButton } from "@/components/enquire-button";

export function HeroSection() {
  const { hero } = siteConfig;
  const [before, accent, after] = hero.headline;
  const description = hero.description.replace("{price}", formatRupees(startingPrice));

  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      {/* Height matches the walkway in the photo (about 7.4% of its height) so the two line up. */}
      <div aria-hidden className="street absolute inset-x-0 bottom-0 h-[8.94vw] lg:h-[calc(min(100dvh-6rem,52rem)*0.074)]" />
      <div className="mx-auto grid max-w-6xl items-end px-5 md:px-8 lg:grid-cols-12">
        <div className="animate-fade-up pb-10 pt-2 md:pt-6 lg:col-span-5 lg:self-center lg:pb-16 lg:pt-0">
          <h1 className="font-display text-[3.1rem] leading-[1] tracking-tight sm:text-7xl">
            {before}
            <em className="text-eastay">{accent}</em>
            {after}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <EnquireButton size="lg" className="w-full sm:w-auto">
              Enquire Now
            </EnquireButton>
            <a
              href="#hostels"
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:text-eastay hover:underline"
            >
              View hostels
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Image background matches the hero colour; edges fade so it blends into the page. */}
        <div className="relative -mx-5 md:-mx-8 lg:col-span-7 lg:mx-0 lg:-mr-8">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="fade-x block h-auto w-full lg:ml-auto lg:h-[min(calc(100dvh-6rem),52rem)] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
