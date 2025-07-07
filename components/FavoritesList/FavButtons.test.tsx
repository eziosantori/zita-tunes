import { useFavoritesStore } from "@/store/favorites-store";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "sonner";
import FavButtons from "./FavButtons";

// Mock the favorites store
jest.mock("@/store/favorites-store");

// Mock the hydration hook
jest.mock("@/hooks/useHydration", () => ({
  useHydration: jest.fn(),
}));

// Mock the toast notification
jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Trash2: () => <svg data-testid="trash-icon" />,
}));

import { useHydration } from "@/hooks/useHydration";

const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>;
const mockUseHydration = useHydration as jest.MockedFunction<typeof useHydration>;
const mockClearFavorites = jest.fn();
const mockToast = toast as jest.MockedFunction<typeof toast>;

describe("FavButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to hydrated state
    mockUseHydration.mockReturnValue(true);
  });

  describe("hydration state", () => {
    it("shows loading skeleton when not hydrated", () => {
      mockUseHydration.mockReturnValue(false);
      mockUseFavoritesStore.mockReturnValue({
        favorites: [],
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });

      render(<FavButtons />);
      
      // Should show loading skeleton
      const skeletonElements = document.querySelectorAll('.animate-pulse');
      expect(skeletonElements).toHaveLength(2);
    });

    it("shows actual content when hydrated", () => {
      mockUseHydration.mockReturnValue(true);
      mockUseFavoritesStore.mockReturnValue({
        favorites: [{ trackId: 1, trackName: "Song 1" }],
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });

      render(<FavButtons />);
      
      // Should show actual content
      expect(screen.getByText("1 items")).toBeInTheDocument();
      expect(screen.getByText("Clear All")).toBeInTheDocument();
    });
  });

  describe("when there are no favorites", () => {
    beforeEach(() => {
      mockUseHydration.mockReturnValue(true);
      mockUseFavoritesStore.mockReturnValue({
        favorites: [],
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });
    });

    it("renders badge with 0 items", () => {
      render(<FavButtons />);
      expect(screen.getByText("0 items")).toBeInTheDocument();
    });

    it("does not render Clear All button", () => {
      render(<FavButtons />);
      expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
    });
  });

  describe("when there are favorites", () => {
    const mockFavorites = [
      { trackId: 1, trackName: "Song 1", artistName: "Artist 1" },
      { trackId: 2, trackName: "Song 2", artistName: "Artist 2" },
      { trackId: 3, trackName: "Song 3", artistName: "Artist 3" },
    ];

    beforeEach(() => {
      mockUseHydration.mockReturnValue(true);
      mockUseFavoritesStore.mockReturnValue({
        favorites: mockFavorites,
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });
    });

    it("renders badge with correct item count", () => {
      render(<FavButtons />);
      expect(screen.getByText("3 items")).toBeInTheDocument();
    });

    it("renders Clear All button", () => {
      render(<FavButtons />);
      expect(screen.getByText("Clear All")).toBeInTheDocument();
    });

    it("renders trash icon in Clear All button", () => {
      render(<FavButtons />);
      expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
    });

    it("calls clearFavorites when Clear All button is clicked", () => {
      render(<FavButtons />);
      const clearButton = screen.getByText("Clear All");

      fireEvent.click(clearButton);

      expect(mockClearFavorites).toHaveBeenCalledTimes(1);
    });

    it("shows toast notification when Clear All is clicked", () => {
      render(<FavButtons />);
      const clearButton = screen.getByText("Clear All");

      fireEvent.click(clearButton);

      expect(mockToast).toHaveBeenCalledWith("All Favorites Cleared");
    });
  });

  describe("badge styling", () => {
    beforeEach(() => {
      mockUseHydration.mockReturnValue(true);
      mockUseFavoritesStore.mockReturnValue({
        favorites: [{ trackId: 1, trackName: "Song 1" }],
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });
    });

    it("applies correct CSS classes to badge", () => {
      render(<FavButtons />);
      const badge = screen.getByText("1 items");

      expect(badge).toHaveClass(
        "text-sm",
        "bg-secondary/20",
        "text-secondary-foreground",
        "border-secondary/30"
      );
    });
  });

  describe("Clear All button styling", () => {
    beforeEach(() => {
      mockUseHydration.mockReturnValue(true);
      mockUseFavoritesStore.mockReturnValue({
        favorites: [{ trackId: 1, trackName: "Song 1" }],
        clearFavorites: mockClearFavorites,
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
        getFavoritesByType: jest.fn(),
      });
    });

    it("applies correct CSS classes to Clear All button", () => {
      render(<FavButtons />);
      const clearButton = screen.getByText("Clear All");

      expect(clearButton).toHaveClass("transition-all", "duration-200");
    });
  });
});
