import { T as jsxRuntimeExports } from "./worker-entry-BOs2DPY9.js";
import { c as createLucideIcon, S as SiteHeader, a as SiteFooter } from "./SiteFooter-BNnd57vw.js";
import { u as useI18n, c as chiefs, l as localizeChief } from "./router-DLAsd42E.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
function ChefAvatar({
  src,
  alt
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-32 overflow-hidden rounded-full bg-secondary ring-4 ring-primary/30", children: src ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt, className: "size-full object-cover", onError: (e) => {
    e.currentTarget.style.display = "none";
  } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-12" }) }) });
}
function ChefPage() {
  const {
    t,
    lang
  } = useI18n();
  const lead = chiefs[0];
  localizeChief(lead, lang);
  const others = chiefs.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60", style: {
        background: "var(--gradient-hero)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur", children: t.chef.badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl", children: [
          t.chef.hello,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary-deep", children: lead.name }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-lg text-foreground/75", children: t.chef.lead }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefAvatar, { src: lead.img, alt: lead.name }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-14 font-display text-2xl font-semibold md:text-3xl", children: t.chef.family }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: others.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-2xl bg-card p-5 text-center shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 overflow-hidden rounded-full bg-secondary ring-2 ring-primary/20", children: c.img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.name, className: "size-full object-cover", onError: (e) => {
            e.currentTarget.style.display = "none";
          } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-8" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-lg font-semibold", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: localizeChief(c, lang).description })
        ] }, c.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ChefPage as component
};
