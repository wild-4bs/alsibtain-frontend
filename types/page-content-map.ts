import {
  HomePageContent,
  AboutPageContent,
  ProjectsPageContent,
  ServicesPageContent,
  ContactPageContent,
} from "./pages";

export type PageContentMap = {
  home: HomePageContent;
  about: AboutPageContent;
  projects: ProjectsPageContent;
  services: ServicesPageContent;
  "news & media": ContactPageContent;
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
