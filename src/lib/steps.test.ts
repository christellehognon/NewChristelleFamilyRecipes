import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { recipeDescriptions } from "../data/recipe-descriptions";
import { splitSteps } from "./steps";

describe("splitSteps", () => {
  it("coupe à chaque fin de phrase", () => {
    expect(
      splitSteps("Laver le riz. L'ébouillanter 1 minute. Servir !"),
    ).toEqual(["Laver le riz.", "L'ébouillanter 1 minute.", "Servir !"]);
  });

  it("ne coupe pas après une abréviation suivie d'un mot en minuscule", () => {
    expect(
      splitSteps("Faites chauffer 2 c. à soupe d'huile. Servez chaud."),
    ).toEqual(["Faites chauffer 2 c. à soupe d'huile.", "Servez chaud."]);
    expect(
      splitSteps("Allumez le four th 5 (env. 170°C). Lavez les tomates."),
    ).toEqual(["Allumez le four th 5 (env. 170°C).", "Lavez les tomates."]);
  });

  it("coupe aussi les textes anglais", () => {
    expect(splitSteps("Mix well. Set aside.")).toEqual([
      "Mix well.",
      "Set aside.",
    ]);
  });

  it("garde une remarque entre parenthèses avec l'étape qui la suit", () => {
    expect(
      splitSteps("Cuire 1h30. (souvent plus !) Laisser refroidir."),
    ).toEqual(["Cuire 1h30.", "(souvent plus !) Laisser refroidir."]);
  });

  it("renvoie une liste vide pour un texte vide", () => {
    expect(splitSteps("")).toEqual([]);
    expect(splitSteps("   ")).toEqual([]);
  });

  it("n'utilise pas de lookbehind (erreur de syntaxe sur Safari < 16.4)", () => {
    const source = readFileSync(path.resolve(__dirname, "steps.ts"), "utf8");
    expect(source).not.toMatch(/\(\?<[=!]/);
  });
});

describe("découpe des recettes", () => {
  it("ne produit aucune étape commençant par une minuscule", () => {
    // Une étape qui commence par une minuscule trahit une coupe au milieu d'une phrase.
    const fragments = Object.entries(recipeDescriptions).flatMap(([slug, d]) =>
      [d.description, d.description_en ?? ""]
        .flatMap(splitSteps)
        .filter((step) => /^\p{Ll}/u.test(step))
        .map((step) => `${slug}: ${step.slice(0, 50)}`),
    );
    expect(fragments).toEqual([]);
  });
});
