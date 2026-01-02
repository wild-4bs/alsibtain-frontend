"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const triggerVariants = cva(
  [
    "cursor-pointer user-select-none inline-flex h-[calc(100%)] items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap data-[state=inactive]:hover:text-primary transition-[color,box-shadow] [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:border-0 focus-visible:ring-none focus-visible:outline-none focus-visible:ring-none focus-visible:outline-none", // مؤقت
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-light-color data-[state=active]:text-primary dark:data-[state=active]:bg-light-color px-2 py-1 rounded-md",
        bordered:
          "px-3 py-2 data-[state=active]:bg-light-color data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_var(--primary)] shadow-[inset_0_-2px_0_0_transparent] rounded-tl-md rounded-tr-md",
        pill: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2 rounded-full",
        grayPill:
          "data-[state=active]:bg-input data-[state=active]:text-foreground px-5 py-2 rounded-full border border-input not-last:me-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  ...props
}: VariantProps<typeof triggerVariants> &
  React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={clsx(
        "bg-background flex-wrap text-foreground inline-flex min-h-9 w-full items-center justify-start p-0 scrollbar-thin overflow-auto",
        {
          "shadow-[inset_0_-2px_0_0_var(--input-border)]":
            variant == "bordered",
        },
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant,
  ...props
}: VariantProps<typeof triggerVariants> &
  React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={triggerVariants({ variant, className })}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none mt-2", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
