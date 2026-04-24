import { Link } from "@tanstack/react-router";
import { Menu, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { LangSwitcher } from "@/components/LangSwitcher";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { to: "/" as const, label: t.nav.home },
    { to: "/le-chef" as const, label: t.nav.chef },
    { to: "/contact" as const, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:rotate-6">
            <UtensilsCrossed className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
              Christelle's
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Family Recipes
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LangSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground"
            aria-label={t.nav.openMenu}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary-deep" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary/60"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
