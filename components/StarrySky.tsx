"use client";

import { useEffect, useRef } from "react";

export default function StarsLayer({ count = 250 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const styles = ["style1", "style2", "style3", "style4"];
    const sizes = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    const opacities = [
      "opacity1",
      "opacity1",
      "opacity1",
      "opacity2",
      "opacity2",
      "opacity3",
    ];

    const createStars = () => {
      if (!containerRef.current) return;

      // Clear previous stars
      containerRef.current.innerHTML = "";

      const width = window.innerWidth;
      const height = window.innerHeight;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < count; i++) {
        const star = document.createElement("span");

        star.className = `
          estrela
          ${styles[Math.floor(Math.random() * styles.length)]}
          ${sizes[Math.floor(Math.random() * sizes.length)]}
          ${opacities[Math.floor(Math.random() * opacities.length)]}
        `;

        star.style.left = `${Math.random() * width}px`;
        star.style.top = `${Math.random() * height}px`;
        star.style.animationDelay = `.${Math.floor(Math.random() * 9)}s`;

        fragment.appendChild(star);
      }

      containerRef.current.appendChild(fragment);
    };

    // Initial load
    createStars();

    // Resize listener (width/height change)
    window.addEventListener("resize", createStars);

    return () => {
      window.removeEventListener("resize", createStars);
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="constelacao pointer-events-none absolute inset-0"
    />
  );
}
