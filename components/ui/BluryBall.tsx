import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const BluryBall = ({ className }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "absolute top-1/2 z-0 pointer-events-none left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 ease-out rounded-full bg-primary shadow-primary",
        className
      )}
      style={{filter: "blur(100px)"}}
    ></div>
  );
};
