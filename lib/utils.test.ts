import type { MediaItem, MediaType } from "@/types/media";
import {
  cn,
  getCategoryInfo,
  getHighResArtwork,
  getMediaData,
  getMediaTypeFromItem,
  hasSearchResults,
  showNoResults,
} from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
    });

    it("should handle empty strings and null/undefined", () => {
      expect(cn("foo", "", null, undefined, "bar")).toBe("foo bar");
    });
  });

  describe("getHighResArtwork", () => {
    it("should return placeholder when artworkUrl is empty", () => {
      expect(getHighResArtwork("")).toBe("/placeholder.svg");
    });

    it("should return placeholder when artworkUrl is falsy", () => {
      expect(getHighResArtwork(null as unknown as string)).toBe(
        "/placeholder.svg"
      );
      expect(getHighResArtwork(undefined as unknown as string)).toBe(
        "/placeholder.svg"
      );
    });

    it("should replace 100x100bb with specified size", () => {
      const url =
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/100x100bb.jpg";
      expect(getHighResArtwork(url, 400)).toBe(
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/400x400bb.jpg"
      );
    });

    it("should replace 60x60bb with specified size", () => {
      const url =
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/60x60bb.jpg";
      expect(getHighResArtwork(url, 300)).toBe(
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/300x300bb.jpg"
      );
    });

    it("should replace 30x30bb with specified size", () => {
      const url =
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/30x30bb.jpg";
      expect(getHighResArtwork(url, 200)).toBe(
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/200x200bb.jpg"
      );
    });

    it("should use default size of 600 when no size specified", () => {
      const url =
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/100x100bb.jpg";
      expect(getHighResArtwork(url)).toBe(
        "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/600x600bb.jpg"
      );
    });

    it("should handle URLs without size patterns", () => {
      const url = "https://example.com/image.jpg";
      expect(getHighResArtwork(url, 400)).toBe(url);
    });
  });

  describe("getCategoryInfo", () => {
    it("should return correct info for album", () => {
      const result = getCategoryInfo("album");
      expect(result).toEqual({
        label: "Album",
        color: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      });
    });

    it("should return correct info for audiobook", () => {
      const result = getCategoryInfo("audiobook");
      expect(result).toEqual({
        label: "Audiobook",
        color: "bg-green-500/20 text-green-700 border-green-500/30",
      });
    });

    it("should return correct info for podcast", () => {
      const result = getCategoryInfo("podcast");
      expect(result).toEqual({
        label: "Podcast",
        color: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      });
    });

    it("should return default info for unknown type", () => {
      const result = getCategoryInfo("unknown" as MediaType);
      expect(result).toEqual({
        label: "Media",
        color: "bg-gray-500/20 text-gray-700 border-gray-500/30",
      });
    });
  });

  describe("getMediaData", () => {
    const mockInitialData = {
      albums: [{ trackId: 1, trackName: "Initial Album" }] as MediaItem[],
      podcasts: [{ trackId: 2, trackName: "Initial Podcast" }] as MediaItem[],
      audiobooks: [
        { trackId: 3, trackName: "Initial Audiobook" },
      ] as MediaItem[],
    };

    const mockSearchData = {
      albums: [{ trackId: 4, trackName: "Search Album" }] as MediaItem[],
      podcasts: [{ trackId: 5, trackName: "Search Podcast" }] as MediaItem[],
      audiobooks: [
        { trackId: 6, trackName: "Search Audiobook" },
      ] as MediaItem[],
    };

    it("should return search data when isSearchMode is true", () => {
      expect(
        getMediaData("album", true, mockInitialData, mockSearchData)
      ).toEqual(mockSearchData.albums);
      expect(
        getMediaData("podcast", true, mockInitialData, mockSearchData)
      ).toEqual(mockSearchData.podcasts);
      expect(
        getMediaData("audiobook", true, mockInitialData, mockSearchData)
      ).toEqual(mockSearchData.audiobooks);
    });

    it("should return initial data when isSearchMode is false", () => {
      expect(
        getMediaData("album", false, mockInitialData, mockSearchData)
      ).toEqual(mockInitialData.albums);
      expect(
        getMediaData("podcast", false, mockInitialData, mockSearchData)
      ).toEqual(mockInitialData.podcasts);
      expect(
        getMediaData("audiobook", false, mockInitialData, mockSearchData)
      ).toEqual(mockInitialData.audiobooks);
    });

    it("should return empty array when data is missing", () => {
      const emptyData = { albums: [], podcasts: [], audiobooks: [] };
      expect(getMediaData("album", true, emptyData, emptyData)).toEqual([]);
    });
  });

  describe("hasSearchResults", () => {
    it("should return true when query exists, not loading, and has results", () => {
      expect(hasSearchResults("test", false, [{}] as MediaItem[], [], [])).toBe(
        true
      );
      expect(hasSearchResults("test", false, [], [{}] as MediaItem[], [])).toBe(
        true
      );
      expect(hasSearchResults("test", false, [], [], [{}] as MediaItem[])).toBe(
        true
      );
    });

    it("should return false when query is empty", () => {
      expect(hasSearchResults("", false, [], [], [])).toBe(false);
    });

    it("should return false when isLoading is true", () => {
      expect(hasSearchResults("test", true, [], [], [])).toBe(false);
    });

    it("should return false when no results exist", () => {
      expect(hasSearchResults("test", false, [], [], [])).toBe(false);
    });

    it("should handle undefined/null arrays", () => {
      expect(
        hasSearchResults(
          "test",
          false,
          undefined as unknown as MediaItem[],
          null as unknown as MediaItem[],
          []
        )
      ).toBe(false);
    });
  });

  describe("showNoResults", () => {
    it("should return true when query exists, not loading, and no results", () => {
      expect(showNoResults("test", false, [], [], [])).toBe(true);
    });

    it("should return false when query is empty", () => {
      expect(showNoResults("", false, [], [], [])).toBe(false);
    });

    it("should return false when isLoading is true", () => {
      expect(showNoResults("test", true, [], [], [])).toBe(false);
    });

    it("should return false when at least one result exists", () => {
      expect(showNoResults("test", false, [{}] as MediaItem[], [], [])).toBe(
        false
      );
      expect(showNoResults("test", false, [], [{}] as MediaItem[], [])).toBe(
        false
      );
      expect(showNoResults("test", false, [], [], [{}] as MediaItem[])).toBe(
        false
      );
    });

    it("should handle arrays with length > 0", () => {
      const mockItems = [{ trackId: 1 }, { trackId: 2 }] as MediaItem[];
      expect(showNoResults("test", false, mockItems, [], [])).toBe(false);
    });

    describe("getMediaTypeFromItem", () => {
      it("should return 'album' for collection wrapperType", () => {
        const item = { wrapperType: "collection" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });

      it("should return 'album' for kind 'album'", () => {
        const item = { kind: "album" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });

      it("should return 'album' for collectionType 'Album'", () => {
        const item = { collectionType: "Album" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });

      it("should return 'album' for kind 'song' with collectionName", () => {
        const item = {
          kind: "song",
          collectionName: "Some Album",
        } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });

      it("should return 'audiobook' for kind 'audiobook'", () => {
        const item = { kind: "audiobook" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("audiobook");
      });

      it("should return 'audiobook' for wrapperType 'audiobook'", () => {
        const item = { wrapperType: "audiobook" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("audiobook");
      });

      it("should return 'audiobook' if primaryGenreName includes 'audiobook'", () => {
        const item = { primaryGenreName: "Audiobook" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("audiobook");
        const item2 = { primaryGenreName: "Children's Audiobook" } as MediaItem;
        expect(getMediaTypeFromItem(item2)).toBe("audiobook");
      });

      it("should return 'podcast' for kind 'podcast'", () => {
        const item = { kind: "podcast" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("podcast");
      });

      it("should return 'podcast' for kind 'podcast-episode'", () => {
        const item = { kind: "podcast-episode" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("podcast");
      });

      it("should return 'podcast' for wrapperType 'track' and primaryGenreName includes 'podcast'", () => {
        const item = {
          wrapperType: "track",
          primaryGenreName: "Podcast",
        } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("podcast");
        const item2 = {
          wrapperType: "track",
          primaryGenreName: "Tech Podcast",
        } as MediaItem;
        expect(getMediaTypeFromItem(item2)).toBe("podcast");
      });

      it("should return 'album' as fallback for unknown types", () => {
        const item = { kind: "unknown" } as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });

      it("should handle missing properties gracefully", () => {
        const item = {} as MediaItem;
        expect(getMediaTypeFromItem(item)).toBe("album");
      });
    });
  });
});
