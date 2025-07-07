"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { useFavorite } from "@/hooks/useFavorite";
import type { MediaItem } from "@/types/media";

interface FavoriteButtonProps {
  item: MediaItem;
  size?: "sm" | "md" | "lg";
  className?: string;
  uniqueKey?: string;
}

export function FavoriteButton({
  item,
  size = "sm",
  className = "",
  uniqueKey,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isInitialized } = useFavorite(item);

  //   const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  //   // Use local state with a unique identifier to prevent cross-component interference
  //   const [localIsFavorite, setLocalIsFavorite] = useState(false)
  //   const [isInitialized, setIsInitialized] = useState(false)

  //   // Initialize and sync with store
  //   useEffect(() => {
  //     const checkFavorite = () => {
  //       const favoriteStatus = isFavorite(item)
  //       setLocalIsFavorite(favoriteStatus)
  //       setIsInitialized(true)
  //     }

  //     checkFavorite()
  //   }, [item, isFavorite])

  //   const handleToggleFavorite = useCallback(
  //     (e: React.MouseEvent) => {
  //       e.stopPropagation() // Prevent card click when clicking favorite button

  //       const newFavoriteStatus = !localIsFavorite

  //       // Update local state immediately for instant feedback
  //       setLocalIsFavorite(newFavoriteStatus)

  //       // Update store
  //       if (newFavoriteStatus) {
  //         addFavorite({ ...item })

  //       } else {
  //         removeFavorite(item)

  //       }
  //     },
  //     [localIsFavorite, item, addFavorite, removeFavorite],
  //   )

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  // Don't render until initialized to prevent flash
  if (!isInitialized) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className={`${sizeClasses[size]} ${className} opacity-50 cursor-pointer`}
        disabled
      >
        <Heart className={`${iconSizes[size]}`} />
      </Button>
    );
  }

  return (
    <Button
      key={uniqueKey} // Use unique key to help React distinguish between instances
      size="icon"
      variant="ghost"
      className={`${
        sizeClasses[size]
      } ${className} transition-all duration-200 hover:bg-secondary/20 cursor-pointer ${
        isFavorite
          ? "text-secondary-foreground hover:text-secondary-foreground/80"
          : "text-muted-foreground hover:text-secondary-foreground"
      }`}
      onClick={toggleFavorite}
      aria-label={
        isFavorite
          ? `Remove ${item.trackName} from favorites`
          : `Add ${item.trackName} to favorites`
      }
    >
      <Heart
        className={`${iconSizes[size]} transition-all duration-200 ${
          isFavorite ? "fill-current" : ""
        }`}
      />
    </Button>
  );
}
export default FavoriteButton;
