"use client";
import { DynamicSections } from "@/components/ui/dashboard/dynamic-sections";
import { useGetPageContents } from "@/services/pages";
import { NewsAndMediaPageContent } from "@/types/pages";
import { CallToAction } from "./call-to-action";

export const Content = () => {
  const { data } = useGetPageContents("news & media");
  return (
    <main>
      <DynamicSections>
        <CallToAction
          data={(data as NewsAndMediaPageContent)?.sections?.callToAction}
        />
      </DynamicSections>
    </main>
  );
};
