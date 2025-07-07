import type { MediaItem } from "@/types/media";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: MediaItem[];
  addFavorite: (item: MediaItem) => void;
  removeFavorite: (item: MediaItem) => void;
  isFavorite: (item: MediaItem) => boolean;
  clearFavorites: () => void;
  getFavoritesByType: (type: string) => MediaItem[];
}

// Helper function to get unique identifier for an item
function getItemId(item: MediaItem): string {
  // Use collectionId if available, otherwise fall back to trackId
  const id = item.collectionId || item.trackId;
  return `${id}-${item.kind || item.wrapperType}`;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item: MediaItem) => {
        set((state) => {
          const itemId = getItemId(item);
          // Remove existing item with same ID if it exists, then add the new one
          const filteredFavorites = state.favorites.filter(
            (fav) => getItemId(fav) !== itemId
          );
          return {
            favorites: [...filteredFavorites, item],
          };
        });
      },

      removeFavorite: (item: MediaItem) => {
        set((state) => {
          const itemId = getItemId(item);
          return {
            favorites: state.favorites.filter(
              (fav) => getItemId(fav) !== itemId
            ),
          };
        });
      },

      isFavorite: (item: MediaItem) => {
        const favorites = get().favorites;
        const itemId = getItemId(item);
        return favorites.some((fav) => getItemId(fav) === itemId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      getFavoritesByType: (type: string) => {
        const favorites = get().favorites;
        switch (type) {
          case "album":
            return favorites.filter(
              (item) =>
                item.wrapperType === "collection" ||
                item.kind === "album" ||
                item.collectionType === "Album" ||
                (item.kind === "song" && item.collectionName)
            );
          case "audiobook":
            return favorites.filter(
              (item) =>
                item.kind === "audiobook" ||
                item.wrapperType === "audiobook" ||
                item.primaryGenreName?.toLowerCase().includes("audiobook")
            );
          case "podcast":
            return favorites.filter(
              (item) =>
                item.kind === "podcast" ||
                item.kind === "podcast-episode" ||
                (item.wrapperType === "track" &&
                  item.primaryGenreName?.toLowerCase().includes("podcast"))
            );
          default:
            return favorites;
        }
      },
    }),
    {
      name: "favorites-storage",
      version: 2, // Increment version due to storage format change
    }
  )
);
