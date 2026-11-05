import { createFileRoute } from "@tanstack/react-router";
import { Clock, CookingPot } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import {
  ChevronDown,
  RefreshCw,
  Search,
  Shuffle,
  SlidersHorizontal,
  X,
} from "lucide-react";
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
  chiefs,
} from "@/data/recipes";
import { ChefPill } from "@/components/ChefPill";
import { FilterPill } from "@/components/FilterPill";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { usePageMeta } from "@/i18n/usePageMeta";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // i et j sont toujours dans les bornes du tableau.
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

const ORDER_KEY = "recipe-order";

// sessionStorage peut être indisponible ou corrompu (navigation privée,
// quota, valeur modifiée) : on ne doit jamais casser la page pour ça.
function saveOrder(list: typeof recipes): typeof recipes {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(list.map((r) => r.slug)));
  } catch (e) {
    console.warn("Impossible de mémoriser l'ordre des recettes", e);
  }
  return list;
}

function loadOrder(): typeof recipes {
  try {
    const stored = sessionStorage.getItem(ORDER_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const bySlug = new Map(recipes.map((r) => [r.slug, r]));
        const ordered = parsed.flatMap((slug) => {
          const recipe =
            typeof slug === "string" ? bySlug.get(slug) : undefined;
          return recipe ? [recipe] : [];
        });
        // Recettes ajoutées depuis la sauvegarde : on les place à la fin.
        const known = new Set(ordered.map((r) => r.slug));
        const missing = recipes.filter((r) => !known.has(r.slug));
        if (ordered.length > 0) return [...ordered, ...missing];
      }
    }
  } catch (e) {
    console.warn("Ordre des recettes illisible, nouveau mélange", e);
  }
  return saveOrder(shuffle(recipes));
}

