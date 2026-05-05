import { r as reactExports, f as functionalUpdate, a as arraysEqual, c as createLRUCache, i as isPromise, b as isRedirect, d as isNotFound, e as invariant, g as createControlledPromise, h as rootRouteId, j as isServer, k as compileDecodeCharMap, t as trimPath, l as rewriteBasepath, m as composeRewrites, p as processRouteTree, n as processRouteMasks, o as resolvePath, q as cleanPath, s as trimPathRight, u as parseHref, v as executeRewriteInput, w as isDangerousProtocol, x as redirect, y as findSingleMatch, z as deepEqual, D as DEFAULT_PROTOCOL_ALLOWLIST, A as interpolatePath, B as nullReplaceEqualDeep, C as replaceEqualDeep, E as last, F as decodePath, G as findFlatMatch, H as findRouteMatch, I as executeRewriteOutput, J as encodePathLikeUrl, K as trimPathLeft, L as joinPaths, M as useRouter, N as dummyMatchContext, O as matchContext, P as requireReactDom, Q as exactPathTest, R as removeTrailingSlash, S as React, T as jsxRuntimeExports, U as isModuleNotFoundError, V as useHydrated, W as escapeHtml, X as getAssetCrossOrigin, Y as resolveManifestAssetLink, Z as Outlet, _ as notFound } from "./worker-entry-BOs2DPY9.js";
var reactUse = reactExports.use;
function useForwardedRef(ref) {
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}
function encode(obj, stringify = String) {
  const result = new URLSearchParams();
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) result.set(key, stringify(val));
  }
  return result.toString();
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") try {
        query[key] = parser(value);
      } catch (_err) {
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const hasParser = typeof parser === "function";
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) try {
      return stringify(val);
    } catch (_err) {
    }
    else if (hasParser && typeof val === "string") try {
      parser(val);
      return stringify(val);
    } catch (_err) {
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialState, config) {
  const { createMutableStore, createReadonlyStore, batch, init } = config;
  const matchStores = /* @__PURE__ */ new Map();
  const pendingMatchStores = /* @__PURE__ */ new Map();
  const cachedMatchStores = /* @__PURE__ */ new Map();
  const status = createMutableStore(initialState.status);
  const loadedAt = createMutableStore(initialState.loadedAt);
  const isLoading = createMutableStore(initialState.isLoading);
  const isTransitioning = createMutableStore(initialState.isTransitioning);
  const location = createMutableStore(initialState.location);
  const resolvedLocation = createMutableStore(initialState.resolvedLocation);
  const statusCode = createMutableStore(initialState.statusCode);
  const redirect2 = createMutableStore(initialState.redirect);
  const matchesId = createMutableStore([]);
  const pendingIds = createMutableStore([]);
  const cachedIds = createMutableStore([]);
  const matches = createReadonlyStore(() => readPoolMatches(matchStores, matchesId.get()));
  const pendingMatches = createReadonlyStore(() => readPoolMatches(pendingMatchStores, pendingIds.get()));
  const cachedMatches = createReadonlyStore(() => readPoolMatches(cachedMatchStores, cachedIds.get()));
  const firstId = createReadonlyStore(() => matchesId.get()[0]);
  const hasPending = createReadonlyStore(() => matchesId.get().some((matchId) => {
    return matchStores.get(matchId)?.get().status === "pending";
  }));
  const matchRouteDeps = createReadonlyStore(() => ({
    locationHref: location.get().href,
    resolvedLocationHref: resolvedLocation.get()?.href,
    status: status.get()
  }));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    loadedAt: loadedAt.get(),
    isLoading: isLoading.get(),
    isTransitioning: isTransitioning.get(),
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get(),
    statusCode: statusCode.get(),
    redirect: redirect2.get()
  }));
  const matchStoreByRouteIdCache = createLRUCache(64);
  function getRouteMatchStore(routeId) {
    let cached = matchStoreByRouteIdCache.get(routeId);
    if (!cached) {
      cached = createReadonlyStore(() => {
        const ids = matchesId.get();
        for (const id of ids) {
          const matchStore = matchStores.get(id);
          if (matchStore && matchStore.routeId === routeId) return matchStore.get();
        }
      });
      matchStoreByRouteIdCache.set(routeId, cached);
    }
    return cached;
  }
  const store = {
    status,
    loadedAt,
    isLoading,
    isTransitioning,
    location,
    resolvedLocation,
    statusCode,
    redirect: redirect2,
    matchesId,
    pendingIds,
    cachedIds,
    matches,
    pendingMatches,
    cachedMatches,
    firstId,
    hasPending,
    matchRouteDeps,
    matchStores,
    pendingMatchStores,
    cachedMatchStores,
    __store,
    getRouteMatchStore,
    setMatches,
    setPending,
    setCached
  };
  setMatches(initialState.matches);
  init?.(store);
  function setMatches(nextMatches) {
    reconcileMatchPool(nextMatches, matchStores, matchesId, createMutableStore, batch);
  }
  function setPending(nextMatches) {
    reconcileMatchPool(nextMatches, pendingMatchStores, pendingIds, createMutableStore, batch);
  }
  function setCached(nextMatches) {
    reconcileMatchPool(nextMatches, cachedMatchStores, cachedIds, createMutableStore, batch);
  }
  return store;
}
function readPoolMatches(pool, ids) {
  const matches = [];
  for (const id of ids) {
    const matchStore = pool.get(id);
    if (matchStore) matches.push(matchStore.get());
  }
  return matches;
}
function reconcileMatchPool(nextMatches, pool, idStore, createMutableStore, batch) {
  const nextIds = nextMatches.map((d) => d.id);
  const nextIdSet = new Set(nextIds);
  batch(() => {
    for (const id of pool.keys()) if (!nextIdSet.has(id)) pool.delete(id);
    for (const nextMatch of nextMatches) {
      const existing = pool.get(nextMatch.id);
      if (!existing) {
        const matchStore = createMutableStore(nextMatch);
        matchStore.routeId = nextMatch.routeId;
        pool.set(nextMatch.id, matchStore);
        continue;
      }
      existing.routeId = nextMatch.routeId;
      if (existing.get() !== nextMatch) existing.set(nextMatch);
    }
    if (!arraysEqual(idStore.get(), nextIds)) idStore.set(nextIds);
  });
}
var triggerOnReady = (inner) => {
  if (!inner.rendered) {
    inner.rendered = true;
    return inner.onReady?.();
  }
};
var resolvePreload = (inner, matchId) => {
  return !!(inner.preload && !inner.router.stores.matchStores.has(matchId));
};
var buildMatchContext = (inner, index, includeCurrentMatch = true) => {
  const context = { ...inner.router.options.context ?? {} };
  const end = includeCurrentMatch ? index : index - 1;
  for (let i = 0; i <= end; i++) {
    const innerMatch = inner.matches[i];
    if (!innerMatch) continue;
    const m = inner.router.getMatch(innerMatch.id);
    if (!m) continue;
    Object.assign(context, m.__routeContext, m.__beforeLoadContext);
  }
  return context;
};
var getNotFoundBoundaryIndex = (inner, err) => {
  if (!inner.matches.length) return;
  const requestedRouteId = err.routeId;
  const matchedRootIndex = inner.matches.findIndex((m) => m.routeId === inner.router.routeTree.id);
  const rootIndex = matchedRootIndex >= 0 ? matchedRootIndex : 0;
  let startIndex = requestedRouteId ? inner.matches.findIndex((match) => match.routeId === requestedRouteId) : inner.firstBadMatchIndex ?? inner.matches.length - 1;
  if (startIndex < 0) startIndex = rootIndex;
  for (let i = startIndex; i >= 0; i--) {
    const match = inner.matches[i];
    if (inner.router.looseRoutesById[match.routeId].options.notFoundComponent) return i;
  }
  return requestedRouteId ? startIndex : rootIndex;
};
var handleRedirectAndNotFound = (inner, match, err) => {
  if (!isRedirect(err) && !isNotFound(err)) return;
  if (isRedirect(err) && err.redirectHandled && !err.options.reloadDocument) throw err;
  if (match) {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    match._nonReactive.loaderPromise = void 0;
    match._nonReactive.error = err;
    inner.updateMatch(match.id, (prev) => ({
      ...prev,
      status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : prev.status === "pending" ? "success" : prev.status,
      context: buildMatchContext(inner, match.index),
      isFetching: false,
      error: err
    }));
    if (isNotFound(err) && !err.routeId) err.routeId = match.routeId;
    match._nonReactive.loadPromise?.resolve();
  }
  if (isRedirect(err)) {
    inner.rendered = true;
    err.options._fromLocation = inner.location;
    err.redirectHandled = true;
    err = inner.router.resolveRedirect(err);
  }
  throw err;
};
var shouldSkipLoader = (inner, matchId) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return true;
  if (match.ssr === false) return true;
  return false;
};
var syncMatchContext = (inner, matchId, index) => {
  const nextContext = buildMatchContext(inner, index);
  inner.updateMatch(matchId, (prev) => {
    return {
      ...prev,
      context: nextContext
    };
  });
};
var handleSerialError = (inner, index, err, routerCode) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  if (err instanceof Promise) throw err;
  err.routerCode = routerCode;
  inner.firstBadMatchIndex ??= index;
  handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  try {
    route.options.onError?.(err);
  } catch (errorHandlerErr) {
    err = errorHandlerErr;
    handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  }
  inner.updateMatch(matchId, (prev) => {
    prev._nonReactive.beforeLoadPromise?.resolve();
    prev._nonReactive.beforeLoadPromise = void 0;
    prev._nonReactive.loadPromise?.resolve();
    return {
      ...prev,
      error: err,
      status: "error",
      isFetching: false,
      updatedAt: Date.now(),
      abortController: new AbortController()
    };
  });
  if (!inner.preload && !isRedirect(err) && !isNotFound(err)) inner.serialError ??= err;
};
var isBeforeLoadSsr = (inner, matchId, index, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  const parentMatchId = inner.matches[index - 1]?.id;
  const parentMatch = parentMatchId ? inner.router.getMatch(parentMatchId) : void 0;
  if (inner.router.isShell()) {
    existingMatch.ssr = route.id === rootRouteId;
    return;
  }
  if (parentMatch?.ssr === false) {
    existingMatch.ssr = false;
    return;
  }
  const parentOverride = (tempSsr2) => {
    if (tempSsr2 === true && parentMatch?.ssr === "data-only") return "data-only";
    return tempSsr2;
  };
  const defaultSsr = inner.router.options.defaultSsr ?? true;
  if (route.options.ssr === void 0) {
    existingMatch.ssr = parentOverride(defaultSsr);
    return;
  }
  if (typeof route.options.ssr !== "function") {
    existingMatch.ssr = parentOverride(route.options.ssr);
    return;
  }
  const { search, params } = existingMatch;
  const ssrFnContext = {
    search: makeMaybe(search, existingMatch.searchError),
    params: makeMaybe(params, existingMatch.paramsError),
    location: inner.location,
    matches: inner.matches.map((match) => ({
      index: match.index,
      pathname: match.pathname,
      fullPath: match.fullPath,
      staticData: match.staticData,
      id: match.id,
      routeId: match.routeId,
      search: makeMaybe(match.search, match.searchError),
      params: makeMaybe(match.params, match.paramsError),
      ssr: match.ssr
    }))
  };
  const tempSsr = route.options.ssr(ssrFnContext);
  if (isPromise(tempSsr)) return tempSsr.then((ssr) => {
    existingMatch.ssr = parentOverride(ssr ?? defaultSsr);
  });
  existingMatch.ssr = parentOverride(tempSsr ?? defaultSsr);
};
var setupPendingTimeout = (inner, matchId, route, match) => {
  if (match._nonReactive.pendingTimeout !== void 0) return;
  const pendingMs = route.options.pendingMs ?? inner.router.options.defaultPendingMs;
  if (!!(inner.onReady && false)) {
    const pendingTimeout = setTimeout(() => {
      triggerOnReady(inner);
    }, pendingMs);
    match._nonReactive.pendingTimeout = pendingTimeout;
  }
};
var preBeforeLoadSetup = (inner, matchId, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  if (!existingMatch._nonReactive.beforeLoadPromise && !existingMatch._nonReactive.loaderPromise) return;
  setupPendingTimeout(inner, matchId, route, existingMatch);
  const then = () => {
    const match = inner.router.getMatch(matchId);
    if (match.preload && (match.status === "redirected" || match.status === "notFound")) handleRedirectAndNotFound(inner, match, match.error);
  };
  return existingMatch._nonReactive.beforeLoadPromise ? existingMatch._nonReactive.beforeLoadPromise.then(then) : then();
};
var executeBeforeLoad = (inner, matchId, index, route) => {
  const match = inner.router.getMatch(matchId);
  let prevLoadPromise = match._nonReactive.loadPromise;
  match._nonReactive.loadPromise = createControlledPromise(() => {
    prevLoadPromise?.resolve();
    prevLoadPromise = void 0;
  });
  const { paramsError, searchError } = match;
  if (paramsError) handleSerialError(inner, index, paramsError, "PARSE_PARAMS");
  if (searchError) handleSerialError(inner, index, searchError, "VALIDATE_SEARCH");
  setupPendingTimeout(inner, matchId, route, match);
  const abortController = new AbortController();
  let isPending = false;
  const pending = () => {
    if (isPending) return;
    isPending = true;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: "beforeLoad",
      fetchCount: prev.fetchCount + 1,
      abortController
    }));
  };
  const resolve = () => {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: false
    }));
  };
  if (!route.options.beforeLoad) {
    inner.router.batch(() => {
      pending();
      resolve();
    });
    return;
  }
  match._nonReactive.beforeLoadPromise = createControlledPromise();
  const context = {
    ...buildMatchContext(inner, index, false),
    ...match.__routeContext
  };
  const { search, params, cause } = match;
  const preload = resolvePreload(inner, matchId);
  const beforeLoadFnContext = {
    search,
    abortController,
    params,
    preload,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    buildLocation: inner.router.buildLocation,
    cause: preload ? "preload" : cause,
    matches: inner.matches,
    routeId: route.id,
    ...inner.router.options.additionalContext
  };
  const updateContext = (beforeLoadContext2) => {
    if (beforeLoadContext2 === void 0) {
      inner.router.batch(() => {
        pending();
        resolve();
      });
      return;
    }
    if (isRedirect(beforeLoadContext2) || isNotFound(beforeLoadContext2)) {
      pending();
      handleSerialError(inner, index, beforeLoadContext2, "BEFORE_LOAD");
    }
    inner.router.batch(() => {
      pending();
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        __beforeLoadContext: beforeLoadContext2
      }));
      resolve();
    });
  };
  let beforeLoadContext;
  try {
    beforeLoadContext = route.options.beforeLoad(beforeLoadFnContext);
    if (isPromise(beforeLoadContext)) {
      pending();
      return beforeLoadContext.catch((err) => {
        handleSerialError(inner, index, err, "BEFORE_LOAD");
      }).then(updateContext);
    }
  } catch (err) {
    pending();
    handleSerialError(inner, index, err, "BEFORE_LOAD");
  }
  updateContext(beforeLoadContext);
};
var handleBeforeLoad = (inner, index) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  const serverSsr = () => {
    {
      const maybePromise = isBeforeLoadSsr(inner, matchId, index, route);
      if (isPromise(maybePromise)) return maybePromise.then(queueExecution);
    }
    return queueExecution();
  };
  const execute = () => executeBeforeLoad(inner, matchId, index, route);
  const queueExecution = () => {
    if (shouldSkipLoader(inner, matchId)) return;
    const result = preBeforeLoadSetup(inner, matchId, route);
    return isPromise(result) ? result.then(execute) : execute();
  };
  return serverSsr();
};
var executeHead = (inner, matchId, route) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return;
  if (!route.options.head && !route.options.scripts && !route.options.headers) return;
  const assetContext = {
    ssr: inner.router.options.ssr,
    matches: inner.matches,
    match,
    params: match.params,
    loaderData: match.loaderData
  };
  return Promise.all([
    route.options.head?.(assetContext),
    route.options.scripts?.(assetContext),
    route.options.headers?.(assetContext)
  ]).then(([headFnContent, scripts, headers]) => {
    return {
      meta: headFnContent?.meta,
      links: headFnContent?.links,
      headScripts: headFnContent?.scripts,
      headers,
      scripts,
      styles: headFnContent?.styles
    };
  });
};
var getLoaderContext = (inner, matchPromises, matchId, index, route) => {
  const parentMatchPromise = matchPromises[index - 1];
  const { params, loaderDeps, abortController, cause } = inner.router.getMatch(matchId);
  const context = buildMatchContext(inner, index);
  const preload = resolvePreload(inner, matchId);
  return {
    params,
    deps: loaderDeps,
    preload: !!preload,
    parentMatchPromise,
    abortController,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    cause: preload ? "preload" : cause,
    route,
    ...inner.router.options.additionalContext
  };
};
var runLoader = async (inner, matchPromises, matchId, index, route) => {
  try {
    const match = inner.router.getMatch(matchId);
    try {
      if (!(isServer ?? inner.router.isServer) || match.ssr === true) loadRouteChunk(route);
      const routeLoader = route.options.loader;
      const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
      const loaderResult = loader?.(getLoaderContext(inner, matchPromises, matchId, index, route));
      const loaderResultIsPromise = !!loader && isPromise(loaderResult);
      if (!!(loaderResultIsPromise || route._lazyPromise || route._componentsPromise || route.options.head || route.options.scripts || route.options.headers || match._nonReactive.minPendingPromise)) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        isFetching: "loader"
      }));
      if (loader) {
        const loaderData = loaderResultIsPromise ? await loaderResult : loaderResult;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), loaderData);
        if (loaderData !== void 0) inner.updateMatch(matchId, (prev) => ({
          ...prev,
          loaderData
        }));
      }
      if (route._lazyPromise) await route._lazyPromise;
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (route._componentsPromise) await route._componentsPromise;
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error: void 0,
        context: buildMatchContext(inner, index),
        status: "success",
        isFetching: false,
        updatedAt: Date.now()
      }));
    } catch (e) {
      let error = e;
      if (error?.name === "AbortError") {
        if (match.abortController.signal.aborted) {
          match._nonReactive.loaderPromise?.resolve();
          match._nonReactive.loaderPromise = void 0;
          return;
        }
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          status: prev.status === "pending" ? "success" : prev.status,
          isFetching: false,
          context: buildMatchContext(inner, index)
        }));
        return;
      }
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (isNotFound(e)) await route.options.notFoundComponent?.preload?.();
      handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), e);
      try {
        route.options.onError?.(e);
      } catch (onErrorError) {
        error = onErrorError;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), onErrorError);
      }
      if (!isRedirect(error) && !isNotFound(error)) await loadRouteChunk(route, ["errorComponent"]);
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error,
        context: buildMatchContext(inner, index),
        status: "error",
        isFetching: false
      }));
    }
  } catch (err) {
    const match = inner.router.getMatch(matchId);
    if (match) match._nonReactive.loaderPromise = void 0;
    handleRedirectAndNotFound(inner, match, err);
  }
};
var loadRouteMatch = async (inner, matchPromises, index) => {
  async function handleLoader(preload, prevMatch, previousRouteMatchId, match2, route2) {
    const age = Date.now() - prevMatch.updatedAt;
    const staleAge = preload ? route2.options.preloadStaleTime ?? inner.router.options.defaultPreloadStaleTime ?? 3e4 : route2.options.staleTime ?? inner.router.options.defaultStaleTime ?? 0;
    const shouldReloadOption = route2.options.shouldReload;
    const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext(inner, matchPromises, matchId, index, route2)) : shouldReloadOption;
    const { status, invalid } = match2;
    const staleMatchShouldReload = age >= staleAge && (!!inner.forceStaleReload || match2.cause === "enter" || previousRouteMatchId !== void 0 && previousRouteMatchId !== match2.id);
    loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? staleMatchShouldReload));
    if (preload && route2.options.preload === false) ;
    else if (loaderShouldRunAsync && !inner.sync && shouldReloadInBackground) {
      loaderIsRunningAsync = true;
      (async () => {
        try {
          await runLoader(inner, matchPromises, matchId, index, route2);
          const match3 = inner.router.getMatch(matchId);
          match3._nonReactive.loaderPromise?.resolve();
          match3._nonReactive.loadPromise?.resolve();
          match3._nonReactive.loaderPromise = void 0;
          match3._nonReactive.loadPromise = void 0;
        } catch (err) {
          if (isRedirect(err)) await inner.router.navigate(err.options);
        }
      })();
    } else if (status !== "success" || loaderShouldRunAsync) await runLoader(inner, matchPromises, matchId, index, route2);
    else syncMatchContext(inner, matchId, index);
  }
  const { id: matchId, routeId } = inner.matches[index];
  let loaderShouldRunAsync = false;
  let loaderIsRunningAsync = false;
  const route = inner.router.looseRoutesById[routeId];
  const routeLoader = route.options.loader;
  const shouldReloadInBackground = ((typeof routeLoader === "function" ? void 0 : routeLoader?.staleReloadMode) ?? inner.router.options.defaultStaleReloadMode) !== "blocking";
  if (shouldSkipLoader(inner, matchId)) {
    if (!inner.router.getMatch(matchId)) return inner.matches[index];
    syncMatchContext(inner, matchId, index);
    return inner.router.getMatch(matchId);
  } else {
    const prevMatch = inner.router.getMatch(matchId);
    const activeIdAtIndex = inner.router.stores.matchesId.get()[index];
    const previousRouteMatchId = (activeIdAtIndex && inner.router.stores.matchStores.get(activeIdAtIndex) || null)?.routeId === routeId ? activeIdAtIndex : inner.router.stores.matches.get().find((d) => d.routeId === routeId)?.id;
    const preload = resolvePreload(inner, matchId);
    if (prevMatch._nonReactive.loaderPromise) {
      if (prevMatch.status === "success" && !inner.sync && !prevMatch.preload && shouldReloadInBackground) return prevMatch;
      await prevMatch._nonReactive.loaderPromise;
      const match2 = inner.router.getMatch(matchId);
      const error = match2._nonReactive.error || match2.error;
      if (error) handleRedirectAndNotFound(inner, match2, error);
      if (match2.status === "pending") await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    } else {
      const nextPreload = preload && !inner.router.stores.matchStores.has(matchId);
      const match2 = inner.router.getMatch(matchId);
      match2._nonReactive.loaderPromise = createControlledPromise();
      if (nextPreload !== match2.preload) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        preload: nextPreload
      }));
      await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    }
  }
  const match = inner.router.getMatch(matchId);
  if (!loaderIsRunningAsync) {
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.loadPromise?.resolve();
    match._nonReactive.loadPromise = void 0;
  }
  clearTimeout(match._nonReactive.pendingTimeout);
  match._nonReactive.pendingTimeout = void 0;
  if (!loaderIsRunningAsync) match._nonReactive.loaderPromise = void 0;
  match._nonReactive.dehydrated = void 0;
  const nextIsFetching = loaderIsRunningAsync ? match.isFetching : false;
  if (nextIsFetching !== match.isFetching || match.invalid !== false) {
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: nextIsFetching,
      invalid: false
    }));
    return inner.router.getMatch(matchId);
  } else return match;
};
async function loadMatches(arg) {
  const inner = arg;
  const matchPromises = [];
  let beforeLoadNotFound;
  for (let i = 0; i < inner.matches.length; i++) {
    try {
      const beforeLoad = handleBeforeLoad(inner, i);
      if (isPromise(beforeLoad)) await beforeLoad;
    } catch (err) {
      if (isRedirect(err)) throw err;
      if (isNotFound(err)) beforeLoadNotFound = err;
      else if (!inner.preload) throw err;
      break;
    }
    if (inner.serialError || inner.firstBadMatchIndex != null) break;
  }
  const baseMaxIndexExclusive = inner.firstBadMatchIndex ?? inner.matches.length;
  const boundaryIndex = beforeLoadNotFound && !inner.preload ? getNotFoundBoundaryIndex(inner, beforeLoadNotFound) : void 0;
  const maxIndexExclusive = beforeLoadNotFound && inner.preload ? 0 : boundaryIndex !== void 0 ? Math.min(boundaryIndex + 1, baseMaxIndexExclusive) : baseMaxIndexExclusive;
  let firstNotFound;
  let firstUnhandledRejection;
  for (let i = 0; i < maxIndexExclusive; i++) matchPromises.push(loadRouteMatch(inner, matchPromises, i));
  try {
    await Promise.all(matchPromises);
  } catch {
    const settled = await Promise.allSettled(matchPromises);
    for (const result of settled) {
      if (result.status !== "rejected") continue;
      const reason = result.reason;
      if (isRedirect(reason)) throw reason;
      if (isNotFound(reason)) firstNotFound ??= reason;
      else firstUnhandledRejection ??= reason;
    }
    if (firstUnhandledRejection !== void 0) throw firstUnhandledRejection;
  }
  const notFoundToThrow = firstNotFound ?? (beforeLoadNotFound && !inner.preload ? beforeLoadNotFound : void 0);
  let headMaxIndex = inner.firstBadMatchIndex !== void 0 ? inner.firstBadMatchIndex : inner.matches.length - 1;
  if (!notFoundToThrow && beforeLoadNotFound && inner.preload) return inner.matches;
  if (notFoundToThrow) {
    const renderedBoundaryIndex = getNotFoundBoundaryIndex(inner, notFoundToThrow);
    if (renderedBoundaryIndex === void 0) {
      invariant();
    }
    const boundaryMatch = inner.matches[renderedBoundaryIndex];
    const boundaryRoute = inner.router.looseRoutesById[boundaryMatch.routeId];
    const defaultNotFoundComponent = inner.router.options?.defaultNotFoundComponent;
    if (!boundaryRoute.options.notFoundComponent && defaultNotFoundComponent) boundaryRoute.options.notFoundComponent = defaultNotFoundComponent;
    notFoundToThrow.routeId = boundaryMatch.routeId;
    const boundaryIsRoot = boundaryMatch.routeId === inner.router.routeTree.id;
    inner.updateMatch(boundaryMatch.id, (prev) => ({
      ...prev,
      ...boundaryIsRoot ? {
        status: "success",
        globalNotFound: true,
        error: void 0
      } : {
        status: "notFound",
        error: notFoundToThrow
      },
      isFetching: false
    }));
    headMaxIndex = renderedBoundaryIndex;
    await loadRouteChunk(boundaryRoute, ["notFoundComponent"]);
  } else if (!inner.preload) {
    const rootMatch = inner.matches[0];
    if (!rootMatch.globalNotFound) {
      if (inner.router.getMatch(rootMatch.id)?.globalNotFound) inner.updateMatch(rootMatch.id, (prev) => ({
        ...prev,
        globalNotFound: false,
        error: void 0
      }));
    }
  }
  if (inner.serialError && inner.firstBadMatchIndex !== void 0) {
    const errorRoute = inner.router.looseRoutesById[inner.matches[inner.firstBadMatchIndex].routeId];
    await loadRouteChunk(errorRoute, ["errorComponent"]);
  }
  for (let i = 0; i <= headMaxIndex; i++) {
    const { id: matchId, routeId } = inner.matches[i];
    const route = inner.router.looseRoutesById[routeId];
    try {
      const headResult = executeHead(inner, matchId, route);
      if (headResult) {
        const head = await headResult;
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          ...head
        }));
      }
    } catch (err) {
      console.error(`Error executing head for route ${routeId}:`, err);
    }
  }
  const readyPromise = triggerOnReady(inner);
  if (isPromise(readyPromise)) await readyPromise;
  if (notFoundToThrow) throw notFoundToThrow;
  if (inner.serialError && !inner.preload && !inner.onReady) throw inner.serialError;
  return inner.matches;
}
function preloadRouteComponents(route, componentTypesToLoad) {
  const preloads = componentTypesToLoad.map((type) => route.options[type]?.preload?.()).filter(Boolean);
  if (preloads.length === 0) return void 0;
  return Promise.all(preloads);
}
function loadRouteChunk(route, componentTypesToLoad = componentTypes) {
  if (!route._lazyLoaded && route._lazyPromise === void 0) if (route.lazyFn) route._lazyPromise = route.lazyFn().then((lazyRoute) => {
    const { id: _id, ...options } = lazyRoute.options;
    Object.assign(route.options, options);
    route._lazyLoaded = true;
    route._lazyPromise = void 0;
  });
  else route._lazyLoaded = true;
  const runAfterLazy = () => route._componentsLoaded ? void 0 : componentTypesToLoad === componentTypes ? (() => {
    if (route._componentsPromise === void 0) {
      const componentsPromise = preloadRouteComponents(route, componentTypes);
      if (componentsPromise) route._componentsPromise = componentsPromise.then(() => {
        route._componentsLoaded = true;
        route._componentsPromise = void 0;
      });
      else route._componentsLoaded = true;
    }
    return route._componentsPromise;
  })() : preloadRouteComponents(route, componentTypesToLoad);
  return route._lazyPromise ? route._lazyPromise.then(runAfterLazy) : runAfterLazy();
}
function makeMaybe(value, error) {
  if (error) return {
    status: "error",
    error
  };
  return {
    status: "success",
    value
  };
}
function routeNeedsPreload(route) {
  for (const componentType of componentTypes) if (route.options[componentType]?.preload) return true;
  return false;
}
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function getLocationChangeInfo(location, resolvedLocation) {
  const fromLocation = resolvedLocation;
  const toLocation = location;
  return {
    fromLocation,
    toLocation,
    pathChanged: fromLocation?.pathname !== toLocation.pathname,
    hrefChanged: fromLocation?.href !== toLocation.href,
    hashChanged: fromLocation?.hash !== toLocation.hash
  };
}
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startTransition = (fn) => fn();
    this.update = (newOptions) => {
      const prevOptions = this.options;
      const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
      const basepathWasUnset = this.basepath === void 0;
      const prevRewriteOption = prevOptions?.rewrite;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) ;
      else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) this.origin = "http://localhost";
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if (globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
          const cached = globalThis.__TSR_CACHE__;
          this.resolvePathCache = cached.resolvePathCache;
          processRouteTreeResult = cached.processRouteTreeResult;
        } else {
          this.resolvePathCache = createLRUCache(1e3);
          processRouteTreeResult = this.buildRouteTree();
          if (globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            processRouteTreeResult,
            resolvePathCache: this.resolvePathCache
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores && this.latestLocation) {
        const config = this.getStoreConfig(this);
        this.batch = config.batch;
        this.stores = createRouterStores(getInitialRouterState(this.latestLocation), config);
      }
      let needsLocationUpdate = false;
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
        this.basepath = nextBasepath;
        const rewrites = [];
        const trimmed = trimPath(nextBasepath);
        if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
        if (nextRewriteOption) rewrites.push(nextRewriteOption);
        this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
        if (this.history) this.updateLatestLocation();
        needsLocationUpdate = true;
      }
      if (needsLocationUpdate && this.stores) this.stores.location.set(this.latestLocation);
      if (typeof window !== "undefined" && "CSS" in window && typeof window.CSS?.supports === "function") this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a)");
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i) => {
        route.init({ originalIndex: i });
      });
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return result;
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) listener.fn(routerEvent);
      });
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href, state }) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname).path,
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)).path,
            state: replaceEqualDeep(previousLocation?.state, state)
          };
        }
        const fullUrl = new URL(href, this.origin);
        const url = executeRewriteInput(this.rewrite, fullUrl);
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(url.pathname).path,
          external: !!this.rewrite && url.origin !== this.origin,
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)).path,
          state: replaceEqualDeep(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      return resolvePath({
        base: from,
        to: cleanPath(path),
        trailingSlash: this.options.trailingSlash,
        cache: this.resolvePathCache
      });
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      return getMatchedRoutes({
        pathname,
        routesById: this.routesById,
        processedTree: this.processedTree
      });
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match._nonReactive.pendingTimeout);
      match._nonReactive.pendingTimeout = void 0;
    };
    this.cancelMatches = () => {
      this.stores.pendingIds.get().forEach((matchId) => {
        this.cancelMatch(matchId);
      });
      this.stores.matchesId.get().forEach((matchId) => {
        if (this.stores.pendingMatchStores.has(matchId)) return;
        const match = this.stores.matchStores.get(matchId)?.get();
        if (!match) return;
        if (match.status === "pending" || match.isFetching === "loader") this.cancelMatch(matchId);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        const currentLocation = dest._fromLocation || this.pendingBuiltLocation || this.latestLocation;
        const lightweightResult = this.matchRoutesLightweight(currentLocation);
        if (dest.from && false) ;
        const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult.fullPath;
        const fromPath = this.resolvePathWithBase(defaultedFromPath, ".");
        const fromSearch = lightweightResult.search;
        const fromParams = Object.assign(/* @__PURE__ */ Object.create(null), lightweightResult.params);
        const nextTo = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(fromPath, ".");
        const nextParams = dest.params === false || dest.params === null ? /* @__PURE__ */ Object.create(null) : (dest.params ?? true) === true ? fromParams : Object.assign(fromParams, functionalUpdate(dest.params, fromParams));
        const destMatchResult = this.getMatchedRoutes(nextTo);
        let destRoutes = destMatchResult.matchedRoutes;
        if ((!destMatchResult.foundRoute || destMatchResult.foundRoute.path !== "/" && destMatchResult.routeParams["**"]) && this.options.notFoundRoute) destRoutes = [...destRoutes, this.options.notFoundRoute];
        if (Object.keys(nextParams).length > 0) for (const route of destRoutes) {
          const fn = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn) try {
            Object.assign(nextParams, fn(nextParams));
          } catch {
          }
        }
        const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
          path: nextTo,
          params: nextParams,
          decoder: this.pathParamsDecoder,
          server: this.isServer
        }).interpolatedPath).path;
        let nextSearch = fromSearch;
        if (opts._includeValidateSearch && this.options.search?.strict) {
          const validatedSearch = {};
          destRoutes.forEach((route) => {
            if (route.options.validateSearch) try {
              Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                ...validatedSearch,
                ...nextSearch
              }));
            } catch {
            }
          });
          nextSearch = validatedSearch;
        }
        nextSearch = applySearchMiddleware({
          search: nextSearch,
          dest,
          destRoutes,
          _includeValidateSearch: opts._includeValidateSearch
        });
        nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
        nextState = replaceEqualDeep(currentLocation.state, nextState);
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = url.href.replace(url.origin, "");
          if (rewrittenUrl.origin !== this.origin) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          const params = /* @__PURE__ */ Object.create(null);
          if (this.options.routeMasks) {
            const match = findFlatMatch(next.pathname, this.processedTree);
            if (match) {
              Object.assign(params, match.rawParams);
              const { from: _from, params: maskParams, ...maskProps } = match.route;
              const nextParams = maskParams === false || maskParams === null ? /* @__PURE__ */ Object.create(null) : (maskParams ?? true) === true ? params : Object.assign(params, functionalUpdate(maskParams, params));
              maskedDest = {
                from: opts.from,
                ...maskProps,
                params: nextParams
              };
              maskedNext = build(maskedDest);
            }
          }
        }
        if (maskedNext) next.maskedLocation = maskedNext;
        return next;
      };
      if (opts.mask) return buildWithMatches(opts, {
        from: opts.from,
        ...opts.mask
      });
      return buildWithMatches(opts);
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      const isSameState = () => {
        const ignoredProps = [
          "key",
          "__TSR_key",
          "__TSR_index",
          "__hashScrollIntoViewOptions"
        ];
        ignoredProps.forEach((prop) => {
          next.state[prop] = this.latestLocation.state[prop];
        });
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        ignoredProps.forEach((prop) => {
          delete next.state[prop];
        });
        return isEqual;
      };
      const isSameUrl = trimPathRight(this.latestLocation.href) === trimPathRight(next.href);
      let previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise?.resolve();
        previousCommitPromise = void 0;
      });
      if (isSameUrl && isSameState()) this.load();
      else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) this.load();
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, href, ...rest } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = parseHref(href, { __TSR_index: replace ? currentIndex : currentIndex + 1 });
        const hrefUrl = new URL(parsed.pathname, this.origin);
        rest.to = executeRewriteInput(this.rewrite, hrefUrl).pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      this.pendingBuiltLocation = location;
      const commitPromise = this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
      Promise.resolve().then(() => {
        if (this.pendingBuiltLocation === location) this.pendingBuiltLocation = void 0;
      });
      return commitPromise;
    };
    this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
      let hrefIsUrl = false;
      if (href) try {
        new URL(`${href}`);
        hrefIsUrl = true;
      } catch {
      }
      if (hrefIsUrl && !reloadDocument) reloadDocument = true;
      if (reloadDocument) {
        if (to !== void 0 || !href) {
          const location = this.buildLocation({
            to,
            ...rest
          });
          href = href ?? location.publicHref;
          publicHref = publicHref ?? location.publicHref;
        }
        const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
        if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) {
          return Promise.resolve();
        }
        if (!rest.ignoreBlocker) {
          const blockers = this.history.getBlockers?.() ?? [];
          for (const blocker of blockers) if (blocker?.blockerFn) {
            if (await blocker.blockerFn({
              currentLocation: this.latestLocation,
              nextLocation: this.latestLocation,
              action: "PUSH"
            })) return Promise.resolve();
          }
        }
        if (rest.replace) window.location.replace(reloadHref);
        else window.location.href = reloadHref;
        return Promise.resolve();
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to,
        _isNavigate: true
      });
    };
    this.beforeLoad = () => {
      this.cancelMatches();
      this.updateLatestLocation();
      {
        const nextLocation = this.buildLocation({
          to: this.latestLocation.pathname,
          search: true,
          params: true,
          hash: true,
          state: true,
          _includeValidateSearch: true
        });
        if (this.latestLocation.publicHref !== nextLocation.publicHref) {
          const href = this.getParsedLocationHref(nextLocation);
          if (nextLocation.external) throw redirect({ href });
          else throw redirect({
            href,
            _builtLocation: nextLocation
          });
        }
      }
      const pendingMatches = this.matchRoutes(this.latestLocation);
      const nextCachedMatches = this.stores.cachedMatches.get().filter((d) => !pendingMatches.some((e) => e.id === d.id));
      this.batch(() => {
        this.stores.status.set("pending");
        this.stores.statusCode.set(200);
        this.stores.isLoading.set(true);
        this.stores.location.set(this.latestLocation);
        this.stores.setPending(pendingMatches);
        this.stores.setCached(nextCachedMatches);
      });
    };
    this.load = async (opts) => {
      let redirect2;
      let notFound2;
      let loadPromise;
      const previousLocation = this.stores.resolvedLocation.get() ?? this.stores.location.get();
      loadPromise = new Promise((resolve) => {
        this.startTransition(async () => {
          try {
            this.beforeLoad();
            const next = this.latestLocation;
            const locationChangeInfo = getLocationChangeInfo(next, this.stores.resolvedLocation.get());
            if (!this.stores.redirect.get()) this.emit({
              type: "onBeforeNavigate",
              ...locationChangeInfo
            });
            this.emit({
              type: "onBeforeLoad",
              ...locationChangeInfo
            });
            await loadMatches({
              router: this,
              sync: opts?.sync,
              forceStaleReload: previousLocation.href === next.href,
              matches: this.stores.pendingMatches.get(),
              location: next,
              updateMatch: this.updateMatch,
              onReady: async () => {
                this.startTransition(() => {
                  this.startViewTransition(async () => {
                    let exitingMatches = null;
                    let hookExitingMatches = null;
                    let hookEnteringMatches = null;
                    let hookStayingMatches = null;
                    this.batch(() => {
                      const pendingMatches = this.stores.pendingMatches.get();
                      const mountPending = pendingMatches.length;
                      const currentMatches = this.stores.matches.get();
                      exitingMatches = mountPending ? currentMatches.filter((match) => !this.stores.pendingMatchStores.has(match.id)) : null;
                      const pendingRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.pendingMatchStores.values()) if (s.routeId) pendingRouteIds.add(s.routeId);
                      const activeRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.matchStores.values()) if (s.routeId) activeRouteIds.add(s.routeId);
                      hookExitingMatches = mountPending ? currentMatches.filter((match) => !pendingRouteIds.has(match.routeId)) : null;
                      hookEnteringMatches = mountPending ? pendingMatches.filter((match) => !activeRouteIds.has(match.routeId)) : null;
                      hookStayingMatches = mountPending ? pendingMatches.filter((match) => activeRouteIds.has(match.routeId)) : currentMatches;
                      this.stores.isLoading.set(false);
                      this.stores.loadedAt.set(Date.now());
                      if (mountPending) {
                        this.stores.setMatches(pendingMatches);
                        this.stores.setPending([]);
                        this.stores.setCached([...this.stores.cachedMatches.get(), ...exitingMatches.filter((d) => d.status !== "error" && d.status !== "notFound" && d.status !== "redirected")]);
                        this.clearExpiredCache();
                      }
                    });
                    for (const [matches, hook] of [
                      [hookExitingMatches, "onLeave"],
                      [hookEnteringMatches, "onEnter"],
                      [hookStayingMatches, "onStay"]
                    ]) {
                      if (!matches) continue;
                      for (const match of matches) this.looseRoutesById[match.routeId].options[hook]?.(match);
                    }
                  });
                });
              }
            });
          } catch (err) {
            if (isRedirect(err)) {
              redirect2 = err;
            } else if (isNotFound(err)) notFound2 = err;
            const nextStatusCode = redirect2 ? redirect2.status : notFound2 ? 404 : this.stores.matches.get().some((d) => d.status === "error") ? 500 : 200;
            this.batch(() => {
              this.stores.statusCode.set(nextStatusCode);
              this.stores.redirect.set(redirect2);
            });
          }
          if (this.latestLoadPromise === loadPromise) {
            this.commitLocationPromise?.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) await this.latestLoadPromise;
      let newStatusCode = void 0;
      if (this.hasNotFoundMatch()) newStatusCode = 404;
      else if (this.stores.matches.get().some((d) => d.status === "error")) newStatusCode = 500;
      if (newStatusCode !== void 0) this.stores.statusCode.set(newStatusCode);
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          const next = this.latestLocation;
          const prevLocation = this.stores.resolvedLocation.get();
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
          if (resolvedViewTransitionTypes === false) {
            fn();
            return;
          }
          startViewTransitionParams = {
            update: fn,
            types: resolvedViewTransitionTypes
          };
        } else startViewTransitionParams = fn;
        document.startViewTransition(startViewTransitionParams);
      } else fn();
    };
    this.updateMatch = (id, updater) => {
      this.startTransition(() => {
        const pendingMatch = this.stores.pendingMatchStores.get(id);
        if (pendingMatch) {
          pendingMatch.set(updater);
          return;
        }
        const activeMatch = this.stores.matchStores.get(id);
        if (activeMatch) {
          activeMatch.set(updater);
          return;
        }
        const cachedMatch = this.stores.cachedMatchStores.get(id);
        if (cachedMatch) {
          const next = updater(cachedMatch.get());
          if (next.status === "redirected") {
            if (this.stores.cachedMatchStores.delete(id)) this.stores.cachedIds.set((prev) => prev.filter((matchId) => matchId !== id));
          } else cachedMatch.set(next);
        }
      });
    };
    this.getMatch = (matchId) => {
      return this.stores.cachedMatchStores.get(matchId)?.get() ?? this.stores.pendingMatchStores.get(matchId)?.get() ?? this.stores.matchStores.get(matchId)?.get();
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        if (opts?.filter?.(d) ?? true) return {
          ...d,
          invalid: true,
          ...opts?.forcePending || d.status === "error" || d.status === "notFound" ? {
            status: "pending",
            error: void 0
          } : void 0
        };
        return d;
      };
      this.batch(() => {
        this.stores.setMatches(this.stores.matches.get().map(invalidate));
        this.stores.setCached(this.stores.cachedMatches.get().map(invalidate));
        this.stores.setPending(this.stores.pendingMatches.get().map(invalidate));
      });
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.getParsedLocationHref = (location) => {
      return location.publicHref || "/";
    };
    this.resolveRedirect = (redirect2) => {
      const locationHeader = redirect2.headers.get("Location");
      if (!redirect2.options.href || redirect2.options._builtLocation) {
        const location = redirect2.options._builtLocation ?? this.buildLocation(redirect2.options);
        const href = this.getParsedLocationHref(location);
        redirect2.options.href = href;
        redirect2.headers.set("Location", href);
      } else if (locationHeader) try {
        const url = new URL(locationHeader);
        if (this.origin && url.origin === this.origin) {
          const href = url.pathname + url.search + url.hash;
          redirect2.options.href = href;
          redirect2.headers.set("Location", href);
        }
      } catch {
      }
      if (redirect2.options.href && !redirect2.options._builtLocation && isDangerousProtocol(redirect2.options.href, this.protocolAllowlist)) throw new Error("Redirect blocked: unsafe protocol");
      if (!redirect2.headers.get("Location")) redirect2.headers.set("Location", redirect2.options.href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts?.filter;
      if (filter !== void 0) this.stores.setCached(this.stores.cachedMatches.get().filter((m) => !filter(m)));
      else this.stores.setCached([]);
    };
    this.clearExpiredCache = () => {
      const now = Date.now();
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) return true;
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 300 * 1e3;
        if (d.status === "error") return true;
        return now - d.updatedAt >= gcTime;
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = async (opts) => {
      const next = opts._builtLocation ?? this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = /* @__PURE__ */ new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]);
      const loadedMatchIds = /* @__PURE__ */ new Set([...activeMatchIds, ...this.stores.cachedIds.get()]);
      const matchesToCache = matches.filter((match) => !loadedMatchIds.has(match.id));
      if (matchesToCache.length) {
        const cachedMatches = this.stores.cachedMatches.get();
        this.stores.setCached([...cachedMatches, ...matchesToCache]);
      }
      try {
        matches = await loadMatches({
          router: this,
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) matches = matches.map((d) => d.id === id ? updater(d) : d);
            else this.updateMatch(id, updater);
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          if (err.options.reloadDocument) return;
          return await this.preloadRoute({
            ...err.options,
            _fromLocation: next
          });
        }
        if (!isNotFound(err)) console.error(err);
        return;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if (opts?.pending && this.stores.status.get() !== "pending") return false;
      const baseLocation = (opts?.pending === void 0 ? !this.stores.isLoading.get() : opts.pending) ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
      return match.rawParams;
    };
    this.hasNotFoundMatch = () => {
      return this.stores.matches.get().some((d) => d.status === "notFound" || d.globalNotFound);
    };
    this.getStoreConfig = getStoreConfig;
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
    if (typeof document !== "undefined") self.__TSR_ROUTER__ = this;
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes({ routesById, routesByPath, processedTree }) {
    this.routesById = routesById;
    this.routesByPath = routesByPath;
    this.processedTree = processedTree;
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init({ originalIndex: 99999999999 });
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  get looseRoutesById() {
    return this.routesById;
  }
  getParentContext(parentMatch) {
    return !parentMatch?.id ? this.options.context ?? void 0 : parentMatch.context ?? this.options.context ?? void 0;
  }
  matchRoutesInternal(next, opts) {
    const matchedRoutesResult = this.getMatchedRoutes(next.pathname);
    const { foundRoute, routeParams, parsedParams } = matchedRoutesResult;
    let { matchedRoutes } = matchedRoutesResult;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && routeParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const globalNotFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const previousActiveMatchesByRouteId = /* @__PURE__ */ new Map();
    for (const store of this.stores.matchStores.values()) if (store.routeId) previousActiveMatchesByRouteId.set(store.routeId, store.get());
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
          searchError = void 0;
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      const loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { interpolatedPath, usedParams } = interpolatePath({
        path: route.fullPath,
        params: routeParams,
        decoder: this.pathParamsDecoder,
        server: this.isServer
      });
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = previousActiveMatchesByRouteId.get(route.id);
      const strictParams = existingMatch?._strictParams ?? usedParams;
      let paramsError = void 0;
      if (!existingMatch) try {
        extractStrictParams(route, usedParams, parsedParams, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      Object.assign(routeParams, strictParams);
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        params: previousMatch?.params ?? routeParams,
        _strictParams: strictParams,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch
      };
      else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: void 0,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? routeParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          __routeContext: void 0,
          _nonReactive: { loadPromise: createControlledPromise() },
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      if (!opts?.preload) match.globalNotFound = globalNotFoundRouteId === route.id;
      match.searchError = searchError;
      const parentContext = this.getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      const previousMatch = previousActiveMatchesByRouteId.get(match.routeId);
      match.params = previousMatch ? nullReplaceEqualDeep(previousMatch.params, routeParams) : routeParams;
      if (!existingMatch) {
        const parentMatch = matches[index - 1];
        const parentContext = this.getParentContext(parentMatch);
        if (route.options.context) {
          const contextFnContext = {
            deps: match.loaderDeps,
            params: match.params,
            context: parentContext ?? {},
            location: next,
            navigate: (opts2) => this.navigate({
              ...opts2,
              _fromLocation: next
            }),
            buildLocation: this.buildLocation,
            cause: match.cause,
            abortController: match.abortController,
            preload: !!match.preload,
            matches,
            routeId: route.id
          };
          match.__routeContext = route.options.context(contextFnContext) ?? void 0;
        }
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, ControlledPromise, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const { matchedRoutes, routeParams, parsedParams } = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const lastStateMatchId = last(this.stores.matchesId.get());
    const lastStateMatch = lastStateMatchId && this.stores.matchStores.get(lastStateMatchId)?.get();
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = Object.assign(/* @__PURE__ */ Object.create(null), routeParams);
      for (const route of matchedRoutes) try {
        extractStrictParams(route, routeParams, parsedParams ?? {}, strictParams);
      } catch {
      }
      params = strictParams;
    }
    return {
      matchedRoutes,
      fullPath: lastRoute.fullPath,
      search: accumulatedSearch,
      params
    };
  }
};
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    statusCode: 200
  };
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function getMatchedRoutes({ pathname, routesById, processedTree }) {
  const routeParams = /* @__PURE__ */ Object.create(null);
  const trimmedPath = trimPathRight(pathname);
  let foundRoute = void 0;
  let parsedParams = void 0;
  const match = findRouteMatch(trimmedPath, processedTree, true);
  if (match) {
    foundRoute = match.route;
    Object.assign(routeParams, match.rawParams);
    parsedParams = Object.assign(/* @__PURE__ */ Object.create(null), match.parsedParams);
  }
  return {
    matchedRoutes: match?.branch || [routesById["__root__"]],
    routeParams,
    foundRoute,
    parsedParams
  };
}
function applySearchMiddleware({ search, dest, destRoutes, _includeValidateSearch }) {
  return buildMiddlewareChain(destRoutes)(search, dest, _includeValidateSearch ?? false);
}
function buildMiddlewareChain(destRoutes) {
  const context = {
    dest: null,
    _includeValidateSearch: false,
    middlewares: []
  };
  for (const route of destRoutes) {
    if ("search" in route.options) {
      if (route.options.search?.middlewares) context.middlewares.push(...route.options.search.middlewares);
    } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        let nextSearch = search;
        if ("preSearchFilters" in route.options && route.options.preSearchFilters) nextSearch = route.options.preSearchFilters.reduce((prev, next2) => next2(prev), search);
        const result = next(nextSearch);
        if ("postSearchFilters" in route.options && route.options.postSearchFilters) return route.options.postSearchFilters.reduce((prev, next2) => next2(prev), result);
        return result;
      };
      context.middlewares.push(legacyMiddleware);
    }
    if (route.options.validateSearch) {
      const validate = ({ search, next }) => {
        const result = next(search);
        if (!context._includeValidateSearch) return result;
        try {
          return {
            ...result,
            ...validateSearch(route.options.validateSearch, result) ?? void 0
          };
        } catch {
          return result;
        }
      };
      context.middlewares.push(validate);
    }
  }
  const final = ({ search }) => {
    const dest = context.dest;
    if (!dest.search) return {};
    if (dest.search === true) return search;
    return functionalUpdate(dest.search, search);
  };
  context.middlewares.push(final);
  const applyNext = (index, currentSearch, middlewares) => {
    if (index >= middlewares.length) return currentSearch;
    const middleware = middlewares[index];
    const next = (newSearch) => {
      return applyNext(index + 1, newSearch, middlewares);
    };
    return middleware({
      search: currentSearch,
      next
    });
  };
  return function middleware(search, dest, _includeValidateSearch) {
    context.dest = dest;
    context._includeValidateSearch = _includeValidateSearch;
    return applyNext(0, search, context.middlewares);
  };
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") for (let i = routes.length - 1; i >= 0; i--) {
    const route = routes[i];
    if (route.children) return route.id;
  }
  return rootRouteId;
}
function extractStrictParams(route, referenceParams, parsedParams, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) if (route.options.skipRouteOnParseError) {
    for (const key in referenceParams) if (key in parsedParams) accumulatedParams[key] = parsedParams[key];
  } else {
    const result = parseParams(accumulatedParams);
    Object.assign(accumulatedParams, result);
  }
}
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
      if (path === "__root__") path = "/";
      if (id !== "__root__") id = joinPaths(["/", id]);
      const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};
