"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const CallToAction = () => {
  const t = useTranslations("news&media.cta");
  return (
    <section className="my-36">
      <Container className="relative flex flex-col items-center justify-center gap-6">
        <p className="text-center text-xl font-medium z-10 relative">
          {t("title")}
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
