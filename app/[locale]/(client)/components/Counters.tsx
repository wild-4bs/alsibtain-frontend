import Container from "@/components/Container";

export const Counters = () => {
  return (
    <section>
      <Container>
        <ul className="w-full flex justify-around my-12 gap-12 max-lg:flex-wrap max-sm:text-center">
          <li className="text-2xl">
            <h3 className="font-medium">+21</h3>
            <span className="font-light">Years of Excellence</span>
          </li>
          <li className="text-2xl">
            <h3 className="font-medium">+26</h3>
            <span className="font-light">Projects</span>
          </li>
          <li className="text-2xl">
            <h3 className="font-medium">+3500</h3>
            <span className="font-light">Housing Units</span>
          </li>
          <li className="text-2xl">
            <h3 className="font-medium">+3</h3>
            <span className="font-light">Provinces</span>
          </li>
        </ul>
      </Container>
    </section>
  );
};
