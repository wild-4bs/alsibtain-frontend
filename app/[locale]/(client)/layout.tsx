import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ReactLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { Alexandria } from "next/font/google";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}
const alexandria = Alexandria({
  subsets: ["latin", "arabic"], // Add arabic subset
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alexandria",
});
export default function Layout({ children }: Props) {
  return (
    <ReactLenis root>
      <div
        className={cn(
          "overflow-x-hidden [[dir=rtl]]:font-(--font-alexandria)",
          alexandria.className
        )}
      >
        <Toaster />
        <Header />
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}
