import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { cn } from "@/lib/utils";
import { Oxanium } from "next/font/google";
import Image from "next/image";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

export const Hero = () => {
  return (
    <section className="bg-primary max-md:h-[60vh] relative">
      <Image
        src={"/projects/single-project.jpg"}
        alt="singleproject"
        width={10000}
        height={10000}
        className="w-full max-h-screen opacity-90 object-cover -mt-(--header-height) max-md:h-full"
      />
      <BluryBall className="w-[688px] h-[652px] max-sm:h-[200px] max-sm:top-1/2 top-[60%]" />
      <Container className="relative z-10">
        <dl
          className={cn(
            "grid grid-cols-5 max-w-[90%] max-sm:ps-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3 w-full -translate-x-1/2 translate-y-1/2 [&_dt]:font-medium text-lg [&_dt]:text-subtitle-color [&_dd]:font-bold absolute bottom-0 left-1/2 [&_div]:not-first:border-s [&_] [&_div]:not-first:border-s-primary px-11 py-6 border border-primary rounded-4xl",
            oxanium.className
          )}
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #19499FAB 30%)",
          }}
        >
          <div className="flex flex-col gap-2">
            <dt>Project Name</dt>
            <dd>Uruk City Residential Development</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>Location</dt>
            <dd>Karbala, Iraq</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>Total Area</dt>
            <dd>950,500 m²</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>Total Residential Units</dt>
            <dd>1,348 units</dd>
          </div>
          <div className="flex flex-col gap-2 ps-4">
            <dt>Unit Type</dt>
            <dd>Horizontal residential units</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
};
