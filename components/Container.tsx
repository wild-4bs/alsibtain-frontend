import React, { ComponentProps } from "react";

export default function Container({
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`container mx-auto px-8 max-md:px-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
