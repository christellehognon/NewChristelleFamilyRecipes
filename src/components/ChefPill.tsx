import React from "react";
import { cn } from "@/lib/utils";

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
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground",
      )}
    >
      {img ? (
        <img
          src={img}
          alt={name}
          className="size-6 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="inline-block size-6 rounded-full bg-secondary" />
      )}
      <span>{name}</span>
    </button>
  );
}
