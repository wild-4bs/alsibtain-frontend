export const projectData = {
  title: {
    ar: "مديـــنـــة أوروك الســــــــكنيـــــــــة",
    en: "Uruk Residential City",
  },
  location: {
    ar: "كربـــلاء المقدســـة",
    en: "Holy Karbala",
  },
  totalArea: {
    value: "1,370,500",
    unit: {
      ar: "متر مربع",
      en: "m²",
    },
  },
  totalUnits: {
    value: "1,348",
    label: {
      ar: "وحدة سكنيـــة",
      en: "Residential Units",
    },
  },
  virtualTour: {
    title: {
      ar: "جولة افتراضيــة",
      en: "Virtual Tour",
    },
    subtitle: {
      ar: "النمـــوذج الأول",
      en: "First Model",
    },
  },
  unitDetails: {
    area: {
      value: 200,
      unit: "m²",
      label: {
        ar: "المساحة",
        en: "Area",
      },
      suffix: {
        ar: "مربع",
        en: "square",
      },
    },
    rooms: {
      value: 3,
      label: {
        ar: "عدد الغرف",
        en: "Number of Rooms",
      },
    },
    bathrooms: {
      value: 4,
      label: {
        ar: "عدد الحمامات",
        en: "Number of Bathrooms",
      },
    },
  },
  features: [
    {
      name: { ar: "غـرفـة 2", en: "Room 2" },
      scene: "room2",
    },
    {
      name: { ar: "غـرفـة 3", en: "Room 3" },
      scene: "room3",
    },
    {
      name: { ar: "الـمـطـبـخ", en: "Kitchen" },
      scene: "kitchen",
    },
    {
      name: { ar: "الـبـالـكـون", en: "Balcony" },
      scene: "balcony",
    },
    {
      name: { ar: "حـمـام 1", en: "Bathroom 1" },
      scene: "bath1",
    },
    {
      name: { ar: "حـمـام 2", en: "Bathroom 2" },
      scene: "bath2",
    },
    {
      name: { ar: "حـمـام 3", en: "Bathroom 3" },
      scene: "bath3",
    },
    {
      name: { ar: "غـرفـة 1", en: "Room 1" },
      scene: "room1",
    },
  ],
};

// Type definitions for better TypeScript support
export type Locale = "en" | "ar";

export interface BilingualText {
  ar: string;
  en: string;
}

export interface ProjectData {
  title: BilingualText;
  location: BilingualText;
  totalArea: {
    value: string;
    unit: BilingualText;
  };
  totalUnits: {
    value: string;
    label: BilingualText;
  };
  virtualTour: {
    title: BilingualText;
    subtitle: BilingualText;
  };
  unitDetails: {
    area: {
      value: number;
      unit: string;
      label: BilingualText;
      suffix: BilingualText;
    };
    rooms: {
      value: number;
      label: BilingualText;
    };
    bathrooms: {
      value: number;
      label: BilingualText;
    };
  };
  features: Array<{
    name: BilingualText;
    scene: string;
  }>;
}
