export interface Artist {
  name: string;
  genre: string;
  image?: string;
}

export interface DayProgram {
  dayName: string;
  date: string;
  artists: Artist[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  isFreePrice?: boolean;
  minPrice?: number;
  maxPrice?: number;
  currency: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Sponsor {
  name: string;
  logoType: "text" | "svg";
  logoUrl?: string;
  svgPath?: string;
}

export const PROGRAM_DATA: DayProgram[] = [
  {
    dayName: "VENDREDI",
    date: "04.09.2026",
    artists: [
      { name: "TOOFAN", genre: "Afro-hop / Gweta" },
      { name: "SANTRINOS RAPHAËL", genre: "Afropop / R&B" },
      { name: "DIDI B", genre: "Rap Ivoire" },
      { name: "GHETTOVI", genre: "Lomé Urban Rap" },
      { name: "LAURAA", genre: "Pop / Drill" },
      { name: "CONANE", genre: "Afrobeats" },
      { name: "ELOM 20CE", genre: "Conscious Hip-hop" }
    ]
  },
  {
    dayName: "SAMEDI",
    date: "05.09.2026",
    artists: [
      { name: "BLACK SHERIF", genre: "Highlife / Drill" },
      { name: "SETHLO", genre: "Afropop" },
      { name: "SUSPECT 95", genre: "Rap / Afrobeats" },
      { name: "MIC FLAMMEZ", genre: "Hardcore Rap" },
      { name: "PIKALUZ", genre: "Lomé Street Rap" },
      { name: "BLAQBONEZ", genre: "Afro-rap / Fusion" },
      { name: "AKAF ALL STARS", genre: "Special Culture Showcase" }
    ]
  }
];

export const TICKET_DATA: TicketType[] = [
  {
    id: "pass_1j",
    name: "Pass Régulier - 1 Jour",
    price: 5000,
    description: "Accès général pour la journée de votre choix (Vendredi ou Samedi).",
    currency: "FCFA"
  },
  {
    id: "pass_2j",
    name: "Pass Régulier - 2 Jours",
    price: 8000,
    description: "Accès complet aux deux jours du festival Bazookaland.",
    currency: "FCFA"
  },
  {
    id: "pass_vip_1j",
    name: "Pass VIP - 1 Jour",
    price: 15000,
    description: "Accès VIP, espace devant de scène, bar dédié et goodies collector.",
    currency: "FCFA"
  },
  {
    id: "pass_vip_2j",
    name: "Pass VIP - 2 Jours",
    price: 25000,
    description: "Le pass ultime. Accès VIP deux jours complets + entrée prioritaire.",
    currency: "FCFA"
  },
  {
    id: "culture_support",
    name: "Support Culturel - Contribution Libre",
    price: 3000,
    description: "Soutenez les artistes locaux et l'organisation Akaf Family. Choisissez votre prix !",
    isFreePrice: true,
    minPrice: 1000,
    maxPrice: 50000,
    currency: "FCFA"
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "transport",
    question: "COMMENT SE RENDRE AU FESTIVAL ?",
    answer: "Le festival Bazookaland se déroule sur l'Esplanade de la Plage de Lomé (face à l'Hôtel de la Paix), Togo. Vous pouvez facilement vous y rendre à pied depuis le centre-ville, en moto-taxi (Zémidjan) ou en voiture. Des parkings sécurisés à proximité seront disponibles, mais nous vous conseillons de privilégier les transports locaux ou de venir à plusieurs !"
  },
  {
    id: "access",
    question: "CONDITIONS D'ACCÈS ET BILLETTERIE",
    answer: "À l'entrée, votre e-ticket ou ticket physique sera scanné et vous recevrez un bracelet festivalier inviolable. Les enfants de moins de 12 ans accompagnés d'un adulte bénéficient d'un accès gratuit. Veillez à acheter vos tickets uniquement via nos points de vente officiels ou notre site internet."
  },
  {
    id: "food",
    question: "RESTAURATION ET BOISSONS SUR PLACE",
    answer: "Bazookaland met en valeur la gastronomie urbaine et traditionnelle de Lomé ! Un immense food court proposera des spécialités locales (Atiéké, Aloko, Brochettes, Ayimolou) et des boissons fraîches. Pour des raisons de sécurité, le verre et les bouteilles extérieures ne sont pas autorisés sur le site."
  },
  {
    id: "safety",
    question: "AWARENESS & BIENVEILLANCE",
    answer: "Pour nous, Bazookaland est une fête pour tous. Une équipe d'awareness et de secouristes sera présente en continu pour garantir un espace sûr, respectueux et chaleureux. Aucune forme de discrimination, de harcèlement ou de comportement déplacé ne sera tolérée. For the culture, with respect !"
  },
  {
    id: "support",
    question: "QUI EST AKAF FAMILY ?",
    answer: "Akaf Family est le collectif culturel togolais derrière l'organisation de Bazookaland. Passionnés de cultures urbaines, de hip-hop, de design et de promotion artistique, ils œuvrent à faire rayonner les talents du Togo et de la sous-région à travers des événements marquants et authentiques."
  }
];

export const SPONSORS_DATA: Sponsor[] = [
  { name: "Togocom", logoType: "text" },
  { name: "BB Lomé", logoType: "text" },
  { name: "Moov Africa", logoType: "text" },
  { name: "Canal+ Togo", logoType: "text" },
  { name: "Hôtel 2 Février", logoType: "text" },
  { name: "Akaf Family", logoType: "text" },
  { name: "Institut Français Togo", logoType: "text" },
  { name: "Lomé Vibe", logoType: "text" }
];
