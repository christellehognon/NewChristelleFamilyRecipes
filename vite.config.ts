import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // Variables exposées au code client. WEB3FORMS_ACCESS_KEY est publique par
  // conception (elle finit dans le bundle) ; un préfixe propre évite que Vercel
  // la traite comme une variable VITE_* à protéger.
  envPrefix: ["VITE_", "WEB3FORMS_"],
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
