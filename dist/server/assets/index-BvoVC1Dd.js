import { T as jsxRuntimeExports, r as reactExports } from "./worker-entry-BOs2DPY9.js";
import { c as createLucideIcon, U as UtensilsCrossed, S as SiteHeader, X, a as SiteFooter, b as cn } from "./SiteFooter-BNnd57vw.js";
import { u as useI18n, a as localizeRecipe, s as splitCookingTime, L as Link, r as recipes, b as recipeTypes, d as seasons, e as difficulties, f as averagePrices } from "./router-DLAsd42E.js";
import { S as SeasonPastille, D as DifficultyPastille, P as PricePastille, C as Clock, a as CookingPot, L as Leaf, b as ChefHat, c as Coins } from "./RecipePastilles-BqvpwtHJ.js";
import { B as Button, I as Input } from "./button-J98dAnh2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
const __iconNode = [
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", key: "1ailkh" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2", key: "km57vx" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45", key: "os18l9" }]
];
const Shuffle = createLucideIcon("shuffle", __iconNode);
function RecipeCard({ recipe, index = 0 }) {
  const { t, lang } = useI18n();
  const loc = localizeRecipe(recipe, lang);
  const { prep, cook } = splitCookingTime(loc.timeToCook);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/recettes/$slug",
      params: { slug: recipe.slug },
      className: "group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] animate-in fade-in slide-in-from-bottom-4",
      style: { animationDelay: `${Math.min(index * 60, 400)}ms`, animationFillMode: "backwards" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-secondary", children: [
          recipe.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: recipe.image,
              alt: loc.name,
              loading: "lazy",
              className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "size-12 opacity-40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/95 py-1 pl-1 pr-3 shadow-md backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: recipe.authorImg,
                alt: recipe.authorName ?? "Chef",
                className: "size-9 rounded-full object-cover ring-2 ring-card"
              }
            ),
            recipe.authorName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: recipe.authorName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-primary-deep shadow-sm backdrop-blur", children: t.type[recipe.type] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary-deep", children: loc.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SeasonPastille, { season: recipe.season }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyPastille, { difficulty: recipe.difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PricePastille, { price: recipe.averagePrice })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: prep }) }),
            cook && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CookingPot, { className: "size-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: cook }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function HomePage() {
  const {
    t,
    lang
  } = useI18n();
  const [search, setSearch] = reactExports.useState("");
  const [season, setSeason] = reactExports.useState(null);
  const [difficulty, setDifficulty] = reactExports.useState(null);
  const [price, setPrice] = reactExports.useState(null);
  const [type, setType] = reactExports.useState(null);
  const [seed, setSeed] = reactExports.useState(0);
  const [displayed, setDisplayed] = reactExports.useState(recipes);
  reactExports.useEffect(() => {
    setDisplayed(shuffle(recipes));
  }, []);
  reactExports.useEffect(() => {
    setDisplayed(shuffle(recipes));
  }, [seed]);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return displayed.filter((r) => {
      if (season && r.season !== season) return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (price && r.averagePrice !== price) return false;
      if (type && r.type !== type) return false;
      if (q) {
        const loc = localizeRecipe(r, lang);
        const inName = loc.name.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
        const inIng = loc.ingredients.some((i) => i.toLowerCase().includes(q)) || r.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!inName && !inIng) return false;
      }
      return true;
    });
  }, [displayed, search, season, difficulty, price, type, lang]);
  const hasFilters = search || season || difficulty || price || type;
  const reset = () => {
    setSearch("");
    setSeason(null);
    setDifficulty(null);
    setPrice(null);
    setType(null);
  };
  const countLabel = filtered.length === 0 ? t.home.none : filtered.length === 1 ? t.home.countOne(1) : t.home.countMany(filtered.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60", style: {
        background: "var(--gradient-hero)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur", children: t.home.badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl", children: [
          t.home.titleA,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary-deep", children: t.home.titleB })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-base text-foreground/75 md:text-lg", children: t.home.lead }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setSeed((s) => s + 1), className: "rounded-full bg-primary text-primary-foreground hover:bg-primary-deep h-11 px-6 shadow-[var(--shadow-card)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "size-4" }),
          t.home.shuffle
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60 bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: t.home.searchPlaceholder, className: "h-12 rounded-full border-border bg-card pl-11 pr-12 text-base shadow-sm focus-visible:ring-primary" }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSearch(""), className: "absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary", "aria-label": t.home.clearSearch, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: t.home.filterType, children: recipeTypes.map((tp) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { active: type === tp, onClick: () => setType(type === tp ? null : tp), children: t.type[tp] }, tp)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: t.home.filterSeason, children: seasons.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { active: season === s, onClick: () => setSeason(season === s ? null : s), children: t.season[s] }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: t.home.filterDifficulty, children: difficulties.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { active: difficulty === d, onClick: () => setDifficulty(difficulty === d ? null : d), children: t.difficulty[d] }, d)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterGroup, { label: t.home.filterPrice, children: [
            averagePrices.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { active: price === p, onClick: () => setPrice(price === p ? null : p), children: t.price[p] }, p)),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
              t.home.reset
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-border/70 bg-card/60 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: t.home.legendTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "size-3.5" }), label: t.home.legendSeason }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-3.5" }), label: t.home.legendDifficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "size-3.5" }), label: t.home.legendPrice }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }), label: t.home.legendPrep }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CookingPot, { className: "size-3.5" }), label: t.home.legendCook })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-baseline justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold md:text-3xl", children: countLabel }) }),
        filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((recipe, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeCard, { recipe, index: i }, recipe.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground", children: t.home.emptyTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.home.emptyDesc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: reset, variant: "outline", className: "mt-5 rounded-full border-primary/40 text-primary-deep hover:bg-primary/10", children: t.home.emptyReset })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function FilterGroup({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
function Pill({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: cn("rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all", active ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground"), children });
}
function LegendItem({
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-deep", children: icon }),
    label
  ] });
}
export {
  HomePage as component
};
