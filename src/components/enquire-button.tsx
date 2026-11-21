import type { ReactNode } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

/** Smooth-scrolls to the enquiry form (#enquire). */
export function EnquireButton({
  children = "Enquire Now",
  variant,
  size,
  className,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <a href="#enquire" className={buttonStyles({ variant, size, className })}>
      {children}
    </a>
  );
}
