import {
  HomePageContent,
  AboutPageContent,
  ProjectsPageContent,
  ServicesPageContent,
  PortfolioPageContent,
  ContactPageContent,
  StudioRentalPageContent,
  PropsRentalPageContent,
} from "./pages";

export type PageContentMap = {
  home: HomePageContent;
  about: AboutPageContent;
  projects: ProjectsPageContent;
  services: ServicesPageContent;
  partners: PortfolioPageContent;
  "news & media": ContactPageContent;
  careers: StudioRentalPageContent;
  contact: PropsRentalPageContent;
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
 * Section data type
 */
export type SectionData<
  P extends PossiblePageName,
  S extends SectionKey<P>
> = SectionsOf<P>[S];
