"use client";
import Container from "@/components/Container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const teamMembers = [
  {
    id: 1,
    name: "Abdulsattar",
    role: "Founder",
    image: "/team/1.png",
  },
  {
    id: 2,
    name: "Abdulsattar",
    role: "Chief Real Estate Officer",
    image: "/team/2.png",
  },
  {
    id: 3,
    name: "Abdulsattar",
    role: "Head of Property",
    image: "/team/3.png",
  },
  {
    id: 4,
    name: "Abdulsattar",
    role: "Legal Counsel",
    image: "/team/4.png",
  },
];

export const Team = () => {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const teamMembers = section?.current?.querySelectorAll(
      ".about-page-team-member"
    );
    if (!teamMembers) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        scrub: true,
        end: "top 20%",
      },
    });
    tl.from(teamMembers, {
      y: "-100%",
      opacity: 0,
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });
  }, []);
  return (
    <section className="mb-32" ref={section}>
      <Container>
        <header className="leading-[150%] mb-8">
          <h2 className="mb-1 font-semibold text-4xl">
            The Minds and Hands Behind Our Success
          </h2>
          <p className="text-subtitle-color font-semibold text-lg">
            At Al-Subtain, our success is driven by the dedication and expertise
            of our team. Get to know the people behind our mission to make your
            real estate dreams a reality.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {teamMembers.map((member, i) => (
            <article
              key={i}
              className="p-6 border border-input/60 rounded-xl text-center about-page-team-member"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={1000}
                height={1000}
                className="w-[235px] h-[253px] object-cover object-center rounded-xl mx-auto mb-12"
              />
              <h3 className="font-semibold text-2xl leading-6 mb-2">
                {member.name}
              </h3>
              <h4 className="font-medium text-lg leading-6 text-subtitle-color">
                {member.role}
              </h4>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
