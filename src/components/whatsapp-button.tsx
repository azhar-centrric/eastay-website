import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
};

/** Opens WhatsApp (new tab) with a prefilled, URL-encoded message. Number comes from config. */
export function WhatsAppButton({
  message,
  children,
  variant = "whatsapp",
  size,
  className,
  showIcon = true,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ variant, size, className })}
    >
      {showIcon && <MessageCircle className="size-4" aria-hidden />}
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
