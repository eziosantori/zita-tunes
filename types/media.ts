export interface MediaItem {
  trackId?: number;
  collectionId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  collectionName?: string;
  primaryGenreName: string;
  kind: string;
  trackViewUrl: string;
  collectionViewUrl?: string;
  releaseDate: string;
  country: string;
  wrapperType: string;
  collectionType?: string;
}

export interface ApiResponse {
  resultCount: number;
  results: MediaItem[];
}

export type MediaType = "album" | "audiobook" | "podcast";
