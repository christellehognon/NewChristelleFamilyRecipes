import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LANDSCAPE_PHOTOS } from "./image-orientation";
import { recipeDescriptions } from "./recipe-descriptions";
import {
  averagePrices,
  chiefNames,
  chiefs,
  difficulties,
  fallbackLang,
  localizeDescription,
  localizeRecipe,
  recipeTypes,
  recipes,
  seasons,
  splitCookingTime,
  type Recipe,
  type RecipeDescription,
} from "./recipes";

const publicDir = path.resolve(__dirname, "../../public");

/**
 * Défauts connus dans les données existantes. Les tests restent stricts pour
 * toute nouvelle recette : ces listes ne doivent que raccourcir. Chaque test
 * échoue aussi quand un cas est corrigé, pour rappeler de retirer l'entrée.
 */
const KNOWN_NON_STANDARD_SLUGS = [
  // Changer ces slugs casserait des liens déjà partagés.
  "olives-a-la-niçoise",
  "panacotta-coulis de framboises",
];
const KNOWN_INCOMPLETE_RECIPES: string[] = [];
const KNOWN_INGREDIENT_COUNT_MISMATCHES = [
  "tian-de-courgettes-au-riz", // fr 9 / en 4
  "olives-a-la-niçoise", // fr 5 / en 4
  "la-frita", // fr 10 / en 6
  "macarons", // fr 6 / en 11
  "gelee-de-framboises-et-feve-de-tonka", // fr 3 / en 4
];

describe("données des recettes", () => {
  it("contient des recettes", () => {
    expect(recipes.length).toBeGreaterThan(0);
  });

  it("a des slugs uniques", () => {
    const seen = new Set<string>();
    const duplicates = recipes
      .map((r) => r.slug)
      .filter((slug) => (seen.has(slug) ? true : (seen.add(slug), false)));
    expect(duplicates).toEqual([]);
  });

  it("a des slugs utilisables dans une URL", () => {
    const invalid = recipes
      .filter((r) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug))
      .map((r) => r.slug);
    expect(invalid).toEqual(KNOWN_NON_STANDARD_SLUGS);
  });

  it("renseigne les champs obligatoires", () => {
    const incomplete = recipes
      .filter(
        (r) =>
          !r.name.trim() ||
          !r.timeToCook.trim() ||
          r.ingredients.length === 0 ||
          r.ingredients.some((i) => !i.trim()),
      )
      .map((r) => r.slug);
    expect(incomplete).toEqual(KNOWN_INCOMPLETE_RECIPES);
  });

  it("a un texte de préparation pour chaque recette, et inversement", () => {
    const slugs = recipes.map((r) => r.slug);
    const missing = slugs.filter(
      (s) => !recipeDescriptions[s]?.description.trim(),
    );
    const orphans = Object.keys(recipeDescriptions).filter(
      (s) => !slugs.includes(s),
    );
    expect({ missing, orphans }).toEqual({ missing: [], orphans: [] });
  });

  it("garde la liste des noms de chefs alignée sur les chefs", () => {
    expect(chiefs.map((c) => c.name)).toEqual([...chiefNames]);
  });

  it("n'utilise que des valeurs de filtre connues", () => {
    const unknown = recipes
      .filter(
        (r) =>
          !seasons.includes(r.season) ||
          !recipeTypes.includes(r.type) ||
          !difficulties.includes(r.difficulty) ||
          !averagePrices.includes(r.averagePrice),
      )
      .map((r) => r.slug);
    expect(unknown).toEqual([]);
  });

  it("n'attribue une recette qu'à un chef existant", () => {
    const names = new Set(chiefs.map((c) => c.name));
    const unknown = recipes
      .filter((r) => r.authorName !== undefined && !names.has(r.authorName))
      .map((r) => `${r.slug} -> ${r.authorName}`);
    expect(unknown).toEqual([]);
  });

  it("référence uniquement des images présentes dans public/", () => {
    const paths = [
      ...recipes.flatMap((r) => [r.image, r.authorImg]),
      ...chiefs.map((c) => c.img),
    ];
    const missing = [...new Set(paths)].filter(
      (p) => !existsSync(path.join(publicDir, p)),
    );
    expect(missing).toEqual([]);
  });

  it("a les variantes WebP 480 et 800 px de chaque photo de galerie", () => {
    const missing = [...new Set(recipes.map((r) => r.image))]
      .filter((p) => /^\/img\/gallery\/[^/]+\.jpg$/i.test(p))
      .flatMap((p) =>
        [480, 800]
          .map((w) => p.replace(/\.jpg$/i, `-${w}.webp`))
          .filter((v) => !existsSync(path.join(publicDir, v))),
      );
    expect(missing).toEqual([]);
  });

  it("a le JPEG de partage carré de chaque photo de galerie", () => {
    // Utilisé par les aperçus de liens (public/img/share, même nom de fichier).
    const missing = [...new Set(recipes.map((r) => r.image))]
      .filter((p) => /^\/img\/gallery\/[^/]+\.jpg$/i.test(p))
      .map((p) => p.replace("/img/gallery/", "/img/share/"))
      .filter((p) => !existsSync(path.join(publicDir, p)));
    expect(missing).toEqual([]);
  });

  it("liste exactement les photos paysage de la galerie", () => {
    // Dimensions lues dans l'en-tête JPEG (marqueur SOF), sans dépendance.
    const size = (file: string) => {
      const buf = readFileSync(file);
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) {
          i += 1;
          continue;
        }
        const marker = buf[i + 1] ?? 0;
        if (
          marker >= 0xc0 &&
          marker <= 0xcf &&
          ![0xc4, 0xc8, 0xcc].includes(marker)
        ) {
          return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
      throw new Error(`Dimensions introuvables : ${file}`);
    };
    const actual = [...new Set(recipes.map((r) => r.image))]
      .filter((p) => /^\/img\/gallery\/[^/]+\.jpg$/i.test(p))
      .filter((p) => {
        const { w, h } = size(path.join(publicDir, p));
        return w > h;
      })
      .sort();
    expect(actual).toEqual([...LANDSCAPE_PHOTOS].sort());
  });

  it("garde la même longueur d'ingrédients en français et en anglais", () => {
    const mismatched = recipes
      .filter(
        (r) =>
          r.ingredients_en !== undefined &&
          r.ingredients_en.length !== r.ingredients.length,
      )
      .map((r) => r.slug);
    expect(mismatched).toEqual(KNOWN_INGREDIENT_COUNT_MISMATCHES);
  });
});

