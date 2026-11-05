/**
 * Photos de la galerie en format paysage (plus larges que hautes). Toutes les
 * autres sont en portrait. Sert à choisir un cadre d'affichage adapté sans
 * couper le plat. `recipes.test.ts` compare cette liste aux fichiers réels :
 * en ajoutant une photo paysage, ajouter son chemin ici.
 */
export const LANDSCAPE_PHOTOS: ReadonlySet<string> = new Set([
  "/img/gallery/img_29.jpg",
  "/img/gallery/img_34.jpg",
  "/img/gallery/img_35.jpg",
  "/img/gallery/img_36.jpg",
  "/img/gallery/img_41.jpg",
  "/img/gallery/img_43.jpg",
  "/img/gallery/img_45.jpg",
  "/img/gallery/img_53.jpg",
  "/img/gallery/img_55.jpg",
]);

export const isLandscapePhoto = (src: string): boolean =>
  LANDSCAPE_PHOTOS.has(src);
