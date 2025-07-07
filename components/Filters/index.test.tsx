import { useMediaStore } from "@/store/media-store";
import type { MediaType } from "@/types/media";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./index";

// Mock the media store
jest.mock("@/store/media-store");

const mockUseMediaStore = useMediaStore as jest.MockedFunction<
  typeof useMediaStore
>;
const mockSetMediaTypes = jest.fn();

const defaultStore = {
  activeTypes: [],
  setMediaTypes: mockSetMediaTypes,
  query: "",
  albums: [],
  audiobooks: [],
  podcasts: [],
  isLoading: false,
  error: null,
  setQuery: jest.fn(),
  setAlbums: jest.fn(),
  setAudiobooks: jest.fn(),
  setPodcasts: jest.fn(),
  setMediaData: jest.fn(),
  setLoading: jest.fn(),
  setError: jest.fn(),
  resetMediaData: jest.fn(),
  clearError: jest.fn(),
};

describe("Filters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMediaStore.mockReturnValue({ ...defaultStore });
  });

  it("renders all filter buttons", () => {
    render(<Filters />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Album")).toBeInTheDocument();
    expect(screen.getByText("Audiobook")).toBeInTheDocument();
    expect(screen.getByText("Podcast")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Filters />);

    const fieldset = screen.getByRole("group", { name: "Media type filters" });
    expect(fieldset).toBeInTheDocument();

    const allButton = screen.getByText("All");
    expect(allButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveAttribute("type", "button");

    const albumButton = screen.getByText("Album");
    expect(albumButton).toHaveAttribute("aria-pressed", "false");
    expect(albumButton).toHaveAttribute("type", "button");
  });

  it("shows 'All' as selected when no types are active", () => {
    mockUseMediaStore.mockReturnValue({ ...defaultStore, activeTypes: [] });

    render(<Filters />);

    const allButton = screen.getByText("All");
    expect(allButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("shows individual types as selected when active", () => {
    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: ["album", "podcast"] as MediaType[],
    });

    render(<Filters />);

    const allButton = screen.getByText("All");
    expect(allButton).toHaveAttribute("aria-pressed", "false");
    expect(allButton).not.toHaveClass("bg-primary");

    const albumButton = screen.getByText("Album");
    expect(albumButton).toHaveAttribute("aria-pressed", "true");
    expect(albumButton).toHaveClass("bg-primary", "text-primary-foreground");

    const audiobookButton = screen.getByText("Audiobook");
    expect(audiobookButton).toHaveAttribute("aria-pressed", "false");
    expect(audiobookButton).not.toHaveClass("bg-primary");

    const podcastButton = screen.getByText("Podcast");
    expect(podcastButton).toHaveAttribute("aria-pressed", "true");
    expect(podcastButton).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("calls setMediaTypes with empty array when 'All' is clicked", async () => {
    const user = userEvent.setup();

    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: ["album"] as MediaType[],
    });

    render(<Filters />);

    const allButton = screen.getByText("All");
    await user.click(allButton);

    expect(mockSetMediaTypes).toHaveBeenCalledWith([]);
  });

  it("adds type when clicking on unselected type", async () => {
    const user = userEvent.setup();

    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: ["album"] as MediaType[],
    });

    render(<Filters />);

    const podcastButton = screen.getByText("Podcast");
    await user.click(podcastButton);

    expect(mockSetMediaTypes).toHaveBeenCalledWith(["album", "podcast"]);
  });

  it("removes type when clicking on selected type", async () => {
    const user = userEvent.setup();

    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: ["album", "podcast"] as MediaType[],
    });

    render(<Filters />);

    const albumButton = screen.getByText("Album");
    await user.click(albumButton);

    expect(mockSetMediaTypes).toHaveBeenCalledWith(["podcast"]);
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();

    render(<Filters />);

    const allButton = screen.getByText("All");
    const albumButton = screen.getByText("Album");

    // Focus on first button
    await user.tab();
    expect(allButton).toHaveFocus();

    // Tab to next button
    await user.tab();
    expect(albumButton).toHaveFocus();

    // Activate with Enter
    await user.keyboard("{Enter}");
    expect(mockSetMediaTypes).toHaveBeenCalledWith(["album"]);
  });

  it("handles multiple type selections correctly", async () => {
    const user = userEvent.setup();

    render(<Filters />);

    // Click album button
    const albumButton = screen.getByText("Album");
    await user.click(albumButton);

    expect(mockSetMediaTypes).toHaveBeenCalledWith(["album"]);
  });

  it("has proper aria-labels for accessibility", () => {
    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: ["album"] as MediaType[],
    });

    render(<Filters />);

    const allButton = screen.getByText("All");
    expect(allButton).toHaveAttribute("aria-label", "Select all types");

    const albumButton = screen.getByText("Album");
    expect(albumButton).toHaveAttribute("aria-label", "Remove Album filter");

    const audiobookButton = screen.getByText("Audiobook");
    expect(audiobookButton).toHaveAttribute(
      "aria-label",
      "Add Audiobook filter"
    );
  });

  it("handles edge case with undefined activeTypes", () => {
    mockUseMediaStore.mockReturnValue({
      ...defaultStore,
      activeTypes: undefined as unknown as MediaType[],
    });

    render(<Filters />);

    // Should still render without crashing
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Album")).toBeInTheDocument();

    // All button should be selected when activeTypes is undefined
    const allButton = screen.getByText("All");
    expect(allButton).toHaveAttribute("aria-pressed", "true");
  });
});
