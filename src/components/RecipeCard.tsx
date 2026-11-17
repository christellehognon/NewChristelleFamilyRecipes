import { memo, useId } from "react";
import { Link } from "@tanstack/react-router";
import { CookingPot, Clock, UtensilsCrossed } from "lucide-react";
import {
  fallbackLang,
  localizeRecipe,
  type Recipe,
  splitCookingTime,
} from "@/data/recipes";
import { RecipeImage } from "./RecipeImage";
import {
  DifficultyPastille,
  PricePastille,
  SeasonPastille,
} from "./RecipePastilles";
import { useI18n } from "@/i18n/I18nProvider";

export const RecipeCard = memo(function RecipeCard({
  recipe,
  index = 0,
}: {
  recipe: Recipe;
  index?: number;
}) {
  const { t, lang } = useI18n();
  // Le nom accessible du lien est le seul titre ; saison, difficulté, prix et
  // durées passent en description, au lieu d'être lus d'un bloc dans le nom.
  const id = useId();
  const loc = localizeRecipe(recipe, lang);
  const { prep, cook } = splitCookingTime(loc.timeToCook);
  return (
    <Link
      to="/recettes/$slug"
      params={{ slug: recipe.slug }}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-author ${id}-type ${id}-tags ${id}-times`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{
        animationDelay: `${Math.min(index * 60, 400)}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {recipe.image ? (
          <RecipeImage
            src={recipe.image}
            alt=""
            priority={index < 3}
            sizes="(min-width: 1024px) 368px, (min-width: 640px) calc(50vw - 28px), calc(100vw - 32px)"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <UtensilsCrossed className="size-12 opacity-40" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
        <div
          id={`${id}-author`}
          className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/95 py-1 pl-1 pr-3 shadow-md"
        >
          <img
            src={recipe.authorImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-9 rounded-full object-cover ring-2 ring-card"
          />
          {recipe.authorName && (
            <span className="text-xs font-semibold text-foreground">
              {recipe.authorName}
            </span>
          )}
        </div>
        <span
          id={`${id}-type`}
          className="absolute top-3 right-3 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold text-primary-deep shadow-sm"
        >
          {t.type[recipe.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          id={`${id}-title`}
          className="font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary-deep"
        >
          <span lang={fallbackLang(recipe.name_en, lang)}>{loc.name}</span>
        </h3>

        <div id={`${id}-tags`} className="flex flex-wrap gap-1.5">
          <SeasonPastille season={recipe.season} />
          <DifficultyPastille difficulty={recipe.difficulty} />
          <PricePastille price={recipe.averagePrice} />
        </div>

        <div
          id={`${id}-times`}
          className="mt-auto flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Clock className="size-3.5" />
          <span>
            <span className="sr-only">{t.home.legendPrep} : </span>
            <span className="font-medium text-foreground/70">{prep}</span>
          </span>
          {cook && (
            <span className="inline-flex items-center gap-1.5">
              <CookingPot className="size-3.5" />
              <span>
                <span className="sr-only">{t.home.legendCook} : </span>
                <span className="font-medium text-foreground/70">{cook}</span>
              </span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});
