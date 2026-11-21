import { CigaretteOff, WineOff } from "lucide-react";

/** Two small "house rule" labels shown with the banner text. */
export function HouseRules({ className = "" }: { className?: string }) {
  const rules = [
    { label: "No smoking", icon: CigaretteOff },
    { label: "No drinking", icon: WineOff },
  ];
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {rules.map(({ label, icon: Icon }) => (
        <li key={label} className="inline-flex items-center gap-2 border border-ink/20 bg-paper/60 px-3 py-1.5 text-sm text-ink">
          <Icon className="size-4 text-eastay" strokeWidth={1.75} aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}
