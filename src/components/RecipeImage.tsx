type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Image visible dès l'ouverture de la page : chargée en priorité. */
  priority?: boolean;
  /** Largeur d'affichage réelle (attribut `sizes`), pour choisir la bonne variante. */
  sizes?: string;
};

// Les photos de la galerie existent en JPEG plein format et en WebP 480/800 px
// (`img_10.jpg` → `img_10-480.webp`, `img_10-800.webp`).
const GALLERY_JPG = /^(\/img\/gallery\/[^/]+)\.jpg$/i;

/**
 * Image de recette : chargement différé du navigateur, sauf si `priority`.
 * Sert une variante WebP adaptée à la taille d'affichage, avec le JPEG en repli.
 */
export function RecipeImage({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: Props) {
  const base = GALLERY_JPG.exec(src)?.[1];
  const img = (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
  if (!base) return img;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w`}
        sizes={sizes}
      />
      {img}
    </picture>
  );
}
