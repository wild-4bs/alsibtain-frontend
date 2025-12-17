import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ReactLenis } from "@/lib/lenis";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <ReactLenis root>
      <div className="overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}
