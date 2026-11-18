import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Instagram,
  Mail,
  MessageCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nProvider";
import { usePageMeta } from "@/i18n/usePageMeta";
import type { Dict } from "@/i18n/dictionaries";
import { CONTACT_EMAIL } from "@/lib/site";

const INSTAGRAM_HANDLE = "christellefamilyrecipes";

// Clé publique Web3Forms (variable exposée par envPrefix, donc visible dans le bundle) : voir .env.example.
// Deux noms sont acceptés : WEB3FORMS_ACCESS_KEY (nom documenté) et WEB3FORMS_KEY
// (nom utilisé dans les variables d'environnement de Vercel).
const WEB3FORMS_ACCESS_KEY = (import.meta.env.WEB3FORMS_ACCESS_KEY ||
  import.meta.env.WEB3FORMS_KEY) as string | undefined;

const buildSchema = (t: Dict) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: t.contact.errName })
      .max(80, { message: t.contact.errNameLong }),
    email: z
      .string()
      .trim()
      .email({ message: t.contact.errEmail })
      .max(255, { message: t.contact.errEmailLong }),
    message: z
      .string()
      .trim()
      .min(10, { message: t.contact.errMessage })
      .max(2000, { message: t.contact.errMessageLong }),
    consent: z.literal(true, { error: t.contact.errConsent }),
  });

// Ordre des champs dans la page : sert à placer le focus sur le premier en erreur.
const FIELDS = ["name", "email", "message", "consent"] as const;
type Field = (typeof FIELDS)[number];
type FieldErrors = Partial<Record<Field, string>>;
const isField = (value: unknown): value is Field =>
  (FIELDS as readonly unknown[]).includes(value);

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

/** Message d'erreur placé sous son champ ; relié au champ par aria-describedby. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

function ContactPage() {
  const { t } = useI18n();
  usePageMeta(t.contact.metaTitle, t.contact.metaDesc);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Le bouton qui avait le focus disparaît quand le formulaire est remplacé par
  // le message de succès (et inversement) : on déplace donc le focus à la main,
  // sinon il retombe sur <body> et la personne au clavier repart du haut.
  const successRef = useRef<HTMLHeadingElement>(null);
  const wasSent = useRef(false);
  useEffect(() => {
    if (sent) successRef.current?.focus();
    else if (wasSent.current) document.getElementById("name")?.focus();
    wasSent.current = sent;
  }, [sent]);

  // L'erreur d'un champ disparaît dès que la personne le corrige.
  const clearError = (field: Field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const parsed = buildSchema(t).safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
    });

    if (!parsed.success) {
      // Une erreur par champ (la première rencontrée), affichée sous le champ.
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (isField(field) && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      // Le focus va sur le premier champ en erreur, dans l'ordre de la page.
      const first = FIELDS.find((f) => next[f]);
      if (first) document.getElementById(first)?.focus();
      else toast.error(t.contact.errInvalid);
      return;
    }
    setErrors({});

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error(t.contact.toastNotConfigured);
      return;
    }

    // Champ piège (honeypot) : invisible pour les humains, coché par les robots.
    // On simule un succès sans rien envoyer, pour ne pas renseigner le robot.
    const isBot = formData.get("botcheck") === "on";
    if (isBot) {
      setSent(true);
      form.reset();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: t.contact.subject(parsed.data.name),
          from_name: parsed.data.name,
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          botcheck: "",
        }),
        signal: AbortSignal.timeout(10_000),
      });
      // Une réponse non-JSON (page d'erreur 5xx, blocage) ne doit pas passer
      // pour une erreur réseau.
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (res.ok && data?.success) {
        // Le panneau « Message envoyé ! » prend le focus et confirme déjà
        // l'envoi : pas de second message en toast.
        setSent(true);
        form.reset();
      } else {
        // Le message de l'API (en anglais, technique) reste dans la console :
        // la personne voit un message dans sa langue, avec un recours.
        console.error("Réponse d'erreur du formulaire de contact", data);
        toast.error(t.contact.toastError);
      }
    } catch (e) {
      console.error("Échec de l'envoi du formulaire de contact", e);
      toast.error(t.contact.toastNetwork);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <section
          className="border-b border-border/60"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur">
              {t.contact.badge}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {t.contact.titleA}{" "}
              <span className="italic text-primary-deep">
                {t.contact.titleB}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-foreground/75">
              {t.contact.lead}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[1fr_1.3fr] md:px-6 md:py-16">
          <div className="space-y-8">
            <div>
              <InfoCard
                icon={<Mail className="size-5" />}
                title={t.contact.byEmail}
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </InfoCard>
            </div>
            <div>
              <InfoCard
                icon={<Instagram className="size-5" />}
                title={t.contact.onInstagram}
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                newTabLabel={t.nav.newTab}
              >
                @{INSTAGRAM_HANDLE}
              </InfoCard>
            </div>
            <div>
              <InfoCard
                icon={<MessageCircle className="size-5" />}
                title={t.contact.wordTitle}
              >
                {t.contact.word}
              </InfoCard>
            </div>
          </div>
          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-10 text-center shadow-[var(--shadow-card)]">
              <CheckCircle2 className="size-14 text-primary" />
              <h2
                ref={successRef}
                tabIndex={-1}
                className="mt-4 font-display text-2xl font-semibold"
              >
                {t.contact.sentTitle}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {t.contact.sentDesc}
              </p>
              <Button
                onClick={() => setSent(false)}
                variant="outline"
                className="mt-6 rounded-full"
              >
                {t.contact.sendAnother}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onInput={(e) => {
                const name = (e.target as HTMLInputElement).name;
                if (isField(name)) clearError(name);
              }}
              noValidate
              className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
            >
              <p className="mb-4 text-sm text-muted-foreground">
                {t.contact.requiredNote}
              </p>
              <div className="grid gap-4">
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="name">{t.contact.labelName}</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={t.contact.placeholderName}
                    className="mt-1.5 h-11 aria-[invalid=true]:border-destructive"
                    maxLength={80}
                    required
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>
                <div>
                  <Label htmlFor="email">{t.contact.labelEmail}</Label>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder={t.contact.placeholderEmail}
                    className="mt-1.5 h-11 aria-[invalid=true]:border-destructive"
                    maxLength={255}
                    required
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>
                <div>
                  <Label htmlFor="message">{t.contact.labelMessage}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t.contact.placeholderMessage}
                    className="mt-1.5 aria-[invalid=true]:border-destructive"
                    maxLength={2000}
                    required
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/50 p-3 text-sm">
                    <Checkbox
                      name="consent"
                      id="consent"
                      className="mt-0.5 aria-[invalid=true]:border-destructive aria-[invalid=true]:border-2"
                      required
                      onCheckedChange={() => clearError("consent")}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                    />
                    <span className="text-foreground/80">
                      {t.contact.consent}{" "}
                      <Link
                        to="/confidentialite"
                        className="font-medium text-primary-deep underline underline-offset-2 hover:text-primary"
                      >
                        {t.contact.consentLink}
                      </Link>
                      .
                    </span>
                  </label>
                  <FieldError id="consent-error" message={errors.consent} />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary-deep"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    t.contact.submit
                  )}
                </Button>
              </div>
            </form>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
  href,
  newTabLabel,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
  /** Texte annoncé pour un lien externe qui s'ouvre dans un nouvel onglet. */
  newTabLabel?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary-deep">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground break-all">
          {children}
        </p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {content}
        {newTabLabel && href.startsWith("http") && (
          <span className="sr-only"> ({newTabLabel})</span>
        )}
      </a>
    );
  }
  return content;
}
