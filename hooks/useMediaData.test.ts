import { fetchMediaData } from "@/services/itunes-api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { useMediaData } from "./useMediaData";

// Mock the iTunes API
jest.mock("@/services/itunes-api");
const mockFetchMediaData = fetchMediaData as jest.MockedFunction<
  typeof fetchMediaData
>;

// Mock data
const mockAlbumData = {
  resultCount: 2,
  results: [
    {
      collectionId: 1,
      trackName: "Test Album 1",
      artistName: "Test Artist 1",
      artworkUrl100: "test-artwork-1.jpg",
      artworkUrl60: "test-artwork-1-small.jpg",
      primaryGenreName: "Pop",
      kind: "album",
      trackViewUrl: "test-url-1",
      releaseDate: "2023-01-01",
      country: "US",
      wrapperType: "collection",
    },
    {
      collectionId: 2,
      trackName: "Test Album 2",
      artistName: "Test Artist 2",
      artworkUrl100: "test-artwork-2.jpg",
      artworkUrl60: "test-artwork-2-small.jpg",
      primaryGenreName: "Rock",
      kind: "album",
      trackViewUrl: "test-url-2",
      releaseDate: "2023-02-01",
      country: "US",
      wrapperType: "collection",
    },
  ],
};

const mockAudiobookData = {
  resultCount: 1,
  results: [
    {
      collectionId: 3,
      trackName: "Test Audiobook",
      artistName: "Test Author",
      artworkUrl100: "test-audiobook-artwork.jpg",
      artworkUrl60: "test-audiobook-artwork-small.jpg",
      primaryGenreName: "Fiction",
      kind: "audiobook",
      trackViewUrl: "test-audiobook-url",
      releaseDate: "2023-03-01",
      country: "US",
      wrapperType: "audiobook",
    },
  ],
};

const mockPodcastData = {
  resultCount: 1,
  results: [
    {
      collectionId: 4,
      trackName: "Test Podcast",
      artistName: "Test Podcaster",
      artworkUrl100: "test-podcast-artwork.jpg",
      artworkUrl60: "test-podcast-artwork-small.jpg",
      primaryGenreName: "Technology",
      kind: "podcast",
      trackViewUrl: "test-podcast-url",
      releaseDate: "2023-04-01",
      country: "US",
      wrapperType: "track",
    },
  ],
};

// Test wrapper component
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  const TestWrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  TestWrapper.displayName = "TestWrapper";
  return TestWrapper;
};

describe("useMediaData with TanStack Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchMediaData.mockResolvedValue(mockAlbumData);
  });

  it("should fetch initial data on mount", async () => {
    mockFetchMediaData
      .mockResolvedValueOnce(mockAlbumData)
      .mockResolvedValueOnce(mockAudiobookData)
      .mockResolvedValueOnce(mockPodcastData);

    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check if data is populated
    expect(result.current.albumData).toEqual(mockAlbumData.results);
    expect(result.current.audiobookData).toEqual(mockAudiobookData.results);
    expect(result.current.podcastData).toEqual(mockPodcastData.results);
    expect(result.current.error).toBe(null);
  });

  it("should handle search functionality", async () => {
    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Mock search response
    mockFetchMediaData.mockResolvedValueOnce({
      resultCount: 1,
      results: [mockAlbumData.results[0]],
    });

    // Trigger search
    await result.current.handleSearch("test query", ["album"]);

    await waitFor(() => {
      expect(result.current.isSearching).toBe(true);
      expect(result.current.searchQuery).toBe("test query");
    });
  });

  it("should clear search and return to initial data", async () => {
    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Trigger search
    await result.current.handleSearch("test query", ["album"]);

    // Clear search
    result.current.clearSearch();

    await waitFor(() => {
      expect(result.current.isSearching).toBe(false);
      expect(result.current.searchQuery).toBe("");
    });
  });

  it("should handle empty search query", async () => {
    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Trigger search with empty query
    await result.current.handleSearch("", ["album"]);

    await waitFor(() => {
      expect(result.current.isSearching).toBe(false);
      expect(result.current.searchQuery).toBe("");
    });
  });

  it("should handle API errors gracefully", async () => {
    const errorMessage = "API Error";
    mockFetchMediaData.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });
  });

  it("should prefetch search results", async () => {
    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Mock prefetch response
    mockFetchMediaData.mockResolvedValueOnce(mockAlbumData);

    // Trigger prefetch
    result.current.prefetchSearch("test query", ["album"]);

    // Verify the API was called for prefetch
    expect(mockFetchMediaData).toHaveBeenCalledWith(
      "test query",
      "music",
      "album"
    );
  });

  it("should provide correct loading states", async () => {
    const { result } = renderHook(() => useMediaData(), {
      wrapper: createWrapper(),
    });

    // Initial loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.searchLoading).toBe(false);

    // Wait for initial load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Mock search response
    mockFetchMediaData.mockResolvedValueOnce(mockAlbumData);

    // Trigger search
    const searchPromise = result.current.handleSearch("test", ["album"]);

    // Check search loading state
    expect(result.current.searchLoading).toBe(true);

    await searchPromise;

    await waitFor(() => {
      expect(result.current.searchLoading).toBe(false);
    });
  });
});
