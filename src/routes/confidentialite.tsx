import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: dictionaries.fr.privacy.metaTitle },
      { name: "description", content: dictionaries.fr.privacy.metaDesc },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: PrivacyPage,
});

const content = {
  fr: {
    sections: [
      {
        title: "1. Qui sommes-nous ?",
        body: (
          <p>
            <strong>Christelle's Family Recipes</strong> est un site personnel
            de partage de recettes de famille, à but non commercial.
          </p>
        ),
      },
      {
        title: "2. Quelles données sont collectées ?",
        body: (
          <>
            <p>
              Ce site <strong>ne stocke aucune donnée personnelle</strong> dans
              une base de données et n'utilise aucun cookie de tracking. Ce site
              utilise Vercel Analytics pour mesurer l'audience de manière
              anonyme (pages vues, pays de provenance, type de navigateur et
              d'appareil). Ces données sont agrégées et ne permettent pas de
              vous identifier personnellement. Aucun cookie n'est déposé à cette
              fin. Lorsque vous utilisez le formulaire de contact, vos
              informations (nom, email, message) sont uniquement transmises par
              email à Christelle via le service Web3Forms, conforme RGPD. Aucune
              copie n'est conservée sur ce site.
            </p>
            <p>
              Lorsque vous utilisez le formulaire de contact, vos informations
              (nom, email, message) sont uniquement transmises par email à
              Christelle via le service{" "}
              <a
                href="https://web3forms.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-primary-deep underline underline-offset-2"
              >
                Web3Forms
              </a>
              , conforme RGPD. Aucune copie n'est conservée sur ce site.
            </p>
          </>
        ),
      },
      {
        title: "3. À quoi servent ces données ?",
        body: (
          <p>
            Vos données sont utilisées <strong>uniquement</strong> pour vous
            répondre. Elles ne sont jamais transmises à des tiers, ni utilisées
            à des fins commerciales ou publicitaires. Aucune newsletter, aucun
            démarchage.
          </p>
        ),
      },
      {
        title: "4. Combien de temps sont-elles conservées ?",
        body: (
          <p>
            Les emails reçus sont conservés dans la boîte mail personnelle de
            Christelle (
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              christellefamilyrecipes@gmail.com
            </code>
            ) le temps nécessaire pour vous répondre, puis archivés ou
            supprimés.
          </p>
        ),
      },
      {
        title: "5. Vos droits (RGPD)",
        body: (
          <>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d'un droit d'accès, de rectification, de
              suppression et d'opposition concernant vos données. Pour exercer
              ces droits, écrivez à :{" "}
              <a
                href="mailto:christellefamilyrecipes@gmail.com"
                className="text-primary-deep underline underline-offset-2"
              >
                christellefamilyrecipes@gmail.com
              </a>
              .
            </p>
            <p>
              Vous pouvez également déposer une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="text-primary-deep underline underline-offset-2"
              >
                CNIL
              </a>{" "}
              si vous estimez que vos droits ne sont pas respectés.
            </p>
          </>
        ),
      },
      {
        title: "6. Cookies",
        body: (
          <p>
            Ce site n'utilise aucun cookie de suivi ou publicitaire. Vercel
            Analytics collecte des données de navigation de façon anonyme et
            agrégée, sans dépôt de cookie d'identification.
          </p>
        ),
      },
      {
        title: "7. Hébergement et photos",
        body: (
          <p>
            Le site est hébergé par <strong>OVHcloud</strong>
            (2 rue Kellermann, 59100 Roubaix, France). OVHcloud est susceptible
            de collecter des données de connexion et d'usage dans le cadre de
            son infrastructure. Pour plus d'informations, consultez la politique
            de confidentialité d'OVHcloud. Les photographies de plats sont la
            propriété exclusive de Christelle et ne peuvent être réutilisées
            sans autorisation.
          </p>
        ),
      },
    ],
  },
  en: {
    sections: [
      {
        title: "1. Who we are",
        body: (
          <p>
            <strong>Christelle's Family Recipes</strong> is a personal,
            non-commercial site for sharing family recipes.
          </p>
        ),
      },
      {
        title: "2. What data is collected?",
        body: (
          <>
            <p>
              This site <strong>does not store any personal data</strong> in a
              database and uses no tracking cookies. This site uses Vercel
              Analytics to measure audience in an anonymous way (page views,
              country of origin, browser and device type). This data is
              aggregated and cannot be used to identify you personally. No
              cookie is set for this purpose. When you use the contact form,
              your information (name, email, message) is only forwarded by email
              to Christelle via Web3Forms, a GDPR-compliant service. No copy is
              kept on this site.
            </p>
            <p>
              When you use the contact form, your information (name, email,
              message) is only forwarded by email to Christelle via{" "}
              <a
                href="https://web3forms.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-primary-deep underline underline-offset-2"
              >
                Web3Forms
              </a>
              , a GDPR-compliant service. No copy is kept on this site.
            </p>
          </>
        ),
      },
      {
        title: "3. What is the data used for?",
        body: (
          <p>
            Your data is used <strong>only</strong> to reply to you. It is never
            shared with third parties, nor used for commercial or advertising
            purposes. No newsletter, no marketing.
          </p>
        ),
      },
      {
        title: "4. How long is it kept?",
        body: (
          <p>
            Emails received are kept in Christelle's personal mailbox (
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              christellefamilyrecipes@gmail.com
            </code>
            ) for as long as needed to reply, then archived or deleted.
          </p>
        ),
      },
      {
        title: "5. Your rights (GDPR)",
        body: (
          <>
            <p>
              Under the General Data Protection Regulation (GDPR), you have a
              right to access, rectify, delete and object to the processing of
              your data. To exercise these rights, write to:{" "}
              <a
                href="mailto:christellefamilyrecipes@gmail.com"
                className="text-primary-deep underline underline-offset-2"
              >
                christellefamilyrecipes@gmail.com
              </a>
              .
            </p>
            <p>
              You may also lodge a complaint with the French{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="text-primary-deep underline underline-offset-2"
              >
                CNIL
              </a>{" "}
              if you feel your rights are not respected.
            </p>
          </>
        ),
      },
      {
        title: "6. Cookies",
        body: (
          <p>
            This site uses <strong>Vercel</strong> Analytics collects browsing
            data in an anonymous and aggregated manner, without setting any
            identification cookie.
          </p>
        ),
      },
      {
        title: "7. Hosting and photos",
        body: (
          <p>
            The site is hosted by <strong>OVHcloud</strong> (2 rue Kellermann,
            59100 Roubaix, France). OVHcloud may collect connection and usage
            data as part of its infrastructure. For more information, see
            OVHcloud's privacy policy. All dish photographs are the exclusive
            property of Christelle and may not be reused without permission.
          </p>
        ),
      },
    ],
  },
};

function PrivacyPage() {
  const { t, lang } = useI18n();
  const sections = content[lang].sections;
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {t.privacy.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t.privacy.updated} :{" "}
          <span suppressHydrationWarning>
            {new Date().toLocaleDateString(t.locale)}
          </span>
        </p>

        <div className="prose prose-stone mt-8 max-w-none space-y-6 text-foreground/85">
          {sections.map((s) => (
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
            {t.privacy.backHome}
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
