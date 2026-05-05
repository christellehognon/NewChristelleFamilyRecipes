import { T as jsxRuntimeExports } from "./worker-entry-BOs2DPY9.js";
import { u as useI18n, L as Link } from "./router-DLAsd42E.js";
import { S as SiteHeader, a as SiteFooter } from "./SiteFooter-BNnd57vw.js";
import { A as ArrowLeft } from "./arrow-left-CZCxTBNX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function NotFoundView() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: t.recipe.notFoundTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: t.recipe.notFoundDesc }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        " ",
        t.recipe.backHome
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  NotFoundView as notFoundComponent
};
