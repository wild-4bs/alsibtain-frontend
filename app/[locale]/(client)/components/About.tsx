import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const About = () => {
  return (
    <section className="py-28 relative">
      <BluryBall className="left-0" />
      <Container className="flex justify-between gap-12">
        <div className="flex flex-col">
          <span className="px-7 py-1.5 w-fit text-lg bg-white/11 rounded-full border border-[#FFFFFF4F] mb-4 inline-block">
            About Us
          </span>
          <h2 className="font-light text-3xl mb-4">Al-Subtain Real Estate</h2>
          <p className="mb-10">
            For over two decades, Al-Subtain Real Estate Development has stood
            as a symbol of excellence and integrity in Iraq’s real estate
            landscape. Founded in the holy city of Karbala in 2003, the company
            has grown into a trusted national developer — delivering large-scale
            residential, commercial, and healthcare projects that combine modern
            design, local authenticity, and global standards. Every project we
            build is guided by a simple yet powerful belief: architecture is not
            just about structures — it’s about people, life, and legacy. Through
            visionary planning, innovative engineering, and a deep understanding
            of community needs, Al-Subtain has created urban spaces that bring
            people together, inspire belonging, and reflect the values of trust,
            quality, and progress. From the ambitious Uruk City, to the serene
            Al-Salam City, and the world-class Al-Kafeel Hospital, each
            development tells a story of purposeful creation — a story that
            shapes the present and builds the future of Iraq. With a dedicated
            team of experts, architects, and engineers, Al-Subtain continues to
            redefine modern development through sustainable practices, precision
            in delivery, and a commitment to timeless design.
          </p>
          <Button
            className="relative w-fit rounded-full px-10
    bg-primary 
    text-primary-foreground 
    shadow-lg 
    shadow-primary/40
    hover:shadow-primary/60
    transition-all 
    duration-300 
    after:absolute 
    after:inset-0 
    after:rounded-full 
    after:bg-primary 
    after:blur-xl 
    after:opacity-50 
    after:-z-10"
          >
            Contact Us
          </Button>
        </div>
        <div className="max-xl:min-w-md min-w-xl h-[600px] relative rounded-bl-[141px] overflow-hidden max-lg:hidden">
          <BluryBall className="h-full" />
          <Image
            src={"/home/about.jpg"}
            width={1000}
            height={1000}
            alt="image"
            className="w-full h-full relative z-10 opacity-70 object-cover"
          />
        </div>
      </Container>
    </section>
  );
};
