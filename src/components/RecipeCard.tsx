import { Link } from "@tanstack/react-router";
import { Clock, UtensilsCrossed } from "lucide-react";
import { localizeRecipe, type Recipe } from "@/data/recipes";
import { DifficultyPastille, PricePastille, SeasonPastille } from "./RecipePastilles";
import { useI18n } from "@/i18n/I18nProvider";

export function RecipeCard({ recipe, index = 0 }: { recipe: Recipe; index?: number }) {
  const { t, lang } = useI18n();
  const loc = localizeRecipe(recipe, lang);
  return (
    <Link
      to="/recettes/$slug"
      params={{ slug: recipe.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms`, animationFillMode: "backwards" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={loc.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <UtensilsCrossed className="size-12 opacity-40" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/95 py-1 pl-1 pr-3 shadow-md backdrop-blur">
          <img
            src={recipe.authorImg}
            alt={recipe.authorName ?? "Chef"}
            className="size-7 rounded-full object-cover ring-2 ring-card"
          />
          {recipe.authorName && (
            <span className="text-xs font-semibold text-foreground">{recipe.authorName}</span>
          )}
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-primary-deep shadow-sm backdrop-blur">
          {t.type[recipe.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary-deep">
          {loc.name}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          <SeasonPastille season={recipe.season} />
          <DifficultyPastille difficulty={recipe.difficulty} />
          <PricePastille price={recipe.averagePrice} />
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          <span>{loc.timeToCook}</span>
        </div>
      </div>
    </Link>
  );
}
