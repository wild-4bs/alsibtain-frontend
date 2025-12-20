import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const BluryBall = ({ className }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "absolute top-1/2 z-0 pointer-events-none left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 ease-out animate-pulse rounded-full bg-primary bluryball shadow-2xl shadow-primary",
        className
      )}
    ></div>
  );
};
