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
    dieet: ["vegan"],
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
    dieet: ["omnivoor"],
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
    dieet: ["omnivoor"],
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
    dieet: ["pescetarisch"],
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
  }
];

