"use client";
import Container from "@/components/Container";
import { Article } from "./Article";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useGetNews, useGetNewsById } from "@/services/latest-news";
import { timeAgo } from "@/lib/date";
import { useQueryState } from "nuqs";

export const Articles = () => {
  const [activeNews, setActiveNews] = useQueryState("active-news");
  const t = useTranslations("common");
  const { data } = useGetNews({});
  const { data: clicked } = useGetNewsById(activeNews || "first");

  return (
    <section className="mt-16 relative z-10">
      <Container className="flex gap-14 justify-between max-xl:flex-col-reverse max-lg:justify-start">
        <div className="max-w-md">
          <h2 className="mb-6 font-black text-3xl">{t("latest-news")}</h2>
          <div className="flex flex-col gap-5">
            {data?.payload?.map((article, i) => (
              <Article
                key={article._id}
                image={article?.thumbnail?.url}
                title={article.title}
                createdBy={article?.writtenBy}
                date={timeAgo(article?.createdAt)}
                active={clicked?._id == article?._id}
                onClick={() => setActiveNews(article?._id)}
              />
            ))}
          </div>
          {/* <Button className="mt-4 font-black" variant={"ghost"}>
            {t("seeMore")} +
          </Button> */}
        </div>
        <div className="w-[90%] min-h-[500px] flex-1 relative overflow-hidden rounded-4xl px-3 py-4 flex items-end max-h-[600px] max-xl:h-[600px] max-xl:w-full">
          {clicked?.thumbnail?.url && (
            <Image
              src={clicked?.thumbnail.url}
              alt="article"
              width={1000}
              height={1000}
              className="object-cover absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            />
          )}
          <div className="relative z-10">
            <Badge
              className="mb-2 font-bold text-xs px-2 py-1"
              variant={"secondary"}
            >
              {clicked?.category}
            </Badge>
            <h3 className="font-black text-4xl mb-2 max-sm:text-3xl">
              {clicked?.title}
            </h3>
            <p className="font-medium max-sm:text-sm">{clicked?.caption}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
