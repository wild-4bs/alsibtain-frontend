import { DynamicSection } from "@/components/ui/dashboard/dynamic-sections";
import { HomePageContent } from "@/types/pages";
import { Content } from "./Content";

export const Overview = ({
  data,
}: {
  data?: HomePageContent["sections"]["overview"];
}) => {
  return (
    <DynamicSection
      id="overview-section-home-page"
      sectionKey="Overview"
      pending={!data}
    >
      <Content data={data as HomePageContent["sections"]["overview"]} />
    </DynamicSection>
  );
};
