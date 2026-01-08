"use client";
import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Link } from "@/i18n/routing";
import { GalleryImage } from "@/types/gallery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Gallery = ({ data }: { data: GalleryImage[] }) => {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const projects = section.current?.querySelectorAll(
      ".projects-page-projects-list-project"
    );
    if (!projects) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section.current },
    });
    tl.fromTo(
      projects,
      {
        opacity: 0,
        y: 100,
      },
      {
        y: 0,
        opacity: 1,
        stagger: {
          amount: 0.1,
          from: "random",
        },
      }
    );
  }, []);
  return (
    <section className="mt-56 relative translate-y-25" ref={section}>
      <BluryBall className="w-[90%] h-[638px] animate-pulse blur-[228.1px] bottom-0 left-1/2" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-6 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((image, i) => (
            <Link href={"/projects/id"} key={i}>
              <article className="w-full h-40 rounded-3xl hover:opacity-50 duration-300 cursor-pointer projects-page-projects-list-project">
                {image && (
                  <Image
                    src={image?.url}
                    width={1000}
                    height={1000}
                    alt="Project"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                )}
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
