/**
 * Page « de partage » d'une recette : copie de index.html dont l'en-tête porte le
 * titre, la description et l'image de la recette. Les aperçus de liens
 * (WhatsApp, iMessage, Facebook…) lisent cet en-tête sans exécuter le
 * JavaScript de l'application, qui continue de se charger normalement.
 */
export type ShareMeta = {
  title: string;
  description: string;
  /** Adresse complète de la page (https://…/recettes/slug). Absente sans domaine connu. */
  url?: string;
  /** Adresse de l'image de partage (complète si possible). */
  image?: string;
  /** Texte alternatif de l'image. */
  imageAlt?: string;
};

/** Coupe à `max` caractères au dernier mot entier, avec « … » si le texte est raccourci. */
export function shorten(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, "")}…`;
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Une balise absente d'index.html fait échouer le build : mieux vaut le savoir
// que publier des aperçus qui ne changent rien.
function setMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string,
): string {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`,
    "s",
  );
  if (!pattern.test(html)) {
    throw new Error(
      `Balise <meta ${attr}="${key}"> introuvable dans index.html`,
    );
  }
  return html.replace(
    pattern,
    () => `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
  );
}

export function buildSharePage(indexHtml: string, meta: ShareMeta): string {
  if (!/<title>[^<]*<\/title>/.test(indexHtml)) {
    throw new Error("Balise <title> introuvable dans index.html");
  }
  let html = indexHtml.replace(
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtml(meta.title)}</title>`,
  );
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);

  const extra: string[] = [];
  if (meta.url) {
    extra.push(`<link rel="canonical" href="${escapeHtml(meta.url)}" />`);
    extra.push(`<meta property="og:url" content="${escapeHtml(meta.url)}" />`);
  }
  if (meta.image) {
    extra.push(
      `<meta property="og:image" content="${escapeHtml(meta.image)}" />`,
      `<meta property="og:image:width" content="800" />`,
      `<meta property="og:image:height" content="800" />`,
    );
    if (meta.imageAlt) {
      extra.push(
        `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
      );
    }
  }
  if (extra.length === 0) return html;
  if (!html.includes("</head>")) {
    throw new Error("Balise </head> introuvable dans index.html");
  }
  return html.replace(
    "</head>",
    () => `    ${extra.join("\n    ")}\n  </head>`,
  );
}
