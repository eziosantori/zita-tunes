"use client";

import { Button } from "@/components/ui/button";
import { useHydration } from "@/hooks/useHydration";
import { useFavoritesStore } from "@/store/favorites-store";
import { Trash2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const FavButtons = () => {
  const { favorites, clearFavorites } = useFavoritesStore();
  const isHydrated = useHydration();

  const handleClearFavorites = () => {
    clearFavorites();

    // Show toast notification for clearing all favorites
    toast("All Favorites Cleared");
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-6 w-16 bg-muted animate-pulse rounded" />
        <div className="h-8 w-20 bg-muted animate-pulse rounded" />
      </div>
    );
  }
  return (
    <>
      <Badge
        variant="secondary"
        className="text-sm bg-secondary/20 text-secondary-foreground border-secondary/30"
      >
        {favorites.length} items
      </Badge>
      {favorites.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFavorites}
          className="transition-all duration-200"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      )}
    </>
  );
};

export default memo(FavButtons);
