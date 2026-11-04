import { useEffect, useRef } from "react";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { usePageMeta } from "@/i18n/usePageMeta";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  usePageMeta("404 — Christelle's Family Recipes");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFirstRender = useRef(true);

  // Après un changement de page, le focus passe au titre pour que les lecteurs
  // d'écran annoncent la nouvelle page (sinon il reste sur le lien cliqué).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      const target =
        document.querySelector<HTMLElement>("main h1") ??
        document.getElementById("main");
      if (!target) return;
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <I18nProvider>
      <Outlet />
      <Toaster richColors position="top-center" />
      <Analytics />
    </I18nProvider>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});
