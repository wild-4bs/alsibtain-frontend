import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
