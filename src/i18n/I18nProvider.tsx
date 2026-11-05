import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Dict, type Lang } from "./dictionaries";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "cfr.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch (e) {
    if (import.meta.env.DEV) console.warn("localStorage indisponible", e);
  }
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "fr";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // L'application est rendue côté client uniquement : on lit la langue dès le
  // premier rendu, sans passer par le français (ce qui faisait clignoter le
  // français puis l'anglais pour les visiteurs anglophones).
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch (e) {
      if (import.meta.env.DEV) console.warn("localStorage indisponible", e);
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): { lang: Lang; setLang: (l: Lang) => void; t: Dict } {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
