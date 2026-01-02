import { DynamicSection } from "@/components/ui/dashboard/dynamic-sections";
import { TabsHandler } from "@/components/ui/TabsHandler";
import { AboutPageContent } from "@/types/pages";
import { EnContent } from "./EnContent";
import { ArContent } from "./ArContent";

export const Team = ({ data }: { data?: AboutPageContent["sections"]["team"] }) => {
  return (
    <DynamicSection
      id="team-section-home-page"
      sectionKey="Team"
      pending={!data}
    >
      <TabsHandler
        variant={"grayPill"}
        tabs={[
          {
            content: data && <EnContent data={data} />,
            name: "En",
            value: "en",
          },
          {
            content: data && <ArContent data={data} />,
            name: "Ar",
            value: "ar",
          },
        ]}
      />
    </DynamicSection>
  );
};
