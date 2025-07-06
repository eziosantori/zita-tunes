import { fetchMediaData } from "@/services/itunes-api";
import { jest } from "@jest/globals";

// Mock fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe("fetchMediaData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should fetch data successfully", async () => {
    const mockResponse = {
      resultCount: 2,
      results: [
        {
          trackId: 1,
          trackName: "Test Track",
          artistName: "Test Artist",
          artworkUrl100: "https://example.com/artwork.jpg",
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchMediaData("test", "music", "album");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/search?term=test&media=music&entity=album&limit=20&country=US"
    );
    expect(result).toEqual(mockResponse);
  });

  it("should handle URL encoding for search terms", async () => {
    const mockResponse = { resultCount: 0, results: [] };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchMediaData("test & special chars!", "music", "album");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/search?term=test%20%26%20special%20chars!&media=music&entity=album&limit=20&country=US"
    );
  });

  it("should use custom parameters when provided", async () => {
    const mockResponse = { resultCount: 0, results: [] };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchMediaData("test", "podcast", "podcast", 50, "GB");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/search?term=test&media=podcast&entity=podcast&limit=50&country=GB"
    );
  });

  it("should throw error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchMediaData("test", "music", "album")).rejects.toThrow(
      "Failed to fetch music data: Not Found"
    );
  });

  it("should handle network errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchMediaData("test", "music", "album")).rejects.toThrow(
      "Network error"
    );
  });

  it("should handle malformed JSON response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as unknown as Response);

    await expect(fetchMediaData("test", "music", "album")).rejects.toThrow(
      "Invalid JSON"
    );
  });
});
