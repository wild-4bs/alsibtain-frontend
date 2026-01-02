"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ServicesPageContent } from "@/types/pages";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const CallToAction = ({
  data,
}: {
  data: ServicesPageContent["sections"]["callToAction"];
}) => {
  const t = useTranslations("cta");
  const locale = useLocale() as "ar" | "en";
  return (
    <section className="my-36 z-10 relative">
      <Container className="relative flex flex-col items-center justify-center gap-6">
        <BluryBall className="w-full bg-primary/50" />
        <p className="text-center text-xl font-medium z-10 relative">
          {data?.caption?.value[locale]}
        </p>
        <Link href={"/contact"}>
          <Button className="rounded-none px-16! h-12 relative z-10 bg-[#004FDD9E]">
            {t("button")} <ArrowRight className="rtl:rotate-180" />
          </Button>
        </Link>
      </Container>
    </section>
  );
};
