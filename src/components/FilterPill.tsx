import { cn } from "@/lib/utils";

/**
 * Pastille de filtre à bascule (aria-pressed). Partagée par tous les filtres de
 * l'accueil ; la cible passe à 44 px sur écran tactile.
 */
export function FilterPill({
  active,
  onClick,
  className,
  children,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all pointer-coarse:min-h-11 pointer-coarse:min-w-11 pointer-coarse:px-4",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}
