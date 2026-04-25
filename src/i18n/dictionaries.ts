import type {
  AveragePrice,
  Difficulty,
  RecipeType,
  Season,
} from "@/data/recipes";

export type Lang = "fr" | "en";

type Dictionary = {
  nav: { home: string; chef: string; contact: string; openMenu: string; langLabel: string };
  footer: {
    brand: string;
    cookedWith: string;
    sendEmail: string;
    privacy: string;
    legal: string;
    rights: string;
  };
  home: {
    badge: string;
    titleA: string;
    titleB: string;
    lead: string;
    shuffle: string;
    searchPlaceholder: string;
    clearSearch: string;
    filterType: string;
    filterSeason: string;
    filterDifficulty: string;
    filterPrice: string;
    reset: string;
    countOne: (n: number) => string;
    countMany: (n: number) => string;
    none: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyReset: string;
    metaTitle: string;
    metaDesc: string;
  };
  chef: {
    badge: string;
    hello: string;
    lead: string;
    about: string;
    family: string;
    metaTitle: string;
    metaDesc: string;
  };
  contact: {
    badge: string;
    titleA: string;
    titleB: string;
    lead: string;
    byEmail: string;
    onInstagram: string;
    wordTitle: string;
    word: string;
    sentTitle: string;
    sentDesc: string;
    sendAnother: string;
    labelName: string;
    labelEmail: string;
    labelMessage: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    consent: string;
    consentLink: string;
    submit: string;
    sending: string;
    toastSuccess: string;
    toastError: string;
    toastNetwork: string;
    toastNotConfigured: string;
    errName: string;
    errNameLong: string;
    errEmail: string;
    errEmailLong: string;
    errMessage: string;
    errMessageLong: string;
    errConsent: string;
    errInvalid: string;
    subject: (name: string) => string;
    metaTitle: string;
    metaDesc: string;
  };
  recipe: {
    back: string;
    ingredients: string;
    preparation: string;
    sharedBy: (n: string) => string;
    family: string;
    quote: string;
    notFoundTitle: string;
    notFoundDesc: string;
    backHome: string;
  };
  privacy: {
    title: string;
    updated: string;
    backHome: string;
    metaTitle: string;
    metaDesc: string;
  };
  legal: { title: string; backHome: string; metaTitle: string; metaDesc: string };
  season: Record<Season, string>;
  difficulty: Record<Difficulty, string>;
  type: Record<RecipeType, string>;
  price: Record<AveragePrice, string>;
  locale: string;
};

