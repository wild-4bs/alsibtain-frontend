import Container from "@/components/Container";
import { BluryBall } from "@/components/ui/BluryBall";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="my-36 z-10 relative">
      <Container className="relative flex flex-col items-center justify-center gap-6">
        <BluryBall className="w-full bg-primary/50" />
        <p className="text-center text-xl font-medium z-10 relative">
          Thank you for choosing Al-Subtain for your real estate development
          needs. We look forward to supporting your vision and answering any
          inquiries you may have.
        </p>
        <Link href={"/contact"}>
          <Button className="rounded-none px-16! h-12 relative z-10 bg-[#004FDD9E]">
            Get in Touch <ArrowRight />
          </Button>
        </Link>
      </Container>
    </section>
  );
};
