import { fetchMediaData } from "@/services/itunes-api";
import type { MediaItem, MediaType } from "@/types/media";

// Query keys for TanStack Query
export const mediaQueryKeys = {
  all: ["media"] as const,
  initial: () => [...mediaQueryKeys.all, "initial"] as const,
  search: (query: string, mediaTypes: MediaType[]) =>
    [...mediaQueryKeys.all, "search", query, mediaTypes] as const,
  byType: (term: string, mediaType: MediaType) =>
    [...mediaQueryKeys.all, "type", mediaType, term] as const,
};

// Query functions
export const fetchInitialMediaData = async () => {
  const [albumsData, audiobooksData, podcastsData] = await Promise.all([
    fetchMediaData("music", "music", "album"),
    fetchMediaData("bestseller", "audiobook", "audiobook"),
    fetchMediaData("podcast", "podcast", "podcast"),
  ]);

  return {
    albums: albumsData.results || [],
    audiobooks: audiobooksData.results || [],
    podcasts: podcastsData.results || [],
  };
};

export const fetchSearchMediaData = async (
  query: string,
  selectedMediaTypes: MediaType[]
) => {
  const searchPromises = [];
  const mediaTypeOrder: MediaType[] = [];

  if (selectedMediaTypes.includes("album")) {
    searchPromises.push(fetchMediaData(query, "music", "album"));
    mediaTypeOrder.push("album");
  }

  if (selectedMediaTypes.includes("audiobook")) {
    searchPromises.push(fetchMediaData(query, "audiobook", "audiobook"));
    mediaTypeOrder.push("audiobook");
  }

  if (selectedMediaTypes.includes("podcast")) {
    searchPromises.push(fetchMediaData(query, "podcast", "podcast"));
    mediaTypeOrder.push("podcast");
  }

  const results = await Promise.all(searchPromises);

  const searchResults: {
    albums: MediaItem[];
    audiobooks: MediaItem[];
    podcasts: MediaItem[];
  } = {
    albums: [],
    audiobooks: [],
    podcasts: [],
  };

  results.forEach((result, index) => {
    const mediaType = mediaTypeOrder[index];
    if (mediaType === "album") {
      searchResults.albums = result?.results || [];
    } else if (mediaType === "audiobook") {
      searchResults.audiobooks = result?.results || [];
    } else if (mediaType === "podcast") {
      searchResults.podcasts = result?.results || [];
    }
  });

  return searchResults;
};
