import type { CSSProperties } from "react";
import type { ChiefName } from "@/data/recipes";

/**
 * Variable CSS de la couleur de chaque cheffe (définies dans `styles.css`, en
 * clair et en sombre). Une nouvelle cheffe dans `chiefNames` doit en recevoir
 * une ici : le test `chef-color.test.ts` le vérifie.
 */
export const chefColorVar: Record<ChiefName, string> = {
  Christelle: "--chef-christelle",
  "Mamie Marie": "--chef-mamie-marie",
  "Mamie Colette": "--chef-mamie-colette",
  Loulou: "--chef-loulou",
  "La Mémette": "--chef-la-memette",
  Éponine: "--chef-eponine",
};

/**
 * Style à poser sur un conteneur : définit `--chef`, que l'anneau du portrait
 * lit avec `ring-(color:--chef)`. Sans nom de cheffe, `--chef` prend la valeur
 * de repli, pour que l'anneau garde un aspect neutre.
 */
export function chefColorStyle(
  name: ChiefName | undefined,
  fallback = "var(--color-border)",
): CSSProperties {
  return {
    "--chef": name ? `var(${chefColorVar[name]})` : fallback,
  } as CSSProperties;
}