function HomePage() {
  const { t, lang } = useI18n();
  usePageMeta(t.home.metaTitle, t.home.metaDesc);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState<Season | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [price, setPrice] = useState<AveragePrice | null>(null);
  const [type, setType] = useState<RecipeType | null>(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [chef, setChef] = useState<string | null>(null);

  // Mobile : les groupes de filtres sont repliés tant qu'on ne les ouvre pas.
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [shuffled, setShuffled] = useState(loadOrder);
  const [visible, setVisible] = useState<number>(12);

  // Message lu par les lecteurs d'écran après « Mélanger » : la liste change
  // d'ordre sans que le nombre de recettes bouge, donc rien n'était annoncé.
  const [announce, setAnnounce] = useState("");

  const handleShuffle = () => {
    setShuffled(saveOrder(shuffle(recipes)));
    setVisible(12);
    setAnnounce(t.home.shuffled);
  };

  // Après « Voir plus », le focus passe à la première nouvelle carte pour que
  // la navigation au clavier continue là où la liste s'est allongée.
  const handleShowMore = () => {
    const previous = visible;
    setVisible((v) => v + 12);
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>("#recipe-grid > a")
        [previous]?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    setAnnounce("");
  }, [search, season, difficulty, price, type, vegetarian, chef]);

  const filtered = useMemo(() => {
    const normalize = (value: string) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    const q = normalize(search);

    return shuffled.filter((r) => {
      if (season && r.season !== season) return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (price && r.averagePrice !== price) return false;
      if (type && r.type !== type) return false;
      if (vegetarian && !r.isVegetarian) return false;
      if (chef && r.authorName !== chef) return false;
      if (q) {
        const loc = localizeRecipe(r, lang);
        const inName =
          normalize(loc.name).includes(q) || normalize(r.name).includes(q);

        const inIng =
          loc.ingredients.some((i) => normalize(i).includes(q)) ||
          r.ingredients.some((i) => normalize(i).includes(q));
        if (!inName && !inIng) return false;
      }
      return true;
    });
  }, [
    shuffled,
    search,
    season,
    difficulty,
    price,
    type,
    vegetarian,
    chef,
    lang,
  ]);

  const hasFilters =
    search || season || difficulty || price || type || vegetarian || chef;
  // Nombre de filtres actifs (hors recherche), affiché sur le bouton replié.
  const activeCount = [
    season,
    difficulty,
    price,
    type,
    vegetarian,
    chef,
  ].filter(Boolean).length;

  const reset = () => {
    setSearch("");
    setSeason(null);
    setDifficulty(null);
    setPrice(null);
    setType(null);
    setVegetarian(false);
    setChef(null);
    setVisible(12);
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

      <main id="main" className="flex-1">
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
            <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">
              {t.home.lead}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                onClick={handleShuffle}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary-deep h-11 px-6 shadow-[var(--shadow-card)] cursor-pointer"
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
              <div role="search" className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.home.searchPlaceholder}
                  aria-label={t.home.searchPlaceholder}
                  className="h-12 rounded-full border-border bg-card pl-11 pr-12 text-base shadow-sm focus-visible:ring-primary"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary cursor-pointer pointer-coarse:right-1 pointer-coarse:size-11"
                    aria-label={t.home.clearSearch}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Mobile : un bouton déplie les filtres ; le bureau les montre tous. */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-controls="filters-panel"
                  onClick={() => setFiltersOpen((v) => !v)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                    activeCount > 0
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border bg-card text-foreground/80",
                  )}
                >
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  {t.home.filters}
                  {activeCount > 0 && (
                    <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                      {activeCount}
                    </span>
                  )}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform",
                      filtersOpen && "rotate-180",
                    )}
                  />
                </button>
                {hasFilters && (
                  <ResetButton
                    onClick={reset}
                    label={t.home.reset}
                    className="ml-auto"
                  />
                )}
              </div>

              <div
                id="filters-panel"
                className={cn(
                  "flex-col gap-4 md:flex",
                  filtersOpen ? "flex" : "hidden",
                )}
              >
                <FilterGroup label={t.home.filterType}>
                  {recipeTypes.map((tp) => (
                    <FilterPill
                      key={tp}
                      active={type === tp}
                      onClick={() => setType(type === tp ? null : tp)}
                    >
                      {t.type[tp]}
                    </FilterPill>
                  ))}
                  <FilterPill
                    active={vegetarian}
                    onClick={() => setVegetarian((v) => !v)}
                  >
                    {t.home.vegetarian}
                  </FilterPill>
                </FilterGroup>

                <FilterGroup label={t.home.filterSeason}>
                  {seasons.map((s) => (
                    <FilterPill
                      key={s}
                      active={season === s}
                      onClick={() => setSeason(season === s ? null : s)}
                    >
                      {t.season[s]}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label={t.home.filterDifficulty}>
                  {difficulties.map((d) => (
                    <FilterPill
                      key={d}
                      active={difficulty === d}
                      onClick={() => setDifficulty(difficulty === d ? null : d)}
                    >
                      {t.difficulty[d]}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label={t.home.filterPrice}>
                  {averagePrices.map((p) => (
                    <FilterPill
                      key={p}
                      active={price === p}
                      onClick={() => setPrice(price === p ? null : p)}
                    >
                      {t.price[p]}
                    </FilterPill>
                  ))}
                  {hasFilters && (
                    <ResetButton
                      onClick={reset}
                      label={t.home.reset}
                      className="ml-auto hidden md:inline-flex"
                    />
                  )}
                </FilterGroup>

                <FilterGroup label={t.home.filterChef}>
                  {chiefs.map((c) => (
                    <ChefPill
                      key={c.name}
                      name={c.name}
                      img={c.img}
                      active={chef === c.name}
                      onClick={() => setChef(chef === c.name ? null : c.name)}
                    />
                  ))}
                </FilterGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              {countLabel}
            </h2>
            <p role="status" className="sr-only">
              {announce ? `${announce}. ${countLabel}` : countLabel}
            </p>
            {/* Seules les icônes de durée n'ont pas de libellé sur les cartes. */}
            {filtered.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <LegendItem
                  icon={<Clock className="size-3.5" />}
                  label={t.home.legendPrep}
                />
                <LegendItem
                  icon={<CookingPot className="size-3.5" />}
                  label={t.home.legendCook}
                />
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div
              id="recipe-grid"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.slice(0, visible).map((recipe, i) => (
                <RecipeCard key={recipe.slug} recipe={recipe} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <p className="font-display text-2xl text-foreground">
                {t.home.emptyTitle}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.home.emptyDesc}
              </p>
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
                type="button"
                onClick={handleShowMore}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground pointer-coarse:min-h-11 pointer-coarse:px-6"
              >
                {t.home.showMore}
              </button>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const labelId = useId();
  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="flex flex-wrap items-center gap-2"
    >
      <span
        id={labelId}
        className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function ResetButton({
  onClick,
  label,
  className,
}: {
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground pointer-coarse:min-h-11 pointer-coarse:px-4",
        className,
      )}
    >
      <RefreshCw className="size-3.5" aria-hidden="true" />
      {label}
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
