import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildSharePage, shorten } from "./share-meta";

describe("shorten", () => {
  it("laisse intact un texte assez court", () => {
    expect(shorten("Étaler la pâte.", 155)).toBe("Étaler la pâte.");
  });

  it("coupe au dernier mot entier et ajoute une ellipse", () => {
    const out = shorten(
      "Préchauffer le four à 200 degrés puis peler les pommes",
      30,
    );
    expect(out).toBe("Préchauffer le four à 200…");
    expect(out.length).toBeLessThanOrEqual(30);
  });

  it("ne laisse pas de ponctuation avant l'ellipse", () => {
    expect(shorten("Mélanger, puis ajouter le sucre en pluie fine.", 20)).toBe(
      "Mélanger, puis…",
    );
  });
});

// Le vrai index.html du projet : si on en retire une balise, ce test le dit.
const indexHtml = readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8",
);

const meta = {
  title: "Tarte aux pommes — Christelle's Family Recipes",
  description: "Étaler la pâte. Garnir de pommes.",
  url: "https://exemple.test/recettes/tarte-aux-pommes",
  image: "https://exemple.test/img/share/img_33.jpg",
  imageAlt: "Tarte aux pommes",
};

describe("buildSharePage", () => {
  it("remplace le titre et la description de l'accueil", () => {
    const html = buildSharePage(indexHtml, meta);
    expect(html).toContain(`<title>${meta.title}</title>`);
    expect(html).toContain(
      `<meta property="og:title" content="${meta.title}" />`,
    );
    expect(html).toContain(
      `<meta name="description" content="${meta.description}" />`,
    );
    expect(html).not.toContain("Les recettes que tout le monde adore");
  });

  it("ajoute l'adresse, l'adresse canonique et l'image de partage", () => {
    const html = buildSharePage(indexHtml, meta);
    expect(html).toContain(`<meta property="og:url" content="${meta.url}" />`);
    expect(html).toContain(`<link rel="canonical" href="${meta.url}" />`);
    expect(html).toContain(
      `<meta property="og:image" content="${meta.image}" />`,
    );
    expect(html).toContain('<meta property="og:image:width" content="800" />');
  });

  it("garde le reste de la page (script de l'application) intact", () => {
    const html = buildSharePage(indexHtml, meta);
    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('src="/src/main.tsx"');
  });

  it("échappe les guillemets et les chevrons", () => {
    const html = buildSharePage(indexHtml, {
      ...meta,
      title: 'Le "meilleur" <plat>',
      description: "Sel & poivre",
    });
    expect(html).toContain("Le &quot;meilleur&quot; &lt;plat&gt;");
    expect(html).toContain('content="Sel &amp; poivre"');
  });

  it("n'ajoute aucune balise d'image quand la recette n'a pas de photo", () => {
    const html = buildSharePage(indexHtml, {
      title: meta.title,
      description: meta.description,
    });
    expect(html).not.toContain("og:image");
    expect(html).not.toContain("og:url");
    expect(html).toContain(`<title>${meta.title}</title>`);
  });

  it("échoue clairement si une balise attendue manque", () => {
    expect(() =>
      buildSharePage("<html><head><title>x</title></head></html>", meta),
    ).toThrow(/introuvable/);
  });
});
