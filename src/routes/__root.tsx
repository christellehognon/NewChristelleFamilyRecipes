import { Outlet, createRootRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Analytics } from "@vercel/analytics/react";

function NotFoundComponent() {
  return (
    <>
      <Analytics />
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
    </>
  );
}

export const Route = createRootRoute({
  component: () => (
    <I18nProvider>
      <Outlet />
    </I18nProvider>
  ),
  notFoundComponent: NotFoundComponent,
});
