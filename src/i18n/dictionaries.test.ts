import { describe, expect, it } from "vitest";
import { dictionaries } from "./dictionaries";

/** Liste les chemins de toutes les feuilles ("home.title", "season.Été", …). */
function leafPaths(value: unknown, prefix = ""): string[] {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

/** Type de chaque feuille, pour vérifier fonction/chaîne/tableau des deux côtés. */
function leafTypes(value: unknown, prefix = ""): Record<string, string> {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.assign(
      {},
      ...Object.entries(value).map(([key, child]) =>
        leafTypes(child, prefix ? `${prefix}.${key}` : key),
      ),
    );
  }
  return { [prefix]: Array.isArray(value) ? "array" : typeof value };
}

function valueAt(root: unknown, dotted: string): unknown {
  return dotted
    .split(".")
    .reduce<unknown>((acc, part) => (acc as Record<string, unknown>)[part], root);
}

describe("dictionnaires i18n", () => {
  it("expose exactement les mêmes clés en français et en anglais", () => {
    expect(leafPaths(dictionaries.en).sort()).toEqual(
      leafPaths(dictionaries.fr).sort(),
    );
  });

  it("garde le même type de valeur pour chaque clé", () => {
    expect(leafTypes(dictionaries.en)).toEqual(leafTypes(dictionaries.fr));
  });

  it("n'a aucune chaîne vide", () => {
    for (const lang of ["fr", "en"] as const) {
      const empty = Object.keys(leafTypes(dictionaries[lang])).filter((key) => {
        const value = valueAt(dictionaries[lang], key);
        return typeof value === "string" && value.trim() === "";
      });
      expect(empty, `chaînes vides en ${lang}`).toEqual([]);
    }
  });
});
