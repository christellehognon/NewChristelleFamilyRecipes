import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: dictionaries.fr.legal.metaTitle },
      { name: "description", content: dictionaries.fr.legal.metaDesc },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: LegalPage,
});

const content = {
  fr: [
    {
      title: "Éditeur du site",
      body: (
        <>
          <p>
            <strong>Christelle's Family Recipes</strong>
            <br />
            Site personnel à but non commercial dédié au partage de recettes de
            famille.
          </p>
          <p>
            Contact :{" "}
            <a
              href="mailto:christellefamilyrecipes@gmail.com"
              className="text-primary-deep underline underline-offset-2"
            >
              christellefamilyrecipes@gmail.com
            </a>
          </p>
        </>
      ),
    },
    {
      title: "Hébergement",
      body: (
        <p>
          This site is hosted by <strong>OVH</strong>
          <br />
          <a
            href="https://www.ovh.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary-deep underline underline-offset-2"
          ></a>
          https://www.ovh.com
        </p>
      ),
    },
    {
      title: "Propriété intellectuelle",
      body: (
        <>
          <p>
            Les recettes publiées sur ce site sont des recettes de famille
            partagées avec amour. Vous êtes libres de les reproduire pour un
            usage personnel et familial. Toute reproduction commerciale est
            interdite sans autorisation écrite préalable.
          </p>
          <p>
            Les photographies illustrant les recettes sont la propriété
            exclusive de l'autrice du site et sont protégées par le droit
            d'auteur. Toute reproduction, utilisation ou diffusion, même
            partielle, est strictement interdite sans autorisation écrite
            préalable.
          </p>
        </>
      ),
    },
    {
      title: "Données personnelles",
      body: (
        <p>
          Pour toute information sur le traitement de vos données, consultez la{" "}
          <Link
            to="/confidentialite"
            className="text-primary-deep underline underline-offset-2"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      ),
    },
    {
      title: "Limitation de responsabilité",
      body: (
        <p>
          Les recettes sont partagées à titre informatif. En cas d'allergie,
          d'intolérance ou de régime alimentaire particulier, vérifiez les
          ingrédients avant consommation. L'éditeur ne saurait être tenu
          responsable d'éventuels désagréments liés à la préparation ou
          consommation des recettes.
        </p>
      ),
    },
  ],
  en: [
    {
      title: "Site editor",
      body: (
        <>
          <p>
            <strong>Christelle's Family Recipes</strong>
            <br />
            Personal, non-commercial site dedicated to sharing family recipes.
          </p>
          <p>
            Contact:{" "}
            <a
              href="mailto:christellefamilyrecipes@gmail.com"
              className="text-primary-deep underline underline-offset-2"
            >
              christellefamilyrecipes@gmail.com
            </a>
          </p>
        </>
      ),
    },
    {
      title: "Hosting",
      body: (
        <p>
          This site is hosted by <strong>Lovable</strong>
          <br />
          <a
            href="https://lovable.dev"
            target="_blank"
            rel="noreferrer"
            className="text-primary-deep underline underline-offset-2"
          >
            https://lovable.dev
          </a>
        </p>
      ),
    },
    {
      title: "Intellectual property",
      body: (
        <>
          <p>
            Recipes published on this site are family recipes shared with love.
            You are free to reproduce them for personal and family use. Any
            commercial reproduction is forbidden without prior written
            authorization.
          </p>
          <p>
            Recipe photographs come from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary-deep underline underline-offset-2"
            >
              Unsplash
            </a>{" "}
            and are used under a free license.
          </p>
        </>
      ),
    },
    {
      title: "Personal data",
      body: (
        <p>
          For information about how your data is processed, see the{" "}
          <Link
            to="/confidentialite"
            className="text-primary-deep underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>
      ),
    },
    {
      title: "Limitation of liability",
      body: (
        <p>
          Recipes are shared for informational purposes. In case of allergies,
          intolerances or a specific diet, please check ingredients before
          consumption. The editor cannot be held responsible for any
          inconvenience related to the preparation or consumption of the
          recipes.
        </p>
      ),
    },
  ],
};

function LegalPage() {
  const { t, lang } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {t.legal.title}
        </h1>

        <div className="mt-8 space-y-6 text-foreground/85">
          {content[lang].map((s) => (
            <Section key={s.title} title={s.title}>
              {s.body}
            </Section>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-deep hover:text-primary"
          >
            {t.legal.backHome}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
