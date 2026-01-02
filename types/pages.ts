type InputField = {
  type: "input";
  value: {
    ar: string;
    en: string;
  };
};

type IconField = {
  type: "icon";
  value: string;
};

type TextareaField = {
  type: "textarea";
  value: {
    ar: string;
    en: string;
  };
};

type NumberField = {
  type: "number";
  value: string;
};

type ImageField = {
  type: "image";
  value: {
    fileId: string;
    url: string;
  };
};

type VideoField = {
  type: "video";
  value: string;
};

type RichTextField = {
  type: "richtext";
  value: {
    ar: string;
    en: string;
  };
};

type ItemField<T> = {
  type: "items";
  value: { ar: T[]; en: T[] };
  maxValue: number | "unlimited";
};

type ImagesField<T> = {
  type: "images";
  value: T[];
  maxValue: number | "unlimited";
};

type VideosField<T> = {
  type: "videos";
  value: T[];
  maxValue: number | "unlimited";
};

type FileField = {
  type: "file";
  value: string;
};

type FilesField<T> = {
  type: "files";
  value: T[];
  maxValue: number | "unlimited";
};

type BooleanField = {
  type: "boolean";
  value: boolean;
};

type DateField = {
  type: "date";
  value: string;
};

type SelectField = {
  type: "select";
  value: string;
  options: { ar: string; en: string }[];
};

type MultiSelectField = {
  type: "multi-select";
  value: string[];
  options: { ar: string; en: string }[];
};

export type HomePageContent = {
  name: "home";
  sections: {
    hero: {
      tagline: InputField;
      headline: RichTextField;
      subheadline: InputField;
      sliderItems: ItemField<{
        title: string;
        caption: string;
        image: { url: string; fileId: string };
        label: string;
      }>;
      expectedFields: string[];
    };
    intro: {
      headline: InputField;
      subheadline: TextareaField;
      callToAction: InputField;
    };
    partners: {
      title: InputField;
      logos: ImagesField<string[]>;
    };
    overview: {
      yearsOfExcellence: NumberField;
      projects: NumberField;
      housingUnits: NumberField;
      provinces: NumberField;
    };
    companyOverview: {
      items: ItemField<{
        icon: string;
        title: string;
        caption: string;
      }>;
      expectedFields: string[];
    };
    projectSlider: {
      items: ItemField<{
        location: InputField;
        area: InputField;
        video: VideoField;
        link?: InputField;
      }>;
      expectedFields: string[];
    };
    about: {
      title: InputField;
      caption: TextareaField;
      callToAction: InputField;
      image: ImageField;
    };
    callToAction: {
      title: RichTextField;
      caption: RichTextField;
      buttonText: InputField;
    };
  };
};

export type AboutPageContent = {
  name: "about";
  sections: {
    hero: {
      headline: InputField;
      subheadline: TextareaField;
      image: ImageField;
      button1: InputField;
      button2: InputField;
      counters: ItemField<{ title: string; count: string }>;
    };
    plan: {
      headline: InputField;
      subheadline: TextareaField;
      steps: ItemField<{
        title: string;
        caption: string;
        label: string;
      }>;
      expectedFields: string[];
    };
    overview: {
      headline: InputField;
      subheadline: TextareaField;
      ourMissionTitle: InputField;
      ourMissionCaption: TextareaField;
      ourVisionTitle: InputField;
      ourVisionCaption: TextareaField;
      coreValuesTitle: InputField;
      coreValuesCaption: RichTextField;
    };
    team: {
      headline: InputField;
      subheadline: TextareaField;
    };
  };
};

export type ProjectsPageContent = {
  name: "projects";
  sections: {
    hero: {
      headline: InputField;
      subheadline: TextareaField;
      image: ImageField;
      button: InputField;
    };
    projects: {
      badge: InputField;
      headline: InputField;
    };
    gallery: {
      images: { value: { url: string; fileId: string }[] };
    };
  };
};

export type ServicesPageContent = {
  name: "services";
  sections: {
    hero: {
      headline: InputField;
      subheadline: TextareaField;
      images: {
        value: { id: string; data: { fileId: string; url: string } }[];
      };
    };
    services: {
      items: ItemField<{
        icon: string;
        title: string;
        caption: string;
      }>;
      expectedFields: string[];
      maxItems: "unlimited";
    };
    overview: {
      totalProjects: NumberField;
      yearsOfExperience: NumberField;
      happyCustomers: NumberField;
      provinces: NumberField;
      caption: TextareaField;
      image1: ImageField;
      image2: ImageField;
    };
    callToAction: {
      caption: TextareaField;
      button: InputField;
    };
  };
};

