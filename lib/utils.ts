import { MediaType } from "@/types/media";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHighResArtwork(artworkUrl: string, size = 600): string {
  if (!artworkUrl) return "/placeholder.svg";
  // Replace the size in the iTunes artwork URL to get higher resolution
  return artworkUrl.replace(/100x100bb|60x60bb|30x30bb/g, `${size}x${size}bb`);
}

// Get category display name and color
export function getCategoryInfo(type: MediaType) {
  switch (type) {
    case "album":
      return {
        label: "Album",
        color: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      };
    case "audiobook":
      return {
        label: "Audiobook",
        color: "bg-green-500/20 text-green-700 border-green-500/30",
      };
    case "podcast":
      return {
        label: "Podcast",
        color: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      };
    default:
      return {
        label: "Media",
        color: "bg-gray-500/20 text-gray-700 border-gray-500/30",
      };
  }
}
