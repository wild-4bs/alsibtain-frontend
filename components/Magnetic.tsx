"use client";

import { ComponentProps, ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;

  /** Strength of attraction (px) */
  strength?: number;

  /** Scale on hover */
  scale?: number;

  /** Animation speed */
  duration?: number;

  /** GSAP easing */
  ease?: string;

  /** Enable / disable */
  disabled?: boolean;

  /** Only react inside element bounds */
  triggerArea?: number;
};

export const Magnetic = ({
  children,
  strength = 30,
  scale = 1.05,
  duration = 0.3,
  ease = "power3.out",
  disabled = false,
  triggerArea = 1,
  className,
  ...props
}: MagneticProps & ComponentProps<"div">) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left - rect.width / 2) * strength) /
      (rect.width * triggerArea);

    const y =
      ((e.clientY - rect.top - rect.height / 2) * strength) /
      (rect.height * triggerArea);

    gsap.to(ref.current, {
      x,
      y,
      scale,
      duration,
      ease,
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration,
      ease,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-block will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
};