export type PartnersPageContent = {
  name: "partners";
  sections: {
    hero: {
      headline: RichTextField;
      caption: TextareaField;
      button: InputField;
    };
    whyPartnerWithUs: {
      reasons: ItemField<{
        icon: string;
        title: string;
        caption: string;
      }>;
      expectedFields: string[];
    };
    partnershipTypes: {
      badge: InputField;
      headline: InputField;
      subheadline: TextareaField;
      button: InputField;
      types: ItemField<{
        icon: string;
        title: string;
        caption: string;
      }>;
      expectedFields: string[];
    };
    callToAction: {
      badge: InputField;
      title: RichTextField;
      caption: RichTextField;
    };
    urukCityCampigns: {
      headline: InputField;
      image: ImageField;
      campigns: ItemField<{
        title: InputField;
        caption: TextareaField;
        tags: ItemField<InputField>;
      }>;
      residentialUnitsPlanned: NumberField;
    };
    clients: {
      headline: InputField;
    };
  };
};

export type NewsAndMediaPageContent = {
  name: "news & media";
  sections: {
    callToAction: {
      value: RichTextField;
    };
  };
};

export type CareersPageContent = {
  name: "careers";
  sections: {
    hero: {
      headline: InputField;
      subheadline: InputField;
    };
    jobs: {
      tagline: InputField;
      title: InputField;
      caption: RichTextField;
    };
    benefits: {
      tagline: InputField;
      title: InputField;
      caption: RichTextField;
      benefitsList: ItemField<{
        icon: string;
        title: string;
        caption: string;
      }>;
    };
    callToAction: {
      title: RichTextField;
      caption: RichTextField;
    };
  };
};

export type ContactPageContent = {
  name: "contact";
  sections: {
    header: {
      title: InputField;
      subtitle: InputField;
      caption: TextareaField;
    };
    contactInformation: {
      headline: InputField;
      caption: RichTextField;
      email: string;
      location: InputField;
      instagram: string;
      linkedin: string;
    };
    footer: {
      headline: InputField;
      caption: TextareaField;
      projects: ItemField<{ name: string }>;
      headOffice: {
        title: InputField;
        address: InputField;
        phoneNumber: string;
        email: string;
        website: string;
        facebook: string;
        instagram: string;
        whatsapp: string;
        youtube: string;
      };
    };
  };
};

export type PageName =
  | "home"
  | "about"
  | "projects"
  | "services"
  | "partners"
  | "news & media"
  | "careers"
  | "contact";

export type SectionName =
  | "hero"
  | "intro"
  | "partners"
  | "overview"
  | "companyOverview"
  | "projectSlider"
  | "about"
  | "callToAction"
  | "plan"
  | "team"
  | "projects"
  | "gallery"
  | "services"
  | "whyPartnerWithUs"
  | "partnershipTypes"
  | "urukCityCampigns"
  | "clients"
  | "jobs"
  | "benefits"
  | "header"
  | "contactInformation"
  | "footer";

export type PageContent =
  | HomePageContent
  | AboutPageContent
  | ServicesPageContent
  | PartnersPageContent
  | NewsAndMediaPageContent
  | CareersPageContent
  | ContactPageContent
  | ProjectsPageContent;

export type PageContentKey =
  | "HomePageContent"
  | "AboutPageContent"
  | "ServicesPageContent"
  | "PartnersPageContent"
  | "NewsAndMediaPageContent"
  | "CareersPageContent"
  | "ContactPageContent";

export type PageContentMap = {
  home: HomePageContent;
  about: AboutPageContent;
  projects: ProjectsPageContent;
  services: ServicesPageContent;
  partners: PartnersPageContent;
  "news & media": NewsAndMediaPageContent;
  careers: CareersPageContent;
  contact: ContactPageContent;
};

/**
 * Page names are derived from the map
 */
export type PossiblePageName = keyof PageContentMap;

/**
 * Sections of a specific page
 */
export type SectionsOf<P extends PossiblePageName> =
  PageContentMap[P]["sections"];

/**
 * Section keys for a specific page
 */
export type SectionKey<P extends PossiblePageName> = keyof SectionsOf<P>;

/**
 * Section data type for a specific page and section
 */
export type SectionData<
  P extends PossiblePageName,
  S extends SectionKey<P>
> = SectionsOf<P>[S];

/**
 * Get section type by page name and section name
 */
export type GetSectionType<
  P extends PageName,
  S extends string
> = P extends keyof PageContentMap
  ? S extends keyof PageContentMap[P]["sections"]
    ? PageContentMap[P]["sections"][S]
    : never
  : never;
