import type { AveragePrice, Difficulty, Season } from "@/data/recipes";
import { ChefHat, Coins, Leaf } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const seasonBg: Record<Season, string> = {
  Printemps: "bg-season-spring",
  Été: "bg-season-summer",
  Automne: "bg-season-autumn",
  Hiver: "bg-season-winter",
  "Toutes saisons": "bg-season-all",
};

const difficultyBg: Record<Difficulty, string> = {
  Facile: "bg-difficulty-easy",
  Technique: "bg-difficulty-technical",
};

const priceBg: Record<AveragePrice, string> = {
  "€": "bg-cost-low",
  "€€": "bg-cost-mid",
  "€€€": "bg-cost-high",
};

const pastille =
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground/85 shadow-sm";

export function SeasonPastille({ season }: { season: Season }) {
  const { t } = useI18n();
  return (
    <span className={`${pastille} ${seasonBg[season]}`}>
      <Leaf className="size-3" />
      {t.season[season]}
    </span>
  );
}

export function DifficultyPastille({ difficulty }: { difficulty: Difficulty }) {
  const { t } = useI18n();
  return (
    <span className={`${pastille} ${difficultyBg[difficulty]}`}>
      <ChefHat className="size-3" />
      {t.difficulty[difficulty]}
    </span>
  );
}

export function PricePastille({ price }: { price: AveragePrice }) {
  const { t } = useI18n();
  return (
    <span className={`${pastille} ${priceBg[price]}`}>
      <Coins className="size-3" />
      {t.price[price]}
    </span>
  );
}
