type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Image visible dès l'ouverture de la page : chargée en priorité. */
  priority?: boolean;
};

/** Image de recette : chargement différé du navigateur, sauf si `priority`. */
export function RecipeImage({ src, alt, className, priority = false }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}
