import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
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
import { dictionaries, type Dict } from "@/i18n/dictionaries";

const EMAIL = "christellefamilyrecipes@gmail.com";
const INSTAGRAM_HANDLE = "christellefamilyrecipes";

const WEB3FORMS_ACCESS_KEY = "1bf09f60-7773-4f83-a15c-1fdcec794ee3";

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
    consent: z.literal(true, {
      errorMap: () => ({ message: t.contact.errConsent }),
    }),
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: dictionaries.fr.contact.metaTitle },
      { name: "description", content: dictionaries.fr.contact.metaDesc },
      { property: "og:title", content: dictionaries.fr.contact.metaTitle },
      { property: "og:description", content: dictionaries.fr.contact.metaDesc },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

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
      const firstError = parsed.error.issues[0]?.message ?? t.contact.errInvalid;
      toast.error(firstError);
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error(t.contact.toastNotConfigured);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: t.contact.subject(parsed.data.name),
          from_name: parsed.data.name,
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          botcheck: "",
        }),
      });
      console.log('RESPONSE', res);
      const data = (await res.json()) as { success?: boolean; message?: string };
      console.log('RESPONSE DATA', data);
      if (data.success) {
        setSent(true);
        form.reset();
        toast.success(t.contact.toastSuccess);
      } else {
        toast.error(data.message ?? t.contact.toastError);
      }
    } catch {
      toast.error(t.contact.toastNetwork);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section
          className="border-b border-border/60"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary-deep backdrop-blur">
              {t.contact.badge}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {t.contact.titleA}{" "}
              <span className="italic text-primary-deep">{t.contact.titleB}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-foreground/75">{t.contact.lead}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[1fr_1.3fr] md:px-6 md:py-16">
          <div className="space-y-5">
            <InfoCard
              icon={<Mail className="size-5" />}
              title={t.contact.byEmail}
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </InfoCard>
            <InfoCard
              icon={<Instagram className="size-5" />}
              title={t.contact.onInstagram}
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            >
              @{INSTAGRAM_HANDLE}
            </InfoCard>
            <InfoCard icon={<MessageCircle className="size-5" />} title={t.contact.wordTitle}>
              {t.contact.word}
            </InfoCard>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-10 text-center shadow-[var(--shadow-card)]">
              <CheckCircle2 className="size-14 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-semibold">{t.contact.sentTitle}</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.contact.sentDesc}</p>
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
              className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
            >
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">{t.contact.labelName}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t.contact.placeholderName}
                    className="mt-1.5 h-11"
                    maxLength={80}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.contact.labelEmail}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.placeholderEmail}
                    className="mt-1.5 h-11"
                    maxLength={255}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">{t.contact.labelMessage}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t.contact.placeholderMessage}
                    className="mt-1.5"
                    maxLength={2000}
                    required
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/50 p-3 text-sm">
                  <Checkbox name="consent" id="consent" className="mt-0.5" required />
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
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary-deep">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium text-foreground break-all">{children}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
