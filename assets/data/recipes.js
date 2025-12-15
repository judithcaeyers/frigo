// assets/data/recipes.js
// Centrale databron voor ALLE recepten

window.RECIPES = [
  {
    slug: "komkommer-edamame",
    kicker: "Salade",
    title: "Komkommer–edamame salade",
    description: "Fris, knapperig en perfect als lichte lunch of bijgerecht.",
    time: "15 min",
    prep: 15,
    servings: 2,
    level: "Supersimpel",
    sfeer: ["fris"],
    dieet: ["vegan", "vegetarisch", "lactosevrij"],
    ingredientsFilter: ["komkommer","edamame","koriander","pinda","ui","chili","soyasaus"],
    image: "assets/images/komkommer-edamame.PNG",
    ingredients: [
      { qty: 1, unit: "st", label: "komkommer" },
      { qty: 150, unit: "g", label: "edamame" },
      { qty: 1, unit: "handje", label: "koriander" },
      { qty: 30, unit: "g", label: "pinda’s" },
      { qty: 0.5, unit: "st", label: "ui" },
      { qty: 1, unit: "tl", label: "chilivlokken" },
      { qty: 1, unit: "el", label: "sojasaus" }
    ],
    steps: [
      "Snij de komkommer in blokjes.",
      "Kook of ontdooi de edamame.",
      "Meng alles samen met sojasaus en chilivlokken.",
      "Werk af met pinda’s en koriander."
    ]
  },

  {
    slug: "pasta-ragu",
    kicker: "Pasta",
    title: "Pasta ragù",
    description: "Traag gegaarde klassieker voor echte comfortmomenten.",
    time: "2 uur",
    prep: 120,
    servings: 4,
    level: "Comfort",
    sfeer: ["comfort"],
    dieet: [],
    ingredientsFilter: ["pasta","rundsvlees","tomaat","ui","look","wortel","selder","parmezaan"],
    image: "assets/images/pasta-ragu.PNG",
    ingredients: [
      { qty: 400, unit: "g", label: "rundergehakt" },
      { qty: 1, unit: "st", label: "ui" },
      { qty: 2, unit: "st", label: "wortel" },
      { qty: 2, unit: "st", label: "selderstengels" },
      { qty: 2, unit: "st", label: "lookteentjes" },
      { qty: 800, unit: "g", label: "tomaten uit blik" }
    ],
    steps: [
      "Fruit ui, wortel en selder.",
      "Voeg gehakt toe en bak rul.",
      "Doe tomaten erbij en laat zachtjes sudderen.",
      "Serveer met pasta en parmezaan."
    ]
  },

  {
    slug: "pitta-kip-pindasaus",
    kicker: "Weeknight",
    title: "Pitta kip met pindasaus",
    description: "Snel, vullend en altijd een succes.",
    time: "30 min",
    prep: 30,
    servings: 2,
    level: "Makkelijk",
    sfeer: ["weeknight"],
    dieet: [],
    ingredientsFilter: ["pitta","kip","pinda","komkommer","ui","limoen","look","sriracha","soyasaus","yoghurt"],
    image: "assets/images/pitta-kip-pindasaus.PNG",
    ingredients: [
      { qty: 2, unit: "st", label: "pitabroodjes" },
      { qty: 250, unit: "g", label: "kipfilet" },
      { qty: 2, unit: "el", label: "pindakaas" },
      { qty: 1, unit: "st", label: "komkommer" },
      { qty: 1, unit: "st", label: "limoen" }
    ],
    steps: [
      "Bak de kip goudbruin.",
      "Meng pindakaas met yoghurt, sojasaus en limoensap.",
      "Vul de pita’s met kip, saus en groenten."
    ]
  },

  {
    slug: "bietello-tonato",
    kicker: "Vooraf",
    title: "Bietello tonato",
    description: "Aards, romig en perfect in balans.",
    time: "20 min",
    prep: 20,
    servings: 2,
    level: "Supersimpel",
    sfeer: ["feest"],
    dieet: [],
    ingredientsFilter: ["rode biet","tonijn","mayonaise","kappertjes","citroen","olijfolie"],
    image: "assets/images/bietello-tonato.PNG",
    ingredients: [
      { qty: 2, unit: "st", label: "gekookte rode bieten" },
      { qty: 1, unit: "blik", label: "tonijn" },
      { qty: 2, unit: "el", label: "mayonaise" },
      { qty: 1, unit: "el", label: "kappertjes" },
      { qty: 0.5, unit: "st", label: "citroen" }
    ],
    steps: [
      "Snij de bieten in plakken.",
      "Mix tonijn, mayonaise en citroensap.",
      "Serveer de saus over de bieten en werk af met kappertjes."
    ]
  },

  {
    slug: "miso-champignon-pasta",
    kicker: "Pasta",
    title: "Miso–champignon pasta",
    description: "Romig, hartig en boordevol umami.",
    time: "25 min",
    prep: 25,
    servings: 2,
    level: "Comfort",
    sfeer: ["comfort"],
    dieet: ["vegetarisch"],
    ingredientsFilter: ["pasta","champignon","miso","look","olijfolie","soyasaus","room"],
    image: "assets/images/miso-champignon-pasta.PNG",
    ingredients: [
      { qty: 200, unit: "g", label: "pasta" },
      { qty: 500, unit: "g", label: "champignons" },
      { qty: 1, unit: "el", label: "witte miso" },
      { qty: 200, unit: "ml", label: "room" }
    ],
    steps: [
      "Bak champignons goudbruin.",
      "Meng miso met room en voeg toe.",
      "Meng de pasta door de saus en serveer."
    ]
  },

  {
    slug: "pizza-basisdeeg",
    kicker: "Pizza",
    title: "Pizza (luchtig basisdeeg)",
    description: "Eenvoudig pizzadeeg met veel smaak. Door het deeg regelmatig te overplooien ontstaat een extra luchtige textuur.",
    time: "± 15 min bakken",
    prep: 15,
    servings: 3,
    level: "Basis",
    sfeer: ["comfort", "feest"],
    dieet: ["vegetarisch"],
    ingredientsFilter: ["bloem","gist","olijfolie","honing","zout"],
    image: "assets/images/pizza-basisdeeg.PNG",
    ingredients: [
      { qty: 500, unit: "g", label: "bloem" },
      { qty: 300, unit: "ml", label: "lauwwarm water" },
      { qty: 7, unit: "g", label: "droge gist" },
      { qty: 12, unit: "g", label: "zout" },
      { qty: 10, unit: "g", label: "olijfolie" },
      { qty: 10, unit: "g", label: "honing" }
    ],
    steps: [
      "Meng alle ingrediënten tot een samenhangend deeg. Het deeg mag wat plakkerig zijn.",
      "Laat het deeg rusten en plooi het elke 30 minuten even over zichzelf om gluten op te bouwen.",
      "Verwarm de oven voor op 275 °C (of zo heet mogelijk).",
      "Vorm pizza’s en beleg naar smaak.",
      "Bak ongeveer 15 minuten en hou goed in de gaten: baktijd hangt sterk af van je oven."
    ]
  },

  {
    slug: "courgette-habanero-look",
    kicker: "Groenten",
    title: "Courgette–Habanero–Look",
    description: "Zachte, langzaam geroosterde courgette met een warme, huisgemaakte chili–knoflookolie. Intens, sticky en perfect als bijgerecht of topping.",
    time: "70 min",
    prep: 70,
    servings: 4,
    level: "Supersimpel",
    sfeer: ["spicy", "comfort"],
    dieet: ["vegan", "vegetarisch", "lactosevrij"],
    ingredientsFilter: ["courgette","habanero","look","olijfolie","zout"],
    image: "assets/images/courgette-habanero-look.PNG",
    ingredients: [
      { qty: 300, unit: "ml", label: "olijfolie" },
      { qty: 3, unit: "st", label: "teentjes look" },
      { qty: 2, unit: "st", label: "habanero’s" },

      { type: "divider" },

      { qty: 3, unit: "st", label: "courgettes" },
      { qty: 1, unit: "snuf", label: "grof zout" }
    ],
    steps: [
      "Maak de chili–knoflookolie. Maak de teentjes look schoon en snijd grof. Halveer de habanero’s en voeg samen met de look toe aan een kookpotje. Voeg de olijfolie toe en verwarm 20–25 minuten op een laag vuur. Laat niet frituren, enkel zacht trekken.",
      "Snijd de courgettes in plakken van ongeveer 3–5 mm dik.",
      "Vet een ovenschaal in met de chili–knoflookolie en strooi er een snuf grof zout over.",
      "Leg de courgetteplakken in de ovenschaal en bak in een voorverwarmde oven op 180 °C. Draai ze om na 15–20 minuten en bak nog ongeveer 45 minuten tot ze goudbruin en zacht zijn."
    ]
  }
];