function useMatch(opts) {
  const router2 = useRouter();
  const nearestMatchId = reactExports.useContext(opts.from ? dummyMatchContext : matchContext);
  const key = opts.from ?? nearestMatchId;
  const matchStore = key ? opts.from ? router2.stores.getRouteMatchStore(key) : router2.stores.matchStores.get(key) : void 0;
  {
    const match = matchStore?.get();
    if ((opts.shouldThrow ?? true) && !match) {
      invariant();
    }
    if (match === void 0) return;
    return opts.select ? opts.select(match) : match;
  }
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback((options) => {
    return router2.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router2]);
}
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}
requireReactDom();
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
  {
    const safeInternal = isSafeInternal(to);
    if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1) try {
      new URL(to);
      if (isDangerousProtocol(to, router2.protocolAllowlist)) {
        if (false) ;
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: void 0,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      }
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: to,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    } catch {
    }
    const next2 = router2.buildLocation({
      ...options,
      from: options.from
    });
    const hrefOption2 = getHrefOption(next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref, next2.maskedLocation ? next2.maskedLocation.external : next2.external, router2.history, disabled);
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router2.protocolAllowlist)) {
          return;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to === "string" && to.indexOf(":") > -1) try {
        new URL(to);
        if (isDangerousProtocol(to, router2.protocolAllowlist)) {
          if (false) ;
          return;
        }
        return to;
      } catch {
      }
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation2 = router2.stores.location.get();
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        if (!exactPathTest(currentLocation2.pathname, next2.pathname, router2.basepath)) return false;
      } else {
        const currentPathSplit = removeTrailingSlash(currentLocation2.pathname, router2.basepath);
        const nextPathSplit = removeTrailingSlash(next2.pathname, router2.basepath);
        if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
      }
      if (activeOptions?.includeSearch ?? true) {
        if (currentLocation2.search !== next2.search) {
          const currentSearchEmpty = !currentLocation2.search || typeof currentLocation2.search === "object" && Object.keys(currentLocation2.search).length === 0;
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && Object.keys(next2.search).length === 0;
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            if (!deepEqual(currentLocation2.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            })) return false;
          }
        }
      }
      if (activeOptions?.includeHash) return false;
      return true;
    })();
    if (externalLink2) return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink2,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className }
    };
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) return;
      if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
      if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
      if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) return "";
      let out = "";
      if (baseClassName) out = baseClassName;
      if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
      if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
  role: "link",
  "aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
  "data-status": "active",
  "aria-current": "page"
};
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0;
  if (external) return {
    href: publicHref,
    external: true
  };
  return {
    href: history.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false;
  const zero = to.charCodeAt(0);
  if (zero === 47) return to.charCodeAt(1) !== 47;
  return zero === 46;
}
var Link = reactExports.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props;
  const { type: _type, ...linkProps } = useLinkProps(rest, ref);
  const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
  if (!_asChild) {
    const { disabled: _, ...rest2 } = linkProps;
    return reactExports.createElement("a", rest2, children);
  }
  return reactExports.createElement(_asChild, linkProps, children);
});
var Route$7 = class Route extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route$7(options);
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  return new FileRoute(path, { silent: true }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
};
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) loadPromise = importer().then((res) => {
      loadPromise = void 0;
      comp = res[exportName ?? "default"];
    }).catch((err) => {
      error = err;
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            reload = true;
          }
        }
      }
    });
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) throw error;
    if (!comp) if (reactUse) reactUse(load());
    else throw load();
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
var getStoreFactory = (opts) => {
  return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn()
  };
};
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};
function Asset({ tag, attrs, children, nonce }) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children
      });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        ...attrs,
        suppressHydrationWarning: true
      });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        ...attrs,
        precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
        nonce,
        suppressHydrationWarning: true
      });
    case "style":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        nonce
      });
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, {
        attrs,
        children
      });
    default:
      return null;
  }
}
function Script({ attrs, children }) {
  useRouter();
  useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  reactExports.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      if (Array.from(document.querySelectorAll("script[src]")).find((el) => el.src === normSrc)) return;
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      if (Array.from(document.querySelectorAll("script:not([src])")).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      })) return;
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
  }, [
    attrs,
    children,
    dataScript
  ]);
  {
    if (attrs?.src) return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      suppressHydrationWarning: true
    });
    if (typeof children === "string") return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true
    });
    return null;
  }
}
function buildTagsFromMatches(router2, nonce, matches, assetCrossOrigin) {
  const routeMeta = matches.map((match) => match.meta).filter(Boolean);
  const resultMeta = [];
  const metaByAttribute = {};
  let title;
  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i];
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j];
      if (!m) continue;
      if (m.title) {
        if (!title) title = {
          tag: "title",
          children: m.title
        };
      } else if ("script:ld+json" in m) try {
        const json = JSON.stringify(m["script:ld+json"]);
        resultMeta.push({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: escapeHtml(json)
        });
      } catch {
      }
      else {
        const attribute = m.name ?? m.property;
        if (attribute) if (metaByAttribute[attribute]) continue;
        else metaByAttribute[attribute] = true;
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m,
            nonce
          }
        });
      }
    }
  }
  if (title) resultMeta.push(title);
  if (nonce) resultMeta.push({
    tag: "meta",
    attrs: {
      property: "csp-nonce",
      content: nonce
    }
  });
  resultMeta.reverse();
  const constructedLinks = matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
    tag: "link",
    attrs: {
      ...link,
      nonce
    }
  }));
  const manifest = router2.ssr?.manifest;
  const assetLinks = matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map((asset) => ({
    tag: "link",
    attrs: {
      ...asset.attrs,
      crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? asset.attrs?.crossOrigin,
      suppressHydrationWarning: true,
      nonce
    }
  }));
  const preloadLinks = [];
  matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
    const preloadLink = resolveManifestAssetLink(preload);
    preloadLinks.push({
      tag: "link",
      attrs: {
        rel: "modulepreload",
        href: preloadLink.href,
        crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "modulepreload") ?? preloadLink.crossOrigin,
        nonce
      }
    });
  }));
  const styles = matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
    tag: "style",
    attrs: {
      ...attrs,
      nonce
    },
    children
  }));
  const headScripts = matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      nonce
    },
    children
  }));
  return uniqBy([
    ...resultMeta,
    ...preloadLinks,
    ...constructedLinks,
    ...assetLinks,
    ...styles,
    ...headScripts
  ], (d) => JSON.stringify(d));
}
var useTags = (assetCrossOrigin) => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return buildTagsFromMatches(router2, nonce, router2.stores.matches.get(), assetCrossOrigin);
};
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin);
  const nonce = useRouter().options.ssr?.nonce;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...tag,
    key: `tsr-meta-${JSON.stringify(tag)}`,
    nonce
  })) });
}
var Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const getAssetScripts = (matches) => {
    const assetScripts = [];
    const manifest = router2.ssr?.manifest;
    if (!manifest) return [];
    matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
      assetScripts.push({
        tag: "script",
        attrs: {
          ...asset.attrs,
          nonce
        },
        children: asset.children
      });
    }));
    return assetScripts;
  };
  const getScripts = (matches) => matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      suppressHydrationWarning: true,
      nonce
    },
    children
  }));
  {
    const activeMatches = router2.stores.matches.get();
    const assetScripts = getAssetScripts(activeMatches);
    return renderScripts(router2, getScripts(activeMatches), assetScripts);
  }
};
function renderScripts(router2, scripts, assetScripts) {
  let serverBufferedScript = void 0;
  if (router2.serverSsr) serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) allScripts.unshift(serverBufferedScript);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...asset,
    key: `tsr-scripts-${asset.tag}-${i}`
  })) });
}
const dictionaries = {
  fr: {
    nav: {
      home: "Accueil",
      chef: "Les chefs",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      langLabel: "Langue"
    },
    footer: {
      brand: "Christelle's Family Recipes",
      cookedWith: "Cuisiné avec",
      sendEmail: "Envoyer un email",
      privacy: "Politique de confidentialité",
      legal: "Mentions légales",
      rights: "Tous droits réservés"
    },
    home: {
      badge: "✨ Cuisine de famille",
      titleA: "Les recettes que tout le monde",
      titleB: "adore vraiment.",
      lead: "Carnet de cuisine partagé entre les générations — des classiques de la cuisine française aux expérimentations gourmandes des plus jeunes.",
      shuffle: "Mélanger les recettes",
      searchPlaceholder: "Recherche par recette ou ingrédient…",
      clearSearch: "Effacer la recherche",
      filterType: "Type",
      filterSeason: "Saison",
      filterDifficulty: "Difficulté",
      filterPrice: "Prix",
      reset: "Réinitialiser",
      countOne: (n) => `${n} recette à découvrir`,
      countMany: (n) => `${n} recettes à découvrir`,
      none: "Aucune recette",
      emptyTitle: "Rien dans la marmite…",
      emptyDesc: "Essayez d'autres filtres ou réinitialisez votre recherche.",
      emptyReset: "Réinitialiser les filtres",
      metaTitle: "Christelle's Family Recipes — Recettes de famille",
      metaDesc: "Les recettes que tout le monde adore, partagées avec amour. Découvrez chaque jour de nouvelles inspirations cuisine.",
      legendTitle: "Légende des icônes",
      legendSeason: "Saison",
      legendDifficulty: "Difficulté",
      legendPrice: "Prix moyen",
      legendPrep: "Temps de préparation",
      legendCook: "Temps de cuisson"
    },
    chef: {
      badge: "👩‍🍳 La cheffe",
      hello: "Bonjour, moi c'est",
      lead: "Je suis passionnée de cuisine grâce à des femmes merveilleuses qui m'ont énormément appris ! Mon credo : la cuisine doit rester simple, généreuse et partagée. Pas de chichis, des bons produits, et beaucoup d'amour.",
      about: "À propos",
      family: "Les femmes qui m'ont tout appris",
      metaTitle: "Le chef — Christelle's Family Recipes",
      metaDesc: "Christelle, la cheffe de famille derrière le carnet, et toute la tribu qui partage la passion de la cuisine.",
      legendTitle: "Icon legend",
      legendSeason: "Saison",
      legendDifficulty: "Difficulté",
      legendPrice: "Prix moyen",
      legendPrep: "Temps de préparation",
      legendCook: "Temps de cuisson"
    },
    contact: {
      badge: "✉️ Contact",
      titleA: "Discutons",
      titleB: "cuisine.",
      lead: "Une recette à partager ? Une question sur une cuisson ? Écrivez-moi, je réponds toujours autour d'un café.",
      byEmail: "Par email",
      onInstagram: "Sur Instagram",
      wordTitle: "Le mot de Christelle",
      word: "Je lis chaque message avec plaisir. N'hésitez pas à partager vos variantes !",
      sentTitle: "Message envoyé !",
      sentDesc: "Merci pour votre message. Christelle vous répondra dès que possible.",
      sendAnother: "Envoyer un autre message",
      labelName: "Votre nom",
      labelEmail: "Votre email",
      labelMessage: "Votre message",
      placeholderName: "Jeanne D.",
      placeholderEmail: "jeanne@email.com",
      placeholderMessage: "Bonjour Christelle…",
      consent: "J'accepte que mon nom et mon email soient utilisés uniquement pour me répondre. Aucune donnée n'est stockée sur ce site. Voir la",
      consentLink: "politique de confidentialité",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      toastSuccess: "Message envoyé ! Christelle vous répondra bientôt.",
      toastError: "Une erreur est survenue. Réessayez plus tard.",
      toastNetwork: "Impossible d'envoyer le message. Vérifiez votre connexion.",
      toastNotConfigured: "Le formulaire n'est pas encore configuré. La clé Web3Forms n'a pas été ajoutée.",
      errName: "Votre nom doit contenir au moins 2 caractères",
      errNameLong: "Votre nom est trop long",
      errEmail: "Email invalide",
      errEmailLong: "Email trop long",
      errMessage: "Votre message doit contenir au moins 10 caractères",
      errMessageLong: "Votre message est trop long (max 2000 caractères)",
      errConsent: "Vous devez accepter pour envoyer le message",
      errInvalid: "Formulaire invalide",
      subject: (name) => `Nouveau message de ${name} — Christelle's Family Recipes`,
      metaTitle: "Contact — Christelle's Family Recipes",
      metaDesc: "Une question, une recette à partager, une envie de discuter cuisine ? Contactez Christelle."
    },
    recipe: {
      back: "Retour aux recettes",
      ingredients: "Ingrédients",
      preparation: "Préparation",
      sharedBy: (n) => `Recette partagée par ${n}`,
      family: "la famille",
      quote: "« Une recette à transmettre, à partager, à savourer. »",
      notFoundTitle: "Recette introuvable",
      notFoundDesc: "Cette recette n'existe pas ou a été retirée du carnet.",
      backHome: "Retour à l'accueil"
    },
    privacy: {
      title: "Politique de confidentialité",
      updated: "Dernière mise à jour",
      backHome: "← Retour à l'accueil",
      metaTitle: "Politique de confidentialité — Christelle's Family Recipes",
      metaDesc: "Comment vos données sont (ou plutôt, ne sont pas) collectées sur Christelle's Family Recipes."
    },
    legal: {
      title: "Mentions légales",
      backHome: "← Retour à l'accueil",
      metaTitle: "Mentions légales — Christelle's Family Recipes",
      metaDesc: "Mentions légales du site Christelle's Family Recipes."
    },
    season: {
      Printemps: "Printemps",
      Été: "Été",
      Automne: "Automne",
      Hiver: "Hiver",
      "Toutes saisons": "Toutes saisons"
    },
    difficulty: {
      Facile: "Facile",
      Technique: "Technique"
    },
    type: {
      Entrée: "Entrée",
      Plat: "Plat",
      Dessert: "Dessert",
      Apéritif: "Apéritif",
      Salade: "Salade",
      Végétarien: "Végétarien"
    },
    price: {
      "€": "€",
      "€€": "€€",
      "€€€": "€€€"
    },
    locale: "fr-FR"
  },
  en: {
    nav: {
      home: "Home",
      chef: "The chefs",
      contact: "Contact",
      openMenu: "Open menu",
      langLabel: "Language"
    },
    footer: {
      brand: "Christelle's Family Recipes",
      cookedWith: "Cooked with",
      sendEmail: "Send an email",
      privacy: "Privacy policy",
      legal: "Legal notice",
      rights: "All rights reserved"
    },
    home: {
      badge: "✨ Family cooking",
      titleA: "Recipes that everyone",
      titleB: "truly loves.",
      lead: "A cooking notebook shared across generations — from French culinary classics to the youngest's tasty experiments.",
      shuffle: "Shuffle recipes",
      searchPlaceholder: "Search by recipe or ingredient…",
      clearSearch: "Clear search",
      filterType: "Type",
      filterSeason: "Season",
      filterDifficulty: "Difficulty",
      filterPrice: "Price",
      reset: "Reset",
      countOne: (n) => `${n} recipe to discover`,
      countMany: (n) => `${n} recipes to discover`,
      none: "No recipes",
      emptyTitle: "Nothing in the pot…",
      emptyDesc: "Try other filters or reset your search.",
      emptyReset: "Reset filters",
      metaTitle: "Christelle's Family Recipes — Family recipes",
      metaDesc: "The recipes my family loves, shared with love. Discover new cooking inspiration every day.",
      legendTitle: "Icon legend",
      legendSeason: "Season",
      legendDifficulty: "Difficulty",
      legendPrice: "Average price",
      legendPrep: "Prep time",
      legendCook: "Cooking time"
    },
    chef: {
      badge: "👩‍🍳 The chef",
      hello: "Hello, I'm",
      lead: "I’m passionate about cooking thanks to some wonderful women who have taught me so much! My credo: cooking should stay simple, generous and shared. No fuss, good ingredients, and lots of love.",
      about: "About",
      family: "The women who taught me everything",
      metaTitle: "The chef — Christelle's Family Recipes",
      metaDesc: "Christelle, the family chef behind the notebook, and the whole tribe sharing a passion for cooking.",
      legendTitle: "Icon legend",
      legendSeason: "Season",
      legendDifficulty: "Difficulty",
      legendPrice: "Average price",
      legendPrep: "Prep time",
      legendCook: "Cooking time"
    },
    contact: {
      badge: "✉️ Contact",
      titleA: "Let's talk",
      titleB: "cooking.",
      lead: "A recipe to share? A question about a cooking technique? Write to me — I always reply over a coffee.",
      byEmail: "By email",
      onInstagram: "On Instagram",
      wordTitle: "A word from Christelle",
      word: "I read every message with pleasure. Feel free to share your variations!",
      sentTitle: "Message sent!",
      sentDesc: "Thanks for your message. Christelle will reply as soon as possible.",
      sendAnother: "Send another message",
      labelName: "Your name",
      labelEmail: "Your email",
      labelMessage: "Your message",
      placeholderName: "Jane D.",
      placeholderEmail: "jane@email.com",
      placeholderMessage: "Hi Christelle…",
      consent: "I agree that my name and email may be used only to reply to me. No data is stored on this site. See the",
      consentLink: "privacy policy",
      submit: "Send message",
      sending: "Sending…",
      toastSuccess: "Message sent! Christelle will reply soon.",
      toastError: "Something went wrong. Please try again later.",
      toastNetwork: "Could not send the message. Please check your connection.",
      toastNotConfigured: "The form is not configured yet. The Web3Forms key has not been added.",
      errName: "Your name must be at least 2 characters",
      errNameLong: "Your name is too long",
      errEmail: "Invalid email",
      errEmailLong: "Email is too long",
      errMessage: "Your message must be at least 10 characters",
      errMessageLong: "Your message is too long (max 2000 characters)",
      errConsent: "You must accept to send the message",
      errInvalid: "Invalid form",
      subject: (name) => `New message from ${name} — Christelle's Family Recipes`,
      metaTitle: "Contact — Christelle's Family Recipes",
      metaDesc: "A question, a recipe to share, want to talk cooking? Get in touch with Christelle."
    },
    recipe: {
      back: "Back to recipes",
      ingredients: "Ingredients",
      preparation: "Preparation",
      sharedBy: (n) => `Recipe shared by ${n}`,
      family: "the family",
      quote: "“A recipe to pass on, to share, to savor.”",
      notFoundTitle: "Recipe not found",
      notFoundDesc: "This recipe does not exist or has been removed from the notebook.",
      backHome: "Back to home"
    },
    privacy: {
      title: "Privacy policy",
      updated: "Last updated",
      backHome: "← Back to home",
      metaTitle: "Privacy policy — Christelle's Family Recipes",
      metaDesc: "How your data is (or rather, is not) collected on Christelle's Family Recipes."
    },
    legal: {
      title: "Legal notice",
      backHome: "← Back to home",
      metaTitle: "Legal notice — Christelle's Family Recipes",
      metaDesc: "Legal notice for Christelle's Family Recipes."
    },
    season: {
      Printemps: "Spring",
      Été: "Summer",
      Automne: "Autumn",
      Hiver: "Winter",
      "Toutes saisons": "All seasons"
    },
    difficulty: {
      Facile: "Easy",
      Technique: "Technical"
    },
    type: {
      Entrée: "Starter",
      Plat: "Main",
      Dessert: "Dessert",
      Apéritif: "Apéritif",
      Salade: "Salad",
      Végétarien: "Vegetarian"
    },
    price: {
      "€": "$",
      "€€": "$$",
      "€€€": "$$$"
    },
    locale: "en-US"
  }
};
const I18nContext = reactExports.createContext(null);
const STORAGE_KEY = "cfr.lang";
function detectInitialLang() {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
  }
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "fr";
}
function I18nProvider({ children }) {
  const [lang, setLangState] = reactExports.useState("fr");
  reactExports.useEffect(() => {
    setLangState(detectInitialLang());
  }, []);
  reactExports.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  const setLang = reactExports.useCallback((l) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
    }
  }, []);
  const value = reactExports.useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I18nContext.Provider, { value, children });
}
function useI18n() {
  const ctx = reactExports.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
const appCss = "/assets/styles-BTKx8kgf.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I18nProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$5 = () => import("./mentions-legales-Bez4qh45.js");
const Route$5 = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [{
      title: dictionaries.fr.legal.metaTitle
    }, {
      name: "description",
      content: dictionaries.fr.legal.metaDesc
    }, {
      name: "robots",
      content: "index,follow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./le-chef-CVFJ28fy.js");
const Route$4 = createFileRoute("/le-chef")({
  head: () => ({
    meta: [{
      title: dictionaries.fr.chef.metaTitle
    }, {
      name: "description",
      content: dictionaries.fr.chef.metaDesc
    }, {
      property: "og:title",
      content: dictionaries.fr.chef.metaTitle
    }, {
      property: "og:description",
      content: dictionaries.fr.chef.metaDesc
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-BfnKpX2q.js");
const Route$3 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: dictionaries.fr.contact.metaTitle
    }, {
      name: "description",
      content: dictionaries.fr.contact.metaDesc
    }, {
      property: "og:title",
      content: dictionaries.fr.contact.metaTitle
    }, {
      property: "og:description",
      content: dictionaries.fr.contact.metaDesc
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./confidentialite-ljy_DACJ.js");
const Route$2 = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [{
      title: dictionaries.fr.privacy.metaTitle
    }, {
      name: "description",
      content: dictionaries.fr.privacy.metaDesc
    }, {
      name: "robots",
      content: "index,follow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BvoVC1Dd.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: dictionaries.fr.home.metaTitle
    }, {
      name: "description",
      content: dictionaries.fr.home.metaDesc
    }, {
      property: "og:title",
      content: "Christelle's Family Recipes"
    }, {
      property: "og:description",
      content: dictionaries.fr.home.metaDesc
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const chiefs = [
  {
    name: "Christelle",
    img: "/img/top-chiefs/img_1.jpg",
    description: "Je suis passionnée de cuisine grâce à des femmes merveilleuses qui m'ont énormément appris !",
    description_en: "I'm passionate about cooking thanks to wonderful women who taught me so much!"
  },
  {
    name: "Mamie Marie",
    img: "/img/top-chiefs/img_2.jpg",
    description: "Ma maman qui m'a donné le goût de cuisiner !",
    description_en: "My mum, who gave me the love of cooking!"
  },
  {
    name: "Mamie Colette",
    img: "/img/top-chiefs/img_3.jpg",
    description: "Ma belle-mère qui m'a partagé sa passion pour la pâtisserie !",
    description_en: "My mother-in-law, who shared her passion for pastry with me!"
  },
  {
    name: "Loulou",
    img: "/img/top-chiefs/img_4.jpg",
    description: "Ma tante qui m'a fait découvrir la cuisine niçoise !",
    description_en: "My aunt, who introduced me to the cuisine of Nice!"
  },
  {
    name: "La Mémette",
    img: "/img/top-chiefs/img_5.jpg",
    description: "Ma maman de cœur qui m'a tout appris de la cuisine du sud-ouest !",
    description_en: "My heart-mother, who taught me everything about south-western French cooking!"
  }
];
const recipes = [
  {
    image: "/img/gallery/img_46.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Riz au lait",
    slug: "riz-au-lait",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "Rice pudding",
    description_en: "Split the vanilla bean in half lengthwise, then scrape out the seeds. Rinse the rice. Blanch it for 1 minute. In a saucepan, combine the milk, vanilla, and rice. Cook over low heat until the rice has absorbed all the liquid. Add the sugar. Let cool to room temperature. Spoon into small glasses.",
    ingredients_en: ["1 L milk", "250 g round rice", "1 vanilla bean", "80 g sugar"],
    timeToCook_en: "30 minutes",
    ingredients: ["1 l de Lait", "250 g de riz rond", "1 gousse de vanille", "80 g de sucre en poudre"],
    description: "Fendre la gousse de vanille en 2 puis la gratter. Laver le riz. L'ébouillanter 1 minute. Dans une casserole: disposer le lait, la vanille et le riz. Cuire à feu doux jusqu'à ce que le riz ait absorbé tout le liquide. Ajouter le sucre. Laisser refroidir à température ambiante. Dresser dans des verrines."
  },
  {
    image: "/img/gallery/img_25.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    authorName: "Loulou",
    name: "Terrine de porc",
    slug: "terrine-de-porc",
    season: "Été",
    type: "Entrée",
    timeToCook: "30 minutes + 1h30 de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["400g de foie de porc", "300g de lard gras (que je remplace par des lardons fumés)", "300g de noix de veau", "3 œufs", "3 c. à café de sel", "Poivre", "Noix de muscade", "3 échalotes", "Un peu de persil", "1 c. à café de quatre épices", "3 biscottes", "1 feuille de laurier", "1 sachet de gelée au Madère (si on aime !)"],
    description: "Hacher le foie, le lard, le veau et les échalottes. Ajouter les œufs, le persil et les biscottes écrasées. Assaisonner, bien mélanger le tout. Verser la préparation dans une terrine de 26cm. Poser sur le dessus la feuille de laurier. Fermer avec un couvercle. Faire cuire au bain-marie au four th7 ou 200°C pendant 1h30. (souvent plus !) Laisser refroidir et verser la gelée sur le dessus.",
    name_en: "Pork Terrine",
    description_en: "Chop the liver, bacon, veal, and shallots. Add the eggs, parsley, and crushed rusks. Season and mix everything well. Pour the mixture into a 26-cm terrine dish. Place the bay leaf on top. Cover with a lid. Bake in a water bath in the oven at 200°C for 1 hour and 30 minutes. (often longer!) Let cool and pour the jelly over the top.",
    ingredients_en: ["400g pork liver", "300g fatty bacon (which I substitute with smoked bacon bits)", "300g veal shank", "3 eggs", "3 tsp salt", "Pepper", "Nutmeg", "3 shallots", "A little parsley", "1 tsp four-spice mix", "3 crispbreads", "1 bay leaf", "1 packet of Madeira jelly (if you like it!)"],
    timeToCook_en: "30 minutes + 1h30 cooking time"
  },
  {
    image: "/img/gallery/img_23.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Tian de courgettes au riz",
    slug: "tian-de-courgettes-au-riz",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "30 minutes + 50 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "Zucchini Tian with Rice",
    description_en: "Rinse the olives several times under running water. Place all the ingredients in a 1-liter jar and cover with olive oil. Let them marinate for about four weeks before serving.",
    ingredients_en: ["Olives", "Garlic", "Herbs", "Olive oil"],
    timeToCook_en: "50 minutes",
    ingredients: ["4 courgettes moyennes", "4 tomates fermes", "2 oignons", "2 gousses d’ail", "100g de riz long", "6 c. à soupe d’huile d’olive", "1 c. à café de thym", "sel", "poivre"],
    description: "Portez à ébullition une casserole d’eau, salez-la et versez-y en pluie le riz. Laissez cuire 15 à 20 min suivant la nature du riz puis égouttez. Pelez et émincez finement les oignons et une gousse d’ail. Faites chauffer 2 c. à soupes d’huile d’olive dans une poêle.  Mettez-y les oignons et l’ail à fondre doucement, en remuant de temps en temps, pendant environ 10 minutes. Lorsque les oignons sont translucides, mélangez-les au riz cuit. Salez, poivrez, vérifiez l’assaisonnement. Allumez le four th 5 (env. 170°C). Lavez et essuyez les tomates et les courgettes . Coupez-les en rondelles régulières d’ ½ cm d’épaisseur. Poudrez légèrement les courgettes de sel fin et laissez dégorger quelques minutes sur su papier absorbant. Epluchez l’autre gousse d’ail. Enduisez un plat à four en terre avec une c. à soupe d’huile d’olive et frottez-le avec la gousse d’ail. Etalez au fond le mélange de riz et d’oignons en une seule couche. Couvrez de rondelles de tomates et de courgettes, en intercalant harmonieusement les couleurs. Saupoudrez avec une c. à café de thym, salez, poivrez, arrosez avec 3 c. à soupe d’huile d’olive. Faites cuire 50 minutes environ au four. Servez chaud ou tiède. Variante : vous pouvez ajouter de fines rondelles d’aubergines (dégorgées) en alternance avec les autres légumes, mais également des lamelles de fromage de chèvre frais et des olives noires hachées. Vous préparerez ainsi un plat complet, idéal pour le dîner. Tour de main : Pour couper facilement tomates et courgettes en rondelles, utilisez toujours un couteau-scie, ce qui facilite l’opération sans risquer de déformer les rondelles. Si les courgettes ont une peau très fine, ne les pelez pas ; en revanche, si elle vous semble un peu épaisse, épluchez-les avec un couteau économe, en laissant une lanière de peau sur deux, c’est plus joli."
  },
  {
    image: "/img/gallery/img_7.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    authorName: "Loulou",
    name: "Olives à la niçoise",
    slug: "olives-a-la-niçoise",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "Niçoise Olives",
    description_en: "Rinse the olives several times under running water. Place all the ingredients in a 1-liter jar and cover with olive oil. Let them marinate for about four weeks before serving.",
    ingredients_en: ["Olives", "Garlic", "Herbs", "Olive oil"],
    timeToCook_en: "20 minutes prep + marination weeks",
    ingredients: ["3 bocaux d’olives arbequinas de 350g", "1 bouquet garni", "4 gousses d’ail", "4 piments oiseaux", "huile d’olive"],
    description: "Rincer les olives plusieurs fois à l’eau claire. Mettre tous les ingrédients dans un bocal de 1l et recouvrir avec l’huile d’olive. Laisser macérer environ quatre semaines avant dégustation."
  },
  {
    image: "",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "La frita",
    slug: "la-frita",
    season: "Été",
    type: "Apéritif",
    timeToCook: "30 minutes + 30 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "La Frita (vegetable antipasto)",
    description_en: "Slow-cooked mixed vegetables (onion, peppers, tomatoes) with olive oil and herbs; served as an antipasto.",
    ingredients_en: ["1/3 onion", "1/3 red pepper", "1/3 green pepper", "1/3 tomato", "olive oil", "herbs"],
    timeToCook_en: "30 minutes + 30 minutes cooking time",
    ingredients: ["1/3 d’oignons blancs et rouges", "1/3 de poivrons rouges verts et jaunes", "1/3 de tomates pas trop mûres", "huile d’olive", "vinaigre balsamique", "câpres", "ail pressé", "herbes aromatiques au choix", "sel", "poivre"],
    description: "Couper l’ensemble des légumes en petits dés. Faire cuire très lentement chaque légume à part. Puis les mélanger doucement et prolonger la cuisson 15 à 20 minutes. La veille de la cuisson, préparer une vinaigrette corsée. Egoutter un peu la frita pour éliminer le jus de tomates. Ajouter la vinaigrette, mélanger et laisser au frais. Servir sur des petites cuillères ou en verrines."
  },
  {
    image: "",
    authorImg: "/img/top-chiefs/img_3.jpg",
    authorName: "Mamie Colette",
    name: "Suprême au chocolat",
    slug: "supreme-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes + 25 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Technique",
    isVegetarian: true,
    name_en: "Chocolate Supreme",
    description_en: "Separate the egg whites from the yolks. Whisk the yolks and sugar until pale and fluffy. Place the 250g of chopped chocolate in a saucepan. Melt over a double boiler. Add to the yolks and mix. Add the ground almonds, baking powder, cornstarch, and softened butter. Then fold in the 3 egg whites beaten to stiff peaks with a pinch of salt. Mix gently. Pour into a buttered pan and sprinkle with granulated sugar. Fill only 3/4 full, and bake in a preheated oven at 210°C (320°F). Bake quickly to keep the center of the cake creamy (25 min). Let cool slightly in the pan. Turn out onto a wire rack and let cool completely. Decorate as desired with whipped cream and candied cherries.",
    ingredients_en: ["250 g butter", "250 g dark chocolate", "250 g sugar", "200 g almonds, ground", "3 eggs", "Flour"],
    timeToCook_en: "30 minutes + 25 minutes cooking time",
    ingredients: ["3 cuillères à soupe de Maïzena", "2 sachets de sucre vanillé", "1/2 sachet de levure", "6 oeufs", "250g de sucre", "250g de chocolat", "100g d’amandes en poudre", "250g de beurre"],
    description: "Séparer les blancs et les jaunes des oeufs. Fouetter les jaunes et le sucre jusque’à ce qu’ils blanchissent. Mettre les 250g de chocolat brisés dans une casserole. Faire fondre au bain-marie. Ajouter aux jaunes, mélanger. Ajouter la poudre d'amandes avec la levure, la maïzena et le beurre ramolli. Puis 3 blancs d'oeufs battus en neige avec la pincée de sel. Mélanger délicatement. Verser dans le moule beurré et saupoudrer de sucre semoule. Ne remplir qu'aux 3/4, et mettre à four chaud 210°C (th. 6-7). Cuire rapidement pour conserver le milieu de la pâte crémeuse (25 min). Laisser tiédir dans le moule. Démouler sur une grille et laisser refroidir - Décorer à volonté de chantilly et de cerises confites."
  },
  {
    image: "/img/gallery/img_38.jpg",
    authorImg: "/img/top-chiefs/img_3.jpg",
    authorName: "Mamie Colette",
    name: "Granité de pommes",
    slug: "granite-de-pommes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes + 25 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "Apple granita",
    description_en: "For the granita, use a fork to mix the flour and sugar until smooth (no lumps), then add the butter, cinnamon, and vanilla sugar. Make a crumb mixture. Cut the apples into thin slices. Sauté them in a skillet in a sugar syrup (water and 100g of sugar). Sauté them quickly. Let cool. Place the apples in a 26 cm baking dish and spread the crumble mixture over them. Bake at 210°C for about 25 minutes. Serve warm with very cold pastry cream.",
    ingredients_en: ["4 apples", "1 tsp cinnamon", "sugar to taste"],
    timeToCook_en: "30 minutes + 25 minutes cooking time",
    ingredients: ["75g de farine", "1 cuillère à café rase de canelle", "1 pincée de sel", "25g de sucre en poudre", "50g de beurre ramolli", "4 grosses pommes", "50g de sucre", "50g d'eau"],
    description: "Pour le granité, mélanger à la fourchette pour être bien fluide (pas de grumeaux) la farine, le sucre puis le beurre la canelle et le sucre vanillé. Faire un sable. Couper les pommes en tranches fines. Les faire sauter dans une poêle dans un sirop de sucre (eau et 100g de sucre). Les faire revenir rapidement. Laisser refroidir. Mettre les pommes dans un moule de 26 cm environ et répendre le sable. Mettre au four à 210°C environ 25’. Servir tiède avec une crème pâtissière très froide."
  },
  {
    image: "/img/gallery/img_37.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Crème pâtissière",
    slug: "creme-patissiere",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    name_en: "Custard",
    description_en: "Bring the milk to a boil with the split vanilla bean. In a mixing bowl, beat the egg yolks with the sugar until pale, then add the flour. Gradually pour the hot milk over the mixture and return everything to the saucepan. Cook over low heat until thickened. Then transfer to a baking sheet and cover with plastic wrap, making sure it touches the surface. Set aside.",
    ingredients_en: ["Milk", "Egg yolks", "Sugar", "Vanilla", "Flour"],
    timeToCook_en: "30 minutes",
    ingredients: ["1/2l de lait", "4 oeufs dont 3 jaunes", "1 pincée de sel", "100g de sucre", "1 gousse  de vanille", "40g de farine"],
    description: "Faire bouillir le lait avec la gousse de vanille fendue. Dans un cul-de-poule, blanchir les jaunes d'oeufs avec le sucre, puis ajouter la farine. Verser le lait chaud dessus petit à petit et remettre le tout dans la casserole. Cuire à feu doux et faire épaissir. Débarrasser ensuite sur une plaque et recouvrir d'un papier film au contact. Réserver."
  },
  {
    image: "/img/gallery/img_6.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    authorName: "Mamie Marie",
    name: "Couscous",
    slug: "couscous",
    season: "Hiver",
    type: "Plat",
    timeToCook: "45min + 1h de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["300g de semoule", "4 cuisses de poulet", "4 merguez", "4 carottes", "2 oignons", "2 courgettes", "2 aubergines", "1 poivron vert", "2 poireaux", "200g de pois-chiches", "sel", "poivre", "harissa", "eau", "2 boîtes moyennes de tomates pelées", "2 boîtes de concentré de tomate", "huile d’olive"],
    description: "La veille, mettre à tremper les pois-chiches. Les faire pré-cuire afin de pouvoir retirer facilement la peau indigeste. Pour la sauce des légumes, tailler les légumes en cube. Faire revenir un oignon dans l’huile d’olive. Puis ajouter les carottes, le poivron, les courgettes et les aubergines. Couvrir d’eau. Assaisonner avec du gros sel. Ajouter les pois-chiches, une boîte de tomates pelées et une boîte de concentré de tomates. Ajouter les poireaux après 30’ de cuisson. Pour la sauce de la viande, faire revenir les cuisses de poulet, puis un oignon. Ajouter une boîte de tomates pelées et une boîte de concentré de tomates. Et au besoin un peu d’eau. Assaisonner avec un peu de gros sel et de la harissa. Pour la semoule, la verser dans un plat. La graisser avec un filet d’huile. Verser un peu d’eau bouillante pour la réhydrater. Passer une minute au micro-ondes. Faire cuire les merguez dans une poêle.",
    name_en: "Couscous",
    description_en: "The day before, soak the chickpeas. Parboil them so you can easily remove the tough skins. For the vegetable sauce, dice the vegetables. Sauté an onion in olive oil. Then add the carrots, bell pepper, zucchini, and eggplant. Cover with water. Season with coarse salt. Add the chickpeas, a can of peeled tomatoes, and a can of tomato paste. Add the leeks after 30 minutes of cooking. For the meat sauce, brown the chicken thighs, then sauté an onion. Add a can of peeled tomatoes and a can of tomato paste. Add a little water if needed. Season with a little coarse salt and harissa. For the couscous, pour it into a dish. Drizzle with a little oil. Pour in a little boiling water to rehydrate it. Microwave for one minute. Cook the merguez sausages in a skillet.",
    ingredients_en: ["300g of semolina", "4 chicken thighs", "4 merguez", "4 carrots", "2 onions", "2 zucchinis", "2 eggplants", "1 green pepper", "2 leeks", "200g of chickpeas", "salt", "pepper", "harissa", "water", "2 medium cans of peeled tomatoes", "2 cans of tomato paste", "olive oil"],
    timeToCook_en: "45min + 1h cooking time"
  },
  {
    image: "/img/gallery/img_24.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    authorName: "Mamie Marie",
    name: "Gâteau au yaourt",
    slug: "gateau-au-yaourt",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 yaourt", "1 pot d’huile de tournesol", "3 pots de sucre", "4 pots de farine", "3 oeufs", "1 sachet de levure chimique", "1 sachet de sucre vanillé"],
    description: "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients afin d’obtenir une pâte bien lisse. Verser dans un moule à manquer. Mettre à four chaud pendant environ 45 minutes.",
    name_en: "Yogurt Cake",
    description_en: "Preheat the oven to 180°C. Mix all the ingredients together until the batter is smooth. Pour into a cake pan. Bake in the preheated oven for about 45 minutes.",
    ingredients_en: ["1 yogurt", "1 pot of sunflower oil", "3 pots of sugar", "4 pots of flour", "3 eggs", "1 packet of chemical leavening agent", "1 packet of vanilla sugar"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_26.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Gâteau au yaourt sans oeufs",
    slug: "gateau-au-yaourt-sans-oeufs",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["2 yaourts natures ou aromatisés", "2 pots de sucre", "3 pots de farine", "1/2 pot d’huile de tournesol", "1 sachet de levure chimique", "1 sachet de sucre vanillé"],
    description: "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients dans un plat creux. Verser la préparation dans un moule à cake en silicone. Mettre à four chaud pendant environ 45’. Ne le démouler que lorsque le gateau est froid.",
    name_en: "Yogurt Cake without Eggs",
    description_en: "Preheat the oven to 180°C. Mix all the ingredients together until the batter is smooth. Pour into a cake pan. Bake in the preheated oven for about 45 minutes.",
    ingredients_en: ["2 yogurts", "2 pots of sugar", "3 pots of flour", "1/2 pot of sunflower oil", "1 packet of chemical leavening agent", "1 packet of vanilla sugar"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "",
    authorImg: "/img/top-chiefs/img_2.jpg",
    authorName: "Mamie Marie",
    name: "Crêpes",
    slug: "crepes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["250g de farine", "3 oeufs", "1/2l de lait", "1 à 2 cuillères de sucre", "1 cuillère d’huile", "1 pincée de sel", "1 à 2 cuillères de rhum"],
    description: "Faire une fontaine avec la farine. Y mettre les oeufs battus au fouet. Verser le lait par petites quantités. Ajouter ensuite l'huile, le sel, le sucre et le rhum. Laisser reposer une heure.",
    name_en: "Crepes",
    description_en: "Make a well in the flour. Add the beaten eggs. Pour in the milk a little at a time. Then add the oil, salt, sugar, and rum. Let rest for one hour.",
    ingredients_en: ["250g of flour", "3 eggs", "1/2l of milk", "1 to 2 tablespoons of sugar", "1 tablespoon of oil", "1 pinch of salt", "1 to 2 tablespoons of rum"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_5.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Pâté Lorrain",
    slug: "pate-lorrain",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["250 g d'échine de porc", "250 de noix de veau", "2 échalotes", "1 petit bouquet de persil", "2 gousses d'ail", "1 branche de thym", "1 oeuf", "1 dl de vin blanc sec", "1 rouleau de pâte feuilletée"],
    description: "Faire mariner les viandes la veille: Les découper en lanières puis en dés d'1 cm environ. Les placer dans un saladier puis ajouter l'ail pressé, le persil, les échalotes, le tout finement ciselé ou haché. Effeuiller le thym et mouiller avec le vin blanc. Saler, poivrer, bien mélanger et recouvrir d'un film alimentaire. Réserver au réfrigérateur 12 h. Le lendemain, préchauffer le four à 200°. Egoutter la viande. Ouvrir le rouleau de pâte en conservant sa feuille de papier sulfurisé. Déposer sur la plaque de cuisson. Disposer la farce au centre en forme de gros boudin et en laissant quelques cm libres tout autour. Rabattre les 4 côtés en commençant par les extrémités, retourner le pâté  pour que la pliure soit dessous. Badigeonner de jaune d'oeuf battu. Creuser un trou au centre pour former une cheminée et réaliser un quadrillage pour la décoration avec la pointe du couteau.  Enfourner pour 45 mn. Vérifier la cuisson et remettre 10 à 15 mn si nécessaire.",
    name_en: "Pâté Lorrain",
    description_en: "Marinate the meats the day before: Cut them into strips and then into 1 cm cubes. Place them in a bowl and add the pressed garlic, parsley, shallots, all finely chopped or minced. Strip the thyme and moisten with the white wine. Season with salt and pepper, mix well, and cover with plastic wrap. Refrigerate for 12 hours. The next day, preheat the oven to 200°C. Drain the meat. Open the roll of puff pastry while keeping its parchment paper. Place it on the baking sheet. Place the filling in the center in the shape of a large sausage, leaving a few centimeters free all around. Fold the 4 sides starting with the ends, turn the pâté so that the seam is underneath. Brush with beaten egg yolk. Create a hole in the center to form a chimney and make a grid for decoration with the tip of a knife. Bake for 45 minutes. Check for doneness and bake for an additional 10 to 15 minutes if necessary.",
    ingredients_en: ["250 g of pork shoulder", "250 g of veal shank", "2 shallots", "1 small bunch of parsley", "2 cloves of garlic", "1 sprig of thyme", "1 egg", "1 dl of dry white wine", "1 roll of puff pastry"],
    timeToCook_en: "15 minutes + marination time"
  },
  {
    image: "/img/gallery/img_27.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    authorName: "Loulou",
    name: "Tapenade",
    slug: "tapenade",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "10 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 boîte d’olives noires dénoyautées de marque Crespo", "5 anchois au sel rincés", "1 cuillère à café de câpres", "1/2 verre d'huile d’olive"],
    description: "Mixer tous les ingrédients. Déguster sur des tartines grillées.",
    name_en: "Tapenade",
    description_en: "Blend all the ingredients together. Enjoy on grilled bread.",
    ingredients_en: ["1 can of black olives (no pits)", "5 canned anchovies", "1 teaspoon of capers", "1/2 cup of olive oil"],
    timeToCook_en: "10 minutes"
  },
  {
    image: "/img/gallery/img_19.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Fondant au chocolat",
    slug: "fondant-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 20 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de beurre", "4 oeufs", "200g de sucre", "200g de chocolat", "80g de farine"],
    description: "Faire fondre au bain-marie le chocolat et le beurre. Hors du feu, ajouter le sucre. Puis la farine. Ajouter les oeufs un par un en mélangeant bien afin d'obtenir une pâte  bien lisse. Enfourner à four chaud(220°C) pendant 5 minutes. Puis, baisser le four à 200°C pendant environ 15 minutes.",
    name_en: "Chocolate Soufflé",
    description_en: "Melt the chocolate and butter in a double boiler. Remove from heat, add the sugar, then the flour. Add the eggs one at a time, mixing well to achieve a smooth batter. Bake in a hot oven (220°C) for 5 minutes, then lower the oven to 200°C and bake for about 15 minutes.",
    ingredients_en: ["200g of butter", "4 eggs", "200g of sugar", "200g of dark chocolate", "80g of flour"],
    timeToCook_en: "10 minutes + 20 minutes cooking time"
  },
  {
    image: "/img/gallery/img_8.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Osso Bucco",
    slug: "osso-bucco",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["4 tranches de Jarret de veau", "oignons", "1 kg de tomates", "4 cuillerées à soupe d'huile", "½ citron", "1/10 | de vin blanc sec", " ¼l de bouillon", "sel", "poivre", "farine"],
    description: "Laver les morceaux de jarret, essuyez-les et passez-les dans la farine. Faire chauffer l'huile dans une cocotte, ajouter les tranches de jarret et faire dorer de tous côtés. Lorsqu'elles sont dorées, les retirer. Faire revenir les oignons et les carottes coupées en rondelles. Peler les tomates, les couper en morceaux de même que les légumes, ajouter aux oignons et laisser cuire quelques minutes à feu doux. Rajouter la viande, déglacer avec le vin blanc sec puis mouiller avec le bouillon. Faites mijoter environ 2 heures. Rectifier l'assaisonnement de l'Osso Bucco avec du jus de citron, du sel et du poivre. Accompagnez de tagliatelles fraîches.",
    name_en: "Osso Bucco",
    description_en: "Wash the veal shanks, pat them dry, and dredge them in flour. Heat the oil in a pot, add the shanks, and brown them on all sides. Once browned, remove them. Sauté the onions and carrots cut into rounds. Peel the tomatoes, cut them into pieces along with the vegetables, add to the onions, and let cook for a few minutes over low heat. Add the meat back in, deglaze with dry white wine, then moisten with broth. Simmer for about 2 hours. Adjust the seasoning of the Osso Bucco with lemon juice, salt, and pepper. Serve with fresh tagliatelle.",
    ingredients_en: ["4 veal shanks", "onions", "1 kg of tomatoes", "4 tablespoons of oil", "½ lemon", "1/10 bottle of dry white wine", " ¼l of broth", "salt", "pepper", "flour"],
    timeToCook_en: "15 minutes + 2 hours cooking time"
  },
  {
    image: "/img/gallery/img_51.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    authorName: "Mamie Marie",
    name: "Quatre-quart",
    slug: "quatre-quart",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes et 30 à 40 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["beurre", "sucre en poudre", "farine", "4 œufs", "1 citron"],
    description: "Allumez votre four à thermostat 5 (150°C). Peser les oeufs et mettre le même poids de farine de sucre et de beurre. Casser les oeufs en séparant les blancs des jaunes. Mélanger les jaunes, le sucre et le jus de citron jusqu’à ce que le mélange blanchisse. Puis ajouter le beurre tiède et fondu en pommade. Et enfin la farine. Remuer avec une cuillère en bois afin que le mélange soit bien fait. Battre ensuite les blancs en neige très fermes. Incorporer délicatement à la préparation. Beurrer un moule à cake et le remplir à moitié avec la pâte. Mettre au four préchauffé à 150°C pendant une heure. Le gâteau doit gonfler de moitié.",
    name_en: "Four-Quarter Cake",
    description_en: "Preheat your oven to 150°C (300°F). Weigh the eggs and use the same weight of flour, sugar, and butter. Crack the eggs, separating the whites from the yolks. Mix the yolks, sugar, and lemon juice until the mixture becomes pale. Then add the warm, softened butter, followed by the flour. Stir with a wooden spoon until well combined. Next, beat the egg whites until stiff peaks form. Gently fold them into the batter. Butter a loaf pan and fill it halfway with the batter. Bake in the preheated oven at 150°C for about an hour. The cake should rise by half.",
    ingredients_en: ["butter", "powdered sugar", "flour", "4 eggs", "1 lemon"],
    timeToCook_en: "20 minutes + 30 to 40 minutes cooking time"
  },
  {
    image: "/img/gallery/img_20.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Mousse au chocolat",
    authorName: "Mamie Marie",
    slug: "mousse-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 5 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["150g de chocolat", "4 oeufs"],
    description: "Casser en morceaux le chocolat et faire fondre au bain-marie avec 1 ou 2 cuillères à soupe d'eau. Travailler avec une spatule pour obtenir un mélange très lisse. Verser ensuite ce chocolat fondu dans une grande terrine. Ajouter un à un les jaunes d'oeufs en mélangeant après chaque addition. Battre les blancs en neige très fermes et les incorporer délicatement au mélange en soulevant bien pour obtenir une mousse légère. Mettre au frigo au moins trois heures avant dégustation.",
    name_en: "Chocolate Mousse",
    description_en: "Break the chocolate into pieces and melt it in a double boiler with 1 or 2 tablespoons of water. Stir with a spatula to achieve a very smooth mixture. Then pour this melted chocolate into a large bowl. Add the egg yolks one at a time, mixing after each addition. Beat the egg whites until stiff peaks form and gently fold them into the mixture, lifting well to achieve a light mousse. Refrigerate for at least three hours before serving.",
    ingredients_en: ["150g chocolate", "4 eggs"],
    timeToCook_en: "10 minutes + 5 minutes cooking time"
  },
  {
    image: "/img/gallery/img_9.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Poulet basquaise",
    authorName: "Christelle",
    slug: "poulet-basquaise",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 1h15 de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["4 cuisses de poulet", "1 oignon", "1 poivron vert", "1 poivron rouge", "2 gousses d'ail", "1/4l de bouillon de volaille", "1 grande brique de Tomate Frito", "sel", "piment d'Espelette", "huile d'olive"],
    description: "Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le poulet. Pendant ce temps, hâcher l'oignon et couper les poivrons en lanières. Après coloration, réserver le poulet. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le poulet et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz.",
    name_en: "Basque Chicken",
    description_en: "In a cast-iron pot, heat a drizzle of olive oil. Brown the chicken. Meanwhile, chop the onion and cut the peppers into strips. After browning, set the chicken aside. Sauté the onion and peppers without burning them. Return the chicken to the pot and deglaze with the broth. Pour in the can of Frito tomatoes. Add the pressed garlic. Season with Espelette pepper and salt. Let cook covered over low heat. Serve with rice.",
    ingredients_en: ["4 chicken thighs", "1 onion", "1 green pepper", "1 red pepper", "2 garlic cloves", "1/4l chicken broth", "1 large can of Frito tomatoes", "salt", "Espelette pepper", "olive oil"],
    timeToCook_en: "15 minutes + 1h15 cooking time"
  },
  {
    image: "/img/gallery/img_18.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Axoa de veau",
    authorName: "Christelle",
    slug: "axoa-de-veau",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["1kg de veau à mijoter", "1 oignon", "1 poivron vert", "1 poivron rouge", "2 gousses d'ail", "1/4l de bouillon de volaille", "1 grande brique de Tomate Frito", "sel", "piment d'Espelette", "huile d'olive"],
    description: "Couper le veau en dés de 2 cm de côtés. Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le veau. Pendant ce temps, hâcher l'oignon et couper les poivrons en carrés. Après coloration, réserver le veau. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le veau et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz.",
    name_en: "Veal Axoa",
    description_en: "Cut the veal into 2 cm cubes. In a cast-iron pot, heat a drizzle of olive oil. Brown the veal. Meanwhile, chop the onion and cut the peppers into squares. After browning, set the veal aside. Sauté the onion and peppers without burning them. Return the veal to the pot and deglaze with the broth. Pour in the can of Frito tomatoes. Add the pressed garlic. Season with Espelette pepper and salt. Let cook covered over low heat. Serve with rice.",
    ingredients_en: ["1kg veal to braise", "1 onion", "1 green pepper", "1 red pepper", "2 garlic cloves", "1/4l chicken broth", "1 large can of Frito tomatoes", "salt", "Espelette pepper", "olive oil"],
    timeToCook_en: "15 minutes + 2 hours cooking time"
  },
  {
    image: "/img/gallery/img_58.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Visitandines",
    authorName: "Mamie Marie",
    slug: "visitandines",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 15 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["50g de poudre d'amandes", "70g de farine", "150g de sucre en poudre", "4 blancs d'oeufs", "100g de beurre"],
    description: "Faire fondre le beure. Bien mélanger tous les ingrédients, puis rajouter le beurre fondu. Mettre à four modéré pendant 15 minutes environ.",
    name_en: "Visitandines",
    description_en: "Melt the butter. Mix all the ingredients well, then add the melted butter. Bake in a moderate oven for about 15 minutes.",
    ingredients_en: ["50g almond powder", "70g flour", "150g powdered sugar", "4 egg whites", "100g butter"],
    timeToCook_en: "10 minutes + 15 minutes cooking time"
  },
  {
    image: "/img/gallery/img_49.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Gâteau roulé",
    authorName: "Mamie Marie",
    slug: "gateau-roule",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 10 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Technique",
    isVegetarian: true,
    ingredients: ["2 oeufs", "4 cuillères de farine", "4 cuillères de sucre", "1 boîte de crème Mont-Blanc au chocolat", "levure chimique"],
    description: "Mettre les ingrédients sans la levure dans un récipient. Quand la pâte est lisse, mettre une cuillère à café de levure. Verser sur une plaque à pâtisserie couverte d'une feuille de papier sulfurisé. Cuire à four chaud (210°C) 5 à 10 minutes. Démouler sur un linge humide saupoudré de sucre. Étaler une couche de crème Mont-Blanc. Rouler le gâteau.",
    name_en: "Rolled Cake",
    description_en: "Put the ingredients except for the leavening agent in a bowl. When the batter is smooth, add a teaspoon of leavening agent. Pour onto a baking sheet covered with parchment paper. Bake in a hot oven (210°C) for 5 to 10 minutes. Unmold onto a damp cloth sprinkled with sugar. Spread a layer of Mont-Blanc chocolate cream. Roll the cake.",
    ingredients_en: ["2 eggs", "4 tablespoons of flour", "4 tablespoons of sugar", "1 can of Mont-Blanc chocolate cream", "chemical leavening"],
    timeToCook_en: "20 minutes + 10 minutes cooking time"
  },
  {
    image: "/img/gallery/img_12.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Clafoutis aux pommes",
    authorName: "Christelle",
    slug: "clafoutis-aux-pommes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 œufs", "9 cuillerées à soupe de sucre semoule", "1 pincée de sel", "5 cuillerées à soupe de farine", "1/4l de lait", "60g de beurre", "4 ou 5 pommes", "1 sachet de sucre vanillé"],
    description: "Couper les pommes en tranches pas trop fines. Allumer le four à 180°C. Battre les œufs entiers en omelette, ajouter le sel et le sucre semoule. Bien mélanger. Tamiser la farine et la jeter en pluie dans les œufs. Mélanger jusqu'à ce que le mélange soit bien lisse. Faire fondre la moitié du beurre dans le four et l’ajouter à la pâte, une fois légèrement refroidi. Délayer enfin avec le lait. Beurrer un plat en verre. Disposer les pommes dans ce plat. Verser la pâte dessus. Parsemer de quelques noisettes de beurre. Faire cuire à four moyen (jusqu'à ce que le dessus commence à dorer). Dès la sortie du four, saupoudrer de sucre vanillé. Servir tiède.",
    name_en: "Apple Clafoutis",
    description_en: "Cut the apples into not too thin slices. Preheat the oven to 180°C. Beat the whole eggs in an omelette, add the salt and granulated sugar. Mix well. Sift the flour and sprinkle it over the eggs. Mix until the mixture is smooth. Melt half of the butter in the oven and add it to the batter once slightly cooled. Finally, dilute with the milk. Butter a glass dish. Arrange the apples in this dish. Pour the batter over them. Sprinkle with a few knobs of butter. Bake in a medium oven (until the top starts to brown). As soon as it comes out of the oven, sprinkle with vanilla sugar. Serve warm.",
    ingredients_en: ["4 eggs", "9 tablespoons of semolina sugar", "1 pinch of salt", "5 tablespoons of flour", "1/4l milk", "60g butter", "4 or 5 apples", "1 packet of vanilla sugar"],
    timeToCook_en: "20 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_21.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Île flottante",
    authorName: "Mamie Marie",
    slug: "ile-flottante",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 20 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1/2 litre de lait", "4 jaunes d'œufs", "75g de sucre", "1/2 bâton de vanille", "4 blancs d'œufs", "1 pincée de sel", "25g de sucre"],
    description: "Crème anglaise : dans un récipient, travailler les jaunes d'œufs avec le sucre, ajouter doucement le lait bouillant, sans cesser de tourner. Verser dans une casserole et faire épaissir à feu doux (la crème ne doit surtout pas bouillir). Dès que le mélange nappe la cuillère en bois, verser dans un compotier et mettre au frais. Préparer ensuite la neige. Mettre à bouillir de l'eau et battre les blancs en attente avec 1 pincée de sel; sucrer. Le mélange doit être très ferme. Quand l'eau bout, régler le feu de manière à obtenir un simple frémissement en surface. Pocher alors les blancs par cuillerées, en comptant 1 mn pour chaque face. Egoutter sur du papier absorbant et disposer sur la crème comme des pétales. Servir froid.",
    name_en: "Floating Island",
    description_en: "English Cream: In a bowl, work the egg yolks with the sugar, then slowly add the boiling milk, stirring constantly. Pour into a saucepan and thicken over low heat (the cream should not boil). As soon as the mixture coats the wooden spoon, pour into a serving dish and chill. Next, prepare the meringue. Bring water to a boil and beat the egg whites with a pinch of salt until stiff; sweeten. The mixture should be very firm. When the water boils, adjust the heat to achieve a gentle simmer on the surface. Poach the egg whites by spoonfuls, counting 1 minute for each side. Drain on paper towels and arrange on top of the cream like petals. Serve cold.",
    ingredients_en: ["1/2 litre de lait", "4 jaunes d'œufs", "75g de sucre", "1/2 bâton de vanille", "4 blancs d'œufs", "1 pincée de sel", "25g de sucre"],
    timeToCook_en: "20 minutes + 20 minutes cooking time"
  },
  {
    image: "/img/gallery/img_22.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte tatin",
    authorName: "Christelle",
    slug: "tarte-tatin",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 55 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de farine", "100g de beurre", "1 pincée de sucre", "1 pincée de sel", "1/3 de verre d'eau", "1 kg et demi de pommes calville", "125g de beurre", "125g de sucre semoule", "1 sachet de sucre vanillé", "1/2 cuillerée à café de cannelle en poudre", "1 citron"],
    description: "Mettre dans un saladier huit cuillerées à soupe de farine. 100 grammes de beurre coupé en petits morceaux, une pincée de sucre et une pincée de sel. Mélanger en pressant entre les paumes de vos mains de façon à former une pâte granuleuse. Ajouter alors un tiers de verre à moutarde d'eau. Mélanger de nouveau, toujours avec les mains, et former une boule de pâte. Mettre de côté. Peler sept grosses pommes. Couper les fruits en deux dans le sens de la hauteur. Enlever les cœurs et les pépins avec un petit couteau pointu. Allumer le four à 210°C. Dans un moule rond & bords lisses de 5 à 6 centimètres de profondeur mettre 125 grammes de beurre et 125 grammes de sucre semoule. Allumer le gaz à feu fort, poser dessus le moule. Quand le sucre commence à blondir, enlever le moule du feu et mettre dedans les demi-pommes « debout », bien serrées les unes contre les autres. Saupoudrer d'un sachet de sucre vanillé. Ajouter deux pincées de cannelle. Râper au-dessus un peu de zeste de citron. Remettre le moule sur le gaz allumé à feu doux et laisser cuire les pommes une demi-heure. Pendant ce temps, sur la table bien farinée, avec le rouleau à pâtisserie, étaler la pâte sur un demi-centimètre d'épaisseur. Les pommes ayant cuit une demi-heure, elles sont tendres et légèrement caramélisées. Enlever le moule du feu et laisser tiédir. Quand elles sont froides, recouvrir d'une couche de pâte, en évitant de la replier sur les bords extérieurs du moule. II faut que le bord de la pâte soit à l'intérieur du moule et non à l'extérieur. Mettre le moule dans le four chaud et faites cuire pendant vingt-cinq minutes. Servir cette tarte tiède ou froide en retournant le moule de façon que les pommes se trouvent sur le dessus. Ne pas démouler à la sortie du four, attendre que la tarte soit tiède.",
    name_en: "Tarte Tatin",
    description_en: "Place eight tablespoons of flour in a mixing bowl. Add 100 grams of butter cut into small pieces, a pinch of sugar, and a pinch of salt. Mix by rubbing the ingredients between your palms until the mixture forms a crumbly dough. Then add one-third of a mustard glass of water. Mix again, still using your hands, and form a ball of dough. Set aside. Peel seven large apples. Cut the apples in half lengthwise. Remove the cores and seeds with a small sharp knife. Preheat the oven to 210°C. In a round, smooth-sided baking dish 5 to 6 centimeters deep, place 125 grams of butter and 125 grams of granulated sugar. Turn the gas to high heat and place the dish on top. When the sugar begins to turn golden, remove the dish from the heat and arrange the apple halves “upright” inside, packed tightly together. Sprinkle with one packet of vanilla sugar. Add two pinches of cinnamon. Grate a little lemon zest over the top. Return the pan to the stove over low heat and let the apples cook for half an hour. Meanwhile, on a well-floured surface, use a rolling pin to roll out the dough to a thickness of half a centimeter. After cooking for half an hour, the apples are tender and slightly caramelized. Remove the pan from the heat and let cool.Once they have cooled, cover them with a layer of dough, taking care not to fold it over the outer edges of the pan. The edge of the dough should be inside the pan, not outside. Place the pan in the hot oven and bake for twenty-five minutes. Serve this tart warm or cold by turning the pan upside down so that the apples are on top. Do not remove from the pan immediately after taking it out of the oven; wait until the tart is warm.",
    ingredients_en: ["200g flour", "100g butter", "1 pinch of sugar", "1 pinch of salt", "1/3 cup water", "1½ kg Calville apples", "125g butter", "125g granulated sugar", "1 packet vanilla sugar", "1/2 teaspoon ground cinnamon", "1 lemon"],
    timeToCook_en: "15 minutes + 55 minutes cooking time"
  },
  {
    image: "/img/gallery/img_10.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Paëlla",
    authorName: "Christelle",
    slug: "paella",
    season: "Été",
    type: "Plat",
    timeToCook: "1 heure + 50 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["4 cuisses de poulet", "1/2 chorizo", "300g de crevettes", "1l de moules", "300g de riz", "1dl d'huile", "1 petite boîte de petits pois", "1 poivron vert", "1 boîte de coeurs d'artichaut", "1 grande brique de Tomate frito", "sel", "safran", "bouillon (3 fois le volume du riz, env. 3/4l)"],
    description: "Faire chauffer l'huile, d'olive de préférence, dans la paëlla, saler et faire revenir dedans le chorizo, puis le poulet. Mettre en attente dans une assiette. Faire revenir à leur tour dans la paëlla les morceaux de poivrons. Tous vos éléments sont maintenant à demi cuits. Verser le riz et faire revenir vivement pour le nacrer. Remettre les morceaux de viande dans la paëlla, éparpiller les petits-pois et les coeurs d’artichaut, disposer les moules tout autour comme les pétales d'une marguerite, puis les crevettes. Mouiller enfin avec le bouillon bouillant dans lequel vous avez mis le safran et la Tomate frito. Faire partir l'ébullition sur feu vif, puis régler le feu pour que la paella mijote 20 minutes à peu près. Au bout de ce temps, le riz doit avoir absorbé tout le bouillon. Décorer de quelques quartiers de citron et servir tel que dans le plat de cuisson.",
    name_en: "Paella",
    description_en: "Heat the oil (preferably olive oil) in the paella pan, season with salt, and sauté the chorizo, followed by the chicken. Set aside on a plate. Next, sauté the bell pepper pieces in the paella pan. All your ingredients are now half-cooked. Add the rice and stir-fry vigorously until it turns translucent. Return the meat to the paella pan, scatter the peas and artichoke hearts, arrange the mussels around the edges like the petals of a daisy, then add the shrimp. Finally, pour in the boiling broth in which you have dissolved the saffron and Tomate frito. Bring to a boil over high heat, then reduce the heat so the paella simmers for about 20 minutes. After this time, the rice should have absorbed all the broth. Garnish with a few lemon wedges and serve directly from the cooking pan.",
    ingredients_en: ["4 chicken thighs", "1/2 chorizo", "300g shrimp", "1 liter of mussels", "300g rice", "1dl oil", "1 small can of peas", "1 green bell pepper", "1 can of artichoke hearts", "1 large carton of Tomate Frito", "salt", "saffron", "broth (3 times the volume of the rice, approx. 3/4l)"],
    timeToCook_en: "1 hour + 50 minutes cooking time"
  },
  {
    image: "/img/gallery/img_11.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Pot-au-feu",
    authorName: "Christelle",
    slug: "pot-au-feu",
    season: "Hiver",
    type: "Plat",
    timeToCook: "30 minutes + 3h de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["800g de  paleron de boeuf", "gros sel", "poivre", "4 carottes", "4 poireaux", "4 pommes de terre", "1 oignon piqué d'un clou de girofle", "1 gousse d'ail", "1 bouquet garni"],
    description: "Dans une grand cocotte, mettre la viande, la couvrir d'eau à hauteur et porter à ébullition rapidement. Écumer régulièrement pendant 5 min, puis baisser le feu pour conserver un léger frémissement. Ajouter le gros sel, l'oignon, l'ail et le bouquet garni. Laisser cuire pendant 1 h 30. Ajouter ensuite les légumes (à l'exception des pommes de terre) et poursuivre la cuisson durant 1 h. Finir en ajoutant les pommes de terre et terminer la cuisson (30 min). Goûter le jus au terme de la cuisson : s'il n'est pas assez goûteux, en prélever 1 litre et le faire réduire de moitié. Servir la viande et les légumes sur un plat chaud et le jus dans une saucière.",
    name_en: "Pot-au-feu",
    description_en: "Place the meat in a large Dutch oven, cover it completely with water, and bring to a rapid boil. Skim off the foam regularly for 5 minutes, then lower the heat to maintain a gentle simmer. Add the coarse salt, onion, garlic, and bouquet garni. Let cook for 1 hour and 30 minutes. Then add the vegetables (except for the potatoes) and continue cooking for 1 hour. Finish by adding the potatoes and complete the cooking (30 minutes). Taste the broth at the end of cooking: if it isn’t flavorful enough, remove 1 liter and reduce it by half. Serve the meat and vegetables on a warm platter and the broth in a gravy boat.",
    ingredients_en: ["800 g beef chuck", "coarse salt", "pepper", "4 carrots", "4 leeks", "4 potatoes", "1 onion studded with a clove", "1 clove of garlic", "1 bouquet garni"],
    timeToCook_en: "30 minutes + 3 hours cooking time"
  },
  {
    image: "/img/gallery/img_13.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Blanquette de veau",
    authorName: "Christelle",
    slug: "blanquette-de-veau",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1kg de veau", "60g d'oignons", "60g de carottes", "1 bouquet garni", "1/2 cuillère à soupe de sel", "1/4 de cuillère à café de poivre", "huile d'olive", "40g de farine", "2 cuillères à soupe de crème", "125 g de champignons", "2 cuillères à soupe de vinaigre d'alcool coloré"],
    description: "Faire revenir les morceaux de viande dans une cocotte en fonte. Les réserver puis faire revenir les oignons hâchés, les carottes coupées en rondelles puis les champignons. Pendant ce temps, verser la farine dans un bol et couvrir d'eau. Bien mélanger. Remettre la viande, ajouter le mélange et le bouquet garni. Saler et poivrer. Laisser cuire lentement pendant deux heures. En fin de cuisson ajouter la crème mélangée au vinaigre. Servir avec du riz.",
    name_en: "Veal Blanquette",
    description_en: "Brown the meat pieces in a cast-iron pot. Set them aside, then sauté the chopped onions, the carrots cut into rounds, and the mushrooms. Meanwhile, pour the flour into a bowl and cover with water. Mix well. Return the meat to the pot, add the flour mixture and the bouquet garni. Season with salt and pepper. Simmer gently for two hours. At the end of cooking, add the cream mixed with vinegar. Serve with rice.",
    ingredients_en: ["1 kg veal", "60 g onions", "60 g carrots", "1 bouquet garni", "1/2 tablespoon salt", "1/4 teaspoon pepper", "olive oil", "40 g flour", "2 tablespoons cream", "125 g mushrooms", "2 tablespoons colored spirit vinegar"],
    timeToCook_en: "15 minutes + 2 hours cooking time"
  },
  {
    image: "/img/gallery/img_14.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Lasagnes chèvre-épinards",
    authorName: "Christelle",
    slug: "lasagnes-chevre-epinards",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["250g de pâte à lasagnes", "350g d'épinards frais", "400g de fromage de chèvre frais", "1/2l de lait", "50g de beurre", "50g de farine", "200g d'emmental rapé", "sel", "poivre"],
    description: "Faire cuire les épinards. Préparer la béchamel. Faire fondre le beurre dans une grande casserole, ajouter la farine et laisser cuire doucement pendant 2 min, sans coloration et tout en mélangeant. Incorporer le lait au fur et à mesure à l'aide d'un fouet, puis porter à ébullition et cuire 2 min. Saler et poivrer et ajouter 1/4 litre d'eau chaude. Préchauffer le four à 180 °C. Dans un plat à lasagne, verser une louche de béchamel et 1/2 louche d'eau, puis superposer des couches de lasagne préalablement trempées dans de l'eau froide, d'épinards, de chèvre et de béchamel. Terminer avec une couche de lasagne, couvrir de béchamel et d'emmental râpé. Couvrir le plat avec du papier aluminium et l'enfourner à 180 °C pendant 20 min. Retirer ensuite l'aluminium et laisser les lasagne griller pendant 5 min. Laisser reposer 5 min puis servir.",
    name_en: "Goat Cheese and Spinach Lasagna",
    description_en: "Cook the spinach. Prepare the béchamel sauce. Melt the butter in a large saucepan, add the flour, and cook gently for 2 minutes, stirring constantly, without letting it brown. Gradually whisk in the milk, then bring to a boil and cook for 2 minutes. Season with salt and pepper, and add 1/4 liter of hot water. Preheat the oven to 180°C. In a lasagna dish, pour in a ladleful of béchamel sauce and 1/2 ladleful of water, then layer the lasagna noodles (previously soaked in cold water), spinach, goat cheese, and béchamel sauce. Finish with a layer of lasagna noodles, cover with béchamel sauce and grated Emmental cheese. Cover the dish with aluminum foil and bake at 180°C for 20 minutes. Then remove the foil and let the lasagna brown for 5 minutes. Let rest for 5 minutes, then serve.",
    ingredients_en: ["250g lasagna noodles", "350g fresh spinach", "400g fresh goat cheese", "1/2 liter milk", "50g butter", "50g flour", "200g grated Emmental cheese", "salt", "pepper"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_15.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Quiche Lorraine",
    authorName: "Christelle",
    slug: "quiche-lorraine",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 pâte brisée", "200g de lardons fumés", "5 oeufs", "20cl de crème fraîche", "200g d'emmental râpé", "poivre"],
    description: "Dans un saladier, battre les oeufs, ajouter la crème et le poivre. Mettre la pâte dans un moule à tarte. Répartir les lardons et l'emmental. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    name_en: "Quiche Lorraine",
    description_en: "In a mixing bowl, beat the eggs, then add the cream and pepper. Press the dough into a pie pan. Scatter the bacon bits and Emmental cheese over the top. Pour in the egg mixture. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
    ingredients_en: ["1 shortcrust pastry", "200g smoked bacon bits", "5 eggs", "200ml crème fraîche", "200g grated Emmental cheese", "pepper"],
    timeToCook_en: "10 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_16.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte chèvre-courgettes",
    authorName: "Christelle",
    slug: "tarte-chevre-courgettes",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 pâte brisée", "2 courgettes", "5 oeufs", "20cl de crème fraîche", "1 chèvre bûche de 300g", "thym"],
    description: "Dans un saladier, battre les oeufs, ajouter la crème. Éplucher les courgettes et les couper en rondelles. Mettre la pâte dans un moule à tarte. Répartir les rondelles de courgettes et le chèvre coupé en tranches. Verser la préparation. Parsemer de thym. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    name_en: "Goat Cheese and Zucchini Tart",
    description_en: "In a mixing bowl, beat the eggs and add the cream. Peel the zucchini and slice them into rounds. Place the dough in a pie pan. Arrange the zucchini rounds and the sliced goat cheese on top. Pour in the egg mixture. Sprinkle with thyme. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
    ingredients_en: ["1 shortcrust pastry", "2 zucchini", "5 eggs", "20 cl crème fraîche", "1 300-g log of goat cheese", "thyme"],
    timeToCook_en: "10 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_17.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Empanada au thon",
    authorName: "Christelle",
    slug: "empanada-au-thon",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["2 pâtes brisées", "2 boîtes de thon de 160g", "1 petite brique de tomate frito", "1 poivron rouge", "1 poivron vert", "safran", "2 gousses d'ail", "1 jaune d'oeuf"],
    description: "Couper les poivrons en dés. Faire cuire les poivrons dans une poële avec de l'huile d'olive. Ajouter le thon émietté, la tomate frito, l'ail pressé et le safran. Laisser mijoter le tout quelques minutes à feu doux. Mettre un rouleau de pâte sur la sol du four. Répartir la préparation. Positionner le second rouleau par dessus en ayant préalablement fait une cheminée au centre et un quadrillage. Replier les bords et dorer avec le jaune d'oeuf. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte. Merci à Sandra pour m'avoir fait découvrir cette recette!",
    name_en: "Tuna Empanada",
    description_en: "Dice the bell peppers. Sauté the bell peppers in a skillet with olive oil. Add the flaked tuna, tomato sauce, minced garlic, and saffron. Let everything simmer for a few minutes over low heat. Place one sheet of dough on the bottom of the baking pan. Spread the mixture evenly over the dough. Place the second sheet of dough on top, having first cut a small hole in the center and a lattice pattern on the surface. Fold the edges over and brush with egg yolk. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad. Thanks to Sandra for introducing me to this recipe!",
    ingredients_en: ["2 sheets of shortcrust pastry", "2 160-g cans of tuna", "1 small carton of tomato sauce", "1 red bell pepper", "1 green bell pepper", "saffron", "2 cloves of garlic", "1 egg yolk"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_32.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Poulet au vin jaune",
    authorName: "Christelle",
    slug: "poulet-au-vin-jaune",
    season: "Hiver",
    type: "Plat",
    timeToCook: "30 minutes + 45 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["1 poulet fermier coupé en morceaux", "50cl de vin Jaune", "40g de morilles déshydratées", "100g de champignons de Paris", "50cl de crème épaisse", "20g de beurre", "10cl de Madère", "2 tablettes de bouillon de volaille", "4 échalottes", "3 branches d'estragon", "20g de farine", "1 oignon", "2 gousses d'ail"],
    description: "Faire tremper les morilles dans l'eau chaude 30 minutes. Verser le madère dans une casserole. Le faire réduire. Ajouter les morilles, 0.5 tablette de bouillon de volaille. Couvrir d'eau et cuire 40 minutes. Saler le poulet côté chair. Le faire revenir côté peau. Mettre les échalottes émincées, l'oignon et l'ail et l'estragon dans un faitout avec 25cl d'eau, le vin jaune, 1.5 tablette de bouillon de volaille et les champignons coupés en lamelles. Faire chauffer à feu très vif. Puis, ajouter les morceaux de poulet et laisser cuire 15 minutes. Sortir les blancs car ils cuisent plus vite. Travailler le beurre en pommade avec la farine. Lorsque les autres morceaux de poulet sont cuits, les retirer ainsi que l'estragon. Faire réduire le jus de cuisson(presque à sec), ajouter alors le beurre manié puis la crème fraîche. Laisser cuire 5 minutes en remuant. Remettre les morceaux de poulet en les nappant avec la sauce, puis ajouter les morilles égouttées. Servir dans un plat chaud saupoudré d'estragon frais. Vous pouvez l'accompagner de riz blanc, de pâtes fraîches, de haricots verts, de pomme de terre vapeur ou mieux encore de polenta frite.",
    name_en: "Chicken with Yellow Wine",
    description_en: "Soak the morels in hot water for 30 minutes. Pour the Madeira wine into a saucepan. Reduce it. Add the morels and half a chicken bouillon cube. Cover with water and cook for 40 minutes. Season the chicken on the meat side with salt. Sear it on the skin side. Place the minced shallots, onion, garlic, and tarragon in a large pot with 250 ml of water, the yellow wine, 1.5 chicken bouillon cubes, and the sliced mushrooms. Bring to a boil over high heat. Then, add the chicken pieces and cook for 15 minutes. Remove the breasts as they cook faster. Cream the butter with the flour. When the other chicken pieces are cooked, remove them along with the tarragon. Reduce the cooking liquid (until almost dry), then add the butter mixture followed by the crème fraîche. Cook for 5 minutes, stirring constantly. Return the chicken pieces to the pan, coating them with the sauce, then add the drained morels. Serve in a warm dish sprinkled with fresh tarragon. You can serve it with white rice, fresh pasta, green beans, steamed potatoes, or better yet, fried polenta.",
    ingredients_en: ["1 free-range chicken, cut into pieces", "50 cl of Vin Jaune", "40 g of dried morels", "100g button mushrooms", "50cl heavy cream", "20g butter", "10cl Madeira", "2 chicken bouillon cubes", "4 shallots", "3 sprigs of tarragon", "20g flour", "1 onion", "2 cloves of garlic"],
    timeToCook_en: "30 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_31.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Polenta frite",
    authorName: "La Mémette",
    slug: "polenta-frite",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de polenta", "60cl de bouillon de légumes", "40cl de lait", "25g de beurre", "40g de parmesan", "4 cuillères à soupe d'huile d'olive"],
    description: "Dans une casserole, porter à ébullition le bouillon et le lait. Verser en pluie la polenta et remuer énergiquement. Ajouter le parmesan et faire cuire 5 minutes. Étaler la polenta sur une plaque beurrée. Laisser refoirdir. Détailler la polenta à l'emporte pièce. Verser l'huile d'olive dans la poêle, faire dorer environ 3 minutes de chaque côté selon la grosseur.",
    name_en: "Fried Polenta",
    description_en: "In a saucepan, bring the broth and milk to a boil. Gradually sprinkle in the polenta and stir vigorously. Add the Parmesan cheese and cook for 5 minutes. Spread the polenta onto a buttered baking sheet. Let cool. Cut the polenta into shapes using a cookie cutter. Pour the olive oil into a skillet and cook until golden brown, about 3 minutes per side, depending on thickness. ",
    ingredients_en: ["200 g polenta", "600 ml vegetable broth", "400 ml milk", "25 g butter", "40 g Parmesan cheese", "4 tablespoons olive oil"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_47.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Cocktail de Champagne aux framboises",
    authorName: "La Mémette",
    slug: "cocktail-de-champagne-aux-framboises",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "10 minutes",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 bouteille de Champagne", "Cointreau", "sirop de citron vert", "sucre de canne", "250g de framboises surgelées"],
    description: "Choisir un joli contenant transparent avec une large ouverture. La bouteille de Champagne doit être bien fraîche. Mettre dans l'ordre une louche de cointreau, une louche de citron vert, une louche de sucre de canne. Pencher un peu le contenant et verser doucement le Champagne sur le rebord. Mélanger très légèrement en versant les framboises surgelées. Servir à la louche, de préférence dans des coupes ou des verres aux bords un peu larges",
    name_en: "Champagne Cocktail with Raspberries",
    description_en: "Choose a beautiful transparent container with a wide opening. The bottle of Champagne should be well chilled. In order, pour a ladle of Cointreau, a ladle of lime syrup, and a ladle of cane sugar. Tilt the container slightly and slowly pour the Champagne over the edge. Stir very gently while adding the frozen raspberries. Serve with a ladle, preferably in coupes or glasses with slightly wide rims.",
    ingredients_en: ["1 bottle of Champagne", "Cointreau", "lime syrup", "cane sugar", "250g of frozen raspberries"],
    timeToCook_en: "10 minutes"
  },
  {
    image: "/img/gallery/img_44.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Tuiles aux amandes",
    authorName: "La Mémette",
    slug: "tuiles-aux-amandes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 5 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 blancs d'oeufs", "2 jaunes", "125g d'amandes éffilées", "200g de sucre semoule", "2 sachets de sucre vanillé", "100g de farine", "80g de beurre fondu"],
    description: "Préchauffer le four à 180°C. Battre les blancs avec le sucre et le sucre vanillé à la main au moins 4 minutes. Ajouter la farine, le beurre, les jaunes et les amandes. Mettre du papier sulfurisé sur une plaque de cuisson. Mettre une cuillère à soupe de pâte et l'étaler. Ajouter quelques amandes au-dessus. Cela sur toute la plaque en les espaçant pour qu'elles ne se collent pas entre elles. Enfourner 4 à 5 minutes. Bien surveiller. Les sortir du four dès qu'elles soient dorées.Les décoller rapidement et les coller sur un rouleau à pâtisserie pour qu'elles en prennent la forme. Les mettre dans un bocal hermétique dès qu'elles ont refroidi. Les tuiles peuvent se conserver plusieurs semaines.",
    name_en: "Almond Biscuits",
    description_en: "Preheat the oven to 180°C. Beat the egg whites with the sugar and vanilla sugar by hand for at least 4 minutes. Add the flour, butter, egg yolks, and almonds. Place parchment paper on a baking sheet. Spoon a tablespoon of batter and spread it out. Sprinkle some almonds on top. Repeat this process across the entire baking sheet, spacing them out so they don't stick together. Bake for 4 to 5 minutes. Watch closely and remove from the oven as soon as they are golden brown. Quickly lift them off the baking sheet and drape them over a rolling pin to shape them. Store in an airtight jar once they have cooled. The biscuits can be kept for several weeks.",
    ingredients_en: ["4 egg whites", "2 yolks", "125g of blanched almonds", "200g of powdered sugar", "2 sachets of vanilla sugar", "100g of flour", "80g of melted butter"],
    timeToCook_en: "15 minutes + 5 minutes baking"
  },
  {
    image: "/img/gallery/img_48.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Caviar d'aubergines",
    authorName: "Christelle",
    slug: "caviar-d-aubergines",
    season: "Été",
    type: "Apéritif",
    timeToCook: "10 minutes + 40 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["3 grosse aubergines", "3 gousses d’ail", "6 branches de thym", "6 cuillères à soupe d’huile d’olive", "sel", "poivre"],
    description: "Préchauffer le four à 200°C. Nettoyer les aubergines et les ouvrir en 2 dans le sens de la longueur. Les déposer sur une plaque de cuisson recouverte de papier sulfurisé. Les inciser légèrement. Saler, poivrer. Déposer le thym et arroser d’un filet d’huile d’olive. Enfourner pendant 30 à 40 minutes. Avec une cuillère retirez la chair des aubergines. Mixez la avec les gousses d’ail dégermées pressées pour obtenir une purée fine. Rectifier l’assaisonnement et ajouter un filet d'huile d'olives si besoin.",
    name_en: "Eggplant Caviar",
    description_en: "Preheat the oven to 200°C. Clean the eggplants and cut them in half lengthwise. Place them on a baking sheet lined with parchment paper. Score the flesh slightly. Season with salt and pepper. Place the thyme on top and drizzle with olive oil. Bake for 30 to 40 minutes. Use a spoon to scoop out the flesh of the eggplants. Blend it with the peeled and pressed garlic cloves to achieve a smooth puree. Adjust the seasoning and add a drizzle of olive oil if needed.",
    ingredients_en: ["3 large eggplants", "3 garlic cloves", "6 sprigs of thyme", "6 tablespoons of olive oil", "salt", "pepper"],
    timeToCook_en: "10 minutes + 40 minutes cooking time"
  },
  {
    image: "/img/gallery/img_28.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte saumon et poireaux",
    authorName: "Christelle",
    slug: "tarte-saumon-poireaux",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 pâte brisée", "250g de saumon", "6 oeufs", "20cl de crème fraîche", "3 chèvre poireaux", "sel", "poivre", "huile d'olive"],
    description: "Nettoyer les poireaux et les couper en rondelles. Les mettre à cuire avec un filet d'huile d'olive. Dans un saladier, battre les oeufs, ajouter la crème, saler et poivrer. Ajouter les poireaux. Détailler le saumon en morceaux. Mettre la pâte dans un moule à tarte. Répartir les morceaux de saumon. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    name_en: "Salmon and Leek Tart",
    description_en: "Clean the leeks and slice them into rounds. Cook them with a drizzle of olive oil. In a mixing bowl, beat the eggs, add the cream, season with salt and pepper. Add the leeks. Cut the salmon into pieces. Place the dough in a pie pan. Scatter the salmon pieces on top. Pour in the egg mixture. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
    ingredients_en: ["1 shortcrust pastry", "250g of salmon", "6 eggs", "20cl of fresh cream", "3 leeks", "salt", "pepper", "olive oil"],
    timeToCook_en: "10 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Macarons",
    authorName: "Christelle",
    slug: "macarons",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "1 heure + 10 minutes de cuisson par plaque",
    averagePrice: "€",
    difficulty: "Technique",
    isVegetarian: true,
    ingredients: ["200g de poudre d'amandes", "200g de sucre glace", "150g de blancs d'oeuf", "200g de sucre en poudre", "5cl d'eau", "1g de colorant alimentaire en poudre"],
    description: "Préchauffer le four à 140°C. Pour colorer les coques avec du cacao, diminuer la quantité de poudre d'amandes: pour 30g de cacao il ne faut que 170g de poudre d'amandes. Verser la poudre d'amande et le sucre glace ,et le cacao le cas échéant, dans un mixeur. Faire tourner pendant 30 secondes pour affiner le mélange (tant pour tant), puis tamiser. Dans une casserole, mélanger l'eau et le sucre semoule avec une spatule et cuire à 118-119 °C. Avant d'atteindre cette température, mettre 75g de blancs dans la cuve d'un batteur et les monter. Lorsque le sucre a atteint la bonne température, le verser sur les blancs montés en laissant couler un filet du sirop le long de la paroi du bol. Ajouter le colorant en poudre si nécessaire. Continuer à fouetter ensuite jusqu'à refroidissement de la meringue. Verser le reste de blancs d’œufs sur le tant pour tant. Incorporer une petite partie de la meringue froide à ce mélange, puis ajouter le reste petit à petit en macaronant la pâte. Remplir une poche à douille avec cette préparation et dresser les macarons sur du papier sulfurisé. Lâcher la plaque de 50cm de hauteur afin de chasser les bulles d'air. Laisser crôuter 15 minutes. Enfourner pendant 10 minutes en tournant la plaque à mi-cuisson. Laisser ensuite les coques refroidir avant de les décoller du papier cuisson. Remplir une poche à douille avec la préparation choisie. Coller les coques deux par deux.",
    name_en: "Macarons",
    description_en: "Place eight tablespoons of flour in a mixing bowl. Add 100 grams of butter cut into small pieces, a pinch of sugar, and a pinch of salt. Mix by rubbing the ingredients between your palms until the mixture forms a crumbly dough. Then add one-third of a mustard glass of water. Mix again, still using your hands, and form a ball of dough. Set aside. Peel seven large apples. Cut the apples in half lengthwise. Remove the cores and seeds with a small sharp knife. Preheat the oven to 210°C. In a round, smooth-sided baking dish 5 to 6 centimeters deep, place 125 grams of butter and 125 grams of granulated sugar. Turn the gas to high heat and place the dish on top. When the sugar begins to turn golden, remove the dish from the heat and arrange the apple halves “upright” inside, packed tightly together. Sprinkle with one packet of vanilla sugar. Add two pinches of cinnamon. Grate a little lemon zest over the top. Return the pan to the stove over low heat and let the apples cook for half an hour. Meanwhile, on a well-floured surface, use a rolling pin to roll out the dough to a thickness of half a centimeter. After cooking for half an hour, the apples are tender and slightly caramelized. Remove the pan from the heat and let cool.Once they have cooled, cover them with a layer of dough, taking care not to fold it over the outer edges of the pan. The edge of the dough should be inside the pan, not outside. Place the pan in the hot oven and bake for twenty-five minutes. Serve this tart warm or cold by turning the pan upside down so that the apples are on top. Do not remove from the pan immediately after taking it out of the oven; wait until the tart is warm.",
    ingredients_en: ["200g flour", "100g butter", "1 pinch of sugar", "1 pinch of salt", "1/3 cup water", "1½ kg Calville apples", "125g butter", "125g granulated sugar", "1 packet vanilla sugar", "1/2 teaspoon ground cinnamon", "1 lemon"],
    timeToCook_en: "1 hour + 10 minutes baking time per tray"
  },
  {
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Ganache chocolat blanc gingembre",
    authorName: "Christelle",
    slug: "ganache-chocolat-blanc-gingembre",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de chocolat blanc", "20g de gingembre", "10cl de crème liquide entière"],
    description: "Faire fondre le chocolat blanc au bain-marie. Peler le gingembre et le râper. Dans une casserole, disposer la crème avec le gingembre, puis porter à ébullition. Verser en 3 fois sur le chocolat fondu. Laisser prendre au réfrigérateur.",
    name_en: "White Chocolate and Ginger Ganache",
    description_en: "Melt the white chocolate in a double boiler. Peel and grate the ginger. In a saucepan, combine the cream and ginger, then bring to a boil. Pour the mixture over the melted chocolate in three batches. Let set in the refrigerator.",
    ingredients_en: ["200 g white chocolate", "20 g ginger", "10 cl heavy cream"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Gelée de framboises et fève de Tonka",
    authorName: "Christelle",
    slug: "gelee-de-framboises-et-feve-de-tonka",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de framboise surgelées", "120g de sucre", "1g d'Agar Agar, 1/2 fève de Tonka"],
    description: "Mettre le sucre dans une poêle, laisser colorer jusqu'à obtention d'un caramel, puis ajouter les framboises surgelées et la fève de tonka râpée. Laisser évaporer l'eau jusqu'à obtenir une marmelade. Puis porter à ébullition 1 minute avec l'agar-agar. Laisser prendre au réfrigérateur.",
    name_en: "Raspberry and Tonka Bean Jelly",
    description_en: "Place the sugar in a pan, let it brown until it turns into caramel, then add the frozen raspberries and the grated tonka bean. Let the liquid evaporate until it becomes a jam. Then bring to a boil for 1 minute with the agar-agar. Let it set in the refrigerator.",
    ingredients_en: ["200 g raspberries", "120 g sugar", "1 g agar-agar", "1/2 tonka bean"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_30.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Panacotta coulis de framboises",
    authorName: "Christelle",
    slug: "panacotta-coulis de framboises",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["3 feuilles de gélatine de 2g", "40cl de crème liquide entière", "1 gousse de vanille", "100g de sucre en poudre", "10cl d'eau", "20g de sucre en poudre", "125g de framboises fraîches"],
    description: "Mettre la gélatine à ramollir dans un bol d'eau froide. Faire bouillir 10 cl de crème liquide avec 100 g de sucre et la gousse de vanille fendue en 2. Ajouter ensuite la gélatine égouttée ainsi que le reste de crème. Verser la préparation dans des verrines individuelles et réserver au frais. Pour le coulis, laver les framboises, puis les mixer au blender avec 20g de sucre. Ajouter de l'eau si nécessaire. Réserver au frais.",
    name_en: "Panna Cotta with Raspberry Coulis",
    description_en: "Soak the gelatin in a bowl of cold water until softened. Bring 10 cl of heavy cream to a boil with 100 g of sugar and the vanilla bean split in half. Then add the drained gelatin and the remaining cream. Pour the mixture into individual serving glasses and chill. For the coulis, wash the raspberries, then blend them in a blender with 20 g of sugar. Add water if necessary. Set aside in the refrigerator.",
    ingredients_en: ["3 sheets of gelatin (2 g each)", "40 cl heavy cream", "1 vanilla bean", "100 g granulated sugar", "10 cl water", "20 g granulated sugar", "125 g fresh raspberries"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_33.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Tarte aux pommes",
    authorName: "Mamie Marie",
    slug: "tarte-aux-pommes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 35 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 pommes granny smith", "4 oeufs", "100g de sucre", "25cl de crème épaisse", "1 pâte feuilletée", "1 sachet de sucre vanillé"],
    description: "Préchauffer le four à 200 degrés. Peler les pommes. Mettre la pâte feuilletée dans un moule à tarte. Disposer les trannches de pommes. Dans un récipient, battre les oeufs, la crème et le sucre. Mettre à four chaud. À la sortie du four, parsemer de sucre vanillé.",
    name_en: "Apple Tart",
    description_en: "Preheat the oven to 200 degrees. Peel the apples. Place the puff pastry in a pie dish. Arrange the apple slices on top. In a bowl, whisk together the eggs, cream, and sugar. Bake in the preheated oven. Once removed from the oven, sprinkle with vanilla sugar.",
    ingredients_en: ["4 Granny Smith apples", "4 eggs", "100 g sugar", "25 cl heavy cream", "1 sheet of puff pastry", "1 packet of vanilla sugar"],
    timeToCook_en: "15 minutes + 35 minutes cooking time"
  },
  {
    image: "/img/gallery/img_34.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Magret de canard sauce au poivre vert",
    authorName: "Christelle",
    slug: "magret-de-canard-sauce-au-poivre-vert",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "20 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 magret de canard du sud-ouest", "poivre vert en saumure", "20cl de crème épaisse", "20cl de cognac", "60cl d'eau chaude", "4 cuillères à soupe de fond de veau", ""],
    description: "Bouillir pendant 3 minutes le cognac avec du poivre vert en grains et une autre partie écrasée au mortier. Mélanger à part l'eau chaude avec le fond de veau pour le dissoudre. Incorporer au cognac puis mettre de nouveau à bouillir pour que la sauce s'évapore d'1/4. Mettre la crème épaisse et laisser à nouveau réduire à feu doux jusqu'à ce que le mélange nappe une cuillère en bois (lorsqu'on passe son doigt la trace ne s’efface pas). Saler et poivrer et servir avec le magret.",
    name_en: "Duck Breast with Green Peppercorn Sauce",
    description_en: "A delicious and flavorful dish made with tender duck breast and a rich green peppercorn sauce.",
    ingredients_en: ["1 duck breast from the southwest", "green peppercorns in brine", "20cl of thick cream", "20cl of cognac", "60cl of hot water", "4 tablespoons of veal stock"],
    timeToCook_en: "20 minutes"
  },
  {
    image: "/img/gallery/img_35.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Confiture de poivrons rouges",
    authorName: "Christelle",
    slug: "confiture-de-poivrons-rouges",
    season: "Été",
    type: "Apéritif",
    timeToCook: "30 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1kg de poivrons rouges bio", "sucre à confiture", "safran"],
    description: "Éplucher les poivrons à l'aide d'un économe prévu à cet effet. Les mixer. Les peser puis ajouter la moitié du poids des poivrons en sucre et le safran. Faire cuire la confiture à gros bouillon jusqu'à ébullition sans cesser de remuer. Enlever l'écume si besoin. Continuer la cuisson à feu doux jusqu'à ce qu' elle fige au contact d'une assiette froide. Servir en toast avec du fromage.",
    name_en: "Red Pepper Jam",
    description_en: "Peel the bell peppers using a peeler designed for that purpose. Blend them. Weigh the blended peppers and then add half of that weight in jam sugar and saffron. Cook the jam at a rolling boil until it reaches a boil, stirring constantly. Remove any foam if necessary. Continue cooking over low heat until it sets when tested on a cold plate. Serve on toast with cheese.",
    ingredients_en: ["1kg of organic red peppers", "jam sugar", "saffron"],
    timeToCook_en: "30 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_36.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Salade de pâtes au melon et au magret fumé",
    authorName: "Christelle",
    slug: "salade-de-pates-au-melon-et-au-magret-fume",
    season: "Été",
    type: "Salade",
    timeToCook: "20 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["400g d'orecchiette", "magret fumé en tranches", "1 melon", "basilic", "huile d'olive infusée à l'ail", "parmesan"],
    description: "Faire cuire les pâtes. Pendant ce temps, faire des billes de melon. Enlever le gras du magret. Quand les pâtes sont cuites, les égoutter et les rafraîchir à l'eau froide. Égoutter à nouveau. Verser les pâtes dans un saladier. Les assaisonner avec l'huile d'olive à l'ail. Bien mélanger. Ajouter le melon, les tranches de magret et des copeaux de parmesan. Ciseler du basilic frais.",
    name_en: "Pasta Salad with Melon and Smoked Duck Breast",
    description_en: "Cook the pasta. In the meantime, make melon balls. Remove the fat from the duck breast. When the pasta is cooked, drain it and refresh it with cold water. Drain again. Place the pasta in a salad bowl. Season it with garlic-infused olive oil. Mix well. Add the melon, slices of duck breast, and Parmesan shavings. Chop fresh basil.",
    ingredients_en: ["400g of orecchiette", "sliced smoked duck breast", "1 melon", "basil", "garlic-infused olive oil", "parmesan"],
    timeToCook_en: "20 minutes"
  },
  {
    image: "/img/gallery/img_39.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tian",
    authorName: "Christelle",
    slug: "tian",
    season: "Été",
    type: "Plat",
    timeToCook: "30 minutes + 50 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1.2kg de courgettes", "1 bouquet de persil", "1 bouquet de basilic", "3 gousses d'ail", "6 oeufs", "100g de parmesan", "4 cuillères à soupe d'huile d'olive"],
    description: "Râper le courgettes et mettre dans une poêle avec l'huile d'olive. Laisser évaporer toute l'eau. Quand les courgettes commencent à dorer, retirer du feu. Battre les oeufs en omelette. Saler et poivrer. Rajouter ensuite les courgettes ainsi que le parmesan. Verser dans un moule à cake de 1.5 litres préalablement huilé. Mettre au four au bain-marie à 180°C pendant 50 minutes. Démouler et servir avec un coulis de tomates(ou pas) et une salade. Un grand merci à Cécile pour m'avoir partagé sa recette!",
    name_en: "Tian",
    description_en: "Grate the zucchini and place it in a pan with the olive oil. Let all the water evaporate. When the zucchini starts to brown, remove from heat. Beat the eggs in an omelette style. Season with salt and pepper. Then add the zucchini and Parmesan cheese. Pour into a previously oiled 1.5-liter cake mold. Bake in a water bath at 180°C for 50 minutes. Unmold and serve with tomato coulis (or not) and a salad. A big thank you to Cécile for sharing her recipe with me!",
    ingredients_en: ["1.2kg of zucchini", "1 bunch of parsley", "1 bunch of basil", "3 garlic cloves", "6 eggs", "100g of parmesan cheese", "4 tablespoons of olive oil"],
    timeToCook_en: "30 minutes + 50 minutes cooking time"
  },
  {
    image: "/img/gallery/img_40.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Cake au thon",
    slug: "cake-au-thon",
    season: "Été",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["2 boîtes de thon de 185g", "250g de filet de poisson blanc", "3 oeufs", "1 petite brique de tomate frito de 212g", "2 cuillères à soupe de farine"],
    description: "Dans un saladier, écraser le thon égoutté. Couper le filet de poisson en petit dés. Les mélanger au thon. Saler et poivrer. Ajouter les 3 oeufs, puis la sauce tomate et la farine. Bien mélanger le tout. Verser dans un moule à cake en silicone. Mettre au four à 210°C pendant 45 minutes. Servir frais accompagné d'une salade.",
    name_en: "Tuna Cake",
    description_en: "In a mixing bowl, mash the drained tuna. Cut the white fish fillet into small cubes. Mix them with the tuna. Season with salt and pepper. Add the 3 eggs, then the tomato sauce and flour. Mix everything well. Pour into a silicone cake mold. Bake at 210°C for 45 minutes. Serve chilled with a salad.",
    ingredients_en: ["2 cans of 185g tuna", "250g of white fish fillet", "3 eggs", "1 small carton of 212g tomato frito", "2 tablespoons of flour"],
    timeToCook_en: "15 minutes + 45 minutes cooking time"
  },
  {
    image: "/img/gallery/img_41.jpg",
    authorImg: "/img/top-chiefs/img_6.jpg",
    authorName: "Éponine",
    name: "Gyosas",
    slug: "gyosas",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "45 minutes + 20 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["200 g de farine", "100 ml d’eau", "1 c. à s de maïzena", "200 g de viande hachée (mélange porc-veau)", "1 gousse d’ail", "1 botte de ciboulette", "Sauce soja", "Huile de sésame"],
    description: "Faire bouillir de l’eau. Verser la farine et une pincée de sel dans un récipient puis ajouter l’eau bouillante. Pétrir et humidifier si nécessaire jusqu’à l’obtention d’une pâte bien lisse (5 à 7 minutes). Former une boule et filmer, puis laisser reposer 15 minutes. Mettre la viande hachée dans un bol. Ajouter la gousse d’ail émincée, la ciboulette finement ciselée puis saler et poivrer. Ajouter la maïzena, une cuillère à soupe de sauce soja et d’huile de sésame, puis mélanger. Fariner le plan de travail. Rouler la pâte en forme de cylindre et la découper en disques. Etaler les disques un à un le plus finement possible, jusqu’à ce que l’on puisse légèrement voir ses doigts en transparence à travers (on peut également utiliser un laminoir). Pour former les gyozas, déposer avec une fourchette de la farce dans un disque de pâte, humidifier les extrémités puis replier la partie sèche en quatre rabats sur la partie humide. Une fois que tous les gyozas sont terminés, les disposer en cercle dans un poêle (non-adhésive) et les faire dorer à l’huile de sésame. Ensuite, mélanger une cuillère à soupe de maïzena dans environ 150 ml d’eau, verser le mélange sur les gyozas puis couvrir et cuire 10 minutes à feu moyen. Retirer le couvercle et laisser dorer quelques minutes à nouveau, puis retourner la poêle dans une assiette. C’est prêt ! A déguster avec de la sauce soja, ou nature.",
    name_en: "Gyozas",
    description_en: "Boil water. Pour the flour and a pinch of salt into a bowl, then add the boiling water. Knead and moisten if necessary until you get a smooth dough (5 to 7 minutes). Form a ball, cover with plastic wrap, and let rest for 15 minutes. Place the ground meat in a bowl. Add the minced garlic clove, finely chopped chives, then season with salt and pepper. Add the cornstarch, a tablespoon of soy sauce, and sesame oil, then mix. Flour the work surface. Roll the dough into a cylinder and cut it into disks. Roll out each disk as thinly as possible until you can slightly see your fingers through it (you can also use a pasta machine). To form the gyozas, place some filling in a dough disk with a fork, moisten the edges, then fold the dry part into four flaps over the wet part. Once all the gyozas are made, arrange them in a circle in a non-stick pan and brown them in sesame oil. Then mix a tablespoon of cornstarch in about 150 ml of water, pour the mixture over the gyozas, cover and cook for 10 minutes over medium heat. Remove the lid and let them brown again for a few minutes, then flip the pan onto a plate. It's ready! Enjoy with soy sauce or plain.",
    ingredients_en: ["200g of flour", "100ml of water", "1 tablespoon of cornstarch", "200g of ground meat (pork and veal mix)", "1 garlic clove", "1 bunch of chives", "Soy sauce", "Sesame oil"],
    timeToCook_en: "45 minutes + 20 minutes cooking time"
  },
  {
    image: "/img/gallery/img_43.jpg",
    authorImg: "/img/top-chiefs/img_6.jpg",
    authorName: "Éponine",
    name: "Pâtés impériaux",
    slug: "pates-imperiaux",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "45 minutes + 15 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["300g de porc hâché", "2 boîtes de crabe", "1/2 sachet de vermicelle chinois", "1/2 sachet de champignons noirs", "2 oeufs", "2 gousses d'ail", "2 oignons", "1 petit bouquet de persil", "galettes de riz", "3 carottes"],
    description: "Faire tremper les champignons pendant 20 minutes dans de l'eau tiède et le vermicelle pendant 10 minutes dans de l'eau froide. Hâcher finement les ingrédients de la garniture, bien mélanger. Étaler les galettes sur le plan de travail et les mouiller à l'aide d'une éponge imbibée d'eau. Attendre quelques secondes pour qu'elles deviennent malléables. Les garnir de farce et les rouler. Faire chauffer l'huile dans une poêle et faire frire les rouleaux 15 minutes jusqu'à ce qu'ils soient bien dorés. Servir avec de la salade, de la menthe fraîche et de la sauce nuoc mam.",
    name_en: "Imperial Pâtés",
    description_en: "Soak the mushrooms for 20 minutes in warm water and the vermicelli for 10 minutes in cold water. Finely chop the filling ingredients, mix well. Spread the rice paper sheets on the work surface and moisten them with a sponge soaked in water. Wait a few seconds for them to become pliable. Fill them with the stuffing and roll them up. Heat the oil in a pan and fry the rolls for 15 minutes until they are golden brown. Serve with salad, fresh mint, and nuoc mam sauce.",
    ingredients_en: ["300g of ground pork", "2 cans of crab", "1/2 packet of Chinese vermicelli", "1/2 packet of black mushrooms", "2 eggs", "2 garlic cloves", "2 onions", "1 small bunch of parsley", "rice paper sheets", "3 carrots"],
    timeToCook_en: "45 minutes + 15 minutes cooking time"
  },
  {
    image: "/img/gallery/img_42.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Salade de pâtes aux crevettes",
    slug: "salade-de-pates-aux-crevettes",
    season: "Été",
    type: "Salade",
    timeToCook: "20 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["250g de torti trois couleurs", "200g de crevettes bio", "1 poivron rouge", "1 concombre pépino", "mayonnaise", "60g de parmesan"],
    description: "Faire cuire les pâtes à grande eau. Pendant ce temps tailler le concombre et le poivron en petits dés. Rincer les pâtes à l'eau froide. Mélanger les pâtes, le cocombre et le poivron dans un saladier. Napper de mayonnaise. Verser le parmesan. Bien mélanger le tout. Servir bien frais.",
    name_en: "Pasta Salad with Shrimp",
    description_en: "Cook the pasta in plenty of boiling water. In the meantime, dice the cucumber and red bell pepper. Rinse the pasta with cold water. Mix the pasta, cucumber, and bell pepper in a salad bowl. Coat with mayonnaise. Sprinkle with parmesan cheese. Mix everything well. Serve chilled.",
    ingredients_en: ["250g of pasta", "200g of fresh shrimp", "1 red bell pepper", "1 cucumber", "mayonnaise", "60g of parmesan"],
    timeToCook_en: "20 minutes"
  },
  {
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Ganache mojito",
    slug: "ganache-mojito",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["15cl de crème liquide entière", "150g de chocolat blanc", "2cl de rhum", "2 citron verts", "menthe fraîche", "60g de poudre d'amandes"],
    description: "Faire fondre le chocolat blanc au bain-marie. Laver et zester les citrons verts. Laver et effeuiller la menthe. Dans une casserole, disposer la crème avec les feuilles de menthe et les zestes de citron, puis porter à ébullition. Mixer le tout dans un blender. Verser en 3 fois sur le chocolat fondu. Terminer avec le rhum et la poudre d'amande. Refroidir la préparation. À l'aide d'une poche à douille, garnir les coques de macarons.",
    name_en: "Mojito Ganache",
    description_en: "Melt the white chocolate in a double boiler. Wash and zest the limes. Wash and leaf the mint. In a saucepan, combine the cream with the mint leaves and lime zest, then bring to a boil. Blend everything in a blender. Pour in 3 batches over the melted chocolate. Finish with the rum and almond powder. Cool the preparation. Using a piping bag, fill the macaron shells.",
    ingredients_en: ["15cl of heavy cream", "150g of white chocolate", "2cl of rum", "2 limes", "fresh mint", "60g of almond powder"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_45.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Magret séché",
    slug: "magret-seche",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "5 minutes",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["1 magret de canard", "1kg de gros sel", "thym", "poivre"],
    description: "Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines. Un grand merci à Valérie de m'avoir partagé sa recette.",
    name_en: "Dried Duck Breast",
    description_en: "Place a layer of coarse salt in the bottom of an airtight container. Add a few sprigs of thyme and place the duck breast, flesh side down, on top of the salt. Place a few more sprigs of thyme on the fat side of the duck breast. Cover thoroughly with salt. Place the covered container in the refrigerator for 24 hours. Then, rinse the duck breast under water. Dry it thoroughly. Place the duck breast in a kitchen towel. Season generously with pepper on all sides. Wrap it in the towel and return it to the bottom of the fridge for 3 to 4 weeks. A big thank you to Valérie for sharing her recipe with me.",
    ingredients_en: ["1 duck breast", "1 kg coarse salt", "thyme", "pepper"],
    timeToCook_en: "5 minutes"
  },
  {
    image: "/img/gallery/img_50.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Salade Caesar",
    slug: "salade-caesar",
    season: "Été",
    type: "Salade",
    timeToCook: "30 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["Filets de poulet", "farfalle", "roquette", "3 oeufs durs", "1 jaune d'oeuf", "parmesan", "jus de citron", "vinaigre de Xérès", "2 gousses d'ail", "filets d'anchois à l'huile", "huile d'olive", "piment d'Espelette", "crème"],
    description: "Faire cuire les oeufs durs. Dénerver et dégraisser les filets de poulet. Les saupoudrer de piment d'Espelette. Les rouler en ballotine bien serrée dans du film alimentaire. Renouveler l'opération une seconde fois. Faire cuire dans une casserole d'eau bouillante pendant une vingtaine de minutes. Faire cuire les farfalle. Laisser refroidir le tout. Pour la sauce(pour 2 personnes), dans un blender mettre un oeuf dur, un jaune d'oeuf, 5 filets d'anchois, 20g de parmesan rapé, 1 cuillère à soupe de jus de citron, 2cl de vinaigre de Xérès et l'ail pressé. Mixer le tout. Puis rajouter 5cl d'huile d'olive en filet. Ajouter une cuillère à soupe de crème pour détendre la sauce. Assaisonner avec du piment d'Espelette. Pour les amateurs, ajouter du tabasco et de la sauce Worcestershire.",
    name_en: "Caesar Salad",
    description_en: "Cook the hard-boiled eggs. Remove the nerves and fat from the chicken fillets. Sprinkle them with Espelette pepper. Roll them into a tight ballotine in plastic wrap. Repeat the process a second time. Cook in a pot of boiling water for about twenty minutes. Cook the farfalle pasta. Let everything cool down. For the sauce (for 2 people), in a blender, put one hard-boiled egg, one egg yolk, 5 anchovy fillets, 20g of grated parmesan, 1 tablespoon of lemon juice, 2cl of sherry vinegar, and pressed garlic. Blend everything together. Then add 5cl of olive oil in a thin stream. Add a tablespoon of cream to loosen the sauce. Season with Espelette pepper. For those who like it spicy, add Tabasco and Worcestershire sauce.",
    ingredients_en: ["Chicken fillets", "farfalle pasta", "arugula", "3 hard-boiled eggs", "1 egg yolk", "parmesan cheese", "lemon juice", "sherry vinegar", "2 garlic cloves", "anchovy fillets in oil", "olive oil", "Espelette pepper", "cream"],
    timeToCook_en: "30 minutes"
  },
  {
    image: "/img/gallery/img_52.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Magret séché fourré au foie gras",
    slug: "magret-seche-fourre-au-foie-gras",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "15 minutes",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["150g de foie gras frais", "1 magret de canard", "1kg de gros sel", "thym", "poivre"],
    description: "Découper une bande de foie gras d’environ 150gr. L’assaisonner avec un peu de fleur de sel et du poivre. Avec du film alimentaire, faire une ballotine avec le morceau de foie gras afin de lui donner une forme cylindrique. Placer le au congélateur afin de le faire durcir et ainsi faciliter son insertion dans le magret. Inciser le magret en son centre afin de créer une cavité suffisamment grande pour y accueillir l’insert de foie gras. Dès que le foie gras est assez dur, l’insérer dans le magret. Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines.",
    name_en: "Dried Duck Breast Stuffed with Foie Gras",
    description_en: "Cut a strip of foie gras weighing about 150 grams. Season it with a little fleur de sel and pepper. Using plastic wrap, shape the piece of foie gras into a cylinder. Place it in the freezer to harden, making it easier to insert into the duck breast. Make an incision in the center of the duck breast to create a cavity large enough to hold the foie gras insert. Once the foie gras is firm enough, insert it into the duck breast. Place a layer of coarse salt in the bottom of an airtight container. Add a few sprigs of thyme and place the duck breast, flesh side down, on the salt. Place a few more sprigs of thyme on the fat side of the duck breast. Cover well with salt. Place the closed container in the refrigerator for 24 hours. Then, rinse the duck breast under water. Dry it thoroughly. Place the duck breast in a kitchen towel. Season generously with pepper on all sides. Wrap it in the towel and return it to the bottom of the fridge for 3 to 4 weeks.",
    ingredients_en: ["150g of fresh foie gras", "1 duck breast", "1kg of coarse salt", "thyme", "black pepper"],
    timeToCook_en: "15 minutes"
  },
  {
    image: "/img/gallery/img_53.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Roulés au pesto",
    slug: "roules-au-pesto",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "20 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["Pain de mie sans croûte", "6 tranches de jambon serrano", "pesto", "mozzarella"],
    description: "Étaler les tranches de pain de mie avec un rouleau à pâtisserie sur 3 mm d'épaisseur. Répartir une très fine couche de pesto, mettre les tranches de jambon serrano par-dessus. Couper des bâtonnets de mozzarella et les disposer sur la base de pain, puis rouler l'ensemble délicatement. Avec du film alimentaire, former des ballotines bien serrées. Mettre au frais.",
    name_en: "Pesto Rolls",
    description_en: "Spread the slices of crustless white bread with a rolling pin to a thickness of 3 mm. Spread a very thin layer of pesto, place the slices of Serrano ham on top. Cut mozzarella into sticks and place them on the bread base, then roll everything up carefully. Using plastic wrap, shape into tight rolls. Chill in the refrigerator.",
    ingredients_en: ["Crustless white bread", "6 slices of Serrano ham", "pesto", "mozzarella"],
    timeToCook_en: "20 minutes"
  },
  {
    image: "/img/gallery/img_54.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Champignons au four",
    slug: "champignons-au-four",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "20 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["250g de champignons de Paris frais", "2-3 tranches de jambon serrano", "fromage frais", "piment d'Espelette"],
    description: "Enlever les pieds de champignons. Eplucher les têtes. Travailler le fromage frais (de chèvre, de brebis ou de vache au choix) en l'assaisonnant avec du piment d'Espelette. Garnir l'intérieur du champignon avec le fromage frais. Découper des morceaux de jambon, les façonner pour leur donner une forme volumineuse et les déposer sur le fromage. Mettre au four à 210°C pendant une dizaine de minutes environ.",
    name_en: "Baked Mushrooms",
    description_en: "Remove the stems from the mushrooms. Peel the caps. Work the cream cheese (goat, sheep, or cow cheese of your choice) by seasoning it with Espelette pepper. Fill the inside of the mushroom with the cream cheese. Cut pieces of ham, shape them to give them a voluminous form, and place them on top of the cheese. Bake in the oven at 210°C for about ten minutes.",
    ingredients_en: ["250g of fresh Paris mushrooms", "2-3 slices of Serrano ham", "cream cheese", "Espelette pepper"],
    timeToCook_en: "20 minutes"
  },
  {
    image: "/img/gallery/img_55.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    authorName: "Christelle",
    name: "Lomo séché",
    slug: "lomo-seche",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 filet mignon de porc de 500g au moins", "sel fin (4.5% du poids de la viande)", "sucre de canne blond (la moitié du poids du sel)", "paprika ou pimenton de la Vera(3% du poids de la viande)", "poivre du moulin", "piment d'Espelette"],
    description: "Parer la viande, peser la afin de calculer la quantité à apporter de sel, de sucre et d’épices. Mélanger le tout dans un bol pour faire l’adobado (la marinade). Saupoudrer le mélange sel,sucre et épices sur toutes les faces de la viande et masser pour bien faire adhérer le mélange sur la viande. Mettre la pièce de viande dans un sac et mettre à mariner sous-vide. Garder au réfrigérateur à 3° / 5° C. La durée de la salaison dépend de l’épaisseur de la pièce de viande. Pour un filet mignon de 6 cm de diamètre il faut 0.5 jour par cm d’épaisseur + 1 jour, soit 3 + 1 = 4 jours au sel. Retourner le sac tous les jours afin de saler et parfumer uniformément la viande. Le temps de salage passé, sortir la viande du sac. Rincer et sécher la viande avec du papier absorbant. Remettre des épices autour de la viande (environ 2% du poids). Poser la viande sur une grille au réfrigérateur à 3° / 5°C. On considère que la viande est suffisamment sèche quand elle a perdu entre 30 et 40% de son poids initial.",
    name_en: "Dried Lomo",
    description_en: "Trim the meat, weigh it to calculate the amount of salt, sugar, and spices needed. Mix everything in a bowl to make the adobado (the marinade). Sprinkle the salt, sugar, and spice mixture on all sides of the meat and massage it to ensure the mixture adheres well to the meat. Place the piece of meat in a bag and marinate it under vacuum. Keep it in the refrigerator at 3° / 5° C. The duration of salting depends on the thickness of the piece of meat. For a pork tenderloin with a diameter of 6 cm, it takes 0.5 days per cm of thickness + 1 day, so 3 + 1 = 4 days in salt. Turn the bag every day to salt and flavor the meat evenly. After the salting time has passed, remove the meat from the bag. Rinse and dry the meat with paper towels. Reapply spices around the meat (about 2% of its weight). Place the meat on a rack in the refrigerator at 3° / 5°C. The meat is considered sufficiently dry when it has lost between 30 and 40% of its initial weight.",
    ingredients_en: ["1 pork tenderloin of at least 500g", "fine salt (4.5% of the weight of the meat)", "blond cane sugar (half the weight of the salt)", "paprika or pimenton de la Vera (3% of the weight of the meat)", "freshly ground black pepper", "Espelette pepper"],
    timeToCook_en: "15 minutes"
  }
  /*{
      image: "", 
      authorImg: "/img/top-chiefs/img_1.jpg",
      authorName: "Christelle", 
      name: "", 
      slug: "", 
      season: "Hiver", 
      type: "Plat", 
      timeToCook: "", 
      averagePrice: "", 
      difficulty: "", 
      ingredients: [], 
      description: "",
      name_en: "",
      description_en: "",
      ingredients_en: [],
      timeToCook_en: ""
  },*/
];
const seasons = ["Printemps", "Été", "Automne", "Hiver", "Toutes saisons"];
const difficulties = ["Facile", "Technique"];
const averagePrices = ["€", "€€", "€€€"];
const recipeTypes = [
  "Entrée",
  "Plat",
  "Dessert",
  "Apéritif",
  "Salade",
  "Végétarien"
];
const englishTranslations = {
  "riz-au-lait": {
    name_en: "Rice pudding",
    description_en: "Split the vanilla pod and scrape. Rinse the rice. Boil the milk with vanilla and rice. Cook until the rice absorbs all the liquid. Add sugar. Cool at room temperature. Serve in glasses.",
    ingredients_en: ["1 L milk", "250 g round rice", "1 vanilla pod", "80 g sugar"],
    timeToCook_en: "30 minutes"
  },
  "terrine-de-porc": {
    name_en: "Pork terrine",
    description_en: "Chop the liver, bacon, veal and shallots. Add eggs, parsley and breadcrumbs, season well. Bake in a loaf pan in a bain-marie at 200°C for about 1h30. Cool and unmold; optionally finish with jelly.",
    ingredients_en: [
      "400 g pork liver",
      "300 g fatty bacon",
      "300 g veal",
      "3 eggs",
      "2 tsp salt",
      "Pepper",
      "Nutmeg",
      "3 shallots",
      "Parsley",
      "1 bay leaf",
      "1 packet clear jelly (optional)"
    ],
    timeToCook_en: "1h30 total"
  },
  "tarte-aux-pommes": {
    name_en: "Apple Tart",
    description_en: "Classic apple tart with caramelized apples",
    ingredients_en: ["Apples", "Pastry crust", "Butter", "Sugar", "Eggs"],
    timeToCook_en: "60 minutes"
  },
  "magret-de-canard-sauce-au-poivre-vert": {
    name_en: "Duck breast with green peppercorn sauce",
    description_en: "Duck breast with peppercorn sauce, cream and cognac",
    ingredients_en: ["Duck breast", "Green peppercorns", "Cream", "Cognac", "Stock", "Salt", "Black pepper"],
    timeToCook_en: "20 minutes"
  },
  "confiture-de-poivrons-rouges": {
    name_en: "Red pepper jam",
    description_en: "Sweet and mildly tangy jam",
    ingredients_en: ["Red peppers", "Sugar", "Vinegar", "Lemon juice"],
    timeToCook_en: "40 minutes"
  },
  "salade-de-pates-au-melon-et-au-magret-fume": {
    name_en: "Pasta salad with melon and smoked magret",
    description_en: "Cold pasta salad with melon chunks and smoked magret",
    ingredients_en: ["Pasta", "Melon", "Smoked magret", "Olive oil", "Herbs"],
    timeToCook_en: "20 minutes"
  },
  "paella": {
    name_en: "Paella",
    description_en: "Spanish rice dish with seafood and/or meat",
    ingredients_en: ["Rice", "Seafood/Meat", "Saffron", "Stock", "Tomato"],
    timeToCook_en: "60-90 minutes"
  },
  "pot-au-feu": {
    name_en: "Pot-au-feu",
    description_en: "Classic French beef stew with vegetables",
    ingredients_en: ["Beef", "Onions", "Carrots", "Leeks", "Herbs", "Water"],
    timeToCook_en: "120 minutes"
  },
  "blanquette-de-veau": {
    name_en: "Veal Blanquette",
    description_en: "Veal in a creamy white sauce",
    ingredients_en: ["Veal", "Cream", "Egg yolks", "Mushrooms", "Carrots"],
    timeToCook_en: "120 minutes"
  },
  "lasagnes-chevre-epinards": {
    name_en: "Lasagna with Goat Cheese and Spinach",
    description_en: "Layered pasta with spinach and goat cheese",
    ingredients_en: ["Pasta sheets", "Spinach", "Goat cheese", "Tomato sauce", "Béchamel"],
    timeToCook_en: "60 minutes"
  },
  "quiche-lorraine": {
    name_en: "Lorraine Quiche",
    description_en: "Savory tart with bacon and cheese",
    ingredients_en: ["Puff pastry", "Bacon", "Eggs", "Cream", "Cheese"],
    timeToCook_en: "45 minutes"
  },
  "tarte-chevre-courgettes": {
    name_en: "Goat Cheese and Zucchini Tart",
    description_en: "Zucchini tart with goat cheese",
    ingredients_en: ["Puff pastry", "Zucchini", "Goat cheese", "Cream", "Eggs"],
    timeToCook_en: "45 minutes"
  },
  "empanada-au-thon": {
    name_en: "Tuna Empanadas",
    description_en: "Savory tuna-filled pastries",
    ingredients_en: ["Empanada dough", "Tuna", "Onion", "Tomato sauce"],
    timeToCook_en: "45 minutes"
  },
  "poulet-au-vin-jaune": {
    name_en: "Chicken in Vin Jaune",
    description_en: "Chicken simmered in vin jaune and mushrooms",
    ingredients_en: ["Chicken", "Vin Jaune", "Cream", "Mushrooms"],
    timeToCook_en: "60 minutes"
  },
  "polenta-frite": {
    name_en: "Fried Polenta",
    description_en: "Crispy polenta slices fried until golden",
    ingredients_en: ["Polenta", "Water", "Oil", "Salt"],
    timeToCook_en: "30 minutes"
  },
  "cocktail-de-champagne-aux-framboises": {
    name_en: "Champagne Cocktail with Raspberry",
    description_en: "Champagne cocktail with raspberries",
    ingredients_en: ["Champagne", "Raspberries", "Sugar"],
    timeToCook_en: "10 minutes"
  },
  "tuiles-aux-amandes": {
    name_en: "Almond Tuile Cookies",
    description_en: "Crispy almond cookies",
    ingredients_en: ["Almonds", "Sugar", "Egg whites", "Butter"],
    timeToCook_en: "15 minutes"
  },
  "caviar-d-aubergines": {
    name_en: "Eggplant Caviar",
    description_en: "Smoked eggplant dip",
    ingredients_en: ["Eggplant", "Olive oil", "Garlic", "Lemon"],
    timeToCook_en: "40 minutes"
  },
  "tarte-saumon-poireaux": {
    name_en: "Salmon and Leek Tart",
    description_en: "Tart with salmon and leeks in creamy filling",
    ingredients_en: ["Puff pastry", "Salmon", "Leeks", "Cream", "Eggs"],
    timeToCook_en: "45-60 minutes"
  },
  "macarons": {
    name_en: "Macarons",
    description_en: "French almond meringue cookies with fillings",
    ingredients_en: ["Almond flour", "Powdered sugar", "Egg whites", "Sugar"],
    timeToCook_en: "60 minutes"
  },
  "ganache-chocolat-blanc-gingembre": {
    name_en: "White Chocolate Ginger Ganache",
    description_en: "Ganache with white chocolate and ginger",
    ingredients_en: ["White chocolate", "Cream", "Ginger"],
    timeToCook_en: "15 minutes"
  },
  "gelee-de-framboises-et-feve-de-tonka": {
    name_en: "Raspberry Jelly with Tonka Bean",
    description_en: "Raspberry jelly infused with Tonka bean",
    ingredients_en: ["Raspberries", "Sugar", "Agar/Agar-agar", "Tonka bean"],
    timeToCook_en: "15 minutes + chilling"
  },
  "panacotta-coulis-de-framboises": {
    name_en: "Panna Cotta with Raspberry Coulis",
    description_en: "Creamy panna cotta served with raspberry coulis",
    ingredients_en: ["Cream", "Gelatin", "Sugar", "Raspberries"],
    timeToCook_en: "20 minutes + chilling"
  },
  "magret-seche": {
    name_en: "Cured Duck Breast",
    description_en: "Duck breast cured and sliced",
    ingredients_en: ["Duck breast", "Salt", "Herbs"],
    timeToCook_en: "48 hours curing + slicing"
  },
  "salade-caesar": {
    name_en: "Caesar Salad",
    description_en: "Classic Caesar salad",
    ingredients_en: ["Romaine", "Croutons", "Parmesan", "Caesar dressing"],
    timeToCook_en: "15 minutes"
  },
  "magret-seche-fourre-au-foie-gras": {
    name_en: "Cured Duck Breast with Foie Gras",
    description_en: "Duck breast cured and filled with foie gras",
    ingredients_en: ["Duck breast", "Foie gras", "Salt", "Pepper"],
    timeToCook_en: "60 minutes"
  },
  "roules-au-pesto": {
    name_en: "Pesto Rolls",
    description_en: "Rolled pastry with pesto filling",
    ingredients_en: ["Pastry", "Pesto", "Cheese"],
    timeToCook_en: "30-40 minutes"
  },
  "champignons-au-four": {
    name_en: "Oven-Roasted Mushrooms",
    description_en: "Mushrooms baked with herbs and garlic",
    ingredients_en: ["Mushrooms", "Garlic", "Herbs", "Olive oil"],
    timeToCook_en: "25-30 minutes"
  },
  "lomo-seche": {
    name_en: "Dried Lomo",
    description_en: "Cured pork loin",
    ingredients_en: ["Pork loin", "Salt", "Spices"],
    timeToCook_en: "3-4 weeks curing (method dependent)"
  },
  "tian": {
    name_en: "Vegetable Tian",
    description_en: "Layered vegetables baked in a dish",
    ingredients_en: ["Vegetables", "Olive oil", "Herbs"],
    timeToCook_en: "40-60 minutes"
  },
  "cake-au-thon": {
    name_en: "Tuna Cake",
    description_en: "Savory tuna loaf cake",
    ingredients_en: ["Tuna", "Eggs", "Flour", "Herbs"],
    timeToCook_en: "45 minutes"
  },
  "gyosas": {
    name_en: "Gyoza",
    description_en: "Japanese dumplings filled with meat/veg",
    ingredients_en: ["Dumpling wrappers", "Filling"],
    timeToCook_en: "30 minutes"
  },
  "pates-imperiaux": {
    name_en: "Imperial Pastry",
    description_en: "Delicate pastry bites",
    ingredients_en: ["Pastry", "Fillings"],
    timeToCook_en: "40 minutes"
  },
  "salade-de-pates-aux-crevettes": {
    name_en: "Shrimp Pasta Salad",
    description_en: "Chilled pasta salad with shrimp",
    ingredients_en: ["Pasta", "Shrimp", "Vegetables", "Dressing"],
    timeToCook_en: "20 minutes"
  },
  "ganache-mojito": {
    name_en: "Mojito Ganache",
    description_en: "Chocolate ganache with a Mojito twist",
    ingredients_en: ["Chocolate", "Cream", "Mint", "Lime"],
    timeToCook_en: "15-20 minutes"
  },
  "tarte-tatin": {
    name_en: "Apple tarte tatin",
    description_en: "Caramelized apple tart",
    ingredients_en: ["Apples", "Butter", "Sugar", "Puff pastry"],
    timeToCook_en: "60 minutes"
  },
  "tian-de-courgettes-au-riz": {
    name_en: "Zucchini Tian with Rice",
    description_en: "Boil the rice, sauté onions and garlic, mix with rice. Slice tomatoes and zucchinis. Layer rice and vegetables in a baking dish with thyme and bake until tender.",
    ingredients_en: [
      "4 medium zucchinis",
      "4 ripe tomatoes",
      "2 onions",
      "2 cloves garlic",
      "100 g long-grain rice",
      "2 tbsp olive oil",
      "Thyme",
      "Salt/pepper"
    ],
    timeToCook_en: "50 minutes"
  },
  "olives-a-la-niçoise": {
    name_en: "Niçoise Olives",
    description_en: "Olives marinated with garlic, herbs and olive oil. Simple and flavorful starter.",
    ingredients_en: ["3 jars Niçoise olives", "1 bouquet garni", "4 garlic cloves", "4 bird's eye chilies", "olive oil"],
    timeToCook_en: "20 minutes prep + marination weeks"
  },
  "la-frita": {
    name_en: "La Frita (vegetable antipasto)",
    description_en: "Slow-cooked mixed vegetables (onion, peppers, tomatoes) with olive oil and herbs; served as an antipasto.",
    ingredients_en: [
      "1/3 onion",
      "1/3 red pepper",
      "1/3 green pepper",
      "1/3 tomato",
      "olive oil",
      "herbs"
    ],
    timeToCook_en: "30 minutes + cooling"
  },
  "supreme-au-chocolat": {
    name_en: "Chocolate Supreme",
    description_en: "Melt chocolate with butter, fold in sugar and almonds, then bake to create a moist center.",
    ingredients_en: [
      "250 g butter",
      "250 g dark chocolate",
      "250 g sugar",
      "200 g almonds, ground",
      "3 eggs",
      "Flour"
    ],
    timeToCook_en: "25 minutes"
  }
};
const englishTranslationsExtra = {
  "granite-de-pommes": {
    name_en: "Apple granita",
    description_en: "A refreshing apple granita with cinnamon",
    ingredients_en: ["4 apples", "1 tsp cinnamon", "sugar to taste"],
    timeToCook_en: "40 minutes"
  },
  "creme-patissiere": {
    name_en: "Custard",
    description_en: "A classic pastry cream for desserts",
    ingredients_en: ["Milk", "Egg yolks", "Sugar", "Cornstarch"],
    timeToCook_en: "15 minutes"
  },
  "gateau-au-yaourt": {
    name_en: "Yogurt cake",
    description_en: "Light yogurt cake",
    ingredients_en: ["Yogurt", "Flour", "Sugar", "Eggs"],
    timeToCook_en: "45 minutes"
  },
  "gateau-au-yaourt-sans-oeufs": {
    name_en: "Eggless yogurt cake",
    description_en: "Egg-free version of yogurt cake",
    ingredients_en: ["Yogurt", "Flour", "Sugar", "Oil"],
    timeToCook_en: "45 minutes"
  },
  "crepes": {
    name_en: "Crepes",
    description_en: "Thin French pancakes",
    ingredients_en: ["Flour", "Eggs", "Milk", "Butter"],
    timeToCook_en: "15 minutes"
  },
  "pate-lorrain": {
    name_en: "Pâté Lorraine",
    description_en: "Traditional Lorraine meat pie",
    ingredients_en: ["Pork", "Veal", "Puff pastry"],
    timeToCook_en: "60 minutes"
  },
  "tapenade": {
    name_en: "Tapenade",
    description_en: "Savory olive spread",
    ingredients_en: ["Olives", "Capers", "Anchovies", "Olive oil"],
    timeToCook_en: "10 minutes"
  },
  "fondant-au-chocolat": {
    name_en: "Chocolate fondant",
    description_en: "Warm chocolate cake with molten center",
    ingredients_en: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour"],
    timeToCook_en: "25 minutes"
  },
  "osso-bucco": {
    name_en: "Osso Bucco",
    description_en: "Braised veal shanks",
    ingredients_en: ["Veal shanks", "Onions", "Carrots", "Tomatoes", "Wine"],
    timeToCook_en: "120 minutes"
  },
  "quatre-quart": {
    name_en: "Pound cake",
    description_en: "Classic quick bread",
    ingredients_en: ["Eggs", "Sugar", "Butter", "Flour"],
    timeToCook_en: "60 minutes"
  },
  "mousse-au-chocolat": {
    name_en: "Chocolate mousse",
    description_en: "Light and airy chocolate mousse",
    ingredients_en: ["Chocolate", "Eggs", "Sugar", "Cream"],
    timeToCook_en: "15 minutes"
  },
  "poulet-basquaise": {
    name_en: "Basque chicken",
    description_en: "Chicken simmered with peppers and tomatoes",
    ingredients_en: ["Chicken", "Bell peppers", "Tomatoes", "Onion", "Oil"],
    timeToCook_en: "60 minutes"
  },
  "axoa-de-veau": {
    name_en: "Veal axoa",
    description_en: "Basque veal stew with peppers",
    ingredients_en: ["Veal", "Peppers", "Onion", "Potatoes"],
    timeToCook_en: "120 minutes"
  },
  "visitandines": {
    name_en: "Visitandines",
    description_en: "Traditional almond-based cake",
    ingredients_en: ["Almonds", "Eggs", "Sugar", "Flour"],
    timeToCook_en: "25 minutes"
  },
  "gateau-roule": {
    name_en: "Swiss roll",
    description_en: "Rolled sponge cake with filling",
    ingredients_en: ["Eggs", "Sugar", "Flour", "Cream"],
    timeToCook_en: "25 minutes"
  },
  "clafoutis-aux-pommes": {
    name_en: "Apple clafoutis",
    description_en: "Egg custard baked with apples",
    ingredients_en: ["Eggs", "Milk", "Sugar", "Flour", "Apples"],
    timeToCook_en: "40 minutes"
  }
};
function localizeRecipe(recipe, lang) {
  if (lang === "en") {
    const t = englishTranslations[recipe.slug] ?? englishTranslationsExtra[recipe.slug];
    const baseName = recipe.name_en ?? recipe.name;
    const baseDesc = recipe.description_en ?? recipe.description;
    const baseIngs = recipe.ingredients_en ?? recipe.ingredients;
    const baseTime = recipe.timeToCook_en ?? recipe.timeToCook;
    if (t) {
      return {
        name: t.name_en ?? baseName,
        description: t.description_en ?? baseDesc,
        ingredients: t.ingredients_en ?? baseIngs,
        timeToCook: t.timeToCook_en ?? baseTime
      };
    }
    if (recipe.name_en || recipe.description_en || recipe.ingredients_en || recipe.timeToCook_en) {
      return {
        name: recipe.name_en ?? baseName,
        description: recipe.description_en ?? baseDesc,
        ingredients: recipe.ingredients_en ?? baseIngs,
        timeToCook: recipe.timeToCook_en ?? baseTime
      };
    }
    return {
      name: baseName,
      description: baseDesc,
      ingredients: baseIngs,
      timeToCook: baseTime
    };
  }
  return {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    timeToCook: recipe.timeToCook
  };
}
function localizeChief(chief, lang) {
  return {
    name: chief.name,
    description: lang === "en" ? chief.description_en ?? chief.description : chief.description
  };
}
function splitCookingTime(raw) {
  const [prepRaw, cookRaw] = raw.split("+").map((s) => s.trim());
  if (!cookRaw) return { prep: prepRaw, cook: null };
  const cook = cookRaw.replace(/\s*de\s+cuisson\s*$/i, "").replace(/\s*cooking\s+time\s*$/i, "").trim();
  return { prep: prepRaw, cook };
}
const $$splitComponentImporter = () => import("./recettes._slug-DdXZ1XFx.js");
const $$splitNotFoundComponentImporter = () => import("./recettes._slug-DCxgyb9H.js");
const Route2 = createFileRoute("/recettes/$slug")({
  loader: ({
    params
  }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    const enriched = {
      ...recipe,
      name_en: recipe.name_en ?? recipe.name,
      description_en: recipe.description_en ?? recipe.description,
      ingredients_en: recipe.ingredients_en ?? recipe.ingredients,
      timeToCook_en: recipe.timeToCook_en ?? recipe.timeToCook
    };
    return {
      recipe: enriched
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {
      meta: [{
        title: "Recette — Christelle's Family Recipes"
      }]
    };
    const {
      recipe
    } = loaderData;
    const desc = recipe.description.slice(0, 155);
    return {
      meta: [{
        title: `${recipe.name} — Christelle's Family Recipes`
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: recipe.name
      }, {
        property: "og:description",
        content: desc
      }, ...recipe.image ? [{
        property: "og:image",
        content: recipe.image
      }, {
        name: "twitter:image",
        content: recipe.image
      }] : []]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MentionsLegalesRoute = Route$5.update({
  id: "/mentions-legales",
  path: "/mentions-legales",
  getParentRoute: () => Route$6
});
const LeChefRoute = Route$4.update({
  id: "/le-chef",
  path: "/le-chef",
  getParentRoute: () => Route$6
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$6
});
const ConfidentialiteRoute = Route$2.update({
  id: "/confidentialite",
  path: "/confidentialite",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const RecettesSlugRoute = Route2.update({
  id: "/recettes/$slug",
  path: "/recettes/$slug",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  ConfidentialiteRoute,
  ContactRoute,
  LeChefRoute,
  MentionsLegalesRoute,
  RecettesSlugRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Link as L,
  Route2 as R,
  localizeRecipe as a,
  recipeTypes as b,
  chiefs as c,
  seasons as d,
  difficulties as e,
  averagePrices as f,
  router as g,
  localizeChief as l,
  recipes as r,
  splitCookingTime as s,
  useI18n as u
};
