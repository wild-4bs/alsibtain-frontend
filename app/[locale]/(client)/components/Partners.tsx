import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export const Partners = ({ className }: ComponentProps<"section">) => {
  return (
    <section className={cn(className)}>
      <Container>
        <h2 className="text-center my-12 text-xl font-medium leading-20">
          Trusted by Industry Leading Brands
        </h2>
      </Container>
      <div className="flex w-full overflow-hidden gap-8 justify-center relative">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent 20% 80%, var(--background)",
          }}
        ></div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="w-44 h-44 flex items-center justify-center" key={i}>
            <Image
              src={`/home/partners/${i + 1 > 7 ? 1 : i + 1}.png`}
              width={1000}
              height={1000}
              alt="partner"
              className="min-w-28 h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
