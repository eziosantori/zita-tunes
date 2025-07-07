import { useFavoritesStore } from "@/store/favorites-store";
import type { MediaItem } from "@/types/media";
import { act, renderHook } from "@testing-library/react";
import { useFavorite } from "./useFavorite";

// Mock the favorites store
jest.mock("@/store/favorites-store");

const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>;
const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();
const mockIsFavorite = jest.fn();

const defaultStore = {
  favorites: [],
  addFavorite: mockAddFavorite,
  removeFavorite: mockRemoveFavorite,
  isFavorite: mockIsFavorite,
  clearFavorites: jest.fn(),
  getFavoritesByType: jest.fn(),
};

// Mock media item for testing
const mockMediaItem: MediaItem = {
  trackId: 123,
  collectionId: 456,
  trackName: "Test Track",
  artistName: "Test Artist",
  artworkUrl100: "https://example.com/artwork100.jpg",
  artworkUrl60: "https://example.com/artwork60.jpg",
  collectionName: "Test Collection",
  primaryGenreName: "Pop",
  kind: "song",
  trackViewUrl: "https://example.com/track",
  collectionViewUrl: "https://example.com/collection",
  releaseDate: "2023-01-01",
  country: "USA",
  wrapperType: "track",
  collectionType: "Album",
};

describe("useFavorite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFavoritesStore.mockReturnValue(defaultStore);
  });

  describe("initialization", () => {
    it("should initialize with correct favorite status from store", () => {
      mockIsFavorite.mockReturnValue(true);

      const { result } = renderHook(() => useFavorite(mockMediaItem));

      expect(result.current.isFavorite).toBe(true);
      expect(result.current.isInitialized).toBe(true);
      expect(mockIsFavorite).toHaveBeenCalledWith(mockMediaItem);
    });

    it("should initialize with false when item is not in favorites", () => {
      mockIsFavorite.mockReturnValue(false);

      const { result } = renderHook(() => useFavorite(mockMediaItem));

      expect(result.current.isFavorite).toBe(false);
      expect(result.current.isInitialized).toBe(true);
      expect(mockIsFavorite).toHaveBeenCalledWith(mockMediaItem);
    });
  });

  describe("toggleFavorite", () => {
    it("should add item to favorites when not already favorited", () => {
      mockIsFavorite.mockReturnValue(false);

      const { result } = renderHook(() => useFavorite(mockMediaItem));

      const mockEvent = {
        stopPropagation: jest.fn(),
      } as unknown as React.MouseEvent;

      act(() => {
        result.current.toggleFavorite(mockEvent);
      });

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(result.current.isFavorite).toBe(true);
      expect(mockAddFavorite).toHaveBeenCalledWith({ ...mockMediaItem });
      expect(mockRemoveFavorite).not.toHaveBeenCalled();
    });

    it("should remove item from favorites when already favorited", () => {
      mockIsFavorite.mockReturnValue(true);

      const { result } = renderHook(() => useFavorite(mockMediaItem));

      const mockEvent = {
        stopPropagation: jest.fn(),
      } as unknown as React.MouseEvent;

      act(() => {
        result.current.toggleFavorite(mockEvent);
      });

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(result.current.isFavorite).toBe(false);
      expect(mockRemoveFavorite).toHaveBeenCalledWith(mockMediaItem);
      expect(mockAddFavorite).not.toHaveBeenCalled();
    });
  });

  describe("item changes", () => {
    it("should re-check favorite status when item changes", () => {
      mockIsFavorite.mockReturnValue(false);

      const { result, rerender } = renderHook(({ item }) => useFavorite(item), {
        initialProps: { item: mockMediaItem },
      });

      expect(result.current.isFavorite).toBe(false);

      // Change the item
      const newItem = { ...mockMediaItem, trackId: 999 };
      mockIsFavorite.mockReturnValue(true);

      rerender({ item: newItem });

      expect(result.current.isFavorite).toBe(true);
      expect(mockIsFavorite).toHaveBeenCalledWith(newItem);
    });
  });
});
