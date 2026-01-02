import { DynamicSection } from "@/components/ui/dashboard/dynamic-sections";
import { TabsHandler } from "@/components/ui/TabsHandler";
import { ServicesPageContent } from "@/types/pages";
import { EnContent } from "./EnContent";
import { ArContent } from "./ArContent";

export const Services = ({
  data,
}: {
  data?: ServicesPageContent["sections"]["services"];
}) => {
  return (
    <DynamicSection
      id="services-section-home-page"
      sectionKey="services"
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
