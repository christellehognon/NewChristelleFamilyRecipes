import type { RecipeDescription } from "./recipes";

/**
 * Textes de préparation, par slug. Séparés de recipes.ts pour ne pas alourdir le
 * premier chargement du site : ils ne servent que sur la page d'une recette, qui
 * les charge à la demande.
 */
export const recipeDescriptions: Record<string, RecipeDescription> = {
  "riz-au-lait": {
    description:
      "Fendre la gousse de vanille en 2 puis la gratter. Laver le riz. L'ébouillanter 1 minute. Dans une casserole: disposer le lait, la vanille et le riz. Cuire à feu doux jusqu'à ce que le riz ait absorbé tout le liquide. Ajouter le sucre. Laisser refroidir à température ambiante. Dresser dans des verrines.",
    description_en:
      "Split the vanilla bean in half lengthwise, then scrape out the seeds. Rinse the rice. Blanch it for 1 minute. In a saucepan, combine the milk, vanilla, and rice. Cook over low heat until the rice has absorbed all the liquid. Add the sugar. Let cool to room temperature. Spoon into small glasses.",
  },
  "terrine-de-porc": {
    description:
      "Hacher le foie, le lard, le veau et les échalottes. Ajouter les œufs, le persil et les biscottes écrasées. Assaisonner, bien mélanger le tout. Verser la préparation dans une terrine de 26cm. Poser sur le dessus la feuille de laurier. Fermer avec un couvercle. Faire cuire au bain-marie au four th7 ou 200°C pendant 1h30. (souvent plus !) Laisser refroidir et verser la gelée sur le dessus.",
    description_en:
      "Chop the liver, bacon, veal, and shallots. Add the eggs, parsley, and crushed rusks. Season and mix everything well. Pour the mixture into a 26-cm terrine dish. Place the bay leaf on top. Cover with a lid. Bake in a water bath in the oven at 200°C for 1 hour and 30 minutes. (often longer!) Let cool and pour the jelly over the top.",
  },
  "tian-de-courgettes-au-riz": {
    description:
      "Portez à ébullition une casserole d’eau, salez-la et versez-y en pluie le riz. Laissez cuire 15 à 20 min suivant la nature du riz puis égouttez. Pelez et émincez finement les oignons et une gousse d’ail. Faites chauffer 2 c. à soupes d’huile d’olive dans une poêle.  Mettez-y les oignons et l’ail à fondre doucement, en remuant de temps en temps, pendant environ 10 minutes. Lorsque les oignons sont translucides, mélangez-les au riz cuit. Salez, poivrez, vérifiez l’assaisonnement. Allumez le four th 5 (env. 170°C). Lavez et essuyez les tomates et les courgettes . Coupez-les en rondelles régulières d’ ½ cm d’épaisseur. Poudrez légèrement les courgettes de sel fin et laissez dégorger quelques minutes sur su papier absorbant. Epluchez l’autre gousse d’ail. Enduisez un plat à four en terre avec une c. à soupe d’huile d’olive et frottez-le avec la gousse d’ail. Etalez au fond le mélange de riz et d’oignons en une seule couche. Couvrez de rondelles de tomates et de courgettes, en intercalant harmonieusement les couleurs. Saupoudrez avec une c. à café de thym, salez, poivrez, arrosez avec 3 c. à soupe d’huile d’olive. Faites cuire 50 minutes environ au four. Servez chaud ou tiède. Variante : vous pouvez ajouter de fines rondelles d’aubergines (dégorgées) en alternance avec les autres légumes, mais également des lamelles de fromage de chèvre frais et des olives noires hachées. Vous préparerez ainsi un plat complet, idéal pour le dîner. Tour de main : Pour couper facilement tomates et courgettes en rondelles, utilisez toujours un couteau-scie, ce qui facilite l’opération sans risquer de déformer les rondelles. Si les courgettes ont une peau très fine, ne les pelez pas ; en revanche, si elle vous semble un peu épaisse, épluchez-les avec un couteau économe, en laissant une lanière de peau sur deux, c’est plus joli.",
    description_en:
      "Rinse the olives several times under running water. Place all the ingredients in a 1-liter jar and cover with olive oil. Let them marinate for about four weeks before serving.",
  },
  "olives-a-la-niçoise": {
    description:
      "Rincer les olives plusieurs fois à l’eau claire. Mettre tous les ingrédients dans un bocal de 1l et recouvrir avec l’huile d’olive. Laisser macérer environ quatre semaines avant dégustation.",
    description_en:
      "Rinse the olives several times under running water. Place all the ingredients in a 1-liter jar and cover with olive oil. Let them marinate for about four weeks before serving.",
  },
  "la-frita": {
    description:
      "Couper l’ensemble des légumes en petits dés. Faire cuire très lentement chaque légume à part. Puis les mélanger doucement et prolonger la cuisson 15 à 20 minutes. La veille de la cuisson, préparer une vinaigrette corsée. Egoutter un peu la frita pour éliminer le jus de tomates. Ajouter la vinaigrette, mélanger et laisser au frais. Servir sur des petites cuillères ou en verrines.",
    description_en:
      "Slow-cooked mixed vegetables (onion, peppers, tomatoes) with olive oil and herbs; served as an antipasto.",
  },
  "supreme-au-chocolat": {
    description:
      "Séparer les blancs et les jaunes des oeufs. Fouetter les jaunes et le sucre jusque’à ce qu’ils blanchissent. Mettre les 250g de chocolat brisés dans une casserole. Faire fondre au bain-marie. Ajouter aux jaunes, mélanger. Ajouter la poudre d'amandes avec la levure, la maïzena et le beurre ramolli. Puis 3 blancs d'oeufs battus en neige avec la pincée de sel. Mélanger délicatement. Verser dans le moule beurré et saupoudrer de sucre semoule. Ne remplir qu'aux 3/4, et mettre à four chaud 210°C (th. 6-7). Cuire rapidement pour conserver le milieu de la pâte crémeuse (25 min). Laisser tiédir dans le moule. Démouler sur une grille et laisser refroidir - Décorer à volonté de chantilly et de cerises confites.",
    description_en:
      "Separate the egg whites from the yolks. Whisk the yolks and sugar until pale and fluffy. Place the 250g of chopped chocolate in a saucepan. Melt over a double boiler. Add to the yolks and mix. Add the ground almonds, baking powder, cornstarch, and softened butter. Then fold in the 3 egg whites beaten to stiff peaks with a pinch of salt. Mix gently. Pour into a buttered pan and sprinkle with granulated sugar. Fill only 3/4 full, and bake in a preheated oven at 210°C (320°F). Bake quickly to keep the center of the cake creamy (25 min). Let cool slightly in the pan. Turn out onto a wire rack and let cool completely. Decorate as desired with whipped cream and candied cherries.",
  },
  "granite-de-pommes": {
    description:
      "Pour le granité, mélanger à la fourchette pour être bien fluide (pas de grumeaux) la farine, le sucre puis le beurre la canelle et le sucre vanillé. Faire un sable. Couper les pommes en tranches fines. Les faire sauter dans une poêle dans un sirop de sucre (eau et 100g de sucre). Les faire revenir rapidement. Laisser refroidir. Mettre les pommes dans un moule de 26 cm environ et répendre le sable. Mettre au four à 210°C environ 25’. Servir tiède avec une crème pâtissière très froide.",
    description_en:
      "For the granita, use a fork to mix the flour and sugar until smooth (no lumps), then add the butter, cinnamon, and vanilla sugar. Make a crumb mixture. Cut the apples into thin slices. Sauté them in a skillet in a sugar syrup (water and 100g of sugar). Sauté them quickly. Let cool. Place the apples in a 26 cm baking dish and spread the crumble mixture over them. Bake at 210°C for about 25 minutes. Serve warm with very cold pastry cream.",
  },
  "creme-patissiere": {
    description:
      "Faire bouillir le lait avec la gousse de vanille fendue. Dans un cul-de-poule, blanchir les jaunes d'oeufs avec le sucre, puis ajouter la farine. Verser le lait chaud dessus petit à petit et remettre le tout dans la casserole. Cuire à feu doux et faire épaissir. Débarrasser ensuite sur une plaque et recouvrir d'un papier film au contact. Réserver.",
    description_en:
      "Bring the milk to a boil with the split vanilla bean. In a mixing bowl, beat the egg yolks with the sugar until pale, then add the flour. Gradually pour the hot milk over the mixture and return everything to the saucepan. Cook over low heat until thickened. Then transfer to a baking sheet and cover with plastic wrap, making sure it touches the surface. Set aside.",
  },
  couscous: {
    description:
      "La veille, mettre à tremper les pois-chiches. Les faire pré-cuire afin de pouvoir retirer facilement la peau indigeste. Pour la sauce des légumes, tailler les légumes en cube. Faire revenir un oignon dans l’huile d’olive. Puis ajouter les carottes, le poivron, les courgettes et les aubergines. Couvrir d’eau. Assaisonner avec du gros sel. Ajouter les pois-chiches, une boîte de tomates pelées et une boîte de concentré de tomates. Ajouter les poireaux après 30’ de cuisson. Pour la sauce de la viande, faire revenir les cuisses de poulet, puis un oignon. Ajouter une boîte de tomates pelées et une boîte de concentré de tomates. Et au besoin un peu d’eau. Assaisonner avec un peu de gros sel et de la harissa. Pour la semoule, la verser dans un plat. La graisser avec un filet d’huile. Verser un peu d’eau bouillante pour la réhydrater. Passer une minute au micro-ondes. Faire cuire les merguez dans une poêle.",
    description_en:
      "The day before, soak the chickpeas. Parboil them so you can easily remove the tough skins. For the vegetable sauce, dice the vegetables. Sauté an onion in olive oil. Then add the carrots, bell pepper, zucchini, and eggplant. Cover with water. Season with coarse salt. Add the chickpeas, a can of peeled tomatoes, and a can of tomato paste. Add the leeks after 30 minutes of cooking. For the meat sauce, brown the chicken thighs, then sauté an onion. Add a can of peeled tomatoes and a can of tomato paste. Add a little water if needed. Season with a little coarse salt and harissa. For the couscous, pour it into a dish. Drizzle with a little oil. Pour in a little boiling water to rehydrate it. Microwave for one minute. Cook the merguez sausages in a skillet.",
  },
  "gateau-au-yaourt": {
    description:
      "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients afin d’obtenir une pâte bien lisse. Verser dans un moule à manquer. Mettre à four chaud pendant environ 45 minutes.",
    description_en:
      "Preheat the oven to 180°C. Mix all the ingredients together until the batter is smooth. Pour into a cake pan. Bake in the preheated oven for about 45 minutes.",
  },
  "gateau-au-yaourt-sans-oeufs": {
    description:
      "Mettre le four à chauffer à 180°C. Mélanger tous les ingrédients dans un plat creux. Verser la préparation dans un moule à cake en silicone. Mettre à four chaud pendant environ 45’. Ne le démouler que lorsque le gateau est froid.",
    description_en:
      "Preheat the oven to 180°C. Mix all the ingredients together until the batter is smooth. Pour into a cake pan. Bake in the preheated oven for about 45 minutes.",
  },
  crepes: {
    description:
      "Faire une fontaine avec la farine. Y mettre les oeufs battus au fouet. Verser le lait par petites quantités. Ajouter ensuite l'huile, le sel, le sucre et le rhum. Laisser reposer une heure.",
    description_en:
      "Make a well in the flour. Add the beaten eggs. Pour in the milk a little at a time. Then add the oil, salt, sugar, and rum. Let rest for one hour.",
  },
  "pate-lorrain": {
    description:
      "Faire mariner les viandes la veille: Les découper en lanières puis en dés d'1 cm environ. Les placer dans un saladier puis ajouter l'ail pressé, le persil, les échalotes, le tout finement ciselé ou haché. Effeuiller le thym et mouiller avec le vin blanc. Saler, poivrer, bien mélanger et recouvrir d'un film alimentaire. Réserver au réfrigérateur 12 h. Le lendemain, préchauffer le four à 200°. Egoutter la viande. Ouvrir le rouleau de pâte en conservant sa feuille de papier sulfurisé. Déposer sur la plaque de cuisson. Disposer la farce au centre en forme de gros boudin et en laissant quelques cm libres tout autour. Rabattre les 4 côtés en commençant par les extrémités, retourner le pâté  pour que la pliure soit dessous. Badigeonner de jaune d'oeuf battu. Creuser un trou au centre pour former une cheminée et réaliser un quadrillage pour la décoration avec la pointe du couteau.  Enfourner pour 45 mn. Vérifier la cuisson et remettre 10 à 15 mn si nécessaire.",
    description_en:
      "Marinate the meats the day before: Cut them into strips and then into 1 cm cubes. Place them in a bowl and add the pressed garlic, parsley, shallots, all finely chopped or minced. Strip the thyme and moisten with the white wine. Season with salt and pepper, mix well, and cover with plastic wrap. Refrigerate for 12 hours. The next day, preheat the oven to 200°C. Drain the meat. Open the roll of puff pastry while keeping its parchment paper. Place it on the baking sheet. Place the filling in the center in the shape of a large sausage, leaving a few centimeters free all around. Fold the 4 sides starting with the ends, turn the pâté so that the seam is underneath. Brush with beaten egg yolk. Create a hole in the center to form a chimney and make a grid for decoration with the tip of a knife. Bake for 45 minutes. Check for doneness and bake for an additional 10 to 15 minutes if necessary.",
  },
  tapenade: {
    description:
      "Mixer tous les ingrédients. Déguster sur des tartines grillées.",
    description_en:
      "Blend all the ingredients together. Enjoy on grilled bread.",
  },
  "fondant-au-chocolat": {
    description:
      "Faire fondre au bain-marie le chocolat et le beurre. Hors du feu, ajouter le sucre. Puis la farine. Ajouter les oeufs un par un en mélangeant bien afin d'obtenir une pâte  bien lisse. Enfourner à four chaud(220°C) pendant 5 minutes. Puis, baisser le four à 200°C pendant environ 15 minutes.",
    description_en:
      "Melt the chocolate and butter in a double boiler. Remove from heat, add the sugar, then the flour. Add the eggs one at a time, mixing well to achieve a smooth batter. Bake in a hot oven (220°C) for 5 minutes, then lower the oven to 200°C and bake for about 15 minutes.",
  },
  "osso-bucco": {
    description:
      "Laver les morceaux de jarret, essuyez-les et passez-les dans la farine. Faire chauffer l'huile dans une cocotte, ajouter les tranches de jarret et faire dorer de tous côtés. Lorsqu'elles sont dorées, les retirer. Faire revenir les oignons et les carottes coupées en rondelles. Peler les tomates, les couper en morceaux de même que les légumes, ajouter aux oignons et laisser cuire quelques minutes à feu doux. Rajouter la viande, déglacer avec le vin blanc sec puis mouiller avec le bouillon. Faites mijoter environ 2 heures. Rectifier l'assaisonnement de l'Osso Bucco avec du jus de citron, du sel et du poivre. Accompagnez de tagliatelles fraîches.",
    description_en:
      "Wash the veal shanks, pat them dry, and dredge them in flour. Heat the oil in a pot, add the shanks, and brown them on all sides. Once browned, remove them. Sauté the onions and carrots cut into rounds. Peel the tomatoes, cut them into pieces along with the vegetables, add to the onions, and let cook for a few minutes over low heat. Add the meat back in, deglaze with dry white wine, then moisten with broth. Simmer for about 2 hours. Adjust the seasoning of the Osso Bucco with lemon juice, salt, and pepper. Serve with fresh tagliatelle.",
  },
  "quatre-quart": {
    description:
      "Allumez votre four à thermostat 5 (150°C). Peser les oeufs et mettre le même poids de farine de sucre et de beurre. Casser les oeufs en séparant les blancs des jaunes. Mélanger les jaunes, le sucre et le jus de citron jusqu’à ce que le mélange blanchisse. Puis ajouter le beurre tiède et fondu en pommade. Et enfin la farine. Remuer avec une cuillère en bois afin que le mélange soit bien fait. Battre ensuite les blancs en neige très fermes. Incorporer délicatement à la préparation. Beurrer un moule à cake et le remplir à moitié avec la pâte. Mettre au four préchauffé à 150°C pendant une heure. Le gâteau doit gonfler de moitié.",
    description_en:
      "Preheat your oven to 150°C (300°F). Weigh the eggs and use the same weight of flour, sugar, and butter. Crack the eggs, separating the whites from the yolks. Mix the yolks, sugar, and lemon juice until the mixture becomes pale. Then add the warm, softened butter, followed by the flour. Stir with a wooden spoon until well combined. Next, beat the egg whites until stiff peaks form. Gently fold them into the batter. Butter a loaf pan and fill it halfway with the batter. Bake in the preheated oven at 150°C for about an hour. The cake should rise by half.",
  },
  "mousse-au-chocolat": {
    description:
      "Casser en morceaux le chocolat et faire fondre au bain-marie avec 1 ou 2 cuillères à soupe d'eau. Travailler avec une spatule pour obtenir un mélange très lisse. Verser ensuite ce chocolat fondu dans une grande terrine. Ajouter un à un les jaunes d'oeufs en mélangeant après chaque addition. Battre les blancs en neige très fermes et les incorporer délicatement au mélange en soulevant bien pour obtenir une mousse légère. Mettre au frigo au moins trois heures avant dégustation.",
    description_en:
      "Break the chocolate into pieces and melt it in a double boiler with 1 or 2 tablespoons of water. Stir with a spatula to achieve a very smooth mixture. Then pour this melted chocolate into a large bowl. Add the egg yolks one at a time, mixing after each addition. Beat the egg whites until stiff peaks form and gently fold them into the mixture, lifting well to achieve a light mousse. Refrigerate for at least three hours before serving.",
  },
  "poulet-basquaise": {
    description:
      "Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le poulet. Pendant ce temps, hâcher l'oignon et couper les poivrons en lanières. Après coloration, réserver le poulet. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le poulet et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz.",
    description_en:
      "In a cast-iron pot, heat a drizzle of olive oil. Brown the chicken. Meanwhile, chop the onion and cut the peppers into strips. After browning, set the chicken aside. Sauté the onion and peppers without burning them. Return the chicken to the pot and deglaze with the broth. Pour in the can of Frito tomatoes. Add the pressed garlic. Season with Espelette pepper and salt. Let cook covered over low heat. Serve with rice.",
  },
  "axoa-de-veau": {
    description:
      "Couper le veau en dés de 2 cm de côtés. Dans une cocotte en fonte, faire chauffer un filet d'huile d'olive. Faire revenir le veau. Pendant ce temps, hâcher l'oignon et couper les poivrons en carrés. Après coloration, réserver le veau. Faire revenir l'oignon et les poivrons sans qu'ils ne brûlent. Remettre le veau et déglacer avec le bouillon. Verser la brique de Tomate Frito. Ajouter l'ail pressé. Assaisonner avec le piment d'Espelette et le sel. Laisser cuire à couvert à feu doux. Servir avec du riz.",
    description_en:
      "Cut the veal into 2 cm cubes. In a cast-iron pot, heat a drizzle of olive oil. Brown the veal. Meanwhile, chop the onion and cut the peppers into squares. After browning, set the veal aside. Sauté the onion and peppers without burning them. Return the veal to the pot and deglaze with the broth. Pour in the can of Frito tomatoes. Add the pressed garlic. Season with Espelette pepper and salt. Let cook covered over low heat. Serve with rice.",
  },
  visitandines: {
    description:
      "Faire fondre le beure. Bien mélanger tous les ingrédients, puis rajouter le beurre fondu. Mettre à four modéré pendant 15 minutes environ.",
    description_en:
      "Melt the butter. Mix all the ingredients well, then add the melted butter. Bake in a moderate oven for about 15 minutes.",
  },
  "gateau-roule": {
    description:
      "Mettre les ingrédients sans la levure dans un récipient. Quand la pâte est lisse, mettre une cuillère à café de levure. Verser sur une plaque à pâtisserie couverte d'une feuille de papier sulfurisé. Cuire à four chaud (210°C) 5 à 10 minutes. Démouler sur un linge humide saupoudré de sucre. Étaler une couche de crème Mont-Blanc. Rouler le gâteau.",
    description_en:
      "Put the ingredients except for the leavening agent in a bowl. When the batter is smooth, add a teaspoon of leavening agent. Pour onto a baking sheet covered with parchment paper. Bake in a hot oven (210°C) for 5 to 10 minutes. Unmold onto a damp cloth sprinkled with sugar. Spread a layer of Mont-Blanc chocolate cream. Roll the cake.",
  },
  "clafoutis-aux-pommes": {
    description:
      "Couper les pommes en tranches pas trop fines. Allumer le four à 180°C. Battre les œufs entiers en omelette, ajouter le sel et le sucre semoule. Bien mélanger. Tamiser la farine et la jeter en pluie dans les œufs. Mélanger jusqu'à ce que le mélange soit bien lisse. Faire fondre la moitié du beurre dans le four et l’ajouter à la pâte, une fois légèrement refroidi. Délayer enfin avec le lait. Beurrer un plat en verre. Disposer les pommes dans ce plat. Verser la pâte dessus. Parsemer de quelques noisettes de beurre. Faire cuire à four moyen (jusqu'à ce que le dessus commence à dorer). Dès la sortie du four, saupoudrer de sucre vanillé. Servir tiède.",
    description_en:
      "Cut the apples into not too thin slices. Preheat the oven to 180°C. Beat the whole eggs in an omelette, add the salt and granulated sugar. Mix well. Sift the flour and sprinkle it over the eggs. Mix until the mixture is smooth. Melt half of the butter in the oven and add it to the batter once slightly cooled. Finally, dilute with the milk. Butter a glass dish. Arrange the apples in this dish. Pour the batter over them. Sprinkle with a few knobs of butter. Bake in a medium oven (until the top starts to brown). As soon as it comes out of the oven, sprinkle with vanilla sugar. Serve warm.",
  },
  "ile-flottante": {
    description:
      "Crème anglaise : dans un récipient, travailler les jaunes d'œufs avec le sucre, ajouter doucement le lait bouillant, sans cesser de tourner. Verser dans une casserole et faire épaissir à feu doux (la crème ne doit surtout pas bouillir). Dès que le mélange nappe la cuillère en bois, verser dans un compotier et mettre au frais. Préparer ensuite la neige. Mettre à bouillir de l'eau et battre les blancs en attente avec 1 pincée de sel; sucrer. Le mélange doit être très ferme. Quand l'eau bout, régler le feu de manière à obtenir un simple frémissement en surface. Pocher alors les blancs par cuillerées, en comptant 1 mn pour chaque face. Egoutter sur du papier absorbant et disposer sur la crème comme des pétales. Servir froid.",
    description_en:
      "English Cream: In a bowl, work the egg yolks with the sugar, then slowly add the boiling milk, stirring constantly. Pour into a saucepan and thicken over low heat (the cream should not boil). As soon as the mixture coats the wooden spoon, pour into a serving dish and chill. Next, prepare the meringue. Bring water to a boil and beat the egg whites with a pinch of salt until stiff; sweeten. The mixture should be very firm. When the water boils, adjust the heat to achieve a gentle simmer on the surface. Poach the egg whites by spoonfuls, counting 1 minute for each side. Drain on paper towels and arrange on top of the cream like petals. Serve cold.",
  },
  "tarte-tatin": {
    description:
      "Mettre dans un saladier huit cuillerées à soupe de farine. 100 grammes de beurre coupé en petits morceaux, une pincée de sucre et une pincée de sel. Mélanger en pressant entre les paumes de vos mains de façon à former une pâte granuleuse. Ajouter alors un tiers de verre à moutarde d'eau. Mélanger de nouveau, toujours avec les mains, et former une boule de pâte. Mettre de côté. Peler sept grosses pommes. Couper les fruits en deux dans le sens de la hauteur. Enlever les cœurs et les pépins avec un petit couteau pointu. Allumer le four à 210°C. Dans un moule rond & bords lisses de 5 à 6 centimètres de profondeur mettre 125 grammes de beurre et 125 grammes de sucre semoule. Allumer le gaz à feu fort, poser dessus le moule. Quand le sucre commence à blondir, enlever le moule du feu et mettre dedans les demi-pommes « debout », bien serrées les unes contre les autres. Saupoudrer d'un sachet de sucre vanillé. Ajouter deux pincées de cannelle. Râper au-dessus un peu de zeste de citron. Remettre le moule sur le gaz allumé à feu doux et laisser cuire les pommes une demi-heure. Pendant ce temps, sur la table bien farinée, avec le rouleau à pâtisserie, étaler la pâte sur un demi-centimètre d'épaisseur. Les pommes ayant cuit une demi-heure, elles sont tendres et légèrement caramélisées. Enlever le moule du feu et laisser tiédir. Quand elles sont froides, recouvrir d'une couche de pâte, en évitant de la replier sur les bords extérieurs du moule. II faut que le bord de la pâte soit à l'intérieur du moule et non à l'extérieur. Mettre le moule dans le four chaud et faites cuire pendant vingt-cinq minutes. Servir cette tarte tiède ou froide en retournant le moule de façon que les pommes se trouvent sur le dessus. Ne pas démouler à la sortie du four, attendre que la tarte soit tiède.",
    description_en:
      "Place eight tablespoons of flour in a mixing bowl. Add 100 grams of butter cut into small pieces, a pinch of sugar, and a pinch of salt. Mix by rubbing the ingredients between your palms until the mixture forms a crumbly dough. Then add one-third of a mustard glass of water. Mix again, still using your hands, and form a ball of dough. Set aside. Peel seven large apples. Cut the apples in half lengthwise. Remove the cores and seeds with a small sharp knife. Preheat the oven to 210°C. In a round, smooth-sided baking dish 5 to 6 centimeters deep, place 125 grams of butter and 125 grams of granulated sugar. Turn the gas to high heat and place the dish on top. When the sugar begins to turn golden, remove the dish from the heat and arrange the apple halves “upright” inside, packed tightly together. Sprinkle with one packet of vanilla sugar. Add two pinches of cinnamon. Grate a little lemon zest over the top. Return the pan to the stove over low heat and let the apples cook for half an hour. Meanwhile, on a well-floured surface, use a rolling pin to roll out the dough to a thickness of half a centimeter. After cooking for half an hour, the apples are tender and slightly caramelized. Remove the pan from the heat and let cool.Once they have cooled, cover them with a layer of dough, taking care not to fold it over the outer edges of the pan. The edge of the dough should be inside the pan, not outside. Place the pan in the hot oven and bake for twenty-five minutes. Serve this tart warm or cold by turning the pan upside down so that the apples are on top. Do not remove from the pan immediately after taking it out of the oven; wait until the tart is warm.",
  },
  paella: {
    description:
      "Faire chauffer l'huile, d'olive de préférence, dans la paëlla, saler et faire revenir dedans le chorizo, puis le poulet. Mettre en attente dans une assiette. Faire revenir à leur tour dans la paëlla les morceaux de poivrons. Tous vos éléments sont maintenant à demi cuits. Verser le riz et faire revenir vivement pour le nacrer. Remettre les morceaux de viande dans la paëlla, éparpiller les petits-pois et les coeurs d’artichaut, disposer les moules tout autour comme les pétales d'une marguerite, puis les crevettes. Mouiller enfin avec le bouillon bouillant dans lequel vous avez mis le safran et la Tomate frito. Faire partir l'ébullition sur feu vif, puis régler le feu pour que la paella mijote 20 minutes à peu près. Au bout de ce temps, le riz doit avoir absorbé tout le bouillon. Décorer de quelques quartiers de citron et servir tel que dans le plat de cuisson.",
    description_en:
      "Heat the oil (preferably olive oil) in the paella pan, season with salt, and sauté the chorizo, followed by the chicken. Set aside on a plate. Next, sauté the bell pepper pieces in the paella pan. All your ingredients are now half-cooked. Add the rice and stir-fry vigorously until it turns translucent. Return the meat to the paella pan, scatter the peas and artichoke hearts, arrange the mussels around the edges like the petals of a daisy, then add the shrimp. Finally, pour in the boiling broth in which you have dissolved the saffron and Tomate frito. Bring to a boil over high heat, then reduce the heat so the paella simmers for about 20 minutes. After this time, the rice should have absorbed all the broth. Garnish with a few lemon wedges and serve directly from the cooking pan.",
  },
  "pot-au-feu": {
    description:
      "Dans une grand cocotte, mettre la viande, la couvrir d'eau à hauteur et porter à ébullition rapidement. Écumer régulièrement pendant 5 min, puis baisser le feu pour conserver un léger frémissement. Ajouter le gros sel, l'oignon, l'ail et le bouquet garni. Laisser cuire pendant 1 h 30. Ajouter ensuite les légumes (à l'exception des pommes de terre) et poursuivre la cuisson durant 1 h. Finir en ajoutant les pommes de terre et terminer la cuisson (30 min). Goûter le jus au terme de la cuisson : s'il n'est pas assez goûteux, en prélever 1 litre et le faire réduire de moitié. Servir la viande et les légumes sur un plat chaud et le jus dans une saucière.",
    description_en:
      "Place the meat in a large Dutch oven, cover it completely with water, and bring to a rapid boil. Skim off the foam regularly for 5 minutes, then lower the heat to maintain a gentle simmer. Add the coarse salt, onion, garlic, and bouquet garni. Let cook for 1 hour and 30 minutes. Then add the vegetables (except for the potatoes) and continue cooking for 1 hour. Finish by adding the potatoes and complete the cooking (30 minutes). Taste the broth at the end of cooking: if it isn’t flavorful enough, remove 1 liter and reduce it by half. Serve the meat and vegetables on a warm platter and the broth in a gravy boat.",
  },
  "blanquette-de-veau": {
    description:
      "Faire revenir les morceaux de viande dans une cocotte en fonte. Les réserver puis faire revenir les oignons hâchés, les carottes coupées en rondelles puis les champignons. Pendant ce temps, verser la farine dans un bol et couvrir d'eau. Bien mélanger. Remettre la viande, ajouter le mélange et le bouquet garni. Saler et poivrer. Laisser cuire lentement pendant deux heures. En fin de cuisson ajouter la crème mélangée au vinaigre. Servir avec du riz.",
    description_en:
      "Brown the meat pieces in a cast-iron pot. Set them aside, then sauté the chopped onions, the carrots cut into rounds, and the mushrooms. Meanwhile, pour the flour into a bowl and cover with water. Mix well. Return the meat to the pot, add the flour mixture and the bouquet garni. Season with salt and pepper. Simmer gently for two hours. At the end of cooking, add the cream mixed with vinegar. Serve with rice.",
  },
  "lasagnes-chevre-epinards": {
    description:
      "Faire cuire les épinards. Préparer la béchamel. Faire fondre le beurre dans une grande casserole, ajouter la farine et laisser cuire doucement pendant 2 min, sans coloration et tout en mélangeant. Incorporer le lait au fur et à mesure à l'aide d'un fouet, puis porter à ébullition et cuire 2 min. Saler et poivrer et ajouter 1/4 litre d'eau chaude. Préchauffer le four à 180 °C. Dans un plat à lasagne, verser une louche de béchamel et 1/2 louche d'eau, puis superposer des couches de lasagne préalablement trempées dans de l'eau froide, d'épinards, de chèvre et de béchamel. Terminer avec une couche de lasagne, couvrir de béchamel et d'emmental râpé. Couvrir le plat avec du papier aluminium et l'enfourner à 180 °C pendant 20 min. Retirer ensuite l'aluminium et laisser les lasagne griller pendant 5 min. Laisser reposer 5 min puis servir.",
    description_en:
      "Cook the spinach. Prepare the béchamel sauce. Melt the butter in a large saucepan, add the flour, and cook gently for 2 minutes, stirring constantly, without letting it brown. Gradually whisk in the milk, then bring to a boil and cook for 2 minutes. Season with salt and pepper, and add 1/4 liter of hot water. Preheat the oven to 180°C. In a lasagna dish, pour in a ladleful of béchamel sauce and 1/2 ladleful of water, then layer the lasagna noodles (previously soaked in cold water), spinach, goat cheese, and béchamel sauce. Finish with a layer of lasagna noodles, cover with béchamel sauce and grated Emmental cheese. Cover the dish with aluminum foil and bake at 180°C for 20 minutes. Then remove the foil and let the lasagna brown for 5 minutes. Let rest for 5 minutes, then serve.",
  },
  "quiche-lorraine": {
    description:
      "Dans un saladier, battre les oeufs, ajouter la crème et le poivre. Mettre la pâte dans un moule à tarte. Répartir les lardons et l'emmental. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    description_en:
      "In a mixing bowl, beat the eggs, then add the cream and pepper. Press the dough into a pie pan. Scatter the bacon bits and Emmental cheese over the top. Pour in the egg mixture. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
  },
  "tarte-chevre-courgettes": {
    description:
      "Dans un saladier, battre les oeufs, ajouter la crème. Éplucher les courgettes et les couper en rondelles. Mettre la pâte dans un moule à tarte. Répartir les rondelles de courgettes et le chèvre coupé en tranches. Verser la préparation. Parsemer de thym. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    description_en:
      "In a mixing bowl, beat the eggs and add the cream. Peel the zucchini and slice them into rounds. Place the dough in a pie pan. Arrange the zucchini rounds and the sliced goat cheese on top. Pour in the egg mixture. Sprinkle with thyme. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
  },
  "empanada-au-thon": {
    description:
      "Couper les poivrons en dés. Faire cuire les poivrons dans une poële avec de l'huile d'olive. Ajouter le thon émietté, la tomate frito, l'ail pressé et le safran. Laisser mijoter le tout quelques minutes à feu doux. Mettre un rouleau de pâte sur la sol du four. Répartir la préparation. Positionner le second rouleau par dessus en ayant préalablement fait une cheminée au centre et un quadrillage. Replier les bords et dorer avec le jaune d'oeuf. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte. Merci à Sandra pour m'avoir fait découvrir cette recette!",
    description_en:
      "Dice the bell peppers. Sauté the bell peppers in a skillet with olive oil. Add the flaked tuna, tomato sauce, minced garlic, and saffron. Let everything simmer for a few minutes over low heat. Place one sheet of dough on the bottom of the baking pan. Spread the mixture evenly over the dough. Place the second sheet of dough on top, having first cut a small hole in the center and a lattice pattern on the surface. Fold the edges over and brush with egg yolk. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad. Thanks to Sandra for introducing me to this recipe!",
  },
  "poulet-au-vin-jaune": {
    description:
      "Faire tremper les morilles dans l'eau chaude 30 minutes. Verser le madère dans une casserole. Le faire réduire. Ajouter les morilles, 0.5 tablette de bouillon de volaille. Couvrir d'eau et cuire 40 minutes. Saler le poulet côté chair. Le faire revenir côté peau. Mettre les échalottes émincées, l'oignon et l'ail et l'estragon dans un faitout avec 25cl d'eau, le vin jaune, 1.5 tablette de bouillon de volaille et les champignons coupés en lamelles. Faire chauffer à feu très vif. Puis, ajouter les morceaux de poulet et laisser cuire 15 minutes. Sortir les blancs car ils cuisent plus vite. Travailler le beurre en pommade avec la farine. Lorsque les autres morceaux de poulet sont cuits, les retirer ainsi que l'estragon. Faire réduire le jus de cuisson(presque à sec), ajouter alors le beurre manié puis la crème fraîche. Laisser cuire 5 minutes en remuant. Remettre les morceaux de poulet en les nappant avec la sauce, puis ajouter les morilles égouttées. Servir dans un plat chaud saupoudré d'estragon frais. Vous pouvez l'accompagner de riz blanc, de pâtes fraîches, de haricots verts, de pomme de terre vapeur ou mieux encore de polenta frite.",
    description_en:
      "Soak the morels in hot water for 30 minutes. Pour the Madeira wine into a saucepan. Reduce it. Add the morels and half a chicken bouillon cube. Cover with water and cook for 40 minutes. Season the chicken on the meat side with salt. Sear it on the skin side. Place the minced shallots, onion, garlic, and tarragon in a large pot with 250 ml of water, the yellow wine, 1.5 chicken bouillon cubes, and the sliced mushrooms. Bring to a boil over high heat. Then, add the chicken pieces and cook for 15 minutes. Remove the breasts as they cook faster. Cream the butter with the flour. When the other chicken pieces are cooked, remove them along with the tarragon. Reduce the cooking liquid (until almost dry), then add the butter mixture followed by the crème fraîche. Cook for 5 minutes, stirring constantly. Return the chicken pieces to the pan, coating them with the sauce, then add the drained morels. Serve in a warm dish sprinkled with fresh tarragon. You can serve it with white rice, fresh pasta, green beans, steamed potatoes, or better yet, fried polenta.",
  },
  "polenta-frite": {
    description:
      "Dans une casserole, porter à ébullition le bouillon et le lait. Verser en pluie la polenta et remuer énergiquement. Ajouter le parmesan et faire cuire 5 minutes. Étaler la polenta sur une plaque beurrée. Laisser refoirdir. Détailler la polenta à l'emporte pièce. Verser l'huile d'olive dans la poêle, faire dorer environ 3 minutes de chaque côté selon la grosseur.",
    description_en:
      "In a saucepan, bring the broth and milk to a boil. Gradually sprinkle in the polenta and stir vigorously. Add the Parmesan cheese and cook for 5 minutes. Spread the polenta onto a buttered baking sheet. Let cool. Cut the polenta into shapes using a cookie cutter. Pour the olive oil into a skillet and cook until golden brown, about 3 minutes per side, depending on thickness. ",
  },
  "cocktail-de-champagne-aux-framboises": {
    description:
      "Choisir un joli contenant transparent avec une large ouverture. La bouteille de Champagne doit être bien fraîche. Mettre dans l'ordre une louche de cointreau, une louche de citron vert, une louche de sucre de canne. Pencher un peu le contenant et verser doucement le Champagne sur le rebord. Mélanger très légèrement en versant les framboises surgelées. Servir à la louche, de préférence dans des coupes ou des verres aux bords un peu larges",
    description_en:
      "Choose a beautiful transparent container with a wide opening. The bottle of Champagne should be well chilled. In order, pour a ladle of Cointreau, a ladle of lime syrup, and a ladle of cane sugar. Tilt the container slightly and slowly pour the Champagne over the edge. Stir very gently while adding the frozen raspberries. Serve with a ladle, preferably in coupes or glasses with slightly wide rims.",
  },
  "tuiles-aux-amandes": {
    description:
      "Préchauffer le four à 180°C. Battre les blancs avec le sucre et le sucre vanillé à la main au moins 4 minutes. Ajouter la farine, le beurre, les jaunes et les amandes. Mettre du papier sulfurisé sur une plaque de cuisson. Mettre une cuillère à soupe de pâte et l'étaler. Ajouter quelques amandes au-dessus. Cela sur toute la plaque en les espaçant pour qu'elles ne se collent pas entre elles. Enfourner 4 à 5 minutes. Bien surveiller. Les sortir du four dès qu'elles soient dorées.Les décoller rapidement et les coller sur un rouleau à pâtisserie pour qu'elles en prennent la forme. Les mettre dans un bocal hermétique dès qu'elles ont refroidi. Les tuiles peuvent se conserver plusieurs semaines.",
    description_en:
      "Preheat the oven to 180°C. Beat the egg whites with the sugar and vanilla sugar by hand for at least 4 minutes. Add the flour, butter, egg yolks, and almonds. Place parchment paper on a baking sheet. Spoon a tablespoon of batter and spread it out. Sprinkle some almonds on top. Repeat this process across the entire baking sheet, spacing them out so they don't stick together. Bake for 4 to 5 minutes. Watch closely and remove from the oven as soon as they are golden brown. Quickly lift them off the baking sheet and drape them over a rolling pin to shape them. Store in an airtight jar once they have cooled. The biscuits can be kept for several weeks.",
  },
  "caviar-d-aubergines": {
    description:
      "Préchauffer le four à 200°C. Nettoyer les aubergines et les ouvrir en 2 dans le sens de la longueur. Les déposer sur une plaque de cuisson recouverte de papier sulfurisé. Les inciser légèrement. Saler, poivrer. Déposer le thym et arroser d’un filet d’huile d’olive. Enfourner pendant 30 à 40 minutes. Avec une cuillère retirez la chair des aubergines. Mixez la avec les gousses d’ail dégermées pressées pour obtenir une purée fine. Rectifier l’assaisonnement et ajouter un filet d'huile d'olives si besoin.",
    description_en:
      "Preheat the oven to 200°C. Clean the eggplants and cut them in half lengthwise. Place them on a baking sheet lined with parchment paper. Score the flesh slightly. Season with salt and pepper. Place the thyme on top and drizzle with olive oil. Bake for 30 to 40 minutes. Use a spoon to scoop out the flesh of the eggplants. Blend it with the peeled and pressed garlic cloves to achieve a smooth puree. Adjust the seasoning and add a drizzle of olive oil if needed.",
  },
  "tarte-saumon-poireaux": {
    description:
      "Nettoyer les poireaux et les couper en rondelles. Les mettre à cuire avec un filet d'huile d'olive. Dans un saladier, battre les oeufs, ajouter la crème, saler et poivrer. Ajouter les poireaux. Détailler le saumon en morceaux. Mettre la pâte dans un moule à tarte. Répartir les morceaux de saumon. Verser la préparation. Mettre à four chaud à 210°C pendant environ 45 minutes. Servir avec une salade verte.",
    description_en:
      "Clean the leeks and slice them into rounds. Cook them with a drizzle of olive oil. In a mixing bowl, beat the eggs, add the cream, season with salt and pepper. Add the leeks. Cut the salmon into pieces. Place the dough in a pie pan. Scatter the salmon pieces on top. Pour in the egg mixture. Bake in a preheated oven at 210°C for about 45 minutes. Serve with a green salad.",
  },
  macarons: {
    description:
      "Préchauffer le four à 140°C. Pour colorer les coques avec du cacao, diminuer la quantité de poudre d'amandes: pour 30g de cacao il ne faut que 170g de poudre d'amandes. Verser la poudre d'amande et le sucre glace ,et le cacao le cas échéant, dans un mixeur. Faire tourner pendant 30 secondes pour affiner le mélange (tant pour tant), puis tamiser. Dans une casserole, mélanger l'eau et le sucre semoule avec une spatule et cuire à 118-119 °C. Avant d'atteindre cette température, mettre 75g de blancs dans la cuve d'un batteur et les monter. Lorsque le sucre a atteint la bonne température, le verser sur les blancs montés en laissant couler un filet du sirop le long de la paroi du bol. Ajouter le colorant en poudre si nécessaire. Continuer à fouetter ensuite jusqu'à refroidissement de la meringue. Verser le reste de blancs d’œufs sur le tant pour tant. Incorporer une petite partie de la meringue froide à ce mélange, puis ajouter le reste petit à petit en macaronant la pâte. Remplir une poche à douille avec cette préparation et dresser les macarons sur du papier sulfurisé. Lâcher la plaque de 50cm de hauteur afin de chasser les bulles d'air. Laisser crôuter 15 minutes. Enfourner pendant 10 minutes en tournant la plaque à mi-cuisson. Laisser ensuite les coques refroidir avant de les décoller du papier cuisson. Remplir une poche à douille avec la préparation choisie. Coller les coques deux par deux.",
    description_en:
      "Place eight tablespoons of flour in a mixing bowl. Add 100 grams of butter cut into small pieces, a pinch of sugar, and a pinch of salt. Mix by rubbing the ingredients between your palms until the mixture forms a crumbly dough. Then add one-third of a mustard glass of water. Mix again, still using your hands, and form a ball of dough. Set aside. Peel seven large apples. Cut the apples in half lengthwise. Remove the cores and seeds with a small sharp knife. Preheat the oven to 210°C. In a round, smooth-sided baking dish 5 to 6 centimeters deep, place 125 grams of butter and 125 grams of granulated sugar. Turn the gas to high heat and place the dish on top. When the sugar begins to turn golden, remove the dish from the heat and arrange the apple halves “upright” inside, packed tightly together. Sprinkle with one packet of vanilla sugar. Add two pinches of cinnamon. Grate a little lemon zest over the top. Return the pan to the stove over low heat and let the apples cook for half an hour. Meanwhile, on a well-floured surface, use a rolling pin to roll out the dough to a thickness of half a centimeter. After cooking for half an hour, the apples are tender and slightly caramelized. Remove the pan from the heat and let cool.Once they have cooled, cover them with a layer of dough, taking care not to fold it over the outer edges of the pan. The edge of the dough should be inside the pan, not outside. Place the pan in the hot oven and bake for twenty-five minutes. Serve this tart warm or cold by turning the pan upside down so that the apples are on top. Do not remove from the pan immediately after taking it out of the oven; wait until the tart is warm.",
  },
  "ganache-chocolat-blanc-gingembre": {
    description:
      "Faire fondre le chocolat blanc au bain-marie. Peler le gingembre et le râper. Dans une casserole, disposer la crème avec le gingembre, puis porter à ébullition. Verser en 3 fois sur le chocolat fondu. Laisser prendre au réfrigérateur.",
    description_en:
      "Melt the white chocolate in a double boiler. Peel and grate the ginger. In a saucepan, combine the cream and ginger, then bring to a boil. Pour the mixture over the melted chocolate in three batches. Let set in the refrigerator.",
  },
  "gelee-de-framboises-et-feve-de-tonka": {
    description:
      "Mettre le sucre dans une poêle, laisser colorer jusqu'à obtention d'un caramel, puis ajouter les framboises surgelées et la fève de tonka râpée. Laisser évaporer l'eau jusqu'à obtenir une marmelade. Puis porter à ébullition 1 minute avec l'agar-agar. Laisser prendre au réfrigérateur.",
    description_en:
      "Place the sugar in a pan, let it brown until it turns into caramel, then add the frozen raspberries and the grated tonka bean. Let the liquid evaporate until it becomes a jam. Then bring to a boil for 1 minute with the agar-agar. Let it set in the refrigerator.",
  },
  "panacotta-coulis de framboises": {
    description:
      "Mettre la gélatine à ramollir dans un bol d'eau froide. Faire bouillir 10 cl de crème liquide avec 100 g de sucre et la gousse de vanille fendue en 2. Ajouter ensuite la gélatine égouttée ainsi que le reste de crème. Verser la préparation dans des verrines individuelles et réserver au frais. Pour le coulis, laver les framboises, puis les mixer au blender avec 20g de sucre. Ajouter de l'eau si nécessaire. Réserver au frais.",
    description_en:
      "Soak the gelatin in a bowl of cold water until softened. Bring 10 cl of heavy cream to a boil with 100 g of sugar and the vanilla bean split in half. Then add the drained gelatin and the remaining cream. Pour the mixture into individual serving glasses and chill. For the coulis, wash the raspberries, then blend them in a blender with 20 g of sugar. Add water if necessary. Set aside in the refrigerator.",
  },
  "tarte-aux-pommes": {
    description:
      "Préchauffer le four à 200 degrés. Peler les pommes. Mettre la pâte feuilletée dans un moule à tarte. Disposer les tranches de pommes. Dans un récipient, battre les oeufs, la crème et le sucre. Mettre à four chaud. À la sortie du four, parsemer de sucre vanillé.",
    description_en:
      "Preheat the oven to 200 degrees. Peel the apples. Place the puff pastry in a pie dish. Arrange the apple slices on top. In a bowl, whisk together the eggs, cream, and sugar. Bake in the preheated oven. Once removed from the oven, sprinkle with vanilla sugar.",
  },
  "magret-de-canard-sauce-au-poivre-vert": {
    description:
      "Bouillir pendant 3 minutes le cognac avec du poivre vert en grains et une autre partie écrasée au mortier. Mélanger à part l'eau chaude avec le fond de veau pour le dissoudre. Incorporer au cognac puis mettre de nouveau à bouillir pour que la sauce s'évapore d'1/4. Mettre la crème épaisse et laisser à nouveau réduire à feu doux jusqu'à ce que le mélange nappe une cuillère en bois (lorsqu'on passe son doigt la trace ne s’efface pas). Saler et poivrer et servir avec le magret.",
    description_en:
      "A delicious and flavorful dish made with tender duck breast and a rich green peppercorn sauce.",
  },
  "confiture-de-poivrons-rouges": {
    description:
      "Éplucher les poivrons à l'aide d'un économe prévu à cet effet. Les mixer. Les peser puis ajouter la moitié du poids des poivrons en sucre et le safran. Faire cuire la confiture à gros bouillon jusqu'à ébullition sans cesser de remuer. Enlever l'écume si besoin. Continuer la cuisson à feu doux jusqu'à ce qu' elle fige au contact d'une assiette froide. Servir en toast avec du fromage.",
    description_en:
      "Peel the bell peppers using a peeler designed for that purpose. Blend them. Weigh the blended peppers and then add half of that weight in jam sugar and saffron. Cook the jam at a rolling boil until it reaches a boil, stirring constantly. Remove any foam if necessary. Continue cooking over low heat until it sets when tested on a cold plate. Serve on toast with cheese.",
  },
  "salade-de-pates-au-melon-et-au-magret-fume": {
    description:
      "Faire cuire les pâtes. Pendant ce temps, faire des billes de melon. Enlever le gras du magret. Quand les pâtes sont cuites, les égoutter et les rafraîchir à l'eau froide. Égoutter à nouveau. Verser les pâtes dans un saladier. Les assaisonner avec l'huile d'olive à l'ail. Bien mélanger. Ajouter le melon, les tranches de magret et des copeaux de parmesan. Ciseler du basilic frais.",
    description_en:
      "Cook the pasta. In the meantime, make melon balls. Remove the fat from the duck breast. When the pasta is cooked, drain it and refresh it with cold water. Drain again. Place the pasta in a salad bowl. Season it with garlic-infused olive oil. Mix well. Add the melon, slices of duck breast, and Parmesan shavings. Chop fresh basil.",
  },
  tian: {
    description:
      "Râper le courgettes et mettre dans une poêle avec l'huile d'olive. Laisser évaporer toute l'eau. Quand les courgettes commencent à dorer, retirer du feu. Battre les oeufs en omelette. Saler et poivrer. Rajouter ensuite les courgettes ainsi que le parmesan. Verser dans un moule à cake de 1.5 litres préalablement huilé. Mettre au four au bain-marie à 180°C pendant 50 minutes. Démouler et servir avec un coulis de tomates(ou pas) et une salade. Un grand merci à Cécile pour m'avoir partagé sa recette!",
    description_en:
      "Grate the zucchini and place it in a pan with the olive oil. Let all the water evaporate. When the zucchini starts to brown, remove from heat. Beat the eggs in an omelette style. Season with salt and pepper. Then add the zucchini and Parmesan cheese. Pour into a previously oiled 1.5-liter cake mold. Bake in a water bath at 180°C for 50 minutes. Unmold and serve with tomato coulis (or not) and a salad. A big thank you to Cécile for sharing her recipe with me!",
  },
  "cake-au-thon": {
    description:
      "Dans un saladier, écraser le thon égoutté. Couper le filet de poisson en petit dés. Les mélanger au thon. Saler et poivrer. Ajouter les 3 oeufs, puis la sauce tomate et la farine. Bien mélanger le tout. Verser dans un moule à cake en silicone. Mettre au four à 210°C pendant 45 minutes. Servir frais accompagné d'une salade.",
    description_en:
      "In a mixing bowl, mash the drained tuna. Cut the white fish fillet into small cubes. Mix them with the tuna. Season with salt and pepper. Add the 3 eggs, then the tomato sauce and flour. Mix everything well. Pour into a silicone cake mold. Bake at 210°C for 45 minutes. Serve chilled with a salad.",
  },
  gyosas: {
    description:
      "Faire bouillir de l’eau. Verser la farine et une pincée de sel dans un récipient puis ajouter l’eau bouillante. Pétrir et humidifier si nécessaire jusqu’à l’obtention d’une pâte bien lisse (5 à 7 minutes). Former une boule et filmer, puis laisser reposer 15 minutes. Mettre la viande hachée dans un bol. Ajouter la gousse d’ail émincée, la ciboulette finement ciselée puis saler et poivrer. Ajouter la maïzena, une cuillère à soupe de sauce soja et d’huile de sésame, puis mélanger. Fariner le plan de travail. Rouler la pâte en forme de cylindre et la découper en disques. Etaler les disques un à un le plus finement possible, jusqu’à ce que l’on puisse légèrement voir ses doigts en transparence à travers (on peut également utiliser un laminoir). Pour former les gyozas, déposer avec une fourchette de la farce dans un disque de pâte, humidifier les extrémités puis replier la partie sèche en quatre rabats sur la partie humide. Une fois que tous les gyozas sont terminés, les disposer en cercle dans un poêle (non-adhésive) et les faire dorer à l’huile de sésame. Ensuite, mélanger une cuillère à soupe de maïzena dans environ 150 ml d’eau, verser le mélange sur les gyozas puis couvrir et cuire 10 minutes à feu moyen. Retirer le couvercle et laisser dorer quelques minutes à nouveau, puis retourner la poêle dans une assiette. C’est prêt ! A déguster avec de la sauce soja, ou nature.",
    description_en:
      "Boil water. Pour the flour and a pinch of salt into a bowl, then add the boiling water. Knead and moisten if necessary until you get a smooth dough (5 to 7 minutes). Form a ball, cover with plastic wrap, and let rest for 15 minutes. Place the ground meat in a bowl. Add the minced garlic clove, finely chopped chives, then season with salt and pepper. Add the cornstarch, a tablespoon of soy sauce, and sesame oil, then mix. Flour the work surface. Roll the dough into a cylinder and cut it into disks. Roll out each disk as thinly as possible until you can slightly see your fingers through it (you can also use a pasta machine). To form the gyozas, place some filling in a dough disk with a fork, moisten the edges, then fold the dry part into four flaps over the wet part. Once all the gyozas are made, arrange them in a circle in a non-stick pan and brown them in sesame oil. Then mix a tablespoon of cornstarch in about 150 ml of water, pour the mixture over the gyozas, cover and cook for 10 minutes over medium heat. Remove the lid and let them brown again for a few minutes, then flip the pan onto a plate. It's ready! Enjoy with soy sauce or plain.",
  },
  "pates-imperiaux": {
    description:
      "Faire tremper les champignons pendant 20 minutes dans de l'eau tiède et le vermicelle pendant 10 minutes dans de l'eau froide. Hâcher finement les ingrédients de la garniture, bien mélanger. Étaler les galettes sur le plan de travail et les mouiller à l'aide d'une éponge imbibée d'eau. Attendre quelques secondes pour qu'elles deviennent malléables. Les garnir de farce et les rouler. Faire chauffer l'huile dans une poêle et faire frire les rouleaux 15 minutes jusqu'à ce qu'ils soient bien dorés. Servir avec de la salade, de la menthe fraîche et de la sauce nuoc mam.",
    description_en:
      "Soak the mushrooms for 20 minutes in warm water and the vermicelli for 10 minutes in cold water. Finely chop the filling ingredients, mix well. Spread the rice paper sheets on the work surface and moisten them with a sponge soaked in water. Wait a few seconds for them to become pliable. Fill them with the stuffing and roll them up. Heat the oil in a pan and fry the rolls for 15 minutes until they are golden brown. Serve with salad, fresh mint, and nuoc mam sauce.",
  },
  "salade-de-pates-aux-crevettes": {
    description:
      "Faire cuire les pâtes à grande eau. Pendant ce temps tailler le concombre et le poivron en petits dés. Rincer les pâtes à l'eau froide. Mélanger les pâtes, le cocombre et le poivron dans un saladier. Napper de mayonnaise. Verser le parmesan. Bien mélanger le tout. Servir bien frais.",
    description_en:
      "Cook the pasta in plenty of boiling water. In the meantime, dice the cucumber and red bell pepper. Rinse the pasta with cold water. Mix the pasta, cucumber, and bell pepper in a salad bowl. Coat with mayonnaise. Sprinkle with parmesan cheese. Mix everything well. Serve chilled.",
  },
  "ganache-mojito": {
    description:
      "Faire fondre le chocolat blanc au bain-marie. Laver et zester les citrons verts. Laver et effeuiller la menthe. Dans une casserole, disposer la crème avec les feuilles de menthe et les zestes de citron, puis porter à ébullition. Mixer le tout dans un blender. Verser en 3 fois sur le chocolat fondu. Terminer avec le rhum et la poudre d'amande. Refroidir la préparation. À l'aide d'une poche à douille, garnir les coques de macarons.",
    description_en:
      "Melt the white chocolate in a double boiler. Wash and zest the limes. Wash and leaf the mint. In a saucepan, combine the cream with the mint leaves and lime zest, then bring to a boil. Blend everything in a blender. Pour in 3 batches over the melted chocolate. Finish with the rum and almond powder. Cool the preparation. Using a piping bag, fill the macaron shells.",
  },
  "magret-seche": {
    description:
      "Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines. Un grand merci à Valérie de m'avoir partagé sa recette.",
    description_en:
      "Place a layer of coarse salt in the bottom of an airtight container. Add a few sprigs of thyme and place the duck breast, flesh side down, on top of the salt. Place a few more sprigs of thyme on the fat side of the duck breast. Cover thoroughly with salt. Place the covered container in the refrigerator for 24 hours. Then, rinse the duck breast under water. Dry it thoroughly. Place the duck breast in a kitchen towel. Season generously with pepper on all sides. Wrap it in the towel and return it to the bottom of the fridge for 3 to 4 weeks. A big thank you to Valérie for sharing her recipe with me.",
  },
  "salade-caesar": {
    description:
      "Faire cuire les oeufs durs. Dénerver et dégraisser les filets de poulet. Les saupoudrer de piment d'Espelette. Les rouler en ballotine bien serrée dans du film alimentaire. Renouveler l'opération une seconde fois. Faire cuire dans une casserole d'eau bouillante pendant une vingtaine de minutes. Faire cuire les farfalle. Laisser refroidir le tout. Pour la sauce(pour 2 personnes), dans un blender mettre un oeuf dur, un jaune d'oeuf, 5 filets d'anchois, 20g de parmesan rapé, 1 cuillère à soupe de jus de citron, 2cl de vinaigre de Xérès et l'ail pressé. Mixer le tout. Puis rajouter 5cl d'huile d'olive en filet. Ajouter une cuillère à soupe de crème pour détendre la sauce. Assaisonner avec du piment d'Espelette. Pour les amateurs, ajouter du tabasco et de la sauce Worcestershire.",
    description_en:
      "Cook the hard-boiled eggs. Remove the nerves and fat from the chicken fillets. Sprinkle them with Espelette pepper. Roll them into a tight ballotine in plastic wrap. Repeat the process a second time. Cook in a pot of boiling water for about twenty minutes. Cook the farfalle pasta. Let everything cool down. For the sauce (for 2 people), in a blender, put one hard-boiled egg, one egg yolk, 5 anchovy fillets, 20g of grated parmesan, 1 tablespoon of lemon juice, 2cl of sherry vinegar, and pressed garlic. Blend everything together. Then add 5cl of olive oil in a thin stream. Add a tablespoon of cream to loosen the sauce. Season with Espelette pepper. For those who like it spicy, add Tabasco and Worcestershire sauce.",
  },
  "magret-seche-fourre-au-foie-gras": {
    description:
      "Découper une bande de foie gras d’environ 150gr. L’assaisonner avec un peu de fleur de sel et du poivre. Avec du film alimentaire, faire une ballotine avec le morceau de foie gras afin de lui donner une forme cylindrique. Placer le au congélateur afin de le faire durcir et ainsi faciliter son insertion dans le magret. Inciser le magret en son centre afin de créer une cavité suffisamment grande pour y accueillir l’insert de foie gras. Dès que le foie gras est assez dur, l’insérer dans le magret. Mettre une couche de gros sel dans le fond d'un récipient hermétique. Déposer quelques branches de thym et le magret côté chair sur le sel. Remettre quelques branches de thym sur le magret côté gras. Bien recouvrir de sel. Mettre le récipient fermé dans le frigo pendant 24 heures. Puis, rincer le magret sous l'eau. Bien le sécher. Mettre le magret dans un torchon. Le poivrer généreusement de tous les côtés. L'enrouler dans le torchon et le remettre dans le bas du frigo pendant 3 à 4 semaines.",
    description_en:
      "Cut a strip of foie gras weighing about 150 grams. Season it with a little fleur de sel and pepper. Using plastic wrap, shape the piece of foie gras into a cylinder. Place it in the freezer to harden, making it easier to insert into the duck breast. Make an incision in the center of the duck breast to create a cavity large enough to hold the foie gras insert. Once the foie gras is firm enough, insert it into the duck breast. Place a layer of coarse salt in the bottom of an airtight container. Add a few sprigs of thyme and place the duck breast, flesh side down, on the salt. Place a few more sprigs of thyme on the fat side of the duck breast. Cover well with salt. Place the closed container in the refrigerator for 24 hours. Then, rinse the duck breast under water. Dry it thoroughly. Place the duck breast in a kitchen towel. Season generously with pepper on all sides. Wrap it in the towel and return it to the bottom of the fridge for 3 to 4 weeks.",
  },
  "roules-au-pesto": {
    description:
      "Étaler les tranches de pain de mie avec un rouleau à pâtisserie sur 3 mm d'épaisseur. Répartir une très fine couche de pesto, mettre les tranches de jambon serrano par-dessus. Couper des bâtonnets de mozzarella et les disposer sur la base de pain, puis rouler l'ensemble délicatement. Avec du film alimentaire, former des ballotines bien serrées. Mettre au frais.",
    description_en:
      "Spread the slices of crustless white bread with a rolling pin to a thickness of 3 mm. Spread a very thin layer of pesto, place the slices of Serrano ham on top. Cut mozzarella into sticks and place them on the bread base, then roll everything up carefully. Using plastic wrap, shape into tight rolls. Chill in the refrigerator.",
  },
  "champignons-au-four": {
    description:
      "Enlever les pieds de champignons. Eplucher les têtes. Travailler le fromage frais (de chèvre, de brebis ou de vache au choix) en l'assaisonnant avec du piment d'Espelette. Garnir l'intérieur du champignon avec le fromage frais. Découper des morceaux de jambon, les façonner pour leur donner une forme volumineuse et les déposer sur le fromage. Mettre au four à 210°C pendant une dizaine de minutes environ.",
    description_en:
      "Remove the stems from the mushrooms. Peel the caps. Work the cream cheese (goat, sheep, or cow cheese of your choice) by seasoning it with Espelette pepper. Fill the inside of the mushroom with the cream cheese. Cut pieces of ham, shape them to give them a voluminous form, and place them on top of the cheese. Bake in the oven at 210°C for about ten minutes.",
  },
  "lomo-seche": {
    description:
      "Parer la viande, peser la afin de calculer la quantité à apporter de sel, de sucre et d’épices. Mélanger le tout dans un bol pour faire l’adobado (la marinade). Saupoudrer le mélange sel,sucre et épices sur toutes les faces de la viande et masser pour bien faire adhérer le mélange sur la viande. Mettre la pièce de viande dans un sac et mettre à mariner sous-vide. Garder au réfrigérateur à 3° / 5° C. La durée de la salaison dépend de l’épaisseur de la pièce de viande. Pour un filet mignon de 6 cm de diamètre il faut 0.5 jour par cm d’épaisseur + 1 jour, soit 3 + 1 = 4 jours au sel. Retourner le sac tous les jours afin de saler et parfumer uniformément la viande. Le temps de salage passé, sortir la viande du sac. Rincer et sécher la viande avec du papier absorbant. Remettre des épices autour de la viande (environ 2% du poids). Poser la viande sur une grille au réfrigérateur à 3° / 5°C. On considère que la viande est suffisamment sèche quand elle a perdu entre 30 et 40% de son poids initial.",
    description_en:
      "Trim the meat, weigh it to calculate the amount of salt, sugar, and spices needed. Mix everything in a bowl to make the adobado (the marinade). Sprinkle the salt, sugar, and spice mixture on all sides of the meat and massage it to ensure the mixture adheres well to the meat. Place the piece of meat in a bag and marinate it under vacuum. Keep it in the refrigerator at 3° / 5° C. The duration of salting depends on the thickness of the piece of meat. For a pork tenderloin with a diameter of 6 cm, it takes 0.5 days per cm of thickness + 1 day, so 3 + 1 = 4 days in salt. Turn the bag every day to salt and flavor the meat evenly. After the salting time has passed, remove the meat from the bag. Rinse and dry the meat with paper towels. Reapply spices around the meat (about 2% of its weight). Place the meat on a rack in the refrigerator at 3° / 5°C. The meat is considered sufficiently dry when it has lost between 30 and 40% of its initial weight.",
  },
  "salade-estivale": {
    description:
      "Laver la salade. Faire cuire les oeufs mollets dans l'eau bouillante (6 minutes). Égoutter les asperges. Égoutter la ventrèche. Couper l'avocat en tranches. Pour le vinaigre de mangue, mixer la mangue bien égouttée. Ajouter 5cl de vinaigre balsamique blanc. Saler et poivrer.",
    description_en:
      "Wash the lettuce. Cook the soft-boiled eggs in boiling water (6 minutes). Drain the asparagus. Drain the tuna belly. Slice the avocado. For the mango vinaigrette, blend the well-drained mango. Add 5 cl of white balsamic vinegar. Season with salt and pepper.",
  },
  "merlu-roti-aux-cepes": {
    description:
      "Pour la sauce, ciseler les échalottes. Mettre 10 g de beurre dans une casserole. Faire suer les échalottes sans coloration. puis ajouter la gousse d'ail pressée. Ajouter le thhym et le laurier puis le vin à feu assez fort.Poivrer. Ajouter une pincée de sucre pour casser l'acidité du vin. On baisse le feu en fin de réduction. Quand c'est bien réduit, ajouter le fond de boeuf, maison c'est toujours mieux. Passer la sauce au chinois. Incorporer le beurre bien froid.",
    description_en: "",
  },
};
