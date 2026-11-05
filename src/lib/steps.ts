/**
 * Découpe un texte de préparation en étapes : une étape par phrase.
 *
 * On coupe seulement après `.`, `!` ou `?` suivi d'une MAJUSCULE (ou d'une
 * parenthèse / d'un guillemet ouvrant). Ainsi les abréviations suivies d'un mot
 * en minuscule restent dans leur phrase : « 2 c. à soupe », « (env. 170°C) ».
 *
 * Pas de « lookbehind » (assertion arrière d'expression régulière) : il
 * provoque une erreur de syntaxe sur Safari avant 16.4, ce qui empêcherait de
 * charger toute la page recette.
 */
export function splitSteps(text: string): string[] {
  return text
    .replace(/([.!?])\s+(?=[\p{Lu}«"“(])/gu, "$1\u0000")
    .split("\u0000")
    .map((step) => step.trim())
    .filter(Boolean);
}
