import { DynamicSection } from "@/components/ui/dashboard/dynamic-sections";
import { TabsHandler } from "@/components/ui/TabsHandler";
import { ContactPageContent } from "@/types/pages";
import { EnContent } from "./EnContent";
import { ArContent } from "./ArContent";

export const ContactInfo = ({
  data,
}: {
  data?: ContactPageContent["sections"]["contactInformation"];
}) => {
  return (
    <DynamicSection
      id="contact-info-section-home-page"
      sectionKey="Contact Information"
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
