import { useState } from "react";
import { UserRound } from "lucide-react";

/**
 * Photo d'un chef. Si l'image est absente ou ne se charge pas, une icône neutre
 * prend sa place au lieu d'un trou dans la mise en page.
 */
export function ChefPhoto({
  src,
  alt = "",
  className,
  iconClassName = "size-1/2",
  lazy = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
  lazy?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <span
        className={`grid place-items-center bg-secondary text-muted-foreground ${className ?? ""}`}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <UserRound className={iconClassName} aria-hidden="true" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
