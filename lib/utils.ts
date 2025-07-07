import { MediaItem, MediaType } from "@/types/media";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHighResArtwork(artworkUrl: string, size = 600): string {
  if (!artworkUrl) return "/placeholder.svg";
  // Replace the size in the iTunes artwork URL to get higher resolution
  return artworkUrl.replace(/100x100bb|60x60bb|30x30bb/g, `${size}x${size}bb`);
}

// Get category display name and color
export function getCategoryInfo(type: MediaType) {
  switch (type) {
    case "album":
      return {
        label: "Album",
        color: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      };
    case "audiobook":
      return {
        label: "Audiobook",
        color: "bg-green-500/20 text-green-700 border-green-500/30",
      };
    case "podcast":
      return {
        label: "Podcast",
        color: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      };
    default:
      return {
        label: "Media",
        color: "bg-gray-500/20 text-gray-700 border-gray-500/30",
      };
  }
}

/**
 * Gets the media data for a specific type and mode.
 * @param mediaType The type of media (album, podcast, audiobook).
 * @param isSearchMode Whether the search is currently active.
 * @param initialData The initial media data.
 * @param searchData The search results data.
 * @returns The relevant media data based on the type and mode.
 */
export const getMediaData = (
  mediaType: MediaType,
  isSearchMode: boolean,
  initialData: {
    albums: MediaItem[];
    podcasts: MediaItem[];
    audiobooks: MediaItem[];
  },
  searchData: {
    albums: MediaItem[];
    audiobooks: MediaItem[];
    podcasts: MediaItem[];
  }
) => {
  const dataKey = `${mediaType}s` as keyof typeof searchData;

  return isSearchMode ? searchData[dataKey] || [] : initialData[dataKey] || [];
};

/**
 * Determines if there are search results based on the query and loading state.
 * @param query The search query.
 * @param isLoading Whether the search is currently loading.
 * @param albums The list of album results.
 * @param audiobooks The list of audiobook results.
 * @param podcasts The list of podcast results.
 * @returns True if there are search results, false otherwise.
 */
export const hasSearchResults = (
  query: string,
  isLoading: boolean,
  albums: MediaItem[],
  audiobooks: MediaItem[],
  podcasts: MediaItem[]
) => {
  if (!query) return false;

  return (
    query &&
    !isLoading &&
    (albums?.length > 0 || audiobooks?.length > 0 || podcasts?.length > 0)
  );
};
/**
 * Determines if there are no search results based on the query and loading state.
 * @param query The search query.
 * @param isLoading Whether the search is currently loading.
 * @param albums The list of album results.
 * @param audiobooks The list of audiobook results.
 * @param podcasts The list of podcast results.
 * @returns True if there are no search results, false otherwise.
 */
export const showNoResults = (
  query: string,
  isLoading: boolean,
  albums: MediaItem[],
  audiobooks: MediaItem[],
  podcasts: MediaItem[]
) => {
  if (!query) return false;

  return (
    !isLoading &&
    // query &&
    albums?.length === 0 &&
    audiobooks?.length === 0 &&
    podcasts?.length === 0
  );
};

export const getMediaTypeFromItem = (item: MediaItem): MediaType => {
  if (
    item.wrapperType === "collection" ||
    item.kind === "album" ||
    item.collectionType === "Album" ||
    (item.kind === "song" && item.collectionName)
  ) {
    return "album";
  }

  if (
    item.kind === "audiobook" ||
    item.wrapperType === "audiobook" ||
    item.primaryGenreName?.toLowerCase().includes("audiobook")
  ) {
    return "audiobook";
  }

  if (
    item.kind === "podcast" ||
    item.kind === "podcast-episode" ||
    (item.wrapperType === "track" &&
      item.primaryGenreName?.toLowerCase().includes("podcast"))
  ) {
    return "podcast";
  }

  return "album"; // fallback
};
