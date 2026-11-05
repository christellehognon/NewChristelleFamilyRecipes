// Après `vite build` : écrit dist/recettes/<slug>/index.html pour chaque recette.
// Chaque page est la page de l'application avec, dans l'en-tête, le titre, la
// description et la photo de la recette, pour les aperçus de liens partagés
// (WhatsApp, iMessage, Facebook). Vercel sert un fichier qui existe avant
// d'appliquer sa redirection vers index.html ; l'application, elle, se charge
// comme d'habitude.
//
// Node lit directement les fichiers TypeScript de src/ (pas d'outil en plus).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { localizeDescription, recipes } from "../src/data/recipes.ts";
import { recipeDescriptions } from "../src/data/recipe-descriptions.ts";
import { buildSharePage, shorten } from "../src/lib/share-meta.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// Adresse du site : SITE_URL si on la fixe, sinon le domaine de production que
// Vercel fournit au build. Sans l'une ni l'autre (build local), pas d'adresse
// complète : les aperçus ne marcheront qu'en production.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (
  process.env.SITE_URL ?? (productionHost ? `https://${productionHost}` : "")
).replace(/\/$/, "");
if (!siteUrl) {
  console.warn(
    "[aperçus] Ni SITE_URL ni VERCEL_PROJECT_PRODUCTION_URL : adresses relatives, " +
      "inutilisables par WhatsApp. Normal en local ; en production, vérifier.",
  );
}

const SITE_NAME = "Christelle's Family Recipes";
const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");

let written = 0;
let withImage = 0;
for (const recipe of recipes) {
  const text = recipeDescriptions[recipe.slug];
  if (!text) throw new Error(`Pas de texte de préparation pour ${recipe.slug}`);

  // /img/gallery/img_30.jpg → /img/share/img_30.jpg (JPEG carré 800 px)
  const photo = /^\/img\/gallery\/([^/]+\.jpg)$/i.exec(recipe.image)?.[1];
  const image = photo ? `${siteUrl}/img/share/${photo}` : undefined;
  if (image) withImage += 1;

  const html = buildSharePage(indexHtml, {
    title: `${recipe.name} — ${SITE_NAME}`,
    description: shorten(localizeDescription(text, "fr"), 155),
    url: siteUrl
      ? `${siteUrl}/recettes/${encodeURIComponent(recipe.slug)}`
      : undefined,
    image,
    imageAlt: image ? recipe.name : undefined,
  });

  const dir = path.join(dist, "recettes", recipe.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
  written += 1;
}

console.log(
  `[aperçus] ${written} pages de recette générées (${withImage} avec photo)` +
    (siteUrl ? ` pour ${siteUrl}` : ""),
);
