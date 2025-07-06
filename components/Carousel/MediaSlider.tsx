"use client";

import type React from "react";

import MediaCard from "@/components/Carousel/MediaCard";
import { Button } from "@/components/ui/button";
import type { MediaItem, MediaType } from "@/types/media";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

interface MediaSliderProps {
  items: MediaItem[];
  mediaType: MediaType;
  title: string;
}

const MediaSlider = ({ items, mediaType, title }: MediaSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: "auto",
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      className="relative group"
      role="region"
      aria-label={`${title} carousel`}
    >
      {/* Left Arrow - Hidden on mobile, visible on desktop */}
      <Button
        size="icon"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg rounded-full w-10 h-10 hidden md:flex items-center justify-center ${
          prevBtnDisabled
            ? "opacity-50 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100"
        }`}
        onClick={scrollPrev}
        onKeyDown={(e) => handleKeyDown(e, scrollPrev)}
        disabled={prevBtnDisabled}
        aria-label={`Scroll ${title} to previous items`}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Right Arrow - Hidden on mobile, visible on desktop */}
      <Button
        size="icon"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg rounded-full w-10 h-10 hidden md:flex items-center justify-center ${
          nextBtnDisabled
            ? "opacity-50 cursor-not-allowed"
            : "opacity-0 group-hover:opacity-100"
        }`}
        onClick={scrollNext}
        onKeyDown={(e) => handleKeyDown(e, scrollNext)}
        disabled={nextBtnDisabled}
        aria-label={`Scroll ${title} to next items`}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex gap-3 sm:gap-4 md:gap-6"
          role="list"
          aria-label={`${title} items`}
        >
          {items.map((item, index) => (
            <div
              key={`${mediaType}-slider-${item.trackId}-${index}`} // More specific key for carousel items
              className="flex-none w-[calc((100vw-2rem-0.75rem)/2.2)] sm:w-64 md:w-72 lg:w-80"
              role="listitem"
            >
              <MediaCard
                item={item}
                mediaType={mediaType}
                uniqueKey={`${mediaType}-slider-${item.trackId}-${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots - Smaller on mobile */}
      <div
        className="flex justify-center mt-4 md:mt-6 gap-1 md:gap-2"
        role="tablist"
        aria-label={`${title} navigation dots`}
      >
        {Array.from({ length: Math.ceil(items.length / 4) }).map((_, index) => (
          <button
            key={index}
            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary/30 hover:bg-secondary/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            role="tab"
            aria-label={`Go to ${title} section ${index + 1}`}
            onClick={() => {
              if (emblaApi) {
                emblaApi.scrollTo(index * 4);
              }
            }}
          />
        ))}
      </div>

      {/* Mobile swipe hint - Only visible on first load */}
      <div className="md:hidden text-center mt-2">
        <p className="text-xs text-secondary-foreground">
          Swipe to explore more
        </p>
      </div>
    </div>
  );
};

export default memo(MediaSlider);