describe("localizeRecipe", () => {
  const base: Recipe = {
    image: "/img/gallery/a.jpg",
    authorImg: "/img/top-chiefs/a.jpg",
    name: "Riz au lait",
    slug: "riz-au-lait",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 min + 20 min de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["riz", "lait"],
  };

  it("renvoie le français tel quel", () => {
    const loc = localizeRecipe({ ...base, name_en: "Rice pudding" }, "fr");
    expect(loc.name).toBe("Riz au lait");
    expect(loc.ingredients).toEqual(["riz", "lait"]);
  });

  it("renvoie l'anglais quand il existe", () => {
    const loc = localizeRecipe(
      {
        ...base,
        name_en: "Rice pudding",
        ingredients_en: ["rice", "milk"],
        timeToCook_en: "10 min + 20 min cooking time",
      },
      "en",
    );
    expect(loc).toEqual({
      name: "Rice pudding",
      ingredients: ["rice", "milk"],
      timeToCook: "10 min + 20 min cooking time",
    });
  });

  it("retombe sur le français quand la traduction manque", () => {
    const loc = localizeRecipe(base, "en");
    expect(loc.name).toBe("Riz au lait");
    expect(loc.ingredients).toEqual(["riz", "lait"]);
    expect(loc.timeToCook).toBe(base.timeToCook);
  });
});

describe("fallbackLang", () => {
  it("déclare le français quand la traduction anglaise manque", () => {
    expect(fallbackLang(undefined, "en")).toBe("fr");
  });

  it("ne renvoie rien quand la traduction existe ou en français", () => {
    expect(fallbackLang("Rice pudding", "en")).toBeUndefined();
    expect(fallbackLang(undefined, "fr")).toBeUndefined();
  });
});

describe("localizeDescription", () => {
  const text: RecipeDescription = {
    description: "Un dessert",
    description_en: "A dessert",
  };

  it("renvoie le français ou l'anglais selon la langue", () => {
    expect(localizeDescription(text, "fr")).toBe("Un dessert");
    expect(localizeDescription(text, "en")).toBe("A dessert");
  });

  it("retombe sur le français quand la traduction manque", () => {
    expect(localizeDescription({ description: "Un dessert" }, "en")).toBe(
      "Un dessert",
    );
  });
});

describe("splitCookingTime", () => {
  it("sépare préparation et cuisson", () => {
    expect(splitCookingTime("15 min + 30 min de cuisson")).toEqual({
      prep: "15 min",
      cook: "30 min",
    });
  });

  it("gère le libellé anglais", () => {
    expect(splitCookingTime("15 min + 30 min cooking time")).toEqual({
      prep: "15 min",
      cook: "30 min",
    });
  });

  it("renvoie cook = null sans temps de cuisson", () => {
    expect(splitCookingTime("30 minutes")).toEqual({
      prep: "30 minutes",
      cook: null,
    });
  });

  it("tolère les espaces autour du séparateur", () => {
    expect(splitCookingTime("  1 h+45 min  ")).toEqual({
      prep: "1 h",
      cook: "45 min",
    });
  });
});
