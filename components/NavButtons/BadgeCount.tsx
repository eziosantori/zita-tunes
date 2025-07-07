"use client";

import { useFavoritesStore } from "@/store/favorites-store";
import { Badge } from "../ui/badge";

export const BadgeCount = () => {
  const { favorites } = useFavoritesStore();

  if (!favorites || favorites.length === 0) {
    return null; // or return a default badge with 0 count
  }

  return (
    <Badge
      variant="secondary"
      className="ml-2 h-5 px-1.5 text-xs bg-secondary text-primary-foreground"
    >
      {favorites.length}
    </Badge>
  );
};
