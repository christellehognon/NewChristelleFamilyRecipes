
export type Season = "Printemps" | "Été" | "Automne" | "Hiver" | "Toutes saisons";
export type Difficulty = "Facile" | "Technique";
export type AveragePrice = "€" | "€€" | "€€€";
export type RecipeType =
  | "Entrée"
  | "Plat"
  | "Dessert"
  | "Apéritif"
  | "Salade"
  | "Végétarien"

export type Chief = {
  name: string;
  img: string;
  description: string;
  /** English translation of the description */
  description_en?: string;
};

export type Recipe = {
  image: string;
  authorImg: string;
  name: string;
  slug: string;
  season: Season;
  type: RecipeType;
  timeToCook: string;
  averagePrice: AveragePrice;
  difficulty: Difficulty;
  ingredients: string[];
  description: string;
  /** Optional: name of the chief who shared the recipe (for display) */
  authorName?: string;
  /** English translations (optional — fall back to French if missing) */
  name_en?: string;
  description_en?: string;
  ingredients_en?: string[];
  timeToCook_en?: string;
};

export const chiefs: Chief[] = [
  {
    name: "Christelle",
    img: "/img/top-chiefs/img_1.jpg",
    description:
      "Je suis passionnée de cuisine grâce à des femmes merveilleuses qui m'ont énormément appris !",
    description_en:
      "I'm passionate about cooking thanks to wonderful women who taught me so much!",
  },
  {
    name: "Mamie Marie",
    img: "/img/top-chiefs/img_2.jpg",
    description: "Ma maman qui m'a donné le goût de cuisiner !",
    description_en: "My mum, who gave me the love of cooking!",
  },
  {
    name: "Mamie Colette",
    img: "/img/top-chiefs/img_3.jpg",
    description: "Ma belle-mère qui m'a partagé sa passion pour la pâtisserie !",
    description_en: "My mother-in-law, who shared her passion for pastry with me!",
  },
  {
    name: "Loulou",
    img: "/img/top-chiefs/img_4.jpg",
    description: "Ma tante qui m'a fait découvrir la cuisine niçoise !",
    description_en: "My aunt, who introduced me to the cuisine of Nice!",
  },
  {
    name: "La Mémette",
    img: "/img/top-chiefs/img_5.jpg",
    description: "Ma maman de cœur qui m'a tout appris de la cuisine du sud-ouest !",
    description_en:
      "My heart-mother, who taught me everything about south-western French cooking!",
  },
];

