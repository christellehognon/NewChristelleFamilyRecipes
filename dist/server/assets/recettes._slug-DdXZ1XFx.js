import { T as jsxRuntimeExports } from "./worker-entry-BOs2DPY9.js";
import { u as useI18n, R as Route, a as localizeRecipe, s as splitCookingTime, L as Link } from "./router-DLAsd42E.js";
import { S as SiteHeader, U as UtensilsCrossed, a as SiteFooter } from "./SiteFooter-BNnd57vw.js";
import { S as SeasonPastille, D as DifficultyPastille, P as PricePastille, C as Clock, a as CookingPot } from "./RecipePastilles-BqvpwtHJ.js";
import { A as ArrowLeft } from "./arrow-left-CZCxTBNX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function RecipePage() {
  const {
    t,
    lang
  } = useI18n();
  const {
    recipe
  } = Route.useLoaderData();
  const loc = localizeRecipe(recipe, lang);
  const {
    prep,
    cook
  } = splitCookingTime(loc.timeToCook);
  const steps = loc.description.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 pt-6 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        t.recipe.back
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-secondary shadow-[var(--shadow-card)]", children: recipe.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: recipe.image, alt: loc.name, className: "aspect-[16/10] w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-[16/10] w-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "size-20 opacity-40" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground", children: t.type[recipe.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl", children: loc.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SeasonPastille, { season: recipe.season }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyPastille, { difficulty: recipe.difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PricePastille, { price: recipe.averagePrice }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
              " ",
              prep
            ] }),
            cook && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CookingPot, { className: "size-3.5" }),
              cook
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: recipe.authorImg, alt: recipe.authorName ?? "Chef", className: "size-14 rounded-full object-cover ring-2 ring-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: t.recipe.sharedBy(recipe.authorName ?? t.recipe.family) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-base italic text-foreground", children: t.recipe.quote })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: t.recipe.ingredients }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5", children: loc.ingredients.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 rounded-xl bg-card px-4 py-2.5 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 inline-block size-2 shrink-0 rounded-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/85", children: ing })
            ] }, ing)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: t.recipe.preparation }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-4", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-semibold text-primary-foreground shadow-sm", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1.5 text-sm leading-relaxed text-foreground/85", children: step })
            ] }, i)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  RecipePage as component
};
