import { useEffect } from "react";
import { createRouter, useRouter } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { routeTree } from "./routeTree.gen";

function ErrorScreen({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  const { t } = useI18n();
  const message = error instanceof Error ? error.message : undefined;

  useEffect(() => {
    console.error("Erreur de rendu :", error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <TriangleAlert
            className="size-8 text-destructive"
            aria-hidden="true"
          />
        </div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          {t.errorPage.errorTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.errorPage.errorText}
        </p>
        {import.meta.env.DEV && message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {message}
          </pre>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="h-11 rounded-full px-5 font-semibold hover:bg-primary-deep"
          >
            {t.errorPage.retry}
          </Button>
          {/* Lien classique (rechargement complet) : il reste fiable même si
              le routeur est la cause de l'erreur. */}
          <a
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-full px-5 font-semibold",
            )}
          >
            {t.errorPage.home}
          </a>
        </div>
      </div>
    </main>
  );
}

// Fournisseur de langue propre à l'écran d'erreur : il reste utilisable même si
// l'erreur vient du layout racine, hors du fournisseur principal.
function DefaultErrorComponent(props: { error: unknown; reset: () => void }) {
  return (
    <I18nProvider>
      <ErrorScreen {...props} />
    </I18nProvider>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 30_000, // 30 secondes, ou Infinity si pas de données dynamiques
    defaultErrorComponent: DefaultErrorComponent,
  });
  return router;
};
