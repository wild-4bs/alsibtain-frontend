"use client";

import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, ZoomOut, Play, Pause } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type MediaViewerProps = {
  type?: "image" | "video" | "images";
  src?: string;
  srcArray?: string[];
  onClose?: () => void;
  autoPlay?: boolean;
  showControls?: boolean;
  enableZoom?: boolean;
  loop?: boolean;
};

const MediaViewer: React.FC<MediaViewerProps> = ({
  type = "image",
  src = "",
  srcArray = [],
  onClose,
  autoPlay = false,
  showControls = true,
  enableZoom = true,
  loop = true,
}) => {
  const sources = srcArray.length ? srcArray : src ? [src] : [];
  const isMultiple = sources.length > 1;

  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animate fade in
  useEffect(() => {
    setVisible(true);
  }, []);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300); // wait for fade-out
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (isMultiple && type === "images") {
        if (e.key === "ArrowLeft")
          setCurrentIndex((i) => (i - 1 + sources.length) % sources.length);
        if (e.key === "ArrowRight")
          setCurrentIndex((i) => (i + 1) % sources.length);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMultiple, type, sources.length]);

  useEffect(() => {
    if (videoRef.current)
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);

  const mediaContent = () => {
    if (type === "video")
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          {visible && (
            <video
              playsInline
              ref={videoRef}
              src={sources[0]}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.2s",
              }}
              loop={loop}
              controls={showControls}
              autoPlay={autoPlay}
            />
          )}
          {showControls && (
            <button
              onClick={() => {
                if (!isPlaying) {
                  videoRef.current?.play().catch(() => {
                    console.log("User interaction required to play video");
                  });
                } else {
                  videoRef.current?.pause();
                }
                setIsPlaying(!isPlaying);
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 p-4 rounded-full text-white"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          )}
        </div>
      );

    if (type === "images" && isMultiple)
      return (
        <Carousel className="w-full max-w-5xl" opts={{ loop }}>
          <CarouselContent>
            {sources.map((src, i) => (
              <CarouselItem key={i}>
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="max-w-full max-h-[80vh] object-contain select-none mx-auto"
                  style={{
                    transform: `scale(${zoom})`,
                    transition: "transform 0.2s",
                  }}
                  draggable={false}
                  onDoubleClick={() => setZoom(1)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      );

    return (
      <img
        src={sources[0]}
        alt="Media"
        className="max-w-full max-h-[80vh] object-contain select-none"
        style={{ transform: `scale(${zoom})`, transition: "transform 0.2s" }}
        draggable={false}
        onDoubleClick={() => setZoom(1)}
      />
    );
  };

  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors z-20"
      >
        <X size={24} />
      </button>

      {enableZoom && type !== "video" && (
        <div className="absolute top-4 left-4 flex gap-2 text-white">
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            className="bg-white/10 p-2 rounded-full"
          >
            <ZoomOut size={20} />
          </button>
          <span className="bg-white/10 px-3 py-2 rounded-full text-sm">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="bg-white/10 p-2 rounded-full"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      )}

      <div
        className="flex items-center justify-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {mediaContent()}
      </div>
    </div>
  );
};

export default MediaViewer;
