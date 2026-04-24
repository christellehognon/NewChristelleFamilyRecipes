import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { chiefs, localizeChief } from "@/data/recipes";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export const Route = createFileRoute("/le-chef")({
  head: () => ({
    meta: [
      { title: dictionaries.fr.chef.metaTitle },
      { name: "description", content: dictionaries.fr.chef.metaDesc },
      { property: "og:title", content: dictionaries.fr.chef.metaTitle },
      { property: "og:description", content: dictionaries.fr.chef.metaDesc },
    ],
  }),
  component: ChefPage,
});

function ChefAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="size-32 overflow-hidden rounded-full bg-secondary ring-4 ring-primary/30">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="grid size-full place-items-center text-muted-foreground">
          <UserRound className="size-12" />
        </div>
      )}
    </div>
  );
}

function ChefPage() {
  const { t, lang } = useI18n();
  const lead = chiefs[0];
  const leadLoc = localizeChief(lead, lang);
  const others = chiefs.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section
          className="border-b border-border/60"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur">
              {t.chef.badge}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {t.chef.hello} <span className="italic text-primary-deep">{lead.name}</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-foreground/75">{t.chef.lead}</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-card p-8 shadow-[var(--shadow-card)] md:flex-row md:p-10">
            <ChefAvatar src={lead.img} alt={lead.name} />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.chef.about}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold">{lead.name}</h2>
              <p className="mt-3 text-foreground/80">{leadLoc.description}</p>
              <p className="mt-3 text-foreground/80">{t.chef.credo}</p>
            </div>
          </div>

          <h2 className="mt-14 font-display text-2xl font-semibold md:text-3xl">
            {t.chef.family}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center rounded-2xl bg-card p-5 text-center shadow-sm"
              >
                <div className="size-20 overflow-hidden rounded-full bg-secondary ring-2 ring-primary/20">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={c.name}
                      className="size-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="grid size-full place-items-center text-muted-foreground">
                      <UserRound className="size-8" />
                    </div>
                  )}
                </div>
                <p className="mt-3 font-display text-lg font-semibold">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {localizeChief(c, lang).description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
