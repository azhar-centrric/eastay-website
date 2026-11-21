"use client";

import { useEffect, useState } from "react";
import { EnquireButton } from "@/components/enquire-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { generalWhatsAppMessage } from "@/config/site";

/** Slim bar on small screens, shown once the form (top of the page) has scrolled away. */
export function MobileBar() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const target = document.getElementById("enquire");
    if (!target) return;
    const update = () => setHidden(target.getBoundingClientRect().bottom > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={hidden}
      inert={hidden}
    >
      <EnquireButton className="flex-1">Enquire Now</EnquireButton>
      <WhatsAppButton message={generalWhatsAppMessage} variant="outline" className="flex-1">
        WhatsApp
      </WhatsAppButton>
    </div>
  );
}
