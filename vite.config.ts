import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { fileURLToPath } from "node:url";

/**
 * Sonner injecte son CSS dans une balise <style> au chargement, ce que la CSP
 * (style-src 'self') interdit. Le même CSS est chargé comme fichier depuis
 * styles.css ; on désactive donc l'injection au build.
 */
const sonnerWithoutStyleInjection = (): Plugin => ({
  name: "sonner-without-style-injection",
  enforce: "pre",
  transform(code, id) {
    if (!/node_modules\/sonner\/dist\/index\.m?js$/.test(id)) return null;
    const patched = code.replace(
      "function __insertCSS(code) {",
      "function __insertCSS(code) {\n  return;",
    );
    if (patched === code) {
      this.error("sonner : fonction __insertCSS introuvable, plugin à revoir");
    }
    return patched;
  },
});

export default defineConfig({
  // Variables exposées au code client. WEB3FORMS_ACCESS_KEY est publique par
  // conception (elle finit dans le bundle) ; un préfixe propre évite que Vercel
  // la traite comme une variable VITE_* à protéger.
  envPrefix: ["VITE_", "WEB3FORMS_"],
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    sonnerWithoutStyleInjection(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
