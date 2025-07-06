"use client";

import type { MediaItem, MediaType } from "@/types/media";
import { memo, useMemo } from "react";
import MediaSection from "./MediaSection";

interface CarouselProps {
  selectedMediaTypes: MediaType[];
  albumData: MediaItem[];
  audiobookData: MediaItem[];
  podcastData: MediaItem[];
  loading: boolean;
  searchLoading: boolean;
}

const Carousel = ({
  selectedMediaTypes,
  albumData,
  audiobookData,
  podcastData,
  loading,
  searchLoading,
}: CarouselProps) => {
  // Memoize visibility calculations to prevent unnecessary re-renders
  const sectionVisibility = useMemo(
    () => ({
      albums: selectedMediaTypes.includes("album") && albumData.length > 0,
      audiobooks:
        selectedMediaTypes.includes("audiobook") && audiobookData.length > 0,
      podcasts:
        selectedMediaTypes.includes("podcast") && podcastData.length > 0,
    }),
    [
      selectedMediaTypes,
      albumData.length,
      audiobookData.length,
      podcastData.length,
    ]
  );

  const hasResults = useMemo(
    () =>
      albumData.length > 0 ||
      audiobookData.length > 0 ||
      podcastData.length > 0,
    [albumData.length, audiobookData.length, podcastData.length]
  );

  const showNoResults = useMemo(
    () =>
      selectedMediaTypes.length > 0 &&
      !hasResults &&
      !loading &&
      !searchLoading,
    [selectedMediaTypes.length, hasResults, loading, searchLoading]
  );

  return (
    <div className="space-y-12" role="region" aria-label="Media content">
      {/* Always render sections but control visibility to prevent layout shifts */}
      <div
        className={`transition-opacity duration-300 ${
          sectionVisibility.albums
            ? "opacity-100"
            : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <MediaSection
          title="Albums"
          items={albumData}
          mediaType="album"
          isVisible={sectionVisibility.albums}
        />
      </div>

      <div
        className={`transition-opacity duration-300 ${
          sectionVisibility.audiobooks
            ? "opacity-100"
            : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <MediaSection
          title="Audiobooks"
          items={audiobookData}
          mediaType="audiobook"
          isVisible={sectionVisibility.audiobooks}
        />
      </div>

      <div
        className={`transition-opacity duration-300 ${
          sectionVisibility.podcasts
            ? "opacity-100"
            : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <MediaSection
          title="Podcasts"
          items={podcastData}
          mediaType="podcast"
          isVisible={sectionVisibility.podcasts}
        />
      </div>

      {selectedMediaTypes.length === 0 && (
        <div
          className="text-center py-12 animate-in fade-in-0 duration-300"
          role="status"
          aria-live="polite"
        >
          <p className="text-muted-foreground">
            Please select at least one media type to display content.
          </p>
        </div>
      )}

      {showNoResults && (
        <div
          className="text-center py-12 animate-in fade-in-0 duration-300"
          role="status"
          aria-live="polite"
        >
          <p className="text-muted-foreground">
            No results found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(Carousel);
