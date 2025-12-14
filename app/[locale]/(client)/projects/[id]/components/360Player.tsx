import Container from "@/components/Container";
import PurpleLargeComet from "@/assets/objects/purple-large-comet.svg";
import Image from "next/image";
import AssistantNavigation from "@/assets/icons/assistant_navigation.svg";
import Apartment from "@/assets/icons/apartment.svg";
import CorporateFare from "@/assets/icons/corporate_fare.svg";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alexandria } from "next/font/google";
import { cn } from "@/lib/utils";
import ArrowInsert from "@/assets/icons/arrow_insert.svg";
const features = [
  { name: "غـرفـة 2", scene: "room2" },
  { name: "غـرفـة 3", scene: "room3" },
  { name: "الـمـطـبـخ", scene: "kitchen" },
  { name: "الـبـالـكـون", scene: "balcony" },
  { name: "حـمـام 1", scene: "bath1" },
  { name: "حـمـام 2", scene: "bath2" },
  { name: "حـمـام 3", scene: "bath3" },
  { name: "غـرفـة 1", scene: "room1" },
];

const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
});

export const Player360 = () => {
  return (
    <section className="mt-36 relative">
      <h2 className="text-center max-sm:mb-5 font-medium text-5xl mb-12 px-10 max-md:text-4xl">
        Uruk City - <span className="font-light">Virtual 360</span>
      </h2>
      <PurpleLargeComet className="w-full scale-120 absolute rotate-155 duration-300 z-0 origin-center top-0 left-0" />
      <Container
        className={cn(
          "py-6 rounded-[3rem] relative z-10 flex gap-5 max-xl:flex-col max-md:px-6",
          alexandria.className
        )}
        style={{ boxShadow: "0 0 10px 10px #00000026" }}
      >
        <Image
          src={"/projects/12.png"}
          width={10000}
          height={10000}
          alt="project"
          className="w-[800px] max-2xl:w-[700px] max-xl:w-full max-xl:rounded-4xl max-xl:h-[400px] object-cover rounded-tl-[5rem] rounded-bl-[5rem]"
        />
        <div className="content w-full flex-1 py-8 px-10" dir="rtl">
          <header className="flex gap-12 max-sm:flex-col max-sm:justify-start max-md:gap-4 justify-between pb-4 border-b border-b-[#BCBCBC] mb-6">
            <h3 className="font-semibold text-2xl">
              مديـــنـــة أوروك <br /> الســــــــكنيـــــــــة
            </h3>
            <dl className="flex flex-col gap-1 font-light text-base whitespace-nowrap">
              <div className="flex items-center gap-2">
                <dt>
                  <AssistantNavigation />
                </dt>
                <dd>كربـــلاء المقدســـة</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>
                  <Apartment />
                </dt>
                <dd>1,370,500 متر مربع</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>
                  <CorporateFare />
                </dt>
                <dd>1,348 وحدة سكنيـــة</dd>
              </div>
            </dl>
          </header>
          <div className="mb-8">
            <header className="flex gap-12 max-md:flex-col">
              <h2 className="font-semibold text-4xl leading-[140%]">
                جولة افتراضيــة <br className="max-md:hidden" />
                النمـــوذج الأول
              </h2>
              <div className="w-full flex-1 flex flex-col gap-3">
                <div className="flex flex-col w-full flex-1 items-end">
                  <span className="w-full inline-block text-end">المساحة</span>
                  <span className="text-6xl" dir="ltr">
                    200 <span className="text-2xl">m²</span>
                  </span>
                  <span className="w-full inline-block text-end">مربع</span>
                </div>
                <dl className="flex flex-col w-full flex-1 items-end [&_dt]:min-w-[140px] font-bold text-lg">
                  <div className="flex items-center gap-2">
                    <dt>عدد الغرف:</dt>
                    <dd>3</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt>عدد الحمامات:</dt>
                    <dd>4</dd>
                  </div>
                </dl>
              </div>
            </header>
          </div>
          <div className="px-6 py-5 border border-[#19499F] rounded-3xl">
            <ScrollArea className="h-48 w-full overflow-hidden">
              <div
                className="grid grid-cols-2 max-sm:grid-cols-1"
                style={{ rowGap: "0.5rem", columnGap: "1.25rem" }}
              >
                {features.map((feature, i) => (
                  <Button
                    className="h-10 text-start justify-start rounded-full border border-[#19499F] bg-[#00153B] font-medium text-base relative pe-10"
                    dir="rtl"
                    key={i}
                  >
                    <div className="size-10 rounded-full flex items-center justify-center border border-[#19499F] absolute top-1/2 end-0 -translate-y-1/2">
                      <ArrowInsert />
                    </div>
                    {feature.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Container>
    </section>
  );
};
