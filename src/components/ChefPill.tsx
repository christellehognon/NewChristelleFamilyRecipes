import { cn } from "@/lib/utils";
import { ChefPhoto } from "./ChefPhoto";

export function ChefPill({
  name,
  img,
  active,
  onClick,
}: {
  name: string;
  img?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all pointer-coarse:min-h-11 pointer-coarse:px-4",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground",
      )}
    >
      <ChefPhoto
        src={img}
        lazy
        className="size-6 rounded-full object-cover"
        iconClassName="size-3.5"
      />
      <span>{name}</span>
    </button>
  );
}
