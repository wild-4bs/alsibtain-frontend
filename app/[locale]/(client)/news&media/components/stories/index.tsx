"use client";
import Container from "@/components/Container";
import { Story } from "./Story";
import { useLocale, useTranslations } from "next-intl";
import { useGetUpdates } from "@/services/projects-updates";
import { timeAgo } from "@/lib/date";
import { useQueryState } from "nuqs";

export const Stories = () => {
  const [activeUpdates, setActiveUpdates] = useQueryState("active-updates");
  const t = useTranslations("common");
  const { data } = useGetUpdates({});
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="mt-28">
      <Container>
        <h2 className="font-black text-3xl mb-6">{t("stories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.payload?.map((story) => (
            <Story
              key={story._id}
              image={story.thumbnail?.url}
              title={story.title[locale]}
              createdBy={story.writtenBy[locale]}
              date={timeAgo(story.createdAt)}
              active={activeUpdates == story?._id}
              onClick={() => {
                setActiveUpdates(story?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
        {/* <Button className="mt-6 text-lg font-black" variant={"ghost"}>
          {t("seeMore")} +
        </Button> */}
      </Container>
    </section>
  );
};
