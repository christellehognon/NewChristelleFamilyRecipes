import { c as createLucideIcon } from "./SiteFooter-BNnd57vw.js";
import { T as jsxRuntimeExports } from "./worker-entry-BOs2DPY9.js";
import { u as useI18n } from "./router-DLAsd42E.js";
const __iconNode$4 = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const ChefHat = createLucideIcon("chef-hat", __iconNode$4);
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M13.744 17.736a6 6 0 1 1-7.48-7.48", key: "bq4yh3" }],
  ["path", { d: "M15 6h1v4", key: "11y1tn" }],
  ["path", { d: "m6.134 14.768.866-.5 2 3.464", key: "17snzx" }],
  ["circle", { cx: "16", cy: "8", r: "6", key: "14bfc9" }]
];
const Coins = createLucideIcon("coins", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "u0tga0" }],
  ["path", { d: "m4 8 16-4", key: "16g0ng" }],
  [
    "path",
    {
      d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
      key: "12cejc"
    }
  ]
];
const CookingPot = createLucideIcon("cooking-pot", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode);
const seasonBg = {
  Printemps: "bg-season-spring",
  Été: "bg-season-summer",
  Automne: "bg-season-autumn",
  Hiver: "bg-season-winter",
  "Toutes saisons": "bg-season-all"
};
const difficultyBg = {
  Facile: "bg-difficulty-easy",
  Technique: "bg-difficulty-technical"
};
const priceBg = {
  "€": "bg-cost-low",
  "€€": "bg-cost-mid",
  "€€€": "bg-cost-high"
};
const pastille = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground/85 shadow-sm";
function SeasonPastille({ season }) {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${pastille} ${seasonBg[season]}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "size-3" }),
    t.season[season]
  ] });
}
function DifficultyPastille({ difficulty }) {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${pastille} ${difficultyBg[difficulty]}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "size-3" }),
    t.difficulty[difficulty]
  ] });
}
function PricePastille({ price }) {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${pastille} ${priceBg[price]}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "size-3" }),
    t.price[price]
  ] });
}
export {
  Clock as C,
  DifficultyPastille as D,
  Leaf as L,
  PricePastille as P,
  SeasonPastille as S,
  CookingPot as a,
  ChefHat as b,
  Coins as c
};
