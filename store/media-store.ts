import type { MediaItem, MediaType } from "@/types/media";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MediaStore {
  query: string; // Added query state for search functionality
  activeTypes?: MediaType[]; // Optional, can be used to track selected media types
  // State
  albums: MediaItem[];
  audiobooks: MediaItem[];
  podcasts: MediaItem[];

  // Loading states
  isLoading: boolean;

  // Error states
  error: string | null;

  // Actions
  setQuery: (query: string) => void;
  setMediaTypes?: (types: MediaType[]) => void;

  // Individual actions for each media type
  setAlbums: (albums: MediaItem[]) => void;
  setAudiobooks: (audiobooks: MediaItem[]) => void;
  setPodcasts: (podcasts: MediaItem[]) => void;

  // Batch actions
  setMediaData: (data: {
    albums?: MediaItem[];
    audiobooks?: MediaItem[];
    podcasts?: MediaItem[];
  }) => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Reset actions
  resetMediaData: () => void;
  clearError: () => void;
}

const initialState = {
  query: "",
  activeTypes: [],
  albums: [],
  audiobooks: [],
  podcasts: [],
  isLoading: false,
  error: null,
};

export const useMediaStore = create<MediaStore>()(
  devtools(
    (set) => ({
      // Initial state
      ...initialState,
      setMediaTypes: (types) =>
        set({ activeTypes: types }, false, "setMediaTypes"),
      setQuery: (query) => set({ query }, false, "setQuery"),
      // Actions
      setAlbums: (albums) => set({ albums }, false, "setAlbums"),

      setAudiobooks: (audiobooks) =>
        set({ audiobooks }, false, "setAudiobooks"),

      setPodcasts: (podcasts) => set({ podcasts }, false, "setPodcasts"),

      setMediaData: (data) =>
        set(
          (state) => ({
            ...state,
            ...(data.albums && { albums: data.albums }),
            ...(data.audiobooks && { audiobooks: data.audiobooks }),
            ...(data.podcasts && { podcasts: data.podcasts }),
          }),
          false,
          "setMediaData"
        ),

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      resetMediaData: () => set(initialState, false, "resetMediaData"),

      clearError: () => set({ error: null }, false, "clearError"),
    }),
    {
      name: "media-store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

// selectrors for performance optimization
export const useAlbums = () => useMediaStore((state) => state.albums);
export const useAudiobooks = () => useMediaStore((state) => state.audiobooks);
export const usePodcasts = () => useMediaStore((state) => state.podcasts);
export const useMediaLoading = () => useMediaStore((state) => state.isLoading);
export const useMediaError = () => useMediaStore((state) => state.error);

// Combined selectors for media data
export const useMediaData = () =>
  useMediaStore((state) => ({
    albums: state.albums,
    audiobooks: state.audiobooks,
    podcasts: state.podcasts,
  }));

export const useMediaState = () =>
  useMediaStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
  }));
