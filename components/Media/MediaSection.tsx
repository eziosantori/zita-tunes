'use client";';

import type { MediaItem, MediaType } from "@/types/media";
import { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import MediaCard from "./MediaCard";

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  mediaType: MediaType;
  isVisible?: boolean;
  isLoading?: boolean;
}

const MediaSection = ({
  title,
  items,
  mediaType,
  isVisible = true,
  isLoading = false,
}: MediaSectionProps) => {
  // Don't render if not visible to prevent unnecessary DOM updates
  if (!isVisible || items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={`${mediaType}-heading`}
      className="animate-in fade-in-0 duration-300"
    >
      <header className="mb-6">
        <h2 id={`${mediaType}-heading`} className="text-2xl font-semibold">
          {title}
        </h2>
      </header>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="flex-none w-[calc((100vw-2rem-0.75rem)/2.2)] sm:w-64 md:w-72 lg:w-80"
                  >
                    <div className="space-y-2 md:space-y-3">
                      <div className="aspect-square bg-muted/50 rounded-lg animate-pulse" />
                      <div className="space-y-1 md:space-y-2">
                        <div className="h-3 md:h-4 bg-muted/50 rounded animate-pulse" />
                        <div className="h-2 md:h-3 bg-muted/50 rounded animate-pulse w-3/4" />
                        <div className="h-2 md:h-3 bg-muted/50 rounded animate-pulse w-1/2" />
                        <div className="pt-1">
                          <div className="h-2 md:h-3 bg-muted/50 rounded animate-pulse w-1/3" />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              : items.map((item) => (
                  <CarouselItem
                    key={`${item.kind}-${item.collectionId}`}
                    //className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                    className="flex-none w-[calc((100vw-2rem-0.75rem)/2.2)] sm:w-64 md:w-72 lg:w-80"
                  >
                    <div className="p-1 h-full">
                      <MediaCard item={item} mediaType={mediaType} />
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious
            className="hidden sm:flex -left-8"
            variant={"default"}
          />
          <CarouselNext
            className="hidden sm:flex -right-8"
            variant={"default"}
          />
        </Carousel>
      </div>
      {/* Mobile swipe hint - Only visible on first load */}
      <div className="md:hidden text-center mt-2">
        <p className="text-xs text-secondary-foreground">
          Swipe to explore more
        </p>
      </div>
    </section>
  );
};

export default memo(MediaSection);
