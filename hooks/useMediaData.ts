"use client";

import {
  fetchInitialMediaData,
  fetchSearchMediaData,
  mediaQueryKeys,
} from "@/lib/media-queries";
import type { MediaType } from "@/types/media";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useMediaData() {
  const [searchMediaTypes] = useState<MediaType[]>([]);
  const queryClient = useQueryClient();

  // Query for initial data
  const {
    data: initialData,
    isLoading: loading,
    error: initialError,
  } = useQuery({
    queryKey: mediaQueryKeys.initial(),
    queryFn: fetchInitialMediaData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const currentData = initialData;
  const currentError = initialError;

  // Extract data arrays
  const albumData = currentData?.albums || [];
  const audiobookData = currentData?.audiobooks || [];
  const podcastData = currentData?.podcasts || [];

  // Refetch initial data function
  const fetchInitialData = useCallback(async () => {
    await queryClient.refetchQueries({
      queryKey: mediaQueryKeys.initial(),
    });
  }, [queryClient]);

  // Prefetch function for better UX
  const prefetchSearch = useCallback(
    (query: string, mediaTypes: MediaType[]) => {
      if (query.trim() && mediaTypes.length > 0) {
        queryClient.prefetchQuery({
          queryKey: mediaQueryKeys.search(query, mediaTypes),
          queryFn: () => fetchSearchMediaData(query, mediaTypes),
          staleTime: 2 * 60 * 1000,
        });
      }
    },
    [queryClient]
  );

  return {
    // Data
    albumData,
    audiobookData,
    podcastData,

    // Loading states
    loading,

    // Error states
    error: currentError?.message || null,

    searchMediaTypes,

    // Functions
    fetchInitialData,

    prefetchSearch,

    // Query utilities
    isInitialDataStale: initialData ? false : true,
  };
}
