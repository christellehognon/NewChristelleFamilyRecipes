import { createFileRoute } from "@tanstack/react-router";
import { Leaf, ChefHat, Coins, Clock, CookingPot } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { RefreshCw, Search, Shuffle, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RecipeCard } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  type AveragePrice,
  type Difficulty,
  type RecipeType,
  type Season,
  averagePrices,
  difficulties,
  localizeRecipe,
  recipeTypes,
  recipes,
  seasons,
} from "@/data/recipes";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: dictionaries.fr.home.metaTitle },
      { name: "description", content: dictionaries.fr.home.metaDesc },
      { property: "og:title", content: "Christelle's Family Recipes" },
      { property: "og:description", content: dictionaries.fr.home.metaDesc },
    ],
  }),
  component: HomePage,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function HomePage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState<Season | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [price, setPrice] = useState<AveragePrice | null>(null);
  const [type, setType] = useState<RecipeType | null>(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [seed, setSeed] = useState(0);
  const [visible, setVisible] = useState<number>(12);
 const [hydrated, setHydrated] = useState(false);
console.log('RECIPES', recipes.length)
useEffect(() => {
    setHydrated(true);
  }, []);
  const shuffled = useMemo(
    () => (hydrated ? shuffle(recipes) : recipes),
    [seed, hydrated],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
   
    return shuffled.filter((r) => {
      if (season && r.season !== season) return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (price && r.averagePrice !== price) return false;
      if (type && r.type !== type) return false;
      if (vegetarian && !r.isVegetarian) return false;
      if (q) {
        const loc = localizeRecipe(r, lang);
        const inName =
          loc.name.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
        const inIng =
          loc.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!inName && !inIng) return false;
      }
      return true;
    });
  }, [shuffled, search, season, difficulty, price, type, vegetarian, lang]);

  const hasFilters = search || season || difficulty || price || type || vegetarian;

  const reset = () => {
    setSearch("");
    setSeason(null);
    setDifficulty(null);
    setPrice(null);
    setType(null);
    setVegetarian(false);
  };

  const countLabel =
    filtered.length === 0
      ? t.home.none
      : filtered.length === 1
        ? t.home.countOne(1)
        : t.home.countMany(filtered.length);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="border-b border-border/60"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur">
              {t.home.badge}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {t.home.titleA}
              <br />
              <span className="italic text-primary-deep">{t.home.titleB}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">{t.home.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                onClick={() => setSeed((s) => s + 1)}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary-deep h-11 px-6 shadow-[var(--shadow-card)]"
              >
                <Shuffle className="size-4" />
                {t.home.shuffle}
              </Button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border/60 bg-background/60">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.home.searchPlaceholder}
                  className="h-12 rounded-full border-border bg-card pl-11 pr-12 text-base shadow-sm focus-visible:ring-primary"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                    aria-label={t.home.clearSearch}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <FilterGroup label={t.home.filterType}>
                {recipeTypes.map((tp) => (
                  <Pill
                    key={tp}
                    active={type === tp}
                    onClick={() => setType(type === tp ? null : tp)}
                  >
                    {t.type[tp]}
                  </Pill>
                ))}
                <Pill active={vegetarian} onClick={() => setVegetarian((v) => !v)}>
                  {t.home.vegetarian}
                </Pill>
              </FilterGroup>

              <FilterGroup label={t.home.filterSeason}>
                {seasons.map((s) => (
                  <Pill
                    key={s}
                    active={season === s}
                    onClick={() => setSeason(season === s ? null : s)}
                  >
                    {t.season[s]}
                  </Pill>
                ))}
              </FilterGroup>

              <FilterGroup label={t.home.filterDifficulty}>
                {difficulties.map((d) => (
                  <Pill
                    key={d}
                    active={difficulty === d}
                    onClick={() => setDifficulty(difficulty === d ? null : d)}
                  >
                    {t.difficulty[d]}
                  </Pill>
                ))}
              </FilterGroup>

              <FilterGroup label={t.home.filterPrice}>
                {averagePrices.map((p) => (
                  <Pill
                    key={p}
                    active={price === p}
                    onClick={() => setPrice(price === p ? null : p)}
                  >
                    {t.price[p]}
                  </Pill>
                ))}
                {hasFilters && (
                  <button
                    onClick={reset}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="size-3.5" />
                    {t.home.reset}
                  </button>
                )}
              </FilterGroup>
            </div>
            {/* Légende des icônes */}
            <div className="mt-5 rounded-2xl border border-border/70 bg-card/60 px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.home.legendTitle}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground/75">
                <LegendItem icon={<Leaf className="size-3.5" />} label={t.home.legendSeason} />
                <LegendItem icon={<ChefHat className="size-3.5" />} label={t.home.legendDifficulty} />
                <LegendItem icon={<Coins className="size-3.5" />} label={t.home.legendPrice} />
                <LegendItem icon={<Clock className="size-3.5" />} label={t.home.legendPrep} />
                <LegendItem icon={<CookingPot className="size-3.5" />} label={t.home.legendCook} />
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{countLabel}</h2>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((recipe, i) => (
                <RecipeCard key={recipe.slug} recipe={recipe} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <p className="font-display text-2xl text-foreground">{t.home.emptyTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.home.emptyDesc}</p>
              <Button
                onClick={reset}
                variant="outline"
                className="mt-5 rounded-full border-primary/40 text-primary-deep hover:bg-primary/10"
              >
                {t.home.emptyReset}
              </Button>
            </div>
          )}
          {filtered.length > visible && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisible((v) => Math.min(v + 12, filtered.length))}
                className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border"
              >
                Afficher plus
              </button>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-primary-deep">{icon}</span>
      {label}
    </span>
  );
}
