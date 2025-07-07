import { useFavoritesStore } from "@/store/favorites-store";
import { MediaItem } from "@/types/media";
import { useCallback, useEffect, useState } from "react";

export const useFavorite = (item: MediaItem) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  // Use local state with a unique identifier to prevent cross-component interference
  const [localIsFavorite, setLocalIsFavorite] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize and sync with store
  useEffect(() => {
    const checkFavorite = () => {
      const favoriteStatus = isFavorite(item);
      setLocalIsFavorite(favoriteStatus);
      setIsInitialized(true);
    };

    checkFavorite();
  }, [item, isFavorite]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking favorite button

      const newFavoriteStatus = !localIsFavorite;

      // Update local state immediately for instant feedback
      setLocalIsFavorite(newFavoriteStatus);

      // Update store
      if (newFavoriteStatus) {
        addFavorite({ ...item });
      } else {
        removeFavorite(item);
      }
    },
    [localIsFavorite, item, addFavorite, removeFavorite]
  );

  return {
    isFavorite: localIsFavorite,
    toggleFavorite: handleToggleFavorite,
    isInitialized,
  };
};
