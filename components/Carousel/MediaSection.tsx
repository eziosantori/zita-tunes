'use client";';

import MediaSlider from "@/components/Carousel/MediaSlider";
import type { MediaItem, MediaType } from "@/types/media";
import { memo } from "react";

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  mediaType: MediaType;
  forceViewMode?: "grid" | "slider";
  isVisible?: boolean;
}

const MediaSection = ({
  title,
  items,
  mediaType,
  isVisible = true,
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

      <MediaSlider items={items} mediaType={mediaType} title={title} />
    </section>
  );
};

export default memo(MediaSection);
