import { Heart, Instagram, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";

const EMAIL = "christellefamilyrecipes@gmail.com";
const INSTAGRAM_HANDLE = "christellefamilyrecipes";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <p className="font-display text-base text-foreground">{t.footer.brand}</p>
        <p className="flex items-center gap-1.5">
          {t.footer.cookedWith} <Heart className="size-3.5 fill-primary text-primary" />{" "}
          {t.footer.inFamily}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            aria-label={t.footer.sendEmail}
            className="grid size-9 place-items-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid size-9 place-items-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Instagram className="size-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pb-6 text-center text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link to="/confidentialite" className="hover:text-foreground">
            {t.footer.privacy}
          </Link>
          <span aria-hidden>·</span>
          <Link to="/mentions-legales" className="hover:text-foreground">
            {t.footer.legal}
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
