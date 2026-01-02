"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Requirements } from "./Requirements";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Job } from "@/services/jobs";

export const ApplicationDetails = ({
  className,
  data,
}: { data: Job | undefined } & ComponentProps<"section">) => {
  const t = useTranslations("careers.singleCareer");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className={cn("relative", className)}>
      <BluryBall className="h-full left-0 w-[599px]" />
      <Container className="relative z-10">
        <h2 className="text-2xl font-bold mb-1">{data?.title}</h2>
        <p className="font-medium text-sm mb-11">
          {t("whoAreWeLookingFor") ||
            { ar: "من نبحث عنه", en: "Who Are We Looking For" }[locale]}
        </p>
        <div className="lg:flex gap-10 lg:justify-between">
          <div className="font-bold text-sm max-lg:mb-10">
            <div
              dangerouslySetInnerHTML={{ __html: data?.description as string }}
              className="[&_ul]:list-[unset] [&_ol]:list-[unset] [&_ul]:p-0 [&_ol]:p-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:p-0 [&_li]:m-0 **:border-[unset] **:shadow-[unset]"
            ></div>
          </div>
          <Requirements data={data} />
        </div>
      </Container>
    </section>
  );
};
