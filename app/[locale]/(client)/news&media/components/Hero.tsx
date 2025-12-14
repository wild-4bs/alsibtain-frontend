import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { BluryBall } from "@/components/ui/BluryBall";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative z-10">
      <BluryBall className="left-[unset] right-0 bottom-0 translate-y-1/2 translate-x-1/2 w-[468px] h-[382px]" />
      <Container className="h-[calc(100vh-var(--header-height))] flex items-center gap-10 justify-between z-20 max-lg:justify-end max-lg:pt-10 max-lg:flex-col-reverse relative">
        <Image
          src={"/news&media/hero.jpg"}
          width={10000}
          alt="image"
          height={10000}
          className="h-[90%] w-full flex-1 object-cover rounded-3xl max-lg:flex-[unset] max-lg:h-[400px]"
        />
        <div className="flex flex-col text-center items-center w-1/2 max-lg:w-full">
          <Badge
            className="mb-2 font-bold text-xs px-2 py-1"
            variant={"secondary"}
          >
            Story
          </Badge>
          <h1 className="font-black text-3xl mb-2">
            Local Government Faces Criticism Over New Policies
          </h1>
          <p className="font-medium text-base leading-[100%]">
            Local Government Faces Criticism Over New Policies as thousands took
            to the streets to oppose recent policy changes, leading to clashes
            with law enforcement and a state of emergency declared in several
            cities.
          </p>
        </div>
      </Container>
    </section>
  );
};