export const recipes = [{
    image: "/img/gallery/img_46.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Riz au lait",
    slug: "riz-au-lait",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 l de Lait", "250 g de riz rond", "1 gousse de vanille", "80 g de sucre en poudre"],
    description: "Fendre la gousse de vanille en 2 puis la gratter. Laver le riz. L'ébouillanter 1 minute. Dans une casserole: disposer le lait, la vanille et le riz. Cuire à feu doux jusqu'à ce que le riz ait absorbé tout le liquide. Ajouter le sucre. Laisser refroidir à température ambiante. Dresser dans des verrines."
},
{
    image: "/img/gallery/img_25.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    name: "Terrine de porc",
    slug: "terrine-de-porc",
    season: "Été",
    type: "Entrée",
    timeToCook: "30 minutes + 1h30 de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["400g de foie de porc", "300g de lard gras (que je remplace par des lardons fumés)", "300g de noix de veau", "3 œufs", "3 c. à café de sel", "Poivre", "Noix de muscade", "3 échalotes", "Un peu de persil", "1 c. à café de quatre épices", "3 biscottes", "1 feuille de laurier", "1 sachet de gelée au Madère (si on aime !)"],
    description: "Hacher le foie, le lard, le veau et les échalottes. Ajouter les œufs, le persil et les biscottes écrasées. Assaisonner, bien mélanger le tout. Verser la préparation dans une terrine de 26cm. Poser sur le dessus la feuille de laurier. Fermer avec un couvercle. Faire cuire au bain-marie au four th7 ou 200°C pendant 1h30. (souvent plus !) Laisser refroidir et verser la gelée sur le dessus."
},
{
    image: "/img/gallery/img_23.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tian de courgettes au riz",
    slug: "tian-de-courgettes-au-riz",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "30 minutes + 50 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 courgettes moyennes", "4 tomates fermes", "2 oignons", "2 gousses d’ail", "100g de riz long", "6 c. à soupe d’huile d’olive", "1 c. à café de thym", "sel", "poivre"],
    description: "Portez à ébullition une casserole d’eau, salez-la et versez-y en pluie le riz. Laissez cuire 15 à 20 min suivant la nature du riz puis égouttez. Pelez et émincez finement les oignons et une gousse d’ail. Faites chauffer 2 c. à soupes d’huile d’olive dans une poêle.  Mettez-y les oignons et l’ail à fondre doucement, en remuant de temps en temps, pendant environ 10 minutes. Lorsque les oignons sont translucides, mélangez-les au riz cuit. Salez, poivrez, vérifiez l’assaisonnement. Allumez le four th 5 (env. 170°C). Lavez et essuyez les tomates et les courgettes . Coupez-les en rondelles régulières d’ ½ cm d’épaisseur. Poudrez légèrement les courgettes de sel fin et laissez dégorger quelques minutes sur su papier absorbant. Epluchez l’autre gousse d’ail. Enduisez un plat à four en terre avec une c. à soupe d’huile d’olive et frottez-le avec la gousse d’ail. Etalez au fond le mélange de riz et d’oignons en une seule couche. Couvrez de rondelles de tomates et de courgettes, en intercalant harmonieusement les couleurs. Saupoudrez avec une c. à café de thym, salez, poivrez, arrosez avec 3 c. à soupe d’huile d’olive. Faites cuire 50 minutes environ au four. Servez chaud ou tiède. Variante : vous pouvez ajouter de fines rondelles d’aubergines (dégorgées) en alternance avec les autres légumes, mais également des lamelles de fromage de chèvre frais et des olives noires hachées. Vous préparerez ainsi un plat complet, idéal pour le dîner. Tour de main : Pour couper facilement tomates et courgettes en rondelles, utilisez toujours un couteau-scie, ce qui facilite l’opération sans risquer de déformer les rondelles. Si les courgettes ont une peau très fine, ne les pelez pas ; en revanche, si elle vous semble un peu épaisse, épluchez-les avec un couteau économe, en laissant une lanière de peau sur deux, c’est plus joli."
},
{
    image: "/img/gallery/img_7.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    name: "Olives à la niçoise",
    slug: "olives-a-la-niçoise",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
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
    ingredients: ["1/3 d’oignons blancs et rouges", "1/3 de poivrons rouges verts et jaunes", "1/3 de tomates pas trop mûres", "huile d’olive", "vinaigre balsamique", "câpres", "ail pressé", "herbes aromatiques au choix", "sel", "poivre"],
    description: "Couper l’ensemble des légumes en petits dés. Faire cuire très lentement chaque légume à part. Puis les mélanger doucement et prolonger la cuisson 15 à 20 minutes. La veille de la cuisson, préparer une vinaigrette corsée. Egoutter un peu la frita pour éliminer le jus de tomates. Ajouter la vinaigrette, mélanger et laisser au frais. Servir sur des petites cuillères ou en verrines."
},
{
    image: "",
    authorImg: "/img/top-chiefs/img_3.jpg",
    name: "Suprême au chocolat",
    slug: "supreme-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes + 25 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Technique",
    isVegetarian: true,
    ingredients: ["3 cuillères à soupe de Maïzena", "2 sachets de sucre vanillé", "1/2 sachet de levure", "6 oeufs", "250g de sucre", "250g de chocolat", "100g d’amandes en poudre", "250g de beurre"],
    description: "Séparer les blancs et les jaunes des oeufs. Fouetter les jaunes et le sucre jusque’à ce qu’ils blanchissent. Mettre les 250g de chocolat brisés dans une casserole. Faire fondre au bain-marie. Ajouter aux jaunes, mélanger. Ajouter la poudre d'amandes avec la levure, la maïzena et le beurre ramolli. Puis 3 blancs d'oeufs battus en neige avec la pincée de sel. Mélanger délicatement. Verser dans le moule beurré et saupoudrer de sucre semoule. Ne remplir qu'aux 3/4, et mettre à four chaud 210°C (th. 6-7). Cuire rapidement pour conserver le milieu de la pâte crémeuse (25 min). Laisser tiédir dans le moule. Démouler sur une grille et laisser refroidir - Décorer à volonté de chantilly et de cerises confites."
},
{
    image: "/img/gallery/img_38.jpg",
    authorImg: "/img/top-chiefs/img_3.jpg",
    name: "Granité de pommes",
    slug: "granite-de-pommes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes + 25 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["75g de farine", "1 cuillère à café rase de canelle", "1 pincée de sel", "25g de sucre en poudre", "50g de beurre ramolli", "4 grosses pommes", "50g de sucre", "50g d'eau"],
    description: "Pour le granité, mélanger à la fourchette pour être bien fluide (pas de grumeaux) la farine, le sucre puis le beurre la canelle et le sucre vanillé. Faire un sable. Couper les pommes en tranches fines. Les faire sauter dans une poêle dans un sirop de sucre (eau et 100g de sucre). Les faire revenir rapidement. Laisser refroidir. Mettre les pommes dans un moule de 26 cm environ et répendre le sable. Mettre au four à 210°C environ 25’. Servir tiède avec une crème pâtissière très froide."
},
{
    image: "/img/gallery/img_37.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Crème pâtissière",
    slug: "creme-patissiere",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "30 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1/2l de lait", "4 oeufs dont 3 jaunes", "1 pincée de sel", "100g de sucre", "1 gousse  de vanille", "40g de farine"],
    description: "Faire bouillir le lait avec la gousse de vanille fendue. Dans un cul-de-poule, blanchir les jaunes d'oeufs avec le sucre, puis ajouter la farine. Verser le lait chaud dessus petit à petit et remettre le tout dans la casserole. Cuire à feu doux et faire épaissir. Débarrasser ensuite sur une plaque et recouvrir d'un papier film au contact. Réserver."
},
{
    image: "/img/gallery/img_6.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Couscous",
    slug: "couscous",
    season: "Hiver",
    type: "Plat",
    timeToCook: "45min + 1h de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["300g de semoule", "4 cuisses de poulet", "4 merguez", "4 carottes", "2 oignons", "2 courgettes", "2 aubergines", "1 poivron vert", "2 poireaux", "200g de pois-chiches", "sel", "poivre", "harissa", "eau", "2 boîtes moyennes de tomates pelées", "2 boîtes de concentré de tomate", "huile d’olive"],
    description: "La veille, mettre à tremper les pois-chiches. Les faire pré-cuire afin de pouvoir retirer facilement la peau indigeste. Pour la sauce des légumes, tailler les légumes en cube. Faire revenir un oignon dans l’huile d’olive. Puis ajouter les carottes, le poivron, les courgettes et les aubergines. Couvrir d’eau. Assaisonner avec du gros sel. Ajouter les pois-chiches, une boîte de tomates pelées et une boîte de concentré de tomates. Ajouter les poireaux après 30’ de cuisson. Pour la sauce de la viande, faire revenir les cuisses de poulet, puis un oignon. Ajouter une boîte de tomates pelées et une boîte de concentré de tomates. Et au besoin un peu d’eau. Assaisonner avec un peu de gros sel et de la harissa. Pour la semoule, la verser dans un plat. La graisser avec un filet d’huile. Verser un peu d’eau bouillante pour la réhydrater. Passer une minute au micro-ondes. Faire cuire les merguez dans une poêle."
},
{
    image: "/img/gallery/img_24.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Gâteau au yaourt",
    slug: "gateau-au-yaourt",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 yaourt", "1 pot d’huile de tournesol", "3 pots de sucre", "4 pots de farine", "3 oeufs", "1 sachet de levure chimique", "1 sachet de sucre vanillé"],
    description: "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients afin d’obtenir une pâte bien lisse. Verser dans un moule à manquer. Mettre à four chaud pendant environ 45’."
},
{
    image: "/img/gallery/img_26.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Gâteau au yaourt sans oeufs",
    slug: "gateau-au-yaourt-sans-oeufs",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["2 yaourts natures ou aromatisés", "2 pots de sucre", "3 pots de farine", "1/2 pot d’huile de tournesol", "1 sachet de levure chimique", "1 sachet de sucre vanillé"],
    description: "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients dans un plat creux. Verser la préparation dans un moule à cake en silicone. Mettre à four chaud pendant environ 45’. Ne le démouler que lorsque le gateau est froid."
},
{
    image: "",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Crêpes",
    slug: "crepes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["250g de farine", "3 oeufs", "1/2l de lait", "1 à 2 cuillères de sucre", "1 cuillère d’huile", "1 pincée de sel", "1 à 2 cuillères de rhum"],
    description: "Faire une fontaine avec la farine. Y mettre les oeufs battus au fouet. Verser le lait par petites quantités. Ajouter ensuite l'huile, le sel, le sucre et le rhum. Laisser reposer une heure."
},
{
    image: "/img/gallery/img_5.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Pâté Lorrain",
    slug: "pate-lorrain",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["250 g d'échine de porc", "250 de noix de veau", "2 échalotes", "1 petit bouquet de persil", "2 gousses d'ail", "1 branche de thym", "1 oeuf", "1 dl de vin blanc sec", "1 rouleau de pâte feuilletée"],
    description: "Faire mariner les viandes la veille: Les découper en lanières puis en dés d'1 cm environ. Les placer dans un saladier puis ajouter l'ail pressé, le persil, les échalotes, le tout finement ciselé ou haché. Effeuiller le thym et mouiller avec le vin blanc. Saler, poivrer, bien mélanger et recouvrir d'un film alimentaire. Réserver au réfrigérateur 12 h. Le lendemain, préchauffer le four à 200°. Egoutter la viande. Ouvrir le rouleau de pâte en conservant sa feuille de papier sulfurisé. Déposer sur la plaque de cuisson. Disposer la farce au centre en forme de gros boudin et en laissant quelques cm libres tout autour. Rabattre les 4 côtés en commençant par les extrémités, retourner le pâté  pour que la pliure soit dessous. Badigeonner de jaune d'oeuf battu. Creuser un trou au centre pour former une cheminée et réaliser un quadrillage pour la décoration avec la pointe du couteau.  Enfourner pour 45 mn. Vérifier la cuisson et remettre 10 à 15 mn si nécessaire."
},
{
    image: "/img/gallery/img_27.jpg",
    authorImg: "/img/top-chiefs/img_4.jpg",
    name: "Tapenade",
    slug: "tapenade",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "10 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 boîte d’olives noires dénoyautées de marque Crespo", "5 anchois au sel rincés", "1 cuillère à café de câpres", "1/2 verre d'huile d’olive"],
    description: "Mixer tous les ingrédients. Déguster sur des tartines grillées."
},
{
    image: "/img/gallery/img_19.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Fondant au chocolat",
    slug: "fondant-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 20 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de beurre", "4 oeufs", "200g de sucre", "200g de chocolat", "80g de farine"],
    description: "Faire fondre au bain-marie le chocolat et le beurre. Hors du feu, ajouter le sucre. Puis la farine. Ajouter les oeufs un par un en mélangeant bien afin d'obtenir une pâte  bien lisse. Enfourner à four chaud(220°C) pendant 5 minutes. Puis, baisser le four à 200°C pendant environ 15 minutes."
},
{
    image: "/img/gallery/img_8.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Osso Bucco",
    slug: "osso-bucco",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["4 tranches de Jarret de veau", "oignons", "1 kg de tomates", "4 cuillerées à soupe d'huile", "½ citron", "1/10 | de vin blanc sec", " ¼l de bouillon", "sel", "poivre", "farine"],
    description: "Laver les morceaux de jarret, essuyez-les et passez-les dans la farine. Faire chauffer l'huile dans une cocotte, ajouter les tranches de jarret et faire dorer de tous côtés. Lorsqu'elles sont dorées, les retirer. Faire revenir les oignons et les carottes coupées en rondelles. Peler les tomates, les couper en morceaux de même que les légumes, ajouter aux oignons et laisser cuire quelques minutes à feu doux. Rajouter la viande, déglacer avec le vin blanc sec puis mouiller avec le bouillon. Faites mijoter environ 2 heures. Rectifier l'assaisonnement de l'Osso Bucco avec du jus de citron, du sel et du poivre. Accompagnez de tagliatelles fraîches."
},
{
    image: "/img/gallery/img_51.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Quatre-quart",
    slug: "quatre-quart",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes et 30 à 40 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["beurre", "sucre en poudre", "farine", "4 œufs", "1 citron"],
    description: "Allumez votre four à thermostat 5 (150°C). Peser les oeufs et mettre le même poids de farine de sucre et de beurre. Casser les oeufs en séparant les blancs des jaunes. Mélanger les jaunes, le sucre et le jus de citron jusqu’à ce que le mélange blanchisse. Puis ajouter le beurre tiède et fondu en pommade. Et enfin la farine. Remuer avec une cuillère en bois afin que le mélange soit bien fait. Battre ensuite les blancs en neige très fermes. Incorporer délicatement à la préparation. Beurrer un moule à cake et le remplir à moitié avec la pâte. Mettre au four préchauffé à 150°C pendant une heure. Le gâteau doit gonfler de moitié."
},
{
    image: "/img/gallery/img_20.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Mousse au chocolat",
    slug: "mousse-au-chocolat",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 5 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["150g de chocolat", "4 oeufs"],
    description: "Casser en morceaux le chocolat et faire fondre au bain-marie avec 1 ou 2 cuillères à soupe d'eau. Travailler avec une spatule pour obtenir un mélange très lisse. Verser ensuite ce chocolat fondu dans une grande terrine. Ajouter un à un les jaunes d'oeufs en mélangeant après chaque addition. Battre les blancs en neige très fermes et les incorporer délicatement au mélange en soulevant bien pour obtenir une mousse légère. Mettre au frigo au moins trois heures avant dégustation."
},
{
    image: "/img/gallery/img_9.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Poulet basquaise",
    slug: "poulet-basquaise",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 1h15 de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["4 cuisses de poulet", "1 oignon", "1 poivron vert", "1 poivron rouge", "2 gousses d'ail", "1/4l de bouillon de volaille", "1 grande brique de Tomate Frito", "sel", "piment d'Espelette", "huile d'olive"],
    description: "Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le poulet. Pendant ce temps, hâcher l'oignon et couper les poivrons en lanières. Après coloration, réserver le poulet. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le poulet et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz."
},
{
    image: "/img/gallery/img_18.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Axoa de veau",
    slug: "axoa-de-veau",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["1kg de veau à mijoter", "1 oignon", "1 poivron vert", "1 poivron rouge", "2 gousses d'ail", "1/4l de bouillon de volaille", "1 grande brique de Tomate Frito", "sel", "piment d'Espelette", "huile d'olive"],
    description: "Couper le veau en dés de 2 cm de côtés. Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le veau. Pendant ce temps, hâcher l'oignon et couper les poivrons en carrés. Après coloration, réserver le veau. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le veau et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz."
},
{
    image: "",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Visitandines",
    slug: "visitandines",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "10 minutes + 15 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["50g de poudre d'amandes", "70g de farine", "150g de sucre en poudre", "4 blancs d'oeufs", "100g de beurre"],
    description: "Faire fondre le beure. Bien mélanger tous les ingrédients, puis rajouter le beurre fondu. Mettre à four modéré pendant 15 minutes environ."
},
{
    image: "/img/gallery/img_49.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Gâteau roulé",
    slug: "gateau-roule",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 10 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Technique",
    isVegetarian: true,
    ingredients: ["2 oeufs", "4 cuillères de farine", "4 cuillères de sucre", "1 boîte de crème Mont-Blanc au chocolat", "levure chimique"],
    description: "Mettre les ingrédients sans la levure dans un récipient. Quand la pâte est lisse, mettre une cuillère à café de levure. Verser sur une plaque à pâtisserie couverte d'une feuille de papier sulfurisé. Cuire à four chaud (210°C) 5 à 10 minutes. Démouler sur un linge humide saupoudré de sucre. Étaler une couche de crème Mont-Blanc. Rouler le gâteau."
},
{
    image: "/img/gallery/img_12.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Clafoutis aux pommes",
    slug: "clafoutis-aux-pommes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 œufs", "9 cuillerées à soupe de sucre semoule", "1 pincée de sel", "5 cuillerées à soupe de farine", "1/4l de lait", "60g de beurre", "4 ou 5 pommes", "1 sachet de sucre vanillé"],
    description: "Couper les pommes en tranches pas trop fines. Allumer le four à 180°C. Battre les œufs entiers en omelette, ajouter le sel et le sucre semoule. Bien mélanger. Tamiser la farine et la jeter en pluie dans les œufs. Mélanger jusqu'à ce que le mélange soit bien lisse. Faire fondre la moitié du beurre dans le four et l’ajouter à la pâte, une fois légèrement refroidi. Délayer enfin avec le lait. Beurrer un plat en verre. Disposer les pommes dans ce plat. Verser la pâte dessus. Parsemer de quelques noisettes de beurre. Faire cuire à four moyen (jusqu'à ce que le dessus commence à dorer). Dès la sortie du four, saupoudrer de sucre vanillé. Servir tiède."
},
{
    image: "/img/gallery/img_21.jpg",
    authorImg: "/img/top-chiefs/img_2.jpg",
    name: "Île flottante",
    slug: "ile-flottante",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "20 minutes + 20 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1/2 litre de lait", "4 jaunes d'œufs", "75g de sucre", "1/2 bâton de vanille", "4 blancs d'œufs", "1 pincée de sel", "25g de sucre"],
    description: "Crème anglaise : dans un récipient, travailler les jaunes d'œufs avec le sucre, ajouter doucement le lait bouillant, sans cesser de tourner. Verser dans une casserole et faire épaissir à feu doux (la crème ne doit surtout pas bouillir). Dès que le mélange nappe la cuillère en bois, verser dans un compotier et mettre au frais. Préparer ensuite la neige. Mettre à bouillir de l'eau et battre les blancs en attente avec 1 pincée de sel; sucrer. Le mélange doit être très ferme. Quand l'eau bout, régler le feu de manière à obtenir un simple frémissement en surface. Pocher alors les blancs par cuillerées, en comptant 1 mn pour chaque face. Egoutter sur du papier absorbant et disposer sur la crème comme des pétales. Servir froid."
},
{
    image: "/img/gallery/img_22.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte tatin",
    slug: "tarte-tatin",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 55 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de farine", "100g de beurre", "1 pincée de sucre", "1 pincée de sel", "1/3 de verre d'eau", "1 kg et demi de pommes calville", "125g de beurre", "125g de sucre semoule", "1 sachet de sucre vanillé", "1/2 cuillerée à café de cannelle en poudre", "1 citron"],
    description: "Mettre dans un saladier huit cuillerées à soupe de farine. 100 grammes de beurre coupé en petits morceaux, une pincée de sucre et une pincée de sel. Mélanger en pressant entre les paumes de vos mains de façon à former une pâte granuleuse. Ajouter alors un tiers de verre à moutarde d'eau. Mélanger de nouveau, toujours avec les mains, et former une boule de pâte. Mettre de côté. Peler sept grosses pommes. Couper les fruits en deux dans le sens de la hauteur. Enlever les cœurs et les pépins avec un petit couteau pointu. Allumer le four à 210°C. Dans un moule rond & bords lisses de 5 à 6 centimètres de profondeur mettre 125 grammes de beurre et 125 grammes de sucre semoule. Allumer le gaz à feu fort, poser dessus le moule. Quand le sucre commence à blondir, enlever le moule du feu et mettre dedans les demi-pommes « debout », bien serrées les unes contre les autres. Saupoudrer d'un sachet de sucre vanillé. Ajouter deux pincées de cannelle. Râper au-dessus un peu de zeste de citron. Remettre le moule sur le gaz allumé à feu doux et laisser cuire les pommes une demi-heure. Pendant ce temps, sur la table bien farinée, avec le rouleau à pâtisserie, étaler la pâte sur un demi-centimètre d'épaisseur. Les pommes ayant cuit une demi-heure, elles sont tendres et légèrement caramélisées. Enlever le moule du feu et laisser tiédir. Quand elles sont froides, recouvrir d'une couche de pâte, en évitant de la replier sur les bords extérieurs du moule. II faut que le bord de la pâte soit à l'intérieur du moule et non à l'extérieur. Mettre le moule dans le four chaud et faites cuire pendant vingt-cinq minutes. Servir cette tarte tiède ou froide en retournant le moule de façon que les pommes se trouvent sur le dessus. Ne pas démouler à la sortie du four, attendre que la tarte soit tiède."
},
{
    image: "/img/gallery/img_10.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Paëlla",
    slug: "paella",
    season: "Été",
    type: "Plat",
    timeToCook: "1 heure + 50 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["4 cuisses de poulet", "1/2 chorizo", "300g de crevettes", "1l de moules", "300g de riz", "1dl d'huile", "1 petite boîte de petits pois", "1 poivron vert", "1 boîte de coeurs d'artichaut", "1 grande brique de Tomate frito", "sel", "safran", "bouillon (3 fois le volume du riz, env. 3/4l)"],
    description: "Faire chauffer l'huile, d'olive de préférence, dans la paëlla, saler et faire revenir dedans le chorizo, puis le poulet. Mettre en attente dans une assiette. Faire revenir à leur tour dans la paëlla les morceaux de poivrons. Tous vos éléments sont maintenant à demi cuits. Verser le riz et faire revenir vivement pour le nacrer. Remettre les morceaux de viande dans la paëlla, éparpiller les petits-pois et les coeurs d’artichaut, disposer les moules tout autour comme les pétales d'une marguerite, puis les crevettes. Mouiller enfin avec le bouillon bouillant dans lequel vous avez mis le safran et la Tomate frito. Faire partir l'ébullition sur feu vif, puis régler le feu pour que la paella mijote 20 minutes à peu près. Au bout de ce temps, le riz doit avoir absorbé tout le bouillon. Décorer de quelques quartiers de citron et servir tel que dans le plat de cuisson."
},
{
    image: "/img/gallery/img_11.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Pot-au-feu",
    slug: "pot-au-feu",
    season: "Hiver",
    type: "Plat",
    timeToCook: "30 minutes + 3h de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["800g de  paleron de boeuf", "gros sel", "poivre", "4 carottes", "4 poireaux", "4 pommes de terre", "1 oignon piqué d'un clou de girofle", "1 gousse d'ail", "1 bouquet garni"],
    description: "Dans une grand cocotte, mettre la viande, la couvrir d'eau à hauteur et porter à ébullition rapidement. Écumer régulièrement pendant 5 min, puis baisser le feu pour conserver un léger frémissement. Ajouter le gros sel, l'oignon, l'ail et le bouquet garni. Laisser cuire pendant 1 h 30. Ajouter ensuite les légumes (à l'exception des pommes de terre) et poursuivre la cuisson durant 1 h. Finir en ajoutant les pommes de terre et terminer la cuisson (30 min). Goûter le jus au terme de la cuisson : s'il n'est pas assez goûteux, en prélever 1 litre et le faire réduire de moitié. Servir la viande et les légumes sur un plat chaud et le jus dans une saucière."
},
{
    image: "/img/gallery/img_13.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Blanquette de veau",
    slug: "blanquette-de-veau",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 2 heures de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1kg de veau", "60g d'oignons", "60g de carottes", "1 bouquet garni", "1/2 cuillère à soupe de sel", "1/4 de cuillère à café de poivre", "huile d'olive", "40g de farine", "2 cuillères à soupe de crème", "125 g de champignons", "2 cuillères à soupe de vinaigre d'alcool coloré"],
    description: "Faire revenir les morceaux de viande dans une cocotte en fonte. Les réserver puis faire revenir les oignons hâchés, les carottes coupées en rondelles puis les champignons. Pendant ce temps, verser la farine dans un bol et couvrir d'eau. Bien mélanger. Remettre la viande, ajouter le mélange et le bouquet garni. Saler et poivrer. Laisser cuire lentement pendant deux heures. En fin de cuisson ajouter la crème mélangée au vinaigre. Servir avec du riz."
},
{
    image: "/img/gallery/img_14.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Lasagnes chèvre-épinards",
    slug: "lasagnes-chevre-epinards",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["250g de pâte à lasagnes", "350g d'épinards frais", "400g de fromage de chèvre frais", "1/2l de lait", "50g de beurre", "50g de farine", "200g d'emmental rapé", "sel", "poivre"],
    description: "Faire cuire les épinards. Préparer la béchamel. Faire fondre le beurre dans une grande casserole, ajouter la farine et laisser cuire doucement pendant 2 min, sans coloration et tout en mélangeant. Incorporer le lait au fur et à mesure à l'aide d'un fouet, puis porter à ébullition et cuire 2 min. Saler et poivrer et ajouter 1/4 litre d'eau chaude. Préchauffer le four à 180 °C. Dans un plat à lasagne, verser une louche de béchamel et 1/2 louche d'eau, puis superposer des couches de lasagne préalablement trempées dans de l'eau froide, d'épinards, de chèvre et de béchamel. Terminer avec une couche de lasagne, couvrir de béchamel et d'emmental râpé. Couvrir le plat avec du papier aluminium et l'enfourner à 180 °C pendant 20 min. Retirer ensuite l'aluminium et laisser les lasagne griller pendant 5 min. Laisser reposer 5 min puis servir."
},
{
    image: "/img/gallery/img_15.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Quiche Lorraine",
    slug: "quiche-lorraine",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 pâte brisée", "200g de lardons fumés", "5 oeufs", "20cl de crème fraîche", "200g d'emmental râpé", "poivre"],
    description: "Dans un saladier, battre les oeufs, ajouter la crème et le poivre. Mettre la pâte dans un moule à tarte. Répartir les lardons et l'emmental. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte."
},
{
    image: "/img/gallery/img_16.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte chèvre-courgettes",
    slug: "tarte-chevre-courgettes",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 pâte brisée", "2 courgettes", "5 oeufs", "20cl de crème fraîche", "1 chèvre bûche de 300g", "thym"],
    description: "Dans un saladier, battre les oeufs, ajouter la crème. Éplucher les courgettes et les couper en rondelles. Mettre la pâte dans un moule à tarte. Répartir les rondelles de courgettes et le chèvre coupé en tranches. Verser la préparation. Parsemer de thym. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte."
},
{
    image: "/img/gallery/img_17.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Empanada au thon",
    slug: "empanada-au-thon",
    season: "Toutes saisons",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["2 pâtes brisées", "2 boîtes de thon de 160g", "1 petite brique de tomate frito", "1 poivron rouge", "1 poivron vert", "safran", "2 gousses d'ail", "1 jaune d'oeuf"],
    description: "Couper les poivrons en dés. Faire cuire les poivrons dans une poële avec de l'huile d'olive. Ajouter le thon émietté, la tomate frito, l'ail pressé et le safran. Laisser mijoter le tout quelques minutes à feu doux. Mettre un rouleau de pâte sur la sol du four. Répartir la préparation. Positionner le second rouleau par dessus en ayant préalablement fait une cheminée au centre et un quadrillage. Replier les bords et dorer avec le jaune d'oeuf. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte. Merci à Sandra pour m'avoir fait découvrir cette recette!"
},
{
    image: "/img/gallery/img_32.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Poulet au vin jaune",
    slug: "poulet-au-vin-jaune",
    season: "Hiver",
    type: "Plat",
    timeToCook: "30 minutes + 45 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    ingredients: ["1 poulet fermier coupé en morceaux", "50cl de vin Jaune", "40g de morilles déshydratées", "100g de champignons de Paris", "50cl de crème épaisse", "20g de beurre", "10cl de Madère", "2 tablettes de bouillon de volaille", "4 échalottes", "3 branches d'estragon", "20g de farine", "1 oignon", "2 gousses d'ail"],
    description: "Faire tremper les morilles dans l'eau chaude 30 minutes. Verser le madère dans une casserole. Le faire réduire. Ajouter les morilles, 0.5 tablette de bouillon de volaille. Couvrir d'eau et cuire 40 minutes. Saler le poulet côté chair. Le faire revenir côté peau. Mettre les échalottes émincées, l'oignon et l'ail et l'estragon dans un faitout avec 25cl d'eau, le vin jaune, 1.5 tablette de bouillon de volaille et les champignons coupés en lamelles. Faire chauffer à feu très vif. Puis, ajouter les morceaux de poulet et laisser cuire 15 minutes. Sortir les blancs car ils cuisent plus vite. Travailler le beurre en pommade avec la farine. Lorsque les autres morceaux de poulet sont cuits, les retirer ainsi que l'estragon. Faire réduire le jus de cuisson(presque à sec), ajouter alors le beurre manié puis la crème fraîche. Laisser cuire 5 minutes en remuant. Remettre les morceaux de poulet en les nappant avec la sauce, puis ajouter les morilles égouttées. Servir dans un plat chaud saupoudré d'estragon frais. Vous pouvez l'accompagner de riz blanc, de pâtes fraîches, de haricots verts, de pomme de terre vapeur ou mieux encore de polenta frite."
},
{
    image: "/img/gallery/img_31.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Polenta frite",
    slug: "polenta-frite",
    season: "Hiver",
    type: "Plat",
    timeToCook: "15 minutes + 45 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de polenta", "60cl de bouillon de légumes", "40cl de lait", "25g de beurre", "40g de parmesan", "4 cuillères à soupe d'huile d'olive"],
    description: "Dans une casserole, porter à ébullition le bouillon et le lait. Verser en pluie la polenta et remuer énergiquement. Ajouter le parmesan et faire cuire 5 minutes. Étaler la polenta sur une plaque beurrée. Laisser refoirdir. Détailler la polenta à l'emporte pièce. Verser l'huile d'olive dans la poêle, faire dorer environ 3 minutes de chaque côté selon la grosseur. "
},
{
    image: "/img/gallery/img_47.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Cocktail de Champagne aux framboises",
    slug: "cocktail-de-champagne-aux-framboises",
    season: "Toutes saisons",
    type: "Apéritif",
    timeToCook: "10 minutes",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["1 bouteille de Champagne", "Cointreau", "sirop de citron vert", "sucre de canne", "250g de framboises surgelées"],
    description: "Choisir un joli contenant transparent avec une large ouverture. La bouteille de Champagne doit être bien fraîche. Mettre dans l'ordre une louche de cointreau, une louche de citron vert, une louche de sucre de canne. Pencher un peu le contenant et verser doucement le Champagne sur le rebord. Mélanger très légèrement en versant les framboises surgelées. Servir à la louche, de préférence dans des coupes ou des verres aux bords un peu larges"
},
{
    image: "/img/gallery/img_44.jpg",
    authorImg: "/img/top-chiefs/img_5.jpg",
    name: "Tuiles aux amandes",
    slug: "tuiles-aux-amandes",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes + 5 minutes de cuisson",
    averagePrice: "€€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["4 blancs d'oeufs", "2 jaunes", "125g d'amandes éffilées", "200g de sucre semoule", "2 sachets de sucre vanillé", "100g de farine", "80g de beurre fondu"],
    description: "Préchauffer le four à 180°C. Battre les blancs avec le sucre et le sucre vanillé à la main au moins 4 minutes. Ajouter la farine, le beurre, les jaunes et les amandes. Mettre du papier sulfurisé sur une plaque de cuisson. Mettre une cuillère à soupe de pâte et l'étaler. Ajouter quelques amandes au-dessus. Cela sur toute la plaque en les espaçant pour qu'elles ne se collent pas entre elles. Enfourner 4 à 5 minutes. Bien surveiller. Les sortir du four dès qu'elles soient dorées.Les décoller rapidement et les coller sur un rouleau à pâtisserie pour qu'elles en prennent la forme. Les mettre dans un bocal hermétique dès qu'elles ont refroidi. Les tuiles peuvent se conserver plusieurs semaines."
},
{
    image: "/img/gallery/img_48.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Caviar d'aubergines",
    slug: "caviar-d-aubergines",
    season: "Été",
    type: "Apéritif",
    timeToCook: "10 minutes + 40 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["3 grosse aubergines", "3 gousses d’ail", "6 branches de thym", "6 cuillères à soupe d’huile d’olive", "sel", "poivre"],
    description: "Préchauffer le four à 200°C. Nettoyer les aubergines et les ouvrir en 2 dans le sens de la longueur. Les déposer sur une plaque de cuisson recouverte de papier sulfurisé. Les inciser légèrement. Saler, poivrer. Déposer le thym et arroser d’un filet d’huile d’olive. Enfourner pendant 30 à 40 minutes. Avec une cuillère retirez la chair des aubergines. Mixez la avec les gousses d’ail dégermées pressées pour obtenir une purée fine. Rectifier l’assaisonnement et ajouter un filet d'huile d'olives si besoin."

},
{
    image: "/img/gallery/img_28.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Tarte saumon et poireaux",
    slug: "tarte-saumon-poireaux",
    season: "Toutes",
    type: "Plat",
    timeToCook: "10 minutes + 45 minutes de cuisson",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["1 pâte brisée", "250g de saumon", "6 oeufs", "20cl de crème fraîche", "3 chèvre poireaux", "sel", "poivre", "huile d'olive"],
    description: "Nettoyer les poireaux et les couper en rondelles. Les mettre à cuire avec un filet d'huile d'olive. Dans un saladier, battre les oeufs, ajouter la crème, saler et poivrer. Ajouter les poireaux. Détailler le saumon en morceaux. Mettre la pâte dans un moule à tarte. Répartir les morceaux de saumon. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte."
},
{
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Macarons",
    slug: "macarons",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "1 heure + 10 minutes de cuisson par plaque",
    averagePrice: "€",
    difficulty: "Technique",
    isVegetarian: true,
    ingredients: ["200g de poudre d'amandes", "200g de sucre glace", "150g de blancs d'oeuf", "200g de sucre en poudre", "5cl d'eau", "1g de colorant alimentaire en poudre"],
    description: "Préchauffer le four à 140°C. Pour colorer les coques avec du cacao, diminuer la quantité de poudre d'amandes: pour 30g de cacao il ne faut que 170g de poudre d'amandes. Verser la poudre d'amande et le sucre glace ,et le cacao le cas échéant, dans un mixeur. Faire tourner pendant 30 secondes pour affiner le mélange (tant pour tant), puis tamiser. Dans une casserole, mélanger l'eau et le sucre semoule avec une spatule et cuire à 118-119 °C. Avant d'atteindre cette température, mettre 75g de blancs dans la cuve d'un batteur et les monter. Lorsque le sucre a atteint la bonne température, le verser sur les blancs montés en laissant couler un filet du sirop le long de la paroi du bol. Ajouter le colorant en poudre si nécessaire. Continuer à fouetter ensuite jusqu'à refroidissement de la meringue. Verser le reste de blancs d’œufs sur le tant pour tant. Incorporer une petite partie de la meringue froide à ce mélange, puis ajouter le reste petit à petit en macaronant la pâte. Remplir une poche à douille avec cette préparation et dresser les macarons sur du papier sulfurisé. Lâcher la plaque de 50cm de hauteur afin de chasser les bulles d'air. Laisser crôuter 15 minutes. Enfourner pendant 10 minutes en tournant la plaque à mi-cuisson. Laisser ensuite les coques refroidir avant de les décoller du papier cuisson. Remplir une poche à douille avec la préparation choisie. Coller les coques deux par deux"
},
{
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Ganache chocolat blanc gingembre",
    slug: "ganache-chocolat-blanc-gingembre",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de chocolat blanc", "20g de gingembre", "10cl de crème liquide entière"],
    description: "Faire fondre le chocolat blanc au bain-marie. Peler le gingembre et le râper. Dans une casserole, disposer la crème avec le gingembre, puis porter à ébullition. Verser en 3 fois sur le chocolat fondu. Laisser prendre au réfrigérateur."
},
{
    image: "/img/gallery/img_29.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Gelée de framboises et fève de Tonka",
    slug: "gelee-de-framboises-et-feve-de-tonka",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    isVegetarian: true,
    ingredients: ["200g de framboise surgelées", "120g de sucre", "1g d'Agar Agar, 1/2 fève de Tonka"],
    description: "Mettre le sucre dans une poêle, laisser colorer jusqu'à obtention d'un caramel, puis ajouter les framboises surgelées et la fève de tonka râpée. Laisser évaporer l'eau jusqu'à obtenir une marmelade. Puis porter à ébullition 1 minute avec l'agar-agar. Laisser prendre au réfrigérateur."
},
{
    image: "/img/gallery/img_30.jpg",
    authorImg: "/img/top-chiefs/img_1.jpg",
    name: "Panacotta coulis de framboises",
    slug: "panacotta-coulis de framboises",
    season: "Toutes saisons",
    type: "Dessert",
    timeToCook: "15 minutes",
    averagePrice: "€",
    difficulty: "Facile",
    ingredients: ["3 feuilles de gélatine de 2g", "40cl de crème liquide entière", "1 gousse de vanille", "100g de sucre en poudre", "10cl d'eau", "20g de sucre en poudre", "125g de framboises fraîches"],
    description: "Mettre la gélatine à ramollir dans un bol d'eau froide. Faire bouillir 10 cl de crème liquide avec 100 g de sucre et la gousse de vanille fendue en 2. Ajouter ensuite la gélatine égouttée ainsi que le reste de crème. Verser la préparation dans des verrines individuelles et réserver au frais. Pour le coulis, laver les framboises, puis les mixer au blender avec 20g de sucre. Ajouter de l'eau si nécessaire. Réserver au frais."
    },
    {
        image: "/img/gallery/img_33.jpg", 
        authorImg: "/img/top-chiefs/img_2.jpg", 
        name: "Tarte aux pommes", 
        slug: "tarte-aux-pommes", 
        season: "Toutes saisons", 
        type: "Dessert", 
        timeToCook: "15 minutes + 35 minutes de cuisson", 
        averagePrice: "€", 
        difficulty: "Facile",
        isVegetarian: true, 
        ingredients: ["4 pommes granny smith", "4 oeufs", "100g de sucre", "25cl de crème épaisse", "1 pâte feuilletée", "1 sachet de sucre vanillé"], 
        description: "Préchauffer le four à 200 degrés. Peler les pommes. Mettre la pâte feuilletée dans un moule à tarte. Disposer les trannches de pommes. Dans un récipient, battre les oeufs, la crème et le sucre. Mettre à four chaud. À la sortie du four, parsemer de sucre vanillé."
    },
    {
        image: "/img/gallery/img_34.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Magret de canard sauce au poivre vert", 
        slug: "magret-de-canard-sauce-au-poivre-vert", 
        season: "Toutes saisons", 
        type: "Plat", 
        timeToCook: "20 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ["1 magret de canard du sud-ouest", "poivre vert en saumure", "20cl de crème épaisse", "20cl de cognac", "60cl d'eau chaude", "4 cuillères à soupe de fond de veau", ""], 
        description: "Bouillir pendant 3 minutes le cognac avec du poivre vert en grains et une autre partie écrasée au mortier. Mélanger à part l'eau chaude avec le fond de veau pour le dissoudre. Incorporer au cognac puis mettre de nouveau à bouillir pour que la sauce s'évapore d'1/4. Mettre la crème épaisse et laisser à nouveau réduire à feu doux jusqu'à ce que le mélange nappe une cuillère en bois (lorsqu'on passe son doigt la trace ne s’efface pas). Saler et poivrer et servir avec le magret."
    },    
    {
        image: "/img/gallery/img_35.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Confiture de poivrons rouges", 
        slug: "confiture-de-poivrons-rouges", 
        season: "Été", 
        type: "Apéritif", 
        timeToCook: "30 minutes + 45 minutes de cuisson", 
        averagePrice: "€", 
        difficulty: "Facile",
        isVegetarian: true,
        ingredients: ["1kg de poivrons rouges bio", "sucre à confiture", "safran"], 
        description: "Éplucher les poivrons à l'aide d'un économe prévu à cet effet. Les mixer. Les peser puis ajouter la moitié du poids des poivrons en sucre et le safran. Faire cuire la confiture à gros bouillon jusqu'à ébullition sans cesser de remuer. Enlever l'écume si besoin. Continuer la cuisson à feu doux jusqu'à ce qu' elle fige au contact d'une assiette froide. Servir en toast avec du fromage."
    }, 
    {
        image: "/img/gallery/img_36.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Salade de pâtes au melon et au magret fumé", 
        slug: "salade-de-pates-au-melon-et-au-magret-fume", 
        season: "Été", 
        type: "Salade", 
        timeToCook: "20 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ["400g d'orecchiette", "magret fumé en tranches", "1 melon", "basilic", "huile d'olive infusée à l'ail", "parmesan"], 
        description: "Faire cuire les pâtes. Pendant ce temps, faire des billes de melon. Enlever le gras du magret. Quand les pâtes sont cuites, les égoutter et les rafraîchir à l'eau froide. Égoutter à nouveau. Verser les pâtes dans un saladier. Les assaisonner avec l'huile d'olive à l'ail. Bien mélanger. Ajouter le melon, les tranches de magret et des copeaux de parmesan. Ciseler du basilic frais."
    },   
    {
        image: "/img/gallery/img_39.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Tian", 
        slug: "tian", 
        season: "Été", 
        type: "Plat", 
        timeToCook: "30 minutes + 50 minutes de cuisson", 
        averagePrice: "€", 
        difficulty: "Facile",
        isVegetarian: true, 
        ingredients: ["1.2kg de courgettes", "1 bouquet de persil", "1 bouquet de basilic", "3 gousses d'ail", "6 oeufs", "100g de parmesan", "4 cuillères à soupe d'huile d'olive"], 
        description: "Râper le courgettes et mettre dans une poêle avec l'huile d'olive. Laisser évaporer toute l'eau. Quand les courgettes commencent à dorer, retirer du feu. Battre les oeufs en omelette. Saler et poivrer. Rajouter ensuite les courgettes ainsi que le parmesan. Verser dans un moule à cake de 1.5 litres préalablement huilé. Mettre au four au bain-marie à 180°C pendant 50 minutes. Démouler et servir avec un coulis de tomates(ou pas) et une salade. Un grand merci à Cécile pour m'avoir partagé sa recette!"
    },
    {
        image: "/img/gallery/img_40.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Cake au thon", 
        slug: "cake-au-thon", 
        season: "Été", 
        type: "Plat", 
        timeToCook: "15 minutes + 45 minutes de cuisson", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ["2 boîtes de thon de 185g", "250g de filet de poisson blanc", "3 oeufs", "1 petite brique de tomate frito de 212g", "2 cuillères à soupe de farine"], 
        description: "Dans un saladier, écraser le thon égoutté. Couper le filet de poisson en petit dés. Les mélanger au thon. Saler et poivrer. Ajouter les 3 oeufs, puis la sauce tomate et la farine. Bien mélanger le tout. Verser dans un moule à cake en silicone. Mettre au four à 210°C pendant 45 minutes. Servir frais accompagné d'une salade."
    },
    {
        image: "/img/gallery/img_41.jpg", 
        authorImg: "/img/top-chiefs/img_6.jpg", 
        name: "Gyosas", 
        slug: "gyosas", 
        season: "Toutes saisons", 
        type: "Plat", 
        timeToCook: "45 minutes + 20 minutes de cuisson", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ["200 g de farine", "100 ml d’eau", "1 c. à s de maïzena", "200 g de viande hachée (mélange porc-veau)", "1 gousse d’ail", "1 botte de ciboulette", "Sauce soja", "Huile de sésame"], 
        description: "Faire bouillir de l’eau. Verser la farine et une pincée de sel dans un récipient puis ajouter l’eau bouillante. Pétrir et humidifier si nécessaire jusqu’à l’obtention d’une pâte bien lisse (5 à 7 minutes). Former une boule et filmer, puis laisser reposer 15 minutes. Mettre la viande hachée dans un bol. Ajouter la gousse d’ail émincée, la ciboulette finement ciselée puis saler et poivrer. Ajouter la maïzena, une cuillère à soupe de sauce soja et d’huile de sésame, puis mélanger. Fariner le plan de travail. Rouler la pâte en forme de cylindre et la découper en disques. Etaler les disques un à un le plus finement possible, jusqu’à ce que l’on puisse légèrement voir ses doigts en transparence à travers (on peut également utiliser un laminoir). Pour former les gyozas, déposer avec une fourchette de la farce dans un disque de pâte, humidifier les extrémités puis replier la partie sèche en quatre rabats sur la partie humide. Une fois que tous les gyozas sont terminés, les disposer en cercle dans un poêle (non-adhésive) et les faire dorer à l’huile de sésame. Ensuite, mélanger une cuillère à soupe de maïzena dans environ 150 ml d’eau, verser le mélange sur les gyozas puis couvrir et cuire 10 minutes à feu moyen. Retirer le couvercle et laisser dorer quelques minutes à nouveau, puis retourner la poêle dans une assiette. C’est prêt ! A déguster avec de la sauce soja, ou nature."
    },
    {
        image: "/img/gallery/img_43.jpg", 
        authorImg: "/img/top-chiefs/img_6.jpg", 
        name: "Pâtés impériaux", 
        slug: "pates-imperiaux", 
        season: "Toutes saisons", 
        type: "Plat",
        timeToCook: "45 minutes + 15 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ["300g de porc hâché", "2 boîtes de crabe", "1/2 sachet de vermicelle chinois", "1/2 sachet de champignons noirs", "2 oeufs", "2 gousses d'ail", "2 oignons", "1 petit bouquet de persil", "galettes de riz", "3 carottes"], 
        description: "Faire tremper les champignons pendant 20 minutes dans de l'eau tiède et le vermicelle pendant 10 minutes dans de l'eau froide. Hâcher finement les ingrédients de la garniture, bien mélanger. Étaler les galettes sur le plan de travail et les mouiller à l'aide d'une éponge imbibée d'eau. Attendre quelques secondes pour qu'elles deviennent malléables. Les garnir de farce et les rouler. Faire chauffer l'huile dans une poêle et faire frire les rouleaux 15 minutes jusqu'à ce qu'ils soient bien dorés. Servir avec de la salade, de la menthe fraîche et de la sauce nuoc mam."
    },
    {
        image: "/img/gallery/img_42.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Salade de pâtes aux crevettes", 
        slug: "salade-de-pates-aux-crevettes", 
        season: "Été", 
        type: "Salade", 
        timeToCook: "20 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['250g de torti trois couleurs', '200g de crevettes bio', '1 poivron rouge', '1 concombre pépino', 'mayonnaise', '60g de parmesan'], 
        description: "Faire cuire les pâtes à grande eau. Pendant ce temps tailler le concombre et le poivron en petits dés. Rincer les pâtes à l'eau froide. Mélanger les pâtes, le cocombre et le poivron dans un saladier. Napper de mayonnaise. Verser le parmesan. Bien mélanger le tout. Servir bien frais."
    },
    {
        image: "/img/gallery/img_29.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Ganache mojito", 
        slug: "ganache-mojito", 
        season: "Toutes", 
        type: "Dessert", 
        timeToCook: "15 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['15cl de crème liquide entière', '150g de chocolat blanc', '2cl de rhum', '2 citron verts', 'menthe fraîche', '60g de poudre d\'amandes'], 
        description: "Faire fondre le chocolat blanc au bain-marie. Laver et zester les citrons verts. Laver et effeuiller la menthe. Dans une casserole, disposer la crème avec les feuilles de menthe et les zestes de citron, puis porter à ébullition. Mixer le tout dans un blender. Verser en 3 fois sur le chocolat fondu. Terminer avec le rhum et la poudre d'amande. Refroidir la préparation. À l'aide d'une poche à douille, garnir les coques de macarons."
    },
    {
        image: "/img/gallery/img_45.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Magret séché", 
        slug: "magret-seche", 
        season: "Toutes", 
        type: "Apéritif", 
        timeToCook: "5 minutes", 
        averagePrice: "€€", 
        difficulty: "Facile", 
        ingredients: ['1 magret de canard', '1kg de gros sel', 'thym', 'poivre'], 
        description: "Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines. Un grand merci à Valérie de m'avoir partagé sa recette."
    },
    {
        image: "/img/gallery/img_50.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Salade Caesar", 
        slug: "salade-caesar", 
        season: "Été", 
        type: "Salade", 
        timeToCook: "30 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['Filets de poulet', 'farfalle', 'roquette', '3 oeufs durs', '1 jaune d\'oeuf', 'parmesan', 'jus de citron', 'vinaigre de Xérès', '2 gousses d\'ail', 'filets d\'anchois à l\'huile', 'huile d\'olive', 'piment d\'Espelette', 'crème'], 
        description: "Faire cuire les oeufs durs. Dénerver et dégraisser les filets de poulet. Les saupoudrer de piment d'Espelette. Les rouler en ballotine bien serrée dans du film alimentaire. Renouveler l'opération une seconde fois. Faire cuire dans une casserole d'eau bouillante pendant une vingtaine de minutes. Faire cuire les farfalle. Laisser refroidir le tout. Pour la sauce(pour 2 personnes), dans un blender mettre un oeuf dur, un jaune d'oeuf, 5 filets d'anchois, 20g de parmesan rapé, 1 cuillère à soupe de jus de citron, 2cl de vinaigre de Xérès et l'ail pressé. Mixer le tout. Puis rajouter 5cl d'huile d'olive en filet. Ajouter une cuillère à soupe de crème pour détendre la sauce. Assaisonner avec du piment d'Espelette. Pour les amateurs, ajouter du tabasco et de la sauce Worcestershire."
    },
    {
        image: "/img/gallery/img_52.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Magret séché fourré au foie gras", 
        slug: "magret-seche-fourre-au-foie-gras", 
        season: "Toutes", 
        type: "Apéritif", 
        timeToCook: "15 minutes", 
        averagePrice: "€€", 
        difficulty: "Facile", 
        ingredients: ['150g de foie gras frais', '1 magret de canard', '1kg de gros sel', 'thym', 'poivre'], 
        description: "Découper une bande de foie gras d’environ 150gr. L’assaisonner avec un peu de fleur de sel et du poivre. Avec du film alimentaire, faire une ballotine avec le morceau de foie gras afin de lui donner une forme cylindrique. Placer le au congélateur afin de le faire durcir et ainsi faciliter son insertion dans le magret. Inciser le magret en son centre afin de créer une cavité suffisamment grande pour y accueillir l’insert de foie gras. Dès que le foie gras est assez dur, l’insérer dans le magret. Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines. Un grand merci à Valérie de m'avoir partagé sa recette."
    },
    {
        image: "/img/gallery/img_53.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Roulés au pesto", 
        slug: "roules-au-pesto", 
        season: "Toutes", 
        type: "Apéritif", 
        timeToCook: "20 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['Pain de mie sans croûte', '6 tranches de jambon serrano', 'pesto', 'mozzarella'], 
        description: "Étaler les tranches de pain de mie avec un rouleau à pâtisserie sur 3 mm d'épaisseur. Répartir une très fine couche de pesto, mettre les tranches de jambon serrano par-dessus. Couper des bâtonnets de mozzarella et les disposer sur la base de pain, puis rouler l'ensemble délicatement. Avec du film alimentaire, former des ballotines bien serrées. Mettre au frais."
    },
    {
        image: "/img/gallery/img_54.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Champignons au four", 
        slug: "champignons-au-four", 
        season: "Toutes", 
        type: "Apéritif", 
        timeToCook: "20 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['250g de champignons de Paris frais', '2-3 tranches de jambon serrano', 'fromage frais', 'piment d\'Espelette'], 
        description: "Enlever les pieds de champignons. Eplucher les têtes. Travailler le fromage frais (de chèvre, de brebis ou de vache au choix) en l'assaisonnant avec du piment d'Espelette. Garnir l'intérieur du champignon avec le fromage frais. Découper des morceaux de jambon, les façonner pour leur donner une forme volumineuse et les déposer sur le fromage. Mettre au four à 210°C pendant une dizaine de minutes environ."
    }, {
        image: "/img/gallery/img_55.jpg", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "Lomo séché", 
        slug: "lomo-seche", 
        season: "Toutes", 
        type: "Apéritif", 
        timeToCook: "15 minutes", 
        averagePrice: "€", 
        difficulty: "Facile", 
        ingredients: ['1 filet mignon de porc de 500g au moins', 'sel fin (4.5% du poids de la viande)', 'sucre de canne blond (la moitié du poids du sel)', 'paprika ou pimenton de la Vera(3% du poids de la viande)', 'poivre du moulin', 'piment d\'Espelette'], 
        description: "Parer la viande, peser la afin de calculer la quantité à apporter de sel, de sucre et d’épices. Mélanger le tout dans un bol pour faire l’adobado (la marinade). Saupoudrer le mélange sel,sucre et épices sur toutes les faces de la viande et masser pour bien faire adhérer le mélange sur la viande. Mettre la pièce de viande dans un sac et mettre à mariner sous-vide. Garder au réfrigérateur à 3° / 5° C. La durée de la salaison dépend de l’épaisseur de la pièce de viande. Pour un filet mignon de 6 cm de diamètre il faut 0.5 jour par cm d’épaisseur + 1 jour, soit 3 + 1 = 4 jours au sel. Retourner le sac tous les jours afin de saler et parfumer uniformément la viande. Le temps de salage passé, sortir la viande du sac. Rincer et sécher la viande avec du papier absorbant. Remettre des épices autour de la viande (environ 2% du poids). Poser la viande sur une grille au réfrigérateur à 3° / 5°C. On considère que la viande est suffisamment sèche quand elle a perdu entre 30 et 40% de son poids initial."
    }
    /*{
        image: "", 
        authorImg: "/img/top-chiefs/img_1.jpg", 
        name: "", 
        slug: "", 
        season: "Hiver", 
        type: "Plat", 
        timeToCook: "", 
        averagePrice: "", 
        difficulty: "", 
        ingredients: [], 
        description: ""
    },*/   
    ];

export const seasons: Season[] = ["Printemps", "Été", "Automne", "Hiver", "Toutes saisons"];
export const difficulties: Difficulty[] = ["Facile", "Technique"];
export const averagePrices: AveragePrice[] = ["€", "€€", "€€€"];
export const recipeTypes: RecipeType[] = [
  "Entrée",
  "Plat",
  "Dessert",
  "Apéritif",
  "Salade",
  "Végétarien"
];

/**
 * Helper that returns the localized fields of a recipe, falling back to French
 * when an English translation is not available.
 */
export function localizeRecipe(recipe: Recipe, lang: "fr" | "en") {
  if (lang === "en") {
    return {
      name: recipe.name_en ?? recipe.name,
      description: recipe.description_en ?? recipe.description,
      ingredients: recipe.ingredients_en ?? recipe.ingredients,
      timeToCook: recipe.timeToCook_en ?? recipe.timeToCook,
    };
  }
  return {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    timeToCook: recipe.timeToCook,
  };
}

export function localizeChief(chief: Chief, lang: "fr" | "en") {
  return {
    name: chief.name,
    description: lang === "en" ? (chief.description_en ?? chief.description) : chief.description,
  };
}
