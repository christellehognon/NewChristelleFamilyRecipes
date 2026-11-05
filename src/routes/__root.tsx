import { useEffect, useRef } from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { usePageMeta } from "@/i18n/usePageMeta";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  const { t } = useI18n();
  usePageMeta(`404 — Christelle's Family Recipes`);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main
        id="main"
        className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center"
      >
        <p
          aria-hidden="true"
          className="font-display text-7xl font-semibold text-primary-deep"
        >
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">
          {t.errorPage.notFoundTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.errorPage.notFoundText}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <ArrowLeft className="size-4" /> {t.errorPage.home}
        </Link>
      </main>
      <SiteFooter />
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
