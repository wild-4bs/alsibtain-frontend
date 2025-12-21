"use client";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";

export const VirtualTour = ({ className, ...props }: ComponentProps<"div">) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (!viewerRef.current) return;
      const Marzipano = (await import("marzipano")).default;

      const viewer = new Marzipano.Viewer(viewerRef.current, {
        controls: {
          mouseViewMode: "drag",
          scroll: false, // disable zoom with scroll
          pinch: false, // disable pinch zoom on touch devices
        },
      });

      // Higher resolution geometry for better quality
      const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

      // Fixed view limiter with no zoom
      const limiter = Marzipano.RectilinearView.limit.traditional(
        2048,
        (120 * Math.PI) / 180
      );

      // ---------- SCENE 1 ----------
      const source1 = Marzipano.ImageUrlSource.fromString("/scene-1.png");
      const view1 = new Marzipano.RectilinearView(
        { yaw: 0, pitch: 0, fov: Math.PI / 2 }, // fixed FOV
        limiter
      );
      const scene1 = viewer.createScene({
        source: source1,
        geometry,
        view: view1,
        pinFirstLevel: true,
      });

      // ---------- SCENE 2 ----------
      const source2 = Marzipano.ImageUrlSource.fromString("/scene-2.png");
      const view2 = new Marzipano.RectilinearView(
        { yaw: 0, pitch: 0, fov: Math.PI / 2 },
        limiter
      );
      const scene2 = viewer.createScene({
        source: source2,
        geometry,
        view: view2,
        pinFirstLevel: true,
      });

      // ---------- Hotspot helper ----------
      const createHotspotElement = (label: string) => {
        const hotspot = document.createElement("button");
        hotspot.innerHTML = `
          <div class="first-wrapper">
            <div class="main-wrapper">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7778 22.2222C18.4074 22.2222 18.9352 22.0093 19.3611 21.5833C19.787 21.1574 20 20.6296 20 20C20 19.3704 19.787 18.8426 19.3611 18.4167C18.9352 17.9907 18.4074 17.7778 17.7778 17.7778C17.1481 17.7778 16.6204 17.9907 16.1944 18.4167C15.7685 18.8426 15.5556 19.3704 15.5556 20C15.5556 20.6296 15.7685 21.1574 16.1944 21.5833C16.6204 22.0093 17.1481 22.2222 17.7778 22.2222ZM8.88889 40V35.5556L22.2222 33.3333V8.61111C22.2222 8.05556 22.0556 7.55556 21.7222 7.11111C21.3889 6.66667 20.963 6.40741 20.4444 6.33333L8.88889 4.44444V0L21.1111 2C22.7407 2.2963 24.0741 3.05556 25.1111 4.27778C26.1481 5.5 26.6667 6.92593 26.6667 8.55556V37L8.88889 40ZM0 40V35.5556H4.44444V4.44444C4.44444 3.18519 4.87963 2.12963 5.75 1.27778C6.62037 0.425926 7.66667 0 8.88889 0H31.1111C32.3704 0 33.4259 0.425926 34.2778 1.27778C35.1296 2.12963 35.5556 3.18519 35.5556 4.44444V35.5556H40V40H0ZM8.88889 35.5556H31.1111V4.44444H8.88889V35.5556Z" fill="white"/>
              </svg>
              <span>${label}</span>
            </div>
          </div>
        `;
        hotspot.classList.add("hotspot");
        hotspot.setAttribute("aria-label", label);
        return hotspot;
      };

      // Hotspot for Scene 1
      const hotspot1 = createHotspotElement("المطبخ");
      hotspot1.addEventListener("click", () => {
        scene2.switchTo({ transitionDuration: 1000 });
      });
      scene1.hotspotContainer().createHotspot(hotspot1, {
        yaw: 2,
        pitch: 0,
      });

      // Hotspot for Scene 2
      const hotspot2 = createHotspotElement("الحمام");
      hotspot2.addEventListener("click", () => {
        scene1.switchTo({ transitionDuration: 1000 });
      });
      scene2.hotspotContainer().createHotspot(hotspot2, {
        yaw: 0.85,
        pitch: 0,
      });

      // Start with scene 1
      scene1.switchTo({ transitionDuration: 0 });

      return () => {
        viewer.destroy();
      };
    })();
  }, []);

  return (
    <div
      dir="ltr"
      ref={viewerRef}
      className={cn("w-full h-full relative bg-primary/40", className)}
      suppressHydrationWarning
      suppressContentEditableWarning
      {...props}
    />
  );
};
