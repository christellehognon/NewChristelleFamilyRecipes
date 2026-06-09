import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CookingPot, Clock, UtensilsCrossed } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  DifficultyPastille,
  PricePastille,
  SeasonPastille,
} from "@/components/RecipePastilles";
import { type Recipe, type RecipeType, localizeRecipe, recipes, splitCookingTime } from "@/data/recipes";
// translationsEn removed; translations are stored inline in Recipe via *_en fields
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/recettes/$slug")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    // Build enriched with inline English fields if present
    const enriched = {
      ...recipe,
      name_en: recipe.name_en ?? recipe.name,
      description_en: recipe.description_en ?? recipe.description,
      ingredients_en: recipe.ingredients_en ?? recipe.ingredients,
      timeToCook_en: recipe.timeToCook_en ?? recipe.timeToCook,
    };
    return { recipe: enriched };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Recette — Christelle's Family Recipes" }] };
    const { recipe } = loaderData;
    const desc = recipe.description.slice(0, 155);
    return {
      meta: [
        { title: `${recipe.name} — Christelle's Family Recipes` },
        { name: "description", content: desc },
        { property: "og:title", content: recipe.name },
        { property: "og:description", content: desc },
        ...(recipe.image
          ? [
              { property: "og:image", content: recipe.image },
              { name: "twitter:image", content: recipe.image },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: NotFoundView,
  component: RecipePage,
});

function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">
          {t.recipe.notFoundTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.recipe.notFoundDesc}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ArrowLeft className="size-4" /> {t.recipe.backHome}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function RecipePage() {
  const { t, lang } = useI18n();
  const { recipe } = Route.useLoaderData() as { recipe: Recipe };
  const loc = localizeRecipe(recipe, lang);
  const { prep, cook } = splitCookingTime(loc.timeToCook);
  const recipeType = recipe.type as RecipeType;
  // Split description into sentences for nicer step-like display
  const steps = loc.description
    .split(/(?<=[.!?])\s+/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pt-6 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t.recipe.back}
          </Link>
        </div>

        <article className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
          <div className="overflow-hidden rounded-3xl bg-secondary shadow-[var(--shadow-card)]">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={loc.name}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] w-full place-items-center text-muted-foreground">
                <UtensilsCrossed className="size-20 opacity-40" />
              </div>
            )}
          </div>

          <header className="mt-8">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {t.type[recipeType]}
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {loc.name}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <SeasonPastille season={recipe.season} />
              <DifficultyPastille difficulty={recipe.difficulty} />
              <PricePastille price={recipe.averagePrice} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Clock className="size-3.5" /> {prep}
              </span>
              {cook && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  <CookingPot className="size-3.5" />
                  {cook}
                </span>
              )}
            </div>
          </header>

          <section className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <img
              src={recipe.authorImg}
              alt={recipe.authorName ?? "Chef"}
              className="size-14 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.recipe.sharedBy(recipe.authorName ?? t.recipe.family)}
              </p>
              <p className="mt-1 font-display text-base italic text-foreground">
                {t.recipe.quote}
              </p>
            </div>
          </section>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <section>
              <h2 className="font-display text-2xl font-semibold">
                {t.recipe.ingredients}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {loc.ingredients.map((ing: string) => (
                  <li
                    key={ing}
                    className="flex items-start gap-3 rounded-xl bg-card px-4 py-2.5 shadow-sm"
                  >
                    <span className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-foreground/85">{ing}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">
                {t.recipe.preparation}
              </h2>
              <ol className="mt-4 space-y-4">
                {steps.map((step: string, i: number) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-semibold text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-foreground/85">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
