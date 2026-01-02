"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { ContactPageContent } from "@/types/pages";
import { Intro } from "./intro";
import { ContactInfo } from "./contact-info";
import { Footer } from "./footer";

export const Content = () => {
  const { data } = useGetPageContents("contact");
  return (
    <main>
      <DynamicSections>
        <Intro data={data && (data as ContactPageContent).sections.header} />
        <ContactInfo
          data={
            data && (data as ContactPageContent).sections.contactInformation
          }
        />
        <Footer data={data && (data as ContactPageContent).sections.footer} />
      </DynamicSections>
    </main>
  );
};
