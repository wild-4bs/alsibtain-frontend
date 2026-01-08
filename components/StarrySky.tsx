"use client";

import { useMemo } from "react";

type Star = {
  style: string;
  size: string;
  opacity: string;
  x: number;
  y: number;
  delay: number;
};

export default function StarsLayer() {
  const stars = useMemo<Star[]>(() => {
    const styles = ["style1", "style2"];
    const sizes = ["tam1", "tam2"];
    const opacities = ["opacity1", "opacity2"];

    return Array.from({ length: 80 }, () => ({
      style: styles[Math.random() * styles.length | 0],
      size: sizes[Math.random() * sizes.length | 0],
      opacity: opacities[Math.random() * opacities.length | 0],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="constelacao pointer-events-none absolute inset-0 overflow-hidden" suppressHydrationWarning>
      {stars.map((s, i) => (
        <span
          key={i}
          className={`estrela ${s.style} ${s.size} ${s.opacity}`}
          style={{
            transform: `translate3d(${s.x}vw, ${s.y}vh, 0)`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
