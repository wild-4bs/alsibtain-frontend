import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const Counters = () => {
  return (
    <section className="relative mt-24 mb-30">
      <Container className="flex gap-8">
        <div className="counters">
          <div className="flex">
            <div className="grid max-sm:grid-cols-1 border-y border-y-input grid-cols-2 [&_dt]:text-xl [&_dd]:font-extrabold [&_dd]:text-primary [&_dd]:text-4xl [&_dl]:w-[315px] max-2xl:[&_dl]:w-[290px] max-lg:[&_dl]:w-[200px] max-md:w-full max-md:[&_dl]:w-full">
              <dl className="flex flex-col gap-1 py-12 justify-center ps-16 sm:border-e border-e-input border-b border-b-input">
                <dd>25+</dd>
                <dt>Total Projects</dt>
              </dl>
              <dl className="flex flex-col gap-1 w-full py-12 justify-center ps-16 max-sm:border-b max-sm:border-b-input">
                <dd>21+</dd>
                <dt>Years of experience</dt>
              </dl>
              <dl className="flex flex-col gap-1 w-full py-12 justify-center ps-16 max-sm:border-b max-sm:border-b-input">
                <dd>3000+</dd>
                <dt>Happy Customers</dt>
              </dl>
              <dl className="flex flex-col gap-1 w-full py-12 justify-center ps-16 sm:border-t border-t-input sm:border-s border-s-input -mt-px -ms-px">
                <dd>3+</dd>
                <dt>Provinces</dt>
              </dl>
            </div>
            <Image
              src={"/services/project-1.jpg"}
              width={1000}
              height={1000}
              alt="project"
              className="w-[284.30767822265625px] h-[366.4410400390625px] object-cover max-md:hidden bg-primary"
            />
          </div>
          <div className="flex justify-between mt-10 max-sm:flex-col max-sm:justify-start max-sm:items-center gpa-5 max-sm:gap-3">
            <p className="text-lg w-full max-w-2xl max-sm:px-4 max-sm:text-center">
              We work together with our clients to design and construct homes
              and surroundings that match their values and way of life.
            </p>
            <Button
              variant={"ghost"}
              className="rounded-md hover:bg-primary/10 hover:text-primary w-[200px] text-base h-12"
            >
              View Projects <ArrowRight />
            </Button>
          </div>
        </div>
        <Image
          src={"/services/project-2.jpg"}
          width={1000}
          height={1000}
          alt="project"
          className="w-[284.30767822265625px] h-[366.4410400390625px] object-cover self-end translate-y-10 max-xl:hidden bg-primary"
        />
      </Container>
    </section>
  );
};
