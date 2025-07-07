"use client";

import { useMediaStore } from "@/store/media-store";
import { MediaItem, MediaType } from "@/types/media";
import MediaSection from "./Media/MediaSection";
interface HomeSectionProps {
  initialData: {
    albums: MediaItem[];
    podcasts: MediaItem[];
    audiobooks: MediaItem[];
  };
}

const HomeSection = ({ initialData }: HomeSectionProps) => {
  const mediaTypes: MediaType[] = ["album", "audiobook", "podcast"];
  const { query, isLoading, albums, audiobooks, podcasts } = useMediaStore();

  // Determina se mostrare i risultati di ricerca o quelli iniziali
  const hasSearchResults =
    query &&
    !isLoading &&
    (albums?.length > 0 || audiobooks?.length > 0 || podcasts?.length > 0);

  const showInitialData = !query || isLoading;

  const showNoResults =
    !isLoading &&
    query &&
    albums?.length === 0 &&
    audiobooks?.length === 0 &&
    podcasts?.length === 0;

  if (showNoResults) {
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
      {/* Always render sections but control visibility to prevent layout shifts */}
      {hasSearchResults && (
        <>
          <MediaSection
            title="Albums"
            items={albums}
            mediaType="album"
            isLoading={isLoading}
            isVisible={mediaTypes.includes("album") && albums?.length > 0}
          />
          <MediaSection
            title="Audiobooks"
            items={audiobooks}
            mediaType="audiobook"
            isLoading={isLoading}
            isVisible={
              mediaTypes.includes("audiobook") && audiobooks?.length > 0
            }
          />
          <MediaSection
            title="Podcasts"
            items={podcasts}
            mediaType="podcast"
            isLoading={isLoading}
            isVisible={mediaTypes.includes("podcast") && podcasts?.length > 0}
          />
        </>
      )}
      {showInitialData && (
        <>
          <MediaSection
            title="Top Albums"
            items={initialData.albums}
            isLoading={isLoading}
            mediaType="album"
            isVisible={
              mediaTypes.includes("album") && initialData.albums?.length > 0
            }
          />
          <MediaSection
            title="Top Audiobooks"
            items={initialData.audiobooks}
            isLoading={!!query && isLoading}
            mediaType="audiobook"
            isVisible={
              mediaTypes.includes("audiobook") &&
              initialData.audiobooks?.length > 0
            }
          />
          <MediaSection
            title="Top Podcasts"
            items={initialData.podcasts}
            isLoading={!!query && isLoading}
            mediaType="podcast"
            isVisible={
              mediaTypes.includes("podcast") && initialData.podcasts?.length > 0
            }
          />
        </>
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

export default HomeSection;
