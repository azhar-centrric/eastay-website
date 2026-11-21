import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const { logo, contact } = siteConfig;
  const linkClass = "underline-offset-4 transition-colors hover:text-eastay hover:underline";
  return (
    <footer className="border-t border-line bg-sand pb-20 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-9 w-auto" />
          <p className="mt-4 text-sm text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-[15px] md:items-end">
          <li>
            <a href={contact.phoneHref} className={linkClass}>
              {contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
