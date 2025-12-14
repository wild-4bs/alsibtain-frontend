import Container from "@/components/Container";
import { Article } from "./Article";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const articlesData = [
  {
    id: 1,
    image: "/articles/1.jpg",
    title: "Connectivity: The Future of 5G Technology",
    createdBy: "CATE JONES",
    date: "TODAY",
  },
  {
    id: 2,
    image: "/articles/2.jpg",
    title: "Cybersecurity Trends: Protecting Your Data in 2024",
    createdBy: "STAN BEE",
    date: "TODAY",
  },
  {
    id: 3,
    image: "/articles/3.jpg",
    title: "Startups to Watch: The Next Big Names in Tech",
    createdBy: "LIAM TAY",
    date: "YESTERDAY",
  },
  {
    id: 4,
    image: "/articles/4.jpg",
    title: "Virtual Reality: Beyond Gaming and Into Everyday Life",
    createdBy: "MOON STOLE",
    date: "YESTERDAY",
  },
];

export const Articles = () => {
  return (
    <section className="mt-16 relative z-10">
      <Container className="flex gap-14 justify-between max-xl:flex-col-reverse max-lg:justify-start">
        <div>
          <h2 className="mb-6 font-black text-3xl">Tech</h2>
          <div className="flex flex-col gap-5">
            {articlesData.map((article) => (
              <Article
                key={article.id}
                image={article.image}
                title={article.title}
                createdBy={article.createdBy}
                date={article.date}
              />
            ))}
          </div>
          <Button className="mt-4 font-black" variant={"ghost"}>
            See more +
          </Button>
        </div>
        <div className="w-[90%] relative overflow-hidden rounded-4xl px-3 py-4 flex items-end max-h-[600px] max-xl:h-[600px] max-xl:w-full">
          <Image
            src={"/articles/1.jpg"}
            alt="article"
            width={1000}
            height={1000}
            className="object-cover absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          />
          <div className="relative z-10">
            <Badge
              className="mb-2 font-bold text-xs px-2 py-1"
              variant={"secondary"}
            >
              Tech
            </Badge>
            <h3 className="font-black text-4xl mb-2 max-sm:text-3xl">
              Revolutionizing Connectivity: The Future of 5G Technology
            </h3>
            <p className="font-medium max-sm:text-sm">
              Revolutionizing connectivity, the future of 5G technology promises
              unprecedented speeds, ultra-low latency, and the seamless
              integration of smart devices, transforming industries and daily
              life in ways previously unimaginable.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
