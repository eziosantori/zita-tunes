"use client";

import { getMediaData, hasSearchResults, showNoResults } from "@/lib/utils";
import { useMediaStore } from "@/store/media-store";
import { MediaItem, MediaType } from "@/types/media";
import { useMemo } from "react";
import MediaSection from "./Media/MediaSection";

interface HomeSectionProps {
  initialData: {
    albums: MediaItem[];
    podcasts: MediaItem[];
    audiobooks: MediaItem[];
  };
}

// Configurazione centralizzata per le sezioni
const MEDIA_SECTIONS = [
  {
    key: "album" as MediaType,
    searchTitle: "Albums",
    initialTitle: "Top Albums",
  },
  {
    key: "audiobook" as MediaType,
    searchTitle: "Audiobooks",
    initialTitle: "Top Audiobooks",
  },
  {
    key: "podcast" as MediaType,
    searchTitle: "Podcasts",
    initialTitle: "Top Podcasts",
  },
] as const;

const HomeSection = ({ initialData }: HomeSectionProps) => {
  // const mediaTypes: MediaType[] = ["album", "audiobook", "podcast"];
  const { query, isLoading, albums, audiobooks, podcasts, activeTypes } =
    useMediaStore();

  // should show anything?
  const _hasSearchResults = useMemo(() => {
    return hasSearchResults(query, isLoading, albums, audiobooks, podcasts);
  }, [query, isLoading, albums, audiobooks, podcasts]);

  const _showNoResults = useMemo(() => {
    return showNoResults(query, isLoading, albums, audiobooks, podcasts);
  }, [isLoading, query, albums, audiobooks, podcasts]);

  if (_showNoResults) {
    return (
      <div
        className="text-center py-12 animate-in fade-in-0 duration-300"
        role="status"
        aria-live="polite"
      >
        <p className="text-muted-foreground">
          No results found. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12" role="region" aria-label="Media content">
      {MEDIA_SECTIONS.map((section) => {
        const isSearchMode = !!_hasSearchResults;
        const items = getMediaData(section.key, isSearchMode, initialData, {
          albums,
          audiobooks,
          podcasts,
        });
        const title = isSearchMode ? section.searchTitle : section.initialTitle;
        const shouldShow =
          (activeTypes.length === 0 || activeTypes.includes(section.key)) &&
          items.length > 0;

        return (
          <MediaSection
            key={section.key}
            title={title}
            items={items}
            mediaType={section.key}
            isLoading={isLoading}
            isVisible={shouldShow}
          />
        );
      })}
    </div>
  );
};

export default HomeSection;
