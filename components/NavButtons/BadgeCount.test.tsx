import { useFavoritesStore } from "@/store/favorites-store";
import type { MediaItem } from "@/types/media";
import { render, screen } from "@testing-library/react";
import { BadgeCount } from "./BadgeCount";

// Mock the favorites store
jest.mock("@/store/favorites-store", () => ({
  useFavoritesStore: jest.fn(),
}));

const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>;

describe("BadgeCount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render null when favorites is null", () => {
    mockUseFavoritesStore.mockReturnValue({
      favorites: null as unknown as MediaItem[],
    } as ReturnType<typeof useFavoritesStore>);

    const { container } = render(<BadgeCount />);
    expect(container.firstChild).toBeNull();
  });

  it("should render null when favorites is undefined", () => {
    mockUseFavoritesStore.mockReturnValue({
      favorites: undefined as unknown as MediaItem[],
    } as ReturnType<typeof useFavoritesStore>);

    const { container } = render(<BadgeCount />);
    expect(container.firstChild).toBeNull();
  });

  it("should render null when favorites array is empty", () => {
    mockUseFavoritesStore.mockReturnValue({
      favorites: [],
    } as ReturnType<typeof useFavoritesStore>);

    const { container } = render(<BadgeCount />);
    expect(container.firstChild).toBeNull();
  });

  it("should render badge with count when favorites has items", () => {
    const mockFavorites: MediaItem[] = [
      { trackId: 1, trackName: "Song 1" } as MediaItem,
      { trackId: 2, trackName: "Song 2" } as MediaItem,
      { trackId: 3, trackName: "Song 3" } as MediaItem,
    ];

    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
    } as ReturnType<typeof useFavoritesStore>);

    render(<BadgeCount />);

    const badge = screen.getByText("3");
    expect(badge).toBeInTheDocument();
  });

  it("should render badge with correct count for single item", () => {
    const mockFavorites: MediaItem[] = [
      { trackId: 1, trackName: "Song 1" } as MediaItem,
    ];

    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
    } as ReturnType<typeof useFavoritesStore>);

    render(<BadgeCount />);

    const badge = screen.getByText("1");
    expect(badge).toBeInTheDocument();
  });

  it("should render badge with correct styling classes", () => {
    const mockFavorites: MediaItem[] = [
      { trackId: 1, trackName: "Song 1" } as MediaItem,
    ];

    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
    } as ReturnType<typeof useFavoritesStore>);

    render(<BadgeCount />);

    const badge = screen.getByText("1");
    expect(badge).toHaveClass("ml-2");
    expect(badge).toHaveClass("h-5");
    expect(badge).toHaveClass("px-1.5");
    expect(badge).toHaveClass("text-xs");
    expect(badge).toHaveClass("bg-secondary");
    expect(badge).toHaveClass("text-primary-foreground");
  });

  it("should render badge with large count", () => {
    // Create array with 99 items
    const mockFavorites: MediaItem[] = Array.from(
      { length: 99 },
      (_, i) =>
        ({
          trackId: i + 1,
          trackName: `Song ${i + 1}`,
        } as MediaItem)
    );

    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
    } as ReturnType<typeof useFavoritesStore>);

    render(<BadgeCount />);

    const badge = screen.getByText("99");
    expect(badge).toBeInTheDocument();
  });
});
