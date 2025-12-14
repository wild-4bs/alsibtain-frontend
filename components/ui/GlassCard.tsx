import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

export const GlassCard = ({
  children,
  className,
}: { children?: React.ReactNode } & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "px-5 py-4 rounded-xl backdrop-blur-sm bg-[#FFFFFF21] border border-[#FFFFFF21] shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