export const dictionaries: Record<Lang, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      chef: "Les chefs",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      langLabel: "Langue",
    },
    footer: {
      brand: "Christelle's Family Recipes",
      cookedWith: "Cuisiné avec",
      sendEmail: "Envoyer un email",
      privacy: "Politique de confidentialité",
      legal: "Mentions légales",
      rights: "Tous droits réservés",
    },
    home: {
      badge: "✨ Cuisine de famille",
      titleA: "Les recettes tout le monde",
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
      countOne: (n: number) => `${n} recette à découvrir`,
      countMany: (n: number) => `${n} recettes à découvrir`,
      none: "Aucune recette",
      emptyTitle: "Rien dans la marmite…",
      emptyDesc: "Essayez d'autres filtres ou réinitialisez votre recherche.",
      emptyReset: "Réinitialiser les filtres",
      metaTitle: "Christelle's Family Recipes — Recettes de famille",
      metaDesc:
        "Les recettes que tout le monde adore, partagées avec amour. Découvrez chaque jour de nouvelles inspirations cuisine.",
    },
    chef: {
      badge: "👩‍🍳 La cheffe",
      hello: "Bonjour, moi c'est",
      lead: "Je suis passionnée de cuisine grâce à des femmes merveilleuses qui m'ont énormément appris ! Mon credo : la cuisine doit rester simple, généreuse et partagée. Pas de chichis, des bons produits, et beaucoup d'amour.",
      about: "À propos",
      family: "Les femmes qui m'ont tout appris",
      metaTitle: "Le chef — Christelle's Family Recipes",
      metaDesc:
        "Christelle, la cheffe de famille derrière le carnet, et toute la tribu qui partage la passion de la cuisine.",
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
      consent:
        "J'accepte que mon nom et mon email soient utilisés uniquement pour me répondre. Aucune donnée n'est stockée sur ce site. Voir la",
      consentLink: "politique de confidentialité",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      toastSuccess: "Message envoyé ! Christelle vous répondra bientôt.",
      toastError: "Une erreur est survenue. Réessayez plus tard.",
      toastNetwork: "Impossible d'envoyer le message. Vérifiez votre connexion.",
      toastNotConfigured:
        "Le formulaire n'est pas encore configuré. La clé Web3Forms n'a pas été ajoutée.",
      errName: "Votre nom doit contenir au moins 2 caractères",
      errNameLong: "Votre nom est trop long",
      errEmail: "Email invalide",
      errEmailLong: "Email trop long",
      errMessage: "Votre message doit contenir au moins 10 caractères",
      errMessageLong: "Votre message est trop long (max 2000 caractères)",
      errConsent: "Vous devez accepter pour envoyer le message",
      errInvalid: "Formulaire invalide",
      subject: (name: string) => `Nouveau message de ${name} — Christelle's Family Recipes`,
      metaTitle: "Contact — Christelle's Family Recipes",
      metaDesc:
        "Une question, une recette à partager, une envie de discuter cuisine ? Contactez Christelle.",
    },
    recipe: {
      back: "Retour aux recettes",
      ingredients: "Ingrédients",
      preparation: "Préparation",
      sharedBy: (n: string) => `Recette partagée par ${n}`,
      family: "la famille",
      quote: "« Une recette à transmettre, à partager, à savourer. »",
      notFoundTitle: "Recette introuvable",
      notFoundDesc: "Cette recette n'existe pas ou a été retirée du carnet.",
      backHome: "Retour à l'accueil",
    },
    privacy: {
      title: "Politique de confidentialité",
      updated: "Dernière mise à jour",
      backHome: "← Retour à l'accueil",
      metaTitle: "Politique de confidentialité — Christelle's Family Recipes",
      metaDesc:
        "Comment vos données sont (ou plutôt, ne sont pas) collectées sur Christelle's Family Recipes.",
    },
    legal: {
      title: "Mentions légales",
      backHome: "← Retour à l'accueil",
      metaTitle: "Mentions légales — Christelle's Family Recipes",
      metaDesc: "Mentions légales du site Christelle's Family Recipes.",
    },
    season: {
      Printemps: "Printemps",
      Été: "Été",
      Automne: "Automne",
      Hiver: "Hiver",
      "Toutes saisons": "Toutes saisons",
    } as Record<Season, string>,
    difficulty: {
      Facile: "Facile",
      Technique: "Technique",
    } as Record<Difficulty, string>,
    type: {
      Entrée: "Entrée",
      Plat: "Plat",
      Dessert: "Dessert",
      Apéritif: "Apéritif",
      Salade: "Salade",
      Végétarien: "Végétarien",
    } as Record<RecipeType, string>,
    price: {
      "€": "€",
      "€€": "€€",
      "€€€": "€€€",
    } as Record<AveragePrice, string>,
    locale: "fr-FR",
  },
  en: {
    nav: {
      home: "Home",
      chef: "The chefs",
      contact: "Contact",
      openMenu: "Open menu",
      langLabel: "Language",
    },
    footer: {
      brand: "Christelle's Family Recipes",
      cookedWith: "Cooked with",
      sendEmail: "Send an email",
      privacy: "Privacy policy",
      legal: "Legal notice",
      rights: "All rights reserved",
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
      countOne: (n: number) => `${n} recipe to discover`,
      countMany: (n: number) => `${n} recipes to discover`,
      none: "No recipes",
      emptyTitle: "Nothing in the pot…",
      emptyDesc: "Try other filters or reset your search.",
      emptyReset: "Reset filters",
      metaTitle: "Christelle's Family Recipes — Family recipes",
      metaDesc:
        "The recipes my family loves, shared with love. Discover new cooking inspiration every day.",
    },
    chef: {
      badge: "👩‍🍳 The chef",
      hello: "Hello, I'm",
      lead: "I’m passionate about cooking thanks to some wonderful women who have taught me so much! My credo: cooking should stay simple, generous and shared. No fuss, good ingredients, and lots of love.",
      about: "About",
      family: "The women who taught me everything",
      metaTitle: "The chef — Christelle's Family Recipes",
      metaDesc:
        "Christelle, the family chef behind the notebook, and the whole tribe sharing a passion for cooking.",
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
      consent:
        "I agree that my name and email may be used only to reply to me. No data is stored on this site. See the",
      consentLink: "privacy policy",
      submit: "Send message",
      sending: "Sending…",
      toastSuccess: "Message sent! Christelle will reply soon.",
      toastError: "Something went wrong. Please try again later.",
      toastNetwork: "Could not send the message. Please check your connection.",
      toastNotConfigured:
        "The form is not configured yet. The Web3Forms key has not been added.",
      errName: "Your name must be at least 2 characters",
      errNameLong: "Your name is too long",
      errEmail: "Invalid email",
      errEmailLong: "Email is too long",
      errMessage: "Your message must be at least 10 characters",
      errMessageLong: "Your message is too long (max 2000 characters)",
      errConsent: "You must accept to send the message",
      errInvalid: "Invalid form",
      subject: (name: string) => `New message from ${name} — Christelle's Family Recipes`,
      metaTitle: "Contact — Christelle's Family Recipes",
      metaDesc:
        "A question, a recipe to share, want to talk cooking? Get in touch with Christelle.",
    },
    recipe: {
      back: "Back to recipes",
      ingredients: "Ingredients",
      preparation: "Preparation",
      sharedBy: (n: string) => `Recipe shared by ${n}`,
      family: "the family",
      quote: "“A recipe to pass on, to share, to savor.”",
      notFoundTitle: "Recipe not found",
      notFoundDesc: "This recipe does not exist or has been removed from the notebook.",
      backHome: "Back to home",
    },
    privacy: {
      title: "Privacy policy",
      updated: "Last updated",
      backHome: "← Back to home",
      metaTitle: "Privacy policy — Christelle's Family Recipes",
      metaDesc:
        "How your data is (or rather, is not) collected on Christelle's Family Recipes.",
    },
    legal: {
      title: "Legal notice",
      backHome: "← Back to home",
      metaTitle: "Legal notice — Christelle's Family Recipes",
      metaDesc: "Legal notice for Christelle's Family Recipes.",
    },
    season: {
      Printemps: "Spring",
      Été: "Summer",
      Automne: "Autumn",
      Hiver: "Winter",
      "Toutes saisons": "All seasons",
    } as Record<Season, string>,
    difficulty: {
      Facile: "Easy",
      Technique: "Technical",
    } as Record<Difficulty, string>,
    type: {
      Entrée: "Starter",
      Plat: "Main",
      Dessert: "Dessert",
      Apéritif: "Apéritif",
      Salade: "Salad",
      Végétarien: "Vegetarian",
    } as Record<RecipeType, string>,
    price: {
      "€": "$",
      "€€": "$$",
      "€€€": "$$$",
    } as Record<AveragePrice, string>,
    locale: "en-US",
  },
};

export type Dict = Dictionary;
