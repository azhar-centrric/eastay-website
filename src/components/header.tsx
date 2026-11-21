import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Header() {
  const { logo } = siteConfig;
  return (
    <header className="bg-hero">
      <div className="mx-auto flex h-20 max-w-6xl items-center px-5 md:h-24 md:px-8">
        <a href="#home" aria-label={`${siteConfig.name} home`}>
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-9 w-auto md:h-11" />
        </a>
      </div>
    </header>
  );
}
