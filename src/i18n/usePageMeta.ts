import { useEffect } from "react";

function setMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Met à jour le titre de l'onglet et la description selon la page et la langue
 * affichées. Les `head()` des routes ne sont pas utilisés ici (pas de
 * <HeadContent />), c'est donc ce hook qui renseigne ces balises.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description,
      );
    }
  }, [title, description]);
}
