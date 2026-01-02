import { DynamicSection } from "@/components/ui/dashboard/dynamic-sections";
import { TabsHandler } from "@/components/ui/TabsHandler";
import { CareersPageContent } from "@/types/pages";
import { EnContent } from "./EnContent";
import { ArContent } from "./ArContent";

export const Jobs = ({
  data,
}: {
  data?: CareersPageContent["sections"]["jobs"];
}) => {
  return (
    <DynamicSection
      id="jobs-section-home-page"
      sectionKey="Jobs"
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
