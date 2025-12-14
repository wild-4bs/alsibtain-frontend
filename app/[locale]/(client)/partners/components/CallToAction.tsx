import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="my-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <Badge variant={"dark"}>Call To Action</Badge>
        <h2 className="font-bold text-4xl">Ready to collaborate?</h2>
        <p className="font-medium text-base text-subtitle-color">
          Our team is here to discuss partnership opportunities and explore how
          we can build impactful projects together.
        </p>
        <Button className="mt-3 font-medium px-10 rounded-full bg-[#2255B1] h-11">
          Contact Us
        </Button>
      </Container>
    </section>
  );
};
