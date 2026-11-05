import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CookingPot, Clock, UtensilsCrossed } from "lucide-react";
import { RecipeImage } from "@/components/RecipeImage";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  DifficultyPastille,
  PricePastille,
  SeasonPastille,
} from "@/components/RecipePastilles";
import {
  type Recipe,
  type RecipeDescription,
  localizeDescription,
  localizeRecipe,
  recipes,
  splitCookingTime,
} from "@/data/recipes";
import { isLandscapePhoto } from "@/data/image-orientation";
import { splitSteps } from "@/lib/steps";
import { useI18n } from "@/i18n/I18nProvider";
import { usePageMeta } from "@/i18n/usePageMeta";

export const Route = createFileRoute("/recettes/$slug")({
  loader: async ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    // Les textes de préparation sont chargés à la demande (fichier séparé),
    // pour ne pas alourdir le premier chargement du site.
    const { recipeDescriptions } = await import("@/data/recipe-descriptions");
    const text = recipeDescriptions[recipe.slug];
    if (!text) throw notFound();
    return { recipe, text };
  },
  notFoundComponent: NotFoundView,
  component: RecipePage,
});

function NotFoundView() {
  const { t } = useI18n();
  usePageMeta(`${t.recipe.notFoundTitle} — Christelle's Family Recipes`);
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main
        id="main"
        className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center"
      >
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
  // Annotation explicite : TypeScript perd le type du loader à cause de la
  // référence circulaire entre `Route` et `RecipePage`.
  const { recipe, text }: { recipe: Recipe; text: RecipeDescription } =
    Route.useLoaderData();
  const loc = localizeRecipe(recipe, lang);
  const description = localizeDescription(text, lang);
  usePageMeta(
    `${loc.name} — Christelle's Family Recipes`,
    description.slice(0, 155),
  );
  const { prep, cook } = splitCookingTime(loc.timeToCook);
  // Une étape par phrase (voir splitSteps pour les abréviations).
  const steps = splitSteps(description);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pt-6 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground pointer-coarse:min-h-11"
          >
            <ArrowLeft className="size-4" />
            {t.recipe.back}
          </Link>
        </div>

        <article className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
          {/* Photo à côté du titre : cadre 4:5 pour les portraits, 4:3 pour les
              paysages, afin de ne pas couper le plat. */}
          <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:items-center md:gap-10">
            <div
              className={`overflow-hidden rounded-3xl bg-secondary shadow-[var(--shadow-card)] ${
                isLandscapePhoto(recipe.image) ? "aspect-[4/3]" : "aspect-[4/5]"
              }`}
            >
              {recipe.image ? (
                <RecipeImage
                  src={recipe.image}
                  alt={loc.name}
                  priority
                  sizes="(min-width: 768px) 340px, calc(100vw - 32px)"
                  className="size-full object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center text-muted-foreground">
                  <UtensilsCrossed className="size-20 opacity-40" />
                </div>
              )}
            </div>

            <div>
              <header>
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {t.type[recipe.type]}
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
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div className="flex-1">
                  <p className="font-display text-xl font-semibold leading-snug text-foreground">
                    {t.recipe.sharedBy(recipe.authorName ?? t.recipe.family)}
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    {t.recipe.tagline}
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <section>
              <h2 className="font-display text-2xl font-semibold">
                {t.recipe.ingredients}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {loc.ingredients.map((ing, i) => (
                  <li
                    key={`${i}-${ing}`}
                    className="flex items-start gap-3 rounded-xl bg-card px-4 py-2.5 shadow-sm"
                  >
                    <span className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-base leading-snug text-foreground/85">
                      {ing}
                    </span>
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
                    <p className="pt-1 text-base leading-relaxed text-foreground/85 md:text-lg">
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
