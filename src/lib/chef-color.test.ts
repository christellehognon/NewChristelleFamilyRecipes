import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { chiefNames } from "@/data/recipes";
import { chefColorStyle, chefColorVar } from "./chef-color";

const css = readFileSync(path.resolve(__dirname, "../styles.css"), "utf8");

describe("couleurs des cheffes", () => {
  it("donne une couleur à chaque cheffe", () => {
    for (const name of chiefNames) {
      expect(chefColorVar[name], name).toBeTruthy();
    }
  });

  it("définit chaque couleur en clair et en sombre dans styles.css", () => {
    for (const name of chiefNames) {
      const variable = chefColorVar[name];
      const definitions = css.split(`${variable}:`).length - 1;
      expect(definitions, `${name} (${variable})`).toBe(2);
    }
  });

  it("utilise des couleurs toutes différentes", () => {
    const values = chiefNames.map((n) => chefColorVar[n]);
    expect(new Set(values).size).toBe(chiefNames.length);
  });

  it("retombe sur la valeur de repli sans cheffe", () => {
    expect(chefColorStyle(undefined, "red")).toEqual({ "--chef": "red" });
    expect(chefColorStyle("Loulou")).toEqual({
      "--chef": "var(--chef-loulou)",
    });
  });
});
